"use client";

import styles from "../page.module.css";
import React, { useState, useEffect, useRef } from "react";

export type Regime = "efficient" | "emerging" | "mechanical";

interface DemoSurfaceProps {
    regime?: Regime;
    mousePosition?: { x: number; y: number };
}

export function DemoSurface({ regime = "emerging", mousePosition = { x: 0, y: 0 } }: DemoSurfaceProps) {
    // 1. Calculate subtle parallax offset
    const offsetX = (mousePosition.x / (typeof window !== 'undefined' ? window.innerWidth : 1000) - 0.5) * 20;
    const offsetY = (mousePosition.y / (typeof window !== 'undefined' ? window.innerHeight : 1000) - 0.5) * 20;

    // 2. Interaction State
    const [hoveredBand, setHoveredBand] = useState<number | null>(null);
    const [microPulses, setMicroPulses] = useState<Array<{ id: number; x: number; y: number; createdAt: number }>>([]);
    const lastMousePos = useRef(mousePosition);
    const lastMoveTime = useRef(Date.now());
    const hasMoved = useRef(false);

    // 3. Track idle time and mouse movement for pulses
    useEffect(() => {
        if (mousePosition.x !== lastMousePos.current.x || mousePosition.y !== lastMousePos.current.y) {
            lastMousePos.current = mousePosition;
            lastMoveTime.current = Date.now();
            hasMoved.current = true;
        }
    }, [mousePosition]);

    useEffect(() => {
        const checkIdle = setInterval(() => {
            const timeSinceMove = Date.now() - lastMoveTime.current;
            // Pulse logic: more freq in Mechanical, none in Efficient (per spec: "Disappear entirely in Efficient regime")
            const spawnChance = regime === "mechanical" ? 0.3 : regime === "efficient" ? 0 : 0.15;

            // "Appear near cursor when idle" - idle > 200ms
            // Only spawn if user has interacted (no pulses on static landing page) and cursor is idle
            if (hasMoved.current && timeSinceMove > 200 && Math.random() < spawnChance) {
                // Random offset from cursor, normalized to % of viewport (approx)
                const winW = typeof window !== 'undefined' ? window.innerWidth : 1000;
                const winH = typeof window !== 'undefined' ? window.innerHeight : 1000;

                const rX = lastMousePos.current.x + (Math.random() - 0.5) * 150;
                const rY = lastMousePos.current.y + (Math.random() - 0.5) * 150;

                const xPct = (rX / winW) * 100;
                const yPct = (rY / winH) * 100;

                const newPulse = { id: Date.now() + Math.random(), x: xPct, y: yPct, createdAt: Date.now() };
                setMicroPulses(prev => [...prev.slice(-8), newPulse]);
            }
        }, 600);
        return () => clearInterval(checkIdle);
    }, [regime]);

    // Cleanup pulses
    useEffect(() => {
        const cleanup = setInterval(() => {
            setMicroPulses(prev => prev.filter(p => Date.now() - p.createdAt < 1500));
        }, 1000);
        return () => clearInterval(cleanup);
    }, []);

    // 4. Helpers
    const getPulseColor = () => {
        switch (regime) {
            case "efficient": return "rgba(100, 100, 100, 0.4)";
            case "emerging": return "rgba(59, 130, 246, 0.6)";
            case "mechanical": return "rgba(139, 92, 246, 0.8)";
        }
    };

    const getSpeedMultiplier = () => {
        switch (regime) {
            case "efficient": return 0.5;
            case "emerging": return 1;
            case "mechanical": return 2;
        }
    };

    const getBandLabel = (index: number) => {
        const efficientLabels = ["Random Walk", "Noise Distribution", "Arbitrage Gaps", "Uncorrelated Flow", "News Arrival"];
        const emergingLabels = ["Liquidity Pocket", "Momentum Build", "Formation Zone", "Trend Alignment", "Volume Spike"];
        const mechanicalLabels = ["Passive rebalancing pressure", "Volatility control feedback", "Liquidity absorption", "Index Re-weighting", "Gamma Hedging"];

        if (regime === "efficient") return efficientLabels[index % efficientLabels.length];
        if (regime === "emerging") return emergingLabels[index % emergingLabels.length];
        return mechanicalLabels[index % mechanicalLabels.length];
    };

    return (
        <div className={styles.surfaceContainer} style={{
            "--pulse-color": getPulseColor(),
            transition: "--pulse-color 1s ease",
            cursor: 'crosshair' // Subtle hint
        } as React.CSSProperties}>

            {/* Layer 1: Background Intelligence - Grid Changes */}
            <div
                className={styles.surfaceGrid}
                style={{
                    transform: `translate(${offsetX * 0.5}px, ${offsetY * 0.5}px)`,
                    opacity: regime === "mechanical" ? 0.25 : regime === "efficient" ? 0.08 : 0.15,
                    backgroundSize: regime === "mechanical" ? "30px 30px" : regime === "efficient" ? "100px 100px" : "60px 60px",
                    transition: "all 1.5s ease"
                }}
            />

            {/* Layer 2: Interactive Regime Bands */}
            <div className={styles.regimeContainer}
                style={{ transform: `translate(${-offsetX}px, ${-offsetY}px)` }}>
                {[...Array(5)].map((_, i) => {
                    const isHovered = hoveredBand === i;
                    // Proximity pulse: brightness increases if hovered
                    const baseOpacity = (0.1 + (i % 2) * 0.1) * (regime === "mechanical" ? 1.5 : 1);
                    const hoverOpacity = isHovered ? 0.8 : baseOpacity;

                    return (
                        <div
                            key={`band-${i}`}
                            className={styles.regimeBand}
                            onMouseEnter={() => setHoveredBand(i)}
                            onMouseLeave={() => setHoveredBand(null)}
                            style={{
                                left: `${i * 20}%`,
                                animationDelay: `${i * 1.2 / getSpeedMultiplier()}s`,
                                opacity: hoverOpacity,
                                boxShadow: isHovered ? `0 0 30px ${getPulseColor()}` : 'none',
                                transition: "all 0.4s ease",
                                pointerEvents: "auto", // Make sure it catches mouse
                            }}
                        >
                            {/* Band Label on Hover */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0})`,
                                color: '#fff',
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '0.7rem',
                                whiteSpace: 'nowrap',
                                opacity: isHovered ? 1 : 0,
                                transition: 'all 0.2s ease',
                                pointerEvents: 'none',
                                border: `1px solid ${getPulseColor()}`
                            }}>
                                {getBandLabel(i)}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Layer 3: Standard Signal Pulses */}
            <div className={styles.pulseContainer}>
                {[...Array(regime === "efficient" ? 2 : regime === "mechanical" ? 5 : 3)].map((_, i) => (
                    <div
                        key={`pulse-${i}`}
                        className={styles.signalPulse}
                        style={{
                            top: `${20 + i * (regime === "mechanical" ? 15 : 30)}%`,
                            left: `${10 + i * 20}%`,
                            animationDelay: `${i * 2.5 / getSpeedMultiplier()}s`,
                            animationDuration: `${4 / getSpeedMultiplier()}s`,
                            backgroundColor: getPulseColor(),
                        }}
                    />
                ))}
            </div>

            {/* Layer 4: Micro-Pulses (Cursor Reactive) */}
            {microPulses.map((p) => (
                <div
                    key={p.id}
                    className={styles.signalPulse} // Reuse style
                    style={{
                        position: 'fixed', // Use fixed to match window coords from mouse logic
                        top: `${p.y}%`,
                        left: `${p.x}%`,
                        width: regime === "mechanical" ? '4px' : '2px', // Slight var
                        height: regime === "mechanical" ? '4px' : '2px',
                        opacity: 0,
                        backgroundColor: getPulseColor(),
                        animation: 'pulseGlow 1s ease-out forwards',
                        pointerEvents: 'none'
                    }}
                />
            ))}

            {/* Layer 5: Scanning Line */}
            <div className={styles.scanLine} style={{
                animationDuration: regime === "mechanical" ? "3s" : "8s"
            }} />

            {/* Layer 6: Overlay Text */}
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
