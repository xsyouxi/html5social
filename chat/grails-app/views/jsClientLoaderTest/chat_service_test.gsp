<html>
  <head>
    <title>Chat Service Test</title>
    
    <meta name="layout" content="specRunner"></meta>
    
    <g:render template="/shared/extLoader" plugin="extjs" />
    <g:render template="/shared/javaScriptUtil" plugin="javascript-util" />
    <g:render template="/shared/cometdClient" plugin="cometd-client" />
    
    <g:javascript src="PublicChat/common/services/ChatService.js" />
    <g:javascript src="../jsTest/PublicChat/common/services/ChatServiceTest.js" />
    
  </head>
</html>
