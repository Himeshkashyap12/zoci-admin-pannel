import { toast } from "react-toastify";
import { makeToOrderSalesExportInExcelAsync, offlineSalesExportInExcelAsync, onlinesalesExportInExcelAsync } from "../../feature/sales/salesSlice";

export const onlineSalesExport = async ({dispatch,data,token}) => {
  try {
    const actionResult = await dispatch(onlinesalesExportInExcelAsync({ token ,data}));
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
      ? (payload.headers["content-disposition"].match(/filename="?(.+)"?/)?.[1] || "sales.xlsx")
      : "sales.xlsx";

    document.body.appendChild(link);
    link.click();

    // Clean up
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
  }
};
export const offlineSalesExport = async ({dispatch,data,token}) => {
  try {
    const actionResult = await dispatch(offlineSalesExportInExcelAsync({ token ,data}));
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
      ? (payload.headers["content-disposition"].match(/filename="?(.+)"?/)?.[1] || "sales.xlsx")
      : "sales.xlsx";

    document.body.appendChild(link);
    link.click();

    // Clean up
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
  }
};
export const makeToOrderSalesExport = async ({dispatch,data,token}) => {
  try {
    const actionResult = await dispatch(makeToOrderSalesExportInExcelAsync({ token ,data}));
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
      ? (payload.headers["content-disposition"].match(/filename="?(.+)"?/)?.[1] || "sales.xlsx")
      : "sales.xlsx";

    document.body.appendChild(link);
    link.click();

    // Clean up
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
  }
};