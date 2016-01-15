#!/usr/bin/env bash
if [ "$1" == "smoke" ]; then
echo "Execution started at $(date)"
    SECONDS=0
    galen test tests/loginPage.test.js --testngreport reports/testng-results.xml --htmlreport reports/reports_landing -Denvironment=$2 -DdeviceType=$3 -DbrowserName=firefox --filter "Verify the Login Page Elements*"
    galen test tests/landingPage.test.js --testngreport reports/testng-results.xml --htmlreport reports/reports_login -Denvironment=$2 -DdeviceType=$3 -DbrowserName=firefox --filter "Verify the Landing Page Header Elements*"
    duration=$SECONDS
    echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."
    echo "Execution finished at $(date)"
elif [ "$1" == "regression" ]; then
    echo "Regression started at $(date)"
    galen test tests/*.test.js -Denvironment=$2 --testngreport results/testng-results.xml --htmlreport reports -DdeviceType=$3 -DbrowserName=firefox
    echo "Regression finished at $(date)"
else
    echo "Wrong arguments passed"
fi