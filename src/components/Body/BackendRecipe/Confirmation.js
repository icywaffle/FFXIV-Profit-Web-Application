import React from "react"
import ConfirmationComponent from "./ConfirmationComponent"
// Shows checkmark, given a submitted prop
function Confirmation(props) {
    if (props.submitted) {
        return <ConfirmationComponent />
    } else {
        return null
    }

}

export default Confirmation