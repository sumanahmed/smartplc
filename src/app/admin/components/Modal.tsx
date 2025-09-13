"use client";
import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-xl bg-white rounded shadow p-5"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
