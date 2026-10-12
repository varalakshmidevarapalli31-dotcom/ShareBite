import { useState, useEffect } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';
import { DemoBanner } from '@/components/DemoBanner';
import { HomePage } from '@/pages/HomePage';
import { RestaurantPage } from '@/pages/RestaurantPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { GroupPage } from '@/pages/GroupPage';
import { OrdersPage } from '@/pages/OrdersPage';
import { AuthPage } from '@/pages/AuthPage';

function AppContent() {
  const { currentPage } = useApp();
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('sharebite_banner_dismissed');
    if (dismissed) setBannerDismissed(true);
  }, []);

  const dismissBanner = () => {
    setBannerDismissed(true);
    localStorage.setItem('sharebite_banner_dismissed', 'true');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'restaurant':
        return <RestaurantPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
      case 'confirmation':
        return <CheckoutPage />;
      case 'group':
        return <GroupPage />;
      case 'orders':
      case 'track':
        return <OrdersPage />;
      case 'login':
      case 'register':
        return <AuthPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DemoBanner show={!bannerDismissed} onClose={dismissBanner} />
      <Header />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <Toast />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
