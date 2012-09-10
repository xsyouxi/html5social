package chat.security

import org.cometd.bayeux.server.Authorizer
import org.cometd.bayeux.server.ServerMessage
import org.cometd.bayeux.server.ServerSession
import org.cometd.bayeux.ChannelId

class TopicStoreAuthorizer implements Authorizer {

    Authorizer.Result authorize(Authorizer.Operation operation,
                                ChannelId channel, ServerSession session,
                                ServerMessage message) {

        if (session.isLocalSession()) {
            return Authorizer.Result.grant();
        }

        def testChannel = "/topicList/allTopics"
        boolean isTopicChannel = (testChannel == channel.toString())
        if (isTopicChannel) {
            return Authorizer.Result.grant();
        } else {
            return Authorizer.Result.ignore()
        }
    }
}