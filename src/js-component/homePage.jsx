import React from "react";
import AuthDetails from "./Other-component/AuthDetails";

function HomePage() {
    
    return (
        <div style={{fontSize: '10px',textAlign: 'center'}}>
            <h1>Welcome to the Home Page</h1>
            <AuthDetails/>
        </div>
    );
}

export default HomePage;
