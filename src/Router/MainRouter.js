import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import SuperAdminRoute from "./SuperAdminRoute";
import Home from "../Components/pages/Home";
import Signin from "../Components/pages/Signin";
import MyBookings from "../Components/pages/MyBookings";
import AddNewBus from "../Components/pages/AddNewBus";
import EditBus from "../Components/pages/AddNewBus/EditBus";
import BusAvailable from "../Components/pages/BusAvailable";
import AllBusAvailable from "../Components/pages/BusAvailable/all";
import BusUnavailable from "../Components/pages/BusUnavailable";
import AllBusUnavailable from "../Components/pages/BusUnavailable/all";

const MainRouter = () => (
 <Switch>
   <Route path="/signin" exact component={Signin} />
   <PrivateRoute path="/" exact component={Home} />
   <PrivateRoute path="/my-bookings" exact component={MyBookings} />
   <PrivateRoute path="/add-bus" exact component={AddNewBus} />
   <PrivateRoute path="/edit-bus/:slug" exact component={EditBus} />
   <PrivateRoute path="/bus-available" exact component={BusAvailable} />
   <PrivateRoute path="/bus-unavailable" exact component={BusUnavailable} />
   <SuperAdminRoute path="/all-bus-available" exact component={AllBusAvailable} />
   <SuperAdminRoute path="/all-bus-unavailable" exact component={AllBusUnavailable} />
 </Switch>
);

export default MainRouter;