# Configuration de la clé API OpenAI

## Problème résolu

Le serveur de développement Vite ne chargeait pas correctement les fichiers `.env` ou `.env.local`.

## Solution mise en place

Un script `start-dev.sh` charge explicitement les variables d'environnement depuis `.env.local` avant de démarrer Vite.

## Utilisation

### 1. Créer le fichier .env.local (déjà créé)

Le fichier `.env.local` est déjà configuré avec votre clé API OpenAI.

### 2. Démarrer le serveur

```bash
./start-dev.sh
```

ou

```bash
bash start-dev.sh
```

### 3. Accéder à l'application

Ouvrez http://localhost:5173/ dans votre navigateur.

## Vérification

Pour vérifier que la clé est bien chargée:
1. Ouvrez la console développeur (F12)
2. Vous devriez voir:
```
🔑 Configuration OpenAI:
  - Clé chargée depuis .env: Oui (sk-proj-0T-IxTmnnh...)
  - Longueur de la clé: 164
  - Toutes les variables VITE_*: Array(19)
```

## Sécurité

- Le fichier `.env.local` est dans `.gitignore` et ne sera JAMAIS commité
- La clé API reste locale et sécurisée
- Ne partagez jamais votre fichier `.env.local`

## Alternative (ancienne méthode - ne fonctionne pas)

~~`npm run dev`~~ ← Cette méthode ne charge pas les variables d'environnement

Utilisez TOUJOURS `./start-dev.sh` à la place.
