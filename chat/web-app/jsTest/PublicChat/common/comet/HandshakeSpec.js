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


    it("test that the init method is called on all objects that need to sub", function () {
        var hasConnected1 = false,
            hasConnected2 = false,
            hasConnected3 = false;

        handshake.longPollingConnect({
            subAble: [
                {
                    sub: function () {
                       hasConnected1 = true;
                    }
                },
                {
                    sub: function () {
                        hasConnected2 = true;
                    }
                },
                {
                    sub: function () {
                        hasConnected3 = true;
                    }
                }
            ]
        });

        waitsFor(function () {
            return hasConnected1 && hasConnected2 && hasConnected3;
        });

        runs(function () {
            expect(hasConnected1 && hasConnected2 && hasConnected3).toBeTruthy();
        });
    });

});