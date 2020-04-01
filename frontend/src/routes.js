import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Logon from './pages/login'
import Register from './pages/register'
import Profile from './pages/profile';
import NewIncident from './pages/newIncident';
import ProfileAdmin from './pages/profileAdmin';
import LogonAdmin from './pages/logonAdmin';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/incidents/new" component={NewIncident}></Route>
                <Route path="/logon/admin" component={LogonAdmin}></Route>
                <Route path="/administrator/profile" component={ProfileAdmin}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;