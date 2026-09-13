import streamlit as st

# Structured dataset mapping RCIP Communities -> Designated Employers -> Open Jobs & Links
rcip_data = {
    "Sault Ste. Marie, ON": {
        "Algoma Tubes Inc. (Tenaris Canada)": [
            {"job_title": "Industrial Millwright (TEER 2)", "location": "Sault Ste. Marie, ON", "apply_link": "https://welcometossm.com/designated-employers/"},
            {"job_title": "Heavy-Duty Equipment Mechanic", "location": "Sault Ste. Marie, ON", "apply_link": "https://welcometossm.com/designated-employers/"}
        ],
        "Sault Area Hospital": [
            {"job_title": "Registered Practical Nurse (RPN)", "location": "Sault Ste. Marie, ON", "apply_link": "https://www.sah.on.ca/careers"},
            {"job_title": "Medical Laboratory Technologist", "location": "Sault Ste. Marie, ON", "apply_link": "https://www.sah.on.ca/careers"}
        ]
    },
    "Timmins, ON": {
        "Timmins and District Hospital": [
            {"job_title": "Clinical Nurse Specialist", "location": "Timmins, ON", "apply_link": "https://timminsedc.com/immigration/"}
        ],
        "Northern AB Construction": [
            {"job_title": "Civil Construction Supervisor", "location": "Timmins, ON", "apply_link": "https://timminsedc.com/immigration/"}
        ]
    },
    "West Kootenay, BC": {
        "Interfor Corporation": [
            {"job_title": "Sawmill Production Operator", "location": "Castlegar, BC", "apply_link": "https://westkootenayimmigration.ca/designated-employers/"}
        ],
        "Kalesnikoff Mass Timber": [
            {"job_title": "Mass Timber Technician", "location": "Thrums, BC", "apply_link": "https://westkootenayimmigration.ca/designated-employers/"}
        ]
    }
}

st.title("Canada RCIP Overseas Job Finder")
st.write("Select a community below to filter participating employers and view active international job listings.")

# Step 1: Filter by a single RCIP Community
communities = list(rcip_data.keys())
selected_community = st.selectbox("1. Select RCIP Community", options=communities)

if selected_community:
    # Step 2: Load participating employers tied exclusively to the selected community
    employers = list(rcip_data[selected_community].keys())
    selected_employer = st.selectbox("2. Select Designated Employer", options=employers)
    
    if selected_employer:
        # Step 3: Load open jobs and direct application links for that employer
        st.markdown(f"### Open Opportunities at {selected_employer}")
        jobs = rcip_data[selected_community][selected_employer]
        
        for index, job in enumerate(jobs, start=1):
            st.markdown(f"**Job {index}: {job['job_title']}**")
            st.markdown(f"- **Exact Location:** {job['location']}")
            st.markdown(f"- **Application Portal:** [Click here to apply]({job['apply_link']})")
            st.markdown("---")