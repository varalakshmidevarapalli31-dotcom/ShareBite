import { useState } from 'react';
import { useApp, DELIVERY_FEE } from '@/context/AppContext';
import { MapPin, CreditCard, ShieldCheck, ArrowLeft, CheckCircle2, Package } from 'lucide-react';
import { formatINR } from '@/utils/format';
import type { Order } from '@/types';

export function CheckoutPage() {
  const { cart, subtotal, navigate, placeOrder, user } = useApp();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cart.length === 0 && !placedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Your cart is empty.</p>
        <button
          onClick={() => navigate('home')}
          className="mt-4 text-orange-500 font-medium"
        >
          Browse restaurants
        </button>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!address.trim()) errs.address = 'Please enter your delivery address';
    if (!city.trim()) errs.city = 'Please enter your city';
    if (!pincode.trim() || pincode.length < 6) errs.pincode = 'Enter a valid 6-digit pincode';
    if (!phone.trim() || phone.length < 10) errs.phone = 'Enter a valid phone number';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    const fullAddress = `${address}, ${city} - ${pincode}`;
    const order = placeOrder(fullAddress);
    setPlacedOrder(order);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Confirmation view
  if (placedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-500 mt-2">
            Your order has been placed successfully (demo — no real payment or delivery)
          </p>

          <div className="bg-orange-50 rounded-2xl p-4 mt-6 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Order ID</span>
              <span className="font-bold text-gray-900">{placedOrder.id}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Total Amount</span>
              <span className="font-bold text-orange-600">{formatINR(placedOrder.total)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Delivery Address</span>
              <span className="text-sm text-gray-900 text-right max-w-[200px]">{placedOrder.deliveryAddress}</span>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => navigate('track', placedOrder.id)}
              className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95 flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              Track Order
            </button>
            <button
              onClick={() => navigate('home')}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all active:scale-95"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Checkout form
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('cart')}
        className="flex items-center gap-1 text-gray-500 hover:text-orange-500 transition-colors mb-4 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to cart
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Delivery details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-gray-900">Delivery Address</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House no, Building, Street name"
                  className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.address ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-orange-300 focus:border-orange-300'}`}
                />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Bangalore"
                    className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.city ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-orange-300 focus:border-orange-300'}`}
                  />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="560001"
                    className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.pincode ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-orange-300 focus:border-orange-300'}`}
                  />
                  {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9876543210"
                  className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-orange-300 focus:border-orange-300'}`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-gray-900">Payment Method</h2>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border-2 border-orange-300 bg-orange-50 rounded-xl cursor-pointer">
                <input type="radio" name="payment" defaultChecked className="text-orange-500 focus:ring-orange-300" />
                <span className="text-sm font-medium text-gray-900">Cash on Delivery</span>
                <span className="ml-auto text-xs text-orange-600 font-medium bg-orange-100 px-2 py-0.5 rounded">Demo</span>
              </label>
              <label className="flex items-center gap-3 p-3 border-2 border-gray-100 rounded-xl cursor-not-allowed opacity-60">
                <input type="radio" name="payment" disabled className="text-gray-400" />
                <span className="text-sm font-medium text-gray-500">UPI / Card (not available in demo)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.menuItem.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate flex-1">
                    {item.menuItem.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-gray-900 ml-2">
                    {formatINR(item.menuItem.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium text-gray-900">{formatINR(DELIVERY_FEE)}</span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-orange-600 text-lg">{formatINR(subtotal + DELIVERY_FEE)}</span>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95"
            >
              Place Order
            </button>
            <div className="flex items-center justify-center gap-1 mt-3 text-xs text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Demo only — no real payment processed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
