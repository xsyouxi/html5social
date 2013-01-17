Ext.define("Chat.service.ChatService", {

    statics:{
        MESSAGE_CHANNEL:"/chatMessage/",
        PRIVATE_CHANNEL: "/privateMessage/"
    },

    mixins: {
        canSub: 'Chat.comet.CanSub'
    },

    getUserChannel:function () {
        return Chat.service.ChatService.PRIVATE_CHANNEL  + JavaScriptUtil.system.currentUser;
    },

    getPublicChannel:function () {
        return Chat.service.ChatService.MESSAGE_CHANNEL + this.topic.get("topicId");
    },

    constructor:function (config) {
        this.topic = Ext.create("Chat.model.Topic", {
            topicId:"none",
            displayTopic:"none"
        });
        // TODO Create UserStoreListener and remove logic from ChatService.
        this.userList = Ext.create('Chat.store.UserStore', {
            storeId:"user-store"
        });
    },

    formatForSendMessage:function (message) {
        return {message:message};
    },

    publicMessage:function (message) {
        this.publishMessage(message, Chat.service.ChatService.MESSAGE_CHANNEL + this.topic.get("topicId"));
    },

    publishMessage:function (message, topic) {
        if (message.length > 0) {
            var channelId = topic;
            message = this.formatForSendMessage(message);
            $.cometd.publish(channelId, message);
            return true;
        } else {
            return false;
        }
    },

    formatTopicId:function (topic) {
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
    },

    setTopic:function (topic) {
        this.topic = Ext.create("Chat.model.Topic", {
            topicId:this.formatTopicId(topic),
            displayTopic:topic
        });
    },

    getMessage:function (message) {
        message = Ext.create("Chat.model.Message", {
            username:message.username,
            message:message.message
        });
        return message;
    },

    updateUserList:function (userList) {
        var users = [];
        Ext.each(userList, function (user, index, allItems) {
            users.push(
                Ext.create("Chat.model.User", {
                    username:user.username
                })
            );
        }, this);
        this.userList.loadRecords(users);
    }

});


