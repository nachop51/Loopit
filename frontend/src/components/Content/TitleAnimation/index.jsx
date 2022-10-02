import "./TitleAnimation.css";
import { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";

const TitleAnimation = ({ title }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <VisibilitySensor
      onChange={(isVisible) => {
        setIsVisible(isVisible);
      }}
    >
      <span className={`title-animation ${isVisible ? "animate" : ""}`}>
        {title}
      </span>
    </VisibilitySensor>
  );
};

export default TitleAnimation;
