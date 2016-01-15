# galen-experiment
I am creating this example project to create galen tests using the JavaScript implementation. Refer to [Galen Framework][1] for more details.
All tests will be created using the testapp.galenframework.com website.

# Prerequisite:
	Install npm: https://nodejs.org/en/

# Setup:
1. Checkout the code from terminal
2. On terminal, run the command
	```
		npm install
	```
	This will install the galen framework
3. After successful installation, type:
	```
	galen -v
	Galen Framework
    Version: 2.2.1
    JavaScript executor: Rhino 1.7 release 5 2015 01 29
	```

# Run Test:
1. You can run test using the shell script.
    ```
        ./run.sh smoke local desktop
    ```
    This will run the smoke test on desktop resolution.
2. Or you can run the galen test command:
    ```
        galen test tests/*.test.js -Denvironment=local --htmlreport reports -DdeviceType=desktop -DbrowserName=firefox
    ```

[1]: http://galenframework.com
