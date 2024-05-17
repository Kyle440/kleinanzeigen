'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chat extends Model {

  static get table () {
    return 'tbl_chat'
  }

  static get primaryKey () {
    return 'chat_id'
  }

  static get createdAtColumn() {
    return 'created_at';
  }

  static get updatedAtColumn() {
    return 'updated_at';
  }

  // Definiere die Beziehung zu User für user1_id
  user1() {
    return this.belongsTo('App/Models/User', 'user1_id', 'user_id')
  }

  // Definiere die Beziehung zu User für user2_id
  user2() {
    return this.belongsTo('App/Models/User', 'user2_id', 'user_id')
  }

  messages() {
    return this.hasMany('App/Models/Message', 'chat_id', 'chat_id');
  }

  anzeige() {
    return this.belongsTo('App/Models/Anzeige', 'anzeigen_id', 'anzeigen_id');
  }
}

module.exports = Chat
