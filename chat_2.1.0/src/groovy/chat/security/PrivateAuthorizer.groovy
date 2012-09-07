package chat.security

import org.cometd.bayeux.server.Authorizer
import org.cometd.bayeux.ChannelId
import org.cometd.bayeux.server.ServerSession
import org.cometd.bayeux.server.ServerMessage


class PrivateAuthorizer implements Authorizer {

    Authorizer.Result authorize(Authorizer.Operation operation,
                                ChannelId channel, ServerSession session,
                                ServerMessage message) {

        def username = session.getAttribute("username")
        def testChannel = "/privateMessage/${username}"
        boolean isOwnPrivateChannel =  ( testChannel == channel.toString() )
        // we allow other users to publish to the private channel
        boolean isPublish = operation == Authorizer.Operation.PUBLISH;

        if (isOwnPrivateChannel || isPublish) {
            return Authorizer.Result.grant();
        } else {
            return Authorizer.Result.ignore()
        }
    }
}

