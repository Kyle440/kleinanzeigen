'use strict'

const User = use('App/Models/User')

class LayoutController {
    async showProfile({ auth, view }) {
        const user = await auth.getUser()  // Abrufen des eingeloggten Benutzers
        return view.render('layout', { page, user: user });  // Übergeben des Benutzers an die View
    }
}
  
module.exports = LayoutController
