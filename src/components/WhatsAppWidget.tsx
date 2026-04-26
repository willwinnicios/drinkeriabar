import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WHATSAPP_NUMBER = "5546999158888";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsTyping(false), 2500);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(true);
    }
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const finalMessage = `${message}\n\n*Vim pelo site da Drinkeria Bar.*`;
    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`;
    window.open(link, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  const keniaPhoto = "https://media-poa1-1.cdn.whatsapp.net/v/t61.24694-24/534428882_967119052423564_6445820148721132194_n.jpg?ccb=11-4&oh=01_Q5Aa4QGc9hwKQDJZ1dR43ilOZGSaoJpVJnmfKb6TTvBfkzAgag&oe=69FA0F95&_nc_sid=5e03e0&_nc_cat=104";

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[calc(100vw-2rem)] sm:w-[350px] bg-[#E5DDD5] rounded-lg shadow-2xl overflow-hidden border border-black/10"
          >
            {/* WhatsApp Header */}
            <div className="bg-[#075E54] p-4 flex items-center gap-3">
              <div className="relative">
                <img src={keniaPhoto} alt="Kenia Tosi" className="w-10 h-10 rounded-full object-cover" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#4AD964] border-2 border-[#075E54] rounded-full" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold text-sm">Kenia Tosi</h4>
                <p className="text-white/80 text-xs">Online</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* WhatsApp Chat Body */}
            <div
              className="p-4 h-[300px] overflow-y-auto flex flex-col gap-3 custom-scrollbar relative"
              style={{
                backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
                backgroundSize: '400px',
                backgroundRepeat: 'repeat'
              }}
            >
              <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] relative z-10">
                {/* Bubble Tail */}
                <div className="absolute -left-2 top-0 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent" />

                {isTyping ? (
                  <div className="flex gap-1 py-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  </div>
                ) : (
                  <>
                    <p className="text-[#111B21] text-sm leading-relaxed">
                      Olá! Sou a Kenia Tosi. Como posso ajudar com o seu evento?
                    </p>
                    <span className="text-[10px] text-gray-400 float-right mt-1">
                      {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* WhatsApp Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-[#F0F2F5] flex items-center gap-2">
              <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mensagem"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-[#111B21]"
                />
              </div>
              <button
                type="submit"
                className="w-10 h-10 bg-[#00A884] text-white rounded-full flex items-center justify-center shadow-md hover:brightness-110 transition-all shrink-0"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current">
                  <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:brightness-110 transition-all relative group"
      >
        <svg viewBox="0 0 24 24" width="32" height="32" className="fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.029c0 2.125.556 4.197 1.61 6.076L0 24l6.103-1.6c1.805.984 3.837 1.503 5.94 1.503h.005c6.633 0 12.032-5.391 12.035-12.027a11.91 11.91 0 00-3.527-8.508" />
        </svg>
      </motion.button>
    </div>
  );
}
