import { combineReducers, configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./features/navbar/navbarSlice";
import userReducer from "./features/user/userSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const reducers = combineReducers({
    user: userReducer,
    navbar: navbarReducer,
   });
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

 export let persistor = persistStore(store);

 
//  const persistConfig = {
//      key: 'root',
//      storage
//  };
 
//  const persistedReducer = persistReducer(persistConfig, reducers);
 
 
//  const store = configureStore({
//      reducer: persistedReducer,
//      devTools: process.env.NODE_ENV !== 'production',
//      middleware: [thunk]
//  });
 
//  export default store;