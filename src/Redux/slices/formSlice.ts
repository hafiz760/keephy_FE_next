import Axios from '@/axios/Axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


export interface FormState {
    isLoading: boolean;
    form: {} | null;
    allForms: {} | null;
    singleform: {} | null;
    allFormsSubmissions: {} | null;
    submissionForm: {
        code?: string;
        moduleName?: 'business' | 'location';
        moduleId?: string;
        form?: Record<string, any>
    }
}

const initialState: FormState = {
    isLoading: false,
    form: {},
    allForms: {},
    singleform: {},
    allFormsSubmissions: {},
    // used for form submitting route
    submissionForm: {}
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const postForm = createAsyncThunk(
    'typeForm/addTypeForm',
    async ({ formData, setForm, setModalOpen, setInputs }: { formData: any, setForm: any, setModalOpen: any, setInputs: any }) => {
        try {
            const response = await Axios.post(`typeForm/addTypeForm`, formData);
            toast.success(response?.data?.message);
            setForm(response?.data);
            setModalOpen(true);
            setInputs([]);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);
export const editForm = createAsyncThunk(
    'typeForm/updateFormById',
    async ({ formData, router, formId }: { formData: any, router: any, formId: any }) => {
        try {
            const response = await Axios.put(`typeForm/updateFormById/${formId}`, formData);
            toast.success(response?.data?.message);
            router.push(`/all-forms`);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const getFormByBusinessId = createAsyncThunk(
    'Form/getFormByBusinessId',
    async ({ businessId, currentPage }: { businessId: any, currentPage: any }) => {
        try {
            const response = await Axios.get(`typeForm/getFormByBusinessId/${businessId}/?page=${currentPage}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const getFormByFranchiseId = createAsyncThunk(
    'Form/getFormByLocationId',
    async ({ locationId, currentPage }: { locationId: any, currentPage: any }) => {
        try {
            const response = await Axios.get(`typeForm/getFormByLocationId/${locationId}/?page=${currentPage}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);


export const getFormSubmissionByFormId = createAsyncThunk(
    'Form/getForSubmissionByFormId',

    async ({ formId, currentPage, selectedBusiness, selectedLocation }: { formId: any, currentPage: any, selectedBusiness: any, selectedLocation: any }) => {
        let moduleName = '';
        let moduleId = '';
        if (selectedBusiness) {
            if (selectedLocation) {
                moduleName = 'location';
                moduleId = selectedLocation.value;
            } else {
                moduleName = 'business';
                moduleId = selectedBusiness.value;
            }
        }
        try {
            const response = await Axios.get(`typeForm/getFormSubmissionByFormId/${formId}/?page=${currentPage}${moduleName ? `&moduleName=${moduleName}&moduleId=${moduleId}` : ''
                }`, {
                withCredentials: true
            });

            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const getFormById = createAsyncThunk(
    'typeForm/getFormById',
    async ({ formId }: { formId: any }) => {
        try {
            const response = await Axios.get(`typeForm/getFormById/${formId}`);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const deleteFormById = createAsyncThunk(
    'typeForm/deleteForm',
    async ({ deleteFormId, router, setDeleteModalOpen }: { deleteFormId: any, router: any, setDeleteModalOpen: any }) => {
        try {
            const response = await Axios.delete(`typeForm/deleteForm/${deleteFormId}`);
            toast.success(response?.data?.message);
            setDeleteModalOpen(false);
            router.push('/all-forms');
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const submitReviewForm = createAsyncThunk(
    'typeForm/addFormSubmission',
    async ({ formData, router }: { formData: any, router: any }) => {
        try {
            const response = await Axios.post(`typeForm/addFormSubmission`, formData);
            toast.success(response?.data?.message);
            router.push(`/thank-you`);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const getAllForm = createAsyncThunk(
    'Form',
    async ({ currentPage }: { currentPage?: any }) => {
        try {
            const response = await Axios.get(`typeForm/?${currentPage ? 'page=' + currentPage : ''}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

export const getFormByCode = createAsyncThunk(
    'typeForm/getFormByCode',
    async ({ formCode }: { formCode: any }) => {
        try {
            const response = await Axios.get(`typeForm/getFormByCode/${formCode}`);
            return response.data.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            throw error;
        }
    }
);

const formSlice = createSlice({
    name: 'reviewForm',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postForm.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(postForm.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
        });
        builder.addCase(postForm.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(editForm.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(editForm.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
        });
        builder.addCase(editForm.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(getAllForm.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllForm.fulfilled, (state, action: PayloadAction<any>) => {
            state.allForms = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getAllForm.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(getFormByBusinessId.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getFormByBusinessId.fulfilled, (state, action: PayloadAction<any>) => {
            state.allForms = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getFormByBusinessId.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(getFormByFranchiseId.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getFormByFranchiseId.fulfilled, (state, action: PayloadAction<any>) => {
            state.allForms = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getFormByFranchiseId.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(getFormById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getFormById.fulfilled, (state, action: PayloadAction<any>) => {
            state.singleform = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getFormById.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(deleteFormById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteFormById.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
        });
        builder.addCase(deleteFormById.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(submitReviewForm.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(submitReviewForm.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
        });
        builder.addCase(submitReviewForm.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(getFormSubmissionByFormId.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getFormSubmissionByFormId.fulfilled, (state, action: PayloadAction<any>) => {
            state.allFormsSubmissions = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getFormSubmissionByFormId.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(getFormByCode.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getFormByCode.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.submissionForm = {
                ...state.submissionForm,
                ...action.payload
            }
        });
        builder.addCase(getFormByCode.rejected, (state) => {
            state.isLoading = false;
        });

    },
});

export default formSlice.reducer;
