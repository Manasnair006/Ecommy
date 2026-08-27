import headphoneImg from '../assets/productimages/71wD439AytL._SL1500_.jpg';

export interface Product {
  id: string;
  asin?: string;
  title: string;
  brand: string;
  price: number;
  listPrice?: number;
  stars: number;
  reviews: number;
  isBestSeller?: boolean;
  img: string;
}

export const products: Product[] = [
  {
    id: '001',
    asin: 'B0863TXGM3',
    title: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones',
    brand: 'Sony',
    price: 278.00,
    listPrice: 349.99,
    stars: 4.5,
    reviews: 1240,
    isBestSeller: true,
    img: headphoneImg
  },
  {
    id: '002',
    asin: 'B0CHX1W1XY',
    title: 'Apple Watch Series 9 GPS 45mm Smartwatch',
    brand: 'Apple',
    price: 329.00,
    listPrice: 389.00,
    stars: 4.8,
    reviews: 890,
    isBestSeller: true,
    img: headphoneImg
  },
  {
    id: '003',
    asin: 'B098JFFGBF',
    title: 'Logitech MX Keys Mechanical Wireless Keyboard',
    brand: 'Logitech',
    price: 99.99,
    stars: 4.4,
    reviews: 450,
    img: headphoneImg
  },
  {
    id: '004',
    asin: 'B08LLD2QXJ',
    title: 'Dell UltraSharp 27" 4K USB-C Monitor',
    brand: 'Dell',
    price: 449.00,
    listPrice: 529.00,
    stars: 4.7,
    reviews: 610,
    img: headphoneImg
  },
  {
    id: '005',
    asin: 'B0BT5G1Q1L',
    title: 'Razer DeathAdder V3 Pro Wireless Gaming Mouse',
    brand: 'Razer',
    price: 119.99,
    stars: 4.3,
    reviews: 320,
    img: headphoneImg
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductImage(id: string): string {
  const prod = getProductById(id);
  return prod ? prod.img : headphoneImg;
}
