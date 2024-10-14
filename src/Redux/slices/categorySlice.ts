import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


interface CategoryState {
  category: {} | null;
}

const initialState: CategoryState = {
  category: {},
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCategories = createAsyncThunk(
  'category',
  async () => {
    try {
      const response = await axios.get(`${apiUrl}category`);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.category = action.payload;
    });
  },
});

export default categorySlice.reducer;
