'use strict'

const User = use('App/Models/User')

class ProfilController {

  // Zeigt das Profil des eingeloggten Benutzers an
  async show ({ auth, view }) {
    const user = await auth.getUser();
    return view.render('layout', { page: '/profil/ansicht', user: user });
  }

  // Profil bearbeiten
  async bearbeiten ({ auth, view }) {
    const user = await auth.getUser();
    return view.render('layout', { page: '/profil/bearbeiten', user: user });
  }

  // Aktualisiert das Profil des Benutzers
  async aktualisieren ({ request, response, auth }) {
    const user = await auth.getUser()
    const data = request.only(['username', 'email', 'password'])

    const profileImage = request.file('profileImage', {
      types: ['image'],
      size: '2mb'
    });

    if (profileImage) {
      const fileName = `${new Date().getTime()}.${profileImage.subtype}`;
      const path = 'public/profilbilder';

      await profileImage.move(path, {
        name: fileName
      });
  
      if (!profileImage.moved()) {
        return response.status(400).send(profileImage.error());
      }

      user.profile_image = `/profilbilder/${fileName}`;
    }

    // Überprüfe, ob die Checkbox zum Entfernen des Profilbilds aktiviert ist
    if (request.input('removeProfileImage')) {
      user.profile_image = null;
    }

    user.merge(data)
    await user.save()

    return response.redirect('/profil/ansicht')
  }
  
  async delete({ auth, response }) {
    const user = await auth.getUser();
    user.profile_image = null;
    await user.save();

    return response.redirect('/profile');
  }
}

module.exports = ProfilController
