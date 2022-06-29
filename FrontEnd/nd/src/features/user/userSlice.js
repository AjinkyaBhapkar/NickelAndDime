import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    username: 'TestUser',
    
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginOut: (state, action) => {
            state.username = action.payload.username
        }
    }
})

export default userSlice.reducer
export const { loginOut } = userSlice.actions