Ext.define("PublicChat.desktop.view.MainToolbar", {
    extend: 'Ext.tab.Panel',
    xtype: 'user-tab',
    require: ["Ext.form.field.Text"],
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
