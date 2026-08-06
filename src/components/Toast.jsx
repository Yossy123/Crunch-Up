import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/useCart';
import { FiCheckCircle, FiInfo, FiAlertCircle } from 'react-icons/fi';

const Toast = () => {
  const { toast } = useCart();
  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const activeToastRef = useRef(toast);

  if (toast.show) {
    activeToastRef.current = toast;
  }

  useEffect(() => {
    if (toast.show) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [toast.show, shouldRender]);

  if (!shouldRender) return null;

  const currentToast = activeToastRef.current;

  const getToastStyles = () => {
    switch (currentToast.type) {
      case 'error':
        return 'bg-rose-600/95 text-white border-rose-500';
      case 'info':
        return 'bg-slate-900/90 text-white border-slate-700';
      case 'success':
      default:
        return 'bg-emerald-600/95 text-white border-emerald-500';
    }
  };

  const renderIcon = () => {
    switch (currentToast.type) {
      case 'error':
        return <FiAlertCircle className="text-xl text-rose-200 shrink-0" />;
      case 'info':
        return <FiInfo className="text-xl text-sky-400 shrink-0" />;
      case 'success':
      default:
        return <FiCheckCircle className="text-xl text-emerald-300 shrink-0" />;
    }
  };

  return (
    <div role="status" aria-live="polite" className={`fixed top-4 sm:top-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 transition-all duration-300 transform ${
      isClosing ? 'animate-out fade-out slide-out-to-top-4 duration-300' : 'animate-in fade-in slide-in-from-top-4 duration-300'
    }`}>
      <div className={`flex items-center space-x-3 px-4.5 py-3 sm:px-5 sm:py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md ${getToastStyles()}`}>
        {renderIcon()}
        <span className="text-xs sm:text-sm font-semibold tracking-wide leading-tight">{currentToast.message}</span>
      </div>
    </div>
  );
};

export default Toast;
