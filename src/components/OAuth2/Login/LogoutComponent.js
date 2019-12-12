import React, { useState, useEffect } from "react"

function LogoutComponent(props) {
    const logoutStyle = {
        background: "none",
        border: "none",
        margin: 0,
        padding: 0,
    }
    const [servers, setServers] = useState(null)
    const [currSelectedServer, setCurrSelectedServer] = useState(localStorage.getItem("server"))

    // Only fetch the servers once
    useEffect(() => {
        fetch("https://xivapi.com/servers/dc")
            .then((response) => response.json())
            .then((data) => {
                const xivapiServers = Object.entries(data).map((datacenter) => {
                    const array = []

                    for (var i = 0; i < datacenter[1].length; i++) {
                        array.push(<option value={datacenter[1][i]}>{datacenter[1][i]}</option>)
                    }

                    return (
                        <React.Fragment>
                            <optgroup label={datacenter[0]}>
                                {array}
                            </optgroup>
                        </React.Fragment>
                    )

                })

                setServers(xivapiServers)
            })
    }, [])

    function selectedServer(event) {
        const index = event.target.selectedIndex
        const server = event.target.options[index].value
        setCurrSelectedServer(server)
    }

    function saveServer() {
        localStorage.setItem("server", currSelectedServer)
        window.location.reload()
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
                        <form>
                            <div class="uk-margin">
                                Server:
                                <select
                                    class="uk-select"
                                    onChange={selectedServer}
                                    value={currSelectedServer}
                                >
                                    {servers}
                                </select>
                            </div>
                        </form>
                    </li>
                    <li>
                        <button
                            className="uk-button uk-button-default uk-text-success uk-text-capitalize"
                            style={logoutStyle}
                            onClick={saveServer}
                        >
                            {"Save Settings "}
                            <span data-uk-icon="icon: cloud-upload" className="uk-icon" />
                        </button>
                    </li>
                    <li className="uk-nav-divider"></li>
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
        </li >
    )
}

export default LogoutComponent