modules = {
    application {
        resource url:'js/application.js'
    }

    rpg {
        resource url: 'secure/all/js/Rpg/view/RpgChannelView.js'
    }

    chat {
        resource url: 'secure/all/js/Chat/view/MainChatView.js'
        resource url: 'secure/all/js/Chat/view/MessageGridView.js'
        resource url: 'secure/all/js/Chat/view/TopicListView.js'
        resource url: 'secure/all/js/Chat/view/UserListView.js'
        resource url: 'secure/all/js/Chat/view/UserTabView.js'
    }

    home {
        resource url: 'secure/all/js/Home/view/Viewport.js'
        resource url: 'secure/all/js/Home/view/ChannelView.js'
        resource url: 'secure/all/js/Home/controller/ViewportController.js'
        resource url: 'secure/all/js/Home/view/MainTabView.js'
        resource url: 'secure/all/js/Home/view/MainToolbar.js'
    }

    init {
        dependsOn 'extjs_4_1_1a_min, chat, rpg, home'
        resource url: 'secure/all/js/initDesktop.js'
    }

}
