import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import UserRouter from './router/userRouter.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/*'  element={<UserRouter/>}/>

      
      </Routes>
    </Router>
    
     
    </>
  )
}

export default App
