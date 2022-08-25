import React from 'react';

function Loading(Component) {
    return function wlc({Loading}) {
        if (Loading) {
            return (
                <div>
                    <p>loading.....</p>
                    <div id="preloader" />
                </div>
            )
        } else {
            return (
                <Component />
            )
        }
    }
}

export default Loading;