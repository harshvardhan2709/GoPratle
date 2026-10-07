export default function Step4Review({ formData }) {
  const sectionStyle = {
    background: "var(--bg-input)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    padding: "16px",
    marginBottom: "16px",
  };

  const titleStyle = {
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--text-primary)",
    borderBottom: "1px solid var(--border)",
    paddingBottom: "8px",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px 24px",
  };

  const Item = ({ label, value }) => {
    if (!value) return null;
    return (
      <div>
        <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "2px" }}>
          {label}
        </div>
        <div style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: "500" }}>
          {value}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={sectionStyle}>
        <div style={titleStyle}>Event Basics</div>
        <div style={gridStyle}>
          <Item label="Event Name" value={formData.eventName} />
          <Item label="Event Type" value={formData.eventType} />
          <Item label="Category" value={formData.category} />
          <Item label="Location" value={formData.location} />
          <Item label="Start Date" value={formData.startDate} />
          <Item label="End Date" value={formData.endDate} />
          <Item label="Venue" value={formData.venue} />
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={titleStyle}>Category Details</div>
        <div style={gridStyle}>
          {formData.category === "planner" && (
            <>
              <Item label="Planning Experience (Years)" value={formData.planningExperience} />
              <Item label="Event Scale" value={formData.eventScale} />
              <Item label="Services Required" value={formData.servicesRequired} />
            </>
          )}
          {formData.category === "performer" && (
            <>
              <Item label="Performer Type" value={formData.performerType} />
              <Item label="Genre" value={formData.genre} />
              <Item label="Number of Performers" value={formData.numberOfPerformers} />
              <Item label="Performance Duration" value={formData.performanceDuration} />
            </>
          )}
          {formData.category === "crew" && (
            <>
              <Item label="Crew Role" value={formData.crewRole} />
              <Item label="Number of Members" value={formData.numberOfCrewMembers} />
              <Item label="Experience Level" value={formData.experienceLevel} />
            </>
          )}
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={titleStyle}>Additional Details</div>
        <div style={gridStyle}>
          <Item label="Budget" value={formData.budget} />
          
          {formData.category === "planner" && (
            <Item label="Number of Events" value={formData.numberOfEvents} />
          )}
          
          {formData.category === "performer" && (
            <Item label="Technical Requirements" value={formData.technicalRequirements} />
          )}
          
          {formData.category === "crew" && (
            <>
              <Item label="Working Hours" value={formData.workingHours} />
              <Item label="Required Skills" value={formData.requiredSkills} />
            </>
          )}
          
          <div style={{ gridColumn: "1 / -1" }}>
            <Item label="Special Requirements" value={formData.specialRequirements} />
          </div>
        </div>
      </div>

      <p style={{ fontSize: "13px", color: "var(--text-muted)", textAlign: "center", marginTop: "16px" }}>
        Please review your details carefully. Click 'Submit Requirement' when you are ready.
      </p>
    </div>
  );
}
