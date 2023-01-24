import React from "react";
import {cleanup, fireEvent, render, RenderResult, screen} from '@testing-library/react';
import Menu, {MenuProps} from './menu';
import MenuItem from "./menuItem";

const testProps: MenuProps = {
  defaultIndex: '0',
  className: 'test',
  onSelect: jest.fn(),
};

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  onSelect: jest.fn(),
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
    </Menu>
  );
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

const setUp = () => {
  wrapper = render(generateMenu(testProps));
  menuElement = screen.getByTestId('test-menu');
  activeElement = screen.getByText('active');
  disabledElement = screen.getByText('disabled');
}

describe('test menu and menu items', () => {
  beforeEach(() => {
    setUp();
  });
  // 每个it前都需要运行的代码放在beforeEach里，这样可以减少代码重复率
  it('render menu correctly with default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('mirage-menu test');
    // eslint-disable-next-line testing-library/no-node-access
    expect(menuElement.getElementsByTagName('li').length).toEqual(3); 
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });
  it('onSelect function is called when menu item is clicked', () => {
    const thirdItem = screen.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(thirdItem).not.toHaveClass('is-disabled');
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    // 测试onSelect是否被第二（第三，但是index==2）项调用了
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(disabledElement).toHaveClass('is-disabled');
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });
  it('should render vertical if mode is vertical', () => {
    cleanup();
    // 因为beforeEach里已经创造出了一个test-id为test-menu的节点，所以需要将beforeEach中生成的test-menu清理掉
    // 然后再生成一个新的符合我们要求的，vertical的menu
    render(generateMenu(testVerProps));
    const verMenuElement = screen.getByTestId('test-menu');
    expect(verMenuElement).toHaveClass('mirage-menu menu-vertical');
  });

})