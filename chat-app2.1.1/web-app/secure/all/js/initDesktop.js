Ext.application({
    name: 'Social Network',
    launch: function() {
        var handshake,
            chatService,
            topicInputController,
            privateMessageOutputController,
            topicGridController,
            userTabController,
            userGridController,
            topicStoreListener;

        handshake = Ext.create("Chat.comet.Handshake");
        handshake.initCometD();

        // TODO remove chat service and replace with mixins
        chatService = Ext.create("Chat.service.ChatService");

        topicInputController = Ext.create("Chat.controller.TopicInputController", {
            chatService: chatService
        });

        privateMessageOutputController = Ext.create("Chat.controller.PrivateMessageOutputController", {
            chatService: chatService
        });

        topicGridController = Ext.create("Chat.controller.TopicGridController", {
            chatService: chatService
        });

        userTabController = Ext.create("Chat.controller.UserTabController", {
            chatService: chatService
        });

        userGridController = Ext.create("Chat.controller.UserGridController", {
            chatService: chatService
        });

        topicStoreListener = Ext.create("Chat.store.TopicStoreListener", {
            storeId: "topic-store"
        });


        var logoutController = Ext.create("Chat.controller.LogoutController");

        Ext.create('Home.view.Viewport', {
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






