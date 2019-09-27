import React from "react"
import { shallow } from "enzyme"

import HomeSection from "./homesection"

describe("HomeSection", () => {
    it("should render with any given props", () => {
        // Shallow is a real unit test
        // There should be no children rendering
        // It only tests that single component
        const props = {
        }
        const component = shallow(<HomeSection {...props} />)

        expect(component).toMatchSnapshot()
    })


})