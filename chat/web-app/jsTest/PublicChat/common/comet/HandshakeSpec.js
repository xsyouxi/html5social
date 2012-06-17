describe("Test a handshake to cometd. This assumes the user has logged in.", function() {

    var handshake, restService;

    beforeEach(function () {
        handshake = new PublicChat.common.comet.Handshake();
        restService = new PublicChat.common.service.RestService();
    });

    afterEach(function () {
        handshake = undefined;
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
        runs(function () {
           expect(users.length).toBe(1);
        });
    });

});