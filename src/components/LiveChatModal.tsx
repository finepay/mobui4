import { useState, useEffect, useRef } from 'react';
import { Doctor, ChatMessage } from '../types';
import { X, Send, Image, CheckCircle, ShieldCheck, Phone, Stethoscope, Sprout } from 'lucide-react';

interface LiveChatModalProps {
  doctor: Doctor;
  initialTopic?: string;
  onClose: () => void;
}

export default function LiveChatModal({ doctor, initialTopic, onClose }: LiveChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isDoctorTyping, setIsDoctorTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome message from doctor
    const greeting =
      doctor.type === 'hewan'
        ? `Halo! Saya ${doctor.name}, ${doctor.title}. Silakan ceritakan kondisi ternak Anda: jenis ternak apa, gejala klinis apa yang terlihat, dan sudah berlangsung berapa hari?`
        : `Halo! Saya ${doctor.name}, ${doctor.title}. Mohon ceritakan kondisi tanaman Anda: komoditas apa, bagian tanaman mana yang sakit (akar, batang, atau daun), dan luas tanaman yang terdampak?`;

    const initialMsgs: ChatMessage[] = [
      {
        id: 'msg-1',
        sender: 'doctor',
        text: greeting,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      },
    ];

    if (initialTopic) {
      initialMsgs.push({
        id: 'msg-user-init',
        sender: 'user',
        text: initialTopic,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      });
      // simulate quick doctor response to the prefilled topic
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: 'msg-doc-reply-init',
            sender: 'doctor',
            text: `Terima kasih atas informasinya. Saya sedang membaca catatan skrining Anda. Segera lakukan langkah pertolongan pertama yang tertera: pastikan isolasi atau sanitasi terlebih dahulu. Apakah ada tanda demam tinggi atau penyebaran ke tanaman/hewan sekitarnya?`,
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 1000);
    }

    setMessages(initialMsgs);
  }, [doctor, initialTopic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isDoctorTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulate doctor thinking & answering
    setIsDoctorTyping(true);
    setTimeout(() => {
      setIsDoctorTyping(false);
      let reply = '';
      const lower = text.toLowerCase();

      if (doctor.type === 'hewan') {
        if (lower.includes('pmk') || lower.includes('liur') || lower.includes('kuku')) {
          reply =
            'PENTING: Jangan biarkan ternak bergerak banyak agar kuku tidak makin terkelupas. Cuci moncong dengan larutan asam sitrat 2% atau cuka makan encer. Untuk nyeri dan demam, kami siapkan resep analgesik injeksi dari depo paramedis wilayah Anda.';
        } else if (lower.includes('makan') || lower.includes('nafsu') || lower.includes('lemas')) {
          reply =
            'Coba cek suhu rektal bila ada termometer (normal sapi 38.5 - 39.2°C). Berikan air gula merah dicampur sedikit garam untuk asupan energi cepat, dan tawarkan hijauan layu yang disukai.';
        } else if (lower.includes('kembung') || lower.includes('bloat')) {
          reply =
            'Darurat: Segera tegakkan posisi ternak dan berikan minyak kelapa/sayur 200-300 ml secara perlahan lewat mulut menggunakan selang/botol agar busa rumen pecah. Tim paramedis segera diberitahu.';
        } else {
          reply =
            'Baik, saya catat. Untuk penanganan tepat, saya menyarankan pemberian multivitamin penunjang dan evaluasi sanitasi alas kandang. Jika gejala berlanjut lebih dari 24 jam, tim kami akan menjadwalkan visit langsung.';
        }
      } else {
        if (lower.includes('layu') || lower.includes('kuning') || lower.includes('bakteri')) {
          reply =
            'Layu pada siang hari sering menandakan kerusakan berkas pembuluh (vaskular). Cabut 1 sampel tanaman dan celupkan batangnya ke air bersih untuk melihat asap lendir bakteri. Hindari pemupukan Nitrogen berlebih saat ini.';
        } else if (lower.includes('patek') || lower.includes('antraknosa') || lower.includes('buah')) {
          reply =
            'Untuk antraknosa buah, kunci utamanya adalah memetik semua buah yang bergejala dan dibakar/dikubur, lalu lakukan penyemprotan fungisida kontak saat cuaca cerah pagi hari.';
        } else {
          reply =
            'Saya sarankan untuk mengatur aerasi tajuk tanaman dengan pemangkasan tunas air. Pastikan drainase parit bedengan tidak tergenang agar jamur tanah tidak berkembang biak.';
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `doc-${Date.now()}`,
          sender: 'doctor',
          text: reply,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const quickQuestions =
    doctor.type === 'hewan'
      ? ['Ternak menolak makan & minum', 'Pertolongan darurat kembung', 'Cara penanganan awal luka kuku']
      : ['Daun layu mendadak saat siang', 'Buah membusuk bercak melingkar', 'Rekomendasi pupuk hayati'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full h-[90vh] max-h-[640px] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-emerald-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center border border-emerald-700">
              {doctor.type === 'hewan' ? (
                <Stethoscope className="w-5 h-5 text-emerald-200" />
              ) : (
                <Sprout className="w-5 h-5 text-emerald-200" />
              )}
            </div>
            <div>
              <div className="text-sm font-bold leading-tight">{doctor.name}</div>
              <div className="text-[11px] text-emerald-200 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                <span>Online · {doctor.specialty}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-emerald-300 hover:text-white rounded-lg hover:bg-emerald-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Trust Banner */}
        <div className="px-4 py-2 bg-stone-100 border-b border-stone-200 text-[11px] text-stone-600 flex items-center justify-between">
          <span className="font-mono">{doctor.sipNumber}</span>
          <span className="text-emerald-800 font-semibold">{doctor.fee}</span>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-800 text-white rounded-tr-xs'
                    : 'bg-white text-stone-800 border border-stone-200 shadow-xs rounded-tl-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-stone-400 mt-1 px-1 font-mono">{m.timestamp}</span>
            </div>
          ))}

          {isDoctorTyping && (
            <div className="flex items-center gap-2 text-xs text-stone-500 bg-white border border-stone-200 px-3 py-2 rounded-xl max-w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
              <span>{doctor.name} sedang mengetik rekomendasi klinis...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions suggestion */}
        <div className="p-2.5 bg-white border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
          <span className="text-[11px] text-stone-400 font-medium shrink-0 ml-1">Pilih Cepat:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 rounded-lg whitespace-nowrap text-xs border border-stone-200 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input Bar */}
        <div className="p-3 bg-white border-t border-stone-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Tanyakan pada ${doctor.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 text-white bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
