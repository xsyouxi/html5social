Ext.define('PublicChat.desktop.controller.PrivateMessageOutputController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'messageGrid',
            selector: 'message-grid'
        }
    ],

    mixins: [
        'PublicChat.desktop.controller.handlers.CanPrintMessage',
        'PublicChat.common.comet.CanSub'
    ],

    init: function() {
        this.privateChannel = this.subscribe({
            handler: this.printPrivateMessage,
            topic: this.chatService.getUserChannel(),
            scope: this,
            sub: this.privateChannel
        });
    }

});
