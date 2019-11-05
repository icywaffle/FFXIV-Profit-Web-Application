import React from "react"
import Loading from "components/Body/Loading"
import ListOfSearchItems from "./ListOfSearchItems"
import ChangePageComponent from "./ChangePageComponent"


// Shows all the items given the correct API response, given incrementPage, decrementPage, and searchData
function APIResponse(props) {
    function prevPage() {
        if (props.searchData && props.searchData.Pagination.PagePrev !== null) {
            return <ChangePageComponent handleClick={props.decrementPage} detail="Prev Page" />
        } else {
            return null
        }
    }
    function nextPage() {
        if (props.searchData && props.searchData.Pagination.PageNext !== null) {
            return <ChangePageComponent handleClick={props.incrementPage} detail="Next Page" />
        } else {
            return null
        }
    }

    return (
        // We need to offset the top of the viewport according to the navbar.
        <div>

            <div>
                <Loading loading={props.loading} />
                <ListOfSearchItems {...props} />
            </div>
            <div>
                {prevPage()}
                {nextPage()}
                <Loading loading={props.loading} />
            </div>

        </div>
    )
}

export default APIResponse