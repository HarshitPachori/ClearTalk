import { create } from "zustand";
import { createAuthSlice } from "./slices/authSlice";

export const useAppStore = create()((...a) => ({
  ...createAuthSlice(...a),
}));
