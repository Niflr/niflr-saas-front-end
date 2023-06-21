import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector,Provider } from 'react-redux';
// import {  } from 'react-redux';
import thunk from 'redux-thunk';
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
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
export default function App() {
  // const auth = useSelector((state) => state.auth);
  // console.log("is authenticated",auth);
  return (
    <Provider store={store}>
     {/* <HelmetProvider> */}
            <BrowserRouter>
                <AuthProvider>
                <ThemeProvider>
                    {/* <ScrollToTop /> */}
                    {/* <StyledChart /> */}
                    { <Router /> }
                  </ThemeProvider>
                </AuthProvider>
            </BrowserRouter>
        {/* </HelmetProvider>  */}
    </Provider>
    
  );
}
