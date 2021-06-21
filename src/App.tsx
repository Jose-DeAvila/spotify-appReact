import { useEffect } from 'react';
import './App.css';
import Init from './pages/init';
import Home from './pages/home';
import PlaylistItems from './pages/playlist';
import Favorites from './pages/favorites';
import { getAccessToken, getUrlParams } from './services/services';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {

  // UseEffect que comprueba tokenInfo
  useEffect(()=>{
    if(window.location.search){
      const code:string = getUrlParams();
      getAccessToken(code);
    }
    else{
      if(localStorage.getItem('tokenInfo') && window.location.pathname === '/'){
        const tokenInfoJSON:Dictionary<string> = JSON.parse(window.localStorage.getItem('tokenInfo') || "");
        if(tokenInfoJSON['access_token'] !== null){
          window.location.href = "/home";
        }
      }
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Init} />
        <Route path="/home" exact component={Home} />
        <Route path="/playlist/:id/:page" component={PlaylistItems} />
        <Route path="/playlist/:id" component={PlaylistItems} />
        <Route path="/favorites/:page" component={Favorites} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;