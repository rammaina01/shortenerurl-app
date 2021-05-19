import './App.css';
import Home from './component/ShortUrlComponent';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <switch>
        <Router >
          <Route path="/" exact component={Home} />
        </Router>
      </switch>
    </div>
  );
}

export default App;
