import { axiosi } from "../../config/axios"

export const fetchAllCategories=async()=>{
    try {
        const res=await axiosi.get("/categories")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const createCategory = async (category) => {
    try {
        const res = await axiosi.post("/categories", category);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateCategory = async (category) => {
    try {
        const res = await axiosi.patch(`/categories/${category._id}`, category);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteCategory = async (id) => {
    try {
        const res = await axiosi.delete(`/categories/${id}`);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};