// components/Modal.tsx
import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
};

const Modal = ({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = true,
  closeOnEsc = true,
}: ModalProps) => {
  // Handle ESC key press
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, closeOnEsc]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto grid place-items-center size-full">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"
        onClick={closeOnOutsideClick ? onClose : undefined}
      />

      {/* Modal container */}
      <div className="flex  items-center justify-center p-4 text-center sm:block sm:p-0">
        {/* Modal content */}
        <div
          className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
