import Axios from '@/axios/Axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


interface ServiceState {
    isLoading: boolean;
    service: {} | null;
    allBusiness: {} | null;
    singleBusiness: {} | null;
    allFranchise: {} | null;
    allFranchiseByBusiness: {} | null;
    singleFranchise: {} | null;
    businessForms: Array<any>;
    franchiseForms: Array<any>;

}

const initialState: ServiceState = {
    isLoading: false,
    service: {},
    allBusiness: {},
    singleBusiness: {},
    allFranchise: {},
    allFranchiseByBusiness: {},
    singleFranchise: {},
    businessForms: [],
    franchiseForms: [],
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const postBusiness = createAsyncThunk(
    'business',
    async ({ formData, router }: { formData: any, router: any }) => {
        try {
            const response = await Axios.post(`business`, formData);
            toast.success(response?.data?.message);
            router.push(`all-business`);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);
export const editBusiness = createAsyncThunk(
    'business/edit  ',
    async ({ formData, router, businessId }: { formData: any, router: any, businessId: any }) => {
        try {
            const response = await Axios.put(`business/${businessId}`, formData);
            toast.success(response?.data?.message);
            router.push(`/all-business`);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const getAllBusiness = createAsyncThunk(
    'business',
    async ({ currentPage }: { currentPage?: number }) => {
        try {
            const response = await Axios.get(`business${currentPage ? '?page=' + currentPage : ''}`);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const getSingleBusiness = createAsyncThunk(
    `business/id`,
    async ({ businessId }: { businessId: any }) => {
        try {
            const response = await Axios.get(`${apiUrl}business/${businessId}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const deleteBusinessById = createAsyncThunk(
    'business/deleteBusiness',
    async ({ deleteBusinessId, setDeleteModalOpen, router }: { deleteBusinessId: any, setDeleteModalOpen: any, router: any }) => {
        try {
            const response = await Axios.delete(`business/deleteBusiness/${deleteBusinessId}`);
            toast.success(response?.data?.message);
            router.push("/all-business");
            setDeleteModalOpen(false)
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const postFranchise = createAsyncThunk(
    'franchise',
    async ({ data, router }: { data: any, router: any }) => {
        try {
            const response = await Axios.post(`franchise`, data);
            router.push(`/all-business/${data?.businessId}`);
            toast.success(response?.data?.message);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const editFranchise = createAsyncThunk(
    'franchise/edit',
    async ({ id, data, router }: { id: any, data: any, router: any }) => {
        try {
            const response = await Axios.put(`franchise/${id}`, data);
            router.push(`/all-business/${data?.businessId}/${id}`);
            toast.success(response?.data?.message);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const getAllFranchise = createAsyncThunk(
    'franchise',
    async () => {
        try {
            const response = await axios.get(`${apiUrl}franchise`);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);
export const getFranchiseByBusinessId = createAsyncThunk(
    'getFranchiseByBusinessId',
    async ({ businessId, currentPage }: { businessId: any, currentPage?: any }) => {
        try {
            const response = await axios.get(`${apiUrl}franchise/getFranchiseByBusinessId/${businessId}${currentPage ? '?page=' + currentPage : ''}`);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const deleteFranchiseById = createAsyncThunk(
    'franchise/deleteFranchise',
    async ({ deleteFranchiseId, setDeleteModalOpen, router, businessId }: { deleteFranchiseId: any, setDeleteModalOpen: any, router: any, businessId: any }) => {
        try {
            const response = await Axios.delete(`franchise/deleteFranchise/${deleteFranchiseId}`);
            toast.success(response?.data?.message);
            router.push(`/all-business/${businessId}`);
            setDeleteModalOpen(false)
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const getFranchiseById = createAsyncThunk(
    'getFranchiseById',
    async ({ id }: { id: any }) => {
        try {
            const response = await Axios.get(`franchise/${id}`);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const getBusinessForms = createAsyncThunk(
    'business/forms',
    async (data: { currentPage: any, businessId: string }) => {
        try {
            const response = await Axios.get(`typeForm/getFormByBusinessId/${data.businessId}?page=${data.currentPage}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const addFormsToBusiness = createAsyncThunk(
    'business/forms/addTypeForm',
    async (data: { businessId: string; formData: { forms: string[] } }) => {
        try {
            const response = await Axios.post(`business/${data.businessId}/forms`, data.formData);
            toast.success(response?.data?.message);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
)

export const activateForm = createAsyncThunk(
    'business/forms/activate',
    async (data: { businessId: string; formId: string }) => {
        try {
            const response = await Axios.put(`business/${data.businessId}/forms/${data.formId}/activate`);
            toast.success(response?.data?.message);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
)

// for location
export const getLocationForms = createAsyncThunk(
    'location/forms',
    async (data: { currentPage: any, locationId: string }) => {
        try {
            const response = await Axios.get(`typeForm/getFormByLocationId/${data.locationId}?page=${data.currentPage}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const addFormsToLocation = createAsyncThunk(
    'location/forms/addTypeForm',
    async (data: { locationId: string; formData: { forms: string[] } }) => {
        try {
            const response = await Axios.post(`franchise/${data.locationId}/forms`, data.formData);
            toast.success(response?.data?.message);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
)

export const activateLocationForm = createAsyncThunk(
    'location/forms/activate',
    async (data: { locationId: string; formId: string }) => {
        try {
            const response = await Axios.put(`franchise/${data.locationId}/forms/${data.formId}/activate`);
            toast.success(response?.data?.message);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
)

const serviceSlice = createSlice({
    name: 'allBusiness',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(editBusiness.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(editBusiness.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
        });
        builder.addCase(editBusiness.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(editFranchise.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(editFranchise.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
        });
        builder.addCase(editFranchise.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(getAllBusiness.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllBusiness.fulfilled, (state, action: PayloadAction<any>) => {
            state.allBusiness = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getAllBusiness.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getAllFranchise.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllFranchise.fulfilled, (state, action: PayloadAction<any>) => {
            state.allFranchise = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getAllFranchise.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getFranchiseByBusinessId.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getFranchiseByBusinessId.fulfilled, (state, action: PayloadAction<any>) => {
            state.allFranchiseByBusiness = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getFranchiseByBusinessId.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getSingleBusiness.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getSingleBusiness.fulfilled, (state, action: PayloadAction<any>) => {
            state.singleBusiness = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getSingleBusiness.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(getFranchiseById.pending, (state) => {
        });
        builder.addCase(getFranchiseById.fulfilled, (state, action: PayloadAction<any>) => {
            state.singleFranchise = action.payload;
        });
        builder.addCase(getFranchiseById.rejected, (state) => {
        });

        builder.addCase(deleteBusinessById.pending, (state) => {
        });
        builder.addCase(deleteBusinessById.fulfilled, (state, action: PayloadAction<any>) => {
            state.singleFranchise = action.payload;
        });
        builder.addCase(deleteBusinessById.rejected, (state) => {
        });

        builder.addCase(deleteFranchiseById.pending, (state) => {
        });
        builder.addCase(deleteFranchiseById.fulfilled, (state, action: PayloadAction<any>) => {
            state.singleFranchise = action.payload;
        });
        builder.addCase(deleteFranchiseById.rejected, (state) => {
        });

        builder.addCase(getBusinessForms.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getBusinessForms.fulfilled, (state, action: PayloadAction<any>) => {
            state.businessForms = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getBusinessForms.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(getLocationForms.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getLocationForms.fulfilled, (state, action: PayloadAction<any>) => {
            state.franchiseForms = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getLocationForms.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default serviceSlice.reducer;
