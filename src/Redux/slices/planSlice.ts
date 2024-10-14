import { metadata } from './../../app/layout';
import Axios from '@/axios/Axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


interface PlansState {
    allPlans: {} | null;
    isAllPlanLoading: boolean;
    isSubscribedPlanLoading: boolean;
    isCreateSubscriptionLoading: boolean;
    subscribedPlan: {} | null;
}

const initialState: PlansState = {
    allPlans: {},
    isAllPlanLoading: false,
    isSubscribedPlanLoading: false,
    isCreateSubscriptionLoading: false,
    subscribedPlan: {}
};


export const getAllPlans = createAsyncThunk(
    'plans',
    async ({ currentPage }: { currentPage?: number }) => {
        try {
            const response = await Axios.get(`plan${currentPage ? '?page=' + currentPage : ''}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const createSubscription = createAsyncThunk(
    'createSubscription',
    async ({ data, setModalOpen, router }: { data: any, setModalOpen: any, router: any }) => {
        try {
            const response = await Axios.post(`subscription`, data, {
                withCredentials: true
            });
            setModalOpen(false);
            toast.success(response?.data?.message);
            router.push('/subscription');
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const getSubscribedPlans = createAsyncThunk(
    'getSubscribedPlan',
    async () => {
        try {
            const response = await Axios.get(`subscription/user-subscription`, {
                withCredentials: true
            });
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

const planSlice = createSlice({
    name: 'plans',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllPlans.pending, (state) => {
            state.isAllPlanLoading = true;
        });
        builder.addCase(getAllPlans.fulfilled, (state, action: PayloadAction<any>) => {
            state.allPlans = action.payload;
            state.isAllPlanLoading = false;
        });
        builder.addCase(getAllPlans.rejected, (state) => {
            state.isAllPlanLoading = false;
        });

        builder.addCase(createSubscription.pending, (state) => {
            state.isCreateSubscriptionLoading = true;
        });
        builder.addCase(createSubscription.fulfilled, (state, action: PayloadAction<any>) => {
            state.isCreateSubscriptionLoading = false;
        });
        builder.addCase(createSubscription.rejected, (state) => {
            state.isCreateSubscriptionLoading = false;
        });

        builder.addCase(getSubscribedPlans.pending, (state) => {
            state.isSubscribedPlanLoading = true;
        });
        builder.addCase(getSubscribedPlans.fulfilled, (state, action: PayloadAction<any>) => {
            state.subscribedPlan = action.payload;
            state.isSubscribedPlanLoading = false;
        });
        builder.addCase(getSubscribedPlans.rejected, (state) => {
            state.isSubscribedPlanLoading = false;
        });
    },
});

export default planSlice.reducer;
