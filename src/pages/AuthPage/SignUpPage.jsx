import React from 'react';
import SignUpForm from "../../components/Form/SignUpForm.jsx";
import styles from "./form.module.css";

export default function SignUpPage() {
    return (
        <>
            <div className={styles["pageContainer"]}>
                <div className={styles["formContainer"]}>
                    <SignUpForm/>
                </div>
            </div>
        </>
    );
};

