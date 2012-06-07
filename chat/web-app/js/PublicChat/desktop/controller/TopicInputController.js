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

    mixins: {
        canPrintMessage: 'PublicChat.desktop.controller.handlers.CanPrintMessage',
        canUpdateUserList:  'PublicChat.desktop.controller.handlers.CanUpdateUserList',
        canSub: 'PublicChat.common.comet.CanSub'
    },

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
            topic: this.chatService.getPublicChannel(),
            scope: this
        });
    },

    setTopic: function () {
        this.chatService.setTopic(this.topicBuffer);
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
    }

});


