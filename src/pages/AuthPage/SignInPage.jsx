import React from 'react';
import SignInForm from "../../components/Form/SignInForm.jsx";
import styles from './form.module.css';

export default function SignInPage() {
    return (
        <>
            <div className={styles["pageContainer"]}>
                <div className={styles["formContainer"]}>
                    <SignInForm/>
                </div>
            </div>
        </>
    );
};

