const { setWorldConstructor, World, setDefaultTimeout  } = require('@cucumber/cucumber');
const { chromium} = require('@playwright/test');
const path = require('path');



// Load config based on ENV
const env = process.env.ENV || 'qa';
const config = require(path.join(__dirname, '../Newage/Configs', `${env}.js`));

// Set Cucumber step default timeout to 30 seconds
setDefaultTimeout(30 * 1000);

class CustomWorld extends World {
  
  constructor(options) {
    super(options); // ✅ gets attach() and parameters from Cucumber
    this.config = config;
  }

  async launchBrowser() {
    this.browser = await chromium.launch({ headless: this.config.headless,
       args: ['--start-maximized'],  
     });
    this.context = await this.browser.newContext({viewport: null, });
    this.page = await this.context.newPage();
    
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);


