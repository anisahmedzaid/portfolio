# Anis Ahmed Zaid · Ingénieur IA

> Version Markdown de https://anisahmedzaid.com/ pour les agents et les outils de lecture.
> Ingénieur IA diplômé de l'ENSICAEN (2025), passé par ALTEN Labs. L'IA générative appliquée à de vrais problèmes d'entreprise.
> Cherche un CDI d'ingénieur IA / ML en Île-de-France ou en remote ; ouvert aussi à des missions freelance.

- CV (PDF) : https://anisahmedzaid.com/cv/CV-Anis-Ahmed-Zaid.pdf
- LinkedIn : https://linkedin.com/in/anis-ahmed-zaid
- Email : contact@anisahmedzaid.com
- Guide pour les agents : https://anisahmedzaid.com/llms.txt
- Photo : https://anisahmedzaid.com/img/anis-ahmed-zaid-800.jpg

Je suis Anis Ahmed Zaid, ingénieur ENSICAEN (2025, IA et traitement d'images), passé par ALTEN Labs. Depuis septembre 2025, en indépendant, je conçois seul des outils d'IA générative et des automatisations pour des entreprises : tri d'emails par LLM, chatbot RAG, agent vocal, préparation de paie.

Je cherche un CDI d'ingénieur IA / ML dans une équipe produit ou data, sur des systèmes utilisés à plus grande échelle.

## Projets : trois clients, un projet d'école

Pour chacun : le contexte, ce que j'ai construit, comment je l'ai vérifié.

### 01 · Assistant email par LLM pour une entreprise de collecte de déchets au Québec

*Livré au client · juin 2026*

Plaintes, ramassages manqués, demandes de devis : les emails arrivaient en vrac. Le but : ne plus perdre de clients sur des emails restés sans réponse.

À chaque email reçu, le système le classe dans l'une de 10 catégories métier (urgent, plainte, ramassage manqué, nouveau client…), résume le problème et le ton du client, puis range l'email sous le bon libellé Gmail. Il prépare aussi un brouillon de réponse dans la langue du client, en français ou en anglais. Aucun email ne part seul : le workflow ne contient tout simplement aucune étape d'envoi.

- Mon rôle : seul, du cadrage avec le client à la livraison (workflow et guide d'installation)
- Recette : 16 emails de test sur 16 traités correctement : 10 catégories exactes, aucune date ni promesse inventée, réponses en français et en anglais
- Robustesse : un bug de concurrence trouvé en recette (deux emails dans la même minute) puis corrigé ; validé ensuite sur 20 emails simultanés, sans perte
- Choix clé : un modèle open source (Qwen 2.5) exécuté en local avec Ollama sur un serveur privé ; les emails ne partent vers aucune API d'IA externe
- Outils : n8n, Ollama, Gmail API, Telegram, prompt engineering
- Démo sur le site : trois emails fictifs, avec catégorie, ton, résumé et brouillon préparés à l'avance

### 02 · Chatbot RAG et agent vocal pour un centre de formation en médecines alternatives

*Livré au client · mai 2026*

Les visiteurs posaient les mêmes questions, alors que les réponses existaient déjà dans les documents du centre (PDF, tableaux Excel ou CSV).

Une chaîne d'ingestion lit les documents depuis Google Drive (PDF, Excel, CSV), les découpe, calcule leurs embeddings et les range dans une base vectorielle Supabase ; les tableaux sont stockés ligne par ligne pour être interrogés en SQL. Côté conversation, un agent choisit son outil selon la question : recherche sémantique, lecture d'un document entier ou requête SQL, avec une mémoire de conversation. Le chatbot s'ajoute au site du client avec une seule balise script. J'ai aussi conçu l'agent vocal d'accueil téléphonique (Retell, ElevenLabs).

- Mon rôle : seul, de la conception à la livraison du code et des guides
- Choix clé : un agent qui choisit entre recherche vectorielle et SQL, car le texte et les tableaux ne se cherchent pas de la même façon
- Outils : n8n, OpenAI (chat et embeddings), Supabase, PostgreSQL, Retell, ElevenLabs, JavaScript, PHP
- Schéma sur le site : question → documents (recherche vectorielle) ou tableaux (SQL) → réponse du LLM

### 03 · Préparation des salaires automatisée, en production pour une société de portage salarial

*En production · depuis mai 2026*

Chaque mois, il fallait reprendre l'export de paie à la main pour préparer les fichiers de salaires et la commande de titres-restaurant.

J'ai écrit un script Google Apps Script qui transforme l'export de paie en un tableau consolidé (brut, charges, coût global par salarié) et remplit la commande de titres-restaurant. Il est livré avec une batterie de tests et tourne en production depuis mai 2026.

- Résultat : quelques heures de travail manuel économisées chaque mois
- Fiabilité : livré avec une batterie de tests sur des fichiers de paie de démonstration
- Outils : Google Apps Script, Google Sheets, JavaScript, Python (tests)

### 04 · Recherche multimodale texte-image dans la Tapisserie de Bayeux (CLIP)

*Projet d'école · avec le laboratoire GREYC · oct. 2024 à jan. 2025*

La Tapisserie fait près de 70 mètres. Comment retrouver une scène sans la connaître, juste en la décrivant, ou à partir d'une autre image ?

J'ai utilisé CLIP, un modèle qui place textes et images dans un même espace de vecteurs. Une description et une scène qui parlent de la même chose se retrouvent proches : la recherche devient un calcul de similarité.

- Outils : Python, OpenAI CLIP, embeddings, similarité vectorielle, computer vision
- Schéma sur le site : espace d'embeddings illustratif en 2D

### Aussi

- **Veille concurrentielle hebdomadaire, en production.** Un workflow n8n qui suit les concurrents d'une entreprise de marketing et produit une synthèse chaque semaine.
- **Audit des justificatifs comptables par LLM.** Chaque mois, repérer dans les emails factures et reçus, extraire émetteur, date et montant, signaler les pièces manquantes et préparer l'envoi au comptable. Livré à la société de portage.
- **Hackathon LCL Paris, 3e place (sept. 2024).** Un prototype de chatbot expert des cartes bancaires, développé en 26 heures avec Gemini sur Google Cloud.

## Ma méthode : tester, garder l'humain, choisir le bon modèle

- **Tester avant de livrer.** Un système LLM se valide sur des cas concrets écrits à l'avance, pas sur une impression : 16 emails de test pour l'assistant, cas limites compris.
- **Garder l'humain dans la boucle.** Sur les actions qui engagent, le modèle prépare et une personne décide. Si une information manque, le brouillon écrit « [à compléter] » au lieu de l'inventer.
- **Choisir le modèle pour le besoin.** Coût, latence, confidentialité : selon le client, un modèle via API (OpenAI) ou un modèle open source en local avec Ollama.

## Compétences, et le projet qui les prouve

| Compétence | Preuve |
|---|---|
| LLM : OpenAI, Claude, Gemini, Ollama | Assistant email, chatbot RAG, agents chez ALTEN, hackathon LCL (API hébergées et modèles locaux) |
| IA générative et prompt engineering | Assistant email : catégorie, résumé, ton et brouillon en une sortie JSON, consignes anti-invention ; audit des justificatifs comptables par LLM |
| RAG et embeddings | Chatbot du centre de formation, recherche CLIP sur la Tapisserie (Supabase comme base vectorielle) |
| Agents et NLP | Agent RAG qui choisit ses outils (recherche vectorielle, SQL), prototype de pilotage d'agents chez ALTEN Labs, agent vocal (Retell), classification d'emails |
| Prototypage rapide | Chatbot en 26 heures au hackathon LCL (3e place), prototype de recherche chez ALTEN Labs |
| Machine Learning et vision | Modèle d'aide à la radiothérapie (données DICOM), spécialité traitement d'images à l'ENSICAEN (TensorFlow / Keras, Scikit-learn, Pandas, NumPy) |
| Python et SQL | Python sur tous les projets, SQL pour les données structurées du chatbot |
| Automatisation et outils | n8n (workflows en production), Google Apps Script, Supabase, Git, GCP, Docker (bases) |
| Langues | Français (natif), anglais (C1), arabe (B2) |

## Parcours

- **sept. 2025 à aujourd'hui · Ingénieur IA indépendant**, Île-de-France. Conception et livraison d'outils d'IA générative et d'automatisations pour des entreprises, du cadrage à la recette : projets 01 à 03. Deux automatisations sont en production chez les clients (paie et veille concurrentielle).
- **fév. à août 2025 · Ingénieur IA, stage de fin d'études**, ALTEN Labs, Rennes. Prototype de recherche : pilotage d'agents en langage naturel à base de LLM. Intégration de modèles locaux (Ollama) et hébergés (OpenAI), conteneurisation avec Docker.
- **mai à août 2024 · Stage Machine Learning en radiothérapie**, Hôpital C. Mahmoudi, Tizi-Ouzou. Modèle de Machine Learning pour assister les physiciens médicaux, à partir de données DICOM (Keras, Pydicom, Scikit-learn).
- **2022 à 2025 · Diplôme d'ingénieur**, ENSICAEN, Caen. Spécialité intelligence artificielle et traitement d'images.
- **2020 à 2022 · Classes préparatoires MPSI puis PSI**, Lycée Pothier, Orléans.

## Contact

Vous recrutez un ingénieur IA junior ? Parlons-en. Ouvert à un CDI comme à des missions en freelance, en Île-de-France ou en remote.

- Email : contact@anisahmedzaid.com
- LinkedIn : https://linkedin.com/in/anis-ahmed-zaid
- CV (PDF) : https://anisahmedzaid.com/cv/CV-Anis-Ahmed-Zaid.pdf
