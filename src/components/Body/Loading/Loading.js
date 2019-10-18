import React, { useState, useEffect } from "react"
import LoadingComponent from "./LoadingComponent"

// Shows loading, if given a loading prop
function Loading(props) {
    const [loadingSpinner, setLoadingSpinner] = useState(null)

    // Checks for props.loading
    // If props.loading changes, then we call useEffect to show or remove the loading spinner
    useEffect(() => {
        if (props.loading) {
            setLoadingSpinner(<LoadingComponent />)
        } else {
            setLoadingSpinner(null)
        }
    }, [props.loading])

    return (
        <div>
            {loadingSpinner}
        </div>
    )
}

export default Loading