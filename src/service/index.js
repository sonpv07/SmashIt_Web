import axios from "axios";

export const baseURL = "http://api.smashit.com.vn";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImp0aSI6IjkwNzlhOGE3LWM1MmYtNDgxOS1iZTY4LTdiZjc0MjJhN2Y2ZSIsImlhdCI6IjE0IiwiVXNlck5hbWUiOiJQaGFtIFZpbmggU29uIiwiVXNlcklkIjoiOCIsImV4cCI6MTg0NDU3NzA4MiwiaXNzIjoiU21hc2hJdCIsImF1ZCI6IlNtYXNoSXRDbGllbnQifQ.V2_KGykezgg1jHl9p9LyG9TPrhwJNqJKo26nPI8LKkE";

export const getRequest = async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      withCredentials: !!token,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const postRequest = async (url, body, token) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      withCredentials: !!token,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const putRequest = async (url, body, token) => {
  try {
    const response = await axios.put(url, body, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      withCredentials: !!token,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const patchRequest = async (url, body, token) => {
  try {
    const response = await axios.patch(url, body, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      withCredentials: !!token,
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};
