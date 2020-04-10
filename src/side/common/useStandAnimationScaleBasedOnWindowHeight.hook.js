import { useEffect, useState } from "react";

function getScaleBasedOnWindowHeight() {
  return window.innerHeight / 333;
}

export default function useStandAnimationScaleBasedOnWindowHeight() {
  const [scale, setScale] = useState(getScaleBasedOnWindowHeight());

  useEffect(() => {
    const onResize = () => {
      setScale(getScaleBasedOnWindowHeight());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return scale;
}
