// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import "./ProfileSettingsPage.css"
import {Link} from "react-router-dom";

export default function ProfileSettingsPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const token = localStorage.getItem('accessToken');

        const userData = {
            password: password,
            token: token
        };

        try {
            const response = await fetch('http://45.93.5.140:21001/user/change-pass', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                alert('Password has been successfully changed');
                setPassword('')
                setConfirmPassword('')
            } else {
                const errorData = await response.json();
                alert(`Change password failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Sign up failed. Please try again later.');
        }
    };

    return (
        <>
            <h1 className="settings-title">User Profile Settings</h1>

            <div className="settings-container">
                <form className="settings-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input className="form-input" type="password" id="password" name="password"
                               placeholder="Enter new password" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <input className="form-input" type="password" id="password" name="password"
                               placeholder="Confirm password" value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <button className="form-button" type="submit">Save Changes</button>
                    </div>
                </form>
            </div>

            {/*<div className="settings-container">*/}
            {/*    <div className="form-group">*/}
            {/*        <label className="form-label" htmlFor="language">Preferred Language</label>*/}
            {/*        <select className="form-select" id="language" name="language">*/}
            {/*            <option value="en">English</option>*/}
            {/*            <option value="es">Spanish</option>*/}
            {/*            <option value="fr">French</option>*/}
            {/*            <option value="de">German</option>*/}
            {/*        </select>*/}
            {/*    </div>*/}
            {/*    <div className="form-group">*/}
            {/*        <label className="form-label" htmlFor="theme">Theme</label>*/}
            {/*        <select className="form-select" id="theme" name="theme">*/}
            {/*            <option value="light">Light</option>*/}
            {/*            <option value="dark">Dark</option>*/}
            {/*        </select>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="settings-container">
                <div className="form-group">
                    <Link to="/main">На главную</Link>
                    <Link to="/logout">Выйти</Link>
                </div>
            </div>

        </>
    );
};

