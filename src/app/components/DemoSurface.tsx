"use client";

import styles from "../page.module.css";

export function DemoSurface() {
    return (
        <div className={styles.surfaceContainer}>
            {/* Layer 1: Animated Grid Background */}
            <div className={styles.surfaceGrid} />

            {/* Layer 2: Regime Bands */}
            <div className={styles.regimeContainer}>
                {[...Array(5)].map((_, i) => (
                    <div
                        key={`band-${i}`}
                        className={styles.regimeBand}
                        style={{
                            left: `${i * 20}%`,
                            animationDelay: `${i * 1.2}s`,
                            opacity: 0.1 + (i % 2) * 0.1
                        }}
                    />
                ))}
            </div>

            {/* Layer 3: Signal Pulses */}
            <div className={styles.pulseContainer}>
                {[...Array(3)].map((_, i) => (
                    <div
                        key={`pulse-${i}`}
                        className={styles.signalPulse}
                        style={{
                            top: `${20 + i * 30}%`,
                            animationDelay: `${i * 2.5}s`
                        }}
                    />
                ))}
            </div>

            {/* Layer 4: Scanning Line */}
            <div className={styles.scanLine} />

            {/* Layer 5: Overlay Text */}
            <div className={styles.surfaceOverlay}>
                <span className={styles.statusIndicator}></span>
                <span>Market predictability regimes updating</span>
            </div>
        </div>
    );
}
