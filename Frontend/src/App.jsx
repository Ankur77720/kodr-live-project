import { useState } from 'react'
import AppRoutes from './Routes/Routes'


function App() {
  const [ count, setCount ] = useState(0)

  return (
    <AppRoutes />
  )
}

export default App
