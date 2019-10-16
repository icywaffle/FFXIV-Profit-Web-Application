import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Search from './components/Search';
import * as serviceWorker from './serviceWorker'
import Home from "./components/Home"
import OAuth2 from "./components/OAuth2"

function Index() {
    return <Home />
}

function ItemSearch() {
    return <Search />
}

class AppRouter extends React.Component {
    loadingUser() {
        return (
            <div className="uk-container uk-container-expand">
                <div className="uk-position-center">
                    Logging you in...
                </div>
                <div className="uk-position-center" uk-spinner="ratio: 10">

                </div>
            </div>
        )
    }
    render() {
        return (
            <Router>
                <div>
                    <div
                        uk-sticky="animation: uk-animation-slide-top; sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; cls-inactive: uk-navbar-transparent; top: 200"
                    >
                        <nav className="uk-navbar-container uk-background-default uk-navbar uk-dark">

                            <div className="uk-navbar-left uk-container uk-container-expand">
                                <ul className="uk-navbar-nav">
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <a href="/search/">Search</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="uk-navbar-right uk-container uk-container-expand">
                                <ul className="uk-navbar-nav">
                                    <li>
                                        <a
                                            href="https://github.com/icywaffle/marketboard-frontend"
                                            uk-tooltip="title: Front-End; pos: top"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            uk-icon="icon: github">
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://github.com/icywaffle/marketboard-backend"
                                            uk-tooltip="title: Back-End; pos: top"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            uk-icon="icon: github-alt">
                                        </a>
                                    </li>
                                    <Route path="/*" render={querycode => <OAuth2 code={querycode} />} />
                                </ul>
                            </div>
                        </nav>
                    </div>

                    <Route path="/" exact component={Index} />
                    <Route path="/user" render={this.loadingUser} />
                    <Route path="/search/" component={ItemSearch} />



                </div>
            </Router >


        )
    }
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
