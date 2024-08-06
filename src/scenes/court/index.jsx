import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts, mockDataCourts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import BadmintonCourtService from "../../service/BadmintonCourtService";
import { token } from "../../service";
import { formatNumber } from "../../utils";

const Courts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "courtName",
      headerName: "Tên sân",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "courtOwner",
      headerName: "Tên chủ sân",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "numberOfCourt",
      headerName: "Số lượng sân",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      flex: 1,
    },
    {
      field: "pricePerHour",
      headerName: "Giá trong tuần",
      valueGetter: (params) => `${formatNumber(params.row.pricePerHour)}đ`,
      flex: 1,
    },
    {
      field: "priceAtWeekend",
      headerName: "Giá cuối tuần",
      flex: 1,
      valueGetter: (params) => `${formatNumber(params.row.priceAtWeekend)}đ`,
    },
    // {
    //   field: "address",
    //   headerName: "Địa chỉ",
    //   flex: 1,
    // },
  ];

  useEffect(() => {
    const fetchData = async () => {
      console.log(token);

      const res = await BadmintonCourtService.getAllBadmintonCourt(token);

      if (res) {
        setData(res);
      }
    };

    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header title="Sân cầu lông" subtitle="Quản lí danh sách sân cầu lông" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#299083",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#299083",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Courts;
