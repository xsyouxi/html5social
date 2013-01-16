Ext.define('Chat.view.MainChatView', {
    extend:'Ext.panel.Panel',
    xtype:"main-chat-view",
    title:'Chat Rooms',
    layout: 'border',
            items: [
                {
                    region: 'south',
                    xtype: 'user-tab'
                },
                {
                    region: 'north',
                    layout: 'fit',
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

});
