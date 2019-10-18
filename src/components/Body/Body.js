import React from "react"
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom"
import Home from "./Home"
import Loading from "./Loading"
import XIVAPISearch from "./XIVAPISearch"

function HomePage() {
    return <Home />
}
function LoadingPage() {
    return <Loading loading={true} />
}

function XIVAPISearchPage() {
    return <XIVAPISearch />
}
function Body() {
    return (
        <Router>
            <Route path="/" exact component={HomePage} />
            <Route path="/user" render={LoadingPage} />
            <Route path="/search/" component={XIVAPISearchPage} />
        </Router>
    )
}

export default Body