import React from "react"
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom"
import Home from "./Home"
import Loading from "./Loading"
import XIVAPISearch from "./XIVAPISearch"
import Profits from "./Profits"

function HomePage() {
    return <Home />
}
function LoadingPage() {
    return <Loading loading={true} />
}

function XIVAPISearchPage() {
    return <XIVAPISearch />
}

function ProfitsPage() {
    return <Profits />
}
function Body() {
    return (
        <Router>
            <Route path="/" exact component={HomePage} />
            <Route path="/user" render={LoadingPage} />
            <Route path="/search/" component={XIVAPISearchPage} />
            <Route path="/Profits/" component={ProfitsPage} />
        </Router>
    )
}

export default Body