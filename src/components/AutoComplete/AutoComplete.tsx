import React, {ChangeEvent, ReactElement, useState} from 'react';
import Input, {InputProps} from '../Input/Input';

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (p: string) => string[];
  onSelect?: (p: string) => void;
  renderOption?: (p: string) => ReactElement
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props: AutoCompleteProps) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const renderTemplate = (item : string) => {
    return renderOption ? renderOption(item) : item
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      const results = fetchSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }

  const handleSelect = (item: string) => {
    setInputValue(item);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => (
          <li key={index} onClick={() => handleSelect(item)}>
            {renderTemplate(item)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className='mirage-auto-complete-wrapper'>
      <Input
        value={inputValue}
        onChange={handleChange}
        {...restProps}
      />
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}

export default AutoComplete;
