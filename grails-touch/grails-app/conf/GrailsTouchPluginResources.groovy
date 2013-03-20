modules = {

    touch_2_1_0_debug {
        resource url: [plugin:'grails-touch', dir:'sencha-touch-2.1.0-gpl', file:'sencha-touch-all-debug.js']
        resource url: [plugin:'grails-touch', dir:'sencha-touch-2.1.0-gpl/resources/css', file:'sencha-touch.css']
    }

    touch_2_1_0_min {
        resource url: [plugin:'grails-touch', dir:'sencha-touch-2.1.0-gpl', file:'sencha-touch-all.js']
        resource url: [plugin:'grails-touch', dir:'sencha-touch-2.1.0-gpl/resources/css', file:'sencha-touch.css']
    }
}