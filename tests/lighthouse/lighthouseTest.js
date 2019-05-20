/* eslint-disable linebreak-style */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-await-in-loop */
const lightpuppet = require('google-lighthouse-puppeteer')
const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const csv = require('csv-parser')
const c3ChartMaker = require('c3-chart-maker')
const govTests = require('./tests')
const accessibilityWarnings = require('./accessibilityWarnings').list

const chartDefinition = require('./ChartDefinition')

// Set options for Lighthouse and Puppeteer
const options = {
  main: {
    port: 9222,
    verbose: [true, true]
  },
  lighthouse: {
    params: '',
    output_directory: `./tests/lighthouse/results`,
    lighthouse_params:
      '--quiet --max-wait-for-load=10000 --chrome-flags="--window-size=1280,800" --throttling-method=provided --emulated-form-factor="desktop" --output html --output csv'
  },
  chromium: '--headless=false --disable-setuid-sandbox --ssl-version-max=tls1.1',
  _unknown: ['--puppeteer-ignoreHTTPSErrors', '--puppeteer-slowMo', '20']
}

function createNewCategories(today, categories) {
  return {
    date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
    accessibility: categories.accessibility.score,
    performance: categories.performance.score,
    'best-practices': categories['best-practices'].score,
    seo: categories.seo.score
  }
}

function createScoresChart(pageName) {
  try {
    c3ChartMaker(
      `${__dirname}\\ScoreTrends\\${pageName}Scores.csv`,
      chartDefinition,
      `${__dirname}\\ScoreTrends\\GraphTrends\\${pageName}Graph.png`
    ).then(() => {
      console.log(`Graph Generated for ${pageName}.`)
    })
  } catch (e) {
    console.log(e)
  }
}

function getCsvWriter(filePath) {
  const writer = createCsvWriter({
    path: `${__dirname}\\${filePath}.csv`,
    header: [
      { id: 'date', title: 'Date' },
      { id: 'accessibility', title: 'Accessibility' },
      { id: 'performance', title: 'Performance' },
      { id: 'best-practices', title: 'Best Practices' },
      { id: 'seo', title: 'SEO' }
    ]
  })

  return writer
}

async function writeCsvReport(writer, data) {
  try {
    await writer.writeRecords(data)
  } catch (err) {
    console.log(err)
  }
}

function getScoreHistory(results) {
  const scoreHistory = []

  for (let i = 0; i < results.length; i++) {
    scoreHistory.push({
      date: results[i].Date,
      accessibility: results[i].Accessibility,
      performance: results[i].Performance,
      'best-practices': results[i]['Best Practices'],
      seo: results[i].SEO
    })
  }

  return scoreHistory
}

function updateScores(finalRes, today, newEntry) {
  const temp = finalRes

  // add new set of scores to the score history
  if (
    temp[temp.length - 1].date.toString() ===
    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`.toString()
  ) {
    temp[temp.length - 1] = newEntry
    console.log('REPLACED THE LAST ENTRY')
  } else {
    temp.push(newEntry)
    console.log('pushed new entry')
  }

  return temp
}

const recordScores = async (file, pageName, categories) => {
  const today = new Date()
  let finalRes = []
  const results = []

  fs.createReadStream(`${__dirname}\\ScoreTrends\\${pageName}Scores.csv`)
    .pipe(csv())
    .on('data', data => results.push(data))
    .on('end', async () => {
      finalRes = getScoreHistory(results)

      const newEntry = createNewCategories(today, categories)

      finalRes = updateScores(finalRes, today, newEntry)

      const csvWriter = getCsvWriter(`\\ScoreTrends\\${pageName}Scores`)

      writeCsvReport(csvWriter, finalRes)
    })

  createScoresChart(pageName)
}

function recordWarningSnippets(items) {
  const snips = []
  for (let i = 0; i < items.length; i++) {
    snips.push(items[i].node.snippet)
  }
  return snips
}

function extractAccessibilityWarnings(entries) {
  const warnings = []
  for (let i = 0; i < entries.length; i++) {
    for (let j = 0; j < accessibilityWarnings.length; j++) {
      if (entries[i][1].id === accessibilityWarnings[j].id && entries[i][1].details !== undefined) {
        const freq = entries[i][1].details.items.length
        if (freq > 0) {
          const snips = recordWarningSnippets(entries[i][1].details.items)
          warnings.push({
            ...accessibilityWarnings[j],
            impact: entries[i][1].details.impact,
            frequency: freq,
            title: entries[i][1].title,
            description: entries[i][1].description,
            snippets: snips
          })
        }
      }
    }
  }
  return warnings
}

async function runLighthouseTest(test, testName) {
  await lightpuppet.exec(test, options).then(async () => {
    console.log(`Completed test ${testName}.`)
  })
}

async function analyzeResults(files, testName) {
  let tracker = []
  files.forEach(async file => {
    if (file.slice(-4) === 'json') {
      if (file !== 'summary.json') {
        const audits = require(`${__dirname}\\results\\${file}`).audits
        const entries = Object.entries(audits)
        tracker = extractAccessibilityWarnings(entries)

        const csvWriter = getCsvWriter(`AccessibilityCsvReports\\${testName}`)
        writeCsvReport(csvWriter, tracker)
        recordScores(file, testName, require(`${__dirname}\\results\\${file}`).categories)

        fs.renameSync(
          `${__dirname}\\results\\${file}`,
          `${__dirname}\\JsonReports\\${testName}.json`
        )
      }
    } else if (file.slice(-4) === 'html') {
      fs.renameSync(`${__dirname}\\results\\${file}`, `${__dirname}\\HtmlReports\\${testName}.html`)
    } else if (file.slice(-3) === 'csv') {
      fs.renameSync(
        `${__dirname}\\results\\${file}`,
        `${__dirname}\\FullCsvReports\\${testName}.csv`
      )
    }
  })
}

const runAllTests = async () => {
  for (let i = 0; i < govTests.length; i++) {
    try {
      await runLighthouseTest(govTests[i].test, govTests[i].testName)

      // gets result files from test run on a single page (html, csv, and json)
      const files = fs.readdirSync(`${__dirname}\\results`)
      analyzeResults(files, govTests[i].testName)
    } catch (e) {
      console.log(e)
    }
  }
}

// run tests
runAllTests()
