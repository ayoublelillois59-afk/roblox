import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Heart } from 'lucide-react';
import { cn } from "@/lib/utils";

const RECITERS = [
  { id: "ar.alafasy", name: "Mishary Rashid Alafasy", nameAr: "مشاري راشد العفاسي", country: "Koweït" },
  { id: "ar.abdulbasitmurattal", name: "Abdul Basit (Murattal)", nameAr: "عبد الباسط عبد الصمد", country: "Égypte" },
  { id: "ar.abdurrahmaansudais", name: "Abdurrahman As-Sudais", nameAr: "عبدالرحمن السديس", country: "Arabie Saoudite" },
  { id: "ar.husary", name: "Mahmoud Khalil Al-Husary", nameAr: "محمود خليل الحصري", country: "Égypte" },
  { id: "ar.minshawi", name: "Mohamed Siddiq Al-Minshawi", nameAr: "محمد صديق المنشاوي", country: "Égypte" },
];

// Toutes les 114 sourates
const SURAHS = [
  { number: 1, name: "Al-Fatiha", nameAr: "الفاتحة", verses: 7 },
  { number: 2, name: "Al-Baqara", nameAr: "البقرة", verses: 286 },
  { number: 3, name: "Ali 'Imran", nameAr: "آل عمران", verses: 200 },
  { number: 4, name: "An-Nisa", nameAr: "النساء", verses: 176 },
  { number: 5, name: "Al-Ma'ida", nameAr: "المائدة", verses: 120 },
  { number: 6, name: "Al-An'am", nameAr: "الأنعام", verses: 165 },
  { number: 7, name: "Al-A'raf", nameAr: "الأعراف", verses: 206 },
  { number: 8, name: "Al-Anfal", nameAr: "الأنفال", verses: 75 },
  { number: 9, name: "At-Tawba", nameAr: "التوبة", verses: 129 },
  { number: 10, name: "Yunus", nameAr: "يونس", verses: 109 },
  { number: 11, name: "Hud", nameAr: "هود", verses: 123 },
  { number: 12, name: "Yusuf", nameAr: "يوسف", verses: 111 },
  { number: 13, name: "Ar-Ra'd", nameAr: "الرعد", verses: 43 },
  { number: 14, name: "Ibrahim", nameAr: "إبراهيم", verses: 52 },
  { number: 15, name: "Al-Hijr", nameAr: "الحجر", verses: 99 },
  { number: 16, name: "An-Nahl", nameAr: "النحل", verses: 128 },
  { number: 17, name: "Al-Isra", nameAr: "الإسراء", verses: 111 },
  { number: 18, name: "Al-Kahf", nameAr: "الكهف", verses: 110 },
  { number: 19, name: "Maryam", nameAr: "مريم", verses: 98 },
  { number: 20, name: "Ta-Ha", nameAr: "طه", verses: 135 },
  { number: 21, name: "Al-Anbiya", nameAr: "الأنبياء", verses: 112 },
  { number: 22, name: "Al-Hajj", nameAr: "الحج", verses: 78 },
  { number: 23, name: "Al-Mu'minun", nameAr: "المؤمنون", verses: 118 },
  { number: 24, name: "An-Nur", nameAr: "النور", verses: 64 },
  { number: 25, name: "Al-Furqan", nameAr: "الفرقان", verses: 77 },
  { number: 26, name: "Ash-Shu'ara", nameAr: "الشعراء", verses: 227 },
  { number: 27, name: "An-Naml", nameAr: "النمل", verses: 93 },
  { number: 28, name: "Al-Qasas", nameAr: "القصص", verses: 88 },
  { number: 29, name: "Al-Ankabut", nameAr: "العنكبوت", verses: 69 },
  { number: 30, name: "Ar-Rum", nameAr: "الروم", verses: 60 },
  { number: 31, name: "Luqman", nameAr: "لقمان", verses: 34 },
  { number: 32, name: "As-Sajda", nameAr: "السجدة", verses: 30 },
  { number: 33, name: "Al-Ahzab", nameAr: "الأحزاب", verses: 73 },
  { number: 34, name: "Saba", nameAr: "سبأ", verses: 54 },
  { number: 35, name: "Fatir", nameAr: "فاطر", verses: 45 },
  { number: 36, name: "Ya-Sin", nameAr: "يس", verses: 83 },
  { number: 37, name: "As-Saffat", nameAr: "الصافات", verses: 182 },
  { number: 38, name: "Sad", nameAr: "ص", verses: 88 },
  { number: 39, name: "Az-Zumar", nameAr: "الزمر", verses: 75 },
  { number: 40, name: "Ghafir", nameAr: "غافر", verses: 85 },
  { number: 41, name: "Fussilat", nameAr: "فصلت", verses: 54 },
  { number: 42, name: "Ash-Shura", nameAr: "الشورى", verses: 53 },
  { number: 43, name: "Az-Zukhruf", nameAr: "الزخرف", verses: 89 },
  { number: 44, name: "Ad-Dukhan", nameAr: "الدخان", verses: 59 },
  { number: 45, name: "Al-Jathiya", nameAr: "الجاثية", verses: 37 },
  { number: 46, name: "Al-Ahqaf", nameAr: "الأحقاف", verses: 35 },
  { number: 47, name: "Muhammad", nameAr: "محمد", verses: 38 },
  { number: 48, name: "Al-Fath", nameAr: "الفتح", verses: 29 },
  { number: 49, name: "Al-Hujurat", nameAr: "الحجرات", verses: 18 },
  { number: 50, name: "Qaf", nameAr: "ق", verses: 45 },
  { number: 51, name: "Adh-Dhariyat", nameAr: "الذاريات", verses: 60 },
  { number: 52, name: "At-Tur", nameAr: "الطور", verses: 49 },
  { number: 53, name: "An-Najm", nameAr: "النجم", verses: 62 },
  { number: 54, name: "Al-Qamar", nameAr: "القمر", verses: 55 },
  { number: 55, name: "Ar-Rahman", nameAr: "الرحمن", verses: 78 },
  { number: 56, name: "Al-Waqi'a", nameAr: "الواقعة", verses: 96 },
  { number: 57, name: "Al-Hadid", nameAr: "الحديد", verses: 29 },
  { number: 58, name: "Al-Mujadila", nameAr: "المجادلة", verses: 22 },
  { number: 59, name: "Al-Hashr", nameAr: "الحشر", verses: 24 },
  { number: 60, name: "Al-Mumtahana", nameAr: "الممتحنة", verses: 13 },
  { number: 61, name: "As-Saf", nameAr: "الصف", verses: 14 },
  { number: 62, name: "Al-Jumu'a", nameAr: "الجمعة", verses: 11 },
  { number: 63, name: "Al-Munafiqun", nameAr: "المنافقون", verses: 11 },
  { number: 64, name: "At-Taghabun", nameAr: "التغابن", verses: 18 },
  { number: 65, name: "At-Talaq", nameAr: "الطلاق", verses: 12 },
  { number: 66, name: "At-Tahrim", nameAr: "التحريم", verses: 12 },
  { number: 67, name: "Al-Mulk", nameAr: "الملك", verses: 30 },
  { number: 68, name: "Al-Qalam", nameAr: "القلم", verses: 52 },
  { number: 69, name: "Al-Haqqa", nameAr: "الحاقة", verses: 52 },
  { number: 70, name: "Al-Ma'arij", nameAr: "المعارج", verses: 44 },
  { number: 71, name: "Nuh", nameAr: "نوح", verses: 28 },
  { number: 72, name: "Al-Jinn", nameAr: "الجن", verses: 28 },
  { number: 73, name: "Al-Muzzammil", nameAr: "المزمل", verses: 20 },
  { number: 74, name: "Al-Muddaththir", nameAr: "المدثر", verses: 56 },
  { number: 75, name: "Al-Qiyama", nameAr: "القيامة", verses: 40 },
  { number: 76, name: "Al-Insan", nameAr: "الإنسان", verses: 31 },
  { number: 77, name: "Al-Mursalat", nameAr: "المرسلات", verses: 50 },
  { number: 78, name: "An-Naba", nameAr: "النبأ", verses: 40 },
  { number: 79, name: "An-Nazi'at", nameAr: "النازعات", verses: 46 },
  { number: 80, name: "Abasa", nameAr: "عبس", verses: 42 },
  { number: 81, name: "At-Takwir", nameAr: "التكوير", verses: 29 },
  { number: 82, name: "Al-Infitar", nameAr: "الإنفطار", verses: 19 },
  { number: 83, name: "Al-Mutaffifin", nameAr: "المطففين", verses: 36 },
  { number: 84, name: "Al-Inshiqaq", nameAr: "الإنشقاق", verses: 25 },
  { number: 85, name: "Al-Buruj", nameAr: "البروج", verses: 22 },
  { number: 86, name: "At-Tariq", nameAr: "الطارق", verses: 17 },
  { number: 87, name: "Al-A'la", nameAr: "الأعلى", verses: 19 },
  { number: 88, name: "Al-Ghashiya", nameAr: "الغاشية", verses: 26 },
  { number: 89, name: "Al-Fajr", nameAr: "الفجر", verses: 30 },
  { number: 90, name: "Al-Balad", nameAr: "البلد", verses: 20 },
  { number: 91, name: "Ash-Shams", nameAr: "الشمس", verses: 15 },
  { number: 92, name: "Al-Layl", nameAr: "الليل", verses: 21 },
  { number: 93, name: "Ad-Duha", nameAr: "الضحى", verses: 11 },
  { number: 94, name: "Ash-Sharh", nameAr: "الشرح", verses: 8 },
  { number: 95, name: "At-Tin", nameAr: "التين", verses: 8 },
  { number: 96, name: "Al-Alaq", nameAr: "العلق", verses: 19 },
  { number: 97, name: "Al-Qadr", nameAr: "القدر", verses: 5 },
  { number: 98, name: "Al-Bayyina", nameAr: "البينة", verses: 8 },
  { number: 99, name: "Az-Zalzala", nameAr: "الزلزلة", verses: 8 },
  { number: 100, name: "Al-Adiyat", nameAr: "العاديات", verses: 11 },
  { number: 101, name: "Al-Qari'a", nameAr: "القارعة", verses: 11 },
  { number: 102, name: "At-Takathur", nameAr: "التكاثر", verses: 8 },
  { number: 103, name: "Al-Asr", nameAr: "العصر", verses: 3 },
  { number: 104, name: "Al-Humaza", nameAr: "الهمزة", verses: 9 },
  { number: 105, name: "Al-Fil", nameAr: "الفيل", verses: 5 },
  { number: 106, name: "Quraysh", nameAr: "قريش", verses: 4 },
  { number: 107, name: "Al-Ma'un", nameAr: "الماعون", verses: 7 },
  { number: 108, name: "Al-Kawthar", nameAr: "الكوثر", verses: 3 },
  { number: 109, name: "Al-Kafirun", nameAr: "الكافرون", verses: 6 },
  { number: 110, name: "An-Nasr", nameAr: "النصر", verses: 3 },
  { number: 111, name: "Al-Masad", nameAr: "المسد", verses: 5 },
  { number: 112, name: "Al-Ikhlas", nameAr: "الإخلاص", verses: 4 },
  { number: 113, name: "Al-Falaq", nameAr: "الفلق", verses: 5 },
  { number: 114, name: "An-Nas", nameAr: "الناس", verses: 6 },
];

export default function QuranPlayer({ onFavorite, favorites = [] }) {
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0].id);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  const currentSurah = SURAHS.find(s => s.number === selectedSurah) || SURAHS[0];
  const currentReciter = RECITERS.find(r => r.id === selectedReciter) || RECITERS[0];
  const isFavorite = favorites.includes(selectedSurah);

  const getAudioUrl = () => {
    return `https://cdn.islamic.network/quran/audio-surah/128/${selectedReciter}/${selectedSurah}.mp3`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      setIsLoading(true);
      audioRef.current.src = getAudioUrl();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [selectedSurah, selectedReciter]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleEnded = () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      setIsPlaying(false);
    }
  };

  const handleSeek = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextSurah = () => {
    if (selectedSurah < 114) {
      setSelectedSurah(selectedSurah + 1);
    }
  };

  const prevSurah = () => {
    if (selectedSurah > 1) {
      setSelectedSurah(selectedSurah - 1);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0d9488] via-[#0f766e] to-[#0d9488] rounded-3xl p-8 text-white shadow-2xl">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onCanPlay={() => setIsLoading(false)}
      />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm mb-4">
          القرآن الكريم
        </div>
        <h2 className="text-4xl font-bold mb-2" style={{ fontFamily: 'serif' }}>
          {currentSurah.nameAr}
        </h2>
        <p className="text-emerald-200">
          Sourate {currentSurah.name} • {currentSurah.verses} versets
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="text-sm text-emerald-200 mb-2 block">Récitateur</label>
          <Select value={selectedReciter} onValueChange={setSelectedReciter}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RECITERS.map(reciter => (
                <SelectItem key={reciter.id} value={reciter.id}>
                  <div className="flex items-center gap-2">
                    <span>{reciter.name}</span>
                    <span className="text-gray-500 text-sm">({reciter.country})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm text-emerald-200 mb-2 block">Sourate</label>
          <Select value={String(selectedSurah)} onValueChange={(v) => setSelectedSurah(Number(v))}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {SURAHS.map(surah => (
                <SelectItem key={surah.number} value={String(surah.number)}>
                  {surah.number}. {surah.name} - {surah.nameAr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          onValueChange={handleSeek}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-emerald-200">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onFavorite?.(selectedSurah)}
          className={cn("text-white hover:bg-white/10", isFavorite && "text-yellow-400")}
        >
          <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={prevSurah}
          className="text-white hover:bg-white/10"
          disabled={selectedSurah === 1}
        >
          <SkipBack className="w-6 h-6" />
        </Button>

        <Button
          onClick={togglePlay}
          disabled={isLoading}
          className="w-16 h-16 rounded-full bg-white text-emerald-800 hover:bg-emerald-100 shadow-lg"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-7 h-7" />
          ) : (
            <Play className="w-7 h-7 ml-1" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSurah}
          className="text-white hover:bg-white/10"
          disabled={selectedSurah === 114}
        >
          <SkipForward className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsRepeat(!isRepeat)}
          className={cn("text-white hover:bg-white/10", isRepeat && "text-yellow-400")}
        >
          <Repeat className="w-5 h-5" />
        </Button>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
          className="text-white hover:bg-white/10"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={100}
          step={1}
          onValueChange={(v) => { setVolume(v[0]); setIsMuted(false); }}
          className="w-32"
        />
      </div>

      {/* Current Reciter Info */}
      <div className="mt-6 text-center text-sm text-emerald-200">
        <p>{currentReciter.nameAr}</p>
        <p className="text-xs opacity-70">{currentReciter.name}</p>
      </div>
    </div>
  );
}
