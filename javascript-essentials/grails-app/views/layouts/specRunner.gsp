<html>
<head>
    <link rel="stylesheet" type="text/css" href="${resource(plugin: 'javascript-essentials', dir: 'js', file: 'jasmine-1.1.0/jasmine.css' )}"/>
    <g:javascript plugin="javascript-essentials" src="jasmine-1.1.0/jasmine.js"/>
    <g:javascript plugin="javascript-essentials" src="jasmine-1.1.0/jasmine-html.js"/>
    <g:layoutHead />
</head>

<body>

<!-- Run the test. -->
<script type="text/javascript">
    jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
    jasmine.getEnv().execute();
</script>


</body>
</html>