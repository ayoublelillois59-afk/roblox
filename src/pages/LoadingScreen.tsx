import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ISLAMIC_FACTS = [
  { ar: "الصلاة عماد الدين", fr: "La prière est le pilier de la religion" },
  { ar: "القرآن نزل في شهر رمضان", fr: "Le Coran a été révélé durant le mois de Ramadan" },
  { ar: "الحج مرة في العمر", fr: "Le Hajj est obligatoire une fois dans la vie" },
  { ar: "الصدقة تطفئ الخطيئة", fr: "L'aumône éteint le péché" },
  { ar: "طلب العلم فريضة", fr: "Rechercher la connaissance est une obligation" }
];

export default function LoadingScreen() {
  const [fact, setFact] = useState(ISLAMIC_FACTS[0]);

  useEffect(() => {
    const randomFact = ISLAMIC_FACTS[Math.floor(Math.random() * ISLAMIC_FACTS.length)];
    setFact(randomFact);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0d9488] via-[#0f766e] to-[#115e59] flex items-center justify-center z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 text-[200px] font-serif text-white/5 rotate-12">﷽</div>
        <div className="absolute bottom-40 left-20 text-[150px] font-serif text-white/5 -rotate-12">الله</div>
      </div>

      <div className="relative text-center px-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <span className="text-6xl">☪</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Nour Al-Islam</h1>
          <p className="text-white/80 text-sm">Votre compagnon spirituel</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="w-16 h-1 bg-white/30 rounded-full mx-auto mb-2 overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
          <p className="text-white/60 text-xs">Chargement...</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-md mx-auto"
        >
          <p className="text-2xl font-serif text-white mb-3" dir="rtl">{fact.ar}</p>
          <p className="text-white/90 text-sm">{fact.fr}</p>
        </motion.div>
      </div>
    </div>
  );
}
