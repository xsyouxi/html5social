Ext.define('PublicChat.desktop.view.Viewport', {

    extend: "Ext.container.Viewport",

    layout: 'border',
    items: [
        {
          region: 'east',
          layout: {
               type: 'vbox',
               align: 'stretch'
          },
          items: [
              {
                xtype: "button",
                text: "Sing out: " + JavaScriptUtil.system.currentUser,
                id: "logout-button"
              },
              {
                  store: 'user-store',
                  width: 200,
                  id: 'user-grid',
                  xtype: 'user-grid'
              }
          ]
        },
        {
            store: 'topic-store',
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
