import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Slices
import counterSlice from '../slice/counterSlice';
import authSlice from '../slice/authSlice';
import productSlice from '../slice/productSlice';
import userSlice from '../slice/userSlice';
import orderSlice from '../slice/orderSlice';
import contactUsSlice from '../slice/contactUsSlice';
import gallerySlice from '../slice/gallerySlice';
import mediaSlice from '../slice/mediaSlice';
import enquireSlice from '../slice/enquireSlice';
import bannerSlice from '../slice/bannerSlice';
import ourteamSlice from '../slice/ourteamSlice';
import customerSlice from '../slice/customerSlice';
import orderSliceDB from '../slice/orderSliceDB';
import eventReducer from '../slice/eventSlice';
import admissionReducer from '../slice/admissionSlice';
import careerReducer from '../slice/careerSlice';
import managementReducer from '../slice/managementSlice';
import blogReducer from '../slice/blogSlice';
import applyFormSlice from '../slice/applyFormSlice';
import serviceReducer from '../slice/serviceSlice';
import faqReducer from '../slice/faqSlice';

// Root saga
import rootSaga from '../apis/rootSaga';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [] // Add slices here if you want them persisted
};

// Combine reducers
const rootReducer = combineReducers({
  counter: counterSlice,
  auth: authSlice,
  product: productSlice,
  gallery: gallerySlice,
  media: mediaSlice,
  enquire: enquireSlice,
  user: userSlice,
  order: orderSlice,
  orderDB: orderSliceDB,
  contactus: contactUsSlice,
  applyform: applyFormSlice,
  banner: bannerSlice,
  team: ourteamSlice,
  career: careerReducer,
  customer: customerSlice,
  service: serviceReducer,
  event: eventReducer,
  admission: admissionReducer,
  faq: faqReducer,
  management: managementReducer,
  blog: blogReducer
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'teacher/addTeacher', 'teacher/updateTeacher', 'event/addEvent', 'event/updateEvent'],
        ignoredPaths: ['teacher.formData', 'event.formData']
      }
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

// Run root saga
sagaMiddleware.run(rootSaga);

// Persistor
const persistor = persistStore(store);

export { store, persistor };
