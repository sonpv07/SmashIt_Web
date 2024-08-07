import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import UserService from "../../service/UserService";
import { token } from "../../service";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
      valueGetter: (params) => params.api.getRowIndex(params.id) + 1,
    },

    {
      field: "fullName",
      headerName: "Họ và Tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "age",
    //   // headerName: "Tuổi",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    {
      field: "phoneNumber",
      headerName: "Số điện thoại",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "roleId",
      headerName: "Vai trò",
      valueGetter: (params) =>
        params.row.roleId === 1 ? "Nguời chơi" : "Chủ sân",
      flex: 1,
    },
    // {
    //   field: "address",
    //   headerName: "Địa chỉ",
    //   flex: 1,
    // },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await UserService.getAllContact(token);

        if (res) {
          setData(res.filter((item) => item.roleId !== 3));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <Box m="20px">
      <Header title="Khách hàng" subtitle="Quản lí danh sách khách hàng" />
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

export default Contacts;
