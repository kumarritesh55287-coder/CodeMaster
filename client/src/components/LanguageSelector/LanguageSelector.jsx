import { getLanguageOptions } from '../../utils/helpers';

export default function LanguageSelector({ value, onChange }) {
  return (
    <div className="language-selector">
      <label htmlFor="language-select">Language</label>
      <select id="language-select" value={value} onChange={(event) => onChange(event.target.value)}>
        {getLanguageOptions().map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
