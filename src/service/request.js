import axios from "axios";

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
