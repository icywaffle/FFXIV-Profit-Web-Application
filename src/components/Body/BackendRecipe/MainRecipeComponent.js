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
                        <p>Profit: {props.Profit}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default MainRecipeComponent