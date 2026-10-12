import { useApp, DELIVERY_FEE } from '@/context/AppContext';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatINR } from '@/utils/format';

export function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, navigate, clearCart } = useApp();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-orange-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some delicious food to get started!</p>
        <button
          onClick={() => navigate('home')}
          className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-gray-400 hover:text-red-500 font-medium transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <div
              key={item.menuItem.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 items-center animate-fade-in"
            >
              <img
                src={item.menuItem.image}
                alt={item.menuItem.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{item.menuItem.name}</h3>
                <p className="text-sm text-gray-500 truncate">{item.menuItem.description}</p>
                <p className="font-bold text-gray-900 mt-1">{formatINR(item.menuItem.price)}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 bg-orange-50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                    className="p-1.5 text-orange-600 hover:bg-orange-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-gray-900 text-sm min-w-[24px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                    className="p-1.5 text-orange-600 hover:bg-orange-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.menuItem.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h2 className="font-bold text-gray-900 mb-4">Bill Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Item Total</span>
                <span className="font-medium text-gray-900">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium text-gray-900">{formatINR(DELIVERY_FEE)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-orange-600 text-lg">{formatINR(subtotal + DELIVERY_FEE)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('checkout')}
              className="w-full mt-6 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('home')}
              className="w-full mt-2 text-gray-500 text-sm font-medium hover:text-orange-500 transition-colors py-2"
            >
              Continue ordering
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
