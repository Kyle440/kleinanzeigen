'use strict'

const Anzeige = use('App/Models/Anzeige');

class HomeController {
  async index({ view }) {
    const anzeigen = await Anzeige.all(); // Fetch all ads from the database

    return view.render('layout', { page: 'homepage', anzeigen: anzeigen.toJSON() });
  }
}

module.exports = HomeController;
