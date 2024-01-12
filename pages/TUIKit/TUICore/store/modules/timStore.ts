export type timState = {
  isLogin: boolean,
  conversation: object,
  conversationList: array,
  conversationID: string,
  messageList: array,
  scrollTop: number,
  userInfo: object,
};

const state: timState = {
  isLogin: false,
  conversationList: [],
  messageList: [],
  conversation: {},
  conversationID: '',
  scrollTop: 0,
};

export default {
  namespaced: true,
  state,
  getters: {
    userInfo: (state): string => {
      return state.userInfo;
    }
  },
  mutations: {
    setscrollTop(state: timState, payload: number): viod {
      state.scrollTop = payload;
    },
    setConversationList(state: timState, payload: object): void {
      state.conversationList = payload;
    },
    setConversation(state: timState, payload: object): void {
      state.conversation = payload;
    },
    setConversationID(state: timState, payload: string): void {
      state.conversationID = payload;
    },
		resetConversationID(state: timState,): void {
		  state.conversationID = '';
		},
    setMessageList(state: timState, payload: object): void {
      state.messageList = payload;
    },
    resetChat(state: timState): void {
      state.messageList = [];
    },
  },
  actions: {
    // 

  },
};