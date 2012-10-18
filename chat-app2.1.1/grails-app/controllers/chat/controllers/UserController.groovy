package chat.controllers

import grails.converters.JSON
import grails.plugins.springsecurity.Secured

@Secured("ROLE_USER")
class UserController {

    def userSessionService

    def all () {
      def users = userSessionService.allUserNames()
      render users as JSON
    }
}
