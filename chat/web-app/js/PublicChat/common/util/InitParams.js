Ext.define("PublicChat.common.util.InitParams", {

    initParams: function (params) {
        if (Ext.isDefined(params)) {
            for(var param in params) {
                this[param] = params[param];
            }
        }
    }

});