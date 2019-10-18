import React from 'react'
import MainRecipeComponent from './MainRecipeComponent'
import MaterialRecipeComponent from './MaterialRecipeComponent'
import Loading from "components/Body/Loading"
function BackendRecipe(props) {
    if (props === null || props.recipeData === null) {
        return <div>Database may be down!</div>
    }

    return (<div>
        <Loading loading={props.loading} />
        <MainRecipeComponent baseinfo={props.recipeData.MainRecipe} />
        <MaterialRecipeComponent baseinfo={props.recipeData.MainRecipe} matinfo={props.recipeData.InnerRecipes} />
    </div>)

}

export default BackendRecipe