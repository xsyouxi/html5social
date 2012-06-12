Ext.define("PublicChat.common.service.ChatService", {

    statics: {
        MESSAGE_CHANNEL: "/chatMessage/",
        TOPIC_LIST: "/topicList/allTopics"
    },

    getAllTopicsChannel: function () {
      return PublicChat.common.service.ChatService.TOPIC_LIST;
    },

    getUserChannel: function () {
        return "/privateMessage/" + JavaScriptUtil.system.currentUser;
    },

    getPublicChannel: function() {
        return PublicChat.common.service.ChatService.MESSAGE_CHANNEL + this.topic.get("topicId");
    },

    constructor: function(config) {
        this.topic = Ext.create("PublicChat.common.model.Topic", {
            topicId: "none",
            displayTopic: "none"
        });
        this.userList = Ext.create('PublicChat.common.store.UserStore', {
            storeId: "user-store"
        });
        this.topicList = Ext.create('Ext.data.ArrayStore', {
            model: 'PublicChat.common.model.Topic',
            storeId: "topic-store"
        });

    },

    initTopicListener: function () {
        $.cometd.addListener("/meta/handshake", this, function(message) {
            $.cometd.subscribe(
                PublicChat.common.service.ChatService.TOPIC_LIST,
                this,
                function (message) {this.updateTopicList(message.data);});
        });
    },

    formatForSendMessage: function (message) {
        return {message: message};
    },

    publicMessage: function (message) {
        this.publishMessage(message, PublicChat.common.service.ChatService.MESSAGE_CHANNEL + this.topic.get("topicId"));
    },

    publishMessage: function (message, topic) {
        if (message.length > 0) {
            var channelId = topic;
            message = this.formatForSendMessage(message);
            $.cometd.publish(channelId, message);
            return true;
        } else {
            return false;
        }
    },

    formatTopicId: function (topic) {
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

    setTopic: function (topic) {
        this.topic = Ext.create("PublicChat.common.model.Topic", {
            topicId: this.formatTopicId(topic),
            displayTopic: topic
        });
    },

    getMessage: function (message) {
        message = Ext.create("PublicChat.common.model.Message", {
            username: message.username,
            message: message.message
        });
        return message;
    },

    updateUserList: function (userList) {
        var users = [];
        Ext.each(userList, function (user, index, allItems) {
            users.push(
                Ext.create("PublicChat.common.model.User", {
                    username: user.username
                })
            );
        }, this);
        this.userList.loadRecords(users);
    },

    replaceAll: function(txt, replace, with_this) {
        return txt.replace(new RegExp(replace, 'g'), with_this);
    },

    updateTopicList: function (topicList) {
        var topics = [];
        Ext.each(topicList, function (topic, index, allItems) {
            topics.push(
                Ext.create("PublicChat.common.model.Topic", {
                    topicId: topic.topic,
                    displayTopic: this.replaceAll(topic.topic, ",", " "),
                    numUsers: topic.numUsers
                })
            );
        }, this);
        this.topicList.loadRecords(topics);
    }

});


