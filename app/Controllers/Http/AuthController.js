'use strict'

class AuthController {
    async showLoginForm({ view }) {
        return view.layout('layout').render('auth.login')
    }

    async login({ auth, request, response, session }) {
        const { email, password } = request.all()

        try {
            await auth.attempt(email, password)
            return response.route('home')
        } catch (error) {
            session.flash({ loginError: 'Invalid credentials' })
            return response.redirect('back')
        }
    }

    async logout({ auth, response }) {
        await auth.logout()
        return response.route('home')
    }
}

module.exports = AuthController
