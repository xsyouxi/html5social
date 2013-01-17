Ext.define('Chat.controller.PrivateMessageOutputController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'messageGrid',
            selector: 'message-grid'
        }
    ],

    mixins: {
            canPrintMessage: 'Chat.controller.handlers.CanPrintMessage',
            canSub: 'Chat.comet.CanSub'
    },

    init: function() {
        this.privateChannel = this.subscribe({
            handler: this.printPrivateMessage,
            topic: this.chatService.getUserChannel(),
            scope: this,
            sub: this.privateChannel
        });
    }

});
