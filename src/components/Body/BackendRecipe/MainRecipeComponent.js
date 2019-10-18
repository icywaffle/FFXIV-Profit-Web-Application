import React from "react"

// Given the correct BaseInfo from the BaseInfo struct,
// Returns the main recipe's info
function MainRecipeComponent(props) {
    const baseinfo = props.baseinfo
    return (
        <section>
            <div className="uk-section uk-animation-slide-left">
                <div className="uk-container">
                    <div className="uk-width-4-5 uk-float-right">
                        <h2>Analysis</h2>
                        <h4>
                            <img
                                className="itemicon"
                                alt="icon"
                                src={"/icon/0" + baseinfo.Recipes.IconID.toString().substr(0, 2) + "000/0" + baseinfo.Recipes.IconID.toString() + ".png"}
                            />
                            <span> {baseinfo.Recipes.Name}</span>
                        </h4>
                        <ul className="uk-list">
                            <li>On Market: {baseinfo.Prices.OnMarketboard.toString()}</li>
                            <li>Marketboard Price: <span className=" pricenumber">{baseinfo.Prices.LowestMarketPrice}</span>
                            </li>
                            <li>
                                Material Costs: <span className="pricenumber">{baseinfo.Profits.MaterialCosts}</span>
                            </li>
                            <li>
                                Profits: <span className="pricenumber">{baseinfo.Profits.Profits}</span>
                            </li>
                            <li>Profit Percentage: {baseinfo.Profits.ProfitPercentage}%</li>
                            <li className="datetime" value="{baseinfo.Profits.Added}"> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default MainRecipeComponent