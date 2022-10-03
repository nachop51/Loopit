import "./TitleAnimation.css";
import { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";

const TitleAnimation = ({ title, width }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <VisibilitySensor
      onChange={(isVisible) => {
        setIsVisible(isVisible);
      }}
    >
      <span
        className={`title-animation ${isVisible ? "animate" : ""}`}
        style={{ width: `${width}ch` }}
      >
        {title}
      </span>
    </VisibilitySensor>
  );
};

export default TitleAnimation;
