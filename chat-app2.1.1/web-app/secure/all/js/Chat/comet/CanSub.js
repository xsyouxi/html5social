Ext.define("Chat.comet.CanSub", {
    subscribe:function (params) {
        if (params.sub !== undefined) {
            $.cometd.unsubscribe(params.sub);
        }
        return $.cometd.subscribe(
            params.topic,
            params.scope,
            params.handler
        );
    }
});
