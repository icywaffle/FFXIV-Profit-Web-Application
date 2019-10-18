import React from "react"

function ChangePageComponent(props) {
    return (
        <button
            className="uk-button uk-button-default"
            type="button"
            onClick={props.handleClick}
        >
            {props.detail}
        </button>
    )


}

export default ChangePageComponent