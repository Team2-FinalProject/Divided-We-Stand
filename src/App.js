// import { Provider } from "react-redux"
// import store from './store/index' 
// kl butuh redux bisa lgsg dipake
import { Route, Switch } from "react-router-dom"
import Home from './pages/Home'
import Lobby from "./pages/Lobby"
import Room from "./pages/Room"
import Leaderboard from "./pages/Leadeboard" 
import "./App.css"

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/lobby">
        <Lobby/>
      </Route>
      <Route path="/room">
        <Room/>
      </Route>
      <Route path="/leaderboard">
        <Leaderboard/>
      </Route>
    </Switch>
  );
}

export default App;
