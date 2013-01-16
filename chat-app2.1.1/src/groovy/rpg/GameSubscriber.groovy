package rpg

import org.cometd.bayeux.server.BayeuxServer.SubscriptionListener
import org.cometd.bayeux.server.ServerSession
import org.cometd.bayeux.server.ServerChannel

class GameSubscriber {

    static final RPG_CHANNEL = "/rpg/"

    void subscribed (ServerSession session, ServerChannel channel) {
        if (channel.id.contains(RPG_CHANNEL) && !channel.id.contains("*")) {
            def game = new Game()
        }
    }

    void unsubscribed (ServerSession session, ServerChannel channel) {

    }

}
