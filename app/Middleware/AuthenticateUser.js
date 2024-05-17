'use strict'

const User = use('App/Models/User')

class AuthenticateUser {
  async handle({ auth, view, response }, next) {
    try {
      const user = await auth.getUser();
      view.share({ user });
    } catch (error) {
      //return response.redirect('/');
    }

    await next();
  }
}

module.exports = AuthenticateUser;
