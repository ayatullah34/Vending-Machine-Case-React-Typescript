import React, { useState } from "react";

interface TooltipProps {
  children?:any;
  content: string;
  backgroundColor?: string;
  color?: string;
  position?: "top" | "right" | "bottom" | "left";
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  backgroundColor = "#404040",
  color = "#fff",
  position = "top",
}) => {
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = () => {
    if(content.length>0){
      setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  const getPositionStyles = () => {
    switch (position) {
      case "right":
        return { top: "50%", right: "100%" };
      case "bottom":
        return { top: "100%", left: "50%" };
      case "left":
        return { top: "50%", left: "100%" };
      default:
        // top
        return { bottom: "100%", left: "50%" };
    }
  };

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && (
        <div
          className="tooltip"
          style={{
            backgroundColor,
            color,
            ...getPositionStyles(),
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
