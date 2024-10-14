import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from '../slices/userSlice';
import categoryReducer from '../slices/categorySlice';
import serviceReducer from '../slices/serviceSlice';
import formReducer from '../slices/formSlice';
import plansReducer from '../slices/planSlice';


const persistConfig = {
  key: "keephy",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  service: serviceReducer,
  reviewForm: formReducer,
  plans: plansReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
