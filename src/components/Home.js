import React from 'react'
import HomeSection from './homecomponents/homesection'

function TechStack(props) {

    return (
        <div className={props.Style}>
            <img src={props.ImageLink} width="200px" height="200px"></img>
            <h3 className="uk-margin-small-bottom uk-margin-top"> {props.AppName} </h3>
            <p>{props.Details}</p>
        </div>

    )

}

class Home extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <HomeSection
                    SectionStyle={"uk-section uk-background-secondary uk-section-large uk-light"}
                    Style={"uk-grid uk-child-width-1-2@l uk-flex-middle uk-animation-slide-left-medium"}
                    MiniTitle={<h6 className="uk-text-primary uk-margin-small-bottom">Made for FFXIV</h6>}
                    Title={<h2 className="uk-margin-remove-top uk-h1">Marketboard Project</h2>}
                    Subtitle={<div>
                        <p className="subtitle-text">Designed to calculate whether an item you craft nets you profit</p>
                        <a
                            href="/search"
                            title="Search Now"
                            className="uk-button uk-button-default uk-scrollspy-inview uk-animation-fade"
                            data-uk-scrollspy-class="uk-animation-fade"
                        >
                            Search Now
                            </a>
                    </div>
                    }
                    ImageLink="/images/undraw_wallet_aym5.svg"
                />
                <HomeSection
                    SectionStyle={"uk-section uk-background-default uk-section-large"}
                    Style={"uk-grid uk-flex-middle uk-animation-slide-left-medium"}
                    MiniTitle={<h6 className="uk-text-primary uk-margin-small-bottom">Tech Stack</h6>}
                    Title={<h2 className="uk-margin-remove-top uk-h1">Built With</h2>}
                    Subtitle={
                        <div
                            className="uk-grid uk-grid-large uk-margin-large-top uk-child-width-1-3@m"
                            uk-scrollspy="cls:uk-animation-fade"
                        >
                            <TechStack
                                Style="uk-text-center uk-first-column uk-scrollspy-inview uk-animation-fade"
                                ImageLink="/images/react.svg"
                                AppName={
                                    <a
                                        href="https://reactjs.org/"
                                        title="React"
                                        className="uk-button uk-button-primary uk-text-capitalize uk-scrollspy-inview uk-animation-fade"
                                        data-uk-scrollspy-class="uk-animation-fade"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        React
                                    </a>}
                                Details="Allows easy reuse of components and allows the web application to be dynamic with Javascript"
                            />
                            <TechStack
                                Style="uk-text-center uk-scrollspy-inview uk-animation-fade"
                                ImageLink="/images/gopher.svg"
                                AppName={
                                    <a
                                        href="https://golang.org/"
                                        title="Golang"
                                        className="uk-button uk-button-primary uk-text-capitalize uk-scrollspy-inview uk-animation-fade"
                                        data-uk-scrollspy-class="uk-animation-fade"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Go
                                    </a>}
                                Details="Simple and fast language with built-in concurrency which is great for backend development"
                            />
                            <TechStack
                                Style="uk-text-center uk-scrollspy-inview uk-animation-fade"
                                ImageLink="/images/mongodb.svg"
                                AppName={
                                    <a
                                        href="https://www.mongodb.com/"
                                        title="MongoDB"
                                        className="uk-button uk-button-primary uk-text-capitalize uk-scrollspy-inview uk-animation-fade"
                                        data-uk-scrollspy-class="uk-animation-fade"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        MongoDB
                                    </a>}
                                Details="A No-SQL database that currently stores all item recipe data and calculations into documents"
                            />
                            <TechStack
                                Style="uk-text-center uk-first-column uk-scrollspy-inview uk-animation-fade"
                                ImageLink="/images/nginx.svg"
                                AppName={
                                    <a
                                        href="https://www.nginx.com/"
                                        title="NGINX"
                                        className="uk-button uk-button-primary uk-text-capitalize uk-scrollspy-inview uk-animation-fade"
                                        data-uk-scrollspy-class="uk-animation-fade"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        NGINX
                                    </a>}
                                Details="A web server application, which is currently being used as an API gateway and for the main web service"
                            />
                            <TechStack
                                Style="uk-text-center uk-scrollspy-inview uk-animation-fade"
                                ImageLink="/images/RevelWhiteLines.png"
                                AppName={
                                    <a
                                        href="https://revel.github.io/"
                                        title="Revel"
                                        className="uk-button uk-button-primary uk-text-capitalize uk-scrollspy-inview uk-animation-fade"
                                        data-uk-scrollspy-class="uk-animation-fade"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Revel
                                    </a>}
                                Details="A very modular Golang full-stack web framework, which is currently used as the backend API server"
                            />
                            <TechStack
                                Style="uk-text-center uk-scrollspy-inview uk-animation-fade"
                                ImageLink="/images/docker.svg"
                                AppName={
                                    <a
                                        href="https://www.docker.com"
                                        title="Docker"
                                        className="uk-button uk-button-primary uk-text-capitalize uk-scrollspy-inview uk-animation-fade"
                                        data-uk-scrollspy-class="uk-animation-fade"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Docker
                                    </a>}
                                Details="A containerization application that allows the whole web application to be split into different microservices"
                            />
                            <TechStack
                                Style="uk-text-center uk-scrollspy-inview uk-animation-fade"
                                ImageLink="/images/uikit.svg"
                                AppName={
                                    <a
                                        href="https://getuikit.com/"
                                        title="UIKit"
                                        className="uk-button uk-button-primary uk-text-capitalize uk-scrollspy-inview uk-animation-fade"
                                        data-uk-scrollspy-class="uk-animation-fade"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        UIKit
                                    </a>}
                                Details="A minimilistic front-end styling web framework, driving most of the styling for the web application"
                            />
                            <TechStack
                                Style="uk-text-center uk-scrollspy-inview uk-animation-fade"
                                ImageLink="/images/xivapi.png"
                                AppName={
                                    <a
                                        href="https://xivapi.com/"
                                        title="XIVAPI"
                                        className="uk-button uk-button-primary uk-text-capitalize uk-scrollspy-inview uk-animation-fade"
                                        data-uk-scrollspy-class="uk-animation-fade"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        XIVAPI
                                    </a>}
                                Details="A RESTful API that has a huge amount of data collected from Final Fantasy XIV"
                            />
                        </div>
                    }
                />
                <HomeSection
                    SectionStyle={"uk-section uk-background-secondary"}
                    Style={"uk-container uk-text-center"}
                    MiniTitle={<h6 className="uk-text-primary">Github</h6>}
                    Subtitle={
                        <div className="uk-light">
                            <h2>Full-Stack Code</h2>
                            <div
                                className="uk-grid uk-grid-large uk-margin-large-top uk-child-width-1-2@m"
                                uk-scrollspy="cls:uk-animation-fade"
                            >
                                <TechStack
                                    Style="uk-text-center uk-first-column uk-scrollspy-inview uk-animation-fade"
                                    ImageLink="/images/github-octocat.svg"
                                    AppName={
                                        <a
                                            href="https://github.com/icywaffle/marketboard-frontend"
                                            title="Frontend"
                                            className="uk-button uk-button-primary uk-text-capitalize uk-scrollspy-inview uk-animation-fade"
                                            data-uk-scrollspy-class="uk-animation-fade"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Front-End
                                    </a>}
                                    Details="Front-end dockerized code, suited up with an NGINX config file to be built into a Docker Image"
                                />
                                <TechStack
                                    Style="uk-text-center uk-first-column uk-scrollspy-inview uk-animation-fade"
                                    ImageLink="/images/github-icon.svg"
                                    AppName={
                                        <a
                                            href="https://github.com/icywaffle/marketboard-backend"
                                            title="Frontend"
                                            className="uk-button uk-button-primary uk-text-capitalize uk-scrollspy-inview uk-animation-fade"
                                            data-uk-scrollspy-class="uk-animation-fade"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Back-End
                                    </a>}
                                    Details="Back-end dockerized code, using the Revel framework, ready to be built into a Docker Image"
                                />
                            </div>
                        </div>
                    }
                />
            </div>

        )
    }
}
export default Home