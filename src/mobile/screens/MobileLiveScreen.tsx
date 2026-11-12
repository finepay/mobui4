import { useState, useRef, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Music2,
  Plus,
  Check,
  Search,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  X,
  Send,
  ShoppingBag,
  Sparkles,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  creatorName: string;
  creatorHandle: string;
  soundTrack: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  tags: string[];
  pinnedProductName: string;
  pinnedProductPrice: number;
  pinnedProductOriginalPrice?: number;
  discountTag: string;
  imageUrl: string;
  liveViewerCount?: string;
}

interface MobileLiveScreenProps {
  onBuyProduct: (productName: string, price: number) => void;
}

export default function MobileLiveScreen({ onBuyProduct }: MobileLiveScreenProps) {
  const [selectedTopTab, setSelectedTopTab] = useState<0 | 1>(1); // 0: Live Panen, 1: Untuk Anda
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({ 'VID-01': true });
  const [likeCountMap, setLikeCountMap] = useState<Record<string, number>>({
    'VID-01': 3841,
    'VID-02': 5120,
    'VID-03': 2450,
    'VID-04': 1920,
  });
  const [followedMap, setFollowedMap] = useState<Record<string, boolean>>({});
  const [showCommentSheet, setShowCommentSheet] = useState(false);
  const [showProductSheet, setShowProductSheet] = useState(false);
  const [selectedVideoForSheet, setSelectedVideoForSheet] = useState<VideoItem | null>(null);
  const [heartAnimId, setHeartAnimId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState([
    { author: 'Kang Asep (Peternak Lembang)', text: 'Pakan silase ini aromanya wangi tape ya pakde? Sapi saya suka banget!' },
    { author: 'Resto Dapur Sunda', text: 'Kualitas sayur dan beras panen kemarin top banget, pasokan konsisten.' },
    { author: 'Mas Tri Widodo', text: 'Sudah order 2 karung pakan konsentrat lewat keranjang kuning video ini 👍' },
    { author: 'drh. Ahmad Kurniawan', text: 'Komposisi silase rumput odot + ampas tahu sudah pas nutrisinya untuk ruminansia.' },
  ]);

  const videos: VideoItem[] = [
    {
      id: 'VID-01',
      title: 'Cara Bikin Pakan Silase Fermentasi Rumput Odot Awet 6 Bulan Tanpa Busuk! Ternak makan lahap & ADG naik.',
      creatorName: 'Pakde Peternak Mandiri',
      creatorHandle: '@pakde_peternak_mandiri',
      soundTrack: 'Suara Asli - Tips Silase Terniva ID',
      likesCount: 3840,
      commentsCount: 214,
      sharesCount: 680,
      tags: ['#PakanFermentasi', '#TernakSapi', '#Silase'],
      pinnedProductName: 'Pakan Konsentrat Sapi Penggemukan Super 50 Kg',
      pinnedProductPrice: 240000,
      pinnedProductOriginalPrice: 270000,
      discountTag: '-11%',
      imageUrl: '/src/assets/images/terniva_mitra_farmer_1794449097085.jpg',
      liveViewerCount: '1.4k penonton',
    },
    {
      id: 'VID-02',
      title: 'Rahasia Cabai Rawit Berbuah Lebat anti Rontok Musim Hujan Pakai Mikroba Hayati Cair! Hasil panen grade A.',
      creatorName: 'Dokter Tani Nusantara',
      creatorHandle: '@dokter_tani_nusantara',
      soundTrack: 'Suara Asli - Edukasi Petani Modern',
      likesCount: 5120,
      commentsCount: 432,
      sharesCount: 1200,
      tags: ['#CabaiRawit', '#PupukHayati', '#PetaniModern'],
      pinnedProductName: 'Pupuk Hayati Cair Bio-Agritech 1000 ml',
      pinnedProductPrice: 68000,
      pinnedProductOriginalPrice: 85000,
      discountTag: '-20%',
      imageUrl: '/src/assets/images/terniva_dok_konsultasi_1794449097905.jpg',
      liveViewerCount: '3.8k penonton',
    },
    {
      id: 'VID-03',
      title: 'Lelang Live Sapi Limousin Jumbo Bobot 680kg Langsung Dari Kandang Cluster Subang! Siap kirim se-Jawa.',
      creatorName: 'Sentra Ternak Subang Jaya',
      creatorHandle: '@ternak_subang_official',
      soundTrack: 'Suara Asli - Lelang Sapi Terniva',
      likesCount: 2450,
      commentsCount: 189,
      sharesCount: 390,
      tags: ['#SapiLimousin', '#LelangTernak', '#Qurban'],
      pinnedProductName: 'Sapi Bakalan Super Subang 380kg',
      pinnedProductPrice: 19500000,
      pinnedProductOriginalPrice: 21000000,
      discountTag: '-7%',
      imageUrl: '/src/assets/images/terniva_hero_landscape_1794449096818.jpg',
      liveViewerCount: '2.1k penonton',
    },
    {
      id: 'VID-04',
      title: 'Sortir Biji Kopi Arabika Gayo Specialty Grade 1 Lolos Uji Ekspor ke Hamburg Jerman! Aroma floral & caramel.',
      creatorName: 'Koperasi Kopi Gayo Takengon',
      creatorHandle: '@gayo_specialty_coffee',
      soundTrack: 'Suara Asli - Panen Kopi Nusantara',
      likesCount: 1920,
      commentsCount: 98,
      sharesCount: 410,
      tags: ['#KopiGayo', '#EksporKopi', '#SpecialtyCoffee'],
      pinnedProductName: 'Green Bean Kopi Arabika Gayo 1 Kg',
      pinnedProductPrice: 135000,
      pinnedProductOriginalPrice: 155000,
      discountTag: '-13%',
      imageUrl: '/src/assets/images/terniva_ekspor_commodities_1794449097514.jpg',
      liveViewerCount: '890 penonton',
    },
  ];

  // Monitor scroll to update activeIdx
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    const current = Math.round(scrollTop / clientHeight);
    if (current !== activeIdx && current >= 0 && current < videos.length) {
      setActiveIdx(current);
    }
  };

  const scrollToVideo = (index: number) => {
    if (!containerRef.current) return;
    const height = containerRef.current.clientHeight;
    containerRef.current.scrollTo({
      top: index * height,
      behavior: 'smooth',
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleLike = (videoId: string) => {
    const isLiked = likedMap[videoId] || false;
    setLikedMap((prev) => ({ ...prev, [videoId]: !isLiked }));
    setLikeCountMap((prev) => ({
      ...prev,
      [videoId]: isLiked ? (prev[videoId] || 0) - 1 : (prev[videoId] || 0) + 1,
    }));
  };

  const handleDoubleTap = (videoId: string) => {
    if (!likedMap[videoId]) {
      setLikedMap((prev) => ({ ...prev, [videoId]: true }));
      setLikeCountMap((prev) => ({ ...prev, [videoId]: (prev[videoId] || 0) + 1 }));
    }
    setHeartAnimId(videoId);
    setTimeout(() => setHeartAnimId(null), 900);
  };

  const toggleFollow = (creatorHandle: string) => {
    const isFollowed = followedMap[creatorHandle] || false;
    setFollowedMap((prev) => ({ ...prev, [creatorHandle]: !isFollowed }));
    showToast(!isFollowed ? `Berhasil mengikuti ${creatorHandle}` : `Batal mengikuti ${creatorHandle}`);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setCommentsList([
      { author: 'Budi Santoso (Anda)', text: newComment.trim() },
      ...commentsList,
    ]);
    setNewComment('');
  };

  return (
    <div className="relative w-full h-full bg-black text-white overflow-hidden select-none">
      {/* 1. Top Fixed Overlay: Live Panen | Untuk Anda + LIVE Badge */}
      <div className="absolute top-0 inset-x-0 z-30 px-4 pt-3 pb-2 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-auto">
        {/* Live Badge */}
        <div className="flex items-center gap-1.5 bg-rose-600 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>LIVE</span>
          {videos[activeIdx].liveViewerCount && (
            <span className="text-[9px] font-normal opacity-90 pl-1 border-l border-white/30 font-mono">
              {videos[activeIdx].liveViewerCount}
            </span>
          )}
        </div>

        {/* Center Tabs: Live Panen | Untuk Anda */}
        <div className="flex items-center text-sm font-bold">
          <button
            onClick={() => setSelectedTopTab(0)}
            className={`px-2.5 py-1 transition-colors ${
              selectedTopTab === 0 ? 'text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            Live Panen
          </button>
          <span className="text-white/30">|</span>
          <button
            onClick={() => setSelectedTopTab(1)}
            className={`px-2.5 py-1 transition-colors relative ${
              selectedTopTab === 1 ? 'text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            Untuk Anda
            {selectedTopTab === 1 && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full shadow-sm" />
            )}
          </button>
        </div>

        {/* Mute/Sound button & Search button */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 text-white/90 hover:text-white rounded-full bg-black/40 backdrop-blur-xs"
            title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
          <button className="p-1.5 text-white/90 hover:text-white rounded-full bg-black/40 backdrop-blur-xs">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-black/85 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full border border-white/20 shadow-xl flex items-center gap-1.5 animate-fade-in pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. TikTok Vertical Snapping Scroll Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {videos.map((video, idx) => {
          const isLiked = likedMap[video.id] || false;
          const isFollowed = followedMap[video.creatorHandle] || false;
          const likesCount = likeCountMap[video.id] || video.likesCount;
          const isCurrentActive = activeIdx === idx;

          return (
            <div
              key={video.id}
              onDoubleClick={() => handleDoubleTap(video.id)}
              className="relative w-full h-full snap-start snap-always shrink-0 overflow-hidden flex flex-col justify-between"
              style={{ minHeight: '100%' }}
            >
              {/* Video Background Simulation with High Quality Photography */}
              <div className="absolute inset-0 z-0">
                <img
                  src={video.imageUrl}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-1000 ${
                    isCurrentActive && isPlaying ? 'scale-105 brightness-75' : 'scale-100 brightness-65'
                  }`}
                />
                {/* Measured Dark Scrim for Perfect TikTok Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/95" />
              </div>

              {/* Floating Center Heart on Double Tap */}
              {heartAnimId === video.id && (
                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-ping duration-700">
                  <Heart className="w-24 h-24 text-rose-500 fill-rose-500 drop-shadow-2xl" />
                </div>
              )}

              {/* Center Play/Pause Touch Area */}
              <div
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 flex items-center justify-center relative z-10 cursor-pointer"
              >
                {!isPlaying && isCurrentActive && (
                  <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl">
                    <Play className="w-8 h-8 text-white ml-1 fill-white" />
                  </div>
                )}
              </div>

              {/* Bottom Area: Shopping Pill & Creator Info on Left, Action Rail on Right */}
              <div className="relative z-20 p-3 pt-1 flex items-end justify-between gap-3 pb-3">
                {/* Left Side: Product pill & Caption */}
                <div className="flex-1 space-y-2 max-w-[270px]">
                  {/* *** KERANJANG KUNING PRODUCT PILL (Shopee Video / TikTok Shop Style) *** */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVideoForSheet(video);
                      setShowProductSheet(true);
                    }}
                    className="flex items-center gap-2 bg-amber-50/95 text-stone-900 p-1.5 pr-2.5 rounded-xl shadow-2xl border border-amber-300 cursor-pointer transition-transform active:scale-95 group hover:bg-amber-100"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-400 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                      <ShoppingBag className="w-4 h-4 text-amber-950" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold truncate leading-tight text-stone-900">
                        {video.pinnedProductName}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] font-mono font-black text-emerald-800">
                          Rp {video.pinnedProductPrice.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[9px] font-bold text-rose-600 bg-rose-100 px-1 rounded">
                          {video.discountTag}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-white bg-amber-600 group-hover:bg-amber-700 px-2 py-1 rounded-lg shadow-xs shrink-0 transition-colors">
                      Beli
                    </span>
                  </div>

                  {/* Creator handle */}
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white drop-shadow-md">
                      {video.creatorHandle}
                    </span>
                    <span className="text-[9px] text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-1.5 py-0.2 rounded font-semibold">
                      Mitra Terverifikasi
                    </span>
                  </div>

                  {/* Caption & Hashtags */}
                  <p className="text-xs text-stone-100 leading-snug drop-shadow-md">
                    {video.title}
                  </p>
                  <div className="flex flex-wrap gap-1 text-[11px] font-semibold text-emerald-300">
                    {video.tags.map((t, i) => (
                      <span key={i}>{t}</span>
                    ))}
                  </div>

                  {/* Sound track */}
                  <div className="flex items-center gap-1.5 text-[10px] text-stone-300">
                    <Music2 className="w-3 h-3 text-emerald-300 animate-bounce" />
                    <span className="truncate">{video.soundTrack}</span>
                  </div>
                </div>

                {/* Right Side: TikTok / Shopee Action Rail */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  {/* Creator Avatar with "+" Follow toggle */}
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-emerald-800 border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-xl">
                      {video.creatorName.slice(0, 2).toUpperCase()}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFollow(video.creatorHandle);
                      }}
                      className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-125 ${
                        isFollowed ? 'bg-emerald-600 text-white' : 'bg-rose-500 text-white'
                      }`}
                      title={isFollowed ? 'Mengikuti' : 'Ikuti Kreator'}
                    >
                      {isFollowed ? <Check className="w-3 h-3 stroke-[3]" /> : <Plus className="w-3 h-3 stroke-[3]" />}
                    </button>
                  </div>

                  {/* Love / Like Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(video.id);
                    }}
                    className="flex flex-col items-center group"
                  >
                    <div
                      className={`p-2 rounded-full transition-transform active:scale-125 ${
                        isLiked ? 'text-rose-500 bg-rose-500/20' : 'text-white hover:text-rose-400'
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${isLiked ? 'fill-rose-500' : ''}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-white drop-shadow">
                      {likesCount.toLocaleString('id-ID')}
                    </span>
                  </button>

                  {/* Comment Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCommentSheet(true);
                    }}
                    className="flex flex-col items-center group"
                  >
                    <div className="p-2 text-white hover:text-emerald-300 rounded-full">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-white drop-shadow">
                      {video.commentsCount}
                    </span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast('Tautan video berhasil disalin ke clipboard!');
                    }}
                    className="flex flex-col items-center group"
                  >
                    <div className="p-2 text-white hover:text-emerald-300 rounded-full">
                      <Share2 className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-white drop-shadow">
                      {video.sharesCount}
                    </span>
                  </button>

                  {/* Spinning Vinyl Music Disc */}
                  <div
                    className={`w-9 h-9 rounded-full bg-stone-900 border-2 border-stone-600 flex items-center justify-center shadow-lg ${
                      isPlaying && isCurrentActive ? 'animate-spin [animation-duration:4s]' : ''
                    }`}
                  >
                    <Music2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>



      {/* 4. Product Buying Bottom Sheet Modal */}
      {showProductSheet && selectedVideoForSheet && (
        <div className="absolute inset-0 z-50 bg-black/75 flex items-end">
          <div className="w-full bg-white text-stone-900 rounded-t-3xl p-4 shadow-2xl space-y-3 animate-slide-up">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-bold text-stone-900">Beli Produk Dari Video Ini</h4>
              </div>
              <button
                onClick={() => setShowProductSheet(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-3 items-center">
              <img
                src={selectedVideoForSheet.imageUrl}
                alt="Produk"
                className="w-16 h-16 rounded-xl object-cover bg-stone-100 shrink-0 border border-stone-200"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold leading-tight text-stone-900">
                  {selectedVideoForSheet.pinnedProductName}
                </div>
                <div className="text-sm font-bold text-emerald-800 font-mono mt-1">
                  Rp {selectedVideoForSheet.pinnedProductPrice.toLocaleString('id-ID')}
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5">
                  Dikirim langsung dari mitra peternak & petani terverifikasi Terniva
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  onBuyProduct(
                    selectedVideoForSheet.pinnedProductName,
                    selectedVideoForSheet.pinnedProductPrice
                  );
                  setShowProductSheet(false);
                }}
                className="py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Beli Sekarang</span>
              </button>

              <button
                onClick={() => {
                  showToast(`Produk ${selectedVideoForSheet.pinnedProductName} berhasil masuk keranjang!`);
                  setShowProductSheet(false);
                }}
                className="py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold rounded-xl text-xs active:scale-95 transition-transform"
              >
                + Keranjang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Comment Bottom Sheet Modal */}
      {showCommentSheet && (
        <div className="absolute inset-0 z-50 bg-black/75 flex items-end">
          <div className="w-full bg-white text-stone-900 rounded-t-3xl h-[65vh] flex flex-col shadow-2xl animate-slide-up">
            <div className="p-3 border-b border-stone-200 flex items-center justify-between shrink-0">
              <h4 className="text-xs font-bold text-stone-900">
                Komentar Petani & Pembeli ({commentsList.length + 210})
              </h4>
              <button
                onClick={() => setShowCommentSheet(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {commentsList.map((c, i) => (
                <div key={i} className="flex gap-2.5 items-start text-xs">
                  <div className="w-7 h-7 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {c.author.slice(0, 1)}
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 text-[11px]">{c.author}</div>
                    <div className="text-stone-700 leading-tight mt-0.5">{c.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleAddComment}
              className="p-2.5 border-t border-stone-200 flex items-center gap-2 shrink-0 bg-stone-50"
            >
              <input
                type="text"
                placeholder="Tulis tanggapan atau tanya pakar..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="p-2 bg-emerald-800 text-white rounded-xl disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
