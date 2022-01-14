import {GetRequest, PostRequest} from "../Requests";
import ApiResponse from "../../Models/ApiResponse";
import { ApiConstants, ServerURL } from "../ApiConstants";

const UpdateIdeaPositionApi = async (idea_id: any, pos: any) => {
  let apiResponse;
  if (ApiConstants.RUN_PROD_SERVER || process.env.NODE_ENV !== "development") {
    apiResponse = await PostRequest(ServerURL("/idea/pos/update"), {
      idea_id, pos
    })
  } else {
    apiResponse = new ApiResponse(dummyPlans(), 200, null)
  }
  if (apiResponse.body) {
    return apiResponse.body;
  } else {
    return apiResponse.error
  }
};

function dummyPlans() {
  return {"data":{"heading":"Head 1","sub_heading":"Subhead 2","brand_name":"Aman Kumnar","connected":true,"is_active":true,"email_ph":"2000.aman@gmail.com","ig_ph":"awd","submit_button_text":"Submit","thank_you_text":"Thank you"},"success":true,"error":null}
}

export default UpdateIdeaPositionApi
