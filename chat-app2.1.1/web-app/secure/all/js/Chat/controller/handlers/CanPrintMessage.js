Ext.define("Chat.controller.handlers.CanPrintMessage" , {

    printMessage: function (message) {
        var dataMessage = message.data,
            messageGrid;
        if (dataMessage.message !== undefined && dataMessage.username) {
            messageGrid = this.getMessageGrid();
            messageGrid.getStore().add(this.chatService.getMessage(message.data));
            messageGrid.scrollByDeltaY(messageGrid.getEl().getHeight());
        }
    },

    printPrivateMessage: function (message) {
        var dataMessage,
            imMessage,
            username;

        dataMessage = message.data;
        imMessage = dataMessage.message;
        username = dataMessage.username;

        this.printMessage({data: {message: "<span style='color: #ff3c2f;';>"+imMessage+"</span>", username: "<span style='color: #ff3c2f;'>"+username+"</span>"}});
    }

});