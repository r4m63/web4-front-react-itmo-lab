import React, {useState} from 'react';
import styles from './SignInForm.module.css';
import {Link} from "react-router-dom";

export default function SignUpForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('')
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)

        if (!username || !email || !password || !confirmPassword) {
            setError('All fields are required!');
            alert('All fields are required!');
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address!');
            alert('Please enter a valid email address!');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            alert('Passwords do not match!');
            return;
        }

        setError('');

        const userData = {
            username,
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(userData),
            });

            console.log('Success');
            //setShowModal(true);
            alert('Mail send');
        } catch (error) {
            console.error('Error:', error);
            alert('Sign up failed');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <form className={styles["form"]} onSubmit={handleSubmit}>

                <h1 style={{display: "flex", justifyContent: "center"}}>Sign Up</h1>

                <div className={styles["flexColumn"]}><label>Username</label></div>
                <div className={styles["inputForm"]}>
                    <input
                        type="text"
                        className={styles["input"]}
                        placeholder="Enter your Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

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

                <button className={styles["buttonSubmit"]} type="submit">Sign Up</button>

                <Link to="/signin" style={{display: "flex"}}>Or sign in?</Link>
            </form>


            {/* Модальное окно */}
            {showModal && (
                <div className={styles["modal"]}>
                    <div className={styles["modalContent"]}>
                        <h2>Sign up successful!</h2>
                        <button className={styles["modalCloseButton"]} onClick={handleModalClose}>
                            OK
                        </button>
                    </div>
                </div>
            )}

        </>
    )
}