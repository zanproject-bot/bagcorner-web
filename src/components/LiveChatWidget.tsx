import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const WA_NUMBER = "6281774977770";

export function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const send = () => {
    const text = msg.trim() || "Halo Bag Corner, saya tertarik dengan produk Anda.";
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    setMsg("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 max-w-[calc(100vw-2.5rem)] rounded-3xl bg-card shadow-2xl border overflow-hidden">
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">Bag Corner CS</div>
              <div className="text-xs opacity-90 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-whatsapp inline-block" />
                Online sekarang
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Tutup chat" className="p-1 rounded-full hover:bg-white/20 transition">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 bg-muted/40 min-h-32">
            <div className="bg-card rounded-2xl rounded-tl-sm p-3 text-sm max-w-[85%] shadow-sm">
              Halo! 👋 Ada yang bisa kami bantu? Ketik pesan dan kami balas via WhatsApp.
            </div>
          </div>
          <div className="p-3 border-t flex gap-2 bg-card">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ketik pesan..."
              className="flex-1 px-4 py-2.5 rounded-full bg-muted text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button onClick={send} aria-label="Kirim" className="w-10 h-10 rounded-full bg-primary text-primary-foreground grid place-items-center hover:opacity-90 transition">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Buka live chat"
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-xl hover:scale-105 active:scale-95 transition"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
