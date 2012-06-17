describe("Test InitParams.js", function() {

    var initParams;

    beforeEach(function () {
        initParams = Ext.create("PublicChat.common.util.InitParams")
    });

    it("test initParams", function () {
        initParams.initParams({
            user1: "user1",
            hello: "goodby",
            val1: false,
            num1: 9
        });
        expect(initParams.user1).toBe("user1");
        expect(initParams.hello).toBe("goodby");
        expect(initParams.val1).toBe(false);
        expect(initParams.num1).toBe(9);
    });

});