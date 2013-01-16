Ext.define("Chat.view.TopicListView", {
    extend: "Ext.grid.Panel",
    xtype: 'topic-grid',
    title: "Chat Rooms",
    columns: [
        {
            header: 'Topics',
            dataIndex: 'displayTopic',
            flex: true,
            hideable: false,
            fixed: true
        },
        {
            header: '# Users',
            dataIndex: 'numUsers',
            width: 75,
            hideable: false,
            fixed: true
        }
    ]
});
