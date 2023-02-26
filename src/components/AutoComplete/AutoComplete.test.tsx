/* eslint-disable testing-library/prefer-presence-queries */
import React from "react";
import { config } from "react-transition-group";
import { render, RenderResult, fireEvent, waitFor, screen } from "@testing-library/react";
import AutoComplete, {AutoCompleteProps} from "./AutoComplete";

config.disabled = true;
// 将所有异步动画改为同步，这样就不会有异步动画render内容不同的困扰了

const testArray = [
  {value: 'ab', number: 11},
  {value: 'abc', number: 1},
  {value: 'b', number: 4},
  {value: 'c', number: 15},
];

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span>{props.icon}</span>
  };
});

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
}

let wrapper: RenderResult, inputNode: HTMLInputElement, autoCompleteComponent: HTMLElement;

const setUp = () => {
  render(<AutoComplete {...testProps}/>);
  inputNode = screen.getByPlaceholderText('auto-complete') as HTMLInputElement;
  autoCompleteComponent=screen.getByTestId('mirage-auto-complete') as HTMLElement;
}

describe('test AutoComplete component', () => {
  beforeEach(() => {
    setUp();
  });
  it('test basic AutoComplete behaviour', async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}});
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(screen.getByText('ab')).toBeInTheDocument();
    })
    // eslint-disable-next-line testing-library/no-node-access
    expect(autoCompleteComponent.querySelectorAll('.suggestion-item').length).toEqual(2);
    fireEvent.click(screen.getByText('ab'));
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11});
    expect(screen.queryByText('ab')).not.toBeInTheDocument();
    expect(inputNode.value).toBe('ab');
  });
  it('should provide keyboard support', async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}});
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(screen.getByText('ab')).toBeInTheDocument();
    })
    const firstResult = screen.queryByText('ab');
    const secondResult = screen.queryByText('abc');
    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(firstResult).toHaveClass('item-highlighted')
    //arrow down 
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(secondResult).toHaveClass('item-highlighted')
    //arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(firstResult).toHaveClass('item-highlighted')

    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(screen.queryByText('ab')).not.toBeInTheDocument();
    expect(inputNode.value).toBe('ab');
  });
  it('click outside should hide dropdpwn', async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}});
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(screen.getByText('ab')).toBeInTheDocument();
    })
    fireEvent.click(document);
    expect(screen.queryByText('ab')).not.toBeInTheDocument();
  });
  it('renderOption should generate the right template', () => {

  });
  it('async fetchSuggestions should works fine', () => {

  });
})