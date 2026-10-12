import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { categories, restaurants, getPopularDishes } from '@/data/demoData';
import { RestaurantCard } from '@/components/RestaurantCard';
import { DishCard } from '@/components/DishCard';
import { Search, TrendingUp, UtensilsCrossed, Clock, ShieldCheck } from 'lucide-react';

export function HomePage() {
  const { navigate } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const popularDishes = getPopularDishes();

  const filteredRestaurants = useMemo(() => {
    let list = restaurants;
    if (activeCategory) {
      list = list.filter((r) => r.categories.includes(activeCategory));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchQuery, activeCategory]);

  const handleCategoryClick = (catId: string) => {
    setActiveCategory((prev) => (prev === catId ? null : catId));
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-50 via-orange-50/50 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Now delivering across Bangalore
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                Order food, <br />
                <span className="text-orange-500">split the bill</span> <br />
                with friends
              </h1>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-md">
                Discover great restaurants, add dishes to your cart, and create
                group orders to split the bill effortlessly.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('restaurants');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95"
                >
                  Explore Restaurants
                </button>
                <button
                  onClick={() => navigate('group')}
                  className="px-6 py-3 bg-white text-orange-600 border-2 border-orange-200 rounded-xl font-semibold hover:border-orange-400 transition-all active:scale-95"
                >
                  Start a Group Order
                </button>
              </div>

              {/* Feature badges */}
              <div className="mt-10 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Fast Delivery</p>
                    <p className="text-xs text-gray-500">25-45 min</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <UtensilsCrossed className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">8+ Restaurants</p>
                    <p className="text-xs text-gray-500">Diverse cuisines</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Safe & Hygienic</p>
                    <p className="text-xs text-gray-500">Quality assured</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-orange-200/50">
                <img
                  src="https://images.pexels.com/photos/29850004/pexels-photo-29850004.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Delicious food spread"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-fade-in">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">10k+</p>
                  <p className="text-xs text-gray-500">Orders delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for restaurants or cuisines..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Category</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex flex-col items-center gap-2 min-w-[90px] p-4 rounded-2xl border-2 transition-all active:scale-95 ${
                activeCategory === cat.id
                  ? 'bg-orange-50 border-orange-300 shadow-md shadow-orange-100'
                  : 'bg-white border-gray-100 hover:border-orange-200'
              }`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className={`text-sm font-medium ${activeCategory === cat.id ? 'text-orange-600' : 'text-gray-700'}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Popular Dishes</h2>
          <div className="flex items-center gap-1 text-orange-500">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Trending now</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popularDishes.map((dish) => (
            <DishCard key={dish.id} item={dish} />
          ))}
        </div>
      </section>

      {/* Restaurants */}
      <section id="restaurants" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {activeCategory ? `${categories.find((c) => c.id === activeCategory)?.name} Restaurants` : 'All Restaurants'}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
        </p>
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <p className="text-gray-500">No restaurants found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
