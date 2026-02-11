import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { disconnectSocket, initializeSocket } from "../socket/socket.client";

export const useAuthStore = create((set) => ({
  authUser: null,
  checkingAuth: true,
  loading: false,

  signup: async (signupData) => {
    try {
      set({ loading: true });
      const res = await axios.post("/api/auth/signup", signupData);
      set({ authUser: res.data.user });
      initializeSocket(res.data.user._id);

      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  login: async (loginData) => {
    try {
      set({ loading: true });
      const res = await axios.post("/api/auth/login", loginData);
      set({ authUser: res.data?.user });
      initializeSocket(res.data.user._id);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      const res = await axios.post("/api/auth/logout");
      disconnectSocket();
      if (res.status === 200) set({ authUser: null });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },
  checkAuth: async () => {
    try {
      const res = await axios.get("/api/auth/me");
      initializeSocket(res.data.user._id);
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
      console.log(error);
    } finally {
      set({ checkingAuth: false });
    }
  },

setAuthUser: (user) => set({ authUser: user ? { ...user } : null }),
}));
