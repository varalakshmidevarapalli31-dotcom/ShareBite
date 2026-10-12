import { useApp } from '@/context/AppContext';

export function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-fade-in-up">
      <div className="bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium">
        {toast}
      </div>
    </div>
  );
}
