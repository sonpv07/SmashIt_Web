import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import TransactionService from "../../service/TransactionService";
import { token } from "../../service";
import { formatNumber } from "../../utils";
import { toast } from "react-toastify";
import moment from "moment";

const TransactionHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await TransactionService.getAllTransactions(token);

      const data = res?.filter((item) => item.transactionStatusId !== 1);

      setData(data.reverse());
    };

    fetchData();
  }, []);

  const getType = (status) => {
    switch (status) {
      case 1:
        return "Nạp tiền";
      case 2:
        return "Rút tiền";
      case 3:
        return "Đặt sân";

      default:
        break;
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
      valueGetter: (params) => params.api.getRowIndex(params.id) + 1,
    },
    {
      field: "name",
      headerName: "Họ và Tên",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.account.fullName,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      flex: 1,
      valueGetter: (params) => params.row.account.phoneNumber,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      valueGetter: (params) => params.row.account.email,
    },
    {
      field: "cost",
      headerName: "Số tiền",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {formatNumber(params.row.amount)}đ
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Ngày giao dịch",
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {moment(params.row.timestamp).format("HH:mm:ss, DD/MM/YYYY")}
        </Typography>
      ),
    },

    {
      field: "statusType",
      headerName: "Loại giao dịch",
      flex: 1,
      renderCell: (params) => (
        <Typography>{getType(params.row.transactionTypeId)}</Typography>
      ),
    },
    // {
    //   field: "actions",
    //   headerName: "Xử lí",
    //   width: 200,
    //   renderCell: (params) =>
    //     params.row.transactionStatusId === 1 && (
    //       <Box sx={{ display: "flex", gap: 1 }}>
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           size="small"
    //           onClick={() => handleAction(true, params.row.id)}
    //         >
    //           Đồng ý
    //         </Button>
    //         <Button
    //           variant="contained"
    //           color="secondary"
    //           size="small"
    //           onClick={() => handleAction(false, params.row.id)}
    //         >
    //           Từ chối
    //         </Button>
    //       </Box>
    //     ),
    // },
  ];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await TransactionService.getUserTransactions(token);

  //     const dataList = res.filter((item) => item.transactionTypeId !== 3);
  //     setData(dataList.reverse());
  //   };

  //   fetchData();
  // }, []);

  return (
    <Box m="20px">
      <Header
        title="Lịch Sử Giao Dịch"
        subtitle="Danh sách lịch sử giao dịch"
      />
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
        }}
      >
        <DataGrid rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default TransactionHistory;
