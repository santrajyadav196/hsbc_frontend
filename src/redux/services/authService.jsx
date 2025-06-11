// src/services/authService.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../components/Axios/axiosClient";
import api from "../../components/Axios/api";

// SIGNUP
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post(api.SIGNUP.url, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post(api.LOGIN.url, formData);
      console.log(res.data);
      const { token } = res.data;
      localStorage.setItem("token", token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get(api.GET_PROFILE.url); // assuming this is set correctly
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
