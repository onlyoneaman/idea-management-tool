import axios from 'axios';
import ApiResponse from "../Models/ApiResponse";

export const GetRequest = async (url: string, params: any = null, headers: any = null) => {
  try {
    let response = await axios.get(url, {
      params: params,
      headers: headers,
    });
    return new ApiResponse(response.data, response.status, null);
  } catch (e: any) {
    if (e.response) {
      return new ApiResponse(null, e.response.status, e.response.data);
    } else {
      return new ApiResponse(null, 500, e.message)
    }
  }
};

export const PostRequest = async (url: string, data: any = null, headers: any = null) => {
  try {
    let response = await axios.post(url, data, {
      headers: headers,
    });
    return new ApiResponse(response.data, response.status, null);
  } catch (e: any) {
    if (e.response) {
      return new ApiResponse(null, e.response.status, e.response.data);
    } else {
      return new ApiResponse(null, 500, e.message)
    }
  }
};
