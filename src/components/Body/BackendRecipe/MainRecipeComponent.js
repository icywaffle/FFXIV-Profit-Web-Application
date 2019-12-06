import React from "react"

// Given the correct BaseInfo from the BaseInfo struct,
// Returns the main recipe's info
function MainRecipeComponent(props) {
    const baserecipe = props.baserecipe
    return (
        <div className="uk-section uk-padding-small">
            <div className="uk-container">
                <div className="uk-width-4-5 uk-float-right">
                    <h4>
                        <img
                            className="itemicon"
                            alt="icon"
                            src={"/icon/0" + baserecipe.IconID.toString().substr(0, 2) + "000/0" + baserecipe.IconID.toString() + ".png"}
                        />
                        <span> {baserecipe.Name}</span>
                    </h4>
                    <form
                        className="uk-form-width-small"
                        onSubmit={props.handleSubmit}
                    >
                        Market Price:
                            <input
                            className="uk-input"
                            type="text"
                            name="MarketItemPrice"
                            value={props.MarketItemPrice}
                            placeholder="Current Market Price"
                            onChange={props.handleItemPriceChange}
                        />
                    </form>
                    <ul className="uk-list">
                        <li>Material Costs: {props.MaterialCosts}</li>
                        <li>Bought All Materials Profit: {props.Profits}</li>
                        <li>Bought All Materials Profit Percentage: {props.ProfitPercentage}%</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default MainRecipeComponent