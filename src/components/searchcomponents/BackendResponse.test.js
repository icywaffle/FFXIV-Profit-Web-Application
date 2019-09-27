import React from "react"
import { shallow, mount } from "enzyme"

// Basic Mock Recipe Data that would be returned from the database
const mockRecipeData = {
    "MainRecipe": {
        "Recipes": {
            "Name": "Seeing Horde Axe",
            "IconID": 31518,
            "ItemResultTargetID": 24322,
            "ID": 33180,
            "CraftTypeTargetID": 1,
            "RecipeLevelTable": {
                "ClassJobLevel": 60,
                "Stars": 3
            },
            "AmountResult": 1,
            "IngredientID": [
                14146,
            ],
            "IngredientIconID": [
                20824,
            ],
            "IngredientNames": [
                "High Mythrite Ingot",
            ],
            "IngredientAmounts": [
                3,
            ],
            "IngredientRecipes": [
                [
                    31482,
                    31483
                ],
            ],
            "Added": 1563260884
        },
        "Prices": {
            "ItemID": 24322,
            "HistoryPrice": 0,
            "LowestMarketPrice": 0,
            "OnMarketboard": false,
            "Added": 1569623257
        },
        "Profits": {
            "RecipeID": 33180,
            "ItemID": 24322,
            "MaterialCosts": 1418852,
            "Profits": 471147,
            "ProfitPercentage": 33.21,
            "Added": 1563265228,
            "Name": "Seeing Horde Axe",
            "IconID": 31518,
            "CraftTypeTargetID": 1,
            "RecipeLevelTable": {
                "ClassJobLevel": 60,
                "Stars": 3
            }
        }
    },
    InnerRecipes: {
        Recipes: {
            "31482": {
                Name: "High Mythrite Ingot",
                IconID: 20824,
                ItemResultTargetID: 14146,
            }
        },
        Prices: {
            "14146": {
                ItemID: 14146,
                HistoryPrice: 0,
                LowestMarketPrice: 0,
                OnMarketboard: false,
                Added: 1569623257
            }
        },
        Profits: {
            "31482": {
                RecipeID: 31482,
                ItemID: 14146,
                MaterialCosts: 10315,
                Profits: 9685,
                ProfitPercentage: 93.89,
                Added: 1563265224,
                Name: "High Mythrite Ingot",
                IconID: 20824,
                CraftTypeTargetID: 1,
                RecipeLevelTable: {
                    ClassJobLevel: 60,
                    Stars: 3
                }
            },
        }
    }
}

import BackendResponse from "./BackendResponse"
describe("BackendResponse", () => {
    it("should render when given specific database information", () => {

        const component = shallow(<BackendResponse recipeData={mockRecipeData} />)

        expect(component).toMatchSnapshot()
    })
    it("should show Database Down! if no data was given", () => {
        const component = mount(<BackendResponse recipeData={""} />)
        expect(component.text()).toBe("Database may be down!")
    })
})