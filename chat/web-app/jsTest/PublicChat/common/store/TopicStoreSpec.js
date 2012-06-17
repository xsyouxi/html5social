describe("Test that the user gets a response of all topics.", function() {

    var topicStoreListener,
        store;

    beforeEach(function () {
        topicStoreListener = Ext.create("PublicChat.common.store.TopicStoreListener", {
            storeId: "topic-store"
        });
        store = Ext.data.StoreManager.lookup("topic-store");
    });

    afterEach(function () {
        topicStoreListener = undefined;
    });

    it("Test that the store was created and we can access it with the model manager.", function () {
        expect(store).toBeDefined();
    });

    it("Test that records can be added to the store.", function () {
        var topics = [
            {
                topic: "0",
                numUsers: 50
            },
            {
                topic: "1",
                numUsers: 50
            },
            {
                topic: "3",
                numUsers: 50
            }
        ];
        topicStoreListener.update({
           data: topics
        });
        expect(store.count()).toBe(3);
    });

});