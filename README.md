# Puneeth Aradhya — DevOps Engineer (10+ years)

Personal website showcasing my skills, experience, and certifications, with an embedded AI assistant that answers only about me using a private knowledge base.

| Component | Tools / Tech |
|-----------|--------------|
| Frontend | HTML5, CSS3, Bootstrap 5, JavaScript, Font Awesome |
| Analytics | Google Tag Manager, gtag.js |
| Chat UI | JavaScript |
| Chatbot Backend | Python, Flask, vector search, local knowledge base (answers only about Puneeth) |
| Embeddings | Sentence Transformers (all-MiniLM-L6-v2) |
| LLM / Inference | Hugging Face Transformers, Mistral |
| Model Hosting | Heroku |

How vector search works (very short):
- Content is embedded with all-MiniLM-L6-v2 into dense vectors
- User query is embedded; cosine similarity retrieves top‑k relevant chunks
- Retrieved context is passed to Mistral to generate grounded answers limited to Puneeth's info
