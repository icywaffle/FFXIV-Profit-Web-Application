package models

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
	"time"
)

type DiscordOAuth2 struct {
	ClientID     string `json:"client_id"`
	ClientSecret string `json:"client_secret"`
	GrantType    string `json:"grant_type"`
	Code         string `json:"code"`
	RedirectURI  string `json:"redirect_uri"`
	Scope        string `json:"scope"`
}

type Discordheader struct {
	ContentType string `json:"Content-Type"`
}

type AccessToken struct {
	AccessToken  string    `json:"access_token"`
	TokenType    string    `json:"token_type"`
	Expiration   time.Time `json:"expires_in"`
	RefreshToken string    `json:"refresh_token"`
}

// This allows us to also keep their avatar persisting on a page per session.
type DiscordUser struct {
	UniqueID   string `json:"id"`
	Username   string `json:"username"`
	NumTag     string `json:"discriminator"`
	AvatarHash string `json:"avatar"`
}

// Handles logging in and obtaining an Access Token that we can use to obtain data.
func (doauth DiscordOAuth2) DiscordAccessToken(code string) []byte {
	payload := url.Values{}
	payload.Set("client_id", doauth.ClientID)
	payload.Set("client_secret", doauth.ClientSecret)
	payload.Set("grant_type", "authorization_code")
	payload.Set("code", code)
	payload.Set("redirect_uri", doauth.RedirectURI)
	payload.Set("scope", doauth.Scope)

	client := &http.Client{}
	request, _ := http.NewRequest("POST", "https://discordapp.com/api/oauth2/token", strings.NewReader(payload.Encode()))
	request.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	response, _ := client.Do(request)
	result, _ := ioutil.ReadAll(response.Body)
	return result
}

// Uses this access token to be able to get the User Information.
func (doauth DiscordOAuth2) DiscordGetUserObject(accesstoken string) []byte {

	client := &http.Client{}
	request, _ := http.NewRequest("GET", "https://discordapp.com/api/users/@me", nil)
	bearer := fmt.Sprintf("Bearer %s", accesstoken)
	request.Header.Add("Authorization", bearer)

	response, _ := client.Do(request)
	result, _ := ioutil.ReadAll(response.Body)
	return result

}
