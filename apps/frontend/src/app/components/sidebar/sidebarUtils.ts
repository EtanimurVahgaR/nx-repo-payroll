// Utility functions for Sidebar and SidebarItem

export const isInOpenChain = (
  key: string,
  openItems: Record<string, boolean>
) => {
  if (!key) return false;
  let current = '';
  for (const part of key.split('/')) {
    current = current ? `${current}/${part}` : part;
    if (!openItems[current]) return false;
  }
  return true;
};

function blendColors(color1: string, color2: string, ratio: number) {
  const extractRGB = (color: string) => {
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return [255, 255, 255];
    return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
  };
  const rgb1 = extractRGB(color1);
  const rgb2 = extractRGB(color2);
  const blended = rgb1.map((c, i) =>
    Math.round(c * (1 - ratio) + rgb2[i] * ratio)
  );
  return `rgb(${blended[0]},${blended[1]},${blended[2]},0.7)`;
}

export const getLighterSidebarColor = (depth: number) => {
  const base =
    getComputedStyle(document.documentElement).getPropertyValue(
      '--sidebar-bg'
    ) || 'rgb(30,41,59)';
  const maxDepth = 6;
  const ratio = Math.min(depth, maxDepth) / maxDepth;
  return blendColors(base, 'rgb(255,255,255)', ratio);
};
