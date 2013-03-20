Ext.define('PublicChat.touch.view.Main', {
    extend:"Ext.ux.touch.SwipeTabs",

    config:{
        fullscreen: true,
        tabBarPosition: 'bottom',
        defaults: {
            styleHtmlContent: true
        },
        items: [
            {
                title: 'Home',
                iconCls: 'home',
                html: 'Home Screen'
            },
            {
                title: 'Contact',
                iconCls: 'user',
                html: 'Contact Screen'
            }
        ]
    }

});
