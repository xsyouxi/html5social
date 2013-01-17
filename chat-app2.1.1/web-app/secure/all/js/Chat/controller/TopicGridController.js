Ext.define('Chat.controller.TopicGridController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'topicGrid',
            selector: 'topic-grid'
        },
        {
            ref: 'topicTextField',
            selector: '#topic-input'
        }
    ],

    init: function() {
        var topicGrid = this.getTopicGrid();
        topicGrid.on("select", this.setTopic, this);
    },


    setTopic: function (rowModel, record, index, ops) {
        var topicField = this.getTopicTextField();
        topicField.setValue(record.get("displayTopic"));
        Ext.apply(topicField, {skipDelay: true});
        topicField.fireEvent("keyup", topicField);
    }

});
