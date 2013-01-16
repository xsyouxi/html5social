Ext.define('Home.controller.view.MainToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: "main-toolbar",
    items: [
        {
            text: 'Chat'
        },
        {
            text : 'Games'
        },
        '->',
        {
            text: "Log Out: " + JavaScriptUtil.system.currentUser
        }
    ]
});