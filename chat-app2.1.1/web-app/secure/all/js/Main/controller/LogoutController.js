Ext.define('Main.controller.LogoutController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: "mainTabView",
            selector: "main-tab-view"
        }
    ],

    mixins: [
        'Main.logout.LogoutHandler'
    ],

    init: function() {
        var mainTabbView = this.getMainTabView(),
            logoutButton;
        logoutButton = mainTabbView.down("menuitem");
        logoutButton.on("click", this.logout, this);
    }

});
