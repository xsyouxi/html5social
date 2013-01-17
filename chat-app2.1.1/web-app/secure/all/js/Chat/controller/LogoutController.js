Ext.define('Chat.controller.LogoutController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: "logoutButton",
            selector: "#logout-button"
        }
    ],

    mixins: [
        'Chat.handlers.LogoutHandler'
    ],

    init: function() {
        var logoutButton = this.getLogoutButton();
        logoutButton.on("click", this.logout, this);
    }

});
