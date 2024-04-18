'use strict'

const Post = use('App/Models/Post')

class PostController {
  async index({ view }) {
        // Holt alle Posts aus der Datenbank
    const posts = await Post.all();


        // Rendert die Ansicht 'posts.edge' und übergibt die Posts als JSON-Objekt
    //return view.render('posts', { posts: posts.toJSON() });
    return view.render('posts', { page: 'layout' });

  }
}

module.exports = PostController;
