import React, {ChangeEvent, ReactElement, useState, useEffect, KeyboardEvent, useRef} from 'react';
import Input, {InputProps} from '../Input/Input';
import Icon from '../Icon/Icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import classNames from 'classnames';

interface DataSourceObject {
  value: string;
}

export type DataSourseType<T = {}> = T & DataSourceObject;
// 这里就是使用泛型来解决：不确定数据类型的方法。在不同使用场景下，通过动态的传入不同的T，即泛型，来产生不同的类型。
// 如果没有传入T，那么他的类型就是DataSourceObject，即一个object，有一个field，key叫value

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (p: string) => DataSourseType[] | Promise<DataSourseType[]>;
  onSelect?: (p: DataSourseType) => void;
  renderOption?: (p: DataSourseType) => ReactElement;
  // 当用户打算自定义 显示的dropdown的item的样式的时候，就需要用到这个prop来自定义打算如何render这些item
  // 但是有的时候，当item的数据结构不是一个简单的string，就拿storybook中的距离：一开始数据结构是一个string[]：
  // ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
  // 但是后来如果变成了一个object[]，即object为item类型的数组，这个renderOption就不够灵活了。
  // 而且自定义模板一般不会只展示一个简单的字符串，他会展示的每一项里的信息比较多。就好比后面的name + number
  // 但是因为这个组件，可能接收到的数据结构并不都一样，所以这个时候就需要用到：泛型
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
  const [suggestions, setSuggestions] = useState<DataSourseType[]>([]);
  const [loading, setLoading] = useState(false);
  const [highLightIndex, setHighLightIndex] = useState(-1);
  const triggerCurrent = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debounceValue = useDebounce(inputValue, 500);
  useClickOutside(componentRef, () => setSuggestions([]));
  // 500ms以后才设置debounceValue的值

  useEffect(() => {
    if (debounceValue && triggerCurrent.current) {
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        // 判断results是不是一个promise
        console.log('triggered');
        results.then((data) => {
          setSuggestions(data);
          setLoading(false);
        })        
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
    setHighLightIndex(-1);
  }, [debounceValue])
  
  const renderTemplate = (item : DataSourseType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const value = e.target.value;
    setInputValue(value);
    triggerCurrent.current = true;
  }

  const handleSelect = (item: DataSourseType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    triggerCurrent.current = false;
  }

  const highLight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighLightIndex(index);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        // 回车
        if (suggestions[highLightIndex]) {
          handleSelect(suggestions[highLightIndex]);
        }
        break
      case 38:
        // 向上
        highLight(highLightIndex - 1);
        break;
      case 40:
        // 向下
        highLight(highLightIndex + 1);
        break;
      case 27:
        // esc
        setSuggestions([]);
        break;
      default:
        break;
    }
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestions-item', {
            'item-highlighted': index === highLightIndex
          })
          return (
            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className='mirage-auto-complete-wrapper' ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading && <ul><Icon icon='spinner' spin /></ul>}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}

export default AutoComplete;
