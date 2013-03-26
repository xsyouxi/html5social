Ext.define("PublicChat.common.service.ChatService", {

    mixins: {
        canSub: 'PublicChat.common.comet.CanSub'
    },

    getUserChannel:function () {
        return PublicChat.common.comet.Channels.PRIVATE_CHANNEL  + JavaScriptUtil.system.currentUser;
    },

    constructor:function (config) {
        // TODO Create UserStoreListener and remove logic from ChatService.
        this.userList = Ext.create('PublicChat.common.store.UserStore', {
            storeId:"user-store"
        });
    },

    formatForSendMessage:function (message) {
        return {message:message};
    },

    publicMessage:function (message) {
        this.publishMessage(message, PublicChat.common.comet.Channels.MESSAGE_CHANNEL + PublicChat.common.comet.PublicChannel.topicId);
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


