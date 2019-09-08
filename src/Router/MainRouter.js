import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../Components/pages/Home";
import Signin from "../Components/pages/Signin";
import MyBookings from "../Components/pages/MyBookings";
import BusAvailable from "../Components/pages/BusAvailable";
import BusUnavailable from "../Components/pages/BusUnavailable";

const MainRouter = () => (
 <Switch>
   <Route path="/signin" exact component={Signin} />
   <PrivateRoute path="/" exact component={Home} />
   <PrivateRoute path="/my-bookings" exact component={MyBookings} />
   <PrivateRoute path="/bus-available" exact component={BusAvailable} />
   <PrivateRoute path="/bus-unavailable" exact component={BusUnavailable} />
 </Switch>
);

export default MainRouter;