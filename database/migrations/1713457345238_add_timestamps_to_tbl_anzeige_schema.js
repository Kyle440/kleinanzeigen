'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddTimestampsToTblAnzeigeSchema extends Schema {
  up () {
    this.table('tbl_anzeige', (table) => {
      // add created_at and updated_at columns
      table.timestamps()
    })
  }

  down () {
    this.table('tbl_anzeige', (table) => {
      // reverse alternations
      table.dropColumn('created_at')
      table.dropColumn('updated_at')
    })
  }
}

module.exports = AddTimestampsToTblAnzeigeSchema
