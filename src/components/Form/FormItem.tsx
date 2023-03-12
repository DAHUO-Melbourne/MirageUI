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

  const {dispatch} = useContext(FormContext);

  useEffect(() => {
    // 为本组件注册到store里：
    dispatch({type: 'addField', name, value: {label, name}})

  }, [])

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
        {children}
      </div>
    </div>
  )
}

export default FormItem;
