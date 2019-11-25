const { Given, When, Then, AfterAll, setDefaultTimeout } = require('cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai');
//Set default time out
setDefaultTimeout(90 * 1000);
//reference to Page Models
const LoginPage = require("../../pom/loginPage");
const MainPage = require("../../pom/mainPage");

require("chromedriver");
//Declarations, Capabities Desired
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();
//Create Page Models Objects
const loginpage = new LoginPage(driver);
const mainPage = new MainPage(driver);

//Start step execution
Given('the user is on gmail login page',{ timeout: 600 * 1000 }, async function () {
    
    await loginpage.goTo();
});

When('the user fill the mail field and put correct password',async function () {
    
    await loginpage.writeEmail("test.automation8412@gmail.com");
    await loginpage.clickOnElementById("identifierNext");
    
    (async function(){
      //Set Timeouts
        await driver.manage().setTimeouts( { implicit: 60000 } );
        await loginpage.writePassword("23112019");
        }());
});

Then('page show a error message', async function(){
  var result = await loginpage.wrongPassword()
  expect(result).to.equal(true);
});

Then('the user fill the password field with correct password' ,async function () {

  (async function(){
    await driver.manage().setTimeouts( { implicit: 60000 } );
    await loginpage.writePassword("23112019");
  }());
});

Then('the user go to main page', async function(){
  //while a element not found, try find.
  while(true){
    try{
      await loginpage.clickOnElementById("passwordNext");
      //if is found, break the while
      break;
    }catch(e){
      console.log("the user go to main page, intent again...");
    }
  } 
});

When('the user is on main page, make clic on compose',async function () {
    await mainPage.makeClickOnCompose();
    //await mainPage.verifyInbox();
});

Then('the user fill the basic fields',async function () {
    await mainPage.fillToField();
    await mainPage.fillSubjectField();
});

Then('send the mail',async function () {
    await mainPage.clickOnSendButton();
    //await mainPage.discardDraft();
    //return 'pending';
  });

Then('fill the field CC and BCC', async function () {
    //await mainPage.activateCCfield(); 
      await mainPage.fillToField();
      await mainPage.activateCCfield();
      await mainPage.fillCCfield("luis.delosreyes01@gmail.com");
      await mainPage.activateBCCfield();
      await mainPage.fillBCCfield("luis.delosreyes01@gmail.com");
      await mainPage.fillSubjectField();
  }); 

  Then('fill the field to with {string}', async function (string) {
    await mainPage.fillToFieldWithValue(string);
    await mainPage.fillSubjectFieldRamdom();
  });

  Then('verify',async function () {
    var result = await mainPage.verifyInbox();
    expect(result).to.equal(true);
  });

  Then('make click on discard draft', async function () {
    await mainPage.discardDraft();
  });

  Then('delete the first top message on the inbox',async function () {
    mainPage.sleep(5000);
    await mainPage.selectFirstMessage();
    await mainPage.makeClickOnDelete();
  });
  //if all steps is ended, quit the driver
  AfterAll(function(){
    driver.quit();
  });