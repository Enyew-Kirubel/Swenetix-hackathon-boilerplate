// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import store from "./app/store";
// import App from "./App";
// import "./index.css";

// const rootElement = document.getElementById("root");

// if (!rootElement) {
//   throw new Error("Root element not found");
// }

// const root = ReactDOM.createRoot(rootElement);

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
// );



import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);