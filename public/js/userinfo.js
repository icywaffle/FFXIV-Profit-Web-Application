function userlogin() {
    var discorduniqueid = $("#id").attr("value")
    var avatarhash = $("#avatar").attr("value")
    var path = "https://cdn.discordapp.com/avatars/" + discorduniqueid + "/" + avatarhash

    var discordname = $("#username").attr("value")
    var discordtag = "#" + $("#discriminator").attr("value")

    if (discorduniqueid != undefined) {
        const discorduser = (
            <div type="button">
                <div class="uk-button uk-text-capitalize">
                    <span >{discordname} {discordtag} </span>
                    {" "}
                    <span>
                        <a>
                            <img class="uk-icon-button uk-margin-small-right" src={path} />
                        </a>
                    </span>
                </div>
            </div>
        )
        ReactDOM.render(discorduser, document.getElementById("discordinfo"))
    } else {
        var discordiconpath = "/public/img/Discord-Logo-White.png"
        $("#usernavdropdown").remove()
        const discorduser = (
            <div type="button">
                <div class="uk-button uk-text-capitalize">
                    <form action="/Login">
                        <button class="uk-button uk-button-secondary" type="submit">
                            <img class="uk-margin-small-right" width="30px" height="30px" src={discordiconpath} /><span class="uk-margin-small-right">Login</span></button>
                    </form>
                </div>
            </div>

        )
        ReactDOM.render(discorduser, document.getElementById("discordinfo"))
    }


}