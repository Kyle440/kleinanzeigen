'use strict'

const PostController = use('App/Controllers/Http/PostController')
const Database = use('Database')

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/** Login */
Route.get('/', 'AuthController.showLoginForm').as('login');
Route.post('/login', 'AuthController.login');

/** Login success */
Route.get('/login-success', 'AuthController.successfulLogin');

/** Login failed */
Route.get('/login-failed', 'AuthController.failedLogin');

/** Logout */
Route.get('/logout', 'AuthController.logout');

/** Register */
Route.get('/register', 'AuthController.showRegisterForm');
Route.post('/register', 'AuthController.register');

/** Homepage */
Route.get('/startseite', 'StartseitenController.index').middleware('auth'); 

/** Chats */
Route.get('/chats', 'ChatController.index').middleware(['auth']);
Route.get('/chats/:chat_id', 'ChatController.show').middleware(['auth']);
Route.get('/chat/:chat_id', 'ChatController.show').middleware(['auth']);

//Öfnnen oder neuen chat erstellen
Route.get('/chats/create/:user_id', 'ChatController.createOrOpenChat').middleware(['auth']);

Route.post('/chats/:chat_id/messages', 'ChatController.storeMessage').middleware(['auth']);
Route.get('/chats/:chat_id/messages', 'ChatController.getMessages').middleware(['auth'])

/** Profil */
Route.get('/profil/ansicht', 'ProfilController.show').middleware(['auth']);
Route.get('/profil/bearbeiten', 'ProfilController.bearbeiten');
Route.post('/profil/aktualisieren', 'ProfilController.aktualisieren').as('profil.aktualisieren');

/** Test */
Route.get('/profile', 'LayoutController.showProfile').middleware('AuthenticateUser');

/** Anzeigen erstellen */
Route.get('/anzeigen/erstellen', 'AnzeigenController.createForm').middleware('auth');
Route.post('/anzeigen/erstellen', 'AnzeigenController.store').middleware('auth');

/** Blog */
Route.get('/posts', 'PostController.showUserAds').middleware(['auth']);
Route.get('/posts/delete/:id', 'PostController.deleteAd').middleware(['auth']);

/** Success-Page */
Route.get('/success-page', async ({ view }) => {
    return view.render('layout', { page: 'handler/success-page' })
})
