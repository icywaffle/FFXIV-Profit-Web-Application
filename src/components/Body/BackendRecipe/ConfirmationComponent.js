import React from "react"

// Shows checkmark, given a submitted prop
function ConfirmationComponent() {
    return (
        <div className="uk-animation-toggle">
            <img
                className="uk-animation-stroke"
                src="/images/iconmonstr-check-mark-16.svg"
                uk-svg="stroke-animation: true" >
            </img>
        </div>

    )
}

export default ConfirmationComponent