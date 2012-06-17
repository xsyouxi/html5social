modules = {
    application {
        resource url:'js/application.js'
    }

    common {
        dependsOn 'cometd, extjsGray'
        defaultBundle false
        resource url: "js/PublicChat/common/comet/Handshake.js"
        resource url: "js/PublicChat/common/comet/CanSub.js"
        resource url: "js/PublicChat/common/model/Message.js"
        resource url: "js/PublicChat/common/model/Topic.js"
        resource url: "js/PublicChat/common/store/TopicStoreListener.js"
        resource url: "js/PublicChat/common/model/User.js"
        resource url: "js/PublicChat/common/service/ChatService.js"
        resource url: "js/PublicChat/common/store/UserStore.js"
    }

    desktop {
        dependsOn 'common'
        defaultBundle false
        resource url: 'js/runDesktop.js'
        resource url: 'js/PublicChat/desktop/controller/handlers/CanPrintMessage.js'
        resource url: 'js/PublicChat/desktop/controller/handlers/CanUpdateUserList.js'
        resource url: 'js/PublicChat/desktop/controller/PrivateMessageOutputController.js'
        resource url: 'js/PublicChat/desktop/controller/TopicGridController.js'
        resource url: 'js/PublicChat/desktop/controller/TopicInputController.js'
        resource url: 'js/PublicChat/desktop/controller/UserGridController.js'
        resource url: 'js/PublicChat/desktop/controller/UserTabController.js'
        resource url: 'js/PublicChat/desktop/view/MessageGridView.js'
        resource url: 'js/PublicChat/desktop/view/TopicListView.js'
        resource url: 'js/PublicChat/desktop/view/UserListView.js'
        resource url: 'js/PublicChat/desktop/view/UserTabView.js'
        resource url: 'js/PublicChat/desktop/view/Viewport.js'
    }

}