package chat.services

class TopicListingService {

    static TOPIC_CHANNEL = "/topicList/allTopics"
    static final CHAT_MESSAGE_CHANNEL = "/chatMessage/"

    static transactional = false

    def isChatMessageChannel(channel) {
        if (channel.id.contains(CHAT_MESSAGE_CHANNEL)) {
            return true;
        } else {
            return false
        }
    }

    def publishAllTopics(bayeux, session, channel, unsubscribed) {
        def channels = getTopicObjects(bayeux, session)
        def topicChannel;
        if (getNumberOfSubscribers(channel) == 1 && unsubscribed) {
            topicChannel = channel
        } else {
            topicChannel = bayeux.getChannel(TOPIC_CHANNEL)
        }
        topicChannel.publish(session, channels, null)

    }

    def getNumberOfSubscribers(channel) {
        channel.subscribers.size()
    }

    def getTopicObjects(bayeux, session) {
        def channels = bayeux.getChannels()
        channels = channels.findAll { channel ->
            isChatMessageChannel(channel)
        }
        channels = channels.collect { channel ->
            def topic = channel.getId().toString()
            def numUsers = getNumberOfSubscribers(channel)
            topic = topic.stripIndent(CHAT_MESSAGE_CHANNEL.length())
            [
                    topic: topic,
                    numUsers: numUsers
            ]
        }
    }
}
