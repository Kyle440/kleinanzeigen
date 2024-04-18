'use strict'

const Anzeige = use('App/Models/Anzeige')

class AnzeigenController {

    // Methode, um das Formular anzuzeigen
    async createForm({ view }) {
        return view.render('layout', { page: 'anzeigeErstellen' }); 
    }

    // Methode, um die Daten aus dem Formular zu speichern
    async store({ request, response }) {
        const anzeigeData = request.only(['titel', 'beschreibung', 'preis'])
    
        const anzeige = await Anzeige.create(anzeigeData)

        return response.redirect('/success-page') // Leiten Sie nach dem Speichern zu einer Bestätigungsseite um
    }
}

module.exports = AnzeigenController
