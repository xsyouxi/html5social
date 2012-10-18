package chat.extensions

import org.cometd.bayeux.server.BayeuxServer.Extension
import org.cometd.bayeux.server.ServerSession
import org.cometd.bayeux.server.ServerMessage


class ChatUsernameExtension implements Extension {

    def channelService

    @Override
    boolean rcv(ServerSession serverSession, ServerMessage.Mutable mutable) {
        mutable.data.username = serverSession.getAttribute("username")
        return true
    }

    @Override
    boolean rcvMeta(ServerSession serverSession, ServerMessage.Mutable mutable) {
        return true
    }

    @Override
    boolean send(ServerSession serverSession, ServerSession serverSession1, ServerMessage.Mutable mutable) {
        return true
    }

    @Override
    boolean sendMeta(ServerSession serverSession, ServerMessage.Mutable mutable) {
        return true
    }
}
