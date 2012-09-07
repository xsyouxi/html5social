Ext.define("PublicChat.common.comet.Handshake", {

    statics:{
        MAX_FAILURES: 10
    },

    constructor: function (config) {
        this.failures = 0;
    },

    initCometD:function () {
        this.addUnsuccessfulListener();
        this.init(true);
    },

    init:function (tryWebSockets) {
        var url, ext;
        if (window.WebSocket !== undefined && tryWebSockets) {
            console.log("Trying web-sockets.");
            $.cometd.websocketEnabled = true;
            url = JavaScriptUtil.urls.createWsLink("cometd");
        } else {
            console.log("Trying long-polling.");
            $.cometd.websocketEnabled = false;
            url = JavaScriptUtil.urls.createHttpLink("cometd");
        }
        $.cometd.configure({
            url:url
        });
        ext =  {
            authentication: {
                user: JavaScriptUtil.system.currentUser,
                sessionId: JavaScriptUtil.system.sessionId
            }
        };
        $.cometd.handshake({
            ext: ext
        });
    },

    addUnsuccessfulListener:function () {
        $.cometd.addListener('/meta/unsuccessful', this, function (message) {
            this.failures = this.failures + 1;
            if (this.failures >= PublicChat.common.comet.Handshake.MAX_FAILURES) {
                document.location = JavaScriptUtil.urls.root + "logout";
            }
            this.connect(false);
        });
    }

});

