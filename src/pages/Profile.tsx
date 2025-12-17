import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft, Settings, Bell, Globe, Volume2,
  Download, Info, LogOut, Trash2
} from 'lucide-react';
import { createPageUrl } from "@/utils";
// Firebase auth will be configured later

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'fr',
    prayerAlerts: true,
    autoplay: false,
    downloadQuality: 'medium'
  });

  useEffect(() => {
    // Check user status from localStorage for now
    const storedUser = localStorage.getItem('user_name');
    if (storedUser) {
      setUser({ displayName: storedUser });
    } else {
      setIsGuest(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_name');
    navigate(createPageUrl('Home'));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      localStorage.removeItem('user_name');
      navigate(createPageUrl('Home'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Mon Profil</h1>
            <p className="text-sm opacity-90">Paramètres et préférences</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* User Info */}
        <Card className="mb-6 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0d9488] to-[#0f766e] rounded-full flex items-center justify-center text-white text-2xl">
                {isGuest ? '👤' : (user?.displayName?.[0] || user?.email?.[0] || 'U')}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">
                  {isGuest ? 'Invité' : user?.displayName || 'Utilisateur'}
                </h2>
                {!isGuest && user?.email && (
                  <p className="text-gray-600 text-sm">{user.email}</p>
                )}
                {isGuest && (
                  <Button
                    size="sm"
                    className="mt-2 bg-[#0d9488] hover:bg-[#0f766e]"
                    onClick={() => {
                      const name = prompt('Entrez votre nom:');
                      if (name) {
                        localStorage.setItem('user_name', name);
                        window.location.reload();
                      }
                    }}
                  >
                    Créer un compte
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Sections */}
        <div className="space-y-4">
          {/* Notifications */}
          <Card className="border-none shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="w-5 h-5 text-[#0d9488]" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Activer les notifications</p>
                  <p className="text-sm text-gray-500">Recevoir les rappels de prière</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, notifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Alertes de prière</p>
                  <p className="text-sm text-gray-500">Rappels 10 min avant</p>
                </div>
                <Switch
                  checked={settings.prayerAlerts}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, prayerAlerts: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Apparence */}
          <Card className="border-none shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="w-5 h-5 text-[#0d9488]" />
                Apparence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Mode sombre</p>
                  <p className="text-sm text-gray-500">Thème de l'application</p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, darkMode: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Langue */}
          <Card className="border-none shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="w-5 h-5 text-[#0d9488]" />
                Langue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={settings.language} onValueChange={(value) =>
                setSettings({ ...settings, language: value })
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Audio */}
          <Card className="border-none shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Volume2 className="w-5 h-5 text-[#0d9488]" />
                Audio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Lecture automatique</p>
                  <p className="text-sm text-gray-500">Lire la sourate suivante</p>
                </div>
                <Switch
                  checked={settings.autoplay}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, autoplay: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Téléchargements */}
          <Card className="border-none shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Download className="w-5 h-5 text-[#0d9488]" />
                Téléchargements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="font-medium text-gray-800 mb-2">Qualité audio</p>
                <Select value={settings.downloadQuality} onValueChange={(value) =>
                  setSettings({ ...settings, downloadQuality: value })
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Basse (économie de données)</SelectItem>
                    <SelectItem value="medium">Moyenne (recommandée)</SelectItem>
                    <SelectItem value="high">Haute (meilleure qualité)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* À propos */}
          <Card className="border-none shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="w-5 h-5 text-[#0d9488]" />
                À propos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Version</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Développé par</span>
                <span className="font-medium">Nour Al-Islam Team</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="border-none shadow">
            <CardContent className="p-4 space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {isGuest ? 'Quitter le mode invité' : 'Se déconnecter'}
              </Button>

              {!isGuest && (
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer le compte
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
