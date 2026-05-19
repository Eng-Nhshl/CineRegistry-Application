import { create } from "zustand";

let timeoutId = null;

const useNotificationStore = create((set) => ({
  notification: null,

  setNotification: (message, seconds = 5) => {
    set({ notification: message });

    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      set({ notification: null });
      timeoutId = null;
    }, seconds * 1000);
  },
}));

export default useNotificationStore;
