import { useApp } from '@/context/AppContext';
import { UtensilsCrossed, ShoppingCart, Users, Package, Home, User as UserIcon, LogOut } from 'lucide-react';
import type { PageKey } from '@/types';

export function Header() {
  const { currentPage, navigate, cartCount, user, logout } = useApp();

  const navItems: { key: PageKey; label: string; icon: typeof Home }[] = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'group', label: 'Group Order', icon: Users },
    { key: 'orders', label: 'My Orders', icon: Package },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md shadow-orange-200">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Share<span className="text-orange-500">Bite</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => navigate(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  currentPage === key
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-orange-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50">
                  <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('login')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                Login
              </button>
            )}

            {/* Cart */}
            <button
              onClick={() => navigate('cart')}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg font-medium text-sm hover:bg-orange-600 transition-all shadow-md shadow-orange-200 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <nav className="md:hidden flex items-center gap-1 pb-2 -mt-1">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => navigate(key)}
              className={`flex-1 flex flex-col items-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentPage === key
                  ? 'text-orange-600'
                  : 'text-gray-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
          {user ? (
            <button
              onClick={logout}
              className="flex-1 flex flex-col items-center gap-1 py-1.5 rounded-lg text-xs font-medium text-gray-500"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate('login')}
              className="flex-1 flex flex-col items-center gap-1 py-1.5 rounded-lg text-xs font-medium text-gray-500"
            >
              <UserIcon className="w-5 h-5" />
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
