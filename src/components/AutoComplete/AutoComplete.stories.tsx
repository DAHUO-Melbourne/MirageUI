import React from "react";
import { storiesOf } from "@storybook/react";
import {action} from '@storybook/addon-actions'
import AutoComplete from "./AutoComplete";
import {DataSourseType} from './AutoComplete';

interface LakerPlayerProps {
  value: string;
  number: number;
}

const SimpleComplete = () => {
  const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
  'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];

  const lakersWithNumber = [
    {value: 'bradley', number: 11},
    {value: 'pope', number: 1},
    {value: 'caruso', number: 4},
    {value: 'cook', number: 2},
    {value: 'cousins', number: 15},
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0},
  ];

  const handleFetch = (query: string) => {
    return lakersWithNumber.filter(name => name.value.includes(query));
    // return lakersWithNumber.filter(name => name.value.includes(query)).map((name) => ({value: name}));
  }

  const renderOption = (item: DataSourseType) => {
    const itemWithNumber = item as DataSourseType<LakerPlayerProps>
    // 这里需要添加一个类型断言，来传入T参数。这样他就是DataSourseType的一种，但是断言的具体类型只能是子类型：LakerPlayerProps
    // 但是在函数声明上不能添加T参数否则会报错，说类型不匹配
    return (
      <>
        <h2>Name: {itemWithNumber.value}</h2>
        <h3>Number: {itemWithNumber.number}</h3>
      </>
    )
  }

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
    />
  )
}

storiesOf('Autocomplete component', module)
  .add('AutoComplete', SimpleComplete);