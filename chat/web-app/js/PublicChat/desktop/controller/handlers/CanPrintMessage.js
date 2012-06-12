Ext.define("PublicChat.desktop.controller.handlers.CanPrintMessage" , {

    printMessage: function (message) {
        var dataMessage = message.data;
        if (dataMessage.message !== undefined && dataMessage.username) {
            var messageGrid = this.getMessageGrid();
            messageGrid.getStore().add(this.chatService.getMessage(message.data));
            messageGrid.scrollByDeltaY(messageGrid.getEl().getHeight());
        }
    },

    printPrivateMessage: function (message) {
        var dataMessage = message.data;
        var message = dataMessage.message;
        var username = dataMessage.username;
        this.printMessage({data: {message: "<span style='color: red';>"+message+"</span>", username: "<span style='color: red;'>"+username+"</span>"}});
    }

});