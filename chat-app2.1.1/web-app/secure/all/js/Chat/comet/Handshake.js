Ext.define("Chat.comet.Handshake", {

    initCometD:function () {
       this.listenForLoginFailure();
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

    /**
     * We must listen for a login failure because in the event of a server restart the SessionRegistry won't
     * persist the users data, but the session data is persisted by Jetty or Tomcat.
     */
    listenForLoginFailure: function() {
        $.cometd.addListener('/meta/handshake', this, function(message) {
            if (message.error === "403::Handshake denied") {
              this.toLoginPage();
            }
        });
    },

    toLoginPage: function () {
        document.location = JavaScriptUtil.urls.root + "logout";
    }

});

