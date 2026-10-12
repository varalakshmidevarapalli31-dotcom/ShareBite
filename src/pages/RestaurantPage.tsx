import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { getRestaurantById, getMenuByRestaurant } from '@/data/demoData';
import { Star, Clock, MapPin, IndianRupee, ArrowLeft, Plus, Minus, Leaf, Drumstick } from 'lucide-react';
import { formatINR } from '@/utils/format';

export function RestaurantPage() {
  const { selectedRestaurantId, navigate, addToCart, updateQuantity, cart } = useApp();
  const restaurant = selectedRestaurantId
    ? getRestaurantById(selectedRestaurantId)
    : undefined;
  const [activeTab, setActiveTab] = useState('All');

  const menu = useMemo(
    () => (selectedRestaurantId ? getMenuByRestaurant(selectedRestaurantId) : []),
    [selectedRestaurantId]
  );

  const categories = useMemo(() => {
    const cats = Array.from(new Set(menu.map((m) => m.category)));
    return ['All', ...cats];
  }, [menu]);

  const filteredMenu = useMemo(() => {
    if (activeTab === 'All') return menu;
    return menu.filter((m) => m.category === activeTab);
  }, [menu, activeTab]);

  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Restaurant not found.</p>
        <button
          onClick={() => navigate('home')}
          className="mt-4 text-orange-500 font-medium"
        >
          Go back home
        </button>
      </div>
    );
  }

  const getCartQuantity = (itemId: string) => {
    const item = cart.find((c) => c.menuItem.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <button
          onClick={() => navigate('home')}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-md hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
      </div>

      {/* Restaurant Info */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{restaurant.name}</h1>
          <p className="text-gray-500 mt-1">{restaurant.cuisine}</p>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-green-600 text-green-600" />
              <span className="font-bold text-sm">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 text-sm">
              <Clock className="w-4 h-4" />
              {restaurant.deliveryTime}
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 text-sm">
              <IndianRupee className="w-4 h-4" />
              {restaurant.priceForTwo} for two
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 text-sm">
              <MapPin className="w-4 h-4" />
              {restaurant.location}
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 sticky top-16 bg-white/95 backdrop-blur-sm z-20 -mx-4 px-4 sm:mx-0 sm:px-0 sm:rounded-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === cat
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu items */}
        <div className="space-y-3">
          {filteredMenu.map((item) => {
            const qty = getCartQuantity(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 hover:shadow-md transition-shadow"
              >
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${item.isVeg ? 'border-green-600' : 'border-red-500'}`}>
                          {item.isVeg ? (
                            <Leaf className="w-2.5 h-2.5 text-green-600" />
                          ) : (
                            <Drumstick className="w-2.5 h-2.5 text-red-500" />
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 text-base truncate">{item.name}</h3>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                        <span className="text-xs font-medium text-gray-600">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="font-bold text-gray-900">{formatINR(item.price)}</span>
                    {qty === 0 ? (
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all active:scale-95 border border-orange-200"
                      >
                        <Plus className="w-4 h-4" />
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-orange-500 rounded-lg overflow-hidden">
                        <button
                          onClick={() => addToCart(item)}
                          className="p-2 text-white hover:bg-orange-600 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="text-white font-bold text-sm min-w-[24px] text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, qty - 1)}
                          className="p-2 text-white hover:bg-orange-600 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
