'use strict'

const Chat = use('App/Models/Chat')
const Database = use('Database')
const Message = use('App/Models/Message');
const Anzeige = use('App/Models/Anzeige')

class ChatController {
    async index({ auth, view }) {
        const user = await auth.getUser();
        const userId = user.user_id;
        const chats = await Database
        .table('tbl_chat')
        .innerJoin('tbl_user', function () {
            this.on('tbl_chat.user1_id', 'tbl_user.user_id').orOn('tbl_chat.user2_id', 'tbl_user.user_id')
        })
        .where(function() {
            this.where('tbl_chat.user1_id', userId).orWhere('tbl_chat.user2_id', userId)
        })
        .andWhere('tbl_user.user_id', '!=', userId)
        .select('tbl_chat.chat_id as chatId', 'tbl_user.username as otherUsername');
        return view.render('layout', { page: '/chats/chats', chats: chats });
}

async show({ params, view }) {
    const chat = await Chat.query()
        .where('chat_id', params.chat_id)
        .with('messages.user')
        .first();

    if (!chat) {
        return view.render('errors.not-found');
    }

    const chatData = chat.toJSON();

    return view.render('layout', { page: '/chats/show', chat: chatData });
}

async storeMessage({ request, response, auth }) {
  const userId = auth.user.user_id;
  const { chat_id, message } = request.only(['chat_id', 'message']);

  if (!userId) {
      return response.status(400).send({ error: 'User must be logged in.' });
  }

  if (!chat_id) {
      return response.status(400).send({ error: 'Chat ID is required.' });
  }

  const msg = new Message();
  msg.chat_id = chat_id;
  msg.user_id = userId;
  msg.message = message;

  await msg.save();
  return response.redirect('/chats/' + chat_id);
}

async getMessages({ params, response }) {
  const messages = await Message
  .query()
  .where('chat_id', params.chat_id)
      .with('user')
      .fetch()

  return response.json(messages)
}

async createOrOpenChat({ params, auth, response }) {
    const user = await auth.getUser();
    const targetUserId = params.user_id;
    const anzeigenId = params.anzeigen_id;

    if (!user || !user.user_id || !targetUserId) {
        return response.status(400).send('Invalid user data');
    }

    let chat = await Chat.query()
        .where(builder => builder.where('user1_id', user.user_id).andWhere('user2_id', targetUserId))
        .orWhere(builder => builder.where('user1_id', targetUserId).andWhere('user2_id', user.user_id))
        .first();

    if (!chat) {
        chat = new Chat();
        chat.user1_id = user.user_id;
        chat.user2_id = targetUserId;
        chat.anzeigen_id = anzeigenId;
        await chat.save();
    }

    return response.redirect('/chat/' + chat.chat_id);
}
}

module.exports = ChatController
