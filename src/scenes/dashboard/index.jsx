import {
  Box,
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import PieChart from "../../components/PieChart";
import { useEffect, useState } from "react";
import TransactionService from "../../service/TransactionService";
import { token } from "../../service";
import moment from "moment";
import { formatNumber, getType } from "../../utils";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

// const TransactionTable = ({ data }) => {
//   return (
//     <TableContainer component={Box} sx={{ p: 2 }}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell style={{ color: colors.grey[100] }}>Họ và Tên</TableCell>
//             <TableCell style={{ color: colors.grey[100] }}>
//               Ngày giao dịch
//             </TableCell>
//             <TableCell style={{ color: colors.grey[100] }}>Số tiền</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((transaction, i) => (
//             <TableRow
//               key={`${transaction.txId}-${i}`}
//               sx={{ borderBottom: `0.5px solid ${colors.primary[500]}` }}
//             >
//               <TableCell>
//                 <Typography color={colors.grey[100]}>
//                   {transaction?.account?.fullName}
//                 </Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography color={colors.grey[100]}>
//                   {moment(transaction.timestamp).format("DD/MM/YYYY")}
//                 </Typography>
//               </TableCell>
//               <TableCell>
//                 <Box
//                   sx={{
//                     backgroundColor: colors.greenAccent[500],
//                     p: "5px 10px",
//                     borderRadius: "4px",
//                     display: "inline-block",
//                   }}
//                 >
//                   {formatNumber(transaction.amount)}đ
//                 </Box>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { signOut, isLogged } = useGlobalContext();
  const navigation = useNavigate();
  const handleSignOut = () => {
    signOut();
    navigation("/login");
  };

  const [invoiceData, setInvoiceData] = useState([]);

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
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await TransactionService.getAllTransactions(token);
      const dataList = res.filter((item) => item.transactionStatusId !== 1);
      setInvoiceData(dataList.reverse());
    };

    fetchData();
  }, []);

  console.log(invoiceData);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Thống Kê" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => handleSignOut()}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
        {/* ROW 1 */}
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${formatNumber(100000)}đ`}
            subtitle="Doanh thu"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding={"20px"}
        >
          <StatBox
            title={`${formatNumber(30)}`}
            subtitle="Lượt tham gia"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}

        {/* ROW 2 */}
        {/* <Box
          gridColumn="span 8"
          height={"350px"}
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Doanh thu
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box> */}
        <Box
          gridColumn="span 12"
          height={"420px"}
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`0.5px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
            onClick={() => navigation("/transaction")}
            style={{ cursor: "pointer" }}
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Giao dịch gần đây
            </Typography>
          </Box>
          {/* {invoiceData.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              alignItems="center"
              borderBottom={`0.5px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction?.account?.fulllName}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction?.account?.fullName}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>
                {moment(transaction.timestamp).format("DD/MM/YYYY")}
              </Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {formatNumber(transaction.amount)}đ
              </Box>
            </Box>
          ))} */}

          <Box
            m="10px 0 0 0"
            height="350px"
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
            <DataGrid rows={invoiceData} columns={columns} />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 6"
          height={"350px"}
          backgroundColor={colors.primary[400]}
          p="30px"
          onClick={() => {
            navigation("/pie");
          }}
          style={{ cursor: "pointer" }}
        >
          <Typography variant="h5" fontWeight="600">
            Lượng người dùng
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            {/* <ProgressCircle size="125" /> */}
            <Box height="300px" mt="-20px" width={"600px"}>
              <PieChart />
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          height={"350px"}
          backgroundColor={colors.primary[400]}
          onClick={() => {
            navigation("/bar");
          }}
          style={{ cursor: "pointer" }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Khung giờ được đặt
          </Typography>
          <Box height="300px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
