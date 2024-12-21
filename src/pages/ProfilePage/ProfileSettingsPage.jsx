// eslint-disable-next-line no-unused-vars
import React from 'react';
import "./ProfileSettingsPage.css"
import {Link} from "react-router-dom";

export default function ProfileSettingsPage() {

    return (
        <>
            <h1 className="settings-title">User Profile Settings</h1>

            <div className="settings-container">
                <form className="settings-form">
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input className="form-input" type="text" id="username" name="username"
                               placeholder="Enter new username"/>
                    </div>
                    <div className="form-group">
                        <button className="form-button" type="submit">Save Changes</button>
                    </div>
                </form>
            </div>

            <div className="settings-container">
                <form className="settings-form">
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input className="form-input" type="password" id="password" name="password"
                               placeholder="Enter new password"/>
                    </div>
                    <div className="form-group">
                        <button className="form-button" type="submit">Save Changes</button>
                    </div>
                </form>
            </div>

            <div className="settings-container">
                <div className="form-group">
                    <label className="form-label" htmlFor="language">Preferred Language</label>
                    <select className="form-select" id="language" name="language">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="theme">Theme</label>
                    <select className="form-select" id="theme" name="theme">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
            </div>
            <div className="settings-container">
                <div className="form-group">
                    <Link to="/main">На главную</Link>
                    <Link to="/logout">Выйти</Link>
                </div>
            </div>

        </>
    );
};

