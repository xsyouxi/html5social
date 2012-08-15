Ext.define("PublicChat.desktop.view.UserListView", {
    extend: "Ext.grid.Panel",
    xtype: 'user-grid',
    columns: [
       /*
       TODO Implement user profile phtot
       {
            header: "Photo",
            width: 40,
            renderer: function(value) {
                return '<img src="images/icons/im.png" />';
            },
            dataIndex: 'username',
            sortable: true
        },*/
        {
            header: 'Username',
            dataIndex: 'username',
            flex: true,
            hideable: false,
            fixed: true
        }
    ]

});
