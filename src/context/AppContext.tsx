import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  CartItem,
  MenuItem,
  User,
  Order,
  GroupOrder,
  GroupParticipant,
  PageKey,
  OrderStatus,
} from '@/types';
import { ORDER_STATUSES } from '@/types';
import {
  generateGroupCode,
  generateOrderId,
  generateId,
} from '@/utils/format';
import { getRestaurantById } from '@/data/demoData';

export const DELIVERY_FEE = 40;

interface AppState {
  // Navigation
  currentPage: PageKey;
  selectedRestaurantId: string | null;
  navigate: (page: PageKey, restaurantId?: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;

  // Auth
  user: User | null;
  login: (email: string) => void;
  register: (name: string, email: string, phone: string) => void;
  logout: () => void;

  // Orders
  orders: Order[];
  placeOrder: (address: string) => Order;
  getOrder: (id: string) => Order | undefined;

  // Group ordering
  groupOrder: GroupOrder | null;
  createGroup: (restaurantId: string, restaurantName: string) => void;
  addParticipant: (name: string) => void;
  removeParticipant: (participantId: string) => void;
  addParticipantItem: (participantId: string, item: MenuItem) => void;
  removeParticipantItem: (participantId: string, itemId: string) => void;
  updateParticipantItemQuantity: (
    participantId: string,
    itemId: string,
    quantity: number
  ) => void;
  clearGroup: () => void;
  placeGroupOrder: () => void;

  // Toast
  toast: string | null;
  showToast: (message: string) => void;
}

const AppContext = createContext<AppState | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    // ignore
  }
  return fallback;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageKey>('home');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    string | null
  >(null);
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadFromStorage('sharebite_cart', [])
  );
  const [user, setUser] = useState<User | null>(() =>
    loadFromStorage<User | null>('sharebite_user', null)
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage('sharebite_orders', [])
  );
  const [groupOrder, setGroupOrder] = useState<GroupOrder | null>(() =>
    loadFromStorage<GroupOrder | null>('sharebite_group', null)
  );
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('sharebite_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sharebite_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sharebite_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sharebite_group', JSON.stringify(groupOrder));
  }, [groupOrder]);

  // Auto-advance order statuses for demo (every 8 seconds)
  useEffect(() => {
    const hasActiveOrder = orders.some((o) => o.status !== 'Delivered');
    if (!hasActiveOrder) return;
    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((o) => {
          if (o.status === 'Delivered') return o;
          const idx = ORDER_STATUSES.indexOf(o.status);
          if (idx < ORDER_STATUSES.length - 1) {
            return { ...o, status: ORDER_STATUSES[idx + 1] };
          }
          return o;
        })
      );
    }, 8000);
    return () => clearInterval(interval);
  }, [orders]);

  const navigate = useCallback((page: PageKey, restaurantId?: string) => {
    setCurrentPage(page);
    if (restaurantId !== undefined) {
      setSelectedRestaurantId(restaurantId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  const addToCart = useCallback(
    (item: MenuItem) => {
      setCart((prev) => {
        const existing = prev.find((c) => c.menuItem.id === item.id);
        if (existing) {
          return prev.map((c) =>
            c.menuItem.id === item.id
              ? { ...c, quantity: c.quantity + 1 }
              : c
          );
        }
        return [...prev, { menuItem: item, quantity: 1 }];
      });
      showToast(`${item.name} added to cart`);
    },
    [showToast]
  );

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((c) => c.menuItem.id !== itemId));
  }, []);

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(itemId);
        return;
      }
      setCart((prev) =>
        prev.map((c) =>
          c.menuItem.id === itemId ? { ...c, quantity } : c
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);
  const subtotal = cart.reduce(
    (sum, c) => sum + c.menuItem.price * c.quantity,
    0
  );

  const login = useCallback(
    (email: string) => {
      const u: User = {
        id: generateId(),
        name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' '),
        email,
        phone: '+91 98765 43210',
      };
      setUser(u);
      showToast('Logged in successfully (demo)');
    },
    [showToast]
  );

  const register = useCallback(
    (name: string, email: string, phone: string) => {
      const u: User = { id: generateId(), name, email, phone };
      setUser(u);
      showToast('Account created (demo)');
    },
    [showToast]
  );

  const logout = useCallback(() => {
    setUser(null);
    showToast('Logged out');
  }, [showToast]);

  const placeOrder = useCallback(
    (address: string): Order => {
      const restaurantId = cart[0] ? cart[0].menuItem.restaurantId : '';
      const restaurant = restaurantId
        ? getRestaurantById(restaurantId)
        : undefined;
      const restaurantName = restaurant ? restaurant.name : 'Multiple Restaurants';
      const order: Order = {
        id: generateOrderId(),
        items: [...cart],
        subtotal,
        deliveryFee: DELIVERY_FEE,
        total: subtotal + DELIVERY_FEE,
        status: 'Placed',
        placedAt: Date.now(),
        restaurantName,
        deliveryAddress: address,
      };
      setOrders((prev) => [order, ...prev]);
      clearCart();
      return order;
    },
    [cart, subtotal, clearCart]
  );

  const getOrder = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders]
  );

  // Group ordering
  const createGroup = useCallback(
    (restaurantId: string, restaurantName: string) => {
      const g: GroupOrder = {
        code: generateGroupCode(),
        restaurantId,
        restaurantName,
        participants: [],
        createdAt: Date.now(),
      };
      setGroupOrder(g);
      showToast(`Group created! Code: ${g.code}`);
    },
    [showToast]
  );

  const addParticipant = useCallback(
    (name: string) => {
      const p: GroupParticipant = { id: generateId(), name, items: [] };
      setGroupOrder((prev) =>
        prev ? { ...prev, participants: [...prev.participants, p] } : prev
      );
    },
    []
  );

  const removeParticipant = useCallback((participantId: string) => {
    setGroupOrder((prev) =>
      prev
        ? {
            ...prev,
            participants: prev.participants.filter(
              (p) => p.id !== participantId
            ),
          }
        : prev
    );
  }, []);

  const addParticipantItem = useCallback(
    (participantId: string, item: MenuItem) => {
      setGroupOrder((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          participants: prev.participants.map((p) => {
            if (p.id !== participantId) return p;
            const existing = p.items.find(
              (i) => i.menuItem.id === item.id
            );
            if (existing) {
              return {
                ...p,
                items: p.items.map((i) =>
                  i.menuItem.id === item.id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                ),
              };
            }
            return { ...p, items: [...p.items, { menuItem: item, quantity: 1 }] };
          }),
        };
      });
    },
    []
  );

  const removeParticipantItem = useCallback(
    (participantId: string, itemId: string) => {
      setGroupOrder((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          participants: prev.participants.map((p) =>
            p.id === participantId
              ? {
                  ...p,
                  items: p.items.filter((i) => i.menuItem.id !== itemId),
                }
              : p
          ),
        };
      });
    },
    []
  );

  const updateParticipantItemQuantity = useCallback(
    (participantId: string, itemId: string, quantity: number) => {
      setGroupOrder((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          participants: prev.participants.map((p) => {
            if (p.id !== participantId) return p;
            if (quantity <= 0) {
              return {
                ...p,
                items: p.items.filter((i) => i.menuItem.id !== itemId),
              };
            }
            return {
              ...p,
              items: p.items.map((i) =>
                i.menuItem.id === itemId ? { ...i, quantity } : i
              ),
            };
          }),
        };
      });
    },
    []
  );

  const clearGroup = useCallback(() => setGroupOrder(null), []);

  const placeGroupOrder = useCallback(() => {
    if (!groupOrder) return;
    const allItems: CartItem[] = [];
    for (const p of groupOrder.participants) {
      for (const ci of p.items) {
        const existing = allItems.find((a) => a.menuItem.id === ci.menuItem.id);
        if (existing) {
          existing.quantity += ci.quantity;
        } else {
          allItems.push({ ...ci });
        }
      }
    }
    setCart(allItems);
    showToast('Group order sent to checkout');
  }, [groupOrder, showToast]);

  const value: AppState = {
    currentPage,
    selectedRestaurantId,
    navigate,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    subtotal,
    user,
    login,
    register,
    logout,
    orders,
    placeOrder,
    getOrder,
    groupOrder,
    createGroup,
    addParticipant,
    removeParticipant,
    addParticipantItem,
    removeParticipantItem,
    updateParticipantItemQuantity,
    clearGroup,
    placeGroupOrder,
    toast,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
