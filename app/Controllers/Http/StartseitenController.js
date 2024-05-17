'use strict'

const Anzeige = use('App/Models/Anzeige');
const User = use('App/Models/User');

class StartseitenController {

  // Methode, um alle Anzeigen mit Benutzerdaten zu holen
  async index({ view }) {
    const anzeigen = await Anzeige.query()
    .with('user')
    .fetch();
    
    return view.render('layout', { page: 'startseite', anzeigen: anzeigen.toJSON() });
  }
}

module.exports = StartseitenController;
