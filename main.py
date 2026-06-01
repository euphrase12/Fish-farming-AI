import streamlit as st
import google.generativeai as genai
import os

# 1. GUHINDURA URURIMI (LANGUAGE CONFIGURATION)
# Kubika ururimi umworozi yahisemo muli session. Ururimi rw'ibanze ni Ikinyarwanda ('RW')
if "lang" not in st.session_state:
    st.session_state.lang = "RW"

# Inkoranyamagambo y'amagambo aza muli App (Translation Dictionary)
translations = {
    "RW": {
        "title": "Nyamasheke Smart Farm AI 🐟",
        "subtitle": "Igice gipima amazi n'ubuzima bw'amafi (Fish Health)",
        "temp": "UBUSHYUHE",
        "ph": "IGIPIMO CYA PH",
        "oxygen": "UMWUKA / OXYGEN",
        "status": "UBUZIMA BW'AMAFI",
        "no_sensor": "🚨 NTA CHUMA CYA SENSOR KIGARAGARA",
        "not_detected": "NTABWO CYABONETSE",
        "alert_title": "⚠️ Sisitemu y'Impururu / Live Alert System",
        "alert_danger": "🚨 MITYAZO/IBYAGO: Amazi ntagaburira amafi neza ubu ngubu!",
        "alert_safe": "✅ Umutekano w'amazi umeze neza cyane! Nta byago bihari ubu.",
        "chat_title": "🤖 Mworozi AI - Mujyanama wawe mu Bworozi",
        "chat_caption": "Baza ikibazo cyose cyerekeye ubworozi bw'amafi...",
        "chat_placeholder": "Andika ikibazo cyako hano...",
        "ai_prompt": "Uri inzobere mu bworozi bw'amafi mu Rwanda. Subiza uyu mworozi mu buryo bwiza kandi muli uru rurimi: Kinyarwanda. Ikibazo: "
    },
    "GB": {
        "title": "Nyamasheke Smart Farm AI 🐟",
        "subtitle": "Realtime Water Telemetry & Fish Health Core",
        "temp": "TEMPERATURE",
        "ph": "PH LEVEL",
        "oxygen": "DISSOLVED OXYGEN",
        "status": "FISH HEALTH STATUS",
        "no_sensor": "🚨 NO SENSOR DETECTED",
        "not_detected": "NOT DETECTED",
        "alert_title": "⚠️ Live Alert System",
        "alert_danger": "🚨 DANGER/RISK: Water parameters are toxic for fish right now!",
        "alert_safe": "✅ Water parameters are perfectly safe! No risk detected.",
        "chat_title": "🤖 Farmer AI - Your Aquaculture Assistant",
        "chat_caption": "Ask any question regarding fish farming...",
        "chat_placeholder": "Type your question here...",
        "ai_prompt": "You are an expert in aquaculture and fish farming. Answer this farmer professionally in English. Question: "
    },
    "FR": {
        "title": "Nyamasheke Smart Farm AI 🐟",
        "subtitle": "Télémetrie de l'Eau & Santé des Poissons",
        "temp": "TEMPÉRATURE",
        "ph": "NIVEAU DE PH",
        "oxygen": "OXYGÈNE DISSOUS",
        "status": "STATUT DE SANTÉ DES POISSONS",
        "no_sensor": "🚨 AUCUN CAPTEUR DÉTECTÉ",
        "not_detected": "NON DÉTECTÉ",
        "alert_title": "⚠️ Système d'Alerte en Direct",
        "alert_danger": "🚨 DANGER/RISQUE: Les paramètres de l'eau sont toxiques pour les poissons!",
        "alert_safe": "✅ L'eau est parfaitement saine! Aucun risque détecté.",
        "chat_title": "🤖 Éleveur AI - Votre Assistant Aquacole",
        "chat_caption": "Posez n'importe quelle question sur la pisciculture...",
        "chat_placeholder": "Écrivez votre question ici...",
        "ai_prompt": "Vous êtes un expert en aquaculture et pisciculture. Répondez à cet éleveur de manière professionnelle en Français. Question: "
    }
}

# Gufata amagambo y'ururimi ruri gukora ubu
lang_code = st.session_state.lang
text = translations[lang_code]

# 2. GUSHIRAHO UTUBUTO TW'INDIMI (LANGUAGE SELECTOR)
# Turatwubaka hejuru iburyo nk'uko twatubonye kuri paji yawe
col_title, col_langs = st.columns([3, 1])

with col_title:
    st.title(text["title"])

with col_langs:
    # Gukora utubuto tw'indimi nka radio buttons cyangwa selectbox ihita ihindura paji
    selected_lang = st.selectbox("Language / Ururimi", ["RW", "GB", "FR"], index=["RW", "GB", "FR"].index(lang_code))
    if selected_lang != st.session_state.lang:
        st.session_state.lang = selected_lang
        st.rerun() # Gusubiramo paji kugira ngo amagambo ahinduke ako kanya

st.markdown(f"### {text['subtitle']}")

# 3. IMBORENAHAMWE Y'IBYUMA (TELEMETRY VISUALS)
col1, col2, col3, col4 = st.columns(4)

temp_val = st.session_state.get('current_temp', 18) 
ph_val = st.session_state.get('current_ph', 5.5)     
oxygen_val = st.session_state.get('current_oxygen', 3.0) 

with col1:
    st.metric(text["temp"], f"{temp_val} °C" if temp_val else "--")
with col2:
    st.metric(text["ph"], f"{ph_val}" if ph_val else "--")
with col3:
    st.metric(text["oxygen"], f"{oxygen_val} mg/L" if oxygen_val else "--")
with col4:
    status_text = text["alert_danger"] if (temp_val < 20 or ph_val < 6.5) else text["alert_safe"]
    st.write(f"**{text['status']}**")
    st.caption(text["not_detected"])

st.warning(text["no_sensor"])

# 4. SISITEMU Y'IMPURURU (ALERT SYSTEM WITH TRANSLATION)
st.markdown("---")
st.subheader(text["alert_title"])

if temp_val < 20 or temp_val > 32 or ph_val < 6.5 or ph_val > 8.5 or oxygen_val < 4.0:
    st.error(text["alert_danger"])
    
    # Utubandiko tw'impururu mu ndimi zitandukanye
    if lang_code == "RW":
        if temp_val < 20: st.write(f"• Ubushyuhe buri hasi cyane ({temp_val}°C). Amafi ashobora gupfa cyangwa ntagure!")
        if ph_val < 6.5: st.write(f"• Amazi arasharira cyane (pH: {ph_val}). Shaka umuti cyangwa uhindure amazi!")
        if oxygen_val < 4.0: st.write(f"• Umwuka muli mazi uri hasi cyane ({oxygen_val} mg/L). Canira moteri izana umwuka!")
    elif lang_code == "GB":
        if temp_val < 20: st.write(f"• Temperature too low ({temp_val}°C). Fish might stop growing or die.")
        if ph_val < 6.5: st.write(f"• Water is too acidic (pH: {ph_val}). Please treat or change water.")
        if oxygen_val < 4.0: st.write(f"• Oxygen level too low ({oxygen_val} mg/L). Turn on the aerator immediately!")
    elif lang_code == "FR":
        if temp_val < 20: st.write(f"• Température trop basse ({temp_val}°C). Les poissons risquent de mourir.")
        if ph_val < 6.5: st.write(f"• L'eau est trop acide (pH: {ph_val}). Traitez ou changez l'eau.")
        if oxygen_val < 4.0: st.write(f"• Niveau d'oxygène trop bas ({oxygen_val} mg/L). Activez l'aérateur immédiatement!")
else:
    st.success(text["alert_safe"])

# 5. AGAKASANDUKU KA AI CHATBOX
st.markdown("---")
st.subheader(text["chat_title"])
st.caption(text["chat_caption"])

gemini_api_key = os.getenv("GEMINI_API_KEY")

if gemini_api_key:
    genai.configure(api_key=gemini_api_key)
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = []

    for message in st.session_state.chat_history:
        with st.chat_message(message["role"]):
            st.write(message["content"])

    if user_question := st.chat_input(text["chat_placeholder"]):
        with st.chat_message("user"):
            st.write(user_question)
        st.session_state.chat_history.append({"role": "user", "content": user_question})
        
        try:
            model = genai.GenerativeModel("gemini-pro")
            prompt = f"{text['ai_prompt']} {user_question}"
            response = model.generate_content(prompt)
            
            with st.chat_message("assistant"):
                st.write(response.text)
            st.session_state.chat_history.append({"role": "assistant", "content": response.text})
            
        except Exception as e:
            st.error(f"Error: {e}")
else:
    st.warning("Please configure GEMINI_API_KEY in Vercel settings.")