'use strict'

const Anzeige = use('App/Models/Anzeige')

class AnzeigenController {

    // Methode, um die Startseite anzuzeigen
    async createForm({ view }) {
        return view.render('layout', { page: '/anzeigen/erstellen' }); 
    }

    // Methode, um die Daten der Anzeigen zu speichern
    async store({ request, response, auth }) {
        try {
            const user = await auth.getUser();
            const anzeigeData = request.only(['titel', 'beschreibung', 'preis', 'user_id']);

            const adImage = request.file('ad_image', {
                types: ['image'],
                size: '2mb'
            });

            // Wenn Bilder vorhanden sind, sie speichern und ihre Pfade zur Datenbank hinzufügen
            if (adImage) {
                const fileName = `${new Date().getTime()}.${adImage.subtype}`;
                const path = 'public/anzeigen';

                await adImage.move(path, {
                    name: fileName
                });

                if (!adImage.moved()) {
                    return response.status(400).send(adImage.error());
                }

                // Pfad zum Bild zur Anzeige-Daten hinzufügen
                anzeigeData.ad_image = `/anzeigen/${fileName}`;
            }
            
            // Benutzer-ID zur Anzeige-Daten hinzufügen
            anzeigeData.user_id = user.user_id;
            anzeigeData.profile_image = user.profile_image;

            const anzeige = await Anzeige.create(anzeigeData);

            return response.redirect('/success-page');
        } catch (error) {
            console.error("Fehler beim Erstellen der Anzeige: ", error);
            return response.status(500).send("Fehler beim Speichern der Anzeige");
        }
    }
}

module.exports = AnzeigenController
