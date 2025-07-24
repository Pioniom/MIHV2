"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Div from "../Div"

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
}) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!isHovering) {
      const timer = setInterval(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length)
      }, autoPlayInterval)

      return () => clearInterval(timer)
    }
  }, [features.length, autoPlayInterval, isHovering])

  const handleMouseEnter = (index) => {
    setIsHovering(true)
    setCurrentFeature(index)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <Div className={`container ${className || ''}`}>
      <h2 className="cs-font_50 cs-m0 text-center cs-line_height_4 cs-font_bold">
        {title}
      </h2>
      <Div className="cs-height_90 cs-height_lg_45" />

      <Div className="row align-items-center">
        <Div className="col-lg-6">
          <Div className="cs-feature_steps_list">
            {features.map((feature, index) => (
              <Div
                key={index}
                className={`cs-feature_step ${index === currentFeature ? 'cs-active' : ''}`}
                style={{
                  opacity: index === currentFeature ? 1 : 0.4,
                  transition: 'opacity 0.5s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Div className="cs-feature_step_icon">
                  <Div className={`cs-step_circle ${index === currentFeature ? 'cs-active' : ''}`}>
                    {index <= currentFeature ? (
                      <span>✓</span>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </Div>
                </Div>
                <Div className="cs-feature_step_content">
                  <h3 className="cs-font_24 cs-font_bold cs-m0">
                    {feature.title || feature.step}
                  </h3>
                  <p className="cs-m0 cs-font_16">
                    {feature.content}
                  </p>
                </Div>
              </Div>
            ))}
          </Div>
        </Div>

        <Div className="col-lg-6">
          <Div className="cs-feature_image_container">
            {features.map((feature, index) => (
              <Div
                key={index}
                className={`cs-feature_image ${index === currentFeature ? 'cs-active' : ''}`}
                style={{
                  display: index === currentFeature ? 'block' : 'none',
                  opacity: index === currentFeature ? 1 : 0,
                  transition: 'opacity 0.5s ease'
                }}
              >
                <Image
                  src={feature.image}
                  alt={feature.step}
                  width={600}
                  height={400}
                  className="cs-radius_15 w-100"
                />
              </Div>
            ))}
          </Div>
        </Div>
      </Div>
    </Div>
  )
}