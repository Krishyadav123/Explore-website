import { BrowserRouter } from "react-router-dom";
import { MessageCircleMore } from "lucide-react"; // Ya agar version me WhatsApp icon ho to WhatsApp use kar sakte ho
import whatsapp from "./assets/whatsapp-logo.png"; // Agar aap WhatsApp icon ka image use karna chahte ho to ye line uncomment kar do
import AllRoutes from "./routes/routes";
import "./App.css";
import { CategoryProvider } from "./context/CategoryContext";
import { motion } from "framer-motion";

const App = () => {
  const handleWhatsAppClick = () => {
    const phone = "7500372237"; // Baad me apna number change kar dena
    const message = encodeURIComponent(
      "Hello! I would like to inquire about your services."
    );

    window.open(
      `https://wa.me/${phone}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <CategoryProvider>
      <BrowserRouter>
        <AllRoutes />

        {/* Floating WhatsApp Button */}
      <motion.button
  onClick={handleWhatsAppClick}
  initial={{ y: 0 }}
  animate={{ y: [0, -10, 0] }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut",
  }}
  whileHover={{
    scale: 1.1,
    y: -5,
  }}
  whileTap={{
    scale: 0.95,
  }}
  className="fixed bottom-5 right-5 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg"
  aria-label="Chat on WhatsApp"
>
  <img
    src={whatsapp}
    alt="WhatsApp"
    className="h-full w-full rounded-full"
  />
</motion.button>
      </BrowserRouter>
    </CategoryProvider>
  );
};

export default App;