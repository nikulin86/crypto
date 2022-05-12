import { configureStore } from "@reduxjs/toolkit";
import coinPageSlice from "./CoinPageSlice";

export default configureStore ({
    reducer: {  
        coin: coinPageSlice
    },
    
})
