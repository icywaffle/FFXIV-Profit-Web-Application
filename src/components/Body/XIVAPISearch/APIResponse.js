import React from "react"
import Loading from "components/Body/Loading"
import ListOfSearchItems from "./ListOfSearchItems"
import ChangePageComponent from "./ChangePageComponent"


// Shows all the items given the correct API response, given incrementPage, decrementPage, and searchData
function APIResponse(props) {
    return (
        // We need to offset the top of the viewport according to the navbar.
        <div>
            <Loading loading={props.loading} />
            <ListOfSearchItems {...props} />
            <div className="uk-container uk-padding">
                <div className="uk-grid uk-child-width-1-3@m uk-flex-middle uk-animation-slide-left-medium">
                    <div>
                        <ChangePageComponent handleClick={props.decrementPage} detail="Prev Page" />
                    </div>
                    <div>
                        <ChangePageComponent handleClick={props.incrementPage} detail="Next Page" />
                    </div>
                </div>

            </div>


        </div>
    )
}

export default APIResponse