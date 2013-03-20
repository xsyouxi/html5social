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
    ],tabBar:{
        //plain:true,
        items:[{
           xtype: 'tbfill'
        },{
            xtype:'splitbutton',
            closable: false,
            text: " ",
            icon: "http://cdn1.iconfinder.com/data/icons/crystalproject/16x16/apps/advancedsettings.png",
            id: "logout-button",
            menu: new Ext.menu.Menu({
                items: [
                    {
                        text: "Log Out: " + JavaScriptUtil.system.currentUser,
                        icon: "http://cdn1.iconfinder.com/data/icons/glaze/16x16/actions/exit.png"
                    }                ]
            })
        }]
    }
});