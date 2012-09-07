modules = {
    cometd {
        dependsOn 'jquery'

        resource url: [plugin:'cometd', dir:'js/org', file:'cometd.js']
        resource url: [plugin:'cometd', dir:'js/jquery', file:'jquery.cometd.js']
    }
}