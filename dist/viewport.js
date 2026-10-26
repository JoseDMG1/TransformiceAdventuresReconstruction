// TFMAdventure.changerTailleFenetre: scale the longest logical axis to 1280..1920.
// This does not reconstruct the original perspective camera or server zoom.
export function logicalViewport(width, height) {
  if (!(width > 0) || !(height > 0))
    return { width: 1280, height: 720, scaleX: 1, scaleY: 1, scale: 1 };
  const longest = Math.max(width, height);
  const logicalLongest = Math.min(1920, Math.max(1280, longest));
  const scale = longest / logicalLongest;
  const round = longest < 1280 ? Math.floor : Math.ceil;
  const logicalWidth = width >= height ? logicalLongest : round(width / scale);
  const logicalHeight = height > width ? logicalLongest : round(height / scale);
  return { width: logicalWidth, height: logicalHeight,
    scaleX: width / logicalWidth, scaleY: height / logicalHeight, scale };
}

export function originalInterfaceScale(width, height) {
  return logicalViewport(width, height).scale;
}
