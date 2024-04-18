'use strict'

class ChatsController {
    async index({ view }) {
        return view.render('chats', { layout: 'layout' });
    }
}

module.exports = ChatsController
