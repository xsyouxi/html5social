describe("Test a handshake to cometd. This assumes the user has logged in.", function() {

    var handshake, chatService;

    beforeEach(function () {
        handshake = new PublicChat.common.comet.Handshake();
        chatService = new PublicChat.common.service.ChatService();
    });

    afterEach(function () {
        handshake = undefined;
        chatService = null;
    });

    it("test has connected", function () {
        var hasConnected = false;
        var message;
        $.cometd.addListener("/meta/handshake", function(message) {
            $.cometd.addListener(chatService.getPublicChannel(), function(message) {
                hasConnected = true
                console.log(message);
            });
        });
        handshake.initCometD();
        waitsFor(function () {
            return hasConnected;
        });

        runs(function () {
           expect(message).toBeDefined(message);
        });
    });

    it("test init", function () {

        //restService.init();

    });

});