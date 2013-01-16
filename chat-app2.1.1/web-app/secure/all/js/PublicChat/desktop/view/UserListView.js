Ext.define("PublicChat.desktop.view.UserListView", {
    extend: "Ext.grid.Panel",
    xtype: 'user-grid',
    title: "Online Users",
    columns: [
        {
            header: 'Username',
            dataIndex: 'username',
            flex: true,
            hideable: false,
            fixed: true
        }
    ]

});
