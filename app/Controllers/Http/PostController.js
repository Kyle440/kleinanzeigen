'use strict'

const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Anzeige = use('App/Models/Anzeige');

class PostController {
  async index({ view }) {
    const posts = await Post.all();
    const users = await User.all();

    return view.render('posts', { posts, users });
  }
  
  async showUserAds({ auth, view }) {
    const user = await auth.getUser();
    const anzeigen = await user.anzeigen().fetch();
    
    return view.render('layout', { page: 'posts', anzeigen: anzeigen.toJSON() });
  }
  
  async deleteAd({ params, response, auth }) {
    const user = await auth.getUser();
    const anzeige = await Anzeige.find(params.id);
    
    if (anzeige && anzeige.user_id === user.user_id) {
      await anzeige.delete();
      return response.redirect('/posts');
    }
    
    return response.status(403).send('Unauthorized access');
  }
}

module.exports = PostController;
