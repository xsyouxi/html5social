Ext.define('Home.view.MainTabView', {
    extend:'Ext.tab.Panel',
    xtype:"main-tab-view",
    items:[
        {
            xtype: 'main-chat-view'
        },
        {
            title:'RPG Battle'
        }
    ]
});