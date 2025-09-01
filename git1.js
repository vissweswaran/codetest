const { Before, After, AfterStep } = require('@cucumber/cucumber');


Before(async function () {
  await this.launchBrowser();
  // this.loginPage = new LoginPage(this.page, this.config);
});

// AfterStep(async function ({ result }) {
//   if (result?.status === 'FAILED') {
//     const screenshot = await this.page.screenshot({ fullPage: true });
//     await this.attach(screenshot, 'image/png'); // attaches to report
//   }
// });

AfterStep(async function (scenario) {
  if (scenario.result.status === 'FAILED') {
    if (this.page) {
      const screenshot = await this.page.screenshot();
      this.attach(screenshot, 'image/png');
    }
    if (scenario.result.exception) {
      this.attach(scenario.result.exception.stack || scenario.result.exception.message);
    }
  }
});

After(async function () {
  await this.closeBrowser(); // no screenshot needed here
});
