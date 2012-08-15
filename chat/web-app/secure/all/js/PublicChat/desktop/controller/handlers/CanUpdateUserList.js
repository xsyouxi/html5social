Ext.define("PublicChat.desktop.controller.handlers.CanUpdateUserList", {

    updateUserList: function (message) {
        var dataMessage = message.data;
        if (dataMessage.userList !== undefined) {
            this.chatService.updateUserList(dataMessage.userList);
        }
    }

});