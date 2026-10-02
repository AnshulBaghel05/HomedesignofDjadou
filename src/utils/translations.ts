import { Language } from '../types/store';

export interface TranslationDictionary {
  // Navigation
  navCollections: string;
  navPieces: string;
  navLookbook: string;
  navCraft: string;
  navRoadmap: string;
  adminPortal: string;
  shoppingBag: string;

  // Hero
  heroMadeToOrder: string;
  heroExploreCta: string;
  heroCraftCta: string;
  heroActiveCollection: string;
  heroScrollToPieces: string;
  customizeVisualIdentity: string;

  // Catalog & Filter
  catalogKicker: string;
  catalogSeason: string;
  allCategories: string;
  searchPlaceholder: string;
  sortBy: string;
  sortFeatured: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  sortNewest: string;
  resetFilters: string;
  noPiecesFound: string;
  inAtelier: string;
  madeToOrder: string;
  onlyXLeft: string;
  soldOut: string;
  addToBag: string;
  addedToBag: string;
  quickView: string;
  selectSize: string;
  quantity: string;
  sizeGuide: string;
  instantCheckout: string;
  taxesIncluded: string;
  expressCourier: string;
  fullOwnership: string;
  atelierReturns: string;

  // Cart
  cartTitle: string;
  freeShippingNotice: string;
  freeShippingUnlocked: string;
  emptyBag: string;
  emptyBagSub: string;
  discoverPieces: string;
  promoPlaceholder: string;
  applyPromo: string;
  promoApplied: string;
  invalidPromo: string;
  subtotal: string;
  discount: string;
  delivery: string;
  complimentary: string;
  tax: string;
  total: string;
  proceedCheckout: string;
  securedBadge: string;

  // Checkout
  checkoutTitle: string;
  checkoutSub: string;
  stepDelivery: string;
  stepPayment: string;
  clientContact: string;
  prefillDemo: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryCourier: string;
  whiteGloveDelivery: string;
  whiteGloveDesc: string;
  expressAirDelivery: string;
  expressAirDesc: string;
  fittingNotes: string;
  continueToPayment: string;
  editShipping: string;
  selectPaymentGateway: string;
  creditCard: string;
  directCardProcessing: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  applePayAvailable: string;
  applePayDesc: string;
  paypalAvailable: string;
  paypalDesc: string;
  bankWireAvailable: string;
  bankWireDesc: string;
  authorizingOrder: string;
  confirmOrder: string;
  orderSummary: string;
  orderConfirmed: string;
  orderThankYou: string;
  orderDispatchedEmail: string;
  printReceipt: string;
  viewInAdmin: string;
  returnToStore: string;

  // Sizing
  sizeGuideTitle: string;
  sizeGuideDesc: string;
  customFittingNote: string;
  closeGuide: string;

  // Brand Story
  manifestoKicker: string;
  storyTitle: string;
  storyP1: string;
  storyP2: string;
  statFibers: string;
  statRuns: string;
  statWaste: string;
  archDrafting: string;
  archDraftingDesc: string;
  sensoryTextiles: string;
  sensoryTextilesDesc: string;
  lookbookKicker: string;
  lookbookTitle: string;
  lookbookDesc: string;
  testimonialQuote: string;
  testimonialAuthor: string;

  // Footer
  footerDesc: string;
  sovereignStorefront: string;
  atelierConcierge: string;
  salonTitle: string;
  salonDesc: string;
  salonPlaceholder: string;
  salonJoin: string;
  salonSuccess: string;
  allRightsReserved: string;

  // Location banner
  locationDetectedFr: string;
  locationDetectedEn: string;
  changeLanguage: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  fr: {
    // Navigation
    navCollections: 'Collections',
    navPieces: "Pièces d'Atelier",
    navLookbook: 'Lookbook',
    navCraft: 'Notre Savoir-Faire',
    navRoadmap: 'Feuille de Route',
    adminPortal: 'Gestion Atelier',
    shoppingBag: 'Panier',

    // Hero
    heroMadeToOrder: 'Créations Sur-Mesure & Éditions Limitées',
    heroExploreCta: 'Découvrir la Collection',
    heroCraftCta: "Philosophie d'Atelier",
    heroActiveCollection: 'Collection Active :',
    heroScrollToPieces: 'Voir les pièces',
    customizeVisualIdentity: "Personnaliser l'Identité Visuelle",

    // Catalog & Filter
    catalogKicker: 'Garde-robe de Haute Façon',
    catalogSeason: 'Saison 2026',
    allCategories: 'Toutes les Pièces',
    searchPlaceholder: 'Rechercher soie, laine, manteau...',
    sortBy: 'Trier par :',
    sortFeatured: 'Sélection Atelier',
    sortPriceAsc: 'Prix : Croissant',
    sortPriceDesc: 'Prix : Décroissant',
    sortNewest: 'Nouveautés',
    resetFilters: 'Réinitialiser les filtres',
    noPiecesFound: 'Aucune pièce ne correspond à vos critères.',
    inAtelier: "En Atelier",
    madeToOrder: 'Sur-Mesure',
    onlyXLeft: 'Plus que {x} pièces',
    soldOut: 'Épuisé',
    addToBag: 'Ajouter au Panier',
    addedToBag: 'Ajouté au Panier',
    quickView: 'Aperçu Détail',
    selectSize: 'Choisir la Taille :',
    quantity: 'Quantité :',
    sizeGuide: 'Guide des Tailles & Mensurations',
    instantCheckout: 'Commande Immédiate Sur-Mesure',
    taxesIncluded: 'Taxes incluses · Coursier express offert',
    expressCourier: 'Livraison Sécurisée',
    fullOwnership: 'Code & Données 100% Souverains',
    atelierReturns: 'Retours sous 14 jours',

    // Cart
    cartTitle: 'Mon Panier',
    freeShippingNotice: 'Ajoutez {x} pour débloquer la livraison offerte.',
    freeShippingUnlocked: '✦ Livraison express offerte débloquée !',
    emptyBag: 'Votre panier est actuellement vide.',
    emptyBagSub: 'Découvrez notre vestiaire artisanal sur-mesure.',
    discoverPieces: 'Découvrir les Créations',
    promoPlaceholder: 'Code privilège (ex : DJADOU10)',
    applyPromo: 'Appliquer',
    promoApplied: 'Remise Privilège Atelier de 10% appliquée !',
    invalidPromo: 'Code atelier invalide. Essayez "DJADOU10"',
    subtotal: 'Sous-total',
    discount: 'Remise Privilège',
    delivery: 'Livraison Atelier',
    complimentary: 'Offerte',
    tax: 'TVA Estimée',
    total: 'Total Estimé',
    proceedCheckout: 'Procéder au Paiement Sécurisé',
    securedBadge: 'Paiement SSL 256-bit · HomedesignofDjadou Paris',

    // Checkout
    checkoutTitle: 'Conciergerie HomedesignofDjadou',
    checkoutSub: 'Paiement Atelier Indépendant',
    stepDelivery: '1. Coordonnées & Livraison',
    stepPayment: '2. Choix du Paiement',
    clientContact: 'Coordonnées & Adresse du Client',
    prefillDemo: 'Pré-remplir les données de démonstration',
    fullName: 'Nom Complet *',
    email: 'Adresse E-mail *',
    phone: 'Numéro de Téléphone',
    country: 'Pays / Territoire *',
    address: 'Adresse Postale *',
    city: 'Ville *',
    postalCode: 'Code Postal *',
    deliveryCourier: 'Mode de Livraison',
    whiteGloveDelivery: 'Livraison Standard Gants Blancs',
    whiteGloveDesc: '3-5 jours ouvrés · Remise contre signature',
    expressAirDelivery: 'Livraison Prioritaire Aérienne Express',
    expressAirDesc: '1-2 jours ouvrés en express international',
    fittingNotes: "Notes d'Ajustement / Emballage Cadeau Atelier",
    continueToPayment: 'Continuer vers le Paiement',
    editShipping: "Modifier l'adresse",
    selectPaymentGateway: 'Sélectionnez votre moyen de paiement',
    creditCard: 'Carte Bancaire',
    directCardProcessing: 'Paiement Carte Sécurisé (Passerelle Stripe)',
    cardNumber: 'Numéro de Carte',
    expiry: 'Date d’expiration',
    cvc: 'Cryptogramme (CVC)',
    applePayAvailable: 'Apple Pay Express Prêt',
    applePayDesc: 'Validation biométrique sécurisée via TouchID / FaceID.',
    paypalAvailable: 'Paiement PayPal Sécurisé',
    paypalDesc: 'Protection des achats et solde PayPal disponible.',
    bankWireAvailable: 'Virement Bancaire / Paiement à la Livraison',
    bankWireDesc: 'Règlement par virement IBAN français ou paiement auprès du coursier.',
    authorizingOrder: 'Autorisation de la commande en cours...',
    confirmOrder: 'Confirmer la Commande — {total}',
    orderSummary: 'Récapitulatif de la Commande',
    orderConfirmed: 'Commande Confirmée · Réf. {ref}',
    orderThankYou: 'Merci, {name}',
    orderDispatchedEmail: 'Nos tailleurs préparent vos pièces dans notre atelier. Un reçu a été expédié à {email}.',
    printReceipt: 'Imprimer la Facture',
    viewInAdmin: "Voir dans l'Espace Gestion",
    returnToStore: 'Retourner à la Boutique',

    // Sizing
    sizeGuideTitle: "Guide des Tailles & Proportions d'Atelier",
    sizeGuideDesc: "Chaque pièce HomedesignofDjadou est façonnée avec une coupe tailleur précise. Nous recommandons de prendre vos mesures pour un tombé parfait.",
    customFittingNote: "Service Sur-Mesure : Si vos mensurations s'étendent sur plusieurs tailles ou si vous souhaitez un ourlet personnalisé, indiquez vos mesures dans les commentaires de commande.",
    closeGuide: 'Fermer le Guide',

    // Brand Story
    manifestoKicker: "Manifeste d'Atelier · HomedesignofDjadou",
    storyTitle: 'Précision Silencieuse, Âme Sur-Mesure, Grâce Intemporelle.',
    storyP1: "HomedesignofDjadou est née d'une conviction profonde : le vêtement ne doit pas répondre à des cycles jetables, mais constituer une extension architecturale de soi. Nous refusons les stocks massifs et les raccourcis synthétiques.",
    storyP2: "Chaque création débute avec des matières nobles et tactiles : soie de mûrier pure lavée au sable, cachemire mongol non mélangé et laine vierge de chameau structurée. Chaque coupe est pensée pour durer une vie entière.",
    statFibers: 'Fibres Nobles Naturelles',
    statRuns: 'Pièces Max par Série',
    statWaste: 'Déchets Synthétiques',
    archDrafting: 'Patronage Architectural',
    archDraftingDesc: 'Drapé à la main sur mannequins de haute couture pour garantir fluidité et aisance.',
    sensoryTextiles: 'Matières Sensorielles',
    sensoryTextilesDesc: 'Tissées exclusivement au sein de manufactures patrimoniales européennes et asiatiques.',
    lookbookKicker: 'Lookbook de Saison',
    lookbookTitle: "Dans la Lumière de l'Atelier",
    lookbookDesc: 'Le dialogue harmonieux entre la rigueur de la laine et la fluidité de la soie de mûrier.',
    testimonialQuote: "« La tenue de la laine de chameau et le tombé fluide de la soie rivalisent avec les salons parisiens de haute couture, tout en offrant une aisance quotidienne remarquable. »",
    testimonialAuthor: 'Camille Laurent · Historienne d’Architecture, Paris',

    // Footer
    footerDesc: "Atelier de mode et confection sur-mesure confectionnant des séries numérotées en matières nobles. Plateforme 100% indépendante, sans dépendance Shopify.",
    sovereignStorefront: 'Plateforme E-Commerce Souveraine',
    atelierConcierge: 'Conciergerie Atelier',
    salonTitle: 'Correspondance du Salon Privé',
    salonDesc: 'Recevez nos invitations pour les lancements de capsules et séances d’essayages privées.',
    salonPlaceholder: 'Votre adresse e-mail',
    salonJoin: 'Rejoindre',
    salonSuccess: 'Bienvenue. Vous êtes désormais inscrit(e) au registre de notre salon privé.',
    allRightsReserved: 'Tous droits réservés. Codebase & domaine indépendants.',

    // Location banner
    locationDetectedFr: '🇫🇷 Boutique paramétrée en Français pour la France',
    locationDetectedEn: 'Location detected · Displaying in English',
    changeLanguage: 'Changer la langue'
  },
  en: {
    // Navigation
    navCollections: 'Collections',
    navPieces: 'Atelier Pieces',
    navLookbook: 'Lookbook',
    navCraft: 'Our Craft',
    navRoadmap: 'Project Roadmap',
    adminPortal: 'Atelier Admin',
    shoppingBag: 'Bag',

    // Hero
    heroMadeToOrder: 'Bespoke Made-to-Order & Limited Editions',
    heroExploreCta: 'Explore Collection',
    heroCraftCta: 'Atelier Philosophy',
    heroActiveCollection: 'Active Collection:',
    heroScrollToPieces: 'Scroll to Pieces',
    customizeVisualIdentity: 'Customize Visual Identity',

    // Catalog & Filter
    catalogKicker: 'Atelier Wardrobe',
    catalogSeason: 'Season 2026',
    allCategories: 'All Pieces',
    searchPlaceholder: 'Search silk, cashmere, coat...',
    sortBy: 'Sort by:',
    sortFeatured: 'Featured Atelier',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    sortNewest: 'Newest Releases',
    resetFilters: 'Reset Filters',
    noPiecesFound: 'No atelier pieces match your criteria.',
    inAtelier: 'In Atelier',
    madeToOrder: 'Made to Order',
    onlyXLeft: 'Only {x} Left',
    soldOut: 'Sold Out',
    addToBag: 'Add to Bag',
    addedToBag: 'Added to Bag',
    quickView: 'Quick View',
    selectSize: 'Select Size:',
    quantity: 'Quantity:',
    sizeGuide: 'Size & Measurement Guide',
    instantCheckout: 'Instant Bespoke Checkout',
    taxesIncluded: 'Taxes included · Free atelier express',
    expressCourier: 'Express Courier',
    fullOwnership: '100% Data & Code Ownership',
    atelierReturns: '14-Day Atelier Returns',

    // Cart
    cartTitle: 'Shopping Bag',
    freeShippingNotice: 'Add {x} more for complimentary express delivery.',
    freeShippingUnlocked: '✦ Complimentary global express shipping unlocked!',
    emptyBag: 'Your bag is currently empty.',
    emptyBagSub: 'Explore our curated seasonal wardrobe.',
    discoverPieces: 'Discover Pieces',
    promoPlaceholder: 'Promo code (try DJADOU10)',
    applyPromo: 'Apply',
    promoApplied: '10% VIP Atelier Courtesy Discount Applied!',
    invalidPromo: 'Invalid atelier code. Try "DJADOU10"',
    subtotal: 'Subtotal',
    discount: 'VIP Courtesy Discount',
    delivery: 'Atelier Delivery',
    complimentary: 'Complimentary',
    tax: 'Estimated Tax',
    total: 'Estimated Total',
    proceedCheckout: 'Proceed to Bespoke Checkout',
    securedBadge: 'SSL Secured · Handcrafted by HomedesignofDjadou',

    // Checkout
    checkoutTitle: 'HomedesignofDjadou Concierge Checkout',
    checkoutSub: 'Independent Atelier Checkout',
    stepDelivery: '1. Delivery Details',
    stepPayment: '2. Payment Method',
    clientContact: 'Client Contact & Shipping',
    prefillDemo: 'Pre-fill Sample Client Info',
    fullName: 'Full Name *',
    email: 'Email Address *',
    phone: 'Phone Number',
    country: 'Country / Territory *',
    address: 'Street Address *',
    city: 'City *',
    postalCode: 'Postal / ZIP Code *',
    deliveryCourier: 'Delivery Courier',
    whiteGloveDelivery: 'Atelier White-Glove Standard',
    whiteGloveDesc: '3-5 business days · Insured signature delivery',
    expressAirDelivery: 'Priority Express Air Courier',
    expressAirDesc: '1-2 business days worldwide',
    fittingNotes: 'Bespoke Fitting Notes / Packaging Requests',
    continueToPayment: 'Continue to Payment',
    editShipping: 'Edit Shipping',
    selectPaymentGateway: 'Select Payment Gateway',
    creditCard: 'Credit Card',
    directCardProcessing: 'Direct Card Processing (Stripe Gateway)',
    cardNumber: 'Card Number',
    expiry: 'Expiry',
    cvc: 'CVC',
    applePayAvailable: 'Apple Pay Express Available',
    applePayDesc: 'Biometric authorization with FaceID / TouchID will be prompted.',
    paypalAvailable: 'PayPal Secure Checkout',
    paypalDesc: 'Instant buyer protection on all HomedesignofDjadou pieces.',
    bankWireAvailable: 'Atelier Bank Wire / Cash on Delivery',
    bankWireDesc: 'Settled directly upon courier delivery or via European IBAN.',
    authorizingOrder: 'Authorizing Bespoke Order...',
    confirmOrder: 'Confirm & Place Order — {total}',
    orderSummary: 'Order Summary',
    orderConfirmed: 'Order Confirmed · Reference {ref}',
    orderThankYou: 'Thank You, {name}',
    orderDispatchedEmail: 'We have received your order. A receipt has been dispatched to {email}.',
    printReceipt: 'Print Order Receipt',
    viewInAdmin: 'View in Admin Order Manager',
    returnToStore: 'Return to Store',

    // Sizing
    sizeGuideTitle: 'Atelier Sizing & Proportions',
    sizeGuideDesc: 'Every HomedesignofDjadou piece is sculpted with precision tailoring. We recommend taking measurements for a refined bespoke fit.',
    customFittingNote: 'Custom Made-to-Measure Service: If your proportions fall across multiple sizes, note your exact measurements in the order comments.',
    closeGuide: 'Close Guide',

    // Brand Story
    manifestoKicker: 'Atelier Manifesto · HomedesignofDjadou',
    storyTitle: 'Quiet Precision, Bespoke Soul, Endless Relevance.',
    storyP1: 'HomedesignofDjadou was founded on a pure premise: clothing should not be disposable trend cycles, but architectural extensions of personal dignity.',
    storyP2: 'Each garment begins with tactile noble textiles: pure sandwashed mulberry silks, unblended Mongolian cashmere, and structured virgin camel wool.',
    statFibers: 'Natural Noble Fibers',
    statRuns: 'Pieces Per Atelier Run',
    statWaste: 'Synthetic Waste',
    archDrafting: 'Architectural Drafting',
    archDraftingDesc: 'Hand-draped on traditional dress forms to ensure fluid movement.',
    sensoryTextiles: 'Sensory Textiles',
    sensoryTextilesDesc: 'Sourced exclusively from certified historic European and Asian weaving houses.',
    lookbookKicker: 'Seasonal Lookbook',
    lookbookTitle: 'In the Light of the Atelier',
    lookbookDesc: 'Capturing the interplay between structural wool tailoring and gossamer mulberry silk.',
    testimonialQuote: '"The weight of the camel wool and the hand-finished drape of the silk are on par with private salon couture in Paris."',
    testimonialAuthor: 'Camille Laurent · Architectural Historian, Paris',

    // Footer
    footerDesc: 'An independent bespoke fashion atelier crafting limited-run garments in natural noble textiles. Built with full sovereignty—no third-party store subscriptions.',
    sovereignStorefront: '100% Self-Owned E-Commerce',
    atelierConcierge: 'Atelier Concierge',
    salonTitle: 'Private Salon Dispatches',
    salonDesc: 'Receive private invitations to seasonal capsule drops and bespoke fittings.',
    salonPlaceholder: 'Enter your email',
    salonJoin: 'Join',
    salonSuccess: 'Bienvenue. You have been added to the private salon registry.',
    allRightsReserved: 'All rights reserved. Sovereign codebase & domain.',

    // Location banner
    locationDetectedFr: '🇫🇷 French location detected · Store displayed in French',
    locationDetectedEn: 'Location detected · Displaying in English',
    changeLanguage: 'Switch Language'
  }
};

/**
 * Detect location / browser language
 * If locale or timezone points to France, French territories, or francophone zones, default to 'fr'.
 */
export function detectUserLanguage(): { language: Language; isFrance: boolean } {
  try {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return { language: 'fr', isFrance: true };
    }

    const browserLang = (navigator.language || (navigator as any).userLanguage || '').toLowerCase();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';

    const isFrenchLocale =
      browserLang.startsWith('fr') ||
      timeZone.includes('Paris') ||
      timeZone.includes('Brussels') ||
      timeZone.includes('Monaco') ||
      timeZone.includes('Zurich') ||
      timeZone.includes('Casablanca');

    // Store is specifically built for a French boutique owner, so if detected or by default, prefer French
    return {
      language: isFrenchLocale ? 'fr' : 'en',
      isFrance: isFrenchLocale
    };
  } catch (e) {
    return { language: 'fr', isFrance: true };
  }
}
