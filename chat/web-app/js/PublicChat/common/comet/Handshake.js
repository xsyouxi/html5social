Ext.define("PublicChat.common.comet.Handshake", {

    initCometD: function () {
        this.addUnsuccessfulListener();
        this.initReloadExtension();
        this.connect(false);
    },

    connect: function (tryWebSockets) {
        this.configure(tryWebSockets);
        $.cometd.handshake();
    },

    initReloadExtension: function () {
        $.cometd.getExtension('reload').configure({
            cookieMaxAge: 10
        });
        $.cometd.reload({
            cookieMaxAge: 10
        });
    },

    webSocketConnect: function () {
        $.cometd.websocketEnabled = true;
        url = JavaScriptUtil.urls.createWsLink("cometd");
        $.cometd.configure({
            url: url
        });
        $.cometd.handshake();
    },

    longPollingConnect: function (params) {
        if (Ext.isDefined(params) && Ext.isDefined(params.subAble)) {
            this.subAble = params.subAble;
        }
        this.initSubAbles();
        $.cometd.websocketEnabled = false;
        url = JavaScriptUtil.urls.createHttpLink("cometd");
        $.cometd.configure({
            url: url
        });
        $.cometd.handshake();
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
            this.longPollingConnect();
        }

        if (JavaScriptUtil.system.env === 'production') {
            $.cometd.configure({
                url: url
            });
        } else {
            $.cometd.configure({
                url: url//,
               // logLevel: 'debug'
            });
        }

    },

    initSubAbles: function () {
        var inits = this.subAble;
        $.cometd.addListener("/meta/handshake", function(message) {
            Ext.each(inits, function(initObj) {
                initObj.sub();
            });
        });
    },

    addUnsuccessfulListener: function () {
        $.cometd.addListener('/meta/unsuccessful', this, function(message) {
            this.connect(false);
        });
    }

});