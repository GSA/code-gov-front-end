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

const recordScores = async (file, pageName, categories) => {
  // data object
  const today = new Date()
  const finalRes = []
  const results = []

  fs.createReadStream(`${__dirname}\\ScoreTrends\\${pageName}Scores.csv`)
    .pipe(csv())
    .on('data', data => results.push(data))
    .on('end', async () => {
      for (let i = 0; i < results.length; i++) {
        finalRes.push({
          date: results[i].Date,
          accessibility: results[i].Accessibility,
          performance: results[i].Performance,
          'best-practices': results[i]['Best Practices'],
          seo: results[i].SEO
        })
      }

      const newEntry = {
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        accessibility: categories.accessibility.score,
        performance: categories.performance.score,
        'best-practices': categories['best-practices'].score,
        seo: categories.seo.score
      }

      // add new set of scores to the score history
      if (
        finalRes[finalRes.length - 1].date.toString() ===
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`.toString()
      ) {
        finalRes[finalRes.length - 1] = newEntry
        console.log('REPLACED THE LAST ENTRY')
      } else {
        finalRes.push(newEntry)
        console.log('pushed new entry')
      }

      // writer to create the updated score history csv
      const csvWriter = createCsvWriter({
        path: `${__dirname}\\ScoreTrends\\${pageName}Scores.csv`,
        header: [
          { id: 'date', title: 'Date' },
          { id: 'accessibility', title: 'Accessibility' },
          { id: 'performance', title: 'Performance' },
          { id: 'best-practices', title: 'Best Practices' },
          { id: 'seo', title: 'SEO' }
        ]
      })

      // output accessibility issues to final CSV report
      try {
        await csvWriter.writeRecords(finalRes)
      } catch (err) {
        console.log(err)
      }
    })

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

const runAllTests = async () => {
  // iterate over tests array
  for (let i = 0; i < govTests.length; i++) {
    try {
      // run google-lighthouse-puppeteer test
      await lightpuppet.exec(govTests[i].test, options).then(async () => {
        console.log(`Completed test ${govTests[i].testName}.`)
      })

      // gets result files from test run on a single page (html, csv, and json)
      const files = fs.readdirSync(`${__dirname}\\results`)
      // array for tracking Accessibility Warnings found on page
      const tracker = []

      files.forEach(async file => {
        // folder being checks has more than just JSON files, need to check for .json extension
        if (file.slice(-4) === 'json') {
          console.log(`File: ${__dirname}`)
          if (file !== 'summary.json') {
            // all audits (accessibility, performance, best practices, etc.) found
            const audits = require(`${__dirname}\\results\\${file}`).audits

            // workable array of audits
            const entries = Object.entries(audits)

            // iterate through audits found and check against list of known accessibility violations
            // add to entries for each violation type to the tracker array
            for (let k = 0; k < entries.length; k++) {
              for (let j = 0; j < accessibilityWarnings.length; j++) {
                if (
                  entries[k][1].id === accessibilityWarnings[j].id &&
                  entries[k][1].details !== undefined
                ) {
                  // records the number of times this warning appeared
                  const freq = entries[k][1].details.items.length
                  if (freq > 0) {
                    // array to hold each element that triggered the warning
                    const snips = []
                    for (let l = 0; l < entries[k][1].details.items.length; l++) {
                      snips.push(entries[k][1].details.items[l].node.snippet)
                    }
                    // add entry to the tracker array for the given warning
                    tracker.push({
                      ...accessibilityWarnings[j],
                      impact: entries[k][1].details.diagnostic.impact,
                      frequency: freq,
                      title: entries[k][1].title,
                      description: entries[k][1].description,
                      snippets: snips
                    })
                  }
                }
              }
            }

            // writer to create the final accessibility csv file output
            const csvWriter = createCsvWriter({
              path: `${__dirname}\\AccessibilityCsvReports\\${govTests[i].testName}.csv`,
              header: [
                { id: 'id', title: 'Id' },
                { id: 'weight', title: 'Weight' },
                { id: 'group', title: 'Group' },
                { id: 'impact', title: 'Impact' },
                { id: 'frequency', title: 'Frequency' },
                { id: 'title', title: 'Title' },
                { id: 'description', title: 'Description' },
                { id: 'snippets', title: 'Elements' }
              ]
            })

            // output accessibility issues to final CSV report
            try {
              await csvWriter.writeRecords(tracker)
            } catch (err) {
              console.log(err)
            }

            const categories = require(`${__dirname}\\results\\${file}`).categories

            // Record category scores
            recordScores(file, govTests[i].testName, categories)

            // move json report to the json reports folder and rename
            fs.renameSync(
              `${__dirname}\\results\\${file}`,
              `${__dirname}\\JsonReports\\${govTests[i].testName}.json`
            )
          }
        } else if (file.slice(-4) === 'html') {
          // move html report to html reports folder and rename
          fs.renameSync(
            `${__dirname}\\results\\${file}`,
            `${__dirname}\\HtmlReports\\${govTests[i].testName}.html`
          )
        } else if (file.slice(-3) === 'csv') {
          // move full csv report to csv reports folder and rename
          fs.renameSync(
            `${__dirname}\\results\\${file}`,
            `${__dirname}\\FullCsvReports\\${govTests[i].testName}.csv`
          )
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
}

// run tests
runAllTests()
