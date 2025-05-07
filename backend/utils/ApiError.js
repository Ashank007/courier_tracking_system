class ApiError {
  constructor(status = false, message) {
    this.status = status;
    this.message = message;
  }
}

const HandleError = (res, success=false, message, status = 500) => {
  res.status(status).json(new ApiError(success, message));
};

export default HandleError;
