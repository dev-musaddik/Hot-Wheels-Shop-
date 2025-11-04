import { axiosi } from "../../config/axios";

// ✅ ADD PRODUCT
export const addProduct = async (data) => {
    try {
        console.log("🟦 [DEBUG] Sending product data to server:", data);
        const res = await axiosi.post('/products', data);
        console.log("🟩 [DEBUG] Product added successfully:", res.data);
        return res.data;
    } catch (error) {
        console.error("🟥 [DEBUG] Error adding product:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// ✅ FETCH PRODUCTS
export const fetchProducts = async (filters) => {
    let queryString = '';

    if (filters.brand) {
        filters.brand.forEach((brand) => {
            queryString += `brand=${brand}&`;
        });
    }
    if (filters.category) {
        filters.category.forEach((category) => {
            queryString += `category=${category}&`;
        });
    }
    if (filters.pagination) {
        queryString += `page=${filters.pagination.page}&limit=${filters.pagination.limit}&`;
    }
    if (filters.sort) {
        queryString += `sort=${filters.sort.sort}&order=${filters.sort.order}&`;
    }
    if (filters.user) {
        queryString += `user=${filters.user}&`;
    }

    console.log("🟦 [DEBUG] Fetching products with query:", queryString);

    try {
        const res = await axiosi.get(`/products?${queryString}`);
        const totalResults = res.headers["x-total-count"];
        console.log("🟩 [DEBUG] Products fetched:", res.data.length, "Total:", totalResults);
        return { data: res.data, totalResults };
    } catch (error) {
        console.error("🟥 [DEBUG] Error fetching products:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// ✅ FETCH PRODUCT BY ID
export const fetchProductById = async (id) => {
    try {
        console.log(`🟦 [DEBUG] Fetching product with ID: ${id}`);
        const res = await axiosi.get(`/products/${id}`);
        console.log("🟩 [DEBUG] Product fetched:", res.data);
        return res.data;
    } catch (error) {
        console.error("🟥 [DEBUG] Error fetching product by ID:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// ✅ UPDATE PRODUCT
export const updateProductById = async (update) => {
    try {
        console.log("🟦 [DEBUG] Updating product:", update);
        const res = await axiosi.patch(`/products/${update._id}`, update);
        console.log("🟩 [DEBUG] Product updated:", res.data);
        return res.data;
    } catch (error) {
        console.error("🟥 [DEBUG] Error updating product:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// ✅ UNDELETE PRODUCT
export const undeleteProductById = async (id) => {
    try {
        console.log(`🟦 [DEBUG] Undeleting product with ID: ${id}`);
        const res = await axiosi.patch(`/products/undelete/${id}`);
        console.log("🟩 [DEBUG] Product undeleted:", res.data);
        return res.data;
    } catch (error) {
        console.error("🟥 [DEBUG] Error undeleting product:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// ✅ DELETE PRODUCT
export const deleteProductById = async (id) => {
    try {
        console.log(`🟦 [DEBUG] Deleting product with ID: ${id}`);
        const res = await axiosi.delete(`/products/${id}`);
        console.log("🟩 [DEBUG] Product deleted:", res.data);
        return res.data;
    } catch (error) {
        console.error("🟥 [DEBUG] Error deleting product:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};
