modules = {

    extjs {
        resource url: 'js/ext/ext-all-debug.js'
    }

    extjsGray {
        dependsOn 'extjs'
        resource url: 'js/ext/resources/css/ext-all-gray.css'

    }
}