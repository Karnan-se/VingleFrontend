import { adminApi } from "../../axios/axiosInstance";
import swal from "sweetalert";

export const isValidCategory = (value) =>
  /^[a-zA-Z].*[a-zA-Z0-9!@#$%^&*()_+=\-[\]{};:'",.<>/?]*$/.test(value) &&
  /[a-zA-Z]/.test(value);

export const addCategory = async (categories, category) => {
  console.log(category, "category");

  if (
    !isValidCategory(category.name) ||
    !isValidCategory(category.description)
  ) {
    swal({
      icon: "danger",
      title: "Validation Error",
      text: "Name and description must include letters",
    });
    return;
  }

  const existing = Array.from(categories).find(
    (cat) => cat.name.toLowerCase() == category.name.toLowerCase()
  );
  if (existing) {
    swal({
      icon: "danger",
      title: "Error",
      text: "category Already Exists",
    });
  } else {
    try {
      const response = await adminApi.post("/createCategory", category);
      return response.data.createcategory;
    } catch (error) {
      console.log(error);
    }
  }
};
