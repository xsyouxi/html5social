package chat.security

import org.cometd.bayeux.server.ServerMessage
import org.cometd.bayeux.server.ServerSession
import org.cometd.bayeux.server.BayeuxServer
import org.cometd.server.DefaultSecurityPolicy
import org.cometd.bayeux.server.ConfigurableServerChannel
import org.cometd.server.authorizer.GrantAuthorizer
import org.cometd.bayeux.server.Authorizer
import org.cometd.bayeux.ChannelId

class BayeuxAuthenticator extends DefaultSecurityPolicy {

    def sessionRegistry
    def bayeux

    @Override
    boolean canHandshake(BayeuxServer server, ServerSession session, ServerMessage message) {
        boolean grant = false;
        try {
            if (session.isLocalSession()) {
                grant = true
            } else {
                Map<String, Object> ext = message.getExt()
                Map<String, Object> authentication = (Map<String, Object>) ext.get("authentication");
                if (authentication != null) {
                    def clientUsername = authentication.user
                    def sessionId = authentication.sessionId
                    if (clientUsername == null || sessionId == null) {
                        grant = false
                    } else {
                        def sessionInformation = sessionRegistry.getSessionInformation(sessionId.toString())
                        def principle = sessionInformation.getPrincipal()
                        def sessionUsername = principle.username
                        if (clientUsername == sessionUsername) {
                            session.setAttribute("username", sessionUsername)
                            grant = true
                        } else {
                            grant = false
                        }
                    }
                } else {
                    grant = false
                }
            }
        } catch (e) {
            grant = false;
        } finally {
            return grant
        }
    }
}