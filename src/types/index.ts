export type ServiceCategory = 'mitra' | 'ekspor' | 'konsultasi';

export type DoctorType = 'hewan' | 'tanaman';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  type: DoctorType;
  specialty: string;
  institution: string;
  sipNumber: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  isOnline: boolean;
  avatarUrl?: string;
  fee: string;
  feeAmount?: number;
  originalFeeAmount?: number;
  focusAreas: string[];
  subCategory?: 'sapi_kambing' | 'unggas' | 'pangan' | 'hortikultura' | 'perkebunan';
}

export interface Commodity {
  id: string;
  name: string;
  englishName: string;
  category: 'kopi' | 'rempah' | 'biomassa' | 'peternakan';
  origin: string;
  specifications: {
    grade: string;
    moisture: string;
    packaging: string;
    minOrder: string;
  };
  certifications: string[];
  description: string;
  status: 'Tersedia' | 'Musim Panen' | 'Pre-Order';
}

export interface MitraPackage {
  id: string;
  title: string;
  sector: 'peternakan' | 'pertanian' | 'rantai-pasok';
  commodities: string[];
  benefits: string[];
  cycleTime: string;
  supportLevel: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'doctor' | 'system';
  text: string;
  timestamp: string;
  imageUrl?: string;
}
