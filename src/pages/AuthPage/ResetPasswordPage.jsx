import React from 'react';
import styles from './form.module.css';
import ResetForm from "../../components/Form/ResetForm.jsx";

export default function ResetPasswordPage() {
    return (
        <>
            <div className={styles["pageContainer"]}>
                <div className={styles["formContainer"]}>
                    <ResetForm/>
                </div>
            </div>
        </>
    );
};

