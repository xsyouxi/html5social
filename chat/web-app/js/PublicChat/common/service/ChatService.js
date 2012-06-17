Ext.define("PublicChat.common.service.ChatService", {

    statics:{
        MESSAGE_CHANNEL:"/chatMessage/"
    },

    mixins: {
        canSub: 'PublicChat.common.comet.CanSub'
    },

    getUserChannel:function () {
        return "/privateMessage/" + JavaScriptUtil.system.currentUser;
    },

    getPublicChannel:function () {
        return PublicChat.common.service.ChatService.MESSAGE_CHANNEL + this.topic.get("topicId");
    },

    constructor:function (config) {
        // TODO all stores should be initialized in the runDesktop.js and accessed via the ext model manager
        this.topic = Ext.create("PublicChat.common.model.Topic", {
            topicId:"none",
            displayTopic:"none"
        });
        this.userList = Ext.create('PublicChat.common.store.UserStore', {
            storeId:"user-store"
        });
    },

    formatForSendMessage:function (message) {
        return {message:message};
    },

    publicMessage:function (message) {
        this.publishMessage(message, PublicChat.common.service.ChatService.MESSAGE_CHANNEL + this.topic.get("topicId"));
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
        var splitArray = topic.split(" ");
        var topicArray = [];
        Ext.each(splitArray, function (keyWord, index, allItems) {
            if (keyWord !== "") {
                topicArray.push(keyWord);
            }
        }, this);
        topicArray.sort();
        var topicId = topicArray.toString();
        return topicId.toLowerCase();
    },

    setTopic:function (topic) {
        this.topic = Ext.create("PublicChat.common.model.Topic", {
            topicId:this.formatTopicId(topic),
            displayTopic:topic
        });
    },

    getMessage:function (message) {
        message = Ext.create("PublicChat.common.model.Message", {
            username:message.username,
            message:message.message
        });
        return message;
    },

    updateUserList:function (userList) {
        var users = [];
        Ext.each(userList, function (user, index, allItems) {
            users.push(
                Ext.create("PublicChat.common.model.User", {
                    username:user.username
                })
            );
        }, this);
        this.userList.loadRecords(users);
    }

});


