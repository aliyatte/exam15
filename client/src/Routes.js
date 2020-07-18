import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
// import Products from "./containers/Products/Products";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
// import NewProduct from "./containers/NewProduct/NewProduct";
// import UserProfile from "./containers/UserProfile/UserProfile";

const ProtectedRoute = ({isAllowed, ...props}) => (
  isAllowed ? <Route {...props}/> : <Redirect to="/login"/>
);

const Routes = () => {
  const user = useSelector(state => state.users.user);

  return (
    <Switch>
      {/*<Route path="/" exact component={Products} />*/}
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      {/*<ProtectedRoute isAllowed={user} path="/products/new" exact component={NewProduct} />*/}
    </Switch>
  );
};

export default Routes;