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


class BootStrap {

    def bayeux
    def userSessionService
    def topicListingService
    def springSecurityService
    def channelService

    def init = { servletContext ->
        initBayeux()
        println "Bayeux init......"
        createUsers()
        println "Users created...."
    }

    def destroy = {

    }

    def initBayeux = {
        configureWebSockets()
        setSecurityPolicy()
        securePrivateChannel()
        initListeners()
        configureExtensions()
        bayeux.doStart()
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
                springSecurityService: springSecurityService,
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
        def adminRole = new Role(authority: 'ROLE_ADMIN').save(flush: true)
        def userRole = new Role(authority: 'ROLE_USER').save(flush: true)

        createUser("me1", userRole)
        createUser("me2", userRole)
        createUser("me3", userRole)
        createUser("me4", userRole)
        createUser("me5", userRole)
    }

    def createUser(username, role) {
        def user = new User(username: username, enabled: true, password: 'password')
        user.save(flush: true)
        UserRole.create user, role, true
    }

}
