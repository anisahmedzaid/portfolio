# anisahmedzaid.com · contenu de la page

> Version texte de `index.html` (portfolio, recherche de CDI), régénérée le 23/10/2026.
> Source des faits : `vault/job-search/master-cv.md`. Pas de tiret long.

Ouvert au CDI · Île-de-France ou remote

# Ingénieur IA.
LLM, RAG et agents en production.

Je suis Anis, diplômé de l'ENSICAEN en 2025 (spécialité IA et traitement d'images).
Depuis septembre 2025, je conçois et mets en production des systèmes à base de LLM
pour des PME, seul et de bout en bout.

Je cherche maintenant un poste d'ingénieur IA / ML dans une équipe, pour travailler
sur des systèmes plus grands et apprendre aux côtés d'ingénieurs plus expérimentés.

Télécharger le CV
LinkedIn
contact@anisahmedzaid.com

Projets

## Ce que j'ai construit

Deux systèmes en production et un projet de recherche. Pour chacun : le problème,
ce que j'ai fait, et une démo ou un schéma pour voir comment ça marche.

01 En production
Client PME

### Un assistant qui trie les emails et prépare les réponses

Une boîte mail professionnelle reçoit trop de messages pour être traitée à la main.
Le but : gagner du temps sans jamais laisser un modèle répondre seul à un client.

Chaque email est classé dans l'une de 10 catégories métier, résumé, puis le modèle rédige un brouillon.
Rien ne part automatiquement : une personne relit, corrige et envoie. Le brouillon n'invente pas
d'informations qu'il n'a pas, il laisse un champ à compléter.

Validation Recette sur 16 scénarios avant la mise en production

Confidentialité Une version 100 % locale avec Ollama, pour un client qui ne voulait pas que ses emails sortent de chez lui

Outils LLM (API et local via Ollama), Python

[Démo interactive : Démo · choisissez un email]

02 En production
Organisme de formation

### Un chatbot qui répond à partir des documents, et un agent vocal à l'accueil

Les mêmes questions reviennent sans cesse, par écrit et au téléphone, alors que les réponses
existent déjà dans les documents de l'organisme.

J'ai construit un chatbot RAG : les documents sont découpés, transformés en embeddings et stockés dans
une base vectorielle Supabase. À chaque question, le système retrouve les passages utiles et le LLM
répond à partir d'eux. Les données en tableau sont interrogées en SQL plutôt que par similarité.
Un agent vocal temps réel prend en charge l'accueil téléphonique.

Outils Embeddings, Supabase, SQL, OpenAI, n8n, Retell, ElevenLabs

[Démo interactive : Comment une question est traitée]

03 Projet de recherche
Laboratoire GREYC
oct. 2024 à jan. 2025

### Chercher dans la Tapisserie de Bayeux avec des mots

La Tapisserie fait près de 70 mètres. Comment retrouver une scène sans la connaître,
juste en la décrivant, ou à partir d'une autre image ?

J'ai utilisé CLIP, un modèle qui place textes et images dans un même espace de vecteurs.
Une description et une scène qui parlent de la même chose se retrouvent proches :
la recherche devient un calcul de similarité.

Outils Python, OpenAI CLIP, similarité vectorielle

[Démo interactive : L'idée en une image · choisissez une requête]

Aussi

Automatisations métier en production. Préparation de la paie avec Google Apps Script,
audit de justificatifs, veille concurrentielle. Moins visibles, mais utilisées par de vrais clients.

Hackathon LCL Paris, 3 e place (sept. 2024). Un chatbot expert des cartes bancaires,
développé en 26 heures avec Gemini sur Google Cloud.

Méthode

## Ce que j'ai appris à faire seul

### Tester avant de livrer

Un système LLM se valide sur des cas concrets écrits à l'avance, comme les 16 scénarios de l'assistant email, pas sur une impression.

### Garder l'humain dans la boucle

Sur les actions qui engagent, le modèle prépare et une personne décide. Aucun email ne part sans relecture.

### Choisir le modèle pour le besoin

Coût, latence, confidentialité : selon le client, un modèle via API ou un modèle local avec Ollama.

Compétences

## Et où je les ai utilisées

LLM : OpenAI, Claude, Gemini, Ollama Assistant email, chatbot RAG, agents chez ALTEN, hackathon LCL API hébergées et modèles locaux

RAG et embeddings Chatbot de l'organisme de formation, recherche CLIP sur la Tapisserie Supabase comme base vectorielle

Agents Pilotage d'agents en langage naturel chez ALTEN, agent vocal d'accueil (Retell)

Machine Learning et vision Modèle d'aide à la radiothérapie (données DICOM), spécialité traitement d'images à l'ENSICAEN TensorFlow / Keras, Scikit-learn, Pandas, NumPy

Python et SQL Dans tous les projets ci-dessus

Outils Supabase, n8n, Git, GCP, Docker (bases)

Langues Français (natif), anglais (C1), arabe (B2)

Parcours

## D'où je viens

sept. 2025 à aujourd'hui

### Ingénieur IA indépendant

Île-de-France

Conception et mise en production de systèmes IA pour des PME, du cadrage au suivi : les projets 01 et 02, et des automatisations métier.

fév. à août 2025

### Ingénieur IA, stage de fin d'études

ALTEN Labs, Rennes

Adaptation et déploiement d'un système de pilotage d'agents en langage naturel basé sur des LLM. Intégration de modèles locaux et hébergés, conteneurisation avec Docker.

mai à août 2024

### Stage Machine Learning en radiothérapie

Hôpital C. Mahmoudi, Tizi-Ouzou

Modèle de Machine Learning pour assister les physiciens médicaux, à partir de données DICOM (Keras, Pydicom, Scikit-learn).

2022 à 2025

### Diplôme d'ingénieur

ENSICAEN, Caen

Spécialité intelligence artificielle et traitement d'images.

2020 à 2022

### Classes préparatoires MPSI puis PSI

Lycée Pothier, Orléans

Contact

## Vous recrutez un ingénieur IA junior ? Parlons-en.

contact@anisahmedzaid.com

Télécharger le CV
LinkedIn
