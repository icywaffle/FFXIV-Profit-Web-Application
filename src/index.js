import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Search from './components/Search';
import * as serviceWorker from './serviceWorker'
import Home from "./components/Home"

function Index() {
    return <Home />
}

function ItemSearch() {
    return <Search />
}

class AppRouter extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <Router>
                <div>
                    <div uk-sticky="animation: uk-animation-slide-top; sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; cls-inactive: uk-navbar-transparent uk-light; top: 200">
                        <nav className="uk-navbar-container uk-background-secondary uk-navbar">
                            <div className="uk-navbar-left">
                                <ul className="uk-navbar-nav">
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/search/">Search</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="uk-navbar-right">
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
                                </ul>
                            </div>
                        </nav>
                    </div>

                    <div>
                        <Route path="/" exact component={Index} />
                        <Route path="/search/" component={ItemSearch} />
                    </div>

                </div>
            </Router>


        )
    }
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
