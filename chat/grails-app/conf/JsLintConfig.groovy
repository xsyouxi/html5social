jslint.options = "white, sloppy, browser, unparam"
jslint.directory = "web-app/js"
jslint.includes = "**/*.js"
jslint.excludes = "application.js,**/*.min.js, **/i18n/**/*.js, **/prototype/*.js,**/*-min.js,**/*.pack.js"
jslint.haltOnFailure = true
jslint.preDef = "\$"
jslint.preDef = jslint.preDef + ",Ext, JavaScriptUtil, PublicChat"
jslint.reports = {

    MyXmlReport('xml') {                    // The report name "MyXmlReport" is user-defined; Report type is 'xml'
        destfile = 'target/test-reports/jslint.xml'  // Set the 'outputFile' property of the (XML) Report
    }
    MyHtmlReport('report') {                  // Report type is 'html'
        destfile = 'target/test-reports/jslint.html'
    }
}