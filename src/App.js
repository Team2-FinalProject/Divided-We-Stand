import { Provider } from "react-redux";
import store from "./store/index";
// kl butuh redux bisa lgsg dipake
import { Route, Switch } from "react-router-dom"
import Home from './pages/Home'
import Lobby from "./pages/Lobby"
import Room from "./pages/Room"
import Game from "./pages/Game"
import "./App.css"

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/lobby">
          <Lobby />
        </Route>
        <Route path="/room/:roomName">
          <Room />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Switch>
    </Provider>
  );
}

export default App;
