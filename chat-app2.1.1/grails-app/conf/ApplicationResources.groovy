modules = {
    application {
        resource url:'js/application.js'
    }

    common {
        dependsOn 'cometd, extjs_4_1_1a_min'
        resource url: "secure/all/js/PublicChat/common/comet/Handshake.js"
        resource url: "secure/all/js/PublicChat/common/comet/CanSub.js"
        resource url: "secure/all/js/PublicChat/common/model/Message.js"
        resource url: "secure/all/js/PublicChat/common/model/Topic.js"
        resource url: "secure/all/js/PublicChat/common/store/TopicStoreListener.js"
        resource url: "secure/all/js/PublicChat/common/model/User.js"
        resource url: "secure/all/js/PublicChat/common/service/ChatService.js"
        resource url: "secure/all/js/PublicChat/common/store/UserStore.js"
        resource url: "secure/all/js/PublicChat/common/handlers/LogoutHandler.js"
    }

    desktop {
        dependsOn 'common'
        resource url: 'secure/all/js/PublicChat/initChat.js'
        resource url: 'secure/all/js/PublicChat/desktop/controller/handlers/CanPrintMessage.js'
        resource url: 'secure/all/js/PublicChat/desktop/controller/handlers/CanUpdateUserList.js'
        resource url: 'secure/all/js/PublicChat/desktop/controller/PrivateMessageOutputController.js'
        resource url: 'secure/all/js/PublicChat/desktop/controller/TopicGridController.js'
        resource url: 'secure/all/js/PublicChat/desktop/controller/TopicInputController.js'
        resource url: 'secure/all/js/PublicChat/desktop/controller/UserGridController.js'
        resource url: 'secure/all/js/PublicChat/desktop/controller/UserTabController.js'
        resource url: 'secure/all/js/PublicChat/desktop/controller/LogoutController.js'
        resource url: 'secure/all/js/PublicChat/desktop/view/MessageGridView.js'
        resource url: 'secure/all/js/PublicChat/desktop/view/TopicListView.js'
        resource url: 'secure/all/js/PublicChat/desktop/view/UserListView.js'
        resource url: 'secure/all/js/PublicChat/desktop/view/UserTabView.js'
        resource url: 'secure/all/js/PublicChat/desktop/view/Viewport.js'
    }

    home {
        dependsOn 'extjs_4_1_1a_min'
        resource url: 'secure/all/js/initDesktop.js'
        resource url: 'secure/all/js/Home/view/Viewport.js'
        resource url: 'secure/all/js/Home/view/ChannelView.js'
        resource url: 'secure/all/js/Home/controller/ViewportController.js'
        resource url: 'secure/all/js/PublicChat/desktop/view/TopicListView.js'
        resource url: 'secure/all/js/Rpg/view/RpgChannelView.js'
        resource url: 'secure/all/js/Home/view/MainTabView.js'
        resource url: 'secure/all/js/PublicChat/desktop/view/UserListView.js'
        resource url: 'secure/all/js/Home/view/MainToolbar.js'
        resource url: 'secure/all/js/PublicChat/view/MainChatView.js'
    }
}