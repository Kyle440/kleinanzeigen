'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  
  static get table() {
    return 'tbl_user'
  }

  static get primaryKey() {
    return 'user_id'
  }

  static get fillable() {
    return ['username', 'email', 'password', 'profile_image']
  }

  anzeigen() {
    return this.hasMany('App/Models/Anzeige')
  }
  
   // Deaktiviere Timestamps
  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }
}

module.exports = User
