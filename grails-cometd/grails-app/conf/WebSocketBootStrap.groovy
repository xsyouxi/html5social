import org.cometd.websocket.server.WebSocketTransport


class WebSocketBootStrap {

    def bayeux

    def init = { servletContext ->
        configureWebSockets()
        bayeux.doStart()
    }

    def destroy = {

    }

    def configureWebSockets = {
        def transport = new WebSocketTransport(bayeux)
        bayeux.addTransport(transport)
        bayeux.setAllowedTransports(["websocket", "callback-polling", "long-polling"])
    }


}