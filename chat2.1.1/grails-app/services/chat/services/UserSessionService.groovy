package chat.services

import chat.domain.User

class UserSessionService {

  static transactional = false

  def bayeux

  def updateUserList (channel, session) {
    def userList = userNames(channel)
    channel.publish(session, userList, null)
  }

  def userNames = { channel ->
    [userList: channel.subscribers.collect { [username: username(it)] }.unique() ]
  }

  def username = { session -> session.getAttribute("username")  }

  def getUser = { session ->
    def user = new User(username: username(session))
    user
  }

  def getUserChannels (username) {
     def userSessions = getUserSessions(username)
     def userChannels = []
      userSessions.each { session ->
        def sessionChannels = session.getSubscriptions()
        sessionChannels.each { channel ->
            userChannels.add(channel)
        }
     }
    userChannels
  }

  def getUserSessions (username) {
     def sessions = bayeux.sessions
     def userSessions = sessions.findAll { session ->
         session.getAttribute("username").equals(username)
     }
  }


  def allUserNames () {
      def sessions = bayeux.sessions
      def userNames = sessions*.getAttribute("username")
      userNames.unique()
  }

}
