import { BackendRecipe } from "../BackendRecipe"
import React from "react"
import { shallow } from "react"
import toJson from "enzyme-to-json"

describe("BackendRecipe", () => {
    it("renders given specific props", () => {
        // Example Props from Seeing Horde Axe
        const props = {
            Name = "Seeing Horde Axe",
            MainRecipe = {
                ID = 33180,
                ItemResultTargetID = 24322,
                IngredientID =[
                    14146,
                    14155,
                    14149,
                    15653,
                    16733,
                    0,
                    0,
                    0,
                    14,
                    17
                ],

            }
        }


        const wrapper = shallow(<App {...props} />)

        expect(toJson(wrapper)).toMatchSnapshot()
    })
})