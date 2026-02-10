import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

const useUserStore = create((set) => ({
  loading: false,

  updateProfile: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.put("/users/update", data);
      useAuthStore.getState().setAuthUser(res.data.user);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUserStore;