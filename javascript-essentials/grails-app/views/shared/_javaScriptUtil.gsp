<r:script disposition="head">
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
          log: function (message) {
            if (window.console !== undefined && JavaScriptUtil.system.env !== "production") {
                console.log(message);
            }
          },
          system: {
              env: '${grails.util.Environment.current.name}',
              currentUser: '<sec:loggedInUserInfo field="username"/>',
              sessionId: "${session.id}"
          }
        }
</r:script>
