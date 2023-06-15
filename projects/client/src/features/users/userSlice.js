import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      iduser: 0,
      username: "",
      email: "",
      phone_number: "",
      fullname: "",
      gender: "",
      profile_image: "",
      address: [],
    },
    chosenAddress: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    addNewAddress: (state, action) => {
      state.user.address.push(action.payload);
    },

    setChosenAddress: (state, action) => {
      state.chosenAddress = action.payload;
    },

    resetPrimary: (state, action) => {
      state.user.address.map((val) => {
        return (val.isprimary = false);
      });
    },
  },
});

export const { setUser, setChosenAddress, addNewAddress, resetPrimary } =
  userSlice.actions;
export default userSlice.reducer;

export function fetchUser() {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  return async (dispatch) => {
    let response = await axios.get(
      `${process.env.REACT_APP_API_BE}/users/profiles/${userId}`
    );
    dispatch(setUser(response.data));
  };
}

export const newAddress = (userNewAddress) => {
  return async (dispatch) => {
    console.log(userNewAddress);

    const response = await axios.post(
      "http://localhost:8000/address/new",
      userNewAddress
    );
    if (response.data.success) {
      if (userNewAddress.isprimary) {
        dispatch(resetPrimary());
      }
      alert(response.data.message);
      dispatch(addNewAddress(userNewAddress));
      dispatch(setChosenAddress(userNewAddress));
    } else {
      alert(response.data.message);
    }
  };
};

export function uploadPicture(image, setOpen) {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  return async (dispatch) => {
    try {
      const file = new FormData();
      file.append("file", image);

      let response = await axios.post(
        `${process.env.REACT_APP_API_BE}/users/profiles/upload-picture/${userId}`,
        file
      );
      alert(response.data.message);
      setOpen(false);
      dispatch(fetchUser());
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else if (error.message) {
        alert(error.message);
      } else {
        alert("An error occurred while uploading the picture.");
      }
    }
  };
}
