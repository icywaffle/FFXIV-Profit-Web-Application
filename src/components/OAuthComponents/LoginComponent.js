import React from "react"

function LoginComponent(props) {
    function Logout() {
        sessionStorage.removeItem("user")
        window.location.href = "https://" + window.location.hostname
    }
    const logoutStyle = {
        background: "none",
        border: "none",
        margin: 0,
        padding: 0,
    }
    if (props.userinfo) {
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
                                onClick={Logout}
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
    } else {
        return <div className="uk-padding-small">
            <a
                href={"https://discordapp.com/api/oauth2/authorize?client_id=598247290972667904&redirect_uri=https%3A%2F%2F" + window.location.hostname + "%2FUser&response_type=code&scope=identify"}
                className="uk-button uk-button-default"
            >
                Login
        </a>
        </div>
    }
}


export default LoginComponent