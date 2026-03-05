import { MessageCircle } from "lucide-react";

const WhatsAppWidget = () => {
  return (
    <a
      href="https://wa.me/393520459150"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-15 h-15 rounded-full bg-[#25D366] text-primary-foreground shadow-xl animate-float-pulse"
      style={{ width: 60, height: 60 }}
      aria-label="Contattaci su WhatsApp"
    >
      <MessageCircle size={30} fill="currentColor" />
    </a>
  );
};

export default WhatsAppWidget;
