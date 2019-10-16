import React from 'react'
import Auth from './OAuthComponents/Auth'
function OAuth2(props) {
    return (
        <Auth code={props.code} />
    )
}
export default OAuth2