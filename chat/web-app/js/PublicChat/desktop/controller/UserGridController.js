Ext.define('PublicChat.desktop.controller.UserGridController', {
    extend: 'Ext.app.Controller',
    require: ["Ext.form.field.Text"],
    refs: [
        {
            ref: 'userGrid',
            selector: 'user-grid'
        },
        {
            ref: 'userTab',
            selector: 'user-tab'
        }
    ],

    init: function() {
        var topicGrid = this.getUserGrid();
        topicGrid.on("select", this.openUserIm, this);
    },

    openUserIm: function (rowModel, record, index, ops) {
        var userTab = this.getUserTab();
        var username = record.get("username");
        userTab.add(
                {
                    xtype: 'textfield',
                    title: username,
                    closable: true,
                    iconCls: "im",
                    enableKeyEvents: true,
                    fieldLabel: 'To (' + username + ')'
                }
        );
    }

});
