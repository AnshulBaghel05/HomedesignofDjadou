import { Product, Collection, ThemeConfig, Order, Customer } from '../types/store';
import heroImg from '../assets/images/djadou_hero_collection.jpg';
import trenchImg from '../assets/images/djadou_wool_trench.jpg';
import blouseImg from '../assets/images/djadou_silk_blouse.jpg';
import trousersImg from '../assets/images/djadou_pleated_trousers.jpg';
import knitImg from '../assets/images/djadou_cashmere_knit.jpg';

export const HERO_IMAGE = heroImg;
export const TRENCH_IMAGE = trenchImg;
export const BLOUSE_IMAGE = blouseImg;
export const TROUSERS_IMAGE = trousersImg;
export const KNIT_IMAGE = knitImg;

export const INITIAL_THEMES: ThemeConfig[] = [
  {
    id: 'theme-minimaliste',
    name: "L'Atelier Minimaliste",
    nameFr: "L'Atelier Minimaliste",
    description: "Quiet luxury aesthetic with warm limestone, rich espresso, and haute-couture typography.",
    primaryColor: '#1F1E1B',
    accentColor: '#966144',
    backgroundColor: '#FAF9F6',
    surfaceColor: '#FFFFFF',
    fontDisplay: 'Cormorant Garamond',
    heroBanner: HERO_IMAGE,
    announcementText: "Bespoke Collection · Complimentary Global Shipping on Orders over $250 · Made to Order Atelier",
    announcementTextFr: "Collection Sur-Mesure · Livraison Internationale Offerte dès 250 € · Atelier Fait Main",
    showAnnouncement: true,
    heroBadge: "Autumn / Winter 2026 Collection",
    heroBadgeFr: "Collection Automne / Hiver 2026",
    heroTitle: "Bespoke Silhouettes & Enduring Grace",
    heroTitleFr: "Silhouettes Sur-Mesure & Élégance Intemporelle",
    heroSubtitle: "Handcrafted in limited atelier runs using natural fibers, French seams, and architectural cuts designed for effortless presence.",
    heroSubtitleFr: "Façonnées en séries limitées d'atelier à partir de fibres nobles, de coutures françaises et de coupes architecturales pensées pour durer."
  },
  {
    id: 'theme-nocturne',
    name: "Édition Noire Haute Couture",
    nameFr: "Édition Noire Haute Couture",
    description: "Architectural, evening-focused palette with deep charcoal, sculptural lines, and platinum accents.",
    primaryColor: '#0F0F10',
    accentColor: '#C4B5A5',
    backgroundColor: '#161618',
    surfaceColor: '#202024',
    fontDisplay: 'Playfair Display',
    heroBanner: HERO_IMAGE,
    announcementText: "Private Salon Appointments Open for Paris & New York · Limited Edition Nocturne Run",
    announcementTextFr: "Salons Privés Ouverts à Paris & New York · Capsule Nocturne en Édition Limitée",
    showAnnouncement: true,
    heroBadge: "Midnight Capsule · Special Edition",
    heroBadgeFr: "Capsule Nocturne · Édition Privée",
    heroTitle: "Drape, Shadow & Monochromatic Poetry",
    heroTitleFr: "Drapés, Ombres & Poésie Monochrome",
    heroSubtitle: "Mastery of silhouette through structured wool, heavy liquid silks, and sculpted evening forms.",
    heroSubtitleFr: "Maîtrise de la silhouette à travers la laine structurée, les soies liquides lourdes et les formes du soir."
  },
  {
    id: 'theme-solaire',
    name: "Riviera Solaire Linen",
    nameFr: "Lin Riviera Solaire",
    description: "Sun-drenched, Mediterranean atmosphere featuring soft terracotta, sunbleached oat, and airy drapery.",
    primaryColor: '#2B2521',
    accentColor: '#C26D4D',
    backgroundColor: '#F7F4EE',
    surfaceColor: '#FFFFFF',
    fontDisplay: 'Cormorant Garamond',
    heroBanner: HERO_IMAGE,
    announcementText: "New Season: Riviera Solaire Pure French Linen Pieces Just Arrived in Limited Quantities",
    announcementTextFr: "Nouvelle Saison : Pièces en Pur Lin Français Riviera Solaire Disponibles en Séries Limitées",
    showAnnouncement: true,
    heroBadge: "Spring / Summer Resort Capsule",
    heroBadgeFr: "Capsule Resort Printemps / Été",
    heroTitle: "Sunlit Textures & Artisanal Ease",
    heroTitleFr: "Textures Ensoleillées & Aisance Artisanale",
    heroSubtitle: "Breathable pure European linens, raw silk weaves, and effortless loose tailoring for warm horizons.",
    heroSubtitleFr: "Pur lin européen respirant, soies brutes et tailleur décontracté pour les horizons ensoleillés."
  }
];

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-atelier-2026',
    name: 'Atelier Signature AW26',
    nameFr: 'Atelier Signature AH26',
    slug: 'atelier-aw26',
    season: 'Autumn / Winter 2026',
    seasonFr: 'Automne / Hiver 2026',
    tagline: 'Structured silhouettes in camel wool and double-faced cashmere.',
    taglineFr: 'Silhouettes structurées en laine de chameau et cachemire double-face.',
    description: 'Our core ready-to-wear atelier wardrobe, crafted with bespoke tailoring principles for timeless grace.',
    descriptionFr: 'Notre vestiaire de confection essentielle, façonné selon les principes de la haute coupe.',
    bannerImage: HERO_IMAGE,
    themeId: 'theme-minimaliste',
    active: true
  },
  {
    id: 'col-drape-silk',
    name: 'Silk & Fluid Drapery',
    nameFr: 'Soie & Drapés Fluides',
    slug: 'silk-fluid-drapery',
    season: 'Permanent Capsule',
    seasonFr: 'Capsule Permanente',
    tagline: 'Hand-dyed 22-momme pure mulberry silk creations.',
    taglineFr: 'Créations en soie de mûrier 22 mommes teintée artisanalement.',
    description: 'Sensual liquid draping, asymmetric necklines, and fluid movements that adapt naturally to every figure.',
    descriptionFr: 'Drapés liquides sensuels et encolures asymétriques épousant naturellement le mouvement.',
    bannerImage: BLOUSE_IMAGE,
    themeId: 'theme-nocturne',
    active: false
  },
  {
    id: 'col-resort-linen',
    name: 'Riviera Linen & Tailoring',
    nameFr: 'Lin Riviera & Coupes Tailleur',
    slug: 'riviera-linen',
    season: 'Spring / Summer 2026',
    seasonFr: 'Printemps / Été 2026',
    tagline: 'Pure washed European linen with relaxed tailored proportions.',
    taglineFr: 'Pur lin européen lavé aux proportions tailleur décontractées.',
    description: 'Sun-washed tones and unlined relaxed jackets and pleated trousers designed for temperate ease.',
    descriptionFr: 'Nuances ensoleillées et vestes non doublées conçues pour une élégance estivale.',
    bannerImage: TROUSERS_IMAGE,
    themeId: 'theme-solaire',
    active: false
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'The Djadou Structured Wool Trench',
    nameFr: 'Le Trench Structuré en Laine Djadou',
    tagline: 'Double-breasted heavyweight wool coat with storm flap',
    taglineFr: 'Manteau croisé en laine lourde avec bavolet tempête',
    price: 480,
    originalPrice: 560,
    collectionId: 'col-atelier-2026',
    category: 'Outerwear',
    images: [TRENCH_IMAGE, HERO_IMAGE],
    description: 'An architectural centerpiece cut from custom 620gsm virgin camel wool. Features wide notched lapels, horn buttons, belted waist, deep raglan sleeves, and hand-finished French internal seams.',
    descriptionFr: 'Une pièce maîtresse architecturale coupée dans une laine vierge de chameau de 620 g/m². Revers larges crantés, boutons en corne véritable, ceinture structurée, manches raglan profondes et coutures anglaises.',
    details: [
      'Double-breasted storm closure with genuine natural horn buttons',
      'Removable structured self-tie belt with antique brass buckle',
      'Dual welt hand pockets and interior ticket pocket',
      'Fully lined in breathable cupro-silk blend',
      'Crafted in limited runs of 40 pieces per season'
    ],
    detailsFr: [
      'Fermeture croisée tempête avec boutons en corne naturelle',
      'Ceinture structurée amovible avec boucle en laiton vieilli',
      'Poches passepoilées doubles et poche intérieure secrète',
      'Entièrement doublé de cupro et soie respirante',
      'Confectionné en séries strictement limitées à 40 pièces'
    ],
    composition: '90% Virgin Camel Wool, 10% Cashmere; 100% Cupro Lining',
    compositionFr: '90% Laine Vierge de Chameau, 10% Cachemire ; Doublure 100% Cupro',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 14,
    inStock: true,
    featured: true,
    createdAt: '2026-09-12'
  },
  {
    id: 'prod-02',
    name: 'Aura Draped Mulberry Silk Blouse',
    nameFr: 'Blouse Drapée en Soie de Mûrier Aura',
    tagline: 'Liquid silk blouse with high cowl drape and French cuffs',
    taglineFr: 'Blouse en soie liquide avec col bénitier et poignets français',
    price: 285,
    originalPrice: undefined,
    collectionId: 'col-drape-silk',
    category: 'Blouses & Tops',
    images: [BLOUSE_IMAGE, HERO_IMAGE],
    description: 'Sculpted from 22-momme pearlescent heavy sandwashed silk. The fluid cowl neck cascades gently against the collarbone, transitioning into elongated cuffs with mother-of-pearl closures.',
    descriptionFr: 'Sculptée dans une soie de mûrier lourde de 22 mommes lavée au sable. Le col bénitier fluide cascade délicatement sur la clavicule pour un maintien naturel.',
    details: [
      'Bias-cut construction for natural form-following drape',
      'Soft waterfall cowl neckline that holds shape naturally',
      'Extended cuffs with hand-stitched mother-of-pearl buttons',
      'French seams throughout for zero skin irritation',
      'Dry clean or gentle hand wash recommended'
    ],
    detailsFr: [
      'Coupe en biais pour un tombé naturel épousant les formes',
      'Col bénitier en cascade fluide maintenant sa forme naturellement',
      'Poignets allongés avec boutons en nacre naturelle cousus main',
      'Coutures anglaises intégrales sans frottement',
      'Nettoyage à sec ou lavage main délicat recommandé'
    ],
    composition: '100% Sandwashed Mulberry Silk (22 Momme)',
    compositionFr: '100% Soie de Mûrier Lavée au Sable (22 Mommes)',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 22,
    inStock: true,
    featured: true,
    createdAt: '2026-09-15'
  },
  {
    id: 'prod-03',
    name: 'Sartorial Pleated Palazzo Trousers',
    nameFr: 'Pantalon Palazzo Tailleur à Plis',
    tagline: 'High-waisted wide-leg trousers in espresso wool serge',
    taglineFr: 'Pantalon taille haute à jambe large en sergé de laine expresso',
    price: 320,
    originalPrice: 380,
    collectionId: 'col-atelier-2026',
    category: 'Trousers',
    images: [TROUSERS_IMAGE, TRENCH_IMAGE],
    description: 'Precision-tailored trousers featuring deep double forward pleats, an extended waistband tab with hidden hook-and-eye closure, and a generous architectural wide leg that puddles slightly over footwear.',
    descriptionFr: 'Pantalon de coupe tailleur précise présentant de profonds doubles plis avant, une ceinture prolongée à agrafe dissimulée et une jambe large architecturale.',
    details: [
      'High-rise waist with internal grip curtain to keep shirts secure',
      'Deep double front pleats for fluid leg volume and mobility',
      'Side slanted hand pockets and rear jetted pockets',
      'Unfinished hem length with bespoke hem allowance for tailoring',
      'Resistant to creasing, ideal for travel and atelier wear'
    ],
    detailsFr: [
      'Taille haute avec ganse intérieure antiglisse pour chemise',
      'Doubles plis profonds pour un volume fluide et une démarche assurée',
      'Poches italiennes en biais et poches arrière passepoilées',
      'Revers avec aisance de couture généreuse pour retouche sur-mesure',
      'Naturellement infroissable, parfait pour le voyage'
    ],
    composition: '100% Italian Wool Serge (310gsm)',
    compositionFr: '100% Sergé de Laine Italienne (310 g/m²)',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 18,
    inStock: true,
    featured: true,
    createdAt: '2026-09-18'
  },
  {
    id: 'prod-04',
    name: 'Artisanal Oatmeal Cashmere Turtleneck',
    nameFr: 'Col Roulé Artisanal en Cachemire d’Avoine',
    tagline: 'Chunky 7-gauge pure Mongolian cashmere ribbed sweater',
    taglineFr: 'Pull côtelé jauge 7 en pur cachemire mongol',
    price: 395,
    originalPrice: undefined,
    collectionId: 'col-atelier-2026',
    category: 'Knitwear',
    images: [KNIT_IMAGE, HERO_IMAGE],
    description: 'Spun from sustainably harvested Mongolian long-staple cashmere fibers, this sweater delivers supreme warmth with zero weight. Features a relaxed sculptural turtle collar and drop shoulder silhouette.',
    descriptionFr: 'Filé à partir de fibres longues de cachemire mongol récolté de manière éthique. Chaleur suprême et légèreté absolue avec un col cheminée sculptural.',
    details: [
      '7-gauge chunky fisherman rib knit construction',
      'Seamless tubular knit body prevents torque and twisting',
      'Relaxed high collar that comfortably stays upright without choking',
      'Extra-long sleeves with folded ribbed cuffs',
      'Hypoallergenic, ultra-soft next-to-skin touch'
    ],
    detailsFr: [
      'Tricot côtelé pêcheur jauge 7 ultra-moelleux',
      'Confection tubulaire sans couture prévenant toute torsion',
      'Col montant protecteur et souple sans sensation d’oppression',
      'Manches longues avec poignets côtelés retroussables',
      'Hypoallergénique, douceur incomparable à fleur de peau'
    ],
    composition: '100% Grade-A Mongolian Cashmere',
    compositionFr: '100% Cachemire Mongol Certifié Grade-A',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 9,
    inStock: true,
    featured: true,
    createdAt: '2026-09-20'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-01',
    name: 'Camille Laurent',
    email: 'c.laurent@paris-studio.fr',
    phone: '+33 6 42 19 88 01',
    city: 'Paris',
    country: 'France',
    totalOrders: 4,
    totalSpent: 1480,
    tier: 'Bespoke VIP',
    registeredDate: '2026-06-14'
  },
  {
    id: 'cust-02',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@vancemedia.com',
    phone: '+1 212 555 0194',
    city: 'New York',
    country: 'United States',
    totalOrders: 2,
    totalSpent: 800,
    tier: 'Preferred',
    registeredDate: '2026-08-02'
  },
  {
    id: 'cust-03',
    name: 'Alexander Stirling',
    email: 'astirling@mayfair-consulting.co.uk',
    phone: '+44 20 7946 0912',
    city: 'London',
    country: 'United Kingdom',
    totalOrders: 1,
    totalSpent: 480,
    tier: 'New Client',
    registeredDate: '2026-09-25'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1042',
    orderNumber: 'HOD-1042',
    createdAt: '2026-09-28T14:32:00Z',
    customer: {
      fullName: 'Camille Laurent',
      email: 'c.laurent@paris-studio.fr',
      phone: '+33 6 42 19 88 01',
      addressLine1: '14 Rue du Faubourg Saint-Honoré',
      city: 'Paris',
      postalCode: '75008',
      country: 'France'
    },
    items: [
      {
        productId: 'prod-01',
        productName: 'The Djadou Structured Wool Trench',
        productImage: TRENCH_IMAGE,
        size: 'S',
        quantity: 1,
        unitPrice: 480,
        totalPrice: 480
      },
      {
        productId: 'prod-02',
        productName: 'Aura Draped Mulberry Silk Blouse',
        productImage: BLOUSE_IMAGE,
        size: 'M',
        quantity: 1,
        unitPrice: 285,
        totalPrice: 285
      }
    ],
    subtotal: 765,
    discount: 76.5,
    shipping: 0,
    tax: 34.42,
    total: 722.92,
    currency: 'USD',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    trackingNumber: 'FR-DHL-892104928',
    notes: 'Please wrap with bespoke tissue paper & wax seal.'
  },
  {
    id: 'ord-1043',
    orderNumber: 'HOD-1043',
    createdAt: '2026-10-01T09:15:00Z',
    customer: {
      fullName: 'Eleanor Vance',
      email: 'eleanor.vance@vancemedia.com',
      phone: '+1 212 555 0194',
      addressLine1: '784 Park Avenue, Apt 11B',
      city: 'New York',
      postalCode: '10021',
      country: 'United States'
    },
    items: [
      {
        productId: 'prod-04',
        productName: 'Artisanal Oatmeal Cashmere Turtleneck',
        productImage: KNIT_IMAGE,
        size: 'M',
        quantity: 1,
        unitPrice: 395,
        totalPrice: 395
      }
    ],
    subtotal: 395,
    discount: 0,
    shipping: 0,
    tax: 31.60,
    total: 426.60,
    currency: 'USD',
    paymentMethod: 'apple_pay',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    trackingNumber: undefined,
    notes: 'Leave package with building concierge if unavailable.'
  }
];
