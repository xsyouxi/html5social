Ext.define("PublicChat.desktop.controller.handlers.CanUpdateUserList", {

    updateUserList: function (message) {
        var dataMessage = message.data,
            userList = dataMessage.userList,
            users;
        if (userList !== undefined) {
            users = [],
            Ext.each(userList, function (user, index, allItems) {
                users.push(
                    Ext.create("PublicChat.common.model.User", {
                        username:user.username
                    })
                );
            }, this);
            Ext.data.StoreManager.lookup('user-store').loadRecords(users);
        }
    }

});