package chat.services

class ChannelService {

    static TOPIC_CHANNEL = "/topicList/allTopics"
    static final CHAT_MESSAGE_CHANNEL = "/chatMessage/"

    static transactional = false

    def isChatMessageChannel(String channel) {
        channel.contains(CHAT_MESSAGE_CHANNEL)
    }

}
