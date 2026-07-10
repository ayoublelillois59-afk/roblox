import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EASE, GoldHairline } from '@/components/premium';

const ISLAMIC_FACTS = [
  { ar: 'الصلاة عماد الدين', fr: 'La prière est le pilier de la religion' },
  { ar: 'القرآن نزل في شهر رمضان', fr: 'Le Coran a été révélé durant le mois de Ramadan' },
  { ar: 'الصدقة تطفئ الخطيئة', fr: "L'aumône éteint le péché" },
  { ar: 'طلب العلم فريضة', fr: 'Rechercher la connaissance est une obligation' },
];

export default function LoadingScreen() {
  const [fact, setFact] = useState(ISLAMIC_FACTS[0]);

  useEffect(() => {
    setFact(ISLAMIC_FACTS[Math.floor(Math.random() * ISLAMIC_FACTS.length)]);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ivory">
      <div className="px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="font-quran text-5xl text-ink" dir="rtl">﷽</p>
          <h1 className="mt-6 text-title tracking-tight text-ink">Nour Al-Islam</h1>
          <p className="mt-1 text-footnote text-muted-warm">Votre compagnon spirituel</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
          className="mx-auto mt-10 max-w-xs"
        >
          <GoldHairline />
          <p className="mt-6 font-quran text-xl text-ink/85" dir="rtl">{fact.ar}</p>
          <p className="mt-2 text-footnote italic text-muted-warm">{fact.fr}</p>
        </motion.div>

        <motion.div
          className="mx-auto mt-10 h-0.5 w-24 overflow-hidden rounded-full bg-sand-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="h-full rounded-full bg-gold"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </div>
  );
}
