Ext.define('PublicChat.common.model.Topic', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'topicId', type: 'string'},
            {name: 'numUsers', type: 'int'},
            {name: 'displayTopic', type: 'string'}
        ]
});



