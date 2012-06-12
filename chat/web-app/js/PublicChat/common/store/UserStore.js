Ext.define('PublicChat.common.store.UserStore', {
    extend: 'Ext.data.ArrayStore',
    model: 'PublicChat.common.model.User',

    constructor: function (config) {
        config = Ext.apply({
            filters: [this.isCurrentUser]
        }, config);
        this.callParent(arguments);
    },

    isCurrentUser: function (item) {
        return item.data.username === JavaScriptUtil.system.currentUser;
    }

});
