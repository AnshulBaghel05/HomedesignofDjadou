import React, { useState } from 'react';
import {
  X,
  LayoutDashboard,
  Shirt,
  Layers,
  Palette,
  ShoppingBag,
  Users,
  CreditCard,
  Database,
  BookOpen,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Download,
  Upload,
  RefreshCw,
  Search,
  Globe
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, Order, OrderStatus } from '../../types/store';
import { ProductEditModal } from './ProductEditModal';
import { OrderInvoiceModal } from './OrderInvoiceModal';

type AdminTab =
  | 'overview'
  | 'products'
  | 'collections'
  | 'visual-identity'
  | 'orders'
  | 'customers'
  | 'payments'
  | 'ownership';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    deleteProduct,
    toggleStock,
    collections,
    activeCollection,
    setActiveCollectionId,
    themes,
    currentTheme,
    updateCurrentTheme,
    applyThemePreset,
    orders,
    updateOrderStatus,
    customers,
    formatPrice,
    settings,
    updateSettings,
    exportStoreData,
    importStoreData,
    resetToFactoryDefaults,
    setIsFounderGuideOpen,
    language,
    setLanguage,
    getLocalizedName,
    getLocalizedCollectionName
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [importStatus, setImportStatus] = useState<string>('');

  // Orders filters
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});

  if (!isAdminOpen) return null;

  // Overview metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || o.orderStatus === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importStoreData(content);
        if (success) {
          setImportStatus(
            language === 'fr'
              ? 'Base de données restaurée avec succès !'
              : 'Database successfully restored from JSON backup!'
          );
          setTimeout(() => setImportStatus(''), 4000);
        } else {
          setImportStatus(
            language === 'fr'
              ? 'Format de fichier de sauvegarde non valide.'
              : 'Invalid JSON backup file format.'
          );
        }
      }
    };
    reader.readAsText(file);
  };

  const isFr = language === 'fr';

  return (
    <div className="fixed inset-0 z-50 flex bg-black/75 backdrop-blur-xs overflow-hidden">
      <div className="relative w-full h-full flex flex-col bg-[#FAF9F6] text-neutral-900 overflow-hidden">
        {/* Top App Bar */}
        <div className="h-16 px-6 bg-white border-b border-black/10 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <span
              className="text-xl font-normal tracking-wide text-neutral-900"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              HOMEDESIGN OF DJADOU
            </span>
            <span className="text-neutral-300">|</span>
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
              {isFr ? 'Administration Atelier Paris' : 'Atelier Management Suite'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher in Admin */}
            <div className="flex items-center text-xs border border-neutral-300 bg-neutral-50 rounded">
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2.5 py-1 font-medium transition-colors ${
                  isFr ? 'bg-neutral-900 text-white font-semibold' : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title="Afficher l'administration en Français"
              >
                Français 🇫🇷
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 font-medium transition-colors ${
                  !isFr ? 'bg-neutral-900 text-white font-semibold' : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title="Display admin in English"
              >
                English 🇬🇧
              </button>
            </div>

            <button
              onClick={() => {
                setIsAdminOpen(false);
                setIsFounderGuideOpen(true);
              }}
              className="px-3 py-1.5 text-xs text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>{isFr ? 'Feuille de Route Fondateur' : 'Founder Roadmap & Guide'}</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>{isFr ? 'Retour Boutique' : 'Back to Storefront'}</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Admin Body (Sidebar + Content Stage) */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Tabs */}
          <aside className="w-56 sm:w-64 bg-white border-r border-black/10 flex flex-col justify-between flex-shrink-0">
            <div className="p-3 space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium rounded transition-colors text-left cursor-pointer ${
                  activeTab === 'overview' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{isFr ? "Vue d'Ensemble" : 'Atelier Overview'}</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded transition-colors text-left cursor-pointer ${
                  activeTab === 'products' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Shirt className="w-4 h-4" />
                  <span>{isFr ? 'Pièces & Stocks' : 'Products & Inventory'}</span>
                </div>
                <span className="text-[10px] font-mono tabular-nums opacity-75">{products.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('collections')}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded transition-colors text-left cursor-pointer ${
                  activeTab === 'collections' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4" />
                  <span>{isFr ? 'Collections & Saisons' : 'Collections'}</span>
                </div>
                <span className="text-[10px] font-mono tabular-nums opacity-75">{collections.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('visual-identity')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium rounded transition-colors text-left cursor-pointer ${
                  activeTab === 'visual-identity' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <Palette className="w-4 h-4 text-amber-500" />
                <span className="font-semibold">{isFr ? 'Identité & Thèmes' : 'Visual Identity & Themes'}</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded transition-colors text-left cursor-pointer ${
                  activeTab === 'orders' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isFr ? 'Commandes & Factures' : 'Orders & Invoices'}</span>
                </div>
                <span className="text-[10px] font-mono tabular-nums opacity-75">{orders.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('customers')}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded transition-colors text-left cursor-pointer ${
                  activeTab === 'customers' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>{isFr ? 'Fichier Clients VIP' : 'Customers CRM'}</span>
                </div>
                <span className="text-[10px] font-mono tabular-nums opacity-75">{customers.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium rounded transition-colors text-left cursor-pointer ${
                  activeTab === 'payments' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>{isFr ? 'Paiements & TVA' : 'Payments & Gateways'}</span>
              </button>

              <button
                onClick={() => setActiveTab('ownership')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium rounded transition-colors text-left cursor-pointer ${
                  activeTab === 'ownership' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>{isFr ? 'Données & Code Source' : 'Data & Code Ownership'}</span>
              </button>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-black/10 bg-neutral-50 text-[11px] text-neutral-500 space-y-1">
              <span className="font-semibold text-neutral-800 block">
                {isFr ? 'Architecture Souveraine :' : 'Sovereign Architecture:'}
              </span>
              <p>
                {isFr
                  ? 'Codebase Node + React autonome. 0% de commission mensuelle Shopify.'
                  : 'Independent Node + Vite React runtime. Zero Shopify monthly commissions.'}
              </p>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#FAF9F6]">
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8 max-w-6xl">
                <div>
                  <h2
                    className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {isFr ? 'Tableau de Bord Atelier' : 'Atelier Performance Dashboard'}
                  </h2>
                  <p className="text-xs text-neutral-500 font-light mt-1">
                    {isFr
                      ? 'Chiffre d’affaires en temps réel, état des stocks et commandes pour HomedesignofDjadou.'
                      : 'Live revenue, inventory levels, and orders for HomedesignofDjadou.'}
                  </p>
                </div>

                {/* 4 Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 bg-white border border-neutral-200 shadow-xs">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                      {isFr ? 'Ventes Totales Atelier' : 'Total Atelier Sales'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-semibold text-neutral-900 font-mono tabular-nums">
                      {formatPrice(totalRevenue)}
                    </span>
                    <span className="text-[11px] text-emerald-700 block mt-1">
                      {isFr ? 'Encaissées & Validées' : 'Authorized & Paid'}
                    </span>
                  </div>

                  <div className="p-5 bg-white border border-neutral-200 shadow-xs">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                      {isFr ? 'Total des Commandes' : 'Total Orders'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-semibold text-neutral-900 font-mono tabular-nums">
                      {totalOrdersCount}
                    </span>
                    <span className="text-[11px] text-neutral-500 block mt-1">
                      {isFr ? 'En cours et expédiées' : 'All fulfilled & processing'}
                    </span>
                  </div>

                  <div className="p-5 bg-white border border-neutral-200 shadow-xs">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                      {isFr ? 'Panier Moyen' : 'Average Order Value'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-semibold text-neutral-900 font-mono tabular-nums">
                      {formatPrice(avgOrderValue)}
                    </span>
                    <span className="text-[11px] text-neutral-500 block mt-1">
                      {isFr ? 'Par client' : 'Per transaction'}
                    </span>
                  </div>

                  <div className="p-5 bg-white border border-neutral-200 shadow-xs">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                      {isFr ? 'Pièces Actives' : 'Active Garments'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-semibold text-neutral-900 font-mono tabular-nums">
                      {products.filter((p) => p.inStock).length}
                    </span>
                    <span className="text-[11px] text-neutral-500 block mt-1">
                      {isFr ? 'Prêtes pour la confection' : 'Ready for tailoring'}
                    </span>
                  </div>
                </div>

                {/* Stock Alert if any */}
                {lowStockProducts.length > 0 && (
                  <div className="p-4 bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                    <span className="font-semibold block">
                      {isFr ? 'Alerte Stock Faible Atelier :' : 'Atelier Low Inventory Alert:'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {lowStockProducts.map((p) => (
                        <span key={p.id} className="bg-white px-2.5 py-1 border border-amber-300 font-mono">
                          {getLocalizedName(p)} — <strong>{p.stock} {isFr ? 'ex. restants' : 'left'}</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Orders Overview */}
                <div className="bg-white border border-neutral-200 p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
                      {isFr ? 'Commandes Récentes' : 'Recent Orders'}
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs text-neutral-600 hover:text-neutral-900 underline underline-offset-2 cursor-pointer"
                    >
                      {isFr ? 'Voir toutes les commandes' : 'View All Orders'}
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-neutral-200 text-neutral-400 uppercase tracking-wider">
                          <th className="pb-2 font-medium">{isFr ? 'Réf. Commande' : 'Order Ref'}</th>
                          <th className="pb-2 font-medium">{isFr ? 'Client' : 'Customer'}</th>
                          <th className="pb-2 font-medium">{isFr ? 'Pièces' : 'Items'}</th>
                          <th className="pb-2 font-medium">{isFr ? 'Montant' : 'Total'}</th>
                          <th className="pb-2 font-medium">{isFr ? 'Statut' : 'Status'}</th>
                          <th className="pb-2 font-medium text-right">{isFr ? 'Facture' : 'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 text-neutral-800">
                        {orders.slice(0, 5).map((ord) => (
                          <tr key={ord.id} className="hover:bg-neutral-50">
                            <td className="py-3 font-mono font-semibold">{ord.orderNumber}</td>
                            <td className="py-3">{ord.customer.fullName}</td>
                            <td className="py-3 text-neutral-500">
                              {ord.items.map((i) => `${i.productName} (${i.size})`).join(', ')}
                            </td>
                            <td className="py-3 font-mono tabular-nums font-semibold">{formatPrice(ord.total)}</td>
                            <td className="py-3">
                              <span className="capitalize px-2 py-0.5 text-[11px] font-medium bg-neutral-100 text-neutral-700">
                                {ord.orderStatus}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => setSelectedInvoiceOrder(ord)}
                                className="text-xs font-semibold text-neutral-900 hover:underline cursor-pointer"
                              >
                                {isFr ? 'Imprimer Facture' : 'Invoice'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PRODUCTS */}
            {activeTab === 'products' && (
              <div className="space-y-6 max-w-6xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
                  <div>
                    <h2
                      className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {isFr ? 'Catalogue & Inventaire des Pièces' : 'Garments & Inventory Catalog'}
                    </h2>
                    <p className="text-xs text-neutral-500 font-light mt-1">
                      {isFr
                        ? 'Gérez les tailles, pièces en stock, photographies de haute façon et tarifs.'
                        : 'Manage sizes, stock units, bespoke photography, and prices.'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setIsCreatingProduct(true);
                    }}
                    className="px-4 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isFr ? 'Créer une Nouvelle Pièce' : 'Create New Garment'}</span>
                  </button>
                </div>

                <div className="bg-white border border-neutral-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-500 uppercase tracking-wider font-semibold">
                          <th className="py-3 px-4">{isFr ? 'Pièce d’Atelier' : 'Garment'}</th>
                          <th className="py-3 px-4">{isFr ? 'Catégorie' : 'Category'}</th>
                          <th className="py-3 px-4">{isFr ? 'Tailles' : 'Sizes'}</th>
                          <th className="py-3 px-4">{isFr ? 'Prix' : 'Price'}</th>
                          <th className="py-3 px-4">{isFr ? 'Stock' : 'Stock Units'}</th>
                          <th className="py-3 px-4">{isFr ? 'Visibilité' : 'Status'}</th>
                          <th className="py-3 px-4 text-right">{isFr ? 'Actions' : 'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 text-neutral-800">
                        {products.map((p) => (
                          <tr key={p.id} className="hover:bg-neutral-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.images[0]}
                                  alt={getLocalizedName(p)}
                                  referrerPolicy="no-referrer"
                                  className="w-12 h-14 object-cover bg-neutral-100 flex-shrink-0"
                                />
                                <div>
                                  <span className="font-semibold text-neutral-900 block">
                                    {getLocalizedName(p)}
                                  </span>
                                  <span className="text-[11px] text-neutral-400 truncate max-w-xs block font-light">
                                    {p.taglineFr || p.tagline}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-neutral-600">{p.category}</td>
                            <td className="py-3 px-4 font-mono">{p.sizes.join(', ')}</td>
                            <td className="py-3 px-4 font-mono tabular-nums font-semibold">
                              {formatPrice(p.price)}
                            </td>
                            <td className="py-3 px-4 font-mono tabular-nums">
                              <span className={p.stock <= 5 ? 'text-amber-700 font-bold' : 'text-neutral-800'}>
                                {p.stock} {isFr ? 'en stock' : 'in stock'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => toggleStock(p.id)}
                                className={`px-2.5 py-1 text-[11px] font-semibold border transition-colors cursor-pointer ${
                                  p.inStock
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : 'bg-neutral-100 text-neutral-500 border-neutral-300'
                                }`}
                              >
                                {p.inStock ? (isFr ? 'Actif' : 'Active') : (isFr ? 'Archivé' : 'Archived')}
                              </button>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => {
                                    setEditingProduct(p);
                                    setIsCreatingProduct(true);
                                  }}
                                  className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                                  title="Modifier la pièce"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => deleteProduct(p.id)}
                                  className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                                  title="Supprimer la pièce"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: COLLECTIONS */}
            {activeTab === 'collections' && (
              <div className="space-y-6 max-w-6xl">
                <div className="pb-4 border-b border-neutral-200">
                  <h2
                    className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {isFr ? 'Gestion des Collections & Saisons' : 'Collections Management'}
                  </h2>
                  <p className="text-xs text-neutral-500 font-light mt-1">
                    {isFr
                      ? 'Regroupez les pièces en lancements saisonniers et assignez des identités visuelles.'
                      : 'Organize garments into seasonal releases and bind visual identities.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {collections.map((col) => {
                    const colProducts = products.filter((p) => p.collectionId === col.id);
                    return (
                      <div
                        key={col.id}
                        className={`bg-white border p-6 flex flex-col justify-between shadow-xs transition-all ${
                          activeCollection?.id === col.id ? 'border-neutral-900 ring-2 ring-neutral-900/10' : 'border-neutral-200'
                        }`}
                      >
                        <div>
                          <div className="aspect-[16/9] w-full overflow-hidden mb-4 bg-neutral-100 border border-black/5">
                            <img
                              src={col.bannerImage}
                              alt={col.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                              {col.seasonFr || col.season}
                            </span>
                            {activeCollection?.id === col.id && (
                              <span className="text-[10px] uppercase font-bold text-white bg-neutral-900 px-2 py-0.5">
                                {isFr ? 'Actif en Boutique' : 'Active on Storefront'}
                              </span>
                            )}
                          </div>

                          <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                            {getLocalizedCollectionName(col)}
                          </h3>
                          <p className="text-xs text-neutral-500 font-light mb-3">
                            {col.taglineFr || col.tagline}
                          </p>
                          <p className="text-xs text-neutral-700 leading-relaxed mb-4">
                            {col.descriptionFr || col.description}
                          </p>
                          <p className="text-xs font-mono text-neutral-500">
                            {colProducts.length} {isFr ? 'pièces assignées' : 'pieces assigned'}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-neutral-100 mt-4 flex items-center justify-between">
                          <button
                            onClick={() => setActiveCollectionId(col.id)}
                            disabled={activeCollection?.id === col.id}
                            className={`w-full py-2 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                              activeCollection?.id === col.id
                                ? 'bg-neutral-100 text-neutral-400 cursor-default'
                                : 'bg-neutral-900 text-white hover:bg-neutral-800'
                            }`}
                          >
                            {activeCollection?.id === col.id
                              ? isFr
                                ? 'Collection Actuelle'
                                : 'Currently Active'
                              : isFr
                              ? 'Définir comme Collection Active'
                              : 'Set as Active Collection'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: VISUAL IDENTITY & THEMES */}
            {activeTab === 'visual-identity' && (
              <div className="space-y-8 max-w-5xl">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
                    <Palette className="w-3.5 h-3.5" />
                    <span>{isFr ? 'Studio Sur-Mesure Djadou' : 'Client Demand Feature'}</span>
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {isFr ? "Studio d'Identité Visuelle par Collection" : 'Visual Identity Studio (Per Collection)'}
                  </h2>
                  <p className="text-xs text-neutral-500 font-light mt-1">
                    {isFr
                      ? 'Modifiez l’atmosphère visuelle, les palettes de couleurs, les polices de haute couture et la bannière pour chaque nouvelle collection.'
                      : 'Customize visual atmosphere, color palette, typography, and campaign photography for each new collection launch.'}
                  </p>
                </div>

                {/* Theme Preset Switcher */}
                <div className="bg-white border border-neutral-200 p-6 space-y-4">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-800">
                    {isFr ? 'Préréglages d’Identités d’Atelier' : 'Curated Collection Identity Presets'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {themes.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => applyThemePreset(t.id)}
                        className={`p-4 border cursor-pointer transition-all ${
                          currentTheme.id === t.id
                            ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                            : 'border-neutral-200 hover:border-neutral-400 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-neutral-900">
                            {isFr && t.nameFr ? t.nameFr : t.name}
                          </span>
                          {currentTheme.id === t.id && (
                            <CheckCircle className="w-4 h-4 text-neutral-900" />
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-500 font-light mb-3">{t.description}</p>

                        <div className="flex items-center gap-1.5 pt-2 border-t border-neutral-200">
                          <div
                            className="w-5 h-5 rounded-full border border-black/10"
                            style={{ backgroundColor: t.primaryColor }}
                            title="Couleur Principale"
                          />
                          <div
                            className="w-5 h-5 rounded-full border border-black/10"
                            style={{ backgroundColor: t.accentColor }}
                            title="Couleur d'Accent"
                          />
                          <div
                            className="w-5 h-5 rounded-full border border-black/10"
                            style={{ backgroundColor: t.backgroundColor }}
                            title="Fond Canvas"
                          />
                          <span className="text-[10px] text-neutral-400 ml-auto font-mono">
                            {t.fontDisplay}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Fine-Tuning Controls */}
                <div className="bg-white border border-neutral-200 p-6 space-y-6">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-800">
                    {isFr ? `Personnalisation Directe (${currentTheme.nameFr || currentTheme.name})` : `Live Fine-Tuning Controls (${currentTheme.name})`}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-2">
                        {isFr ? 'Couleur Texte & Titres' : 'Primary Tone'}
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={currentTheme.primaryColor}
                          onChange={(e) => updateCurrentTheme({ primaryColor: e.target.value })}
                          className="w-10 h-10 border border-neutral-300 cursor-pointer p-0.5 bg-white"
                        />
                        <span className="text-xs font-mono font-medium">{currentTheme.primaryColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-2">
                        {isFr ? 'Couleur d’Accent Atelier' : 'Accent Tone'}
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={currentTheme.accentColor}
                          onChange={(e) => updateCurrentTheme({ accentColor: e.target.value })}
                          className="w-10 h-10 border border-neutral-300 cursor-pointer p-0.5 bg-white"
                        />
                        <span className="text-xs font-mono font-medium">{currentTheme.accentColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-2">
                        {isFr ? 'Fond de Page (Canvas)' : 'Canvas Neutral'}
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={currentTheme.backgroundColor}
                          onChange={(e) => updateCurrentTheme({ backgroundColor: e.target.value })}
                          className="w-10 h-10 border border-neutral-300 cursor-pointer p-0.5 bg-white"
                        />
                        <span className="text-xs font-mono font-medium">{currentTheme.backgroundColor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hero Copy & Headlines */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1">
                        {isFr ? 'Badge Saisonnier Hero' : 'Hero Season Badge'}
                      </label>
                      <input
                        type="text"
                        value={isFr && currentTheme.heroBadgeFr ? currentTheme.heroBadgeFr : currentTheme.heroBadge}
                        onChange={(e) =>
                          updateCurrentTheme(
                            isFr
                              ? { heroBadgeFr: e.target.value, heroBadge: e.target.value }
                              : { heroBadge: e.target.value }
                          )
                        }
                        className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1">
                        {isFr ? 'Grand Titre Éditorial' : 'Hero Editorial Title'}
                      </label>
                      <input
                        type="text"
                        value={isFr && currentTheme.heroTitleFr ? currentTheme.heroTitleFr : currentTheme.heroTitle}
                        onChange={(e) =>
                          updateCurrentTheme(
                            isFr
                              ? { heroTitleFr: e.target.value, heroTitle: e.target.value }
                              : { heroTitle: e.target.value }
                          )
                        }
                        className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1">
                      {isFr ? 'Sous-titre / Manifeste' : 'Hero Subtitle / Manifesto'}
                    </label>
                    <textarea
                      rows={2}
                      value={isFr && currentTheme.heroSubtitleFr ? currentTheme.heroSubtitleFr : currentTheme.heroSubtitle}
                      onChange={(e) =>
                        updateCurrentTheme(
                          isFr
                            ? { heroSubtitleFr: e.target.value, heroSubtitle: e.target.value }
                            : { heroSubtitle: e.target.value }
                        )
                      }
                      className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  {/* Announcement Bar */}
                  <div className="pt-4 border-t border-neutral-200 space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-neutral-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentTheme.showAnnouncement}
                        onChange={(e) => updateCurrentTheme({ showAnnouncement: e.target.checked })}
                        className="accent-neutral-900"
                      />
                      <span>{isFr ? 'Afficher le bandeau d’annonces en haut de page' : 'Display Top Announcement Ticker Bar'}</span>
                    </label>

                    {currentTheme.showAnnouncement && (
                      <input
                        type="text"
                        value={isFr && currentTheme.announcementTextFr ? currentTheme.announcementTextFr : currentTheme.announcementText}
                        onChange={(e) =>
                          updateCurrentTheme(
                            isFr
                              ? { announcementTextFr: e.target.value, announcementText: e.target.value }
                              : { announcementText: e.target.value }
                          )
                        }
                        placeholder="Texte de l'annonce..."
                        className="w-full p-2 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6 max-w-6xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
                  <div>
                    <h2
                      className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {isFr ? 'Commandes & Expéditions' : 'Orders & Fulfillment Management'}
                    </h2>
                    <p className="text-xs text-neutral-500 font-light mt-1">
                      {isFr
                        ? 'Suivez les expéditions, assignez des numéros de suivi DHL/FedEx et imprimez les reçus.'
                        : 'Track deliveries, assign courier tracking numbers, and issue invoices.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        placeholder={isFr ? 'Filtrer par Réf. ou client...' : 'Filter by Order # or client...'}
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 w-52"
                      />
                    </div>

                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="text-xs p-1.5 bg-white border border-neutral-300 cursor-pointer"
                    >
                      <option value="all">{isFr ? 'Tous les statuts' : 'All Statuses'}</option>
                      <option value="processing">{isFr ? 'En cours' : 'Processing'}</option>
                      <option value="shipped">{isFr ? 'Expédiée' : 'Shipped'}</option>
                      <option value="delivered">{isFr ? 'Livrée' : 'Delivered'}</option>
                      <option value="cancelled">{isFr ? 'Annulée' : 'Cancelled'}</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white border border-neutral-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-500 uppercase tracking-wider font-semibold">
                          <th className="py-3 px-4">{isFr ? 'N° Commande' : 'Order #'}</th>
                          <th className="py-3 px-4">{isFr ? 'Date' : 'Date'}</th>
                          <th className="py-3 px-4">{isFr ? 'Client & Adresse' : 'Customer & Address'}</th>
                          <th className="py-3 px-4">{isFr ? 'Pièces' : 'Items'}</th>
                          <th className="py-3 px-4">{isFr ? 'Total' : 'Total'}</th>
                          <th className="py-3 px-4">{isFr ? 'Numéro de Suivi' : 'Tracking Number'}</th>
                          <th className="py-3 px-4">{isFr ? 'Statut' : 'Fulfillment Status'}</th>
                          <th className="py-3 px-4 text-right">{isFr ? 'Facture' : 'Invoice'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 text-neutral-800">
                        {filteredOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-neutral-50">
                            <td className="py-3 px-4 font-mono font-semibold">{ord.orderNumber}</td>
                            <td className="py-3 px-4 text-neutral-500 font-mono tabular-nums">
                              {new Date(ord.createdAt).toLocaleDateString(isFr ? 'fr-FR' : 'en-US')}
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-semibold block">{ord.customer.fullName}</span>
                              <span className="text-[11px] text-neutral-400 block">
                                {ord.customer.city}, {ord.customer.country}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="line-clamp-1 max-w-[200px] text-neutral-600 font-light">
                                {ord.items.map((i) => `${i.productName} (${i.size}) x${i.quantity}`).join(', ')}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-mono tabular-nums font-semibold">
                              {formatPrice(ord.total)}
                            </td>
                            <td className="py-3 px-4">
                              <input
                                type="text"
                                placeholder="FR-DHL-..."
                                value={trackingInputs[ord.id] !== undefined ? trackingInputs[ord.id] : (ord.trackingNumber || '')}
                                onChange={(e) => setTrackingInputs((prev) => ({ ...prev, [ord.id]: e.target.value }))}
                                onBlur={() => {
                                  if (trackingInputs[ord.id] !== undefined) {
                                    updateOrderStatus(ord.id, ord.orderStatus, trackingInputs[ord.id]);
                                  }
                                }}
                                className="w-28 p-1 text-[11px] font-mono border border-neutral-300 focus:outline-none"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={ord.orderStatus}
                                onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                                className="text-[11px] p-1 border border-neutral-300 bg-white font-medium cursor-pointer"
                              >
                                <option value="processing">{isFr ? 'En cours' : 'Processing'}</option>
                                <option value="shipped">{isFr ? 'Expédiée' : 'Shipped'}</option>
                                <option value="delivered">{isFr ? 'Livrée' : 'Delivered'}</option>
                                <option value="cancelled">{isFr ? 'Annulée' : 'Cancelled'}</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => setSelectedInvoiceOrder(ord)}
                                className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold rounded transition-colors cursor-pointer"
                              >
                                {isFr ? 'Voir Facture' : 'View Invoice'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CUSTOMERS */}
            {activeTab === 'customers' && (
              <div className="space-y-6 max-w-6xl">
                <div className="pb-4 border-b border-neutral-200">
                  <h2
                    className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {isFr ? 'Fichier Clients & CRM Atelier' : 'Customer Directory & VIP CRM'}
                  </h2>
                  <p className="text-xs text-neutral-500 font-light mt-1">
                    {isFr
                      ? 'Profils des clientes du salon privé, valeur à vie et historique des commandes.'
                      : 'Manage client profiles, private salon bookings, and customer lifetime value.'}
                  </p>
                </div>

                <div className="bg-white border border-neutral-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-500 uppercase tracking-wider font-semibold">
                          <th className="py-3 px-4">{isFr ? 'Nom de la Cliente' : 'Client Name'}</th>
                          <th className="py-3 px-4">{isFr ? 'Contact' : 'Contact'}</th>
                          <th className="py-3 px-4">{isFr ? 'Ville & Pays' : 'Location'}</th>
                          <th className="py-3 px-4">{isFr ? 'Commandes' : 'Total Orders'}</th>
                          <th className="py-3 px-4">{isFr ? 'Dépenses Totales' : 'Lifetime Spend'}</th>
                          <th className="py-3 px-4">{isFr ? 'Statut Privilège' : 'Atelier Tier'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 text-neutral-800">
                        {customers.map((c) => (
                          <tr key={c.id} className="hover:bg-neutral-50">
                            <td className="py-3 px-4 font-semibold text-neutral-900">{c.name}</td>
                            <td className="py-3 px-4 text-neutral-600">
                              <div>{c.email}</div>
                              <div className="text-[11px] text-neutral-400">{c.phone}</div>
                            </td>
                            <td className="py-3 px-4 text-neutral-600">
                              {c.city}, {c.country}
                            </td>
                            <td className="py-3 px-4 font-mono tabular-nums">{c.totalOrders}</td>
                            <td className="py-3 px-4 font-mono tabular-nums font-semibold">
                              {formatPrice(c.totalSpent)}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2.5 py-0.5 text-[11px] font-semibold border ${
                                  c.tier === 'Bespoke VIP'
                                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                                    : 'bg-neutral-100 text-neutral-700 border-neutral-300'
                                }`}
                              >
                                {c.tier}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PAYMENTS */}
            {activeTab === 'payments' && (
              <div className="space-y-6 max-w-4xl">
                <div className="pb-4 border-b border-neutral-200">
                  <h2
                    className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {isFr ? 'Passerelles de Paiement & TVA' : 'Payment Gateways & Taxes'}
                  </h2>
                  <p className="text-xs text-neutral-500 font-light mt-1">
                    {isFr
                      ? 'Activez les moyens de règlement, ajustez le taux de TVA et le seuil de livraison offerte.'
                      : 'Toggle active payment methods, set tax percentages, and configure delivery thresholds.'}
                  </p>
                </div>

                <div className="bg-white border border-neutral-200 p-6 space-y-6">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-800">
                    {isFr ? 'Moyens de Paiement Actifs' : 'Active Storefront Gateways'}
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 border border-neutral-200 bg-neutral-50">
                      <div>
                        <span className="font-semibold text-xs text-neutral-900">
                          {isFr ? 'Carte Bancaire Directe (Stripe)' : 'Direct Credit / Debit Card (Stripe)'}
                        </span>
                        <p className="text-[11px] text-neutral-500">
                          {isFr ? 'Visa, Mastercard, Amex avec authentification 3D Secure' : 'Accepts Visa, Mastercard, Amex with 3D Secure'}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.enableCard}
                        onChange={(e) => updateSettings({ enableCard: e.target.checked })}
                        className="accent-neutral-900 w-4 h-4 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 border border-neutral-200 bg-neutral-50">
                      <div>
                        <span className="font-semibold text-xs text-neutral-900">Apple Pay Express</span>
                        <p className="text-[11px] text-neutral-500">
                          {isFr ? 'Paiement instantané sur iPhone & Safari' : 'One-tap mobile biometrics for iOS / Safari'}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.enableApplePay}
                        onChange={(e) => updateSettings({ enableApplePay: e.target.checked })}
                        className="accent-neutral-900 w-4 h-4 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 border border-neutral-200 bg-neutral-50">
                      <div>
                        <span className="font-semibold text-xs text-neutral-900">PayPal Express Checkout</span>
                        <p className="text-[11px] text-neutral-500">
                          {isFr ? 'Protection des acheteurs et solde PayPal' : 'Global buyer protection and PayPal balance'}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.enablePaypal}
                        onChange={(e) => updateSettings({ enablePaypal: e.target.checked })}
                        className="accent-neutral-900 w-4 h-4 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 border border-neutral-200 bg-neutral-50">
                      <div>
                        <span className="font-semibold text-xs text-neutral-900">
                          {isFr ? 'Virement Bancaire IBAN & Paiement Coursier' : 'Atelier Bank Wire & Cash on Delivery (COD)'}
                        </span>
                        <p className="text-[11px] text-neutral-500">
                          {isFr ? 'Virement bancaire français ou paiement direct coursier' : 'Direct courier verification or European IBAN wire'}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.enableCod}
                        onChange={(e) => updateSettings({ enableCod: e.target.checked })}
                        className="accent-neutral-900 w-4 h-4 cursor-pointer"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1">
                        {isFr ? 'Taux de TVA (%)' : 'Sales Tax Rate (%)'}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={settings.taxRatePercent}
                        onChange={(e) => updateSettings({ taxRatePercent: parseFloat(e.target.value) || 0 })}
                        className="w-full p-2.5 text-xs bg-white border border-neutral-300 font-mono tabular-nums"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1">
                        {isFr ? 'Seuil de Livraison Offerte (€)' : 'Complimentary Shipping Threshold ($)'}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={settings.freeShippingThreshold}
                        onChange={(e) => updateSettings({ freeShippingThreshold: parseFloat(e.target.value) || 0 })}
                        className="w-full p-2.5 text-xs bg-white border border-neutral-300 font-mono tabular-nums"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: DATA & CODE OWNERSHIP */}
            {activeTab === 'ownership' && (
              <div className="space-y-6 max-w-4xl">
                <div className="pb-4 border-b border-neutral-200">
                  <h2
                    className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {isFr ? 'Souveraineté des Données & Code Source' : 'Data Sovereignty & Code Ownership'}
                  </h2>
                  <p className="text-xs text-neutral-500 font-light mt-1">
                    {isFr
                      ? 'Vous êtes 100% propriétaire de HomedesignofDjadou. Exportez tous les enregistrements ou migrez librement.'
                      : 'You own 100% of HomedesignofDjadou. Export all store records, restore backups, or migrate anywhere.'}
                  </p>
                </div>

                <div className="bg-white border border-neutral-200 p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-neutral-100 rounded">
                      <Download className="w-6 h-6 text-neutral-800" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-neutral-900">
                        {isFr ? 'Exporter la Base de Données Complète (.JSON)' : 'Export Full Store Database (.JSON)'}
                      </h3>
                      <p className="text-xs text-neutral-500 font-light mt-1 leading-relaxed">
                        {isFr
                          ? 'Télécharge chaque pièce, collection, thème personnalisé, commande et cliente dans un fichier JSON standard et indépendant.'
                          : 'Downloads every product, collection, theme setting, and order history into a portable JSON archive.'}
                      </p>
                      <button
                        onClick={exportStoreData}
                        className="mt-3 px-5 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isFr ? 'Télécharger l’Archive Complète' : 'Download Complete Store Archive'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-200 flex items-start gap-4">
                    <div className="p-3 bg-neutral-100 rounded">
                      <Upload className="w-6 h-6 text-neutral-800" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-neutral-900">
                        {isFr ? 'Restaurer une Sauvegarde (.JSON)' : 'Restore Store From Backup (.JSON)'}
                      </h3>
                      <p className="text-xs text-neutral-500 font-light mt-1 leading-relaxed">
                        {isFr
                          ? 'Importez et restaurez vos pièces et commandes depuis un fichier de sauvegarde.'
                          : 'Restore or import store catalog and orders from an exported JSON file.'}
                      </p>
                      <label className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-300 text-xs font-semibold uppercase tracking-wider hover:bg-neutral-100 transition-colors cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isFr ? 'Choisir un Fichier' : 'Choose Backup File'}</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      {importStatus && (
                        <p className="text-xs text-emerald-700 font-medium mt-2">{importStatus}</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-200 flex items-start gap-4">
                    <div className="p-3 bg-red-50 rounded">
                      <RefreshCw className="w-6 h-6 text-red-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-neutral-900">
                        {isFr ? 'Réinitialiser la Démonstration d’Atelier' : 'Reset to Initial Atelier Demo State'}
                      </h3>
                      <p className="text-xs text-neutral-500 font-light mt-1 leading-relaxed">
                        {isFr
                          ? 'Rétablit les créations, commandes et thèmes par défaut de la boutique.'
                          : 'Reverts all products, demo orders, and themes back to the pristine initial state.'}
                      </p>
                      <button
                        onClick={() => {
                          const msg = isFr
                            ? 'Réinitialiser la boutique avec les données de démonstration d’origine ?'
                            : 'Reset store to default demo products and orders?';
                          if (window.confirm(msg)) {
                            resetToFactoryDefaults();
                          }
                        }}
                        className="mt-3 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        {isFr ? 'Réinitialiser la Boutique' : 'Reset Store State'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Edit or Create Product Modal */}
      {isCreatingProduct && (
        <ProductEditModal
          product={editingProduct}
          onClose={() => {
            setIsCreatingProduct(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Printable Invoice Modal */}
      {selectedInvoiceOrder && (
        <OrderInvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
};
