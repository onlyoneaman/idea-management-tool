class ApiResponse {
  body!: any;
  status!: number;
  error!: any

  constructor(body: any, status: number, error: any) {
    this.body = body;
    this.status = status;
    this.error = error;
  }

  isValid() {
    return !(this.status < 200 || this.status > 300)
  }
}

export default ApiResponse;