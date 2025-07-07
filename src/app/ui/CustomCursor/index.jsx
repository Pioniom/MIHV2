"use client";
import React from "react";

const CustomCursor = () => {
  const cursorSm = React.useRef(null);
  const cursorLg = React.useRef(null);
  const positionRef = React.useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  });

  React.useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;

      const mouseX = clientX;
      const mouseY = clientY;

      // Null-Check für DOM-Elemente
      if (cursorSm.current && cursorLg.current) {
        positionRef.current.mouseX = mouseX - cursorSm.current.clientWidth / 2;
        positionRef.current.mouseY = mouseY - cursorSm.current.clientHeight / 2;
      }
    };
    
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  React.useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse);
      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current;
      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = mouseX;
        positionRef.current.destinationY = mouseY;
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
        positionRef.current.distanceY = (mouseY - destinationY) * 0.1;
        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.destinationX += distanceX;
          positionRef.current.destinationY += distanceY;
        }
      }
      
      // Null-Check für DOM-Elemente
      if (cursorSm.current) {
        cursorSm.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
      }
      if (cursorLg.current) {
        cursorLg.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
      }
    };
    followMouse();
    
    // Cleanup function
    return () => {
      if (positionRef.current.key !== -1) {
        cancelAnimationFrame(positionRef.current.key);
      }
    };
  }, []);
  return (
    <>
      <div className="cs-cursor_lg" ref={cursorLg}></div>
      <div className="cs-cursor_sm" ref={cursorSm}></div>
    </>
  );
};

export default CustomCursor;
