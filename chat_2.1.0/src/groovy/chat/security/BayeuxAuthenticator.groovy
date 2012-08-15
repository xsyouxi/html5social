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

    def springSecurityService
    def bayeux

    @Override
    boolean canHandshake(BayeuxServer server, ServerSession session, ServerMessage message) {

        if (session.isLocalSession()) {
          return true
        }

        if (!springSecurityService.isLoggedIn()) {
             return false;
        }

        def principle = springSecurityService.getPrincipal()
        def username = principle.username
        session.setAttribute("username", username)
        return true;
    }

}