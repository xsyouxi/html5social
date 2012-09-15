package chat.controllers

import grails.plugins.springsecurity.Secured

@Secured("ROLE_USER")
class JsClientLoaderController {

    def desktop = {}
	
	def touch = {}

}
