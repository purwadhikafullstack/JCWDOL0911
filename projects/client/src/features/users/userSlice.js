import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.user=action.payload
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer

export function fetchUser() {
  const userId = JSON.parse(localStorage.getItem('user')).id
    return async (dispatch) => {
        let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/profiles/${userId}`)
        dispatch(setUser(response.data))
    }
}

export function uploadPicture(image, setOpen) {
  const userId = JSON.parse(localStorage.getItem('user')).id
    return async (dispatch) => {
      try {
        const file = new FormData();
        file.append('file', image);
  
        let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/profiles/upload-picture/${userId}`, file);
        alert(response.data.message)
        setOpen(false)
        dispatch(fetchUser());
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        } else if (error.message) {
          alert(error.message);
        } else {
          alert('An error occurred while uploading the picture.');
        }
      }
    };
  }
  
  
  
  
  