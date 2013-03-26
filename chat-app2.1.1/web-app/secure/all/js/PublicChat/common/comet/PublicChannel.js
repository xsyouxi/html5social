Ext.define("PublicChat.common.comet.PublicChannel", {
    singleton: true,

    topicId: "none",
    displayTopic: "none",


    setChannel: function (channel) {
        this.topicId = this.formatChannelId(channel),
        this.displayTopic = channel;
    },

    formatChannelId:function (topic) {
        var splitArray = topic.split(" "),
            topicArray = [],
            topicId;

        Ext.each(splitArray, function (keyWord, index, allItems) {
            if (keyWord !== "") {
                topicArray.push(keyWord);
            }
        }, this);
        topicArray.sort();
        topicId = topicArray.toString();
        return topicId.toLowerCase();
    }

});
