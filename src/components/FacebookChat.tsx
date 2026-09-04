'use client';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/context/I18nContext';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const FacebookChat = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const pageId = '1328295487032190';
  const messengerUrl = `https://m.me/${pageId}`;

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'bot',
          text: t('chat.welcomeMsg'),
          time: getCurrentTime(),
        },
        {
          id: 'welcome-2',
          sender: 'bot',
          text: t('chat.welcomeSub'),
          time: getCurrentTime(),
        },
      ]);
    }
  }, [t]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    // Auto reply after short delay
    setTimeout(() => {
      let replyText = '';
      if (text.includes(t('chat.faq1')) || text.toLowerCase().includes('tư vấn') || text.toLowerCase().includes('khuyến mãi') || text.toLowerCase().includes('advice')) {
        replyText = t('chat.faq1Ans');
      } else if (text.includes(t('chat.faq2')) || text.toLowerCase().includes('bảo hành') || text.toLowerCase().includes('warranty')) {
        replyText = t('chat.faq2Ans');
      } else if (text.includes(t('chat.faq3')) || text.toLowerCase().includes('đơn hàng') || text.toLowerCase().includes('order')) {
        replyText = t('chat.faq3Ans');
      } else {
        replyText = `${t('chat.faq1Ans')} Bạn cũng có thể bấm nút "Chat qua Messenger" bên dưới để gặp trực tiếp chuyên viên tư vấn nhé!`;
      }

      const botReply: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 600);
  };

  return (
    <>
      {/* Interactive Chat Popup Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 sm:bottom-18 sm:right-3 sm:left-3 sm:w-auto z-50 w-[360px] h-[520px] max-h-[80vh] sm:max-h-[75vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 px-4 py-3.5 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-white shadow-inner">
                  <i className="fas fa-bolt text-amber-300 text-lg"></i>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-sm leading-tight text-white m-0">TechHouse Support</h4>
                <span className="text-[11px] text-sky-100 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {t('chat.onlineStatus')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Mở Messenger riêng"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs transition-colors"
              >
                <i className="fas fa-external-link-alt"></i>
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors font-bold"
                aria-label="Đóng chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/70 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-150 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {/* Quick Suggestions Chips */}
            <div className="pt-2 space-y-1.5">
              <p className="text-[11px] font-semibold text-slate-500">Câu hỏi thường gặp:</p>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => handleSendMessage(t('chat.faq1'))}
                  className="text-left text-xs bg-white hover:bg-sky-50 text-sky-700 border border-sky-200/80 rounded-xl px-3 py-2 transition-all shadow-2xs hover:border-sky-300"
                >
                  💡 {t('chat.faq1')}
                </button>
                <button
                  onClick={() => handleSendMessage(t('chat.faq2'))}
                  className="text-left text-xs bg-white hover:bg-sky-50 text-sky-700 border border-sky-200/80 rounded-xl px-3 py-2 transition-all shadow-2xs hover:border-sky-300"
                >
                  🛡️ {t('chat.faq2')}
                </button>
                <button
                  onClick={() => handleSendMessage(t('chat.faq3'))}
                  className="text-left text-xs bg-white hover:bg-sky-50 text-sky-700 border border-sky-200/80 rounded-xl px-3 py-2 transition-all shadow-2xs hover:border-sky-300"
                >
                  📦 {t('chat.faq3')}
                </button>
              </div>
            </div>

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Direct Messenger Handover & Input */}
          <div className="p-3 bg-white border-t border-slate-100 flex flex-col gap-2">
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-blue-50 to-sky-50 hover:from-blue-100 hover:to-sky-100 text-sky-700 text-xs font-semibold rounded-xl border border-sky-200/60 transition-colors"
            >
              <svg className="w-4 h-4 text-[#0084FF]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.913 1.454 5.512 3.729 7.195V22l3.418-1.876c.917.255 1.89.393 2.853.393 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.066 12.443l-2.614-2.79-5.1 2.79 5.61-5.955 2.678 2.79 5.036-2.79-5.61 5.955z" />
              </svg>
              <span>{t('chat.continueOnMessenger')}</span>
            </a>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={t('chat.placeholder')}
                className="flex-1 text-xs px-3.5 py-2.5 bg-slate-100/90 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="px-3.5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all disabled:opacity-50"
                disabled={!inputVal.trim()}
              >
                {t('chat.send')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Messenger Bubble */}
      <div className="fixed bottom-5 right-4 sm:bottom-4 sm:right-3 z-40 flex flex-row-reverse items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t('common.supportChatTooltip')}
          className="relative group flex items-center justify-center w-12 h-12 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#006AFF] via-[#0084FF] to-[#00C6FF] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 ease-out cursor-pointer"
        >
          {/* Ripple Ring Effect */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-sky-400/30 animate-ping opacity-75 pointer-events-none"></span>
          )}

          {isOpen ? (
            <span className="text-lg font-bold text-white">✕</span>
          ) : (
            <svg
              className="w-6 h-6 sm:w-5 sm:h-5 text-white drop-shadow-sm relative z-10"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.913 1.454 5.512 3.729 7.195V22l3.418-1.876c.917.255 1.89.393 2.853.393 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.066 12.443l-2.614-2.79-5.1 2.79 5.61-5.955 2.678 2.79 5.036-2.79-5.61 5.955z" />
            </svg>
          )}

          {/* Active Online Indicator Badge */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full z-20"></span>
        </button>

        {/* Hover / Status Tooltip - hidden on mobile via sm:hidden */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="sm:hidden bg-white/95 backdrop-blur-sm text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md border border-slate-100 hover:text-sky-600 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{t('common.supportChat')}</span>
          </button>
        )}
      </div>
    </>
  );
};

export default FacebookChat;
