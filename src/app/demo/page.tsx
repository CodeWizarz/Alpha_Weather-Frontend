"use client";

import React, { useState, useEffect } from "react";
import { DemoLogin } from "../components/DemoLogin";
import { DemoDashboard } from "../components/DemoDashboard";
import styles from "./demo.module.css";

export default function DemoPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check auth state on mount
    useEffect(() => {
        const auth = localStorage.getItem("alpha_demo_auth");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const handleLogin = () => {
        localStorage.setItem("alpha_demo_auth", "true");
        setIsAuthenticated(true);
    };

    if (loading) {
        return <div className={styles.container}></div>; // Prevent flash
    }

    if (!isAuthenticated) {
        return (
            <div className={styles.container}>
                <DemoLogin onLogin={handleLogin} />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <DemoDashboard />
        </div>
    );
}
