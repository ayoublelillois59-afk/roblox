#!/bin/bash
# Script de démarrage qui charge les variables d'environnement depuis .env.local

# Charger les variables depuis .env.local
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | grep -v '^$' | xargs)
fi

# Démarrer le serveur Vite
npm run dev
