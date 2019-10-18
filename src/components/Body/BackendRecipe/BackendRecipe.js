import React from 'react'
import MainRecipeComponent from './MainRecipeComponent'
import MaterialRecipeComponent from './MaterialRecipeComponent'
import Loading from "components/Body/Loading"
function BackendRecipe(props) {
    if (props === null) {
        return null
    }

    if (props.recipeData !== null) {
        return (<div>
            <Loading loading={props.loading} />
            <MainRecipeComponent baseinfo={props.recipeData.MainRecipe} />
            <MaterialRecipeComponent baseinfo={props.recipeData.MainRecipe} matinfo={props.recipeData.InnerRecipes} />
        </div>)
    }

    return null


}

export default BackendRecipe