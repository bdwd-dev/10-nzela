# Nzela — Transport Intelligent

## Vue d'ensemble

**Nzela** est une solution de transport intelligent développée par **YB Group Ltd** pour révolutionner le transport en commun urbain au Congo-Brazzaville. Le projet s'attaque à la gestion opaque de la trésorerie, le manque de visibilité des propriétaires de flottes et l'absence d'information claire pour les passagers.

## Positionnement Marché

### Marché Cible
- **Principal :** Propriétaires de flottes de bus (Coaster, Hiace)
- **Secondaire :** Chauffeurs, passagers, agents de recharge
- **Tertiaire :** Autorités urbaines, municipalités

### Problème Résolu
Le transport informel au Congo souffre de trois problèmes majeurs :
1. **Coulage financier** — Vols, manipulation d'espèces, disputes sur la monnaie
2. **Opacité** — Aucun suivi des trajets réellement effectués
3. **Information** — Panneaux illisibles, pas de communication claire des lignes

### Solution Proposée
Un écosystème complet : boîtier embarqué Kibalu + plateforme de paiement YB Pay + SaaS de gestion de flotte.

## Structure du Projet

```
10-nzela/
├── backend/          # API Express.js (paiement, flotte, agents)
├── web/              # SaaS Web (dashboard transporteur)
├── mobile/           # App Agent + Simulateur Kibalu
└── docs/             # Documentation projet
```

## Business Model

### Sources de Revenus
1. **Vente/Leasing matériel** — Boîtier Kibalu, écran IPS, panneau LED P10
2. **Abonnement SaaS** — 50 000 - 200 000 XAF/mois selon la taille de la flotte
3. **Frais de transaction** — 1-2% par paiement électronique
4. **Commissions agents** — 5% sur chaque recharge de carte
5. **Data** — Rapports d'analytics, optimisation des lignes

### Gamme de Prix
- **Boîtier Kibalu :** 500 000 - 1 500 000 XAF (achat) ou 50 000 XAF/mois (leasing)
- **Abonnement SaaS :** 50 000 - 200 000 XAF/mois
- **Carte YB Pay :** 1 000 XAF
- **Commission recharge :** 5% du montant rechargé

### Objectifs de Ventes (12 mois)
- **Mois 1-3 :** 5 bus équipés, 3 agents
- **Mois 4-6 :** 20 bus équipés, 15 agents
- **Mois 7-12 :** 50 bus équipés, 50 agents

## Avantages Concurrentiels

1. **Digitalisation** — Argent digitalisé, zéro espèces dans le bus
2. **Temps réel** — Suivi des recettes et des lignes en direct
3. **Transparence** — Données fiables pour propriétaires et autorités
4. **Réseau d'agents** — Création d'emplois locaux
5. **Panneau LED** — Information claire, lisible à 30m, modifiable à distance

## Stratégie de Développement

### Phase 1 — Lancement (Mois 1-3)
- Développement boîtier Kibalu MVP
- SaaS web fonctionnel
- 5 bus pilotes à Brazzaville

### Phase 2 — Croissance (Mois 4-6)
- Application mobile agent
- 20 bus équipés
- Partenariats transporteurs

### Phase 3 — Expansion (Mois 7-12)
- Expansion Pointe-Noire
- 50+ bus équipés
- Intégration autorités urbaines

## Indicateurs Clés (KPI)

| Indicateur | Objectif Année 1 |
|------------|------------------|
| Bus équipés | 50+ |
| Agents actifs | 50+ |
| Transactions/jour | 5 000+ |
| Revenus | 30 000 000+ XAF |
| NPS | 50+ |

## Budget Prévisionnel

| Poste | Coût (XAF) |
|-------|-----------|
| Développement matériel | 10 000 000 |
| Développement logiciel | 5 000 000 |
| Marketing | 3 000 000 |
| Infrastructure | 2 000 000 |
| **Total** | **20 000 000** |

## Perspectives

Nzela vise à devenir la solution de référence pour le transport intelligent en Afrique Centrale, en s'étendant vers d'autres villes du Congo et d'autres pays. Le projet prévoit également l'intégration de nouvelles fonctionnalités (suivi GPS, paiement sans contact, intermodalité).
