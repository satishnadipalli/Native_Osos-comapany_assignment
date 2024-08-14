import { configureStore} from "@reduxjs/toolkit"
import cartreducer from "./productsSlice";

export const reduxStore = configureStore({
    reducer :{
        cartModal : cartreducer,
    }
});