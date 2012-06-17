package chat.services

import chat.model.User

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

  def allUserNames () {
      def sessions = bayeux.sessions
      def userNames = sessions*.getAttribute("username")
      userNames.unique()
  }

}
