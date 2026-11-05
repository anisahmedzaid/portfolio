# Anis Ahmed Zaid · Ingénieur IA

> Version Markdown de https://anisahmedzaid.com/ pour les agents et les outils de lecture.
> Ingénieur IA, diplômé de l'ENSICAEN (2025), passé par ALTEN Labs. Des LLM dans de vrais processus métier, testés avant d'être livrés.
> Ouvert à un poste en équipe ou à des missions en automatisation IA (LLM et agents sur des processus métier). Basé en Île-de-France, mobile en France et en remote.

- CV (PDF) : https://anisahmedzaid.com/cv/CV-Anis-Ahmed-Zaid.pdf
- LinkedIn : https://linkedin.com/in/anis-ahmed-zaid
- Email : contact@anisahmedzaid.com
- Profil détaillé pour assistant IA (Markdown) : https://anisahmedzaid.com/anis-ahmed-zaid.md
- Guide pour les agents : https://anisahmedzaid.com/llms.txt
- Photo : https://anisahmedzaid.com/img/anis-ahmed-zaid-800.jpg

Diplômé de l'ENSICAEN (2025, IA et traitement d'images), passé par ALTEN Labs. Depuis septembre 2025, en indépendant, je conçois et livre seul des outils d'IA générative pour des entreprises : tri d'emails par LLM, chatbot RAG, agent vocal, préparation de paie. Ouvert à un poste en équipe ou à des missions en automatisation IA. Basé en Île-de-France, mobile en France et en remote.

## En bref

- 5 projets clients livrés, menés seul du cadrage à la livraison
- 2 automatisations en production chez des clients (paie et veille concurrentielle)
- Stage de fin d'études chez ALTEN Labs sur des agents LLM

## Projets : trois projets clients, en détail

Pour chacun : le problème, ce que j'ai construit, comment je l'ai vérifié.

### 01 · Assistant email par LLM pour une entreprise de collecte de déchets

*Livré au client · juin 2026 · entreprise de collecte de déchets, Québec*

Plaintes, ramassages manqués, demandes de devis : tout arrivait en vrac dans une seule boîte, et des clients partaient faute de réponse.

À chaque email reçu, un seul appel au LLM renvoie un JSON structuré : l'une de 10 catégories métier, un résumé, le ton du client et un brouillon de réponse dans sa langue, français ou anglais. L'email est rangé sous le bon libellé Gmail et une notification part sur Telegram. Rien n'est envoyé au client : le workflow ne contient aucune étape d'envoi, une personne relit chaque brouillon.

- Vérification : 16 emails de test écrits à l'avance, 16 traités correctement, y compris un cas piège de classification et aucune date inventée
- Bug corrigé : deux emails dans la même minute faisaient échouer le second. Corrigé, puis validé sur 20 emails simultanés sans perte
- Choix clé : client sensible à la confidentialité, donc Qwen 2.5 exécuté en local avec Ollama ; aucun email ne part vers une API d'IA externe
- Outils : n8n, Ollama (Qwen 2.5), Gmail API, Telegram, Docker, sortie JSON
- Démo sur le site : trois emails fictifs, avec catégorie, ton, résumé et brouillon préparés à l'avance

### 02 · Chatbot RAG et agent vocal pour un centre de formation

*Livré au client · mai 2026 · centre de formation en médecines alternatives*

Les visiteurs posaient sans cesse les mêmes questions, alors que les réponses existaient déjà dans les documents du centre : PDF, tableaux Excel et CSV.

Une chaîne d'ingestion lit les documents depuis Google Drive, les découpe, calcule leurs embeddings et les range dans une base vectorielle Supabase ; les tableaux sont stockés ligne par ligne pour être interrogés en SQL. Un agent avec mémoire de conversation choisit son outil selon la question. Le chat s'ajoute au site du client avec une seule balise script. J'ai aussi conçu un agent vocal d'accueil téléphonique.

- Choix clé : le texte et les tableaux ne se cherchent pas de la même façon ; une recherche vectorielle répond mal à « combien coûte la formation X ? » quand la réponse est dans une cellule
- Mon rôle : seul, de la conception à la livraison du code et des guides d'installation
- Outils : n8n, OpenAI, Supabase, Retell, JavaScript
- Démo sur le site : trois questions inventées et l'outil que l'agent choisit (recherche sémantique, document entier ou requête SQL)

### 03 · Préparation des salaires automatisée, en production chez une société de portage salarial

*En production · depuis mai 2026, chaque mois · société de portage salarial*

Chaque mois, l'équipe reprenait à la main l'export du logiciel de paie pour préparer les fichiers de salaires, la feuille comptable et la commande de titres-restaurant.

Un script Google Apps Script intégré à Google Sheets ajoute un menu en trois étapes : feuille comptable (brut, charges et coût global par salarié), feuille d'intégration, commande de titres-restaurant. Le plus délicat : rapprocher des salariés entre fichiers aux formats différents.

- Résultat : quelques heures de travail manuel économisées chaque mois, avec moins de risques d'erreur de recopie
- Cas traités : matricules « 0021 » contre 21, noms avec ou sans accents, nombres au format « 1 234,56 », en-têtes irréguliers
- Fiabilité : tests automatisés en Node.js qui simulent Apps Script, et un générateur Python de fichiers de paie de démonstration
- Outils : Google Apps Script, Google Sheets, JavaScript, Node.js, Python

### Autres projets

- **Veille concurrentielle hebdomadaire, en production depuis mai 2026.** Un workflow n8n suit chaque semaine les concurrents d'une entreprise de marketing et envoie par email une synthèse rédigée par LLM (OpenAI).
- **Audit des justificatifs comptables par LLM, livré au client.** Chaque mois, repérer dans les emails factures et reçus, extraire émetteur, date et montant, signaler les pièces manquantes et préparer l'envoi au comptable.
- **Recherche texte-image dans la Tapisserie de Bayeux, projet d'école** avec le laboratoire GREYC (oct. 2024 à jan. 2025). Retrouver une scène en la décrivant : CLIP place textes et images dans un même espace, la recherche devient un calcul de similarité.
- **Hackathon LCL Paris, 3e place (sept. 2024).** Un chatbot expert des cartes bancaires, développé en équipe en 26 heures avec Gemini sur Google Cloud.

## Comment je travaille

- **Tester avant de livrer.** Un système LLM se valide sur des cas concrets écrits à l'avance, cas limites compris, pas sur une impression. C'est ainsi que le bug des emails simultanés a été trouvé avant la livraison.
- **Garder l'humain dans la boucle.** Sur les actions qui engagent l'entreprise, le modèle prépare et une personne décide. Si une information manque, le brouillon écrit « [à compléter] » au lieu de l'inventer.
- **Choisir le modèle pour le besoin.** Coût, latence, confidentialité : selon le client, un modèle via API (OpenAI, Claude, Gemini) ou un modèle open source en local avec Ollama.
- **Livrer de bout en bout.** Cadrage du besoin, développement, recette, guide d'installation et relation client. J'utilise des outils de code IA comme Claude Code, avec une revue systématique du code produit.

## Parcours

- **sept. 2025 à aujourd'hui · Ingénieur IA indépendant**, Île-de-France. Outils d'IA générative et automatisations pour des entreprises, du cadrage à la recette. Deux automatisations sont en production chez les clients (paie et veille concurrentielle).
- **fév. à août 2025 · Ingénieur IA, stage de fin d'études**, ALTEN Labs, Rennes, direction de l'innovation. Prototype de recherche pour piloter des agents logiciels et physiques en langage naturel avec des LLM : un agent Excel, un bras robotique intégré avec un autre laboratoire, puis le routage de demandes multiples vers le bon agent par un LLM classifieur. Travail en binôme ; exécutable autonome, API et interface web de chat, déploiement avec Docker Compose, modèles hébergés (OpenAI) et locaux (Ollama).
- **mai à août 2024 · Stage Machine Learning en radiothérapie**, Hôpital C. Mahmoudi, Tizi-Ouzou. Modèle de Machine Learning pour assister les physiciens médicaux, à partir de données DICOM (Keras, Pydicom, Scikit-learn).
- **2022 à 2025 · Diplôme d'ingénieur**, ENSICAEN, Caen. Spécialité intelligence artificielle et traitement d'images.
- **2020 à 2022 · Classes préparatoires MPSI puis PSI**, Lycée Pothier, Orléans.

## Compétences, et où elles ont servi

| Domaine | Compétences | Où |
|---|---|---|
| LLM et IA générative | OpenAI, Claude, Gemini, Ollama (Qwen), prompt engineering, sorties JSON, consignes anti-invention | Assistant email, chatbot RAG, ALTEN Labs, hackathon LCL, veille, audit des justificatifs |
| RAG et embeddings | Découpage de documents, embeddings, Supabase, recherche sémantique et SQL | Chatbot du centre de formation, recherche CLIP sur la Tapisserie |
| Agents | Choix d'outils, routage par LLM classifieur, dialogue orienté tâche, agent vocal (Retell, ElevenLabs) | Chatbot RAG, agents vocaux (centre de formation, conciergerie), ALTEN Labs |
| Machine Learning et vision | TensorFlow / Keras, Scikit-learn, Pandas, NumPy, CLIP, traitement d'images | Stage en radiothérapie, projet Bayeux, spécialité ENSICAEN |
| Langages | Python, SQL, JavaScript (Apps Script) | Tous les projets |
| Automatisation et outils | n8n, Google Apps Script, Google APIs, Supabase, Git, Docker (bases), GCP | Projets clients |
| Langues | Français natif, anglais C1, arabe B2 | |

## Contact

Un poste ou une mission en automatisation IA ? Parlons-en. Ouvert à un CDI comme à des missions en freelance. Basé en Île-de-France, mobile en France et en remote.

- Email : contact@anisahmedzaid.com
- LinkedIn : https://linkedin.com/in/anis-ahmed-zaid
- CV (PDF) : https://anisahmedzaid.com/cv/CV-Anis-Ahmed-Zaid.pdf
- Comparer ce profil à une offre : donnez https://anisahmedzaid.com/anis-ahmed-zaid.md et l'offre à votre assistant IA
