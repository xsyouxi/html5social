Ext.define('PublicChat.desktop.controller.LogoutController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: "logoutButton",
            selector: "#logout-button"
        }
    ],

    mixins: [
        'PublicChat.common.handlers.LogoutHandler'
    ],

    init: function() {
        var logoutButton = this.getLogoutButton();
        logoutButton.on("click", this.logout, this);
    }

});
