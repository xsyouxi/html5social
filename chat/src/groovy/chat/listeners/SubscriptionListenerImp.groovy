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

  void subscribed (ServerSession session, ServerChannel channel) {
    if (topicListingService.isChatMessageChannel(channel)) {
      userSessionService.updateUserList(channel, session)
      topicListingService.publishAllTopics(bayeux, session, channel, false)
    }

  }

  void unsubscribed (ServerSession session, ServerChannel channel) {
     if (topicListingService.isChatMessageChannel(channel)) {
       userSessionService.updateUserList(channel, session)
       topicListingService.publishAllTopics(bayeux, session, channel, true)
    }
  }

}

