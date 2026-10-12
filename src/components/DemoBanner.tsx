import { useApp } from '@/context/AppContext';
import { X } from 'lucide-react';

interface Props {
  show: boolean;
  onClose: () => void;
}

export function DemoBanner({ show, onClose }: Props) {
  const { user } = useApp();
  if (!show || user) return null;
  return (
    <div className="bg-orange-500 text-white text-center text-sm py-2 px-4 relative flex items-center justify-center">
      <span className="font-medium">
        You're browsing a demo — login to save your cart and orders (no real account needed)
      </span>
      <button onClick={onClose} className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
