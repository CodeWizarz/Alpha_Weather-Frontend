"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "../demo/demo.module.css";
import { DemoSurface, Regime } from "./DemoSurface";

export function DemoDashboard() {
    const [regime, setRegime] = useState<Regime>("efficient");
    // "Efficient" is the starting state (Normal Market)

    const [showTransition, setShowTransition] = useState(false);
    const [orbTextIndex, setOrbTextIndex] = useState(0);

    // Automation for Orb Text
    useEffect(() => {
        const interval = setInterval(() => {
            setOrbTextIndex((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleScenarioChange = (newRegime: Regime) => {
        if (newRegime !== regime) {
            setRegime(newRegime);
            setShowTransition(true);
            setTimeout(() => setShowTransition(false), 1500);
        }
    };

    const getAnswer = () => {
        switch (regime) {
            case "efficient": return { text: "NO", color: "#666" }; // Normal market = No structural alpha
            case "emerging": return { text: "CAUTION", color: "#3b82f6" };
            case "mechanical": return { text: "YES", color: "#8b5cf6" };
        }
    };

    const getOrbText = () => {
        const index = orbTextIndex;
        if (regime === "efficient") {
            return ["Predictability Low", "Alpha Decay Fast", "Noise Dominant"][index];
        } else if (regime === "emerging") {
            return ["Structure Emerging", "Flows Correlating", "Window Opening"][index];
        } else {
            return ["Structure Dominant", "Predictability High", "Feedback Loops Active"][index];
        }
    };

    const getImplications = () => {
        if (regime === "efficient") {
            return [
                "Prices follow random walk",
                "News drives volatility",
                "No persistent structural advantage"
            ];
        } else if (regime === "emerging") {
            return [
                "Liquidity pockets forming",
                "Mean reversion windows opening",
                "Correlations tightening"
            ];
        } else {
            return [
                "Short-horizon strategies behave mechanically",
                "Hedging flows dominate price formation",
                "Standing down reduces risk of decay"
            ];
        }
    };

    const getActiveColor = () => {
        switch (regime) {
            case "efficient": return "#4caf50"; // Green for "Efficient/Safe" (or maybe Grey?) User said "Normal Market (Efficient)"
            // Actually, usually "Efficient" means "No edge". Let's use a neutralized color or Green if it implies "Market is healthy".
            // Implementation Plan says: efficient -> grey/green, emerging -> blue, mechanical -> purple.
            // Let's stick to the color scheme in CSS.
            case "emerging": return "#3b82f6";
            case "mechanical": return "#8b5cf6";
            default: return "#666";
        }
    };

    const activeColor = getActiveColor();

    return (
        <div className={styles.dashboard} style={{
            "--active-color": activeColor,
            background: regime === "efficient" ? "#050505" :
                regime === "emerging" ? "#050810" : "#0a0510",
            transition: "background 1s ease"
        } as React.CSSProperties}>
            <header className={styles.topBar}>
                <div className={styles.logo}>Alpha Weather Monitor</div>
                <div className={styles.statusIndicators}>
                    <span>SPY • US Equities</span>
                    <span className={styles.demoBadge}>DEMO MODE</span>
                </div>
            </header>

            <main className={styles.mainContent}>
                {/* Left Panel: Question & Implications */}
                <div className={styles.panel} style={{ borderRight: '1px solid #222' }}>
                    <div className={styles.answerBlock}>
                        <label className={styles.questionText}>Question: Is this market worth deploying strategies into?</label>
                        <div className={styles.systemAnswer} style={{
                            borderColor: getAnswer().color,
                            color: getAnswer().text === "NO" ? "#888" : getAnswer().color,
                            boxShadow: getAnswer().text !== "NO" ? `0 0 20px ${getAnswer().color}40` : "none"
                        }}>
                            System Answer: {getAnswer().text}
                        </div>
                    </div>

                    <div>
                        <label className={styles.sectionLabel}>What this means</label>
                        <ul className={styles.implicationsList}>
                            {getImplications().map((imp, i) => (
                                <li key={i} className={styles.implicationItem} style={{ animationDelay: `${i * 100}ms` }}>
                                    {imp}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Center: Visual Surface */}
                <div className={styles.visualSurface}>
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
                        <DemoSurface regime={regime} mousePosition={{ x: 0, y: 0 }} />
                        {/* Note: Mouse pos is handled internally primarily or we can pass it if we want generic tracking */}
                    </div>

                    {/* Interactive Orb */}
                    <div style={{
                        zIndex: 5,
                        width: '280px',
                        height: '280px',
                        borderRadius: '50%',
                        border: `1px solid ${activeColor}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 80px ${activeColor}20`,
                        background: `radial-gradient(circle, ${activeColor}10 0%, transparent 70%)`,
                        transition: "all 0.5s ease"
                    }}>
                        <div className={styles.orbText} style={{
                            textAlign: 'center',
                            color: activeColor,
                            fontSize: '0.9rem',
                            letterSpacing: '0.15em',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            animation: "fadeIn 0.5s ease"
                        }}>
                            {getOrbText()}
                        </div>
                    </div>

                    {/* Transition Overlay */}
                    <div className={`${styles.transitionOverlay} ${showTransition ? styles.visible : ""}`}>
                        Regime Shift Detected
                    </div>

                    {/* Demo Disclaimer */}
                    <div className={styles.demoDisclaimer}>
                        Alpha Weather Demo • Not Financial Advice
                    </div>
                </div>

                {/* Right Panel: Guided Scenarios */}
                <div className={`${styles.panel} ${styles.rightPanel}`}>
                    <label className={styles.sectionLabel}>Explore Market Scenarios</label>

                    <div className={styles.scenarioList} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div
                            className={`${styles.scenarioBtn} ${regime === "efficient" ? styles.active : ""}`}
                            onClick={() => handleScenarioChange("efficient")}
                            style={{ "--active-color": "#4caf50" } as React.CSSProperties}
                        >
                            <span className={styles.scenarioTitle}>Normal Market</span>
                            <span className={styles.scenarioDesc}>Efficient pricing. Random walk behavior.</span>
                        </div>

                        <div
                            className={`${styles.scenarioBtn} ${regime === "emerging" ? styles.active : ""}`}
                            onClick={() => handleScenarioChange("emerging")}
                            style={{ "--active-color": "#3b82f6" } as React.CSSProperties}
                        >
                            <span className={styles.scenarioTitle}>Predictability Emerging</span>
                            <span className={styles.scenarioDesc}>Structure forming. Windows opening.</span>
                        </div>

                        <div
                            className={`${styles.scenarioBtn} ${regime === "mechanical" ? styles.active : ""}`}
                            onClick={() => handleScenarioChange("mechanical")}
                            style={{ "--active-color": "#8b5cf6" } as React.CSSProperties}
                        >
                            <span className={styles.scenarioTitle}>Flow-Dominated Market</span>
                            <span className={styles.scenarioDesc}>Mechanical behavior. High predictability.</span>
                        </div>
                    </div>

                    {/* Stepper */}
                    <div className={styles.stepperContainer}>
                        {["efficient", "emerging", "mechanical"].map((step) => (
                            <div
                                key={step}
                                className={`${styles.stepItem} ${regime === step ? styles.active : ""}`}
                                onClick={() => handleScenarioChange(step as Regime)}
                                style={{ "--active-color": step === "efficient" ? "#4caf50" : step === "emerging" ? "#3b82f6" : "#8b5cf6" } as React.CSSProperties}
                            >
                                {step}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
