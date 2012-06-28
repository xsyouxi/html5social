package chat.listeners

import org.cometd.bayeux.server.BayeuxServer.SubscriptionListener
import org.cometd.bayeux.server.ServerSession
import org.cometd.bayeux.server.ServerChannel

/**
 *
 * @author Broken Computer
 */
class SubscriptionListenerImp implements SubscriptionListener {

  def userSessionService
  def topicListingService
  def bayeux

  // TODO when a user changes to a different room all sessions must switch over to that room
  void subscribed (ServerSession session, ServerChannel channel) {
    if (topicListingService.isChatMessageChannel(channel)) {
       topicListingService.publishNewSubAllTopics(bayeux, session, channel)
       userSessionService.updateUserList(channel, session)
    }
  }

  void unsubscribed (ServerSession session, ServerChannel channel) {

  }

}

