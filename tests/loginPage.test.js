/**
 * Created by nkagale on 1/15/16.
 */
load("init.js");
load("pages/landingPage.js");
load("pages/loginPage.js");

var landingPage = null;
var loginPage = null;
var environment = null;
var deviceType = null;
var gridURL = null;
var browserName = null;

deviceType = System.getProperty("deviceType");
gridURL = System.getProperty("gridURL");
browserName = System.getProperty("browserName");
environment = System.getProperty("environment");

if(gridURL == null){
    gridURL = "";
}

_test("Verify the Login Page Elements", environment, gridURL, deviceType, browserName, function(){
    var driver = session.get("driver");
    landingPage = new LandingPage(driver);
    loginPage = new LoginPage(driver);
    landingPage.load();
    landingPage.loginButton.click();
    loginPage.load();
    checkLayout(driver, "./specs/loginPage.gspec", deviceType);
});


_test("Verify the Login Page Error Text Element", environment, gridURL, deviceType, browserName, function(){
    var driver = session.get("driver");
    landingPage = new LandingPage(driver);
    loginPage = new LoginPage(driver);
    landingPage.load();
    landingPage.loginButton.click();
    loginPage.load();
    loginPage.incorrectUserLogin("test", "tester");
    checkLayout(driver, "./specs/loginPage.gspec", "error");
});

//Will retry the tests in case of failures
testRetry(function (_test, retryCount){
    // Retrying only Test A
    if (retryCount < 3) {
        return true;
    }
    else {
        return false;
    }
});