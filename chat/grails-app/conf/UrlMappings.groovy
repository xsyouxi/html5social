class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(controller:"jsClientLoader", action:"desktop")
        "/test"(controller:"jsClientLoaderTest", action:"index")
        "500"(view:'/error')
    }

}
