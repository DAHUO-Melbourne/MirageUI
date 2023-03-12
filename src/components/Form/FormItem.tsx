import React, {useContext, useEffect} from 'react';
import classNames from 'classnames';
import {FormContext} from './Form';

export interface FormItemProps {
  label?: string,
  children?: React.ReactNode,
  name: string,
  valuePropName?: string,
  trigger?: string,
  getValueFromEvent?: (event: any) => any,
}

const FormItem: React.FC<FormItemProps> = (props) => {
  const {
    label,
    children,
    name,
    valuePropName,
    trigger,
    getValueFromEvent,
  } = props;
  const rowClass = classNames('mirage-row', {
    'viking-row-no-label': !label
  });

  const {dispatch, fields} = useContext(FormContext);

  useEffect(() => {
    // 为本组件注册到store里：
    dispatch({type: 'addField', name, value: {label, name, value: ''}})
  }, []);

  const fieldState = fields[name];
  const value = fieldState && fieldState.value;

  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent && getValueFromEvent(e);
    console.log('new value', value);
    dispatch({type: 'updateField', name, value});
  }

  const controlProps: Record<string, any> = {}
  controlProps[valuePropName!] = value;
  // valuePropName!这种写法是判断非空
  controlProps[trigger!] = onValueUpdate;  
  /**
   * 使用这种写法可以做出一个props的object
   */

  const childList = React.Children.toArray(children);
  if (childList.length === 0) {
    console.error('no child element is provided');
  }
  // 将children转化为一个array

  if (!React.isValidElement(childList[0])) {
    console.error('child component is not a valid component');
  }
  
  if (childList.length > 1) {
    console.warn('more than one child element r provided');
  }
  const child = childList[0] as React.ReactElement;

  const returnedChildNode = React.cloneElement(child, {
    ...child.props,
    ...controlProps,
  })
  // 使用cloneElement来人为的添加组件的属性。第一个参数是被添加的组件的对象，第二个参数是更新后的props的内容，其中第一部分是原有的参数，第二部分是想添加的参数

  return (
    <div className={rowClass}>
      {label && (
        <div className='mirage-form-item-label'>
          <label title={label}>
            {label}
          </label>
        </div>
      )}
      <div className='mirage-form-item'>
        {returnedChildNode}
      </div>
    </div>
  )
}

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  getValueFromEvent: (e) => e.target.value,
}

export default FormItem;
