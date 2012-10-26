package chat.controllers

import grails.plugins.springsecurity.ui.RegisterCommand
import org.codehaus.groovy.grails.plugins.springsecurity.ui.RegistrationCode
import org.codehaus.groovy.grails.plugins.springsecurity.SpringSecurityUtils

class RegisterController extends grails.plugins.springsecurity.ui.RegisterController {

    def register = { RegisterCommand command ->

        if (command.hasErrors()) {
            render view: 'index', model: [command: command]
            return
        }

        def user = lookupUserClass().newInstance(email: command.email, username: command.username,
                password: command.password, accountLocked: true, enabled: true)
        if (!user.validate() || !user.save()) {
            // TODO
        }

        def registrationCode = new RegistrationCode(username: user.username).save()
        String url = generateLink('verifyRegistration', [t: registrationCode.token])

        def conf = SpringSecurityUtils.securityConfig
        def body = conf.ui.register.emailBody
        if (body.contains('$')) {
            body = evaluate(body, [user: user, url: url])
        }
        mailService.sendMail {
            to command.email
            from conf.ui.register.emailFrom
            subject conf.ui.register.emailSubject
            html body.toString()
        }

        render view: 'index', model: [emailSent: true]
    }
}
