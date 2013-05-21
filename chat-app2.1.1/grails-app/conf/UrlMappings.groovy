class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/"(view:"/chat")
		"500"(view:'/error')
        "/login"(controller:"login", action:"auth")
        "/game"(view:"/game")
        "/chat"(view:"/chat")
	}
}
