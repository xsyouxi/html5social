// TODO Break this file up into at least 2 controllers
Ext.define("PublicChat.desktop.controller.TopicInputController", {
    extend: 'Ext.app.Controller',

    topicBuffer: "none",

    refs: [
        {
            ref: 'messageGrid',
            selector: 'message-grid'
        },
        {
            ref: 'topicInputField',
            selector: '#topic-input'
        }
    ],

    mixins: [
        'PublicChat.desktop.controller.handlers.CanPrintMessage',
        'PublicChat.desktop.controller.handlers.CanUpdateUserList',
        'PublicChat.common.comet.CanSub'
    ],

    publicChannelHandler: function (message) {
       this.updateUserList(message);
       this.printMessage(message);
    },

    updateTopic: function (textField, eventObject, options) {
        this.topicBuffer = textField.getValue();
        if (textField.skipDelay) {
            Ext.apply(textField, {skipDelay: false});
            this.setTopic();
        } else {
            var task = new Ext.util.DelayedTask(function() {
                this.setTopic();
            }, this);
            task.delay(3000);
        }
    },

    updatePublicChannel: function () {
        this.publicChannel = this.subscribe({
            handler: this.publicChannelHandler,
            sub: this.publicChannel,
            topic: PublicChat.common.comet.Channels.MESSAGE_CHANNEL + PublicChat.common.comet.PublicChannel.topicId,
            scope: this
        });
    },

    setTopic: function () {
        PublicChat.common.comet.PublicChannel.setChannel(this.topicBuffer);
        this.updatePublicChannel();
    },

    /**
     * Require:
     *   view instance of Ext.form.TextField
     */
    init: function () {
       var topicField = this.getTopicInputField();
       topicField.on("keyup", this.updateTopic, this);
       this.setTopic();
    },

    // TODO keep the different user tabs in sync
    sub: function () {
        this.privateChannel = this.subscribe({
            handler: this.printPrivateMessage,
            topic: PublicChat.common.comet.Channels.PRIVATE_CHANNEL  + JavaScriptUtil.system.currentUser + "/sessionUpdatex`",
            scope: this,
            sub: this.privateChannel
        });
    }

});


