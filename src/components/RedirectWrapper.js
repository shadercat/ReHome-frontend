import React from "react";
import {Redirect, Route} from 'react-router-dom';

function RedirectWrapper({children, ...rest}) {
    let {accessible, pathname} = rest;
    return (
        <Route {...rest}
               render={({location}) =>
                   accessible ? (children) :
                       (
                           <Redirect
                               to={{
                                   pathname: pathname,
                                   state: {from: location}
                               }}
                           />
                       )
               }
        />
    )
}

export default RedirectWrapper;