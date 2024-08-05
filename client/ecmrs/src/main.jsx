import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import store1 from './Redux/store1.js'
import App1 from './App1.jsx'
import {Provider as AlertProvider, positions, transitions} from "react-alert"
import AlertTemplate from 'react-alert-template-basic'
const options= {
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transitions:transitions.SCALE
}
ReactDOM.createRoot(document.getElementById('root')).render(
  
    
    <Provider store={store1}>
      <AlertProvider template={AlertTemplate}{...options}>
        <BrowserRouter>
          <App1 />
          <Toaster />
        </BrowserRouter>
      </AlertProvider>
    </Provider>
  
  
)
