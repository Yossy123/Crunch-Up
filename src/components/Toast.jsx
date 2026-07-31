import React from 'react';
import { useCart } from '../context/CartContext';
import { FiCheckCircle, FiInfo, FiAlertCircle } from 'react-icons/fi';

const Toast = () => {
  const { toast } = useCart();

  if (!toast.show) return null;

  const getToastStyles = () => {
    switch (toast.type) {
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
    switch (toast.type) {
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
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0 opacity-100">
      <div className={`flex items-center space-x-3 px-5 py-3.5 rounded-2xl shadow-xl border backdrop-blur-md ${getToastStyles()}`}>
        {renderIcon()}
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
};

export default Toast;
