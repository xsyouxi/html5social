modules = {

    extjs {
        resource url: [plugin:'extjs', dir:'js/ext', file:'ext-all-debug.js']
    }

    extjsGray {
        dependsOn 'extjs'
        resource url: [plugin:'extjs', dir:'js/ext/resources/css', file:'ext-all-gray.css']
    }

    extjs_min {
        resource url: [plugin:'extjs', dir:'js/ext', file:'ext-all.js']
    }

    extjs_gray_min {
        dependsOn 'extjs_min'
        resource url: [plugin:'extjs', dir:'js/ext/resources/css', file:'ext-all-gray.css']
    }
}