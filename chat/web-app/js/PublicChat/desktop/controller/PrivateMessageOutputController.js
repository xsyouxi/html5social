Ext.define('PublicChat.desktop.controller.PrivateMessageOutputController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'messageGrid',
            selector: 'message-grid'
        }
    ],

    mixins: {
            canPrintMessage: 'PublicChat.desktop.controller.handlers.CanPrintMessage'
    },

    init: function() {
        $.cometd.subscribe(
            this.chatService.getUserChannel(),
            this, this.printPrivateMessage
        );
    }

});
