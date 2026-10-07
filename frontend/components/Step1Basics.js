import { useState, useEffect } from "react";

export default function Step1Basics({ formData, setFormData, errors }) {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

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



  return (
    <div className="flex flex-col gap-4">
      {/* Event Name */}
      <div>
        <label style={labelStyle}>
          Event Name <span style={{ color: "var(--error)" }}>*</span>
        </label>
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          placeholder="e.g. Corporate Annual Meet"
          style={getErrorStyle("eventName")}
          onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
          onBlur={(e) =>
            (e.target.style.borderColor = errors.eventName
              ? "var(--error)"
              : "var(--border)")
          }
        />
        {errors.eventName && <span style={errorTextStyle}>{errors.eventName}</span>}
      </div>

      {/* Event Type & Category row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>
            Event Type <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <input
            type="text"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            placeholder="e.g. Conference, Concert"
            style={getErrorStyle("eventType")}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) =>
              (e.target.style.borderColor = errors.eventType
                ? "var(--error)"
                : "var(--border)")
            }
          />
          {errors.eventType && <span style={errorTextStyle}>{errors.eventType}</span>}
        </div>

        <div>
          <label style={labelStyle}>
            Category <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ ...getErrorStyle("category"), cursor: "pointer" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) =>
              (e.target.style.borderColor = errors.category
                ? "var(--error)"
                : "var(--border)")
            }
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="planner">Event Planner</option>
            <option value="performer">Performer</option>
            <option value="crew">Crew</option>
          </select>
          {errors.category && <span style={errorTextStyle}>{errors.category}</span>}
        </div>
      </div>

      {/* Dates row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>
            Start Date <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <input
            type="date"
            name="startDate"
            min={today}
            value={formData.startDate}
            onChange={handleChange}
            style={getErrorStyle("startDate")}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) =>
              (e.target.style.borderColor = errors.startDate
                ? "var(--error)"
                : "var(--border)")
            }
          />
          {errors.startDate && <span style={errorTextStyle}>{errors.startDate}</span>}
        </div>

        <div>
          <label style={labelStyle}>
            End Date <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <input
            type="date"
            name="endDate"
            min={formData.startDate || today}
            value={formData.endDate}
            onChange={handleChange}
            style={getErrorStyle("endDate")}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) =>
              (e.target.style.borderColor = errors.endDate
                ? "var(--error)"
                : "var(--border)")
            }
          />
          {errors.endDate && <span style={errorTextStyle}>{errors.endDate}</span>}
        </div>
      </div>

      {/* Location & Venue row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>
            City / Location <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Mumbai"
            style={getErrorStyle("location")}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) =>
              (e.target.style.borderColor = errors.location
                ? "var(--error)"
                : "var(--border)")
            }
          />
          {errors.location && <span style={errorTextStyle}>{errors.location}</span>}
        </div>

        <div>
          <label style={labelStyle}>Venue (Optional)</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="e.g. Grand Hyatt"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
      </div>
    </div>
  );
}
