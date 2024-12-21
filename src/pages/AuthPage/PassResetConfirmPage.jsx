import React from 'react';
import styles from './form.module.css';
import ResetConfirmForm from "../../components/Form/ResetConfirmForm.jsx";

export default function PassResetConfirmPage() {
    return (
        <>
            <div className={styles["pageContainer"]}>
                <div className={styles["formContainer"]}>
                    <ResetConfirmForm/>
                </div>
            </div>
        </>
    );
};

