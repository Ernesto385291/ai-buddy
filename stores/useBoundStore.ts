import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createChatSlice } from "./chatSlice";
import { createPersonalitySlice } from "./personalitySlice";

export const useBoundStore = create(
  persist(
    (set: any) => ({
      ...createPersonalitySlice(set),
      ...createChatSlice(set),
      _hasHydrated: false,
    }),
    {
      name: "storage",
      onRehydrateStorage: (state: any) => {
        state._hasHydrated = true;
      },
    }
  )
);
