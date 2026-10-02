import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Collection,
  ThemeConfig,
  CartItem,
  Order,
  Customer,
  CurrencyCode,
  CurrencyConfig,
  Size,
  OrderStatus,
  Language
} from '../types/store';
import {
  INITIAL_PRODUCTS,
  INITIAL_COLLECTIONS,
  INITIAL_THEMES,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS
} from '../data/initialData';
import { TRANSLATIONS, detectUserLanguage, TranslationDictionary } from '../utils/translations';

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  EUR: { code: 'EUR', symbol: '€', rate: 1.0 },
  USD: { code: 'USD', symbol: '$', rate: 1.08 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.85 }
};

interface StoreSettings {
  storeName: string;
  storeEmail: string;
  taxRatePercent: number;
  freeShippingThreshold: number;
  enableCard: boolean;
  enableApplePay: boolean;
  enablePaypal: boolean;
  enableCod: boolean;
}

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'HomedesignofDjadou',
  storeEmail: 'concierge@homedesignofdjadou.com',
  taxRatePercent: 20, // 20% French standard TVA
  freeShippingThreshold: 250,
  enableCard: true,
  enableApplePay: true,
  enablePaypal: true,
  enableCod: true
};

interface StoreContextType {
  // Language & Location
  language: Language;
  setLanguage: (lang: Language) => void;
  detectedLocation: { language: Language; isFrance: boolean };
  t: (key: keyof TranslationDictionary, params?: Record<string, string | number>) => string;
  getLocalizedName: (p: Product) => string;
  getLocalizedTagline: (p: Product) => string;
  getLocalizedDescription: (p: Product) => string;
  getLocalizedComposition: (p: Product) => string;
  getLocalizedDetails: (p: Product) => string[];
  getLocalizedCollectionName: (c: Collection) => string;
  getLocalizedCollectionTagline: (c: Collection) => string;
  getLocalizedCollectionDescription: (c: Collection) => string;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleStock: (id: string) => void;

  // Collections
  collections: Collection[];
  activeCollection: Collection | null;
  addCollection: (col: Omit<Collection, 'id'>) => Collection;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
  setActiveCollectionId: (id: string) => void;

  // Visual Identity & Themes
  themes: ThemeConfig[];
  currentTheme: ThemeConfig;
  updateCurrentTheme: (updates: Partial<ThemeConfig>) => void;
  applyThemePreset: (themeId: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: Size, quantity?: number) => void;
  removeFromCart: (productId: string, size: Size) => void;
  updateCartQuantity: (productId: string, size: Size, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalCount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;

  // Customers
  customers: Customer[];
  addOrUpdateCustomerFromOrder: (order: Order) => void;

  // Currencies & Formatting
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInEUR: number) => string;

  // Settings
  settings: StoreSettings;
  updateSettings: (updates: Partial<StoreSettings>) => void;

  // Data Ownership & Backup
  exportStoreData: () => void;
  importStoreData: (jsonData: string) => boolean;
  resetToFactoryDefaults: () => void;

  // Modals & Navigation
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isFounderGuideOpen: boolean;
  setIsFounderGuideOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const STORAGE_KEYS = {
  LANGUAGE: 'djadou_language_v3',
  PRODUCTS: 'djadou_products_v3',
  COLLECTIONS: 'djadou_collections_v3',
  THEMES: 'djadou_themes_v3',
  CURRENT_THEME_ID: 'djadou_current_theme_id_v3',
  CART: 'djadou_cart_v3',
  WISHLIST: 'djadou_wishlist_v3',
  ORDERS: 'djadou_orders_v3',
  CUSTOMERS: 'djadou_customers_v3',
  CURRENCY: 'djadou_currency_v3',
  SETTINGS: 'djadou_settings_v3'
};

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Failed to parse storage key ${key}:`, e);
    return fallback;
  }
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Detected Location & Browser Locale
  const detectedLocation = detectUserLanguage();

  // Language state (defaults to 'fr' for French store owner & French location)
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (saved === 'fr' || saved === 'en') return saved;
    return detectedLocation.language;
  });

  // State
  const [products, setProducts] = useState<Product[]>(() =>
    loadStorage(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS)
  );
  const [collections, setCollections] = useState<Collection[]>(() =>
    loadStorage(STORAGE_KEYS.COLLECTIONS, INITIAL_COLLECTIONS)
  );
  const [themes, setThemes] = useState<ThemeConfig[]>(() =>
    loadStorage(STORAGE_KEYS.THEMES, INITIAL_THEMES)
  );
  const [currentThemeId, setCurrentThemeId] = useState<string>(() =>
    loadStorage(STORAGE_KEYS.CURRENT_THEME_ID, INITIAL_THEMES[0].id)
  );
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadStorage(STORAGE_KEYS.CART, [])
  );
  const [wishlist, setWishlist] = useState<string[]>(() =>
    loadStorage(STORAGE_KEYS.WISHLIST, [])
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    loadStorage(STORAGE_KEYS.ORDERS, INITIAL_ORDERS)
  );
  const [customers, setCustomers] = useState<Customer[]>(() =>
    loadStorage(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS)
  );
  const [currency, setCurrency] = useState<CurrencyCode>(() =>
    loadStorage(STORAGE_KEYS.CURRENCY, 'EUR')
  );
  const [settings, setSettings] = useState<StoreSettings>(() =>
    loadStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
  );

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isFounderGuideOpen, setIsFounderGuideOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    if (lang === 'fr' && currency === 'USD') {
      setCurrency('EUR');
    }
  };

  // Translation function
  const t = (key: keyof TranslationDictionary, params?: Record<string, string | number>): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.fr;
    let str = dict[key] || TRANSLATIONS.en[key] || '';
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        str = str.replace(`{${k}}`, String(v));
      });
    }
    return str;
  };

  // Localized product text helpers
  const getLocalizedName = (p: Product) => (language === 'fr' && p.nameFr ? p.nameFr : p.name);
  const getLocalizedTagline = (p: Product) => (language === 'fr' && p.taglineFr ? p.taglineFr : p.tagline);
  const getLocalizedDescription = (p: Product) => (language === 'fr' && p.descriptionFr ? p.descriptionFr : p.description);
  const getLocalizedComposition = (p: Product) => (language === 'fr' && p.compositionFr ? p.compositionFr : p.composition);
  const getLocalizedDetails = (p: Product) => (language === 'fr' && p.detailsFr && p.detailsFr.length ? p.detailsFr : p.details);

  const getLocalizedCollectionName = (c: Collection) => (language === 'fr' && c.nameFr ? c.nameFr : c.name);
  const getLocalizedCollectionTagline = (c: Collection) => (language === 'fr' && c.taglineFr ? c.taglineFr : c.tagline);
  const getLocalizedCollectionDescription = (c: Collection) => (language === 'fr' && c.descriptionFr ? c.descriptionFr : c.description);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEMES, JSON.stringify(themes));
  }, [themes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_THEME_ID, JSON.stringify(currentThemeId));
  }, [currentThemeId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENCY, JSON.stringify(currency));
  }, [currency]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Derived active theme
  const currentTheme = themes.find((t) => t.id === currentThemeId) || themes[0];
  const activeCollection = collections.find((c) => c.active) || collections[0] || null;

  // Currency Formatter
  const formatPrice = (amountInEUR: number): string => {
    const config = CURRENCIES[currency] || CURRENCIES.EUR;
    const converted = amountInEUR * config.rate;
    if (currency === 'EUR') {
      return `${converted.toLocaleString('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })} €`;
    }
    return `${config.symbol}${converted.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  // Products CRUD
  const addProduct = (p: Omit<Product, 'id' | 'createdAt'>): Product => {
    const newProduct: Product = {
      ...p,
      id: `prod-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    setWishlist((prev) => prev.filter((pid) => pid !== id));
  };

  const toggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, inStock: !item.inStock, stock: !item.inStock ? Math.max(1, item.stock) : 0 }
          : item
      )
    );
  };

  // Collections CRUD
  const addCollection = (col: Omit<Collection, 'id'>): Collection => {
    const newCol: Collection = {
      ...col,
      id: `col-${Date.now().toString(36)}`
    };
    setCollections((prev) => [...prev, newCol]);
    return newCol;
  };

  const updateCollection = (id: string, updates: Partial<Collection>) => {
    setCollections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const setActiveCollectionId = (id: string) => {
    setCollections((prev) =>
      prev.map((c) => ({
        ...c,
        active: c.id === id
      }))
    );
    const target = collections.find((c) => c.id === id);
    if (target && target.themeId) {
      applyThemePreset(target.themeId);
    }
  };

  // Themes
  const updateCurrentTheme = (updates: Partial<ThemeConfig>) => {
    setThemes((prev) =>
      prev.map((t) => (t.id === currentThemeId ? { ...t, ...updates } : t))
    );
  };

  const applyThemePreset = (themeId: string) => {
    const found = themes.find((t) => t.id === themeId);
    if (found) {
      setCurrentThemeId(themeId);
    }
  };

  // Cart operations
  const addToCart = (product: Product, size: Size, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, size, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: Size) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const updateCartQuantity = (productId: string, size: Size, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const orderNumber = `HOD-${1040 + orders.length + 1}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now().toString(36)}`,
      orderNumber,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);

    // Deduct stock
    orderData.items.forEach((item) => {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === item.productId) {
            const newStock = Math.max(0, p.stock - item.quantity);
            return {
              ...p,
              stock: newStock,
              inStock: newStock > 0
            };
          }
          return p;
        })
      );
    });

    // Update customer records
    addOrUpdateCustomerFromOrder(newOrder);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            orderStatus: status,
            ...(trackingNumber !== undefined ? { trackingNumber } : {})
          };
        }
        return ord;
      })
    );
  };

  // Customers
  const addOrUpdateCustomerFromOrder = (order: Order) => {
    const { customer, total } = order;
    setCustomers((prev) => {
      const existing = prev.find((c) => c.email.toLowerCase() === customer.email.toLowerCase());
      if (existing) {
        const totalSpent = existing.totalSpent + total;
        const totalOrders = existing.totalOrders + 1;
        const tier = totalSpent > 1000 ? 'Bespoke VIP' : totalOrders >= 2 ? 'Preferred' : 'New Client';
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalSpent,
                totalOrders,
                tier,
                phone: customer.phone || c.phone,
                city: customer.city || c.city,
                country: customer.country || c.country
              }
            : c
        );
      } else {
        const newCustomer: Customer = {
          id: `cust-${Date.now().toString(36)}`,
          name: customer.fullName,
          email: customer.email,
          phone: customer.phone,
          city: customer.city,
          country: customer.country,
          totalOrders: 1,
          totalSpent: total,
          tier: total > 1000 ? 'Bespoke VIP' : 'New Client',
          registeredDate: new Date().toISOString().split('T')[0]
        };
        return [newCustomer, ...prev];
      }
    });
  };

  const updateSettings = (updates: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  // Export full store database
  const exportStoreData = () => {
    const fullBackup = {
      version: '2.0',
      brand: 'HomedesignofDjadou',
      language,
      currency,
      exportedAt: new Date().toISOString(),
      products,
      collections,
      themes,
      currentThemeId,
      orders,
      customers,
      settings
    };

    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `homedesignofdjadou-store-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importStoreData = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      if (data.products && Array.isArray(data.products)) setProducts(data.products);
      if (data.collections && Array.isArray(data.collections)) setCollections(data.collections);
      if (data.themes && Array.isArray(data.themes)) setThemes(data.themes);
      if (data.currentThemeId) setCurrentThemeId(data.currentThemeId);
      if (data.orders && Array.isArray(data.orders)) setOrders(data.orders);
      if (data.customers && Array.isArray(data.customers)) setCustomers(data.customers);
      if (data.settings) setSettings(data.settings);
      if (data.language) setLanguage(data.language);
      if (data.currency) setCurrency(data.currency);
      return true;
    } catch (e) {
      console.error('Failed to import store data:', e);
      return false;
    }
  };

  const resetToFactoryDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCollections(INITIAL_COLLECTIONS);
    setThemes(INITIAL_THEMES);
    setCurrentThemeId(INITIAL_THEMES[0].id);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setSettings(DEFAULT_SETTINGS);
    setCart([]);
    setWishlist([]);
    setLanguage('fr');
    setCurrency('EUR');
  };

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        detectedLocation,
        t,
        getLocalizedName,
        getLocalizedTagline,
        getLocalizedDescription,
        getLocalizedComposition,
        getLocalizedDetails,
        getLocalizedCollectionName,
        getLocalizedCollectionTagline,
        getLocalizedCollectionDescription,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        collections,
        activeCollection,
        addCollection,
        updateCollection,
        setActiveCollectionId,
        themes,
        currentTheme,
        updateCurrentTheme,
        applyThemePreset,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartTotalCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        orders,
        createOrder,
        updateOrderStatus,
        customers,
        addOrUpdateCustomerFromOrder,
        currency,
        setCurrency,
        formatPrice,
        settings,
        updateSettings,
        exportStoreData,
        importStoreData,
        resetToFactoryDefaults,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAdminOpen,
        setIsAdminOpen,
        isFounderGuideOpen,
        setIsFounderGuideOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};

