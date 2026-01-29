"use client";

import React from "react";
import styles from "../demo/demo.module.css";

export type Regime = "efficient" | "emerging" | "mechanical";

interface RegimeControlProps {
    currentRegime: Regime;
    onRegimeChange: (regime: Regime) => void;
    progress: number;
    onProgressChange: (progress: number) => void;
}

export function RegimeControl({
    currentRegime,
    onRegimeChange,
    progress,
    onProgressChange,
}: RegimeControlProps) {
    return (
        <div>
            <label className={styles.sectionLabel}>Market Regime Control</label>
            <div className={styles.regimeToggle}>
                <button
                    className={`${styles.toggleBtn} ${currentRegime === "efficient" ? styles.active : ""}`}
                    onClick={() => onRegimeChange("efficient")}
                >
                    Efficient (Random Walk)
                </button>
                <button
                    className={`${styles.toggleBtn} ${currentRegime === "emerging" ? styles.active : ""}`}
                    onClick={() => onRegimeChange("emerging")}
                >
                    Emerging Predictability
                </button>
                <button
                    className={`${styles.toggleBtn} ${currentRegime === "mechanical" ? styles.active : ""}`}
                    onClick={() => onRegimeChange("mechanical")}
                >
                    Mechanical (Flow-Driven)
                </button>
            </div>

            <div className={styles.sliderContainer}>
                <label className={styles.sectionLabel}>Regime Progression Timeline</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => onProgressChange(Number(e.target.value))}
                    className={styles.rangeInput}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", color: "#666", fontSize: "0.7rem" }}>
                    <span>Early Formation</span>
                    <span>Peak Structure</span>
                    <span>Decay</span>
                </div>
            </div>
        </div>
    );
}
