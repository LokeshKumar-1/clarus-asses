import apiClient from "./apiClient";

export const getAllProducts = async () => {
  try {
    const response = await apiClient.get("/products");
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return "invalid";
  } catch (error) {
    console.error(error?.response?.data || error.message);
    return "invalid";
  }
};

export const getProductsDetails = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return "invalid";
  } catch (error) {
    console.error(error?.response?.data || error.message);
    return "invalid";
  }
};

export const postNewProductApi = async (content) => {
  try {
    const response = await apiClient.post("/products", content);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return "invalid";
  } catch (error) {
    console.error(error?.response?.data || error.message);
    return "invalid";
  }
};
export const editExistingProductApi = async (id, content) => {
  try {
    const response = await apiClient.put(`/products/${id}`, content);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return "invalid";
  } catch (error) {
    console.error(error?.response?.data || error.message);
    return "invalid";
  }
};

export const deleteExistingProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/products/${id}`);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return "invalid";
  } catch (error) {
    console.error(error?.response?.data || error.message);
    return "invalid";
  }
};
