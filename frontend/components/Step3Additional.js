export default function Step3Additional({ formData, setFormData, errors }) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>
              Budget (Optional)
            </label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g. 50,000 INR"
              style={getErrorStyle("budget")}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = errors.budget ? "var(--error)" : "var(--border)")}
            />
            {errors.budget && <span style={errorTextStyle}>{errors.budget}</span>}
          </div>
          <div>
            <label style={labelStyle}>
              Number of Events <span style={{ color: "var(--error)" }}>*</span>
            </label>
            <input
              type="number"
              min="1"
              name="numberOfEvents"
              value={formData.numberOfEvents}
              onChange={handleChange}
              placeholder="e.g. 1"
              style={getErrorStyle("numberOfEvents")}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = errors.numberOfEvents ? "var(--error)" : "var(--border)")}
            />
            {errors.numberOfEvents && <span style={errorTextStyle}>{errors.numberOfEvents}</span>}
          </div>
        </div>
        <div>
          <label style={labelStyle}>Special Requirements (Optional)</label>
          <textarea
            name="specialRequirements"
            value={formData.specialRequirements}
            onChange={handleChange}
            placeholder="Any other specific needs or requests..."
            rows={4}
            style={{ ...getErrorStyle("specialRequirements"), resize: "vertical" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) => (e.target.style.borderColor = errors.specialRequirements ? "var(--error)" : "var(--border)")}
          />
          {errors.specialRequirements && <span style={errorTextStyle}>{errors.specialRequirements}</span>}
        </div>
      </div>
    );
  }

  if (formData.category === "performer") {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Budget (Optional)</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g. 20,000 INR"
              style={getErrorStyle("budget")}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = errors.budget ? "var(--error)" : "var(--border)")}
            />
            {errors.budget && <span style={errorTextStyle}>{errors.budget}</span>}
          </div>
        </div>
        <div>
          <label style={labelStyle}>
            Technical Requirements <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <textarea
            name="technicalRequirements"
            value={formData.technicalRequirements}
            onChange={handleChange}
            placeholder="e.g. PA System, 2 Mics, Stage lighting"
            rows={3}
            style={{ ...getErrorStyle("technicalRequirements"), resize: "vertical" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) => (e.target.style.borderColor = errors.technicalRequirements ? "var(--error)" : "var(--border)")}
          />
          {errors.technicalRequirements && <span style={errorTextStyle}>{errors.technicalRequirements}</span>}
        </div>
        <div>
          <label style={labelStyle}>Special Requirements (Optional)</label>
          <textarea
            name="specialRequirements"
            value={formData.specialRequirements}
            onChange={handleChange}
            placeholder="e.g. Green room required, food preferences"
            rows={3}
            style={{ ...getErrorStyle("specialRequirements"), resize: "vertical" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) => (e.target.style.borderColor = errors.specialRequirements ? "var(--error)" : "var(--border)")}
          />
          {errors.specialRequirements && <span style={errorTextStyle}>{errors.specialRequirements}</span>}
        </div>
      </div>
    );
  }

  if (formData.category === "crew") {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Budget (Optional)</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g. 5,000 INR/day"
              style={getErrorStyle("budget")}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = errors.budget ? "var(--error)" : "var(--border)")}
            />
            {errors.budget && <span style={errorTextStyle}>{errors.budget}</span>}
          </div>
          <div>
            <label style={labelStyle}>
              Working Hours <span style={{ color: "var(--error)" }}>*</span>
            </label>
            <input
              type="text"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleChange}
              placeholder="e.g. 10 hours/day"
              style={getErrorStyle("workingHours")}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = errors.workingHours ? "var(--error)" : "var(--border)")}
            />
            {errors.workingHours && <span style={errorTextStyle}>{errors.workingHours}</span>}
          </div>
        </div>
        <div>
          <label style={labelStyle}>
            Required Skills <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <textarea
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            placeholder="e.g. DMX programming, heavy lifting"
            rows={3}
            style={{ ...getErrorStyle("requiredSkills"), resize: "vertical" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) => (e.target.style.borderColor = errors.requiredSkills ? "var(--error)" : "var(--border)")}
          />
          {errors.requiredSkills && <span style={errorTextStyle}>{errors.requiredSkills}</span>}
        </div>
        <div>
          <label style={labelStyle}>Special Requirements (Optional)</label>
          <textarea
            name="specialRequirements"
            value={formData.specialRequirements}
            onChange={handleChange}
            placeholder="Any other specific needs..."
            rows={3}
            style={{ ...getErrorStyle("specialRequirements"), resize: "vertical" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) => (e.target.style.borderColor = errors.specialRequirements ? "var(--error)" : "var(--border)")}
          />
          {errors.specialRequirements && <span style={errorTextStyle}>{errors.specialRequirements}</span>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ color: "var(--text-secondary)", textAlign: "center", padding: "20px" }}>
      Please go back to Step 1 and select a Category first.
    </div>
  );
}
