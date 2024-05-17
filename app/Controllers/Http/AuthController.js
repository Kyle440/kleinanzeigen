'use strict'

const User = use('App/Models/User')

class AuthController {
  
  showLoginForm({ view }) {
    return view.render('layout', { page: '/auth/login', csrfToken: view.csrfToken });
  }

  successfulLogin({ view }) {
    return view.render('layout', { page: '/auth/login-success' })
  }

  failedLogin({ view }) {
    return view.render('layout', { page: '/auth/login-failed' });
  }

  async login({ request, auth, response, session }) {
    const { username, password } = request.all();

    try {
      const user = await User.query().where('username', username).andWhere('password', password).first();
      
      if (user) {
        await auth.login(user);
        return response.redirect('/startseite');
      } else {
        session.flash({ loginError: 'Falsche Anemeldedaten!' });
        return response.redirect('/login-failed');
      }} catch (e) {
        console.error(e);
    }
  }
  
  async logout({ auth, response }) {
    await auth.logout();
    return response.redirect('/');
  }

  async showRegisterForm({ view }) {
    return view.render('layout', { page: '/auth/register' });
  }

  async register({ request, response }) {
    try {
      const data = request.only(['username', 'email', 'password'])
      const user = await User.create(data)
      return response.redirect('/login-success')
    } catch (error) {
      console.error('Registration Error:', error)
      return response.redirect('/login-failed')
    }
  }
}

module.exports = AuthController
