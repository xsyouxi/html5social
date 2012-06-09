describe("Test a handshake to cometd. This assumes the user has logged in.", function() {

    var handshake, chatService, restService;

    beforeEach(function () {
        handshake = new PublicChat.common.comet.Handshake();
        chatService = new PublicChat.common.service.ChatService();
        restService = new PublicChat.common.service.RestService();
    });

    afterEach(function () {
        handshake = undefined;
        chatService = undefined;
        restService = undefined;
    });

    it("test a single user login has a single session", function () {
        var hasConnected = false;
        $.cometd.addListener("/meta/handshake", function(message) {
            restService.on("userAllResponse", function (users) {
                hasConnected = true;
            });
            restService.getUsers();
        });
        handshake.longPollingConnect();
        waitsFor(function () {
            return hasConnected;
        });
        /*
         *   TODO this will fail until we have cometd and http sessions fully sync up.
         *   This may never pass but would make things more efficient
         */
        runs(function () {
           expect(users.length).toBe(1);
        });
    });

});