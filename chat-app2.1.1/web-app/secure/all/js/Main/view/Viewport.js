Ext.define('Main.view.Viewport', {
    extend:"Ext.container.Viewport",
    layout:'border',
    items:[
        {
            region:'center',
            layout:'border',
            items:[
                {
                    region: 'center',
                    xtype: "main-tab-view"
                },
                {
                    region: 'west',
                    width: 200,
                    xtype: "channel-view",
                    collapsible : true
                }
            ]
        },
        {
            region:'east',
            xtype: 'user-grid',
            width:200,
            collapsible : true
        }
    ]

});
