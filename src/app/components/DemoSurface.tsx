"use client";

import styles from "../page.module.css";

export type Regime = "efficient" | "emerging" | "mechanical";

interface DemoSurfaceProps {
    regime?: Regime;
    mousePosition?: { x: number; y: number };
}

export function DemoSurface({ regime = "emerging", mousePosition = { x: 0, y: 0 } }: DemoSurfaceProps) {
    // Calculate subtle parallax offset
    // Dampen the effect significantly: max 10px movement
    const offsetX = (mousePosition.x / (typeof window !== 'undefined' ? window.innerWidth : 1000) - 0.5) * 20;
    const offsetY = (mousePosition.y / (typeof window !== 'undefined' ? window.innerHeight : 1000) - 0.5) * 20;

    // Semantic colors based on regime
    const getPulseColor = () => {
        switch (regime) {
            case "efficient": return "rgba(100, 100, 100, 0.4)"; // Dull gray
            case "emerging": return "rgba(59, 130, 246, 0.6)"; // Blue
            case "mechanical": return "rgba(139, 92, 246, 0.8)"; // Purple
        }
    };

    // Semantic animation speeds
    const getSpeedMultiplier = () => {
        switch (regime) {
            case "efficient": return 0.5; // Slow, sparse
            case "emerging": return 1;    // Normal
            case "mechanical": return 2;  // Fast, frantic
        }
    };

    return (
        <div className={styles.surfaceContainer} style={{
            "--pulse-color": getPulseColor(),
            transition: "--pulse-color 1s ease"
        } as React.CSSProperties}>
            {/* Layer 1: Animated Grid Background with Parallax */}
            <div
                className={styles.surfaceGrid}
                style={{ transform: `translate(${offsetX * 0.5}px, ${offsetY * 0.5}px)` }}
            />

            {/* Layer 2: Regime Bands with Inverse Parallax */}
            <div className={styles.regimeContainer}
                style={{ transform: `translate(${-offsetX}px, ${-offsetY}px)` }}>
                {[...Array(5)].map((_, i) => (
                    <div
                        key={`band-${i}`}
                        className={styles.regimeBand}
                        style={{
                            left: `${i * 20}%`,
                            animationDelay: `${i * 1.2 / getSpeedMultiplier()}s`,
                            opacity: (0.1 + (i % 2) * 0.1) * (regime === "mechanical" ? 1.5 : 1),
                            transition: "animation-duration 1s ease, opacity 1s ease"
                        }}
                    />
                ))}
            </div>

            {/* Layer 3: Signal Pulses - Semantic Density */}
            <div className={styles.pulseContainer}>
                {/* Efficient: Fewer pulses. Mechanical: More pulses */}
                {[...Array(regime === "efficient" ? 2 : regime === "mechanical" ? 5 : 3)].map((_, i) => (
                    <div
                        key={`pulse-${i}`}
                        className={styles.signalPulse}
                        style={{
                            top: `${20 + i * (regime === "mechanical" ? 15 : 30)}%`,
                            left: `${10 + i * 20}%`, // Distribute horizontally too
                            animationDelay: `${i * 2.5 / getSpeedMultiplier()}s`,
                            animationDuration: `${4 / getSpeedMultiplier()}s`,
                            backgroundColor: getPulseColor()
                        }}
                    />
                ))}
            </div>

            {/* Layer 4: Scanning Line - Speed Change */}
            <div className={styles.scanLine} style={{
                animationDuration: regime === "mechanical" ? "3s" : "8s"
            }} />

            {/* Layer 5: Overlay Text - Context Aware */}
            <div className={styles.surfaceOverlay}>
                <span className={styles.statusIndicator}
                    style={{ background: getPulseColor(), boxShadow: `0 0 10px ${getPulseColor()}` }}></span>
                <span>
                    {regime === "efficient" && "Searching for structure..."}
                    {regime === "emerging" && "Predictability detected"}
                    {regime === "mechanical" && "High-frequency feedback loops active"}
                </span>
            </div>
        </div>
    );
}
