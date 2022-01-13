import NotificationTypeEnum from "../Models/NotificationTypeEnum";
import {message} from "antd";

function SendNotification(title: any, messageShow?: string, isLong=false) {
  /*     let icon;
      } */
  let duration = 5;
  if (isLong) {
    duration = 20;
  }
  if (title === NotificationTypeEnum.Failure) {
    message.error(messageShow, duration)
  } else {
    message.success(messageShow, duration)
  }
}

export function BadNotif(r: any = null, message = "Something Wrong Happened") {
  if(r && r.errors) {message = r.errors[0].message}
  SendNotification(NotificationTypeEnum.Failure, message)
}

export function SuccessNotif(message = 'Done') {
  SendNotification(NotificationTypeEnum.Success, message)
}

export default SendNotification;