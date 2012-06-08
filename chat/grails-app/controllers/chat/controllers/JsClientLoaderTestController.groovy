package chat.controllers

import org.springframework.beans.BeanWrapper
import org.springframework.beans.PropertyAccessorFactory
import grails.plugins.springsecurity.Secured

@Secured("ROLE_USER")
class JsClientLoaderTestController {

    def index = {
        def actionNames = []
        grailsApplication.controllerClasses.each { controller -> 
            if (controller.clazz.simpleName == "JsClientLoaderTestController") {
                controller.reference.propertyDescriptors.each { pd -> 
                    def closure = controller.getPropertyOrStaticPropertyOrFieldValue(pd.name, Closure) 
                    if (closure) { 
                        if (pd.name != 'beforeInterceptor' && pd.name != 'afterInterceptor' && pd.name != "index") { 
                            actionNames << pd.name 
                        } 
                    } 
                }                 
            }            
        } 
        [actionNames: actionNames]
    }
    def chat_service_test = { }    
    def desktop_topic_input_controller_test = {}
    def desktop_chat_message_input_controller_test = {}
    def desktop_chat_message_output_controller_test = {}
    def cometd_handshake_test = {}
}
