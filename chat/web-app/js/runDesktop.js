Ext.application({
    name: 'Talk Hot Topic',
    launch: function() {
            var handshake = Ext.create("PublicChat.common.comet.Handshake");
            handshake.initCometD();

            var chatService = Ext.create("PublicChat.common.service.ChatService");

            var topicInputController = Ext.create("PublicChat.desktop.controller.TopicInputController", {
                chatService: chatService
            });

            var privateMessageOutputController = Ext.create("PublicChat.desktop.controller.PrivateMessageOutputController", {
                chatService: chatService
            });

            var topicGridController = Ext.create("PublicChat.desktop.controller.TopicGridController", {
                chatService: chatService
            });


            var userTabController = Ext.create("PublicChat.desktop.controller.UserTabController", {
                chatService: chatService
            });

            var userGridController = Ext.create("PublicChat.desktop.controller.UserGridController", {
                chatService: chatService
            });

            var topicStoreListener = Ext.create("PublicChat.common.store.TopicStoreListener", {
                storeId: "topic-store"
            });

        Ext.create('PublicChat.desktop.view.Viewport', {
                listeners: {
                    afterrender: function (viewport, ops) {
                        topicGridController.init();
                        userGridController.init();
                        userTabController.init();
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






