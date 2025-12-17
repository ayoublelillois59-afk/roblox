import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft, Mic, Square, Loader2, Volume2, CheckCircle2,
  AlertCircle, BookOpen, Info, Sparkles, ChevronRight
} from 'lucide-react';
import { createPageUrl } from "@/utils";
import { cn } from "@/lib/utils";

const TAJWEED_RULES = [
  {
    id: 'ghunna',
    title: 'La Ghunna',
    description: 'Nasalisation de 2 temps sur les lettres ن et م',
    example: 'مِنْ كُلِّ'
  },
  {
    id: 'madd',
    title: 'Le Madd (Prolongation)',
    description: 'Prolongation de 2, 4 ou 6 temps selon le type',
    example: 'قَالَ - يَا أَيُّهَا'
  },
  {
    id: 'qalqala',
    title: 'La Qalqala',
    description: 'Rebondissement sur les lettres: ق ط ب ج د',
    example: 'قَدْ - لَمْ يَلِدْ'
  },
  {
    id: 'idgham',
    title: "L'Idgham",
    description: 'Fusion de deux lettres identiques ou similaires',
    example: 'مِنْ رَّبِّهِمْ'
  },
  {
    id: 'ikhfa',
    title: "L'Ikhfa",
    description: 'Dissimulation du Noon ou Tanwin',
    example: 'مَنْ صَدَقَ'
  }
];

interface TajweedResult {
  arabic_text?: string;
  translation?: string;
  overall_quality: string;
  correct_rules?: Array<{ rule: string; description: string }>;
  errors?: Array<{ type: string; location?: string; correction: string; rule?: string }>;
  advice?: string[];
  sources?: string[];
}

export default function TajweedPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<TajweedResult | null>(null);
  const [showRules, setShowRules] = useState(true);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setResult(null);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Erreur: Impossible d\'accéder au microphone. Veuillez autoriser l\'accès.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const analyzeRecording = async () => {
    if (!audioBlob) return;

    setProcessing(true);
    try {
      // Simulate analysis (replace with real API call later)
      await new Promise(resolve => setTimeout(resolve, 2000));

      setResult({
        arabic_text: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ",
        translation: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux",
        overall_quality: "good",
        correct_rules: [
          { rule: "Ghunna", description: "Nasalisation correcte sur 'بِسْمِ'" },
          { rule: "Madd", description: "Prolongation bien appliquée sur 'الرَّحْمٰنِ'" }
        ],
        errors: [
          {
            type: "Prononciation",
            location: "الرَّحِيمِ",
            correction: "Le 'ر' doit être roulé plus clairement",
            rule: "Makharij al-Huruf"
          }
        ],
        advice: [
          "Travaillez la prononciation du 'ر' (Ra) en le roulant légèrement",
          "Pratiquez la Ghunna pendant 2 temps complets",
          "Excellent début ! Continuez à pratiquer quotidiennement"
        ],
        sources: ["Al-Muqaddima al-Jazariyya", "Tuhfat al-Atfal"]
      });
    } catch (error) {
      console.error('Error analyzing recording:', error);
      setResult({
        overall_quality: "cannot_analyze",
        errors: [],
        advice: ["Une erreur s'est produite lors de l'analyse. Veuillez réessayer avec un enregistrement plus clair."]
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d9488]/10 via-white to-emerald-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">تحسين التجويد</h1>
            <p className="text-sm opacity-90">Correction de Tajweed par IA</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Info Banner */}
        <Alert className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <AlertDescription className="text-sm text-blue-800">
            <strong>Fonctionnalité Premium:</strong> Enregistrez votre récitation et recevez une analyse
            détaillée de votre Tajweed basée sur les règles authentiques enseignées par les savants.
          </AlertDescription>
        </Alert>

        {/* Recording Section */}
        <Card className="mb-6 shadow-lg border-none">
          <CardHeader className="bg-gradient-to-r from-[#0d9488]/10 to-emerald-50">
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-6 h-6 text-[#0d9488]" />
              Enregistrer votre récitation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {/* Recording Button */}
              <div>
                {!isRecording ? (
                  <Button
                    onClick={startRecording}
                    size="lg"
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-xl"
                    disabled={processing}
                  >
                    <div className="flex flex-col items-center">
                      <Mic className="w-12 h-12 mb-2" />
                      <span className="text-sm">Enregistrer</span>
                    </div>
                  </Button>
                ) : (
                  <Button
                    onClick={stopRecording}
                    size="lg"
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 shadow-xl animate-pulse"
                  >
                    <div className="flex flex-col items-center">
                      <Square className="w-12 h-12 mb-2 fill-current" />
                      <span className="text-sm">Arrêter</span>
                    </div>
                  </Button>
                )}
              </div>

              {/* Status */}
              {isRecording && (
                <div className="flex items-center justify-center gap-2 text-red-600">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                  <span className="font-medium">Enregistrement en cours...</span>
                </div>
              )}

              {/* Analyze Button */}
              {audioBlob && !isRecording && (
                <div className="space-y-3">
                  <p className="text-sm text-green-600 font-medium flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Enregistrement terminé
                  </p>
                  <Button
                    onClick={analyzeRecording}
                    disabled={processing}
                    className="bg-[#0d9488] hover:bg-[#0f766e]"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyse en cours...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyser le Tajweed
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Instructions */}
              <div className="text-left bg-amber-50 rounded-xl p-4 border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Comment utiliser:
                </h4>
                <ol className="text-sm text-amber-700 space-y-1 list-decimal list-inside">
                  <li>Cliquez sur le bouton pour commencer l'enregistrement</li>
                  <li>Récitez un verset ou une sourate du Coran</li>
                  <li>Cliquez sur "Arrêter" quand vous avez terminé</li>
                  <li>L'IA analysera votre Tajweed et vous donnera des conseils</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className="mb-6 shadow-lg border-none">
            <CardHeader className="bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white">
              <CardTitle>Résultats de l'analyse</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {result.overall_quality === "cannot_analyze" ? (
                <Alert className="bg-red-50 border-red-200">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Impossible d'analyser l'enregistrement. Veuillez réessayer avec un audio plus clair.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  {/* Transcription */}
                  {result.arabic_text && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Transcription:</h3>
                      <p className="text-2xl font-serif text-right text-gray-800 mb-2" dir="rtl">
                        {result.arabic_text}
                      </p>
                      {result.translation && (
                        <p className="text-gray-600 italic">"{result.translation}"</p>
                      )}
                    </div>
                  )}

                  {/* Quality Badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Qualité globale:</span>
                    <Badge className={
                      result.overall_quality === "excellent" ? "bg-green-500" :
                      result.overall_quality === "good" ? "bg-blue-500" :
                      "bg-orange-500"
                    }>
                      {result.overall_quality === "excellent" ? "Excellent" :
                       result.overall_quality === "good" ? "Bien" :
                       "À améliorer"}
                    </Badge>
                  </div>

                  {/* Correct Rules */}
                  {result.correct_rules && result.correct_rules.length > 0 && (
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Règles bien appliquées
                      </h3>
                      <div className="space-y-2">
                        {result.correct_rules.map((rule, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-green-800">{rule.rule}</p>
                              <p className="text-sm text-green-700">{rule.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Errors */}
                  {result.errors && result.errors.length > 0 && (
                    <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                      <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Points à corriger
                      </h3>
                      <div className="space-y-3">
                        {result.errors.map((error, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-3 border border-red-100">
                            <p className="font-medium text-gray-800 mb-1">{error.type}</p>
                            {error.location && (
                              <p className="text-sm text-gray-600 mb-1">📍 {error.location}</p>
                            )}
                            <p className="text-sm text-gray-700 mb-2">{error.correction}</p>
                            {error.rule && (
                              <Badge variant="outline" className="text-xs">
                                Règle: {error.rule}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Advice */}
                  {result.advice && result.advice.length > 0 && (
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Conseils pour s'améliorer
                      </h3>
                      <ul className="space-y-2">
                        {result.advice.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-blue-700">
                            <span className="text-blue-500">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Sources */}
                  {result.sources && result.sources.length > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-xs text-gray-500 flex items-center gap-2">
                        <BookOpen className="w-3 h-3" />
                        Sources: {result.sources.join(', ')}
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tajweed Rules Reference */}
        <Card className="shadow-lg border-none">
          <CardHeader
            className="bg-gradient-to-r from-indigo-50 to-purple-50 cursor-pointer"
            onClick={() => setShowRules(!showRules)}
          >
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                Règles de Tajweed
              </span>
              <ChevronRight className={cn(
                "w-5 h-5 text-indigo-600 transition-transform",
                showRules && "rotate-90"
              )} />
            </CardTitle>
          </CardHeader>
          {showRules && (
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {TAJWEED_RULES.map((rule) => (
                  <div key={rule.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                    <h3 className="font-bold text-indigo-900 mb-2">{rule.title}</h3>
                    <p className="text-sm text-indigo-700 mb-2">{rule.description}</p>
                    <p className="text-lg font-serif text-right text-indigo-800" dir="rtl">
                      {rule.example}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Note importante:</strong> Ces règles sont basées sur les ouvrages de référence
                  reconnus par les savants : Al-Muqaddima al-Jazariyya, Tuhfat al-Atfal, et les enseignements
                  des Qaris certifiés d'Al-Azhar.
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
