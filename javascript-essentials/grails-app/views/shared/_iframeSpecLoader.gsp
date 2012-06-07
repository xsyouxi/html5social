
<g:each var="action" in="${actionNames}">

    <iframe width="100%" src="${createLink(action: action)}"></iframe>
</g:each>
