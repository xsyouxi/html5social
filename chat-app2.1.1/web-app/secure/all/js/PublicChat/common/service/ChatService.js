Ext.define("PublicChat.common.service.ChatService", {

    mixins: {
        canSub: 'PublicChat.common.comet.CanSub'
    },

    getUserChannel:function () {
        return PublicChat.common.comet.Channels.PRIVATE_CHANNEL  + JavaScriptUtil.system.currentUser;
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
    }

});


