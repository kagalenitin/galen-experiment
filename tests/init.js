/**
 * Created by nkagale on 1/15/16.
 */

var test_app_url = "http://testapp.galenframework.com";

//Grid browser capabilities. Ignore if you are not using grid:
var firefox_caps = {
    platform: "MAC",
    version: "34.0.5",
    browser: "firefox"
}

var chrome_caps = {
    platform: "MAC",
    browser: "chrome",
    version: "45.0.2454.85"
}

var safari_caps = {
    platform: "MAC",
    browser: "safari",
    version: "8.0.8"
}

/*
 * Global devices variable used for Selenium GRID setting.
 */
var devices = {
    mobile: {
        deviceName: "mobile",
        size: "360x640",
        tags: ["mobile"],
        getDriver: function(){
            return createGridDriver("http://<grid_url>", {
                desiredCapabilities: {
                    browserName: "Chrome",
                    platformName: "Android",
                    deviceName: "Samsung",
                    bundleId: "com.android.chrome"
                }
            });
        }
    },
    tablet: {
        deviceName: "tablet",
        size: "600x800",
        tags: ["tablet"],
        getDriver: function(){
            return createGridDriver("http://<grid_url>", {
                desiredCapabilities: {
                    browserName: "Chrome",
                    platformName: "iOS",
                    deviceName: "iPhone6",
                    udid: '<device_udid>'
                }
            });
        }
    },
    desktop: {
        deviceName: "desktop",
        size: "1900x1080",
        tags: ["desktop"],
        getDriver: function () {
            return createGridDriver("<grid_url>", this.size);
        }
    }
};


/*
 * Local devices variable.
 */
var localDevices = {
    mobile:{
        deviceName: "mobile",
        size: "360x640",
        tags: ["mobile"]
    },
    tablet:{
        deviceName: "tablet",
        size: "600x800",
        tags: ["tablet"]
    },
    desktop:{
        deviceName: "desktop",
        size: "1900x1080",
        tags: ["desktop"]
    }
}


/*
 ** selectGridWindowSize: Returns the size of window based on deviceType. Used for local runs only.
 ** deviceType: mobile/tablet/desktop
 */
function selectGridWindowSize(deviceType){
    if(deviceType == 'mobile'){
        return devices.mobile.size;
    }else if(deviceType == 'tablet'){
        return devices.tablet.size;
    }else if(deviceType == 'desktop'){
        return devices.desktop.size;
    }
}

/*
 ** selectWindowSize: Returns the size of window based on deviceType. Used for local runs only.
 ** deviceType: mobile/tablet/desktop
 */
function selectWindowSize(deviceType){
    if(deviceType == 'mobile'){
        return localDevices.mobile.size;
    }else if(deviceType == 'tablet'){
        return localDevices.tablet.size;
    }else if(deviceType == 'desktop'){
        return localDevices.desktop.size;
    }
}

/*
 ** selectEnvironment: Returns the environmentURL based on the environment parameter
 ** environment: local/dev/stage/prod
 */
function selectEnvironment(environment){
    if (environment == 'local'){
        return test_app_url;
    }else if(environment == 'dev'){
        return dev_guide_url;
    }else if(environment == 'stage'){
        return "";
    }else if(environment == 'prod'){
        return "";
    }
}

/*
 ** selectDriver: Returns the driver details based on deviceType parameter
 ** deviceType: mobile/tablet/desktop
 */
function selectDriver(deviceType){
    if(deviceType == 'mobile'){
        return devices.mobile.getDriver();
    }else if(deviceType == 'tablet'){
        return devices.tablet.getDriver();
    }else if(deviceType == 'desktop'){
        return devices.desktop.getDriver();
    }
}


/*
 ** openDriver: Returns the driver based on environment and deviceType
 ** environment: local/dev/stage/prod
 ** deviceType: mobile/tablet/desktop
 */
function openDriver(environment, deviceType) {
    var domain = selectEnvironment(environment);
    var size = selectWindowSize(deviceType);
    var driver = createDriver(null, size);
    session.put("driver", driver);

    driver.get(domain);
    return driver;
}

/*
 ** selectDesiredCapabilities: Returns the capabilities for Selenium GRID based on browserName parameter
 ** browserName: Firefox, Safari, Chrome
 */
function selectDesiredCapabilities(browserName){
    if(browserName == 'firefox'){
        return firefox_caps;
    }else if(browserName == 'chrome'){
        return chrome_caps;
    }else if(browserName =='safari'){
        return safari_caps;
    }
    //Default caps
    return firefox_caps;
}

afterTest(function (test) {
    var driver = session.get("driver");
    if (driver != null) {
        if (test.isFailed()) {
            session.report().info("Screenshot").withAttachment("Screenshot", takeScreenshot(driver));
        }
        driver.quit();
    }
});

/*
 ** _test: Initializes the web driver
 ** testNamePrefix: Name of the test that's running
 ** environment: dev, staging, prod
 ** gridURL: http://10.10.4.102:5555/wd/hub
 ** deviceType: mobile/tablet/desktop
 ** browserName: Firefox, Safari, Chrome
 ** callback: returns the method
 */
function _test(testNamePrefix, environment, gridURL, deviceType, browserName, callback) {

    test(testNamePrefix + " on " + deviceType+ " device", function (device) {
        if (gridURL == ""){
            var driver = openDriver(environment, deviceType);
        }else{
            var driver = openGridDriver(environment, gridURL, deviceType, browserName);
        }

        callback.call(this, driver, device);
    });
}

