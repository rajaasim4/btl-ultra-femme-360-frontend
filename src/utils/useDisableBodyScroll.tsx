import { useEffect } from 'react';

export const useDisableBodyScroll = (open: string) => {
  useEffect(() => {
    if (open !== "none") {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);
};