import { createSlice } from '@reduxjs/toolkit'
async function getdata() {
  let abd=await fetch("https://ahr-admin.vercel.app/api/add")
  let mefin= await abd.json()
  return mefin
}
  
let my= await getdata()
const initialState = {
  value: my,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (searchID) => {
      
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    multiply: (state)=>{
        state.value*=2;
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount,multiply } = counterSlice.actions

export default counterSlice.reducer