class ApiResponse {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

const HandleResponse = (res, success, message, status = 200) => {
  res.status(status).json(new ApiResponse(success, message));
};

export default HandleResponse;
