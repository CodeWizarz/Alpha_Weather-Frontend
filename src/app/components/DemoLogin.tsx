"use client";

import React, { useState } from "react";
import styles from "../demo/demo.module.css";

interface DemoLoginProps {
    onLogin: () => void;
}

export function DemoLogin({ onLogin }: DemoLoginProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.toLowerCase() === "yc" && password === "yc") {
            onLogin();
        } else {
            setError("Invalid credentials. Access is restricted.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h1 className={styles.loginTitle}>Alpha Weather Demo Access</h1>
                <p className={styles.loginSubtitle}>
                    This demo is intended for YC reviewers and early design partners.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Username</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Password</label>
                        <input
                            type="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles.loginButton}>
                        Enter Demo →
                    </button>

                    <div className={styles.errorMessage}>{error}</div>
                </form>
            </div>
        </div>
    );
}
