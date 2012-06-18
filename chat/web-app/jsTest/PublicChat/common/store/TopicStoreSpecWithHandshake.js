describe("Test the TopicStoreListener while it has a connection to the server.", function() {

    var topicStoreListener;
    var canSub = Ext.create("PublicChat.common.comet.CanSub");
    var handshake;
    var store;
    var connected = false;
    var update = false;

    beforeEach(function () {
        handshake = Ext.create("PublicChat.common.comet.Handshake");
        topicStoreListener = Ext.create("PublicChat.common.store.TopicStoreListener", {
            storeId: "topic-store"
        });

        handshake.longPollingConnect({
            subAble: [
                topicStoreListener, {
                    sub: function () {
                        var sub = canSub.subscribe({
                            handler: function () {

                            },
                            sub:sub,
                            topic: "/chatMessage/none",
                            scope: sub
                        });
                        connected = true;
                    }
                }
            ]
        });

        store = Ext.data.StoreManager.lookup("topic-store");
        store.on("datachanged", function () {
           update = true;
        });


    });

    afterEach(function () {
        update = false;
        connected = false;
    });

    it("Test that the server returns a topic.", function () {
        waitsFor(function () {
            return connected && update;
        });
        runs(function () {
            expect(store.count()).toBe(1);
        });


    });

});