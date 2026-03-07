import api from "./api";

export const addProperty = (data) => {
  console.log("inside add property", data);
  return api.post("/property/", data);
};

export const getAllProperties = (
  page = 0,
  size = 10,
  sortBy = "createdAt",
  sortDir = "desc",
) => {
  return api.get("/property/properties", {
    params: { page, size, sortBy, sortDir },
  });
};


export const getAllPropertiesByFilters = (
  filters = {},
  page = 0,
  size = 10,
) => {
  return api.get("/property/filter", { 
    params: { ...filters, page, size } 
  });
};
