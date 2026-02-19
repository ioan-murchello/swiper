import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

const useUserStore = create((set) => ({
  loading: false,

  updateProfile: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.put("/api/users/update", data);
      useAuthStore.getState().setAuthUser(res.data.user);
      toast.success("Profile updated successfully",{id:"update-profile-success"});
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile", {id:"update-profile-error"});
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUserStore;