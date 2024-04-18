'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

  static boot () {
    super.boot()
    // You can define hooks, relationships, etc. here
  }
  
    static get table() {
        return 'posts';
      }

  // Definiert die Primärschlüssel-Spalte
  static get primaryKey() {
    return 'id'
  }

  // Wenn Sie möchten, dass bestimmte Spalten beim Fetchen immer dabei sind
  static get visible() {
    return ['id', 'title', 'text']
  }

  // Validierungsregeln, falls Sie die Adonis Validator Integration verwenden möchten
  static get rules() {
    return {
      title: 'required',
      text: 'required'
    }
  }

  // Beispiel für eine Beziehung zu einem anderen Modell
  // static comments() {
  //   return this.hasMany('App/Models/Comment')
  // }
}

module.exports = Post
