'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
  
  static get table() {
    return 'posts';
  }

  static get primaryKey() {
    return 'id'
  }

  static get visible() {
    return ['id', 'title', 'text']
  }

  // Validierungsregeln
  static get rules() {
    return {
      title: 'required',
      text: 'required'
    }
  }
}

module.exports = Post
