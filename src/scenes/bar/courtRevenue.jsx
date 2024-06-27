import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { useEffect, useState } from "react";
import axios from "axios";
import BadmintonCourtService from "../../service/BadmintonCourtService";
import { token } from "../../service";
import CourtRevenueChart from "../../components/CourtRevenueChart";

const CourtRevenue = () => {
  const [chosenCourt, setChosenCourt] = useState("");

  const [courtList, setCourtList] = useState([]);

  const [filter, setFilter] = useState(0);

  const handleChange = (event) => {
    setChosenCourt(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await BadmintonCourtService.getAllBadmintonCourt(token);

      if (res) {
        let getName = res.map((item) => item.courtName);
        setChosenCourt(getName[0]);
        setCourtList(getName);
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
        <Box height="75vh">
          <CourtRevenueChart />
        </Box>
      </Box>
    </Box>
  );
};

export default CourtRevenue;
