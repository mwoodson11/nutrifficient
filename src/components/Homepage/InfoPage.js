import React from 'react';

const InfoPage = (properties) => {
    return (
        <div>
            <div className="title-section">
            <h1>Hello {properties.username}!</h1>
            <p>
                Welcome to the Nutrifficient App. This app is designed to provide
                a framework for reliable nutrient tracking and feedback. To get the 
                most out of the application, make sure all your information is added 
                to your user profile.
            </p>
            </div>
            <div>
                <ul>
                    <li>
                        Food Log
                    </li>
                    <li>
                        Nutrient Tracker
                    </li>
                    <li>
                        Food Available
                    </li>
                    <li>
                        Suggestions
                    </li>
                    <li>
                        Deficiencies
                    </li>
                    <li>
                        Edit Profile
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default InfoPage;