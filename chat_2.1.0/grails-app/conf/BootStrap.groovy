import chat.security.BayeuxAuthenticator
import chat.listeners.SubscriptionListenerImp
import chat.domain.Role
import chat.domain.User
import chat.domain.UserRole
import org.cometd.websocket.server.WebSocketTransport
import chat.extensions.ChatUsernameExtension
import org.cometd.server.authorizer.GrantAuthorizer
import org.cometd.bayeux.server.ServerChannel
import chat.security.PrivateAuthorizer
import org.cometd.bayeux.server.Authorizer
import org.cometd.bayeux.ChannelId
import org.cometd.bayeux.server.ServerMessage
import org.cometd.bayeux.server.ServerSession
import chat.security.TopicStoreAuthorizer


class BootStrap {

    def bayeux
    def userSessionService
    def topicListingService
    def channelService
    def sessionRegistry

    def init = { servletContext ->
        initBayeux()
        println "Bayeux init......"
        createUsers()
        println "Users created...."
        println "Allowed Transports"
        bayeux.setAllowedTransports(["websocket", "callback-polling", "long-polling"])
        def transports = bayeux.getAllowedTransports()
        println transports
        def transport = bayeux.getTransport("websocket")
        println transport
    }

    def destroy = {

    }

    def initBayeux = {
        configureWebSockets()
        initSecurity()
        initListeners()
        configureExtensions()
        bayeux.doStart()
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
        bayeux.setAllowedTransports(["websocket", "callback-polling", "long-polling"])
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

    def createUsers = {
        def userRole = new Role(authority: 'ROLE_USER').save(flush: true)
        def testerRole = new Role(authority: 'ROLE_TESTER').save(flush: true)

        def user = createUser("me1", userRole)
        UserRole.create user, testerRole, true
        createUser("me2", userRole)
        createUser("me3", userRole)
        createUser("me4", userRole)
        createUser("me5", userRole)
    }

    def createUser(username, role) {
        def user = new User(username: username, enabled: true, password: 'password')
        user.save(flush: true)
        UserRole.create user, role, true
        user
    }

}
