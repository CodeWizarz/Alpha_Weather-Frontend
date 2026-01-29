"use client";

import React from "react";
import styles from "./page.module.css";
import { useInView } from "./hooks/useInView";
import { DemoSurface } from "./components/DemoSurface";

function ScrollSection({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const { ref, isInView } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`${styles.scrollItem} ${isInView ? styles.visible : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Background Elements */}
      <div className={styles.backgroundNoise} />
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>

        {/* 1. HERO */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              We don’t predict markets <br />
              we predict when markets become predictable.
            </h1>
            <p className={styles.heroSubtitle}>
              Alpha Weather is a market-structure intelligence layer that detects
              when trading strategies start working — and when they stop.
            </p>
            <div className={styles.heroCta}>
              <a href="#" className={styles.primaryButton}>View Demo →</a>
              <a href="#" className={styles.secondaryButton}>Read the Idea</a>
            </div>
          </div>
        </section>

        <div className={styles.divider} />

        {/* 2. PROBLEM & SOLUTION */}
        <section className={styles.gridSection}>
          <ScrollSection>
            <h2 className={styles.sectionTitle}>Good strategies fail in the wrong market</h2>
          </ScrollSection>
          <ScrollSection delay={200} className={styles.textBlock}>
            <p>
              Most losses in systematic trading don’t come from bad models, but from deploying
              good models in the wrong regime. Markets shift between efficient and mechanically
              predictable states — and Alpha Weather detects that shift.
            </p>
          </ScrollSection>
        </section>

        <div className={styles.divider} />

        {/* 3. FEATURES */}
        <section>
          <ScrollSection>
            <h2 className={`${styles.sectionTitle} ${styles.center}`}>What Alpha Weather Does</h2>
          </ScrollSection>
          <div className={styles.featuresSection}>
            <ScrollSection delay={100} className={styles.card}>
              <h3 className={styles.cardTitle}>Predictability</h3>
              <p>Detect regime shifts before returns appear</p>
            </ScrollSection>
            <ScrollSection delay={200} className={styles.card}>
              <h3 className={styles.cardTitle}>Timing</h3>
              <p>Know when models are reliable</p>
            </ScrollSection>
            <ScrollSection delay={300} className={styles.card}>
              <h3 className={styles.cardTitle}>Crowding</h3>
              <p>See when predictability decays</p>
            </ScrollSection>
          </div>
        </section>

        <div className={styles.divider} />

        {/* 4. HOW IT WORKS */}
        <section className={styles.gridSection}>
          <ScrollSection>
            <h2 className={styles.sectionTitle}>Measure structure,<br />not outcomes</h2>
          </ScrollSection>
          <ScrollSection delay={200} className={styles.accentPanel}>
            <p>
              Alpha Weather monitors hedging flows, passive rebalancing, and volatility control
              to detect regime shifts <em>before</em> returns appear.
            </p>
          </ScrollSection>
        </section>

        <div className={styles.divider} />

        {/* 5. DEMO PREVIEW */}
        <section className={styles.demoSection}>
          <ScrollSection>
            <div className={styles.demoContainer}>
              <DemoSurface />
            </div>
            <a href="#" className={styles.primaryButton}>Open Interactive Demo →</a>
          </ScrollSection>
        </section>

        <div className={styles.divider} />

        {/* 6. WHO IT'S FOR */}
        <section className={styles.gridSection}>
          <ScrollSection>
            <h2 className={styles.sectionTitle}>Built for</h2>
          </ScrollSection>
          <ScrollSection delay={100}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', opacity: 0.8 }}>
              <div>— Hedge funds</div>
              <div>— Prop trading firms</div>
              <div>— Quantitative researchers</div>
              <div>— Execution & risk teams</div>
            </div>
          </ScrollSection>
        </section>

        {/* 7. FOOTER */}
        <footer className={styles.footer}>
          <p>Alpha Weather provides market-structure context. It does not generate trade recommendations.</p>
        </footer>

      </div>
    </main>
  );
}
