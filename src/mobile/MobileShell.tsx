import { useState } from 'react';
import { Wifi, Battery, Signal, Smartphone, Maximize2 } from 'lucide-react';
import MobileTopBar from './MobileTopBar';
import MobileBottomNav from './MobileBottomNav';
import MobileHomeScreen from './screens/MobileHomeScreen';
import MobilePantauPanenScreen from './screens/MobilePantauPanenScreen';
import MobileMitraScreen from './screens/MobileMitraScreen';
import MobileEksporScreen from './screens/MobileEksporScreen';
import MobileKonsultasiScreen from './screens/MobileKonsultasiScreen';
import MobileCartScreen from './screens/MobileCartScreen';
import MobileCheckoutScreen from './screens/MobileCheckoutScreen';
import MobileOrderSuccessScreen from './screens/MobileOrderSuccessScreen';
import MobileProductDetailScreen from './screens/MobileProductDetailScreen';
import MobilePeluangEksporScreen from './screens/MobilePeluangEksporScreen';
import MobileLiveScreen from './screens/MobileLiveScreen';
import MobileNotificationScreen from './screens/MobileNotificationScreen';
import MobileAccountScreen from './screens/MobileAccountScreen';
import MobileSellerCenterScreen from './screens/MobileSellerCenterScreen';
import MobileSearchListingScreen from './screens/MobileSearchListingScreen';
import LiveChatModal from '../components/LiveChatModal';
import { MobileTab, MobileProduct, MobileCartItem, RestockLogItem } from './types';
import { MOBILE_PRODUCTS, INITIAL_ETALASES } from './mobileData';
import { DOCTORS_DATA } from '../data/ternivaData';
import { Doctor } from '../types';

interface MobileShellProps {
  onLogout?: () => void;
  onReplaySplash?: () => void;
  user?: { name: string; email: string; phone: string } | null;
}

export default function MobileShell({
  onLogout,
  onReplaySplash,
  user,
}: MobileShellProps = {}) {
  const [selectedTab, setSelectedTab] = useState<MobileTab>('home');
  const [activeSubScreen, setActiveSubScreen] = useState<
    | 'none'
    | 'pantau_panen'
    | 'mitra'
    | 'ekspor'
    | 'konsultasi'
    | 'cart'
    | 'checkout'
    | 'order_success'
    | 'product_detail'
    | 'seller_center'
    | 'search_listing'
  >('none');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic Products state (persisted to localStorage)
  const [products, setProducts] = useState<MobileProduct[]>(() => {
    try {
      const saved = localStorage.getItem('terniva_products_catalog');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return MOBILE_PRODUCTS;
  });

  // Etalases state (persisted to localStorage)
  const [etalases, setEtalases] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('terniva_etalases_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_ETALASES;
  });

  // Restock Logs state (persisted to localStorage)
  const [restockLogs, setRestockLogs] = useState<RestockLogItem[]>(() => {
    try {
      const saved = localStorage.getItem('terniva_restock_logs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'rst-1',
        productId: 'prod-2',
        productName: 'Kopi Arabika Gayo Green Beans Specialty (Grade 1)',
        addedStock: 200,
        newStock: 1200,
        date: 'Kemarin, 14:15 WIB',
      },
      {
        id: 'rst-2',
        productId: 'prod-4',
        productName: 'Konsentrat Pakan Sapi Penggemukan High Protein (50kg)',
        addedStock: 50,
        newStock: 350,
        date: '3 hari lalu',
      },
    ];
  });

  // Product management operations
  const handleAddProduct = (newProd: MobileProduct) => {
    setProducts((prev) => {
      const updated = [newProd, ...prev];
      try {
        localStorage.setItem('terniva_products_catalog', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleUpdateProduct = (updatedProd: MobileProduct) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === updatedProd.id ? updatedProd : p));
      try {
        localStorage.setItem('terniva_products_catalog', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      try {
        localStorage.setItem('terniva_products_catalog', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleRestockProduct = (productId: string, addedStock: number) => {
    setProducts((prev) => {
      let restockedItemName = '';
      let calculatedNewStock = 0;
      const updated = prev.map((p) => {
        if (p.id === productId) {
          restockedItemName = p.name;
          calculatedNewStock = (p.stock || 0) + addedStock;
          return { ...p, stock: calculatedNewStock };
        }
        return p;
      });
      try {
        localStorage.setItem('terniva_products_catalog', JSON.stringify(updated));
      } catch {
        // ignore
      }

      if (restockedItemName) {
        const newLog: RestockLogItem = {
          id: `rst-${Date.now()}`,
          productId,
          productName: restockedItemName,
          addedStock,
          newStock: calculatedNewStock,
          date: 'Hari ini, Baru saja',
        };
        setRestockLogs((oldLogs) => {
          const updatedLogs = [newLog, ...oldLogs];
          try {
            localStorage.setItem('terniva_restock_logs', JSON.stringify(updatedLogs));
          } catch {
            // ignore
          }
          return updatedLogs;
        });
      }

      return updated;
    });
  };

  const handleAddEtalase = (name: string) => {
    setEtalases((prev) => {
      if (prev.includes(name)) return prev;
      const updated = [...prev, name];
      try {
        localStorage.setItem('terniva_etalases_list', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleDeleteEtalase = (name: string) => {
    setEtalases((prev) => {
      const updated = prev.filter((e) => e !== name);
      try {
        localStorage.setItem('terniva_etalases_list', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Cart and Order state
  const [cartItems, setCartItems] = useState<MobileCartItem[]>([
    { product: MOBILE_PRODUCTS[1], quantity: 2, isSelected: true },
    { product: MOBILE_PRODUCTS[3], quantity: 1, isSelected: true },
  ]);
  const [activeProductDetail, setActiveProductDetail] = useState<MobileProduct | null>(null);
  const [activeDoctorChat, setActiveDoctorChat] = useState<Doctor | null>(null);
  const [isFrameMode, setIsFrameMode] = useState(true);

  // Active completed order data for the payment page
  const [activeOrderData, setActiveOrderData] = useState<{
    orderNumber: string;
    items: MobileCartItem[];
    subtotal: number;
    shippingFee: number;
    totalPayment: number;
    courier: string;
    paymentMethod: string;
    recipientName: string;
    recipientPhone: string;
    recipientAddress: string;
  } | null>(null);

  // Cart operations
  const handleAddToCart = (product: MobileProduct, qty: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { product, quantity: qty, isSelected: true }];
    });
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const handleToggleSelectCart = (productId: string) => {
    setCartItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, isSelected: !i.isSelected } : i))
    );
  };

  const handleToggleSelectAllCart = (selected: boolean) => {
    setCartItems((prev) => prev.map((i) => ({ ...i, isSelected: selected })));
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  // Buy Now direct flow
  const handleBuyNowDirect = (product: MobileProduct, qty: number = 1) => {
    const directItem: MobileCartItem = { product, quantity: qty, isSelected: true };
    setActiveOrderData({
      orderNumber: `TRN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      items: [directItem],
      subtotal: product.price * qty,
      shippingFee: 25000,
      totalPayment: product.price * qty + 25000,
      courier: 'JNE Agri Cargo Dingin (Est. 1-2 hari)',
      paymentMethod: 'BCA Virtual Account',
      recipientName: 'Restoran Nusantara Rasa (Budi Santoso)',
      recipientPhone: '081234567890',
      recipientAddress: 'Jl. Thamrin No. 45, Menteng, Jakarta Pusat (10350)',
    });
    setActiveSubScreen('checkout');
  };

  // Video Buy direct flow
  const handleBuyFromVideo = (productName: string, price: number) => {
    const matched = MOBILE_PRODUCTS.find((p) => p.name.includes(productName)) || MOBILE_PRODUCTS[0];
    handleBuyNowDirect(matched, 1);
  };

  const renderActiveScreen = () => {
    // 1. Dedicated Subscreens & Full Purchase Flow
    if (activeSubScreen === 'cart') {
      return (
        <MobileCartScreen
          cartItems={cartItems}
          onBack={() => setActiveSubScreen('none')}
          onUpdateQty={handleUpdateCartQty}
          onToggleSelect={handleToggleSelectCart}
          onToggleSelectAll={handleToggleSelectAllCart}
          onCheckout={(selected) => {
            const sub = selected.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
            setActiveOrderData({
              orderNumber: `TRN-${Math.floor(10000000 + Math.random() * 90000000)}`,
              items: selected,
              subtotal: sub,
              shippingFee: 25000,
              totalPayment: sub + 25000,
              courier: 'JNE Agri Cargo Dingin (Est. 1-2 hari)',
              paymentMethod: 'BCA Virtual Account',
              recipientName: 'Restoran Nusantara Rasa (Budi Santoso)',
              recipientPhone: '081234567890',
              recipientAddress: 'Jl. Thamrin No. 45, Menteng, Jakarta Pusat (10350)',
            });
            setActiveSubScreen('checkout');
          }}
          onContinueShopping={() => setActiveSubScreen('none')}
        />
      );
    }

    if (activeSubScreen === 'checkout' && activeOrderData) {
      return (
        <MobileCheckoutScreen
          items={activeOrderData.items}
          onBack={() => setActiveSubScreen('cart')}
          onProceedPayment={(order) => {
            setActiveOrderData(order);
            // Remove checked out items from cart
            const checkedOutIds = order.items.map((i) => i.product.id);
            setCartItems((prev) => prev.filter((i) => !checkedOutIds.includes(i.product.id)));
            setActiveSubScreen('order_success');
          }}
        />
      );
    }

    if (activeSubScreen === 'order_success' && activeOrderData) {
      return (
        <MobileOrderSuccessScreen
          orderData={activeOrderData}
          onGoHome={() => {
            setActiveSubScreen('none');
            setSelectedTab('home');
          }}
          onViewMyOrders={() => {
            setActiveSubScreen('none');
            setSelectedTab('akun');
          }}
        />
      );
    }

    if (activeSubScreen === 'pantau_panen') {
      return (
        <MobilePantauPanenScreen
          onBack={() => setActiveSubScreen('none')}
          onNavigateToMitra={() => setActiveSubScreen('mitra')}
        />
      );
    }

    if (activeSubScreen === 'mitra') {
      return <MobileMitraScreen onBack={() => setActiveSubScreen('none')} />;
    }

    if (activeSubScreen === 'ekspor') {
      return (
        <MobilePeluangEksporScreen
          isSubScreen={true}
          onBack={() => setActiveSubScreen('none')}
        />
      );
    }

    if (activeSubScreen === 'konsultasi') {
      return (
        <MobileKonsultasiScreen
          onBack={() => setActiveSubScreen('none')}
          onOpenLiveChat={(doc) => setActiveDoctorChat(doc)}
          onAddToCart={(p, qty) => handleAddToCart(p, qty)}
          userWalletBalance={4850000}
        />
      );
    }

    if (activeSubScreen === 'seller_center') {
      return (
        <MobileSellerCenterScreen
          onBack={() => setActiveSubScreen('none')}
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onRestockProduct={handleRestockProduct}
          etalases={etalases}
          onAddEtalase={handleAddEtalase}
          onDeleteEtalase={handleDeleteEtalase}
          restockLogs={restockLogs}
          onSelectProductPreview={(p) => {
            setActiveProductDetail(p);
            setActiveSubScreen('product_detail');
          }}
        />
      );
    }

    if (activeSubScreen === 'search_listing') {
      return (
        <MobileSearchListingScreen
          onBack={() => setActiveSubScreen('none')}
          products={products}
          initialQuery={searchQuery}
          onSelectProduct={(p) => {
            setActiveProductDetail(p);
            setActiveSubScreen('product_detail');
          }}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          cartCount={totalCartCount}
          onGoToCart={() => setActiveSubScreen('cart')}
        />
      );
    }

    if (activeSubScreen === 'product_detail' && activeProductDetail) {
      return (
        <MobileProductDetailScreen
          product={activeProductDetail}
          onBack={() => setActiveSubScreen('none')}
          onAddToCart={(p, qty) => handleAddToCart(p, qty)}
          onBuyNow={(p, qty) => handleBuyNowDirect(p, qty)}
          onSelectOtherProduct={(p) => setActiveProductDetail(p)}
          cartCount={totalCartCount}
          onGoToCart={() => setActiveSubScreen('cart')}
          allProducts={products}
        />
      );
    }

    // 2. Primary 5 Bottom Navigation Tabs
    switch (selectedTab) {
      case 'home':
        return (
          <MobileHomeScreen
            onNavigateToScreen={(screen) => setActiveSubScreen(screen)}
            onSelectProduct={(p) => {
              setActiveProductDetail(p);
              setActiveSubScreen('product_detail');
            }}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            searchFilter={searchQuery}
            products={products}
            onOpenSearchListing={() => setActiveSubScreen('search_listing')}
          />
        );
      case 'peluang':
        return <MobilePeluangEksporScreen />;
      case 'live':
        return <MobileLiveScreen onBuyProduct={handleBuyFromVideo} />;
      case 'notif':
        return (
          <MobileNotificationScreen
            onNavigateToPantauPanen={() => setActiveSubScreen('pantau_panen')}
            onNavigateToKonsultasi={() => setActiveSubScreen('konsultasi')}
            onNavigateToOrders={() => setActiveSubScreen('none')}
          />
        );
      case 'akun':
        return (
          <MobileAccountScreen
            onNavigateToOrders={() => {
              // Open cart/orders view
              setActiveSubScreen('none');
            }}
            onLogout={onLogout}
            onOpenSellerCenter={() => setActiveSubScreen('seller_center')}
            sellerProductsCount={products.length}
          />
        );
    }
  };

  const isFullScreenMode = [
    'cart',
    'checkout',
    'order_success',
    'seller_center',
    'search_listing',
  ].includes(activeSubScreen);

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-start sm:py-6 sm:px-4 font-sans select-none">
      {/* Top Device Bar & Mode Toggle */}
      <div className="w-full max-w-[412px] mb-3 flex items-center justify-between px-3 text-xs text-stone-400">
        <div className="flex items-center gap-1.5 font-medium">
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span className="text-stone-200">Terniva Android App</span>
        </div>
        <div className="flex items-center gap-1.5">
          {onReplaySplash && (
            <button
              onClick={onReplaySplash}
              title="Putar ulang Splash Screen"
              className="text-[11px] font-semibold text-amber-300 hover:text-white bg-stone-800 hover:bg-stone-700 px-2 py-1 border border-stone-700 transition-colors cursor-pointer"
            >
              Splash
            </button>
          )}
          {onLogout && (
            <button
              onClick={onLogout}
              title="Logout / Ganti Akun"
              className="text-[11px] font-semibold text-rose-300 hover:text-white bg-stone-800 hover:bg-stone-700 px-2 py-1 border border-stone-700 transition-colors cursor-pointer"
            >
              Logout
            </button>
          )}
          <button
            onClick={() => setIsFrameMode(!isFrameMode)}
            className="flex items-center gap-1 bg-stone-800 hover:bg-stone-700 text-stone-300 px-2.5 py-1 border border-stone-700 transition-colors cursor-pointer"
          >
            <Maximize2 className="w-3 h-3 text-emerald-400" />
            <span>{isFrameMode ? 'Layar Penuh' : 'Bingkai'}</span>
          </button>
        </div>
      </div>

      {/* Smartphone Device Shell */}
      <div
        className={`w-full max-w-[412px] bg-white overflow-hidden flex flex-col shadow-2xl transition-all duration-200 ${
          isFrameMode
            ? 'h-[860px] max-h-[92vh] sm:rounded-[44px] ring-12 ring-stone-800/90 border border-stone-700'
            : 'h-screen max-h-screen rounded-none'
        }`}
      >
        {/* Android Status Bar */}
        <div
          className={`px-5 pt-3 pb-1 flex items-center justify-between text-[11px] font-mono tracking-wider shrink-0 transition-colors ${
            selectedTab === 'live' && activeSubScreen === 'none'
              ? 'bg-black text-white'
              : 'bg-emerald-900 text-white'
          }`}
        >
          <span className="font-bold">09:41</span>
          <div className="flex items-center gap-2 text-stone-200">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px]">98%</span>
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Top Bar (Only visible when on home / primary tabs without subscreen) */}
        {activeSubScreen === 'none' && selectedTab === 'home' && (
          <MobileTopBar
            searchQuery={searchQuery}
            onSearchChange={(q) => setSearchQuery(q)}
            cartCount={totalCartCount}
            onCartClick={() => setActiveSubScreen('cart')}
            onChatClick={() => setActiveDoctorChat(DOCTORS_DATA[0])}
            onOpenSearchListing={() => setActiveSubScreen('search_listing')}
          />
        )}

        {/* Main Scrollable Viewport */}
        <div
          className={`flex-1 relative flex flex-col ${
            selectedTab === 'live' && activeSubScreen === 'none'
              ? 'overflow-hidden'
              : 'overflow-y-auto no-scrollbar'
          }`}
        >
          {renderActiveScreen()}
        </div>

        {/* Bottom Navigation Bar (Hidden during full-screen purchase checkout/cart/order flow) */}
        {activeSubScreen === 'none' && (
          <MobileBottomNav
            selectedTab={selectedTab}
            onTabSelect={(tab) => {
              setSelectedTab(tab);
              setActiveSubScreen('none');
            }}
            unreadCount={2}
          />
        )}

        {/* Android Gesture Bar */}
        <div className="bg-white py-1.5 flex justify-center shrink-0 border-t border-stone-100">
          <div className="w-32 h-1 bg-stone-300 rounded-full" />
        </div>
      </div>


      {/* Live Doctor Chat Modal */}
      {activeDoctorChat && (
        <LiveChatModal
          doctor={activeDoctorChat}
          onClose={() => setActiveDoctorChat(null)}
        />
      )}
    </div>
  );
}
