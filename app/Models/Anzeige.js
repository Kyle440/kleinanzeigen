'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Anzeige extends Model {

  // Define the table name
  static get table() {
    return 'tbl_anzeige'
  }

  // Define the primary key
  static get primaryKey () {
    return 'id'
  }

  // Define the fields of the table
  static get fillable() {
    return ['titel', 'beschreibung', 'preis']
  }



    // Disable timestamps
    static get timestamps() {
      return false
    }
}

module.exports = Anzeige
