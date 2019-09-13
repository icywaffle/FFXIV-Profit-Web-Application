package controllers

import (
	"marketboard-frontend/app/models"

	"github.com/revel/revel"
)

type Result struct {
	*revel.Controller
}

// Adds discordmap to the ViewArgs
func (c Result) renderdiscorduser() {
	discorduser, _ := c.Session.Get("discordinfo")
	if discorduser != nil {
		discordmap, _ := discorduser.(map[string]interface{})
		c.ViewArgs["discordmap"] = discordmap
	} else {
		c.ViewArgs["discordmap"] = nil
	}
}

func (c Result) Index() revel.Result {
	// Renders the little button for Discord Logins.
	// There may be an efficient way to do this, like a global variable.
	// Have to dig into revel's revel.Controller to see.
	c.renderdiscorduser()
	return c.RenderTemplate("Result/Index.html")
}

// This is the real information struct of information we would need to be filled out.
type Information struct {
	Recipes *models.Recipes
	Prices  *models.SimplePrices
	Profits *models.Profits
}
type InnerInformation struct {
	Recipes map[int]*models.Recipes      // Contains the inner recipes for some key = Recipe.ID
	Prices  map[int]*models.SimplePrices // Contains the inner prices for some key =  Item ID
	Profits map[int]*models.Profits      // Contains the profits for the inner recipes for some key = Recipe.Id
}

func (c Result) Obtain() revel.Result {
	dummyInfo := Information{}
	dummyInner := InnerInformation{}
	c.ViewArgs["baseinfo"] = dummyInfo
	c.ViewArgs["innerinfo"] = dummyInner
	c.renderdiscorduser()
	return c.RenderTemplate("Result/Obtain.html")
}

func (c Result) Profit() revel.Result {
	// We would obtain from the profit database here.
	//and add it to the c.ViewArgs
	dummyProfit := []*models.Profits{}
	c.ViewArgs["profitpercentage"] = dummyProfit
	c.renderdiscorduser()
	return c.RenderTemplate("Result/Profit.html")
}

func (c Result) Search() revel.Result {
	// We would need to remember what you've searched for.
	recipename := c.Params.Form.Get("recipename")
	// Then render it.
	c.ViewArgs["recipename"] = recipename

	c.renderdiscorduser()
	return c.RenderTemplate("Result/Search.html")
}
