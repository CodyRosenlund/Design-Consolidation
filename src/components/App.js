import React, { Component, Fragment } from "react";
import {
  Route,
  HashRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";
import {
  CommercePlatform,
  CommercePlatformUrl,
  ScrollToTop
} from "@spscommerce/ui-react";
import HomePage from "../pages/HomePage";
import Nav from "../Nav";
import "./App.css";

class App extends Component {
  render() {
    return (
      <CommercePlatform
        frameStrategy="iframe"
        openToUrl={process.env.REACT_APP_OPEN_TO_URL}
      >
        {({ initialRoute }) => {
          return (
            <div className={`sps-page`}>
              <div className={`sps-body`}>
                <Router HashRouter>
                  <CommercePlatformUrl>
                    <ScrollToTop>
                      <Fragment>
                        <Nav />
                        <Switch>
                          <Route
                            exact
                            path="/"
                            render={() => <Redirect to={initialRoute} />}
                          />
                            <Route exact path="/home" component={HomePage} />
                        </Switch>
                      </Fragment>
                    </ScrollToTop>
                  </CommercePlatformUrl>
                </Router>
              </div>
            </div>
          );
        }}
      </CommercePlatform>
    );
  }
}

export default App;
