// import { Provider } from "react-redux"
// import store from './store/index' 
// kl butuh redux bisa lgsg dipake
import { Route, Switch } from "react-router-dom"
import Home from './pages/Home'
import Lobby from "./pages/Lobby"

function App() {
  return (
    <Switch>
      <Route path="/">
        <Home/>
      </Route>
      <Route path="/lobby">
        <Lobby />
      </Route>
    </Switch>
  );
}

export default App;
