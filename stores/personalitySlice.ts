type State = {
  personality: string;
};

type Actions = {
  setPersonality: (personality: string) => void;
};

const initialState: State = {
  personality: "",
};

export const createPersonalitySlice = (set: any) => {
  return {
    ...initialState,
    setPersonality: (personality: string) => set({ personality }),
  } as State & Actions;
};
