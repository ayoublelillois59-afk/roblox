import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ApiConfig() {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si une clé existe déjà
    const existingKey = localStorage.getItem('OPENAI_API_KEY');
    if (existingKey) {
      setApiKey(existingKey);
      setSaved(true);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey || !apiKey.startsWith('sk-')) {
      setError('Clé API invalide. Elle doit commencer par "sk-"');
      return;
    }

    localStorage.setItem('OPENAI_API_KEY', apiKey);
    setSaved(true);
    setError('');

    // Recharger la page pour appliquer la nouvelle clé
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleClear = () => {
    localStorage.removeItem('OPENAI_API_KEY');
    setApiKey('');
    setSaved(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <KeyRound className="w-8 h-8 text-teal-600" />
              <CardTitle className="text-3xl">Configuration API OpenAI</CardTitle>
            </div>
            <CardDescription className="text-lg">
              Configurez votre clé API OpenAI pour utiliser les fonctionnalités d'IA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {saved && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 text-green-800">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Clé API configurée avec succès!</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Clé API OpenAI
                </label>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-proj-..."
                  className="font-mono"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Votre clé est stockée localement dans votre navigateur et n'est jamais envoyée à nos serveurs.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-blue-900">Comment obtenir une clé API?</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                  <li>Allez sur <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">platform.openai.com/api-keys</a></li>
                  <li>Connectez-vous ou créez un compte</li>
                  <li>Cliquez sur "Create new secret key"</li>
                  <li>Copiez la clé et collez-la ci-dessus</li>
                </ol>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                  size="lg"
                >
                  {saved ? 'Mettre à jour' : 'Sauvegarder'}
                </Button>
                {saved && (
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    size="lg"
                  >
                    Effacer
                  </Button>
                )}
              </div>

              {saved && (
                <Button
                  onClick={() => navigate('/tajweed')}
                  className="w-full"
                  variant="secondary"
                  size="lg"
                >
                  Aller à la page Réciter →
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>🔒 Sécurité: Votre clé API reste dans votre navigateur</p>
          <p className="mt-1">💰 Coût: ~0.05$ par analyse complète</p>
        </div>
      </div>
    </div>
  );
}
