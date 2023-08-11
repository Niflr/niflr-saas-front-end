import ReactDOM from 'react-dom/client';
//
import { ErrorBoundary } from "react-error-boundary";
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
// const store = configureStore(
//     {
//         reducer: reducers,
//         devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 

//     }
// )

function fallbackRender({ error, resetErrorBoundary }) {
  
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100vh' ,alignItems: 'center', justifyContent: 'center'}}>
        <h1>OOPS!</h1>
        <h4>Something broke. Please refresh and try again!</h4>
        {/* <pre style={{ color: "red" }}>{error.message}</pre> */}
      </div>
    );
  }
  
root.render(
    // <Provider store={store}>
    <ErrorBoundary fallbackRender={fallbackRender}>

    <App />
    </ErrorBoundary>
// </Provider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
