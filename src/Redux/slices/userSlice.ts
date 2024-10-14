import Axios from '@/axios/Axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { toast } from 'react-toastify';

interface User {
  name: string;
  email: string;
  password?: string;
  cPassword?: string;
  
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading:boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  isLoading:false
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const signUpUser = createAsyncThunk(
  'user/signUp',
  async ({ name, email, password, cPassword, router }: { name: string; email: string; password: string, cPassword: string, router: any }) => {
    try {
      const response = await Axios.post(`user/signUp`, { name, email, password, cPassword });
      if (response.data.token) {
        if (typeof window !== 'undefined') {
          console.log('if')
          localStorage.setItem('access_token', response.data.token);
        }
      }
      toast.success(response?.data?.message);
      router.push(`/verify-account?email=${encodeURIComponent(email)}`);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  }
);

export const verifyAccount = createAsyncThunk( 
  'verifyOTP',
  async ({ email, otp, router }: { email: any; otp: string; router: any }) => {
    try {
      const response = await Axios.post(`user/verifyOTP`, { otp, email });
      toast.success(response?.data?.message);
      router.push('/all-business');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password, rememberMe, router }: { email: string; password: string, rememberMe: boolean, router: any }) => {
    try {
      const response = await Axios.post(`user/login`, { email, password });
      console.log(response.data)
      if (response.data.token) {
        if (typeof window !== 'undefined') {
          console.log('if')
          localStorage.setItem('access_token', response.data.token);
        }
      }
      if (rememberMe) {
        if (typeof window !== 'undefined') {
          localStorage.setItem("authRemember", email);
        }
      } else {
        if (typeof window !== 'undefined') {
          localStorage.removeItem("authRemember");
        }
      }
      toast.success(response?.data?.message);
      router.push('/all-business');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async ({ email, router }: { email: string; router: any }) => {
    try {
      const response = await Axios.post(`user/forgot-password`, { email });
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'user/verifyOTP',
  async ({ email, otp, router }: { email: any; otp: string; router: any }) => {
    try {
      const response = await Axios.post(`user/verifyOTP`, { otp, email });
      toast.success(response?.data?.message);
      router.push(`/new-password?email=${encodeURIComponent(email)}`);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  }
);

export const newPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ email, password, passwordConfirm, router }: { email: any; password: string; passwordConfirm: string; router: any }) => {
    try {
      const response = await Axios.post(`user/resetPassword`, { password, passwordConfirm, email });
      toast.success(response?.data?.message);
      router.push('/login')
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  }
);
export const googleLogin = createAsyncThunk(
  'user/googleLogin',
  async ({ code }: { code: string; }) => {
    try {
      const response = await Axios.post(`user/google-login`, { code, });
      toast.success(response?.data?.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  }
);

export const logOut = createAsyncThunk(
  'user/logOut',
  async ({ router }: { router: any }) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.clear(); 
      }
      const res = NextResponse.next();
      res.cookies.delete('access_token');
      toast.success("Logged out successfully");
      router.push('/');
    } catch (error: any) {
      toast.error("Failed to log out");
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyAccount.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(verifyAccount.rejected, (state) => {
        state.isLoading = false;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.isLoading = false;
      })

      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyOtp.rejected, (state) => {
        state.isLoading = false;
      })

      // New Password
      .addCase(newPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(newPassword.rejected, (state) => {
        state.isLoading = false;
      })

      // Google Login
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(googleLogin.rejected, (state) => {
        state.isLoading = false;
      })

      // Logout
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(logOut.rejected, (state) => {
        state.isLoading = false;
      });
  },
});




export default userSlice.reducer;
