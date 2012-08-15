Ext.define("PublicChat.desktop.view.TopicListView", {
    extend: "Ext.grid.Panel",
    xtype: 'topic-grid',
    columns: [
        {
            header: 'Hot topics',
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
