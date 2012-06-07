<r:script>
        JavaScriptUtil = {
          urls: {
              root: "${createLinkTo()}/",
              createHttpLink: function(url) {
                  url = url || '';
                  return this.root + url
              },
              createWsLink: function(url) {
                  url = url || '';
                  var orign = window.location.protocol + "//" + window.location.host;
                  return orign.replace('http:', 'ws:').replace('https:', 'wss:') + this.root + url;
              }
          },
          system: {
              env: '${grails.util.Environment.current.name}'
          }
        }
</r:script>
