import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  outline: "none",
};

const Login = () => {
  const navigation = useNavigate();
  const { setIsLogged, setUser, login } = useGlobalContext();
  const [error, setError] = useState(false);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin1 = () => {
    if (input.username === "admin" && input.password === "admin") {
      setIsLogged(true);
      setUser("Admin");
      navigation("/");
    }
  };

  const handleLogin = async () => {
    const body = {
      email: input.email,
      password: input.password,
    };

    const res = await login(body);

    if (res) {
      setIsLogged(true);
      navigation("/");
    } else {
      setError(true);
    }

    console.log(res);
    console.log(body);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={[
          style,
          {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
          },
        ]}
      >
        <Typography
          variant="body1"
          color="initial"
          fontSize={24}
          fontWeight={600}
          sx={{ pb: "10px" }}
        >
          Đăng nhập
        </Typography>
        <Divider />
        <Typography variant="body1" sx={{ fontWeight: 600, pt: "10px" }}>
          Chào mừng đến với trang quản lý Smash It
        </Typography>
        <TextField
          label="Email"
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          fullWidth
          margin="normal"
          onFocus={() => setError(false)}
        />
        <TextField
          label="Mật khẩu"
          type="password"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          fullWidth
          margin="normal"
          onFocus={() => setError(false)}
        />
        {error && (
          <Typography variant="body1" color="red" fontSize={13}>
            Sai email hoặc mật khẩu. Vui lòng đăng nhập lại
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            width: "100%",
            mt: "20px",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Đăng nhập
        </Button>
      </Box>
    </Modal>
  );
};

export default Login;
