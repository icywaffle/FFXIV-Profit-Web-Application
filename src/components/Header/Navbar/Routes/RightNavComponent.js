import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import OAuth2 from "../../../OAuth2"

function RightNavComponent() {
    return (
        <Router>
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
                    <Route path="/*" render={(querycode) => <OAuth2 code={querycode} />} />
                </ul>
            </div>
        </Router>
    )
}

export default RightNavComponent