Ext.application({
    name: 'Talk Hot Topic',
    launch: function() {
            var handshake,
                chatService,
                topicInputController,
                privateMessageOutputController,
                topicGridController,
                userTabController,
                userGridController,
                topicStoreListener;

            handshake = Ext.create("PublicChat.common.comet.Handshake");
            handshake.initCometD();

            // TODO remove chat service and replace with mixins
            chatService = Ext.create("PublicChat.common.service.ChatService");

            topicInputController = Ext.create("PublicChat.desktop.controller.TopicInputController");

            privateMessageOutputController = Ext.create("PublicChat.desktop.controller.PrivateMessageOutputController", {
                chatService: chatService
            });

            topicGridController = Ext.create("PublicChat.desktop.controller.TopicGridController");

            userTabController = Ext.create("PublicChat.desktop.controller.UserTabController", {
                chatService: chatService
            });

            userGridController = Ext.create("PublicChat.desktop.controller.UserGridController", {
                chatService: chatService
            });

            topicStoreListener = Ext.create("PublicChat.common.store.TopicStoreListener", {
                storeId: "topic-store"
            });

            Ext.create('PublicChat.common.store.UserStore', {
                storeId:"user-store"
            });


            var logoutController = Ext.create("PublicChat.desktop.controller.LogoutController");

        Ext.create('PublicChat.desktop.view.Viewport', {
                listeners: {
                    afterrender: function (viewport, ops) {
                        topicGridController.init();
                        userGridController.init();
                        userTabController.init();
                        logoutController.init();
                        $.cometd.addListener("/meta/handshake", function(message) {
                            privateMessageOutputController.init();
                            topicStoreListener.sub();
                            topicInputController.init();
                        });
                    }
                }

            });

    }

});






