Ext.define("PublicChat.common.comet.Handshake", {

    initCometD: function () {
        this.addUnsuccessfulListener();
        this.initReloadExtension();
        this.connect(true);
    },

    connect: function (tryWebSockets) {
        this.configure(tryWebSockets);
        this.handshake();
    },

    initReloadExtension: function () {
        $.cometd.getExtension('reload').configure({
            cookieMaxAge: 10
        });
        $.cometd.reload({
            cookieMaxAge: 10
        });
    },

    configure: function (tryWebSockets) {
        var url;
        if (window.WebSocket !== undefined && tryWebSockets) {
            if (window.console !== undefined) {
                console.log("Trying web-sockets.");
            }
            $.cometd.websocketEnabled = true;
            url = JavaScriptUtil.urls.createWsLink("cometd");
        } else {
            if (window.console !== undefined) {
                console.log("Trying long-polling.");
            }
            $.cometd.websocketEnabled = false;
            url = JavaScriptUtil.urls.createHttpLink("cometd");
        }
        $.cometd.configure({
            url: url
        });
    },

    handshake: function () {
        $.cometd.handshake();
    },

    addUnsuccessfulListener: function () {
        $.cometd.addListener('/meta/unsuccessful', this, function(message) {
            this.connect(false);
        });
    }

});