
import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name : "cart",
    initialState :{
        cartList : []
    },

    reducers :{
        add(state,action)
        { const updatedCartList = state.cartList.concat(action.payload)
          return{...state,cartList :updatedCartList}
        },
        remove(state, action) {
            const updatedCartList = state.cartList.filter(item => item.id !== action.payload.id);
            return { ...state, cartList: updatedCartList };
        }
    }

})

export const {add,remove} = cartSlice.actions;
export const cartReducer =cartSlice.reducer;