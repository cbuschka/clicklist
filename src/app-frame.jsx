import './app-frame.css'
import React from 'react';

export const AppFrame = ({children}) => {
    return <div className="AppFrame">
        {React.Children.toArray(children).filter((child, i) => {
            const type = child && child.props && child.props.__TYPE ? child.props.__TYPE : null;
            return type === 'AppFrameBody' || type === 'AppFrameTop' || type === 'AppFrameBottom';
        })}
    </div>;
}

AppFrame.Body = ({children}) => {
    return <div className="AppName__Body">{children}</div>;
}

AppFrame.Body.defaultProps = {
    __TYPE: 'AppFrameBody'
};

AppFrame.Top = ({children}) => {
    return <div className="AppName__Top">{children}</div>;
}
AppFrame.Top.defaultProps = {
    __TYPE: 'AppFrameTop'
};


AppFrame.Bottom = ({children}) => {
    return <div className="AppName__Bottom">{children}</div>;
}
AppFrame.Bottom.defaultProps = {
    __TYPE: 'AppFrameBottom'
};