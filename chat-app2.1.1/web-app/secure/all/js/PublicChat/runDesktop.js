Ext.application({
    name:'Talk Hot Topic',
    launch:function () {
        var handshake,
            topicInputController,
            privateMessageOutputController,
            topicGridController,
            userTabController,
            userGridController,
            topicStoreListener,
            logoutController;

        // init cometd
        handshake = Ext.create("PublicChat.common.comet.Handshake");
        handshake.initCometD();

        // init controllers
        topicInputController = Ext.create("PublicChat.desktop.controller.TopicInputController");
        privateMessageOutputController = Ext.create("PublicChat.desktop.controller.PrivateMessageOutputController");
        topicGridController = Ext.create("PublicChat.desktop.controller.TopicGridController");
        userTabController = Ext.create("PublicChat.desktop.controller.UserTabController");
        userGridController = Ext.create("PublicChat.desktop.controller.UserGridController");
        logoutController = Ext.create("PublicChat.desktop.controller.LogoutController");

        // init stores
        topicStoreListener = Ext.create("PublicChat.common.store.TopicStoreListener", {
            storeId: "topic-store"
        });

        Ext.create('PublicChat.common.store.UserStore', {
            storeId:"user-store"
        });

        // init viewport
        Ext.create('PublicChat.desktop.view.Viewport', {
            listeners:{
                afterrender:function (viewport, ops) {
                    topicGridController.init();
                    userGridController.init();
                    userTabController.init();
                    logoutController.init();
                    $.cometd.addListener("/meta/handshake", function (message) {
                        privateMessageOutputController.init();
                        topicStoreListener.sub();
                        topicInputController.init();
                    });
                }
            }

        });

    }

});






