import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createBrand, deleteBrand, fetchAllBrands, updateBrand } from './BrandApi'

const initialState={
    status:"idle",
    brands:[],
    errors:null,
    addStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle"
}

export const fetchAllBrandsAsync=createAsyncThunk('brands/fetchAllBrandsAsync',async()=>{
    const brands=await fetchAllBrands()
    return brands
})

export const createBrandAsync = createAsyncThunk('brands/createBrandAsync', async (brand) => {
    const newBrand = await createBrand(brand);
    return newBrand;
});

export const updateBrandAsync = createAsyncThunk('brands/updateBrandAsync', async (brand) => {
    const updatedBrand = await updateBrand(brand);
    return updatedBrand;
});

export const deleteBrandAsync = createAsyncThunk('brands/deleteBrandAsync', async (id) => {
    const deletedBrand = await deleteBrand(id);
    return deletedBrand;
});

const brandSlice=createSlice({
    name:"brandSlice",
    initialState:initialState,
    reducers:{
        resetBrandAddStatus: (state) => {
            state.addStatus = 'idle';
        },
        resetBrandUpdateStatus: (state) => {
            state.updateStatus = 'idle';
        },
        resetBrandDeleteStatus: (state) => {
            state.deleteStatus = 'idle';
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAllBrandsAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(fetchAllBrandsAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.brands=action.payload
            })
            .addCase(fetchAllBrandsAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })
            .addCase(createBrandAsync.pending, (state) => {
                state.addStatus = 'pending';
            })
            .addCase(createBrandAsync.fulfilled, (state, action) => {
                state.addStatus = 'fulfilled';
                state.brands.push(action.payload);
            })
            .addCase(createBrandAsync.rejected, (state, action) => {
                state.addStatus = 'rejected';
                state.errors = action.error;
            })
            .addCase(updateBrandAsync.pending, (state) => {
                state.updateStatus = 'pending';
            })
            .addCase(updateBrandAsync.fulfilled, (state, action) => {
                state.updateStatus = 'fulfilled';
                const index = state.brands.findIndex(brand => brand._id === action.payload._id);
                if (index !== -1) {
                    state.brands[index] = action.payload;
                }
            })
            .addCase(updateBrandAsync.rejected, (state, action) => {
                state.updateStatus = 'rejected';
                state.errors = action.error;
            })
            .addCase(deleteBrandAsync.pending, (state) => {
                state.deleteStatus = 'pending';
            })
            .addCase(deleteBrandAsync.fulfilled, (state, action) => {
                state.deleteStatus = 'fulfilled';
                state.brands = state.brands.filter(brand => brand._id !== action.payload._id);
            })
            .addCase(deleteBrandAsync.rejected, (state, action) => {
                state.deleteStatus = 'rejected';
                state.errors = action.error;
            });

    }
})

// exporting selectors
export const selectBrandStatus=(state)=>state.BrandSlice.status
export const selectBrands=(state)=>state.BrandSlice.brands
export const selectBrandErrors=(state)=>state.BrandSlice.errors
export const selectBrandAddStatus = (state) => state.BrandSlice.addStatus;
export const selectBrandUpdateStatus = (state) => state.BrandSlice.updateStatus;
export const selectBrandDeleteStatus = (state) => state.BrandSlice.deleteStatus;

export const { resetBrandAddStatus, resetBrandUpdateStatus, resetBrandDeleteStatus } = brandSlice.actions;

export default brandSlice.reducer