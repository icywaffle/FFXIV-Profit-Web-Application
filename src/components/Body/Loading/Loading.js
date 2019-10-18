import React from "react"
import LoadingComponent from "./LoadingComponent"

// Shows loading, if given a loading prop
function Loading(props) {
    console.log(props.loading)
    if (props.loading) {
        return <LoadingComponent />
    } else {
        return null
    }

}

export default Loading