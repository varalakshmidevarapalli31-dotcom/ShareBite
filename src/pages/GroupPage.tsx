import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { restaurants, getMenuByRestaurant, getRestaurantById } from '@/data/demoData';
import {
  Users,
  Plus,
  Minus,
  Trash2,
  Copy,
  Check,
  UserPlus,
  ShoppingCart,
  ArrowLeft,
  Hash,
  IndianRupee,
  Leaf,
  Drumstick,
  Receipt,
} from 'lucide-react';
import { formatINR } from '@/utils/format';
import { DELIVERY_FEE } from '@/context/AppContext';

export function GroupPage() {
  const {
    groupOrder,
    createGroup,
    addParticipant,
    removeParticipant,
    addParticipantItem,
    removeParticipantItem,
    updateParticipantItemQuantity,
    clearGroup,
    placeGroupOrder,
    navigate,
  } = useApp();

  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('');
  const [newParticipantName, setNewParticipantName] = useState('');
  const [activeParticipantId, setActiveParticipantId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreate = () => {
    if (!selectedRestaurantId) return;
    const r = getRestaurantById(selectedRestaurantId);
    if (r) {
      createGroup(r.id, r.name);
    }
  };

  const handleCopyCode = () => {
    if (groupOrder) {
      navigator.clipboard?.writeText(groupOrder.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddParticipant = () => {
    if (!newParticipantName.trim()) return;
    addParticipant(newParticipantName.trim());
    setNewParticipantName('');
  };

  const activeParticipant = groupOrder?.participants.find(
    (p) => p.id === activeParticipantId
  );

  const menu = useMemo(
    () =>
      groupOrder ? getMenuByRestaurant(groupOrder.restaurantId) : [],
    [groupOrder]
  );

  const participantTotals = useMemo(() => {
    if (!groupOrder) return [];
    return groupOrder.participants.map((p) => {
      const total = p.items.reduce(
        (sum, i) => sum + i.menuItem.price * i.quantity,
        0
      );
      return { id: p.id, name: p.name, total, itemCount: p.items.reduce((s, i) => s + i.quantity, 0) };
    });
  }, [groupOrder]);

  const grandTotal = participantTotals.reduce((sum, p) => sum + p.total, 0);
  const totalItems = participantTotals.reduce((sum, p) => sum + p.itemCount, 0);

  // Step 1: Select restaurant
  if (!groupOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Start a Group Order</h1>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Create a group, share the code with friends, and let everyone pick their
            food. We'll calculate each person's bill and the combined total.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Choose a Restaurant</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {restaurants.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRestaurantId(r.id)}
                className={`flex gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                  selectedRestaurantId === r.id
                    ? 'border-orange-300 bg-orange-50'
                    : 'border-gray-100 hover:border-orange-200'
                }`}
              >
                <img src={r.image} alt={r.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{r.name}</h3>
                  <p className="text-xs text-gray-500">{r.cuisine}</p>
                  <p className="text-xs text-orange-500 mt-1">{r.deliveryTime}</p>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={handleCreate}
            disabled={!selectedRestaurantId}
            className="w-full mt-6 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Create Group Order
          </button>
        </div>
      </div>
    );
  }

  // Step 2 & 3: Group created — add participants and items
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Group header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg shadow-orange-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-orange-100 text-sm">
              <Users className="w-4 h-4" />
              Group Order at {groupOrder.restaurantName}
            </div>
            <h1 className="text-2xl font-bold mt-1">Order Together</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-xs text-orange-100">Group Code</p>
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4" />
                <span className="text-xl font-bold tracking-wider">{groupOrder.code}</span>
              </div>
            </div>
            <button
              onClick={handleCopyCode}
              className="bg-white text-orange-600 p-3 rounded-xl hover:bg-orange-50 transition-colors active:scale-95"
              title="Copy code"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        {/* Left: Participants + menu */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add participant */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Participants</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newParticipantName}
                onChange={(e) => setNewParticipantName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddParticipant()}
                placeholder="Enter participant name..."
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all"
              />
              <button
                onClick={handleAddParticipant}
                disabled={!newParticipantName.trim()}
                className="bg-orange-500 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-orange-600 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <UserPlus className="w-4 h-4" />
                Add
              </button>
            </div>

            {/* Participant list */}
            {groupOrder.participants.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl">
                <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No participants yet. Add people to start ordering!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {groupOrder.participants.map((p) => (
                  <div
                    key={p.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      activeParticipantId === p.id
                        ? 'border-orange-300 bg-orange-50'
                        : 'border-gray-100 hover:border-orange-200'
                    }`}
                    onClick={() =>
                      setActiveParticipantId(activeParticipantId === p.id ? null : p.id)
                    }
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm">{p.name}</h3>
                      <p className="text-xs text-gray-500">
                        {p.items.reduce((s, i) => s + i.quantity, 0)} item(s) — {formatINR(
                          p.items.reduce((s, i) => s + i.menuItem.price * i.quantity, 0)
                        )}
                      </p>
                    </div>
                    {activeParticipantId === p.id && (
                      <span className="text-xs text-orange-600 font-medium bg-orange-100 px-2 py-1 rounded">
                        Ordering
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeParticipant(p.id);
                        if (activeParticipantId === p.id) setActiveParticipantId(null);
                      }}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Menu for active participant */}
          {activeParticipant && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">
                  Select items for <span className="text-orange-500">{activeParticipant.name}</span>
                </h2>
                <button
                  onClick={() => setActiveParticipantId(null)}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  Done
                </button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {menu.map((item) => {
                  const cartItem = activeParticipant.items.find(
                    (i) => i.menuItem.id === item.id
                  );
                  const qty = cartItem ? cartItem.quantity : 0;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${item.isVeg ? 'border-green-600' : 'border-red-500'}`}>
                            {item.isVeg ? <Leaf className="w-2 h-2 text-green-600" /> : <Drumstick className="w-2 h-2 text-red-500" />}
                          </div>
                          <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{formatINR(item.price)}</p>
                      </div>
                      {qty === 0 ? (
                        <button
                          onClick={() => addParticipantItem(activeParticipant.id, item)}
                          className="bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-all active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-1 bg-orange-500 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateParticipantItemQuantity(activeParticipant.id, item.id, qty - 1)}
                            className="p-1.5 text-white hover:bg-orange-600 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-white font-bold text-sm min-w-[20px] text-center">{qty}</span>
                          <button
                            onClick={() => addParticipantItem(activeParticipant.id, item)}
                            className="p-1.5 text-white hover:bg-orange-600 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Participant's current selections */}
              {activeParticipant.items.length > 0 && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">{activeParticipant.name}'s selections</h3>
                  <div className="space-y-2">
                    {activeParticipant.items.map((i) => (
                      <div key={i.menuItem.id} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
                        <span className="text-gray-700">
                          {i.menuItem.name} × {i.quantity}
                        </span>
                        <span className="font-medium text-gray-900">
                          {formatINR(i.menuItem.price * i.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Bill split summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <Receipt className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-gray-900">Bill Split</h2>
            </div>

            {participantTotals.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">
                Add participants to see the bill breakdown
              </p>
            ) : (
              <div className="space-y-3">
                {participantTotals.map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-sm border-b border-gray-50 pb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold text-xs flex-shrink-0">
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.itemCount} item(s)</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">{formatINR(p.total)}</span>
                  </div>
                ))}

                {/* Delivery fee split */}
                <div className="flex items-center justify-between text-sm pt-2">
                  <span className="text-gray-500">Delivery fee (split equally)</span>
                  <span className="text-gray-600">{formatINR(DELIVERY_FEE)}</span>
                </div>

                <div className="border-t-2 border-gray-100 pt-3 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900">Grand Total</p>
                    <p className="text-xs text-gray-400">{totalItems} items total</p>
                  </div>
                  <span className="font-bold text-orange-600 text-xl">
                    {formatINR(grandTotal + DELIVERY_FEE)}
                  </span>
                </div>

                {/* Per person share */}
                {participantTotals.length > 0 && (
                  <div className="bg-orange-50 rounded-xl p-3 mt-3">
                    <p className="text-xs text-orange-600 font-medium mb-1">Per person (incl. delivery)</p>
                    <div className="space-y-1">
                      {participantTotals.map((p) => (
                        <div key={p.id} className="flex justify-between text-xs">
                          <span className="text-gray-700">{p.name}</span>
                          <span className="font-medium text-gray-900">
                            {formatINR(p.total + DELIVERY_FEE / participantTotals.length)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => {
                placeGroupOrder();
                navigate('checkout');
              }}
              disabled={totalItems === 0}
              className="w-full mt-6 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Place Group Order
            </button>
            <button
              onClick={() => {
                clearGroup();
                setActiveParticipantId(null);
              }}
              className="w-full mt-2 text-gray-400 text-sm font-medium hover:text-red-500 transition-colors py-2"
            >
              Delete group order
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          clearGroup();
          setActiveParticipantId(null);
        }}
        className="flex items-center gap-1 text-gray-500 hover:text-orange-500 transition-colors mt-6 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Start over with a new group
      </button>
    </div>
  );
}
