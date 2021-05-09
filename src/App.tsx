import React, { FC } from 'react';
import Home from "./pages/Home/index";
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom'
import Global from './Global';
import LoginPage from './pages/Login';
import { router, stu_router } from './router';
import StudentHome from './pages/Student.Home/index.student';


const App: FC = () => {
  Global.initApp();
  return (
    <Router>
      <Switch>
        <Route path={router.login}>
          <LoginPage />
        </Route>
        <Route path={router.teacher}>
          <Home />
        </Route>
        <Route path={stu_router.stu}>
          <StudentHome />
        </Route>
        <GoHome />
      </Switch>
    </Router>
  );
};

const GoHome = () => {
  const history = useHistory()
  const myself = Global.getMyself();
  if (myself == null) {
    history.push(router.login);
    return null
  }
  const userType = myself.type
  return (
    <Route exact path={router.home}>
      {userType === 0 ? <Redirect to={router.teacher} /> : <Redirect to={stu_router.stu} />}
    </Route>
  )
}

export default App;