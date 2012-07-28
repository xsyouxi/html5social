Ext.define("PublicChat.common.comet.Handshake", {

    statics:{
        MAX_FAILURES: 10
    },

    initCometD: function () {
        this.failures = 0;
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
        var url = JavaScriptUtil.urls.createWsLink("cometd");
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
        var url = JavaScriptUtil.urls.createHttpLink("cometd");
        $.cometd.configure({
            url: url
        });
        $.cometd.handshake();
    },

    configure: function (tryWebSockets) {
        var url;
        if (window.WebSocket !== undefined && tryWebSockets) {
            JavaScriptUtil.log("Trying web sockets.");
            $.cometd.websocketEnabled = true;
            url = JavaScriptUtil.urls.createWsLink("cometd");
        } else {
            JavaScriptUtil.log("Trying long-polling.");
            this.longPollingConnect();
        }

        if (JavaScriptUtil.system.env === 'production') {
            $.cometd.configure({
                url: url
            });
        } else {
            $.cometd.configure({
                url: url,
                logLevel: 'debug'
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
            this.failures = this.failures + 1;
            if (this.failures >= PublicChat.common.comet.Handshake.MAX_FAILURES) {
                document.location = JavaScriptUtil.urls.root + "logout";
            }
            this.connect(false);
        });
    }

});