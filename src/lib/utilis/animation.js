
export function getAnimationClass(type, options = {}) {
  const { speed, delay, customClass = "" } = options;

  let animationTypeClass = "";
  let isAnimatedBaseRequired = true;

  switch (type) {
    case "pageLoad":
      animationTypeClass = "animate__fadeIn";
      break;
    case "entry":
      animationTypeClass = "animate__fadeInUp";
      break;
    case "zoom":
      animationTypeClass = "animate__zoomIn";
      break;
    case "modal":
      animationTypeClass = "animate__zoomIn";
      break;
    case "dropdown":
      animationTypeClass = "animate__fadeInDown";
      break;
    case "hoverPulse":

      animationTypeClass = "animate-hover-pulse";
      isAnimatedBaseRequired = false;
      break;
    default:
      animationTypeClass = "";
  }

  const base = isAnimatedBaseRequired ? "animate__animated" : "";
  const speedClass = speed ? `animate__${speed}` : "";
  const delayClass = delay || "";

  return [base, animationTypeClass, speedClass, delayClass, customClass]
    .filter(Boolean)
    .join(" ");
}
