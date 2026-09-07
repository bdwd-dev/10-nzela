# NZELA

Transport Intelligent — SaaS + Agent + Simulateur Kibalu

**Organisation :** YB Group Ltd

## Structure

```
10-nzela/
├── backend/          # Express.js API (Port 3010)
│   ├── server.js
│   ├── package.json
│   └── db.json
├── web/              # React frontend (HTML + Babel standalone)
│   └── index.html
└── mobile/           # Flutter app
    └── lib/main.dart
```

## Démarrage

```bash
# Backend
cd 10-nzela/backend
npm install
npm start

# Web — Ouvrir 10-nzela/web/index.html dans un navigateur
# ou servir avec: npx serve 10-nzela/web

# Mobile
cd 10-nzela/mobile
flutter pub get
flutter run
```

## API

| Endpoint | Description |
|----------|-------------|
| GET /api/health | Health check |
| GET /api/stats | Statistiques |
