import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import {Menu} from './component/navbar/Menu'
import {Index} from './component/index/Index'
import {Signin} from './component/signin/Signin'
import {Signup} from './component/signup/Signup'
import {Activate} from './component/activateAccount/Acivate'
import {ProfilAdmin} from './component/Page/profileAdmin/ProfilAdmin'
import {ProfilSimple} from './component/Page/profile/ProfileSimple'
import {ProtecteAdmin} from './component/protectPage/ProtecteAdmin'
import {ProtectePage} from './component/protectPage/ProtectePage'
function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/Signin" exact component={Signin} />
          <Route path="/Signup" exact component={Signup} />
          <Route path="/auth/activate/:token" exact component={Activate} />
          <ProtecteAdmin path="/ProfilAdmin" exact component={ProfilAdmin} />
          <ProtectePage path="/ProfilSimple" exact component={ProfilSimple} />
        </Switch>  
      </Router>
    </div>
  );
}

export default App;
