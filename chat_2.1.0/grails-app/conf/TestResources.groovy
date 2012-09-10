modules = {
    test_HandShake {
        defaultBundle false
        dependsOn 'cometd, extjs, common, jasmine'
        resource url: 'secure/all/js/PublicChat/common/service/RestService.js'
        resource url: 'secure/tester/jsTest/PublicChat/common/comet/HandshakeSpec.js'
    }

    topic_store_listener_test {
        defaultBundle false
        dependsOn 'cometd, extjs, common, jasmine'
        resource url: 'secure/tester/jsTest/PublicChat/common/store/TopicStoreSpec.js'
    }

    topic_store_spec_with_handshake {
        defaultBundle false
        dependsOn 'cometd, extjs, common, jasmine'
        resource url: 'secure/tester/jsTest/PublicChat/common/store/TopicStoreSpecWithHandshake.js'
    }

    private_im_security_test {
        defaultBundle false
        dependsOn 'cometd, extjs, common, jasmine'
        resource url: 'secure/tester/jsTest/PublicChat/common/comet/PrivateImSecurityTest.js'
    }

}