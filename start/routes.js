'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/


const PostController = use('App/Controllers/Http/PostController')
const Database = use('Database')



/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')



/** Homepage */
Route.get('/', 'HomeController.index');


/** Chats */
Route.get('/chats', async ({ view }) => {
    return view.render('layout', { page: 'chats' });
})


/** Profilseite */
Route.get('/profil', async ({ view }) => {
    return view.render('layout', { page: 'profil' })
})


/** Anzeigen erstellen */
Route.get('/ads/create', 'AnzeigenController.createForm')
Route.post('/ads/create', 'AnzeigenController.store')


/** Blog */
Route.get('/posts', async ({ view }) => {
    const posts = await Database.table('posts').select('*');
    return view.render('layout', { page: 'posts', posts });
})


/** Success-Page */
Route.get('/success-page', async ({ view }) => {
    return view.render('layout', { page: 'success-page' })
})
