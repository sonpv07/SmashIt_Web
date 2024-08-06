import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { useEffect, useState } from "react";
import axios from "axios";
import BadmintonCourtService from "../../service/BadmintonCourtService";
import { token } from "../../service";
import CourtRevenueChart from "../../components/CourtRevenueChart";
import { eachDayOfInterval, formatISO, subDays } from "date-fns";
import AdminService from "../../service/AdminService";
import Loading from "../../components/Loading";

const CourtRevenue = () => {
  const [chosenCourt, setChosenCourt] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [courtList, setCourtList] = useState([]);

  const [filter, setFilter] = useState(0);

  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setChosenCourt(event.target.value);
  };

  const dates = eachDayOfInterval({
    start: subDays(new Date(), 5),
    end: new Date(),
  });

  const formattedDates = dates.map((date) => new Date(date));

  console.log(formattedDates);

  // const handleGetData = async () => {
  //   for (let i = 0; i < formattedDates.length; i++) {
  //     console.log(formattedDates[i], "---", chosenCourt);
  //     const res = await AdminService.getCourtRevenueByDate(
  //       chosenCourt,
  //       formattedDates[i].toISOString(),
  //       token
  //     );

  //     console.log(res);
  //   }
  // };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleGetData = async () => {
    const results = [];

    setIsLoading(true);

    try {
      for (let i = 0; i < formattedDates.length; i++) {
        const date = formattedDates[i];

        const res = await AdminService.getCourtRevenueByDate(
          chosenCourt,
          date.toISOString(),
          token
        );

        results.push({
          date: `${date.getDate()}/${date.getMonth() + 1}`,
          revenue: res, // Assuming res.revenue contains the revenue
        });

        // Introduce a delay of 1 second (1000 ms) between requests
        await delay(500);
      }

      // Assuming setData is a state setter function for the data
      setData(results);

      console.log(results);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await BadmintonCourtService.getAllBadmintonCourt(token);

      console.log(res[0].courtName);

      if (res) {
        setChosenCourt(res[0].id);
        setCourtList(res);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleGetData();
  }, [chosenCourt]);

  console.log("data", data);

  return (
    <Box m="20px">
      <Header title="Danh sách đặt sân" subtitle="Theo khung giờ" />
      <Box height="90vh">
        <Box style={{ display: "flex", gap: 20 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="court-label">Sân</InputLabel>
              <Select
                labelId="court-label"
                id="court"
                value={chosenCourt}
                onChange={handleChange}
                autoWidth
                label="Sân"
              >
                {courtList.map((item) => (
                  <MenuItem value={item.id}>{item.courtName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="filter-label">Bộ Lọc</InputLabel>
              <Select
                labelId="filter-label"
                id="filter"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
                autoWidth
                label="Sân"
              >
                <MenuItem value={0}>Ngày</MenuItem>
                <MenuItem value={1}>Tuần</MenuItem>
                <MenuItem value={2}>Tháng</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {isLoading ? (
          <Loading />
        ) : (
          <Box height="75vh">
            <CourtRevenueChart data={data} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CourtRevenue;
