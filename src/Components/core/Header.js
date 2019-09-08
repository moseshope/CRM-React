import React from "react";
import { Link, withRouter } from "react-router-dom";
import {signout} from "../../Utils/Requests/Auth";

const Header = ({history}) => {

  const handleSignOut = e => {
    e.preventDefault();
    if (signout()) {
      history.push("/");
    }
  }

    return (
      <header className="main-header">
        <Link to="/" className="logo">
          <span className="logo-mini">
            <b>DG</b>
          </span>
          <span className="logo-lg">
            <b>Dhan</b>-gaadi
          </span>
        </Link>
        <nav className="navbar navbar-static-top">
          <a
            href="false"
            className="sidebar-toggle"
            data-toggle="push-menu"
            role="button"
          >
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown messages-menu">
                <a
                  href="false"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <h4>Howdy! Admin</h4>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <ul className="menu">
                      <li onClick={handleSignOut}>
                        <a href="false">
                          <div className="pull-left">
                            <img
                              src="img/user2-160x160.jpg"
                              className="img-circle"
                              alt="UserImage"
                            />
                          </div>
                          <h4 style={{ top: "1rem" }}>Logout</h4>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
}

export default withRouter(Header);
