import chat.security.BayeuxAuthenticator
import chat.listeners.SubscriptionListenerImp
import org.cometd.websocket.server.WebSocketTransport
import chat.extensions.ChatUsernameExtension
import org.cometd.server.authorizer.GrantAuthorizer
import org.cometd.bayeux.server.ServerChannel
import chat.security.PrivateAuthorizer
import chat.security.TopicStoreAuthorizer


class BootStrap {

    def bayeux
    def userSessionService
    def topicListingService
    def channelService
    def sessionRegistry

    def init = { servletContext ->
        configureWebSockets()
        initSecurity()
        initListeners()
        configureExtensions()
        bayeux.doStart()
    }

    def destroy = {

    }

    def initSecurity () {
        setSecurityPolicy()
        secureAllChannels()
        securePrivateChannel()
        secureTopicStoreChannel()
        allowPublicChannels();
    }

    def secureTopicStoreChannel() {
        def topicChannel = "/topicList/allTopics"
        bayeux.createIfAbsent(topicChannel)
        topicChannel = bayeux.getChannel(topicChannel)
        topicChannel.addAuthorizer(GrantAuthorizer.GRANT_NONE)
        def topicStoreAuthorizer = new TopicStoreAuthorizer()
        topicChannel.addAuthorizer(topicStoreAuthorizer)
    }

    def allowPublicChannels() {
        def publicChannel = "/chatMessage/**"
        bayeux.createIfAbsent(publicChannel)
        publicChannel = bayeux.getChannel(publicChannel)
        publicChannel.addAuthorizer(GrantAuthorizer.GRANT_ALL)
    }

    def secureAllChannels() {
        def rootChannel = "/**"
        bayeux.createIfAbsent(rootChannel)
        ServerChannel privateChannel = bayeux.getChannel(rootChannel)
        privateChannel.addAuthorizer(GrantAuthorizer.GRANT_NONE)
    }

    def securePrivateChannel() {
        def privateMessage = "/privateMessage/**"
        bayeux.createIfAbsent(privateMessage)
        ServerChannel privateChannel = bayeux.getChannel(privateMessage)
        privateChannel.addAuthorizer(GrantAuthorizer.GRANT_NONE)
        def privateAuthorizer = new PrivateAuthorizer()
        privateChannel.addAuthorizer(privateAuthorizer)

    }

    def configureExtensions = {
        bayeux.addExtension(new ChatUsernameExtension(
                channelService: channelService
        ))
    }

    def configureWebSockets = {
        def transport = new WebSocketTransport(bayeux)
        bayeux.addTransport(transport)
        bayeux.setAllowedTransports(["websocket", "long-polling"])
    }

    def setSecurityPolicy = {
        def authenticator = new BayeuxAuthenticator(
                sessionRegistry: sessionRegistry,
                bayeux: bayeux
        )
        bayeux.setSecurityPolicy(authenticator);
    }

    def initListeners = {
        bayeux.addListener(new SubscriptionListenerImp(
                userSessionService: userSessionService,
                topicListingService: topicListingService,
                bayeux: bayeux
        ))
    }

}
