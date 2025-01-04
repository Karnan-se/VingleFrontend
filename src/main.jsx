import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import {Provider} from "react-redux"
import store from './store/store.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { LoadingProvider } from './generalParts/preloader/LoadingContext.jsx'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID


createRoot(document.getElementById('root')).render(



  <StrictMode>
    <LoadingProvider>  
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>

    <Provider store={store}>
    <App />
    </Provider>
    </GoogleOAuthProvider>
    </LoadingProvider>
  
  </StrictMode>,
)
