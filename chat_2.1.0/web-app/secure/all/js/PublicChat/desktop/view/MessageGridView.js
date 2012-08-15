Ext.define("PublicChat.desktop.view.MessageGridView", {
    extend: "Ext.grid.Panel",
    xtype: "message-grid",
    columns: [
        {
            header: 'Username',
            dataIndex: 'username',
            width: 100,
            hideable: false,
            sortable: false
        },
        {
            header: 'Message',
            dataIndex: 'message',
            flex: true,
            hideable: false,
            sortable: false
        }
    ],

    store: Ext.create('Ext.data.ArrayStore', {
                model: 'PublicChat.common.model.Message'
           })

});
