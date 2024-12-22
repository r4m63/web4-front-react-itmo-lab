// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import styles from './SignInForm.module.css';
import {useNavigate} from "react-router-dom";

export default function ResetConfirmForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const [isValidToken, setIsValidToken] = useState(null); // null: проверяется, true: валиден, false: не валиден

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            alert('All fields are required!');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        const data = {
            password,
            token
        };

        try {
            const response = await fetch('http://localhost:8080/passreset/confirm', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                console.log("Password changed successfully!");
                alert("Password changed successfully!")
                navigate("/signin")
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Sign up failed. Please try again later.');
        }

    };

    useEffect(() => {
        const validateToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            if (!token) {
                navigate('/error');
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/passreset/verify', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({token}),
                });
                if (response.ok) {
                    console.log("Token verify OK!");
                    setIsValidToken(true);
                } else {
                    setIsValidToken(false);
                }
            } catch (error) {
                setIsValidToken(false);
                console.error('Error:', error);
                alert('Sign up failed. Please try again later.');
            }
        };

        validateToken();
    }, [navigate]);

    if (!isValidToken) {
        return <p>Not correct Token</p>;
    }

    return (
        <>
            <form className={styles["form"]} onSubmit={handleSubmit}>

                <h1 style={{display: "flex", justifyContent: "center"}}>Password Reset Confirm</h1>

                <div className={styles["flexColumn"]}><label>Password</label></div>
                <div className={styles["inputForm"]}>
                    <input
                        type="password"
                        className={styles["input"]}
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className={styles["flexColumn"]}><label>Confirm Password</label></div>
                <div className={styles["inputForm"]}>
                    <input
                        type="password"
                        className={styles["input"]}
                        placeholder="Confirm your Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button className={styles["buttonSubmit"]} type="submit">Reset</button>

            </form>
        </>
    )
}