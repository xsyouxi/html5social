modules = {
    cometd {
        defaultBundle false
        resource url: [plugin:'cometd', dir:'js/jquery', file:'jquery-1.6.4.js']
        resource url: [plugin:'cometd', dir:'js/org', file:'cometd.js']
        resource url: [plugin:'cometd', dir:'js/org/cometd', file:'AckExtension.js']
        resource url: [plugin:'cometd', dir:'js/org/cometd', file:'ReloadExtension.js']
        resource url: [plugin:'cometd', dir:'js/jquery', file:'json2.js']
        resource url: [plugin:'cometd', dir:'js/jquery', file:'jquery.cookie.js']
        resource url: [plugin:'cometd', dir:'js/jquery', file:'jquery.cometd.js']
        resource url: [plugin:'cometd', dir:'js/jquery', file:'jquery.cometd-reload.js']

    }
}