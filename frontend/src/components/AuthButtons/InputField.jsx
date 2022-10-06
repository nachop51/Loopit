const InputField = ({
  name,
  label,
  type,
  value,
  onChanged,
  error,
  hasError,
  ph,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChanged(e.target.value)}
        id={name}
        placeholder={ph}
        name={name}
        type={type}
        className={`${hasError ? "error-validator" : ""}`}
      />
      <span className={`error-message ${hasError ? "show-span" : ""}`}>
        {error}
      </span>
    </div>
  );
};

export default InputField;