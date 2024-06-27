import { toast } from "react-toastify";
import { baseURL, getRequest } from ".";

const API_URL = baseURL + "/api/BadmintonCourt";

class BadmintonCourtService {
  static async getAllBadmintonCourt(token) {
    try {
      const res = await getRequest(
        `${API_URL}/get-all-badminton-courts`,
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

export default BadmintonCourtService;
