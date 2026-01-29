"use client";

import React, { useState, useEffect } from "react";
import styles from "../demo/demo.module.css";
import { RegimeControl, Regime } from "./RegimeControl";
import { DemoSurface } from "./DemoSurface";

export function DemoDashboard() {
    const [regime, setRegime] = useState<Regime>("emerging");
    const [progress, setProgress] = useState(45);
    const [indexValue, setIndexValue] = useState(42.8);

    // Deterministic updates based on interaction
    useEffect(() => {
        // Simulate index value changing based on progress and regime
        let base = 0;
        if (regime === "efficient") base = 12.0;
        if (regime === "emerging") base = 45.0;
        if (regime === "mechanical") base = 88.0;

        const noise = (Math.random() - 0.5) * 2;
        const value = base + (progress / 10) + noise;
        setIndexValue(Number(value.toFixed(1)));
    }, [regime, progress]);

    // Auto-switch regimes based on slider if user drags far
    const handleProgressChange = (val: number) => {
        setProgress(val);
        if (val < 20) setRegime("efficient");
        else if (val > 80) setRegime("mechanical");
        // Middle range preserves current or defaults to emerging if coming from extremes, 
        // but let's keep it simple: stick to manual or "emerging" in middle.
        else if (val > 30 && val < 70 && regime === "efficient") setRegime("emerging");
        else if (val > 30 && val < 70 && regime === "mechanical") setRegime("emerging");
    };

    const getInterpretation = () => {
        switch (regime) {
            case "efficient":
                return "Price action is dominated by news arrival. Alpha decay is instant. No structural predictability detected.";
            case "emerging":
                return "Market structure is forming. Flows are becoming correlated. Predictability windows are opening in the 15-30m horizon.";
            case "mechanical":
                return "Feedback loops are dominant. Passive rebalancing and volatility control flows are overriding fundamental price discovery.";
        }
    };

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const jumpToRegime = (target: Regime) => {
        setRegime(target);
        if (target === "efficient") setProgress(10);
        if (target === "emerging") setProgress(50);
        if (target === "mechanical") setProgress(90);
    };

    return (
        <div className={styles.dashboard} onMouseMove={handleMouseMove} style={{
            background: regime === "efficient" ? "#050505" :
                regime === "emerging" ? "#05080f" : "#0a050f",
            transition: "background 1s ease"
        }}>
            <header className={styles.topBar}>
                <div className={styles.logo}>Alpha Weather Monitor</div>
                <div className={styles.statusIndicators}>
                    <span>SPY • US Equities</span>
                    <span className={styles.demoBadge}>DEMO MODE</span>
                </div>
            </header>

            <main className={styles.mainContent}>
                {/* Left Panel: Primary Output */}
                <div className={styles.panel}>
                    <div>
                        <label className={styles.sectionLabel}>Current Market State</label>
                        <div className={styles.tooltipTrigger}>
                            <h2 className={styles.marketState}>
                                {regime === "efficient" && "Efficient / Random"}
                                {regime === "emerging" && "Emerging Structure"}
                                {regime === "mechanical" && "Mechanical Flow"}
                            </h2>
                            <div className={styles.tooltipContent}>
                                Represents the current dominant force in price formation.
                                Efficient markets are news-driven; Mechanical markets are flow-driven.
                            </div>
                        </div>
                        <p className={styles.interpretation}>
                            {getInterpretation()}
                        </p>
                    </div>

                    <div style={{ marginTop: "auto" }}>
                        <label className={styles.sectionLabel}>Live Metrics (Simulated)</label>
                        <div className={styles.metricRow}>
                            <span className={styles.tooltipTrigger}>
                                Alpha Weather Index
                                <div className={styles.tooltipContent}>
                                    Composite score of cross-asset correlation decay and volatility synchronization.
                                </div>
                            </span>
                            <span className={styles.metricValue}>{indexValue.toFixed(1)}</span>
                        </div>
                        <div className={styles.metricRow}>
                            <span className={styles.tooltipTrigger}>
                                Regime Confidence
                                <div className={styles.tooltipContent}>
                                    Statistical probability that the current regime persistence exceeds random chance.
                                </div>
                            </span>
                            <span className={styles.metricValue}>
                                {progress > 80 || progress < 20 ? "HIGH" : "MODERATE"}
                            </span>
                        </div>
                        <div className={styles.metricRow}>
                            <span>Est. Window</span>
                            <span className={styles.metricValue}>
                                {regime === "efficient" ? "0m" : regime === "emerging" ? "15m" : "45m"}
                            </span>
                        </div>

                        <div className={styles.stabilityContainer}>
                            <label className={styles.sectionLabel}>System Stability</label>
                            <div className={styles.stabilityBar}>
                                <div className={styles.stabilityFill} style={{
                                    width: regime === "efficient" ? "90%" : regime === "emerging" ? "60%" : "30%",
                                    backgroundColor: regime === "efficient" ? "#4caf50" : regime === "emerging" ? "#ff9800" : "#f44336"
                                }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center: Visual Surface */}
                <div className={styles.visualSurface}>
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
                        <DemoSurface regime={regime} mousePosition={mousePos} />
                    </div>

                    {/* Center Overlay for extra "tech" feel */}
                    <div style={{
                        zIndex: 5,
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '20px',
                        borderRadius: '50%',
                        width: '300px',
                        height: '300px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 60px ${regime === 'efficient' ? 'rgba(50,50,50,0.2)' :
                                regime === 'emerging' ? 'rgba(59, 130, 246, 0.2)' :
                                    'rgba(139, 92, 246, 0.2)'
                            }`,
                        transition: "box-shadow 1s ease"
                    }}>
                        <div style={{
                            textAlign: 'center',
                            color: regime === 'efficient' ? '#555' :
                                regime === 'emerging' ? '#3b82f6' : '#8b5cf6',
                            fontSize: '0.8rem',
                            letterSpacing: '0.2em',
                            transition: "color 1s ease"
                        }}>
                            AWI-{Math.floor(indexValue)}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Controls */}
                <div className={`${styles.panel} ${styles.rightPanel}`}>
                    <RegimeControl
                        currentRegime={regime}
                        onRegimeChange={setRegime}
                        progress={progress}
                        onProgressChange={handleProgressChange}
                    />

                    <div className={styles.regimeMarkers}>
                        <div className={styles.marker} data-label="Efficient" onClick={() => jumpToRegime("efficient")} />
                        <div className={styles.marker} data-label="Emerging" onClick={() => jumpToRegime("emerging")} />
                        <div className={styles.marker} data-label="Mechanical" onClick={() => jumpToRegime("mechanical")} />
                    </div>

                    <div style={{ marginTop: "auto", fontSize: "0.75rem", color: "#444", lineHeight: "1.4" }}>
                        <p className={styles.sectionLabel}>System Notes</p>
                        <p>
                            Interactive demo environment.
                            Values are deterministic based on slider position.
                            Hover over metrics for definitions.
                        </p>
                    </div>
                </div>

                <div className={styles.demoDisclaimer}>
                    Demo illustrates market regime concepts. It does not use live data.
                </div>
            </main>
        </div>
    );
}
