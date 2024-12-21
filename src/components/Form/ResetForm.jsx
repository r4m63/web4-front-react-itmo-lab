import React, {useState} from 'react';
import styles from './SignInForm.module.css';
import {Link} from "react-router-dom";

export default function ResetForm() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            alert('Please enter email');
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address!');
            return;
        }

        const data = {
            email: email,
        };

        try {
            const response = await fetch('http://localhost:8080/passreset', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                console.log("No SUCH EMAIl")
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // 401

            alert("Mail sent successfully! Check mail!");

        } catch (error) {
            console.error('Error during pass-reset:', error);
            alert('No SUCH EMAIl');
        }
    };


    return (
        <>
            <form className={styles["form"]} onSubmit={handleSubmit}>

                <h1 style={{display: "flex", justifyContent: "center"}}>Password Reset</h1>

                <div className={styles["flexColumn"]}><label>Email</label></div>
                <div className={styles["inputForm"]}>
                    <input
                        type="email"
                        className={styles["input"]}
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button className={styles["buttonSubmit"]} type="submit">Reset</button>

                <Link to="/signin" style={{display: "flex"}}>Or sign in?</Link>
            </form>
        </>
    )
}