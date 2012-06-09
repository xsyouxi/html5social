Ext.define("PublicChat.common.service.RestService", {
    extend: 'Ext.util.Observable',
    constructor: function(config){
        this.addEvents({
            "userAllResponse" : true
        });
        this.callParent(arguments)
    },

    getUsers: function () {
        var url = JavaScriptUtil.urls.createHttpLink("user/all");
        Ext.Ajax.request({
            url: url,
            scope: this,
            success: function(response, opts) {
                users = Ext.decode(response.responseText);
                this.fireEvent("userAllResponse", users);
            }
        });
    }

});


