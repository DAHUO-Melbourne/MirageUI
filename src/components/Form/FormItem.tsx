import React, {useContext, useEffect} from 'react';
import classNames from 'classnames';
import {FormContext} from './Form';

export interface FormItemProps {
  label?: string,
  children?: React.ReactNode,
  name: string,
}

const FormItem: React.FC<FormItemProps> = (props) => {
  const {label, children, name} = props;
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
    const value = e.target.value;
    console.log('new value', value);
    dispatch({type: 'updateField', name, value});
  }

  const controlProps: Record<string, any> = {}
  controlProps.value = value;
  controlProps.onChange = onValueUpdate;  
  /**
   * 使用这种写法可以做出一个props的object
   */

  const childList = React.Children.toArray(children);
  // 将children转化为一个array
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

export default FormItem;
