import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";
import Meta from "../components/Misc/Meta";
import store from "../store";
import AuthListener from "../components/Misc/AuthListener";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Meta />
      <AuthListener />
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  );
}

export default MyApp;
