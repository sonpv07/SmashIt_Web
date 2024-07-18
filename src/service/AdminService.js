import { toast } from "react-toastify";
import { baseURL, getRequest } from ".";
import { addDays } from "date-fns";

const API_URL = baseURL + "/api/Admin";

class AdminService {
  static async getCourtRevenueByDate(badmintonCourtId, date, token) {
    console.log(badmintonCourtId, date);

    const newDate = addDays(date, 1);

    const newDateStr = newDate.toISOString();

    console.log(newDateStr);

    try {
      const res = await getRequest(
        `${API_URL}/get-revenue-by-badminton-court-id-chart?badmintonCourtId=${badmintonCourtId}&date=${newDateStr}`,
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
