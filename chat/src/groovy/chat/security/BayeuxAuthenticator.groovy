package chat.security

import org.cometd.bayeux.server.ServerMessage
import org.cometd.bayeux.server.ServerSession
import org.cometd.bayeux.server.BayeuxServer
import org.cometd.server.DefaultSecurityPolicy

class BayeuxAuthenticator extends DefaultSecurityPolicy {

    def springSecurityService

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