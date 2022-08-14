import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { pokemonsReducer } from "./reducers/pokemons";
import { logger } from './middlewares/';
import "./index.css";

const composedEnhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(logger),
)

const store = createStore(
  pokemonsReducer,
  composedEnhancers
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
