'use strict'

const Model = use('Model')

class Message extends Model {
    
    static get table() {
        return 'tbl_message'
    }

    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }

    chat() {
        return this.belongsTo('App/Models/Chat', 'chat_id', 'chat_id')
    }
    
    user() {
        return this.belongsTo('App/Models/User', 'user_id', 'user_id')
    }
}

module.exports = Message
