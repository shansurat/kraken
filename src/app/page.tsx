"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  MapPin,
  Clock,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Star,
  Quote,
  ArrowRight,
  Info,
  ShoppingBag,
  ArrowLeft, // Added ArrowLeft for the slider
} from "lucide-react";

/**
 * CUSTOM COLOR PALETTE CONFIGURATION
 * * Primary Background: #F0F9FF (Tailwind: sky-50)
 * Surface White: #FFFFFF (Tailwind: white)
 * Primary Text: #0F172A (Tailwind: slate-900)
 * Accent Blue: #0EA5E9 (Tailwind: sky-500)
 * Muted Text: #64748B (Tailwind: slate-500)
 */

const SEAFOOD_IMAGES = {
  hero: "https://placehold.co/2000x1200/e2e8f0/1e293b?text=Hero+Ocean+Image",
  logo: "https://placehold.co/200x200/0ea5e9/ffffff?text=Logo",
  basket: "https://placehold.co/800x600/e2e8f0/1e293b?text=Seafood+Basket",
  fish: "https://placehold.co/800x600/e2e8f0/1e293b?text=Fish+Dish",
  crayfish: "https://placehold.co/800x600/e2e8f0/1e293b?text=Crayfish+Platter",
  oysters: "https://placehold.co/800x600/e2e8f0/1e293b?text=Fresh+Oysters",
  story:
    "https://placehold.co/1200x800/e2e8f0/1e293b?text=Fishermen+Story+Image",
  interior:
    "https://placehold.co/1200x800/e2e8f0/1e293b?text=Restaurant+Interior",
  chef: "https://placehold.co/800x800/e2e8f0/1e293b?text=Head+Chef",
  collage1: "https://placehold.co/800x800/e2e8f0/1e293b?text=Grilled+Octopus",
  collage2: "https://placehold.co/600x800/e2e8f0/1e293b?text=Seafood+Feast",
  collage3: "https://placehold.co/800x600/e2e8f0/1e293b?text=Fresh+Prawns",
  collage4: "https://placehold.co/600x600/e2e8f0/1e293b?text=Chili+Mussels",
  collage5: "https://placehold.co/1200x600/e2e8f0/1e293b?text=Plating+Detail",
};

// Define interfaces to fix TypeScript errors
interface MenuItem {
  name: string;
  price: string;
  desc: string;
  image?: string;
  highlighted?: boolean;
}

interface MenuCategory {
  title: string;
  description: string;
  items: MenuItem[];
}

// Data structure for the categorized menu
const MENU_CATEGORIES: MenuCategory[] = [
  {
    title: "Baskets & Platters",
    description: "Generous feasts from the ocean, perfect for sharing.",
    items: [
      {
        name: "Seafood Basket",
        price: "$37.90",
        desc: "Scallops, Prawns, Squids, and your choice of fish fillet (Barramundi, Snapper, Red Emperor, or Gummy Shark). Served with chips, salad & dipping sauce.",
        image: SEAFOOD_IMAGES.basket,
      },
      {
        name: "Seafood Platter",
        price: "$99.90",
        desc: "The ultimate feast: Crab, Scallops, Tiger Prawns, Squids, Mussels and choice of fish. Served with golden chips, aioli, tartare & salad.",
        image: SEAFOOD_IMAGES.crayfish,
      },
    ],
  },
  {
    title: "Fish Meals",
    description:
      "Served with crispy golden chips and fresh garden salad. Choice of Battered, Crumbed, or Grilled (Spicy Sambal or Greek Lemon).",
    items: [
      {
        name: "Deluxe Fish & Chips",
        price: "$32.90",
        desc: "Premium selection of two fish fillets prepared your way.",
        image: SEAFOOD_IMAGES.fish,
      },
      {
        name: "Gold Band Snapper",
        price: "$27.90",
        desc: "Wild caught, mild flavour.",
        highlighted: true,
      },
      {
        name: "Barramundi",
        price: "$27.90",
        desc: "Iconic Australian catch.",
        highlighted: true,
      },
      {
        name: "Red Emperor",
        price: "$27.90",
        desc: "Firm, white, sweet flesh.",
        highlighted: true,
      },
      {
        name: "Gummy Shark",
        price: "$25.90",
        desc: "Traditional boneless flake.",
        highlighted: true,
      },
    ],
  },
  {
    title: "Seafood Mains & Oysters",
    description: "From grilled octopus to fresh shucked oysters.",
    items: [
      {
        name: "Crayfish",
        price: "$59.90",
        desc: "Fresh whole crayfish, Grilled or Baked Mornay. Served with chips & salad.",
        image: SEAFOOD_IMAGES.crayfish,
      },
      {
        name: "Asian Chili Crab",
        price: "$49.90",
        desc: "Whole crab in rich, tangy, sweet & spicy sauce. Served with mantou buns.",
        highlighted: true,
      },
      {
        name: "Chili Mussels (1kg)",
        price: "$31.90",
        desc: "Rich spicy chili & tomato sauce. Served with bread.",
        highlighted: true,
      },
      {
        name: "Lobster Mornay Roll",
        price: "$25.00",
        desc: "Lobster meat in creamy bechamel, mozzarella, brioche roll.",
        highlighted: true,
      },
      {
        name: "Oysters (Natural)",
        price: "$21.90 / $39.90",
        desc: "Fresh, shucked to order. (1/2 Doz / Doz)",
        image: SEAFOOD_IMAGES.oysters,
      },
      {
        name: "Oysters (Kilpatrick)",
        price: "$22.90 / $43.90",
        desc: "Crispy bacon & Worcestershire sauce.",
        highlighted: true,
      },
    ],
  },
  {
    title: "Sides & Sauces",
    description: "Crispy, fresh, and savory additions to complete your meal.",
    items: [
      {
        name: "Chips (Large)",
        price: "$8.00",
        desc: "Classic crispy golden chips, seasoned to perfection.",
      },
      {
        name: "Coleslaw",
        price: "$8.00",
        desc: "Fresh, crunchy house-made coleslaw.",
      },
      {
        name: "Buttered Corn (2pcs)",
        price: "$8.00",
        desc: "Sweet corn cobs glazed with butter.",
      },
      {
        name: "Battered Pineapple (3pcs)",
        price: "$8.00",
        desc: "Juicy pineapple rings in crispy batter.",
      },
      {
        name: "Battered Crab Stick (3pcs)",
        price: "$8.00",
        desc: "Golden fried crab sticks.",
      },
      {
        name: "Dipping Sauces",
        price: "$2.50 ea",
        desc: "Choice of Aioli, Tartare, Tomato, Chili, or Cocktail Sauce.",
      },
    ],
  },
  {
    title: "Drinks",
    description: "Quench your thirst with our range of chilled beverages.",
    items: [
      {
        name: "Soft Drinks (600ml)",
        price: "$5.00",
        desc: "Pepsi, Pepsi Max, Sunkist, 7up, Mt Dew, Solo Lemon.",
      },
      {
        name: "Lipton Iced Tea (500ml)",
        price: "$5.00",
        desc: "Lemon, Raspberry, Mango, Peach.",
      },
      {
        name: "Bundaberg",
        price: "$5.00",
        desc: "Lemon Lime Bitter or Ginger Beer.",
      },
      {
        name: "Spring Valley Juice",
        price: "$5.50",
        desc: "300ml Fruit Juice.",
      },
      { name: "Gatorade (600ml)", price: "$6.00", desc: "Sports drink." },
      {
        name: "Still Water",
        price: "$4 / $6",
        desc: "Available in 600ml or 1.5L.",
      },
    ],
  },
];

const REVIEWS = [
  {
    name: "Elena R.",
    text: "The seafood platter was absolutely massive and fresh. The chili crab sauce is to die for!",
    rating: 5,
  },
  {
    name: "Marcus T.",
    text: "Best Barramundi I've had in Canningvale. The Greek lemon dressing is a game changer.",
    rating: 5,
  },
  {
    name: "Sarah J.",
    text: "Love that they offer Gummy Shark done traditionally. Crispy batter, not greasy. Perfect.",
    rating: 5,
  },
];

// Data for the Gallery Slider
const GALLERY_SLIDES = [
  [
    // Slide 1
    { src: SEAFOOD_IMAGES.interior, span: "col-span-2 row-span-2" },
    { src: SEAFOOD_IMAGES.crayfish, span: "" },
    { src: SEAFOOD_IMAGES.story, span: "" },
    { src: SEAFOOD_IMAGES.hero, span: "col-span-2" },
  ],
  [
    // Slide 2
    { src: SEAFOOD_IMAGES.collage1, span: "col-span-2 row-span-2" },
    { src: SEAFOOD_IMAGES.basket, span: "" },
    { src: SEAFOOD_IMAGES.oysters, span: "" },
    { src: SEAFOOD_IMAGES.collage3, span: "col-span-2" },
  ],
  [
    // Slide 3
    { src: SEAFOOD_IMAGES.collage5, span: "col-span-2 row-span-2" },
    { src: SEAFOOD_IMAGES.fish, span: "" },
    { src: SEAFOOD_IMAGES.collage4, span: "" },
    { src: SEAFOOD_IMAGES.collage2, span: "col-span-2" },
  ],
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentGallerySlide, setCurrentGallerySlide] = useState(0);

  // Handle scroll effects for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "menu", "story", "gallery", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    setCurrentGallerySlide((prev) => (prev + 1) % GALLERY_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentGallerySlide(
      (prev) => (prev - 1 + GALLERY_SLIDES.length) % GALLERY_SLIDES.length
    );
  };

  return (
    <div className="font-sans text-slate-800 bg-slate-50 selection:bg-sky-200 selection:text-sky-900">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            {/* Logo Container */}
            <div
              className={`rounded-full overflow-hidden border-2 transition-all shrink-0 ${
                scrolled
                  ? "w-10 h-10 border-slate-200"
                  : "w-12 h-12 border-white/30 bg-white/10 backdrop-blur-sm"
              }`}
            >
              <img
                src={SEAFOOD_IMAGES.logo}
                alt="Kraken Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <span
              className={`text-xl md:text-2xl font-light tracking-widest uppercase ${
                scrolled ? "text-slate-900" : "text-slate-900 lg:text-white"
              }`}
            >
              Kraken:{" "}
              <span className="font-bold hidden sm:inline">
                Seafood Kitchen
              </span>
              <span className="font-bold sm:hidden">Seafood</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-6 mr-2">
              {["Menu", "Story", "Gallery", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    scrolled
                      ? "text-slate-600 hover:text-sky-600"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                  scrolled
                    ? "border-sky-600 text-sky-600 hover:bg-sky-50"
                    : "border-white text-white hover:bg-white/10"
                }`}
              >
                <ShoppingBag size={16} />
                Order Online
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                  scrolled
                    ? "bg-sky-600 text-white hover:bg-sky-700"
                    : "bg-white text-sky-900 hover:bg-sky-50"
                }`}
              >
                Book a Table
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 ${
              scrolled ? "text-slate-900" : "text-slate-900 lg:text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100 py-6 px-6 flex flex-col gap-4 md:hidden">
            {["Home", "Menu", "Story", "Gallery", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-left text-lg font-medium text-slate-800 py-2 border-b border-slate-50"
              >
                {item}
              </button>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <button className="w-full flex items-center justify-center gap-2 border border-sky-600 text-sky-600 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-colors">
                <ShoppingBag size={18} /> Order Online
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors"
              >
                Book a Table
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={SEAFOOD_IMAGES.hero}
            alt="Ocean waves"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-slate-50/90"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <span className="inline-block py-1 px-3 border border-white/40 rounded-full text-white text-xs font-medium tracking-widest uppercase mb-6 backdrop-blur-sm">
            Est. 2024
          </span>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight tracking-tight">
            A feast beyond <br />
            <span className="font-serif italic font-bold">the deep</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto mb-10 font-light leading-relaxed">
            Welcome to Kraken: Seafood Kitchen. Experience fresh, sustainable
            seafood prepared with passion in Canningvale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("menu")}
              className="px-8 py-3.5 bg-white text-sky-950 font-semibold rounded-full hover:bg-sky-50 transition-all flex items-center justify-center gap-2 group"
            >
              View Menu
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-8 py-3.5 bg-sky-950/40 backdrop-blur-md text-white border border-white/20 font-semibold rounded-full hover:bg-sky-950/60 transition-all"
            >
              Reservations
            </button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 max-w-7xl mx-auto bg-slate-50">
        <div className="text-center mb-12">
          <h2 className="text-sky-600 text-sm font-bold tracking-widest uppercase mb-3">
            Fresh Catch
          </h2>
          <h3 className="text-4xl font-light text-slate-900 mb-6">Our Menu</h3>
          <p className="text-slate-500 max-w-2xl mx-auto">
            From our signature baskets to whole crayfish. <br />
            <span className="text-sm italic">
              Note: Fish meals available Crumbed, Battered, or Grilled (Spicy
              Sambal or Greek Lemon).
            </span>
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {MENU_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === idx
                  ? "bg-sky-600 text-white shadow-lg shadow-sky-200"
                  : "bg-white text-slate-600 hover:bg-sky-50"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="transition-all duration-300 ease-in-out">
          <div className="mb-8 text-center" key={activeCategory}>
            <p className="text-slate-400 italic animate-[pulse_0.5s_ease-in-out]">
              {MENU_CATEGORIES[activeCategory].description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {MENU_CATEGORIES[activeCategory].items.map((item, index) => (
              <div
                key={index}
                className={`group flex gap-6 items-start p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ${
                  !item.image ? "md:items-center" : ""
                }`}
              >
                {item.image && (
                  <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden relative hidden sm:block">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-2 border-b border-dashed border-slate-100 pb-2">
                    <h4 className="text-lg font-bold text-slate-800">
                      {item.name}
                    </h4>
                    <span className="text-lg font-semibold text-sky-600 ml-4 whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Removed the separate sides/drinks section as they are now in the tabs */}
      </section>

      {/* Food Collage Section */}
      <section className="w-full bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2 h-auto md:h-[600px]">
          {/* Large Square - Top Left */}
          <div
            className="col-span-2 row-span-2 relative group overflow-hidden cursor-pointer h-64 md:h-auto"
            onClick={() => setSelectedImage(SEAFOOD_IMAGES.collage1)}
          >
            <img
              src={SEAFOOD_IMAGES.collage1}
              alt="Signature Dish"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium tracking-widest uppercase text-sm">
                View
              </span>
            </div>
          </div>

          {/* Tall Portrait - Top Middle */}
          <div
            className="col-span-1 row-span-2 relative group overflow-hidden cursor-pointer h-64 md:h-auto"
            onClick={() => setSelectedImage(SEAFOOD_IMAGES.collage2)}
          >
            <img
              src={SEAFOOD_IMAGES.collage2}
              alt="Seafood Feast"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
          </div>

          {/* Small Square - Top Right */}
          <div
            className="relative group overflow-hidden cursor-pointer h-32 md:h-auto"
            onClick={() => setSelectedImage(SEAFOOD_IMAGES.collage3)}
          >
            <img
              src={SEAFOOD_IMAGES.collage3}
              alt="Fresh Prawns"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
          </div>

          {/* Small Square - Middle Right */}
          <div
            className="relative group overflow-hidden cursor-pointer h-32 md:h-auto"
            onClick={() => setSelectedImage(SEAFOOD_IMAGES.collage4)}
          >
            <img
              src={SEAFOOD_IMAGES.collage4}
              alt="Chili Mussels"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
          </div>
        </div>
        {/* Wide Banner - Bottom */}
        <div
          className="w-full h-48 md:h-64 relative group overflow-hidden cursor-pointer mt-1 md:mt-2"
          onClick={() => setSelectedImage(SEAFOOD_IMAGES.collage5)}
        >
          <img
            src={SEAFOOD_IMAGES.collage5}
            alt="Plating Detail"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
        </div>
      </section>

      {/* Chef's Quote Section */}
      <section className="py-24 bg-sky-900 relative overflow-hidden flex items-center justify-center">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex justify-center mb-8">
            <Quote size={48} className="text-sky-400 opacity-80" />
          </div>
          <blockquote className="text-3xl md:text-5xl font-serif text-white leading-tight mb-10 italic">
            "We don't try to reinvent the ocean. We simply guide its bounty from
            the net to your plate with respect and honesty."
          </blockquote>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-1 bg-sky-500 mb-2"></div>
            <cite className="not-italic text-lg tracking-widest uppercase font-medium text-sky-200">
              Chef Marco D.
            </cite>
            <span className="text-sm text-sky-400/60 uppercase tracking-wide">
              Executive Chef & Founder
            </span>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-sky-50 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sky-100 rounded-full blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-200">
                <img
                  src={SEAFOOD_IMAGES.story}
                  alt="Fishermen on boat"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                  <div className="flex items-center gap-3 text-white/90">
                    <Quote size={20} className="rotate-180" />
                    <p className="italic font-light">
                      We respect the ocean and it rewards us with flavor.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-sky-600 text-sm font-bold tracking-widest uppercase mb-3">
                Our Roots
              </h2>
              <h3 className="text-4xl font-light text-slate-900 mb-8">
                Responsible Fishing, <br />
                <span className="font-serif italic text-slate-500">
                  Honest Cooking
                </span>
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Kraken: Seafood Kitchen began on a small fishing vessel in the
                North Atlantic. Our founder, Chef Marco, grew up untangling nets
                and learning the currents.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Today, we maintain those relationships with local captains. If
                it wasn't swimming yesterday, it's not on your plate today. We
                believe in minimal intervention—letting the natural sweetness of
                the catch shine through.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-sky-100">
                  <img
                    src={SEAFOOD_IMAGES.chef}
                    alt="Chef"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Marco D.</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    Executive Chef
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery & Reviews */}
      <section id="gallery" className="py-24 bg-sky-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-sky-600 text-sm font-bold tracking-widest uppercase mb-3">
                Atmosphere
              </h2>
              <h3 className="text-3xl md:text-4xl font-light text-slate-900">
                The Kraken Experience
              </h3>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-white hover:border-sky-300 transition-colors"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-sky-600 transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Photo Grid Slider */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96 transition-all duration-500">
            {GALLERY_SLIDES[currentGallerySlide].map((img, idx) => (
              <div
                key={`${currentGallerySlide}-${idx}`}
                className={`${img.span} rounded-2xl overflow-hidden cursor-pointer relative group animate-fadeIn`}
                onClick={() => setSelectedImage(img.src)}
              >
                <img
                  src={img.src}
                  alt="Gallery"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {GALLERY_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentGallerySlide(idx)}
                className={`w-2 h-2 rounded-full ${
                  currentGallerySlide === idx ? "bg-sky-600" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Special Testimonials Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sky-600 text-sm font-bold tracking-widest uppercase mb-3">
              Community
            </h2>
            <h3 className="text-4xl font-light text-slate-900">
              Loved by Locals
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-50 hover:-translate-y-2 transition-transform duration-300 relative group"
              >
                {/* Large Quote Icon Watermark */}
                <Quote
                  className="absolute top-6 right-6 text-slate-100 group-hover:text-sky-50 transition-colors rotate-180"
                  size={64}
                />

                <div className="flex gap-1 text-yellow-400 mb-6 relative z-10">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>

                <p className="text-slate-600 mb-8 leading-relaxed relative z-10 italic">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-4 border-t border-slate-100 pt-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center text-sky-700 font-bold text-lg shadow-inner">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">
                      {review.name}
                    </p>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">
                      Verified Diner
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-600 hover:border-sky-500 hover:text-sky-600 transition-all font-medium text-sm group">
              <Star
                size={16}
                className="group-hover:text-yellow-400 transition-colors"
              />
              Leave a Review
            </button>
          </div>
        </div>
      </section>

      {/* Contact & Map */}
      <section id="contact" className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              {/* Footer Logo Block */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-800">
                  <img
                    src={SEAFOOD_IMAGES.logo}
                    alt="Kraken Logo"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div>
                  <h2 className="text-sky-400 text-sm font-bold tracking-widest uppercase mb-1">
                    Visit Us
                  </h2>
                  <h3 className="text-3xl font-light text-white">
                    Drop Anchor
                  </h3>
                </div>
              </div>

              <div className="space-y-8 mb-10">
                <div className="flex items-start gap-4">
                  <MapPin className="text-sky-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-lg">27/271 Amherst Road</p>
                    <p className="text-slate-400">Canningvale, WA</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-sky-400 shrink-0 mt-1" />
                  <div>
                    <div className="flex justify-between gap-8 mb-1">
                      <span className="text-slate-300">Mon – Fri</span>
                      <span className="font-medium">4:00pm – 9:00pm</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span className="text-slate-300">Sat – Sun</span>
                      <span className="font-medium">11:30am – 9:00pm</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-sky-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-lg">+61 (08) 5555 5555</p>
                    <p className="text-slate-400 text-sm">
                      Call for takeout orders
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            {/* Simulated Map */}
            <div className="h-80 bg-slate-800 rounded-2xl overflow-hidden relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.8!2d115.9!3d-32.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDA0JzU0LjAiUyAxMTXCsDU1JzE1LjYiRQ!5e0!3m2!1sen!2sau!4v1620000000000!5m2!1sen!2sau"
                className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              ></iframe>
              <div className="absolute bottom-4 right-4 bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg pointer-events-none">
                Get Directions
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>&copy; 2024 Kraken: Seafood Kitchen. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white/70 hover:text-white">
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
