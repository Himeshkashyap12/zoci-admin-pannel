import { toast } from "react-toastify";
import { orderExportInExcelAsync } from "../../feature/order/orderSlice";
import { anniversaryExportInExcelAsync, birthdayExportInExcelAsync, promotionExportInExcelAsync } from "../../feature/marketing/marketingSlice";

export const marketingPromotionHandler = async ({dispatch,data,token}) => {
  try {
    const actionResult = await dispatch(promotionExportInExcelAsync({ token ,data}));
    const { payload } = actionResult;
    // If payload is undefined or not blob, bail out
    if (!payload || !payload.blob) {
      toast.error("No file data returned");
      return;
    }
    const blob = payload.blob;
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = payload.headers?.["content-disposition"]
      ? (payload.headers["content-disposition"].match(/filename="?(.+)"?/)?.[1] || "promotion.xlsx")
      : "promotion.xlsx";

    document.body.appendChild(link);
    link.click();

    // Clean up
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
  }
};
export const birthdayPromotionHandler = async ({dispatch,data,token}) => {
  try {
    const actionResult = await dispatch(birthdayExportInExcelAsync({ token ,data}));
    const { payload } = actionResult;
    // If payload is undefined or not blob, bail out
    if (!payload || !payload.blob) {
      toast.error("No file data returned");
      return;
    }
    const blob = payload.blob;
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = payload.headers?.["content-disposition"]
      ? (payload.headers["content-disposition"].match(/filename="?(.+)"?/)?.[1] || "promotion.xlsx")
      : "promotion.xlsx";

    document.body.appendChild(link);
    link.click();

    // Clean up
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
  }
};
export const anniversaryPromotionHandler = async ({dispatch,data,token}) => {
  try {
    const actionResult = await dispatch(anniversaryExportInExcelAsync({ token ,data}));
    const { payload } = actionResult;
    // If payload is undefined or not blob, bail out
    if (!payload || !payload.blob) {
      toast.error("No file data returned");
      return;
    }
    const blob = payload.blob;
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = payload.headers?.["content-disposition"]
      ? (payload.headers["content-disposition"].match(/filename="?(.+)"?/)?.[1] || "promotion.xlsx")
      : "promotion.xlsx";

    document.body.appendChild(link);
    link.click();

    // Clean up
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
  }
};