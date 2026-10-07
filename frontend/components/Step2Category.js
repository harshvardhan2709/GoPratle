export default function Step2Category({ formData, setFormData, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    background: "var(--bg-input)",
    color: "var(--text-primary)",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const getErrorStyle = (fieldName) => {
    return errors[fieldName]
      ? { ...inputStyle, borderColor: "var(--error)" }
      : inputStyle;
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "500",
    color: "var(--text-secondary)",
    marginBottom: "4px",
  };

  const errorTextStyle = {
    fontSize: "13px",
    color: "var(--error)",
    marginTop: "4px",
    display: "block",
  };

  if (formData.category === "planner") {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <label style={labelStyle}>
            Planning Experience (Years) <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <input
            type="number"
            min="0"
            name="planningExperience"
            value={formData.planningExperience}
            onChange={handleChange}
            placeholder="e.g. 5"
            style={getErrorStyle("planningExperience")}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) => (e.target.style.borderColor = errors.planningExperience ? "var(--error)" : "var(--border)")}
          />
          {errors.planningExperience && <span style={errorTextStyle}>{errors.planningExperience}</span>}
        </div>
        <div>
          <label style={labelStyle}>
            Event Scale <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <select
            name="eventScale"
            value={formData.eventScale}
            onChange={handleChange}
            style={getErrorStyle("eventScale")}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) => (e.target.style.borderColor = errors.eventScale ? "var(--error)" : "var(--border)")}
          >
            <option value="" disabled>Select scale</option>
            <option value="small">Small (under 50 people)</option>
            <option value="medium">Medium (50-200 people)</option>
            <option value="large">Large (200-1000 people)</option>
            <option value="mega">Mega (1000+ people)</option>
          </select>
          {errors.eventScale && <span style={errorTextStyle}>{errors.eventScale}</span>}
        </div>
        <div>
          <label style={labelStyle}>
            Services Required <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <input
            type="text"
            name="servicesRequired"
            value={formData.servicesRequired}
            onChange={handleChange}
            placeholder="e.g. Full management, Decor, Catering"
            style={getErrorStyle("servicesRequired")}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) => (e.target.style.borderColor = errors.servicesRequired ? "var(--error)" : "var(--border)")}
          />
          {errors.servicesRequired && <span style={errorTextStyle}>{errors.servicesRequired}</span>}
        </div>
      </div>
    );
  }

  if (formData.category === "performer") {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>
              Performer Type <span style={{ color: "var(--error)" }}>*</span>
            </label>
            <input
              type="text"
              name="performerType"
              value={formData.performerType}
              onChange={handleChange}
              placeholder="e.g. Band, Magician, DJ"
              style={getErrorStyle("performerType")}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = errors.performerType ? "var(--error)" : "var(--border)")}
            />
            {errors.performerType && <span style={errorTextStyle}>{errors.performerType}</span>}
          </div>
          <div>
            <label style={labelStyle}>
              Genre / Style <span style={{ color: "var(--error)" }}>*</span>
            </label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="e.g. Rock, Close-up Magic, EDM"
              style={getErrorStyle("genre")}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = errors.genre ? "var(--error)" : "var(--border)")}
            />
            {errors.genre && <span style={errorTextStyle}>{errors.genre}</span>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>
              Number of Performers <span style={{ color: "var(--error)" }}>*</span>
            </label>
            <input
              type="number"
              min="1"
              name="numberOfPerformers"
              value={formData.numberOfPerformers}
              onChange={handleChange}
              placeholder="e.g. 4"
              style={getErrorStyle("numberOfPerformers")}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = errors.numberOfPerformers ? "var(--error)" : "var(--border)")}
            />
            {errors.numberOfPerformers && <span style={errorTextStyle}>{errors.numberOfPerformers}</span>}
          </div>
          <div>
            <label style={labelStyle}>
              Performance Duration <span style={{ color: "var(--error)" }}>*</span>
            </label>
            <input
              type="text"
              name="performanceDuration"
              value={formData.performanceDuration}
              onChange={handleChange}
              placeholder="e.g. 2 hours"
              style={getErrorStyle("performanceDuration")}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = errors.performanceDuration ? "var(--error)" : "var(--border)")}
            />
            {errors.performanceDuration && <span style={errorTextStyle}>{errors.performanceDuration}</span>}
          </div>
        </div>
      </div>
    );
  }

  if (formData.category === "crew") {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <label style={labelStyle}>
            Crew Role <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <input
            type="text"
            name="crewRole"
            value={formData.crewRole}
            onChange={handleChange}
            placeholder="e.g. Lighting Tech, Sound Engineer"
            style={getErrorStyle("crewRole")}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) => (e.target.style.borderColor = errors.crewRole ? "var(--error)" : "var(--border)")}
          />
          {errors.crewRole && <span style={errorTextStyle}>{errors.crewRole}</span>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>
              Number of Crew Members <span style={{ color: "var(--error)" }}>*</span>
            </label>
            <input
              type="number"
              min="1"
              name="numberOfCrewMembers"
              value={formData.numberOfCrewMembers}
              onChange={handleChange}
              placeholder="e.g. 5"
              style={getErrorStyle("numberOfCrewMembers")}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = errors.numberOfCrewMembers ? "var(--error)" : "var(--border)")}
            />
            {errors.numberOfCrewMembers && <span style={errorTextStyle}>{errors.numberOfCrewMembers}</span>}
          </div>
          <div>
            <label style={labelStyle}>
              Experience Level <span style={{ color: "var(--error)" }}>*</span>
            </label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              style={getErrorStyle("experienceLevel")}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = errors.experienceLevel ? "var(--error)" : "var(--border)")}
            >
              <option value="" disabled>Select level</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior</option>
              <option value="expert">Expert</option>
            </select>
            {errors.experienceLevel && <span style={errorTextStyle}>{errors.experienceLevel}</span>}
          </div>
        </div>
      </div>
    );
  }

  // Fallback if category somehow isn't set
  return (
    <div style={{ color: "var(--text-secondary)", textAlign: "center", padding: "20px" }}>
      Please go back to Step 1 and select a Category first.
    </div>
  );
}
