Ext.application({
    launch: function () {
        Ext.create('Ext.Panel', {
            fullscreen: true,
            html: 'Hello World!'
        });
    }
});