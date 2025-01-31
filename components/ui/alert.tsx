// alert.tsx
import React from 'react';

interface AlertProps {
  variant: 'destructive' | 'success' | 'info' | 'warning';
  className?: string;
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ variant, className, children }) => {
  const variantClasses = {
    destructive: 'bg-red-500 text-white',
    success: 'bg-green-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white',
  };

  return (
    <div className={`p-4 rounded-md ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

interface AlertDescriptionProps {
  children: React.ReactNode;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ children }) => {
  return <p className="mt-2">{children}</p>;
};


export const AlertTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="font-semibold">{children}</h4>
);