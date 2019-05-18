/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars

class HomepageTest {
  getUrls() {
    return ['https://code.gov/roadmap']
  }

  connect(browser) {
    return new Promise(async (resolve, reject) => {
      const page = await browser.newPage()
      await page.goto('https://code.gov/', { waitUntil: 'load' })
      resolve(browser)
    })
  }
}

module.exports = new HomepageTest()
