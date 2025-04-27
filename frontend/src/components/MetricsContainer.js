// MetricsContainer.js
import React, { useState, useEffect } from "react";
import CountUp from 'react-countup';
import "./MetricsContainer.css";

const MetricsContainer = ({ metrics }) => {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold: 0.1 }
        );

        const metricsElement = document.querySelector('.metrics-container');
        if (metricsElement) {
            observer.observe(metricsElement);
        }

        return () => {
            if (metricsElement) {
                observer.unobserve(metricsElement);
            }
        };
    }, []);

    return (
        <div className="metrics-container">
            {metrics.map((metric, index) => (
                <div className="metric-item" key={index}>
                    <h2 className="metric-value">
                        {metric.prefix}
                        {inView ? (
                            <CountUp 
                                end={metric.value} 
                                duration={2.5} 
                                separator="," 
                            />
                        ) : '0'}
                        {metric.suffix}
                    </h2>
                    <p className="metric-label">{metric.label}</p>
                </div>
            ))}
        </div>
    );
};

export default MetricsContainer;
