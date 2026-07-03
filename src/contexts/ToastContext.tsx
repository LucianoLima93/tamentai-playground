import { createContext, useContext, useState, type ReactNode } from 'react';
import { Toast } from '@poliedro/tamentai/web';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface ShowToastParams {
  title: string;
  description: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextValue {
  showToast: (params: ShowToastParams) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState<ShowToastParams | null>(null);

  const showToast = (newParams: ShowToastParams) => {
    setParams(newParams);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {params && (
        <Toast
          open={open}
          onOpenChange={setOpen}
          title={params.title}
          description={params.description}
          type={params.type || 'info'}
          duration={params.duration || 3000}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useGlobalToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useGlobalToast must be used within a ToastProvider');
  }
  return context;
}
