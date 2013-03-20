Ext.define('Home.view.ChannelView', {
    extend:'Ext.panel.Panel',
    xtype:"channel-view",
    title: "Channels",
    defaults:{
        // applied to each contained panel
        bodyStyle:'padding:15px'
    },
    layout:{
        // layout-specific configs go here
        type:'accordion',
        titleCollapse:false,
        animate:true,
        activeOnTop:true
    },
    items:[
        {
            xtype:'topic-grid'
        },
        {
            xtype: 'rpg-channel-view'
        }
    ]
});
