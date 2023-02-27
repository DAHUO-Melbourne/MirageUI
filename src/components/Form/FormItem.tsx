import React from 'react';
import classNames from 'classnames';

export interface FormItemProps {
  label?: string;
  children?: React.ReactNode;
}

const FormItem: React.FC<FormItemProps> = (props) => {
  const {label, children} = props;
  const rowClass = classNames('mirage-row', {
    'viking-row-no-label': !label
  });
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
