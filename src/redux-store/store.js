import {configureStore} from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoAPI";
import { crcryptoNewsApi } from "../services/cryptoNewsAPI";

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [crcryptoNewsApi.reducerPath]: crcryptoNewsApi.reducer,
    }
});