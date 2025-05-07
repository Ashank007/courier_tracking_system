import HandleResponse from "./ApiResponse.js";
const ValidateBody = (fields, body, res) => {
  for (const field of fields) {
    if (body[field]==null) {
      HandleResponse(res,false,`${field} is required`,400);
      return false;
    }
  }
  return true;
};

export default ValidateBody;
