import { useApp } from '@/context/AppContext';
import { ORDER_STATUSES } from '@/types';
import {
  Package,
  CheckCircle2,
  ChefHat,
  Bike,
  Home as HomeIcon,
  Clock,
  MapPin,
  IndianRupee,
  ArrowLeft,
  Receipt,
} from 'lucide-react';
import { formatINR } from '@/utils/format';

const statusIcons = [Package, CheckCircle2, ChefHat, Bike, HomeIcon];
const statusColors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500', 'bg-gray-600'];
const statusTimes = ['Just now', '2 min', '5 min', '15 min', '30 min'];

export function OrdersPage() {
  const { orders, navigate, currentPage, selectedRestaurantId } = useApp();

  // Only treat selectedRestaurantId as an order ID when we're on the 'track' page.
  // On the 'orders' page, it should always show the list.
  const trackingOrder =
    currentPage === 'track' && selectedRestaurantId
      ? orders.find((o) => o.id === selectedRestaurantId)
      : undefined;

  if (trackingOrder) {
    return <OrderTracker orderId={trackingOrder.id} />;
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-12 h-12 text-orange-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">Your past orders will appear here.</p>
        <button
          onClick={() => navigate('home')}
          className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95"
        >
          Start Ordering
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => {
          const currentStep = ORDER_STATUSES.indexOf(order.status);
          return (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">Order {order.id}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${order.status === 'Delivered' ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-600'}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.placedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600 text-lg">{formatINR(order.total)}</p>
                  <p className="text-xs text-gray-500">{order.items.reduce((s, i) => s + i.quantity, 0)} items</p>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center gap-1 mt-4 mb-3">
                {ORDER_STATUSES.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      idx <= currentStep ? 'bg-orange-500' : 'bg-gray-100'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between gap-4 mt-3">
                <div className="flex gap-2 flex-wrap">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item.menuItem.id} className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2 py-1">
                      <img src={item.menuItem.image} alt={item.menuItem.name} className="w-6 h-6 rounded object-cover" />
                      <span className="text-xs text-gray-600 truncate max-w-[80px]">{item.menuItem.name}</span>
                      <span className="text-xs font-medium text-gray-900">×{item.quantity}</span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <span className="text-xs text-gray-400 self-center">+{order.items.length - 3} more</span>
                  )}
                </div>
                <button
                  onClick={() => navigate('track', order.id)}
                  className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors whitespace-nowrap flex items-center gap-1"
                >
                  Track
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrderTracker({ orderId }: { orderId: string }) {
  const { orders, navigate, selectedRestaurantId } = useApp();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Order not found.</p>
        <button onClick={() => navigate('orders')} className="mt-4 text-orange-500 font-medium">
          View all orders
        </button>
      </div>
    );
  }

  const currentStep = ORDER_STATUSES.indexOf(order.status);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('orders')}
        className="flex items-center gap-1 text-gray-500 hover:text-orange-500 transition-colors mb-4 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to orders
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Track Order</h1>
            <p className="text-sm text-gray-400 mt-0.5">Order #{order.id}</p>
          </div>
          <span className={`text-sm font-medium px-3 py-1.5 rounded-lg ${order.status === 'Delivered' ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-600'}`}>
            {order.status}
          </span>
        </div>

        {/* Delivery illustration */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-50/50 rounded-2xl p-6 mb-6 text-center">
          <img
            src="https://images.pexels.com/photos/4392883/pexels-photo-4392883.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Delivery"
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
          <p className="text-sm text-gray-600">
            {order.status === 'Delivered'
              ? 'Your order has been delivered! Enjoy your meal.'
              : `Estimated delivery in ${30 - currentStep * 7} minutes`}
          </p>
        </div>

        {/* Status timeline */}
        <div className="space-y-0">
          {ORDER_STATUSES.map((status, idx) => {
            const Icon = statusIcons[idx];
            const isComplete = idx <= currentStep;
            const isCurrent = idx === currentStep;
            return (
              <div key={status} className="flex gap-4">
                {/* Timeline line and dot */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isComplete ? statusColors[idx] + ' text-white' : 'bg-gray-100 text-gray-300'
                    } ${isCurrent ? 'ring-4 ring-orange-100 animate-scale-in' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {idx < ORDER_STATUSES.length - 1 && (
                    <div className={`w-0.5 h-12 ${idx < currentStep ? 'bg-orange-300' : 'bg-gray-100'}`} />
                  )}
                </div>
                {/* Content */}
                <div className="pt-2 pb-6">
                  <h3 className={`font-semibold text-sm ${isComplete ? 'text-gray-900' : 'text-gray-400'}`}>
                    {status}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {statusTimes[idx]}
                    {isCurrent && <span className="text-orange-500 font-medium ml-1">(current)</span>}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order details */}
        <div className="border-t border-gray-100 pt-6 mt-2">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-700">Delivery Address</p>
                <p className="text-gray-500">{order.deliveryAddress}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <Receipt className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-700">Payment</p>
                <p className="text-gray-500">Cash on Delivery (demo)</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            {order.items.map((item) => (
              <div key={item.menuItem.id} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.menuItem.name} × {item.quantity}
                </span>
                <span className="font-medium text-gray-900">
                  {formatINR(item.menuItem.price * item.quantity)}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-2 space-y-1">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery Fee</span>
                <span>{formatINR(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-gray-900">Total</span>
                <span className="text-orange-600">{formatINR(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('home')}
          className="w-full mt-6 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all active:scale-95"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
