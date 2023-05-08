type State = {
  chat: {
    role: string;
    content: string;
  }[];
};

type Actions = {
  setChat: (chat: State["chat"]) => void;
};

const initialState: State = {
  chat: [],
};

export const createChatSlice = (set: any) => {
  return {
    ...initialState,
    setChat: (chat: State["chat"]) => set({ chat }),
  } as State & Actions;
};
