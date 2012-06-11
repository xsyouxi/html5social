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

    mixins: {
        canPrintMessage: 'PublicChat.desktop.controller.handlers.CanPrintMessage'
    },

    addKeyUpHandlerHandler: function (tabPanel, textField, index, eOpts) {
        textField.on("keyup", this.submitPrivateMessage, this);
    },

    submitPrivateMessage: function (textField, eventObject, options) {
        if (eventObject.getCharCode() == eventObject.ENTER) {
            var message = textField.getValue();
            var username = textField.title;
            this.printPrivateMessage({data: {message: message, username: username}});
            this.chatService.publishMessage(
                message,
                "/privateMessage/" + username
            );
            textField.reset();
        }
    },

    submitPublicMessage: function (textField, eventObject, options) {
        if (eventObject.getCharCode() == eventObject.ENTER) {
            this.chatService.publicMessage(textField.getValue());
            textField.reset();
        }
    },

    init: function () {
        var userTab = this.getUserTab();
        userTab.on("add", this.addKeyUpHandlerHandler, this);
        var publicTextField = this.getPublicTextField();
        publicTextField.on("keyup", this.submitPublicMessage, this);
    }

});
