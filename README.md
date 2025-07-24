# 🎨 RestoSentiment Frontend

Bienvenue dans l'application frontend de **RestoSentiment** – une interface utilisateur moderne et intuitive pour la gestion des restaurants et cafés avec un module intégré d'analyse des avis clients par **analyse de sentiments**.

## 🌟 Fonctionnalités

Avec l'interface RestoSentiment, vous pouvez :
- 🔐 Gérer l'authentification des utilisateurs (clients, restaurateurs)
- 📋 Parcourir et gérer les menus interactivement
- 🛒 Passer et suivre des commandes en temps réel
- 💬 Laisser et consulter des avis avec analyse de sentiments
- 📊 Visualiser les statistiques et analyses de sentiments
- 🎯 Dashboard dédié pour les restaurateurs

## 🚀 Getting Started

### Prérequis :
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes de démarrage :

1. **Cloner le projet et installer les dépendances** :
   ```bash
   git clone https://github.com/VictoryKasende/restaurant_frontend.git
   cd restaurant_frontend
   npm install
   ```

2. **Configurer l'environnement** :
   Créez un fichier `.env` à la racine du projet :
   ```bash
   VITE_API_BASE_URL=http://127.0.0.1:8000/api
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

4. **Accéder à l'application** :
   ```
   http://localhost:5173
   ```

---

## 🛠️ Technologies utilisées

- **React 18** - Framework JavaScript moderne
- **Vite** - Build tool rapide et moderne
- **React Router** - Navigation côté client
- **Axios** - Client HTTP pour les appels API
- **Chart.js** - Visualisation des données
- **CSS3** - Styles modernes et responsifs
- **ESLint** - Linting du code

---

## 📱 Pages et fonctionnalités

### 🏠 Pages principales

| Page | Route | Description | Accès |
|------|-------|-------------|--------|
| **Accueil** | `/` | Page d'accueil avec présentation | Public |
| **Connexion** | `/login` | Authentification utilisateur | Public |
| **Inscription** | `/register` | Création de compte | Public |
| **Dashboard** | `/dashboard` | Tableau de bord restaurateur | Restaurateur |
| **Menu** | `/menu` | Gestion des plats et menus | Restaurateur |
| **Commandes** | `/commandes` | Gestion des commandes | Restaurateur |
| **Tables** | `/tables` | Gestion des tables | Restaurateur |
| **Avis & Sentiments** | `/avis-sentiment` | Analyse des avis clients | Restaurateur |

### 🧩 Composants principaux

| Composant | Description |
|-----------|-------------|
| **LayoutRestaurateur** | Layout principal pour les restaurateurs |
| **AvisCard** | Affichage des avis avec sentiment |
| **SentimentPie** | Graphique en secteurs des sentiments |
| **WordCloudAvis** | Nuage de mots des avis |
| **CommandeCard** | Carte d'affichage des commandes |
| **MenuItemCard** | Carte d'affichage des plats |
| **TableCard** | Carte d'affichage des tables |

---

## 🔐 Authentification

L'application utilise l'authentification **JWT** avec :
- Stockage sécurisé des tokens
- Rafraîchissement automatique des tokens
- Protection des routes sensibles
- Gestion des rôles utilisateurs

### Flux d'authentification :
1. Connexion via `/login`
2. Stockage du token JWT
3. Ajout automatique du token aux requêtes API
4. Redirection selon le rôle utilisateur

---

## 📊 Analyse de sentiments

L'interface propose plusieurs visualisations :
- **Graphiques en secteurs** - Répartition des sentiments
- **Tendances temporelles** - Évolution des sentiments
- **Nuage de mots** - Mots-clés les plus fréquents
- **Statistiques détaillées** - Métriques avancées

---

## 🏗️ Structure du projet

```
src/
├── components/          # Composants réutilisables
├── pages/              # Pages principales
├── hooks/              # Hooks personnalisés
├── services/           # Services API
├── utils/              # Utilitaires
└── assets/             # Ressources statiques
```

---

## 🔧 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lancer le serveur de développement |
| `npm run build` | Construire pour la production |
| `npm run preview` | Prévisualiser la build de production |
| `npm run lint` | Vérifier le code avec ESLint |

---

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (< 768px)

---

## 🔄 API Integration

L'application communique avec l'API RestoSentiment via :
- **Base URL** : Configurable via variables d'environnement
- **Authentification** : Headers JWT automatiques
- **Gestion d'erreurs** : Intercepteurs Axios
- **Loading states** : États de chargement pour UX optimale

---

## 🛡️ Sécurité

- Protection contre les attaques XSS
- Validation côté client des formulaires
- Gestion sécurisée des tokens JWT
- Routes protégées selon les rôles

---

## 🆘 Besoin d'aide ?

* 🛠 GitHub Issues : [https://github.com/VictoryKasende/restaurant_frontend/issues](https://github.com/VictoryKasende/restaurant_frontend/issues)
* 📫 Contact : [victory.kasende@example.com](mailto:victory.kasende@example.com)
* 🤝 Collaborateur : Jean-Luc Mupasa

---

© 2025 RestoSentiment Frontend – Tous droits réservés (Victoire Kasende).
