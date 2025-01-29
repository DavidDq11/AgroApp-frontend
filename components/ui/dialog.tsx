import React, { ReactNode } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

interface DialogTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  onOpen: () => void;
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, asChild, onOpen }) => {
  const trigger = asChild ? React.Children.only(children) : (
    <button onClick={onOpen}>{children}</button>
  );
  return <>{trigger}</>;
};

interface DialogContentProps {
  children: ReactNode;
}

export const DialogContent: React.FC<DialogContentProps> = ({ children }) => {
  return <div>{children}</div>;
};

interface DialogHeaderProps {
  children: ReactNode;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
  return <div className="font-bold text-xl">{children}</div>;
};

interface DialogTitleProps {
  children: ReactNode;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => {
  return <div className="text-lg">{children}</div>;
};

interface DialogDescriptionProps {
  children: ReactNode;
}

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ children }) => {
  return <div className="text-sm text-gray-500">{children}</div>;
};
