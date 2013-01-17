Ext.define('Chat.controller.UserGridController', {
    extend: 'Ext.app.Controller',
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
        var userTab = this.getUserTab(),
            username = record.get("username"),
            tabs = userTab.items.items,
            found = false;
        Ext.each(tabs, function(tab, index, all) {
            if (tab.title === username) {
                found = true;
                return false;
            }
        });
        if (!found) {
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
    }

});
