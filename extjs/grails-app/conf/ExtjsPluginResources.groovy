modules = {

    extjs {
        resource url: [plugin:'extjs', dir:'js/ext', file:'ext-all-debug.js']
    }

    extjsGray {
        dependsOn 'extjs'
        resource url: [plugin:'extjs', dir:'js/ext/resources/css', file:'ext-all-gray.css']
    }
}