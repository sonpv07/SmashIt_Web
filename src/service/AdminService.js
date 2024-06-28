import { toast } from "react-toastify";
import { baseURL, getRequest } from ".";

const API_URL = baseURL + "/api/Admin";

class AdminService {
  static async getCourtRevenueByDate(badmintonCourtId, date, token) {
    console.log(badmintonCourtId, date);

    try {
      const res = await getRequest(
        `${API_URL}/get-revenue-by-badminton-court-id-chart?badmintonCourtId=${badmintonCourtId}&date=${date}`,
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

export default AdminService;
