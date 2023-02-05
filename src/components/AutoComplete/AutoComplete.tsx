import React, {ChangeEvent, useState} from 'react';
import Input, {InputProps} from '../Input/Input';

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (p: string) => string[];
  onSelect?: (p: string) => void;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props: AutoCompleteProps) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

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
            {item}
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
