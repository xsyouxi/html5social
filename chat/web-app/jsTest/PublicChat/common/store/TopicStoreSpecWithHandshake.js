describe("Test the TopicStoreListener while it has a connection to the server.", function() {

    var topicStoreListener,
        handshake,
        store,
        connected = false
        update = false;

    beforeEach(function () {
        handshake = Ext.create("PublicChat.common.comet.Handshake");
        topicStoreListener = Ext.create("PublicChat.common.store.TopicStoreListener", {
            storeId: "topic-store"
        });

        handshake.longPollingConnect({
            subAble: [
                topicStoreListener, {
                    init: function () {
                        connected = true;
                    }
                }
            ]
        });
        /*
        store = Ext.data.StoreManager.lookup("topic-store");
        store.on("update", function () {
           update = true;
        });
        */
    });

    afterEach(function () {
        update = false;
        connected = false;
    });

    it("Test that the server returns a topic.", function () {

        waitsFor(function () {
            return connected;
        });
        runs(function () {
            expect(false).toBe(true);
            //expect(store.count()).toBe(1);
        });

    });

});