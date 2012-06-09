modules = {
    test_HandShake {
        defaultBundle false
        dependsOn 'cometd, extjs, jasmine'
        resource url: "js/PublicChat/common/service/RestService.js"
        resource url: "js/PublicChat/common/model/Topic.js"
        resource url: "js/PublicChat/common/service/ChatService.js"
        resource url: "js/PublicChat/common/comet/Handshake.js"
        resource url: 'jsTest/PublicChat/common/comet/HandshakeSpec.js'
    }
}