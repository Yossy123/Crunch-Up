import React from 'react';
import { useCart } from '../context/CartContext';
import { FiCheckCircle, FiInfo } from 'react-icons/fi';

const Toast = () => {
  const { toast } = useCart();

  if (!toast.show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0 opacity-100">
      <div className={`flex items-center space-x-3 px-5 py-3.5 rounded-2xl shadow-xl border backdrop-blur-md ${
        toast.type === 'info' 
          ? 'bg-slate-900/90 text-white border-slate-700' 
          : 'bg-emerald-600/95 text-white border-emerald-500'
      }`}>
        {toast.type === 'info' ? (
          <FiInfo className="text-xl text-sky-400 shrink-0" />
        ) : (
          <FiCheckCircle className="text-xl text-emerald-300 shrink-0" />
        )}
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
};

export default Toast;
