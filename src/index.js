import App from './App';
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
      <App />
  </Router>
)
