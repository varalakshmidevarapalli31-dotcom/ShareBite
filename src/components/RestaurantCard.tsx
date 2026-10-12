import type { Restaurant } from '@/types';
import { Star, Clock, MapPin, IndianRupee } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface Props {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: Props) {
  const { navigate } = useApp();

  return (
    <button
      onClick={() => navigate('restaurant', restaurant.id)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all text-left active:scale-[0.98]"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
          <span className="text-sm font-bold text-gray-900">{restaurant.rating}</span>
        </div>
        <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-medium px-2.5 py-1 rounded-lg shadow-sm">
          {restaurant.deliveryTime}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base group-hover:text-orange-600 transition-colors">
          {restaurant.name}
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">{restaurant.cuisine}</p>
        <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <IndianRupee className="w-3.5 h-3.5" />
            {restaurant.priceForTwo} for two
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {restaurant.location}
          </span>
        </div>
      </div>
    </button>
  );
}
