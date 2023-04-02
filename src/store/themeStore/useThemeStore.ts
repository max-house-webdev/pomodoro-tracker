import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const persistOptions = {
  name: "pomodoro-Theme-storage",
};

interface IState {
  isSoundAllowed: boolean;
  isToastAllowed: boolean;

  toggleIsSoundAllowed: (isAllowed: boolean) => void;
  toggleIsToastAllowed: (isAllowed: boolean) => void;
}

export const useThemeStore = create<IState>()(
  devtools(
    //****
    persist((set) => {
      return {
        isToastAllowed: true,
        isSoundAllowed: false,

        toggleIsSoundAllowed(isAllowed) {
          set(
            (state) => {
              return {
                ...state,
                isSoundAllowed: isAllowed,
              };
            },
            false,
            "timer/toggleIsSoundAllowed"
          );
        },

        toggleIsToastAllowed(isAllowed) {
          set(
            (state) => {
              return {
                ...state,
                isToastAllowed: isAllowed,
              };
            },
            false,
            "timer/toggleIsToastAllowed"
          );
        },
      };
    }, persistOptions)
    //****
  )
);
