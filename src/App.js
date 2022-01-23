import './App.css';
import { Switch, Route, useHistory } from "react-router-dom";
import Button from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { HomePage } from './HomePage';
import { AddUsers } from './AddUsers';
import { UserProfile } from './UserProfile';
import { EditUsers } from './EditUsers';


function App() {
  //Setting Users as a Hook to Update and change the data in need. 
  //Using History to get the required Router. 

 
  const history = useHistory();
  return (
    <div className="App">
       <div className="app-bar">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Button color="inherit" onClick={() => history.push("/")}>
              Home
            </Button>

            <Button
              sx={{ marginLeft: "auto" }}
              color="inherit"
              onClick={() => history.push("/addusers")}
            >
              Add-Users
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      <div className="route-items">
        <Switch>
          <Route exact path="/">
            <HomePage  />
          </Route>

          <Route path="/addusers">
            <AddUsers />
          </Route>

          <Route path="/edit/:id">
            <EditUsers/>
          </Route>

          <Route path="/:id">
            <UserProfile  />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;


