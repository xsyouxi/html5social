class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/home"(view:"/index")
		"500"(view:'/error')
        "/"(controller:"jsClientLoader", action:"home")
        "/chat"(controller:"jsClientLoader", action:"desktop")
        "/login"(controller:"login", action:"auth")
        "/test"(controller:"jsClientLoaderTest", action:"index")
	}
}
