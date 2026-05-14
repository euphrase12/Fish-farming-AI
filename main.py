import streamlit as st
import pandas as pd

# 1. Konfigirasiyo
st.set_page_config(page_title="Nyamasheke Fish AI", layout="wide")
st.title("🐟 Nyamasheke Special Farming Crayfish AI")

# --- Fungura Sheet yawe mu buryo bw'ibanga---
CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZcTZey1J1R8vi5928zRlYUHAQX_dl3-xgCCSpidH7Ya3ZS0Ja1FaZK_bpZW99eTd2APSl_VklJsHb/pub?gid=0&single=true&output=csv"

try:
    df = pd.read_csv(CSV_URL)
    latest = df.iloc[-1]
    
    # Ibipimo bitatu (Metrics)
    col1, col2, col3 = st.columns(3)
    col1.metric("Oxygen Level", f"{latest['Oxygen (mg/L)']} mg/L")
    col2.metric("Water pH", f"{latest['pH']}")
    col3.metric("Temperature", f"{latest['Temp (°C)']} °C")

    st.divider()
    st.subheader(" AI Status & Smart Advice")
    
    # Reba niba Amazina y'inkingi ahuye neza n'aya Google Sheet
    status = latest['AI Status']
    advice = latest['Farmer Advice (Inyigisho)']

    if "AKAGA" in status or "CRITICAL" in status:
        st.error(f"STATUS: {status}\n\nINYIGISHO: {advice}")
    else:
        st.success(f"STATUS: {status}\n\nINYIGISHO: {advice}")
except Exception as e:
    st.info("Ndi guhuza na Google Sheets... Reba niba link washyizemo ari ya CSV.")

st.divider()
st.header("Crayfish AI Academy")
st.write("Andika isomo ushaka kumenya kuri uyu munsi:")
user_question = st.text_input("Urugero: Nigute natera imiti mu byandurubwatsi?")

if user_question:
    st.info(f"AI y'Ubborozi irimo kugutegurira igisubizo kuri: '{user_question}'")
    st.success("Igisubizo cya AI: Mu kunda amafi, ni ngombwa kugenzura pH mbere yo gutera imiti.")