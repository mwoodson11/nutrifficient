import React from 'react';

const Popup = ({handleClose, show, children}) => {
    const showHideClassName = show ? "popup d-block" : "popup d-none";

    return(
        <div className = {showHideClassName}>
            <div className = "popup-container">
                {children}
            </div>
        </div>
    );
};

export default Popup;