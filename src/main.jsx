import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { NotificationProvider } from "./Components/context/notificationContext.jsx";
import { Toaster } from "sonner";

import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoadingProvider } from "./generalParts/preloader/LoadingContext.jsx";
import { SocketProvider } from "./Components/context/socketContext.jsx";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(

  <StrictMode>
    <Toaster  richColors position="bottom-center"/>
    <LoadingProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <SocketProvider>
            {/* <NotificationProvider>  */}
            <App />
            {/* </NotificationProvider> */}
          </SocketProvider>
        </Provider>
      </GoogleOAuthProvider>
    </LoadingProvider>
  </StrictMode>
);
