'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Anzeige extends Model {
  
  static get table() {
    return 'tbl_anzeige'
  }

  static get primaryKey () {
    return 'anzeigen_id'
  }

  static get fillable() {
    return ['titel', 'beschreibung', 'preis', 'ad_image', 'user_id', 'profile_image']
  }

  // Beziehung zu User
  user() {
    return this.belongsTo('App/Models/User', 'user_id', 'user_id')
  }

  // Deaktiviere Timestamps
  static get createdAtColumn() {
    return null;
  }
  
  static get updatedAtColumn() {
    return null;
  }
}

module.exports = Anzeige
