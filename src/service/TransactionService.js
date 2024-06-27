import { toast } from "react-toastify";
import { baseURL, getRequest, postRequest } from ".";

const API_URL = baseURL + "/api/Transaction";

class TransactionService {
  static async addMoney(body, token) {
    try {
      const response = await postRequest(
        `${API_URL}/add-new-transaction`,
        body,
        token
      );

      console.log(response);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response.statusCode;
      } else {
        console.error("add money fail", response.data);
      }
    } catch (error) {
      console.error("Error add money", error);
    }
  }

  static async cashOut(amount, token) {
    try {
      const response = await postRequest(
        `${API_URL}/cash-out-request?money=${amount}`,
        null,
        token
      );

      console.log(response);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response.statusCode;
      } else {
        console.error("cash out money fail", response.data);
      }
    } catch (error) {
      console.error("Error cash out money", error);
    }
  }

  static async getTransactionById(accountId, token) {
    try {
      const response = await getRequest(
        `${API_URL}/get-all-with-account?accountId=${accountId}`,
        token
      );

      console.log(response);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response.data;
      } else {
        console.error("get money fail", response.data);
      }
    } catch (error) {
      console.error("Error get money", error);
    }
  }

  static async getAllTransactions(token) {
    try {
      const response = await getRequest(`${API_URL}/get-all`, token);

      console.log(response);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response.data;
      } else {
        console.error("get transaction fail", response.data);
      }
    } catch (error) {
      console.error("Error get transaction", error);
    }
  }

  static async approveTransaction(transactionId, token) {
    try {
      const response = await postRequest(
        `${API_URL}/approve-transaction?transactionId=${transactionId}`,
        token
      );

      console.log(response);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log("Showing success toast");
        toast.success("Xử lí giao dịch thành công");
        return { success: true };
      } else {
        toast.error("Xử lí giao dịch thất bại");
        return { success: false };
      }
    } catch (error) {
      toast.error("Xử lí giao dịch thất bại");
      console.error("Error approve transaction", error);
    }
  }

  static async rejectTransaction(transactionId, token) {
    try {
      const response = await postRequest(
        `${API_URL}/reject-transaction?transactionId=${transactionId}`,
        token
      );

      console.log(response);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        toast.success("Xử lí giao dịch thành công");
        return { success: true };
      } else {
        toast.error("Xử lí giao dịch thất bại");
        console.error("reject transaction fail", response.data);
        return { success: false };
      }
    } catch (error) {
      toast.error("Xử lí giao dịch thất bại");
      console.error("Error reject transaction", error);
    }
  }
}

export default TransactionService;
