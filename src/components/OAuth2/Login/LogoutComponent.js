import React from "react"

function LogoutComponent(props) {
    const logoutStyle = {
        background: "none",
        border: "none",
        margin: 0,
        padding: 0,
    }
    function consoleTest() {
        console.log(localStorage.getItem("AccessToken"))
    }
    return (
        <li>
            <a>
                <img
                    src={"https://cdn.discordapp.com/avatars/" + props.userinfo.id + "/" + props.userinfo.avatar + ".gif"}
                    className="uk-icon-button uk-border-circle"
                    width="50px"
                />
            </a>
            <div
                uk-dropdown="pos: bottom-left; mode: click"
            >
                <ul className="uk-nav uk-navbar-dropdown-nav">
                    <li className="uk-text-muted">
                        Logged in as
                        </li>
                    <li>
                        <span className="uk-text-primary">{props.userinfo.username}</span>
                        <span className="uk-text-secondary">#{props.userinfo.discriminator}</span>
                    </li>
                    <li className="uk-nav-divider"></li>
                    <li>
                        <button
                            className="uk-button uk-button-default uk-text-danger uk-text-capitalize"
                            onClick={consoleTest}
                        >
                            {"Test Access Token"}
                        </button>
                    </li>
                    <li>
                        <button
                            className="uk-button uk-button-default uk-text-danger uk-text-capitalize"
                            onClick={props.Logout}
                            style={logoutStyle}
                        >
                            {"Log Out "}
                            <span data-uk-icon="icon: sign-out" className="uk-icon" />
                        </button>
                    </li>
                </ul>

            </div>
        </li>
    )
}

export default LogoutComponent