# Anis Ahmed Zaid · Ingénieur IA

> Version Markdown de https://anisahmedzaid.com/ pour les agents et les outils de lecture.
> Ingénieur IA diplômé de l'ENSICAEN (2025), passé par ALTEN Labs. Du prototype LLM à l'outil livré et testé.
> Cherche un CDI d'ingénieur IA / ML en Île-de-France ou en remote ; ouvert aussi à des missions freelance.

- CV (PDF) : https://anisahmedzaid.com/cv/CV-Anis-Ahmed-Zaid.pdf
- LinkedIn : https://linkedin.com/in/anis-ahmed-zaid
- Email : contact@anisahmedzaid.com
- Guide pour les agents : https://anisahmedzaid.com/llms.txt
- Photo : https://anisahmedzaid.com/img/anis-ahmed-zaid-800.jpg

Je suis Anis Ahmed Zaid, ingénieur ENSICAEN (2025, IA et traitement d'images), passé par ALTEN Labs. Depuis septembre 2025, en indépendant, je conçois seul des outils d'IA générative pour des PME : RAG, agents, traitement d'emails, avec des modèles hébergés ou 100 % locaux.

**En bref**

- **16/16** scénarios de recette validés avant livraison (assistant email)
- **100 %** local avec Ollama pour un client sensible à la confidentialité
- **En production** : automatisation de la paie, utilisée chaque mois
- **3e** au hackathon LCL Paris, en 26 heures

Je cherche un CDI d'ingénieur IA / ML dans une équipe produit ou data, sur des systèmes utilisés à plus grande échelle.

## Projets : du besoin à l'outil livré

Deux outils d'IA générative livrés à des clients, une automatisation en production et un projet de recherche multimodale. Pour chacun : le problème, mes choix techniques, le résultat.

### 01 · Assistant email par LLM : tri en 10 catégories et brouillons relus par un humain

*Livré au client · PME*

Une boîte mail professionnelle reçoit trop de messages pour être traitée à la main. Le but : gagner du temps sans jamais laisser un modèle répondre seul à un client.

Chaque email est classé dans l'une de 10 catégories métier, résumé, puis le modèle rédige un brouillon. Rien ne part automatiquement : une personne relit, corrige et envoie. Les consignes du modèle (prompt engineering) l'empêchent d'inventer des informations absentes de l'email.

- Mon rôle : seul, du cadrage avec le client à la livraison
- Résultat : 16 scénarios de recette sur 16 validés avant la livraison
- Choix clé : une version 100 % locale avec Ollama, pour un client qui ne voulait pas que ses emails sortent de chez lui
- Outils : LLM via API et en local (Ollama), classification, NLP
- Démo sur le site : trois emails fictifs, avec catégorie, résumé et brouillon préparés à l'avance

### 02 · Chatbot RAG sur la base documentaire d'un organisme de formation, et agent vocal d'accueil

*Livré au client · Organisme de formation*

Les réponses aux questions courantes existent déjà dans les documents de l'organisme. Encore faut-il les retrouver, par écrit comme au téléphone.

J'ai construit un chatbot RAG : les documents sont découpés, transformés en embeddings et stockés dans une base vectorielle Supabase. À chaque question, le système retrouve les passages utiles et le LLM répond à partir d'eux. Les données en tableau sont interrogées en SQL plutôt que par similarité. J'ai aussi construit un agent vocal temps réel pour l'accueil téléphonique (Retell, ElevenLabs).

- Mon rôle : seul, de la conception à la livraison
- Choix clé : chaque question va vers la bonne source, recherche vectorielle pour le texte, SQL pour les tableaux
- Outils : embeddings, Supabase, SQL, OpenAI, n8n, Retell, ElevenLabs
- Schéma sur le site : question → documents (recherche vectorielle) ou tableaux (SQL) → réponse du LLM

### 03 · Paie automatisée en production, utilisée chaque mois par le client

*En production · depuis plusieurs mois*

Moins visible qu'un chatbot, mais c'est l'outil qui tourne vraiment : chaque mois, il remplace quelques heures de préparation manuelle.

J'ai automatisé la préparation mensuelle de la paie avec Google Apps Script. Elle est en production chez le client depuis plusieurs mois. Une veille concurrentielle automatisée tourne aussi chez un client.

- Résultat : quelques heures de travail manuel économisées chaque mois
- Outils : Google Apps Script, Google APIs

### 04 · Recherche multimodale texte-image dans la Tapisserie de Bayeux (CLIP)

*Projet d'école · avec le laboratoire GREYC · oct. 2024 à jan. 2025*

La Tapisserie fait près de 70 mètres. Comment retrouver une scène sans la connaître, juste en la décrivant, ou à partir d'une autre image ?

J'ai utilisé CLIP, un modèle qui place textes et images dans un même espace de vecteurs. Une description et une scène qui parlent de la même chose se retrouvent proches : la recherche devient un calcul de similarité.

- Outils : Python, OpenAI CLIP, embeddings, similarité vectorielle, computer vision
- Schéma sur le site : espace d'embeddings illustratif en 2D

### Aussi

- **Hackathon LCL Paris, 3e place (sept. 2024).** Un prototype de chatbot expert des cartes bancaires, développé en 26 heures avec Gemini sur Google Cloud.
- **Audit automatique de justificatifs.** Livré à un client PME.

## Ma méthode : tester, garder l'humain, choisir le bon modèle

- **Tester avant de livrer.** Un système LLM se valide sur des cas concrets écrits à l'avance, pas sur une impression : 16 scénarios sur 16 pour l'assistant email.
- **Garder l'humain dans la boucle.** Sur les actions qui engagent, le modèle prépare et une personne décide. Aucun email ne part sans relecture.
- **Choisir le modèle pour le besoin.** Coût, latence, confidentialité : selon le client, un modèle via API ou un modèle local avec Ollama.

## Compétences, et le projet qui les prouve

| Compétence | Preuve |
|---|---|
| LLM : OpenAI, Claude, Gemini, Ollama | Assistant email, chatbot RAG, agents chez ALTEN, hackathon LCL (API hébergées et modèles locaux) |
| IA générative et prompt engineering | Consignes anti-invention et sorties structurées de l'assistant email (catégorie, résumé et brouillon pour chaque email) |
| RAG et embeddings | Chatbot de l'organisme de formation, recherche CLIP sur la Tapisserie (Supabase comme base vectorielle) |
| Agents et NLP | Prototype de pilotage d'agents en langage naturel chez ALTEN Labs, agent vocal d'accueil (Retell), classification d'emails |
| Prototypage rapide | Chatbot en 26 heures au hackathon LCL (3e place), prototype de recherche chez ALTEN Labs |
| Machine Learning et vision | Modèle d'aide à la radiothérapie (données DICOM), spécialité traitement d'images à l'ENSICAEN (TensorFlow / Keras, Scikit-learn, Pandas, NumPy) |
| Python et SQL | Python sur tous les projets, SQL pour les données structurées du chatbot |
| Outils | Supabase, n8n, Git, GCP, Docker (bases) |
| Langues | Français (natif), anglais (C1), arabe (B2) |

## Parcours

- **sept. 2025 à aujourd'hui · Ingénieur IA indépendant**, Île-de-France. Conception et livraison d'outils d'IA générative et d'automatisations pour des PME, du cadrage à la recette : projets 01 à 03. Deux automatisations sont en production chez les clients.
- **fév. à août 2025 · Ingénieur IA, stage de fin d'études**, ALTEN Labs, Rennes. Prototype de recherche : pilotage d'agents en langage naturel à base de LLM. Intégration de modèles locaux (Ollama) et hébergés (OpenAI), conteneurisation avec Docker.
- **mai à août 2024 · Stage Machine Learning en radiothérapie**, Hôpital C. Mahmoudi, Tizi-Ouzou. Modèle de Machine Learning pour assister les physiciens médicaux, à partir de données DICOM (Keras, Pydicom, Scikit-learn).
- **2022 à 2025 · Diplôme d'ingénieur**, ENSICAEN, Caen. Spécialité intelligence artificielle et traitement d'images.
- **2020 à 2022 · Classes préparatoires MPSI puis PSI**, Lycée Pothier, Orléans.

## Contact

Vous recrutez un ingénieur IA junior ? Parlons-en. Ouvert à un CDI comme à des missions en freelance, en Île-de-France ou en remote.

- Email : contact@anisahmedzaid.com
- LinkedIn : https://linkedin.com/in/anis-ahmed-zaid
- CV (PDF) : https://anisahmedzaid.com/cv/CV-Anis-Ahmed-Zaid.pdf
