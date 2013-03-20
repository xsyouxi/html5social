modules = {
    application {
        resource url:'js/application.js'
    }

    rpg {
        resource url: 'secure/all/js/Rpg/view/RpgChannelView.js'
    }

    chat {
        resource url: 'secure/all/js/Chat/comet/CanSub.js'
        resource url: 'secure/all/js/Chat/service/ChatService.js'
        resource url: 'secure/all/js/Chat/comet/Handshake.js'
        resource url: 'secure/all/js/Chat/view/MainChatView.js'
        resource url: 'secure/all/js/Chat/view/MessageGridView.js'
        resource url: 'secure/all/js/Chat/view/TopicListView.js'
        resource url: 'secure/all/js/Chat/view/UserListView.js'
        resource url: 'secure/all/js/Chat/view/UserTabView.js'
        resource url: 'secure/all/js/Chat/store/TopicStoreListener.js'
        resource url: 'secure/all/js/Chat/store/UserStore.js'
        resource url: 'secure/all/js/Chat/model/Message.js'
        resource url: 'secure/all/js/Chat/model/Topic.js'
        resource url: 'secure/all/js/Chat/model/User.js'
        resource url: 'secure/all/js/Chat/handlers/LogoutHandler.js'
        resource url: 'secure/all/js/Chat/controller/handlers/CanPrintMessage.js'
        resource url: 'secure/all/js/Chat/controller/handlers/CanUpdateUserList.js'
        resource url: 'secure/all/js/Chat/controller/LogoutController.js'
        resource url: 'secure/all/js/Chat/controller/PrivateMessageOutputController.js'
        resource url: 'secure/all/js/Chat/controller/TopicGridController.js'
        resource url: 'secure/all/js/Chat/controller/TopicInputController.js'
        resource url: 'secure/all/js/Chat/controller/UserGridController.js'
        resource url: 'secure/all/js/Chat/controller/UserTabController.js'
    }

    home {
        resource url: 'secure/all/js/Home/view/Viewport.js'
        resource url: 'secure/all/js/Home/view/ChannelView.js'
        resource url: 'secure/all/js/Home/controller/ViewportController.js'
        resource url: 'secure/all/js/Home/view/MainTabView.js'
    }

    init {
        dependsOn 'cometd, extjs_4_1_1a_min, chat, rpg, home'
        resource url: 'secure/all/js/initDesktop.js'
    }

}
