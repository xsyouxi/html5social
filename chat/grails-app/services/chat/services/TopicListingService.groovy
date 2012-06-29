package chat.services

class TopicListingService {

    static TOPIC_CHANNEL = "/topicList/allTopics"
    static final CHAT_MESSAGE_CHANNEL = "/chatMessage/"

    static transactional = false

    def isChatMessageChannel(channel) {
        channel.id.contains(CHAT_MESSAGE_CHANNEL)
    }

    def publishNewSubAllTopics(bayeux, session, channel) {
        removeOldSubscriptions(session, channel, bayeux)
        def channels = getTopicObjects(bayeux, session, channel)
        def topicChannel = bayeux.getChannel(TOPIC_CHANNEL)
        topicChannel.publish(session, channels, null)
    }

    private def removeOldSubscriptions(session, channel, bayeux) {
        def sessions = bayeux.sessions
        def userName = session.getAttribute("username")
        for (def serverSession : sessions) {
            def serverSessionUsername = serverSession.getAttribute("username")
            if (serverSessionUsername.equals(userName)) {
                def subscriptions = serverSession.subscriptions
                for (def serverChannel : subscriptions) {
                    if (isChatMessageChannel(serverChannel) && !serverChannel.equals(channel)) {
                        serverChannel.unsubscribe(serverSession)
                    }
                }
            }
        }
    }

    def getNumberOfSubscribers(channel) {
        def sessions = channel.subscribers.toArray()
        sessions = sessions.collect { session ->
            try {
                session.getAttribute("username")
            } catch (all) {
                println all
            }
        }
        sessions = sessions.unique()
        def size = sessions.size()
        size
    }

    def getTopicObjects(bayeux, session, userChannel) {
        def channels = bayeux.getChannels()
        def chatChannels = channels.findAll { channel ->
            isChatMessageChannel(channel)
        }
        def infoChannels = chatChannels.collect { channel ->
            def topic = channel.getId().toString()
            def numUsers = getNumberOfSubscribers(channel)
            topic = topic.stripIndent(CHAT_MESSAGE_CHANNEL.length())
            [
                    topic: topic,
                    numUsers: numUsers
            ]
        }
        infoChannels
    }
}
