import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createCategory, deleteCategory, fetchAllCategories, updateCategory } from './CategoriesApi'

const initialState={
    status:"idle",
    categories:[],
    errors:null,
    addStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle"
}

export const fetchAllCategoriesAsync=createAsyncThunk('categories/fetchAllCategoriesAsync',async()=>{
    const categories=await fetchAllCategories()
    return categories
})

export const createCategoryAsync = createAsyncThunk('categories/createCategoryAsync', async (category) => {
    const newCategory = await createCategory(category);
    return newCategory;
});

export const updateCategoryAsync = createAsyncThunk('categories/updateCategoryAsync', async (category) => {
    const updatedCategory = await updateCategory(category);
    return updatedCategory;
});

export const deleteCategoryAsync = createAsyncThunk('categories/deleteCategoryAsync', async (id) => {
    const deletedCategory = await deleteCategory(id);
    return deletedCategory;
});

const categorySlice=createSlice({
    name:"categorySlice",
    initialState:initialState,
    reducers:{
        resetCategoryAddStatus: (state) => {
            state.addStatus = 'idle';
        },
        resetCategoryUpdateStatus: (state) => {
            state.updateStatus = 'idle';
        },
        resetCategoryDeleteStatus: (state) => {
            state.deleteStatus = 'idle';
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAllCategoriesAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(fetchAllCategoriesAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.categories=action.payload
            })
            .addCase(fetchAllCategoriesAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })
            .addCase(createCategoryAsync.pending, (state) => {
                state.addStatus = 'pending';
            })
            .addCase(createCategoryAsync.fulfilled, (state, action) => {
                state.addStatus = 'fulfilled';
                state.categories.push(action.payload);
            })
            .addCase(createCategoryAsync.rejected, (state, action) => {
                state.addStatus = 'rejected';
                state.errors = action.error;
            })
            .addCase(updateCategoryAsync.pending, (state) => {
                state.updateStatus = 'pending';
            })
            .addCase(updateCategoryAsync.fulfilled, (state, action) => {
                state.updateStatus = 'fulfilled';
                const index = state.categories.findIndex(category => category._id === action.payload._id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })
            .addCase(updateCategoryAsync.rejected, (state, action) => {
                state.updateStatus = 'rejected';
                state.errors = action.error;
            })
            .addCase(deleteCategoryAsync.pending, (state) => {
                state.deleteStatus = 'pending';
            })
            .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
                state.deleteStatus = 'fulfilled';
                state.categories = state.categories.filter(category => category._id !== action.payload._id);
            })
            .addCase(deleteCategoryAsync.rejected, (state, action) => {
                state.deleteStatus = 'rejected';
                state.errors = action.error;
            });

    }
})

// exporting selectors
export const selectCategoryStatus=(state)=>state.CategoriesSlice.status
export const selectCategories=(state)=>state.CategoriesSlice.categories
export const selectCategoryErrors=(state)=>state.CategoriesSlice.errors
export const selectCategoryAddStatus = (state) => state.CategoriesSlice.addStatus;
export const selectCategoryUpdateStatus = (state) => state.CategoriesSlice.updateStatus;
export const selectCategoryDeleteStatus = (state) => state.CategoriesSlice.deleteStatus;

export const { resetCategoryAddStatus, resetCategoryUpdateStatus, resetCategoryDeleteStatus } = categorySlice.actions;

export default categorySlice.reducer