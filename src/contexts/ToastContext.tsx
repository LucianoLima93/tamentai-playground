import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';
import { Toast } from '@poliedro/tamentai/web';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface ShowToastParams {
  title?: string;
  description: string;
  type?: ToastType;
  duration?: number;
  action?: string;
  onAction?: () => void;
}

interface ToastEntry {
  id: number;
  title?: string;
  description: string;
  type: ToastType;
  duration: number;
  action?: string;
  onAction?: () => void;
}

interface ToastContextValue {
  showToast: (params: ShowToastParams) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let toastId = 0;

export function ToastProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const showToast = useCallback((params: ShowToastParams) => {
    const id = ++toastId;

    setToasts(prev => [...prev, {
      id,
      title: params.title,
      description: params.description,
      type: params.type || 'info',
      duration: params.duration || 3000,
      action: params.action,
      onAction: params.onAction,
    }]);
  }, []);

  const handleClose = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.map((toast, index) => {
        const stackIndex = toasts.length - 1 - index;
        return (
          <div
            key={toast.id}
            style={{
              position: 'fixed',
              bottom: `${1 + stackIndex * 0.5}rem`,
              right: '1rem',
              zIndex: 9999 - stackIndex,
              transform: `scale(${1 - stackIndex * 0.03})`,
              opacity: stackIndex > 3 ? 0 : 1,
              transition: 'transform 0.2s ease, bottom 0.2s ease, opacity 0.2s ease',
              pointerEvents: stackIndex === 0 ? 'auto' : 'none',
            }}
          >
            <Toast
              open={true}
              onOpenChange={(open: boolean) => { if (!open) handleClose(toast.id); }}
              title={toast.title}
              description={toast.description}
              variant={toast.type}
              duration={toast.duration}
              action={toast.action}
              onAction={toast.onAction}
            />
          </div>
        );
      })}
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
