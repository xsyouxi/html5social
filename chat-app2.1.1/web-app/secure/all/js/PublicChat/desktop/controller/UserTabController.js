Ext.define('PublicChat.desktop.controller.UserTabController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'topicInputField',
            selector: '#topic-input'
        },
        {
            ref: 'messageGrid',
            selector: 'message-grid'
        },
        {
            ref: 'userTab',
            selector: 'user-tab'
        },
        {
            ref: 'publicTextField',
            selector: '#public-text-field'
        }
    ],

    mixins: [
        'PublicChat.desktop.controller.handlers.CanPrintMessage',
        'PublicChat.common.comet.CanSub'
    ],

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

    addKeyUpHandlerHandler: function (tabPanel, textField, index, eOpts) {
        textField.on("keyup", this.submitPrivateMessage, this);
    },

    submitPrivateMessage: function (textField, eventObject, options) {
        if (eventObject.getCharCode() === eventObject.ENTER) {
            var message = textField.getValue(),
                username = textField.title;
            this.printPrivateMessage({data: {message: message, username: JavaScriptUtil.system.currentUser}});
            this.publishMessage(
                message,
                "/privateMessage/" + username
            );
            textField.reset();
        }
    },

    submitPublicMessage: function (textField, eventObject, options) {
        if (eventObject.getCharCode() === eventObject.ENTER) {
            this.publicMessage(textField.getValue());
            textField.reset();
        }
    },

    init: function () {
        var userTab = this.getUserTab(),
            publicTextField = this.getPublicTextField();
        userTab.on("add", this.addKeyUpHandlerHandler, this);
        publicTextField.on("keyup", this.submitPublicMessage, this);
    }

});
