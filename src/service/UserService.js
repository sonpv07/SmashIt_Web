import { toast } from "react-toastify";
import { baseURL, getRequest } from ".";

const API_URL = baseURL + "/api/Authentication";

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
}

export default UserService;
