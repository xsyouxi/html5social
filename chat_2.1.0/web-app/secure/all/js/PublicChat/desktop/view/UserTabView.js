Ext.define("PublicChat.desktop.view.UserTabView", {
    extend: 'Ext.tab.Panel',
    xtype: 'user-tab',
    items: [
        {
            xtype: 'textfield',
            title: 'My Topic',
            id: "public-text-field",
            enableKeyEvents: true,
            fieldLabel: 'To: (My Topic)'
        }
    ]

});
