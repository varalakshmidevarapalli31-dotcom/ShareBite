import type { MenuItem } from '@/types';
import { Star, Plus, Leaf } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatINR } from '@/utils/format';

interface Props {
  item: MenuItem;
  showRestaurant?: boolean;
}

export function DishCard({ item }: Props) {
  const { addToCart } = useApp();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group">
      <div className="relative h-36 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.isVeg && (
          <div className="absolute top-2 left-2 bg-white/90 rounded-md p-0.5 shadow-sm">
            <Leaf className="w-4 h-4 text-green-600" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-md px-1.5 py-0.5 flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
          <span className="text-xs font-bold text-gray-900">{item.rating}</span>
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-semibold text-gray-900 text-sm leading-snug">{item.name}</h4>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-gray-900 text-sm">{formatINR(item.price)}</span>
          <button
            onClick={() => addToCart(item)}
            className="bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
