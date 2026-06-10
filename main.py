import streamlit as st
import './index.css';
from supabase import create_client, Client

# Gufungura Supabase Credentials binyuze muri Secrets za Streamlit
url: str = st.secrets["SUPABASE_URL"]
key: str = st.secrets["SUPABASE_KEY"]
supabase: Client = create_client(url, key)

st.title("🐟 Fish Farming AI - Founder's Toolkit")

# Gucunga Session State (Kureba niba Admin yinjiye n'uburyo bwo guhindura data)
if "logged_in" not in st.session_state:
    st.session_state.logged_in = False
if "editing_row" not in st.session_state:
    st.session_state.editing_row = None

# ==========================================
# PUBLIC FORM (Kwakira Feedback nshya)
# ==========================================
st.subheader("📝 Leave your Feedback")
with st.form("feedback_form", clear_on_submit=True):
    name = st.text_input("Izina ryawe (Name):")
    role = st.selectbox("Inshingano (Role/Type):", ["Fish Farmer", "Researcher", "Investor", "Other"])
    feedback = st.text_area("Feedback:")
    
    submit_button = st.form_submit_button("Submit Form")

if submit_button:
    if name and feedback:
        try:
            data = {"name": name, "role": role, "feedback": feedback}
            # Amabwiriza avuga ko data yinjira gusa (Anonymous INSERT)
            supabase.table("stakeholders").insert(data).execute()
            st.success(f"🎉 Thank you {name}! Your feedback has been saved to Supabase.")
        except Exception as e:
            st.error(f"Error saving to database: {e}")
    else:
        st.warning("Please fill in both name and feedback fields.")

st.markdown("---")

# ==========================================
# ADMIN ACCESS (LOGIN, EDIT & DELETE)
# ==========================================
st.subheader("🔐 Administrative Access")

if not st.session_state.logged_in:
    with st.expander("Admin Login"):
        email = st.text_input("Admin Email:")
        password = st.text_input("Password:", type="password")
        login_btn = st.button("Login as Admin")
        
        if login_btn:
            # Uburyo bworoshye kandi bwizewe bwo kwinjira nka Admin
            if email == "admin@crayfish.com" and password == "Aiva2026":
                st.session_state.logged_in = True
                st.success("Successfully logged in as Admin!")
                st.rerun()
            else:
                st.error("Login failed. Check credentials.")
else:
    st.info("🔓 You are logged in as Administrator.")
    if st.button("Log Out"):
        st.session_state.logged_in = False
        st.session_state.editing_row = None
        st.rerun()
        
    st.subheader("📋 Stakeholder Management Panel")
    
    try:
        # Guhamagara data zose ziri muri Supabase
        res = supabase.table("stakeholders").select("*").order("id").execute()
        records = res.data
        
        if records:
            # Kugaragaza data mu buryo bw'imbonerahamwe ifite Edit na Delete buttons
            for row in records:
                col1, col2, col3, col4, col5 = st.columns([2, 2, 4, 1, 1])
                
                with col1:
                    st.write(f"**{row['name']}**")
                with col2:
                    st.write(f"*{row['role']}*")
                with col3:
                    st.write(row['feedback'])
                    
                # 🗑️ BUTO YO GUSIBA (DELETE)
                with col4:
                    if st.button("🗑️", key=f"del_{row['id']}"):
                        with st.spinner('Deleting record...'): 
                            supabase.table("stakeholders").delete().eq("id", row['id']).execute()
                            st.success(f"Deleted row {row['id']}!")
                            st.rerun()
                        
                # ✏️ BUTO YO GUHINDURA (EDIT)
                with col5:
                    if st.button("✏️", key=f"edit_btn_{row['id']}"):
                        st.session_state.editing_row = row['id']
                        st.rerun()
                
                # Niba Admin yakanze Edit, hagenda hafunguka akajambo ko guhindura
                if st.session_state.editing_row == row['id']:
                    with st.form(key=f"edit_form_{row['id']}"):
                        st.write(f"**Editing Record ID: {row['id']}**")
                        new_name = st.text_input("Edit Name:", value=row['name'])
                        new_role = st.selectbox("Edit Role:", ["Fish Farmer", "Researcher", "Investor", "Other"], index=["Fish Farmer", "Researcher", "Investor", "Other"].index(row['role']) if row['role'] in ["Fish Farmer", "Researcher", "Investor", "Other"] else 0)
                        new_feedback = st.text_area("Edit Feedback:", value=row['feedback'])
                        
                        save_btn = st.form_submit_button("Save Changes")
                        cancel_btn = st.form_submit_button("Cancel")
                        
                        if save_btn:
                            update_data = {"name": new_name, "role": new_role, "feedback": new_feedback}
                            supabase.table("stakeholders").update(update_data).eq("id", row['id']).execute()
                            st.session_state.editing_row = None
                            st.success("Record updated successfully!")
                            st.rerun()
                        if cancel_btn:
                            st.session_state.editing_row = None
                            st.rerun()
                st.markdown("---")
        else:
            st.write("No records found in the database.")
            
    except Exception as e:
        st.error(f"Could not load admin panel: {e}")