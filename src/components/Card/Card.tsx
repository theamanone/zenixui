import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'elevated',
  padding = 'medium',
}) => {
  const baseStyles = 'rounded-lg';
  
  const variantStyles = {
    elevated: 'bg-white shadow-lg hover:shadow-xl transition-shadow duration-300',
    outlined: 'border-2 border-gray-200',
    filled: 'bg-gray-100'
  };

  const paddingStyles = {
    none: 'p-0',
    small: 'p-3',
    medium: 'p-6',
    large: 'p-8'
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
};
