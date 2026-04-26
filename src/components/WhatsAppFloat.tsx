import { MessageCircle } from "lucide-react";

const PHONE = "1234567890";
const MSG = encodeURIComponent("Hi BuildCraft, I'd like to know more about your interior packages.");

export const WhatsAppFloat = () => (
  <a
    href={`https://wa.me/${PHONE}?text=${MSG}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-elegant hover:scale-110 transition-transform"
  >
    <MessageCircle className="h-7 w-7" />
    <span className="absolute -top-1 -right-1 flex h-3 w-3">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
      <span className="relative inline-flex h-3 w-3 rounded-full bg-[#25D366]" />
    </span>
  </a>
);
