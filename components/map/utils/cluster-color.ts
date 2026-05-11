export const getClusterColor = (count: number) => {
  if (count < 10) {
    return "linear-gradient(135deg, #4ade80, #22c55e)";
  }

  if (count < 30) {
    return "linear-gradient(135deg, #22c55e, #16a34a)";
  }

  if (count < 70) {
    return "linear-gradient(135deg, #facc15, #f59e0b)";
  }

  return "linear-gradient(135deg, #f87171, #ef4444)";
};
