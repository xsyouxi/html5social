grails.servlet.version = "2.5" // Change depending on target container compliance (2.5 or 3.0)
grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.project.test.reports.dir = "target/test-reports"
grails.project.target.level = 1.6
grails.project.source.level = 1.6
grails.project.war.file = "/Users/kblanchard/side_projects/jetty-hightide-8.1.7.v20120910/webapps/ROOT.war"

grails.project.dependency.resolution = {
    // inherit Grails' default dependencies
    inherits("global") {
        // specify dependency exclusions here; for example, uncomment this to disable ehcache:
        // excludes 'ehcache'
    }
    log "error" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'
    checksums true // Whether to verify checksums on resolve

    repositories {
        inherits true // Whether to inherit repository definitions from plugins

        grailsPlugins()
        grailsHome()
        grailsCentral()

        mavenLocal()
        mavenCentral()

        // uncomment these (or add new ones) to enable remote dependency resolution from public Maven repositories
        //mavenRepo "http://snapshots.repository.codehaus.org"
        //mavenRepo "http://repository.codehaus.org"
        //mavenRepo "http://download.java.net/maven/2/"
        //mavenRepo "http://repository.jboss.com/maven2/"
    }
    dependencies {
        // specify dependencies here under either 'build', 'compile', 'runtime', 'test' or 'provided' scopes eg.

        // runtime 'mysql:mysql-connector-java:5.1.20'
    }

    plugins {
        runtime ":hibernate:$grailsVersion"
        runtime ":jquery:1.8.0"
        //runtime ":resources:1.1.6"
        runtime ":resources:1.2.RC2"

        // Uncomment these (or add new ones) to enable additional resources capabilities
       // runtime ":zipped-resources:1.0"
      //  runtime ":cached-resources:1.0"
        runtime ":yui-minify-resources:0.1.5"

     //   build ":tomcat:$grailsVersion"

        runtime ":database-migration:1.1"

        compile ':cache:1.0.0'

        // Spring Security
        runtime ":spring-security-core:1.2.3"
        compile ":mail:1.0"
        compile ":jquery-ui:1.8.7"
        compile ":famfamfam:1.0"
        compile ":spring-security-ui:0.2"
    }

    // Use Jetty
    grails.plugin.location.'jetty' = "../grails-plugins-grails-jetty-3dc1738"

    // Ext JS Resources
    grails.plugin.location.'extjs' = "../extjs"

    // Cometd Plugin
    grails.plugin.location.'cometd-plugin' = "../grails-cometd"

    // Jasmine Resources
  //  grails.plugin.location.'jasmine-plugin' = "../grails-jasmine"


}
