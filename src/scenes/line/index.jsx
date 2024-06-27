import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { useState } from "react";

const Line = () => {
  const [filter, setFilter] = useState(0);

  return (
    <Box m="20px">
      <Header title="Doanh thu ứng dụng" />

      <Box>
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
              label="Bộ Lọc"
            >
              <MenuItem value={0}>Ngày</MenuItem>
              <MenuItem value={1}>Tuần</MenuItem>
              <MenuItem value={2}>Tháng</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box height="60vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
