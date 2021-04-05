import { FC } from 'react';
import Home from "./pages/Home/index";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'


const App: FC = () => (
  <Router>
    <div className="App">
      <Home />
    </div>
  </Router>
);

export default App;