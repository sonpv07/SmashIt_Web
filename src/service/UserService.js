import { toast } from "react-toastify";
import { baseURL, getRequest } from ".";

const API_URL = baseURL + "/api/Authentication";

const API_URL2 = baseURL + "/api/User";

class UserService {
  static async getAllContact(token) {
    try {
      const res = await getRequest(`${API_URL}/get-accounts`, token);

      console.log(res);

      if (res.statusCode === 200) {
        return res.data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  static async getNumberOfPlayerAndOwner(token) {
    try {
      const res = await getRequest(
        `${API_URL2}/get-number-of-player-and-owner`,
        token
      );

      console.log(res);

      if (res.statusCode === 200) {
        return res.data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

export default UserService;
