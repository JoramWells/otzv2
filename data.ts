export interface Chats {
  id: string
  chat: {
    Messages: Array<{
      createdAt: string
      text: string
    }>
  }
  receiver: {
    firstName: string
  }
}
