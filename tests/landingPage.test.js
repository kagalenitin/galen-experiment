/**
 * Created by nkagale on 1/15/16.
 */
load("init.js");
load("pages/landingPage.js");

var landingPage = null;
var testDriver = null;
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

_test("Verify the Landing Page Header Elements", environment, gridURL, deviceType, browserName, function(){
    var driver = session.get("driver");
    landingPage = new LandingPage(driver);
    landingPage.load();
    checkLayout(driver, "./specs/landingPage.gspec", "header");
    checkLayout({
        driver: driver,
        spec: "./specs/landingPage.gspec",
        tags: deviceType,
        vars: {
            headerText: deviceType
        }
    });
});

_test("Verify the Landing Page Body", environment, gridURL, deviceType, browserName, function(){
    var driver = session.get("driver");
    landingPage = new LandingPage(driver);
    landingPage.load();

    checkLayout(driver, "./specs/landingPage.gspec", "body");

});