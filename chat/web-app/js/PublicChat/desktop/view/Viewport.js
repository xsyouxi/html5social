Ext.define('PublicChat.desktop.view.Viewport', {

    extend: "Ext.container.Viewport",

    requires: [
        'PublicChat.desktop.view.UserTabView',
        'PublicChat.desktop.view.MessageGridView',
        'PublicChat.desktop.view.UserListView',
        'PublicChat.desktop.view.TopicListView'
    ],

    layout: 'border',
    items: [
        {
            store: 'user-store',
            width: 200,
            region: 'east',
            id: 'user-grid',
            xtype: 'user-grid'
        },
        {
           // store: 'topic-store',
            width: 200,
            region: 'west',
            xtype: 'topic-grid'
        },
        {
            region: 'center',
            layout: 'border',
            items: [
                {
                    region: 'south',
                    xtype: 'user-tab'
                },
                {
                    title: "Talk Hot Topic" ,
                    region: 'north',
                    layout: 'fit',
                    height: 50,
                    items: [
                        {
                            xtype: 'textfield',
                            enableKeyEvents: true,
                            fieldLabel: "My Topic",
                            value: "none",
                            id: 'topic-input'
                        }
                    ]

                } ,
                {
                    region: 'center',
                    xtype: "message-grid"
                }
            ]

        }
    ]

});
