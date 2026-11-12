export type MobileTab = 'home' | 'peluang' | 'live' | 'notif' | 'akun';

export type MobileScreen =
  | 'home'
  | 'mitra'
  | 'ekspor'
  | 'konsultasi'
  | 'product_detail'
  | 'cart'
  | 'checkout'
  | 'order_success'
  | 'seller_center'
  | 'search_listing';

export interface MobileProduct {
  id: string;
  name: string;
  category: string;
  etalase?: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  soldCount: number;
  location: string;
  distanceKm?: number;
  isFreeShipping?: boolean;
  supplier: string;
  stock: number;
  minOrder: string;
  description: string;
  imageUrl: string;
  isVerified: boolean;
  isActive?: boolean;
}

export interface RestockLogItem {
  id: string;
  productId: string;
  productName: string;
  addedStock: number;
  newStock: number;
  date: string;
}

export interface MobileCartItem {
  product: MobileProduct;
  quantity: number;
  isSelected: boolean;
}

export type AlertSeverity = 'critical' | 'warning' | 'info' | 'success';

export interface HarvestAlertData {
  programTitle: string;
  location: string;
  commodityType: string;
  metricLabel: string;
  metricValue: string;
  normalThreshold?: string;
  recommendation: string;
  actionRequired?: string;
  cctvCameraId?: string;
  daysToHarvest?: number;
}

export interface HarvestNotificationItem {
  id: string;
  category: 'Peringatan Panen' | 'Transaksi' | 'Konsultasi' | 'Ekspor' | 'Sistem';
  severity: AlertSeverity;
  title: string;
  message: string;
  timeAgo: string;
  isRead: boolean;
  harvestData?: HarvestAlertData;
}


