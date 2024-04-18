'use strict'

class ProfileController {
    async index({ view }) {
        return view.render('layout', { page: 'profil' });
    }
}

module.exports = ProfileController
