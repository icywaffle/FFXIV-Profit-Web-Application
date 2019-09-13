package controllers

import (
	"encoding/json"
	"marketboardproject/app/models"
	"marketboardproject/keys"

	"github.com/revel/revel"
)

var DiscordUser models.DiscordUser

type Oauth struct {
	*revel.Controller
}

// Will send to Authorization if there is no cookies.
func (c Oauth) Login() revel.Result {
	// Checks if there is a session for this user.
	info, _ := c.Session.Get("discordinfo")
	if info != nil {
		return c.Redirect("/UserInfo")
	} else {
		// Otherwise Authorize.
		return c.Redirect(keys.DiscordURL)
	}
}

// Once authorized, discord sends a code in the parameters.
// We add them to the session and put a token to their cookie.
func (c Oauth) User() revel.Result {
	code := c.Params.Get("code")
	// Protect user in case they cancel.
	if len(code) == 0 {
		return c.Redirect("/")
	} else {
		accesstokenbytevalue := keys.Oauthparams.DiscordAccessToken(code)
		var access models.AccessToken
		json.Unmarshal(accesstokenbytevalue, &access)
		userbytevalue := keys.Oauthparams.DiscordGetUserObject(access.AccessToken)
		json.Unmarshal(userbytevalue, &DiscordUser)

		// Assign to the session, the discorduser object.
		c.Session["discordinfo"] = DiscordUser

		return c.Redirect("/")
	}

}

// Post-Authentication
func (c Oauth) UserInfo() revel.Result {

	c.renderdiscorduser()

	return c.RenderTemplate("Oauth/UserInfo.html")
}

// Adds discordmap to the ViewArgs
func (c Oauth) renderdiscorduser() {
	discorduser, _ := c.Session.Get("discordinfo")
	if discorduser != nil {
		discordmap, _ := discorduser.(map[string]interface{})
		c.ViewArgs["discordmap"] = discordmap
	} else {
		c.ViewArgs["discordmap"] = nil
	}
}

func (c Oauth) LogOut() revel.Result {
	// We just remove the session here.
	c.Session.Del("discordinfo")
	return c.Redirect("/")
}
