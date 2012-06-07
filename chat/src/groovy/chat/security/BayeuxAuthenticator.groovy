package chat.security

import org.cometd.bayeux.server.ServerMessage
import org.cometd.bayeux.server.ServerSession
import org.cometd.bayeux.server.BayeuxServer
import org.cometd.server.DefaultSecurityPolicy

import grails.plugins.springsecurity.SpringSecurityService

class BayeuxAuthenticator extends DefaultSecurityPolicy implements ServerSession.RemoveListener {

    def springSecurityService

    static sessions = []

    @Override
    boolean canHandshake(BayeuxServer server, ServerSession session, ServerMessage message) {

        if (session.isLocalSession()) {
          return true
        }

        def principle = springSecurityService.getPrincipal()

        if (!springSecurityService.isLoggedIn()) {
             return false;
        }

        def username = principle.username

        session.setAttribute("username", username)
        session.addListener(this);

        if (sessions.removeAll({ oldSession ->
            if (username.equals(oldSession.getAttribute("username"))) {
                oldSession.disconnect()
                return true
            } else {
                return false
            }

        }))
        sessions.add(session);

        return true;
    }

    void removed(ServerSession session, boolean expired) {
        // Unlink authentication data from the remote client
    }


}