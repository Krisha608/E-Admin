import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getCategories = async () => {
  const response = await axios.get(`${base_url}category/`);
  //console.log(response.data);
  return response.data;
};

const createCategory = async (category) => {
  const response = await axios.post(
    `${base_url}category/`,
    category,
    config
  );
  //console.log(response.data);
  return response.data;
};

const getProductCategoryById = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);
  return response.data;
};

const updateProductCategory = async (category) => {
  //console.log(category);
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    { title: category.data.title },
    config
  );
  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(
    `${base_url}category/${id}`,
    config
  );
  return response.data;
};

const categoryService = {
  getCategories,
  createCategory,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
};

export default categoryService;
