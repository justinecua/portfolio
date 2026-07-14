import React from "react";

const maskImages = {
  "fade-edges": "radial-gradient(ellipse at center, black, transparent)",
  "fade-center": "radial-gradient(ellipse at center, transparent, black)",
  "fade-top": "linear-gradient(to bottom, transparent, black)",
  "fade-bottom": "linear-gradient(to bottom, black, transparent)",
  "fade-left": "linear-gradient(to right, transparent, black)",
  "fade-right": "linear-gradient(to right, black, transparent)",
  "fade-x": "linear-gradient(to right, transparent, black, transparent)",
  "fade-y": "linear-gradient(to bottom, transparent, black, transparent)",
  none: undefined,
};

function getBgImage(variant, fill, size) {
  switch (variant) {
    case "dots":
      return `radial-gradient(${fill} 1px, transparent 1px)`;
    case "grid":
      return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case "diagonal-stripes":
      return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`;
    case "horizontal-lines":
      return `linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case "vertical-lines":
      return `linear-gradient(to right, ${fill} 1px, transparent 1px)`;
    case "checkerboard":
      return `linear-gradient(45deg, ${fill} 25%, transparent 25%), linear-gradient(-45deg, ${fill} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${fill} 75%), linear-gradient(-45deg, transparent 75%, ${fill} 75%)`;
    default:
      return undefined;
  }
}

const GridBackground = ({
  variant = "grid",
  mask = "none",
  size = 24,
  fill = "#252525",
  className = "",
  style = {},
  ...props
}) => {
  const bgSize =
    variant === "checkerboard"
      ? `${size * 2}px ${size * 2}px`
      : `${size}px ${size}px`;
  const backgroundImage = getBgImage(variant, fill, size);
  const maskImage = maskImages[mask];

  return (
    <div
      className={`grid-background ${className}`.trim()}
      style={{
        position: "absolute",
        inset: 0,
        opacity: "50%",
        zIndex: -10,
        width: "100%",
        height: "100%",
        backgroundImage,
        backgroundSize: bgSize,
        ...(maskImage && {
          maskImage,
          WebkitMaskImage: maskImage,
        }),
        ...style,
      }}
      {...props}
    />
  );
};

GridBackground.displayName = "GridBackground";
export { GridBackground };
export default GridBackground;
