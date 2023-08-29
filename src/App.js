import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector, Provider } from 'react-redux';
// import {  } from 'react-redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

// routes
import Router from './routes/app';
import Login from './routes/login';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { AuthProvider } from './components/useAuth';
// ----------------------------------------------------------------------

const persistConfig = {
  key: 'root', // Key for storage
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      {/* <HelmetProvider> */}
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            {/* <ScrollToTop /> */}
            {/* <StyledChart /> */}
            {<Router />}
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
      </PersistGate>
      {/* </HelmetProvider>  */}
    </Provider>
  );
}
