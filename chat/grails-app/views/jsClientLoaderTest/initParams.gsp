<html>
<head>
    <title>Test Handshake.js</title>
    <g:render template="/shared/javaScriptUtil" plugin="javascript-essentials" />
    <r:require module="initParams" />
    <r:layoutResources/>
</head>
<body>
<r:layoutResources/>
<script type="text/javascript">
    jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
    jasmine.getEnv().execute();
</script>
</body>
</html>
