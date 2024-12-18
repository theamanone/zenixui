export const combineClasses = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const generateColorClasses = (color: string, variant: string): string => {
  const variants = {
    solid: `bg-${color}-600 hover:bg-${color}-700 text-white`,
    outline: `border-2 border-${color}-600 text-${color}-600 hover:bg-${color}-50`,
    ghost: `text-${color}-600 hover:bg-${color}-50`,
  };
  
  return variants[variant] || variants.solid;
};
