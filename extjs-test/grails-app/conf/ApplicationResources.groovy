modules = {
    application {
        resource url:'js/application.js'
    }

    test {
        dependsOn "extjsGray"
        resource url: 'js/helloWorld.js'
    }
}