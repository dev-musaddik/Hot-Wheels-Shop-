import { axiosi } from "../../config/axios";

export const fetchAllBrands=async()=>{
    try {
        const res=await axiosi.get("/brands")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const createBrand = async (brand) => {
    try {
        const res = await axiosi.post("/brands", brand);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateBrand = async (brand) => {
    try {
        const res = await axiosi.patch(`/brands/${brand._id}`, brand);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteBrand = async (id) => {
    try {
        const res = await axiosi.delete(`/brands/${id}`);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};