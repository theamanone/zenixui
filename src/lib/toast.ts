import { toast as sonnerToast } from 'sonner';

export const toast = {
  error: (message: string) => {
    sonnerToast.error(message, {
      duration: 3000,
      position: 'bottom-right',
    });
  },
  success: (message: string) => {
    sonnerToast.success(message, {
      duration: 3000,
      position: 'bottom-right',
    });
  },
  info: (message: string) => {
    sonnerToast.info(message, {
      duration: 3000,
      position: 'bottom-right',
    });
  },
};
