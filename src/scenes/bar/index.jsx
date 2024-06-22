import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { useEffect, useState } from "react";
import axios from "axios";

const Bar = () => {
  const [chosenCourt, setChosenCourt] = useState("");

  const [courtList, setCourtList] = useState([]);

  const [filter, setFilter] = useState(0);

  const handleChange = (event) => {
    setChosenCourt(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5036/api/BadmintonCourt/get-all-badminton-courts",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImp0aSI6IjkwNzlhOGE3LWM1MmYtNDgxOS1iZTY4LTdiZjc0MjJhN2Y2ZSIsImlhdCI6IjE0IiwiVXNlck5hbWUiOiJQaGFtIFZpbmggU29uIiwiVXNlcklkIjoiOCIsImV4cCI6MTg0NDU3NzA4MiwiaXNzIjoiU21hc2hJdCIsImF1ZCI6IlNtYXNoSXRDbGllbnQifQ.V2_KGykezgg1jHl9p9LyG9TPrhwJNqJKo26nPI8LKkE",
            },
          }
        );

        console.log(res.data);

        if (res.data.statusCode === 200) {
          let getName = res.data.data.map((item) => item.courtName);
          setChosenCourt(getName[0]);
          setCourtList(getName);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
                  <MenuItem value={item}>{item}</MenuItem>
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
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
