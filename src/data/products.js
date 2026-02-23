export const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    description: "Premium noise-canceling headphones with 30-hour battery life and crystal-clear sound quality.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    category: "Audio",
    stock: 15
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    description: "Feature-packed smartwatch with fitness tracking, heart rate monitor, and water resistance.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    category: "Wearables",
    stock: 8
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    description: "Ergonomic aluminum laptop stand with adjustable height for comfortable working posture.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    category: "Accessories",
    stock: 20
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 129.99,
    description: "RGB backlit mechanical keyboard with tactile switches for the ultimate typing experience.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    category: "Accessories",
    stock: 12
  },
  {
    id: 5,
    name: "USB-C Hub",
    price: 34.99,
    description: "7-in-1 USB-C hub with 4K HDMI, USB 3.0 ports, SD card reader, and 100W power delivery.",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400",
    category: "Accessories",
    stock: 25
  },
  {
    id: 6,
    name: "Wireless Mouse",
    price: 39.99,
    description: "Precision wireless mouse with ergonomic design and long-lasting battery.",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
    category: "Accessories",
    stock: 0
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: 59.99,
    description: "Portable waterproof Bluetooth speaker with 360-degree sound and 12-hour playtime.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    category: "Audio",
    stock: 18
  },
  {
    id: 8,
    name: "Webcam HD",
    price: 89.99,
    description: "1080p HD webcam with built-in microphone, auto-focus, and low-light correction for video calls.",
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400",
    category: "Electronics",
    stock: 10
  },
  {
    id: 9,
    name: "Gaming Monitor",
    price: 349.99,
    description: "27-inch 144Hz IPS gaming monitor with 1ms response time and FreeSync technology.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
    category: "Electronics",
    stock: 5
  },
  {
    id: 10,
    name: "Wireless Earbuds",
    price: 49.99,
    description: "True wireless earbuds with active noise cancellation and touch controls.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400",
    category: "Audio",
    stock: 30
  },
  {
    id: 11,
    name: "Fitness Tracker",
    price: 69.99,
    description: "Slim fitness band with sleep tracking, step counter, and 7-day battery life.",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
    category: "Wearables",
    stock: 22
  },
  {
    id: 12,
    name: "Desk Lamp",
    price: 44.99,
    description: "LED desk lamp with adjustable brightness, color temperature, and USB charging port.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400",
    category: "Accessories",
    stock: 14
  },
  {
    id: 13,
    name: "Portable SSD",
    price: 109.99,
    description: "1TB portable SSD with USB 3.2 Gen 2, up to 1050MB/s read speed in a pocket-sized design.",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400",
    category: "Storage",
    stock: 16
  },
  {
    id: 14,
    name: "Noise Canceling Mic",
    price: 119.99,
    description: "Professional USB condenser microphone with noise-canceling tech for podcasts and streaming.",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400",
    category: "Audio",
    stock: 7
  },
  {
    id: 15,
    name: "Tablet Stand",
    price: 29.99,
    description: "Adjustable aluminum tablet stand compatible with all tablets and e-readers up to 13 inches.",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    category: "Accessories",
    stock: 0
  },
  {
    id: 16,
    name: "Smart Plug",
    price: 24.99,
    description: "Wi-Fi smart plug with voice control, scheduling, and energy monitoring via app.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400",
    category: "Smart Home",
    stock: 40
  },
  {
    id: 17,
    name: "USB Flash Drive",
    price: 14.99,
    description: "128GB USB 3.0 flash drive with metal housing and keychain loop for portability.",
    image: "https://images.unsplash.com/photo-1597138804456-e7dca7f59d54?w=400",
    category: "Storage",
    stock: 50
  },
  {
    id: 18,
    name: "Wireless Charger",
    price: 29.99,
    description: "15W fast wireless charging pad compatible with all Qi-enabled devices, slim and sleek design.",
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400",
    category: "Electronics",
    stock: 35
  }
];

// Extract unique categories for filtering
export const categories = [...new Set(products.map(p => p.category))];