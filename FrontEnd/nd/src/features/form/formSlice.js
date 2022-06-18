import { createSlice } from "@reduxjs/toolkit";


const fullDate = new Date()
const month = String(parseInt(fullDate.getMonth()) + 1).padStart(2, "0")
const date = fullDate.getFullYear() + '-' + month + '-' + fullDate.getDate()


const initialState = {
    _id:'',
    username: ``,
    type: '',
    amount: '',
    description: '',
    tags: '',
    date: date,
    edit:'none',
    submit:'',
    update:'none'
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        fill: (state, action) => {
            state._id=action.payload._id
            state.username = action.payload.username
            state.type = action.payload.type
            state.amount = action.payload.amount
            state.description = action.payload.description
            state.tags = action.payload.tags
            state.date = action.payload.date
            state.edit = action.payload.edit
            state.submit = action.payload.submit
            state.update = action.payload.update
        }
    }
})

export default formSlice.reducer
export const { fill } = formSlice.actions