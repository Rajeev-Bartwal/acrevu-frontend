import api from "./api"

export const addProperty = (data) => {
     console.log("inside add property" , data)
     return api.post("/property/", data);
}

export const getAllProperties = () => {
  return api.get("/property/properties");   
};
