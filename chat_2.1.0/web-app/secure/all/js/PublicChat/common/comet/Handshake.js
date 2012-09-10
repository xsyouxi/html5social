Ext.define("PublicChat.common.comet.Handshake", {

    statics:{
        MAX_FAILURES: 5
    },

    constructor: function (config) {
        this.failures = 0;
    },

    initCometD:function () {
       this.init(false);
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
            document.location = JavaScriptUtil.urls.root + "logout";
        });
    }

});

