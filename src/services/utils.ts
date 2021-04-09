import { message } from "antd";

export const requestWraaper = (block: () => void) => {
    try {
        block();
    } catch (error) {
       toastFailMessage(error);
    }
}

export const toastFailMessage = (error?: any) => {
    console.error("network fail! the error:", error);
    message.error("请求失败，请重试！")
}