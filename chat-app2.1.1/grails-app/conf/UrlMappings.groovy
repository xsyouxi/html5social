class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/home"(view:"/index")
		"500"(view:'/error')
        "/"(controller:"jsClientLoader", action:"desktop")
        "/touch"(controller:"jsClientLoader", action:"touch")
        "/login"(controller:"login", action:"auth")
        "/test"(controller:"jsClientLoaderTest", action:"index")
	}
}
