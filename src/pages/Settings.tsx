import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Bell, Moon, Globe, Volume2, Download } from 'lucide-react';
import { createPageUrl } from "@/utils";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'fr',
    prayerAlerts: true,
    autoPlay: false,
    downloadQuality: 'high'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d9488]/5 via-white to-[#0d9488]/5 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Paramètres</h1>
            <p className="text-sm opacity-90">Configuration de l'application</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#0d9488]" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notifications générales</p>
                <p className="text-sm text-gray-500">Recevoir les notifications</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(v) => setSettings({...settings, notifications: v})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alertes de prière</p>
                <p className="text-sm text-gray-500">Rappel avant chaque prière</p>
              </div>
              <Switch
                checked={settings.prayerAlerts}
                onCheckedChange={(v) => setSettings({...settings, prayerAlerts: v})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Apparence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-[#0d9488]" />
              Apparence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mode sombre</p>
                <p className="text-sm text-gray-500">Thème sombre (bientôt disponible)</p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(v) => setSettings({...settings, darkMode: v})}
                disabled
              />
            </div>
          </CardContent>
        </Card>

        {/* Langue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#0d9488]" />
              Langue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={settings.language} onValueChange={(v) => setSettings({...settings, language: v})}>
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-[#0d9488]" />
              Audio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Lecture automatique</p>
                <p className="text-sm text-gray-500">Lancer automatiquement les récitations</p>
              </div>
              <Switch
                checked={settings.autoPlay}
                onCheckedChange={(v) => setSettings({...settings, autoPlay: v})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Téléchargements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-[#0d9488]" />
              Téléchargements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p className="font-medium mb-2">Qualité audio</p>
              <Select value={settings.downloadQuality} onValueChange={(v) => setSettings({...settings, downloadQuality: v})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Basse (32 kbps)</SelectItem>
                  <SelectItem value="medium">Moyenne (64 kbps)</SelectItem>
                  <SelectItem value="high">Haute (128 kbps)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* À propos */}
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Version 1.0.0</p>
            <p className="text-xs text-gray-500">
              © 2025 Nour Al-Islam • نور الإسلام
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
