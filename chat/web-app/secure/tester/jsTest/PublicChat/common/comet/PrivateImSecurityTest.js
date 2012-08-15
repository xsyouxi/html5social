describe("Test that the current user can only listen for messages under their own namespace.", function() {

    var handshake = new PublicChat.common.comet.Handshake();
    var canSub = new PublicChat.common.comet.CanSub();
    var connected = false;
    $.cometd.addListener("/meta/handshake", function(message) {
        connected = true;
    });
    handshake.longPollingConnect();

    beforeEach(function () {
        waitsFor(function () {
            return connected;
        });
    });

    afterEach(function () {


    });

    /*
     * Test that the current user can access their own private channel.
     */
    it("Wait 60 seconds for a reply from the server. If the user should get a reply before the timeout. This will confirm " +
        "that the current user me1 can subscribe to their own private channel.", function () {

        var channel = PublicChat.common.service.ChatService.PRIVATE_CHANNEL + "me1";
        var reply = false;
        var privateChannel = undefined;
        privateChannel = canSub.subscribe({
            handler: function (message) {
                reply = true;
            },
            topic: channel,
            scope: this,
            sub: privateChannel
        });
        waitsFor(function () {
            return reply;
        });

        $.cometd.publish(channel, {message: "private message to me1"});

        runs(function () {
            expect(reply).toBe(true)
        });
    });

    /*
     * Test that the current can not access other users private channels.
     */
    it("Wait 60 seconds for a reply from the server. If the user should get a reply before the timeout. This will confirm " +
        "that the current user me1 can subscribe to their own private channel.", function () {
        var timeout = false;
        var updateTask = Ext.create('Ext.util.DelayedTask', function () {
            timeout = true;
        }, this);

        var channel = PublicChat.common.service.ChatService.PRIVATE_CHANNEL + "me2";
        var reply = false;
        var privateChannel = undefined;
        privateChannel = canSub.subscribe({
            handler: function (message) {
                reply = true;
            },
            topic: channel,
            scope: this,
            sub: privateChannel
        });
        updateTask.delay(100);
        waitsFor(function () {
            return reply || timeout;
        });

        $.cometd.publish(channel, {message: "private message to me1"});

        runs(function () {
            expect(reply).toBe(false)
            expect(timeout).toBe(true)
        });
    });

});