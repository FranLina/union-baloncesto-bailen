import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}  // empieza invisible y un poco abajo
      animate={{ opacity: 1, y: 0 }}   // aparece suavemente
      exit={{ opacity: 0, y: -20 }}    // se va hacia arriba al salir
      transition={{ duration: 0.5 }}   // duración de la animación
    >
      {children}
    </motion.div>
  );
}
