Ext.define('Chat.store.TopicStoreListener', {

    statics:{
        TOPIC_LIST:"/topicList/allTopics"
    },

    mixins:{
        canSub:'Chat.comet.CanSub'
    },

    constructor:function (config) {
        this.storeId = config.storeId;
        this.topicList = Ext.create('Ext.data.ArrayStore', {
            model:'Chat.model.Topic',
            storeId:this.storeId
        });
    },

    sub:function () {
        this.topicListChannel = this.subscribe({
            handler:this.update,
            topic:Chat.store.TopicStoreListener.TOPIC_LIST,
            scope:this,
            sub:this.topicListChannel
        });
    },

    update:function (params) {
        var topicList = params.data,
            topics = [];
        Ext.each(topicList, function (topic, index, allItems) {
            topics.push(
                Ext.create("Chat.model.Topic", {
                    topicId:topic.topic,
                    displayTopic:this.replaceAll(topic.topic, ",", " "),
                    numUsers:topic.numUsers
                })
            );
        }, this);
        this.topicList.loadRecords(topics);
    },

    replaceAll:function (txt, replace, with_this) {
        return txt.replace(new RegExp(replace, 'g'), with_this);
    }

});
