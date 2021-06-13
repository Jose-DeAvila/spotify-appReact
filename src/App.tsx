import { useEffect } from 'react';
import './App.css';
import Init from './templates/init';
import Home from './templates/home';
import PlaylistItems from './templates/playlist';
import Favorites from './templates/favorites';
import { getAccessToken, getUrlParams } from './services/services';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

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
        <Route path="/playlist/:id" component={PlaylistItems} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/*" />
      </Switch>
    </Router>
  );
}

export default App;