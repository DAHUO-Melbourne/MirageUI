import React, {useContext, useEffect} from 'react';
import classNames from 'classnames';
import { RuleItem } from 'async-validator/dist-types/interface';
import {FormContext} from './Form';
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
/**
 * 使用Required来设置从类型T里pick出来的Key值K必须是required必选的
 * 写法就是如上所示：SomeRequired, T是总的type，而K指的是key，写法就是K extends keyof T
 * 有了extends keyof T就是相当于告诉app只能从T的key list里进行选择
 * Required指的是这些选出来的type值是必选的，不能是？可选的
 * Omit意思就是从T里排除K这些key
 * 如上这一行的意思就是：从type T里选出K这些type，并且设置成Required，而Type T里其他的key也要被合并进去只是不需要被设置成required了，保持原有的设置即可。
 */
type TestType = SomeRequired<FormItemProps, 'getValueFromEvent'>

export interface FormItemProps {
  label?: string,
  children?: React.ReactNode,
  name: string,
  valuePropName?: string,
  trigger?: string,
  getValueFromEvent?: (event: any) => any,
  rules?: RuleItem[],
  validateTrigger?: string,
}

const FormItem: React.FC<FormItemProps> = (props) => {
  const {
    label,
    children,
    name,
    valuePropName,
    trigger,
    getValueFromEvent,
    rules,
    validateTrigger,
  } = props as SomeRequired<FormItemProps, 'getValueFromEvent' | 'trigger' | 'valuePropName' | 'validateTrigger'>;

  const rowClass = classNames('mirage-row', {
    'viking-row-no-label': !label
  });

  const {dispatch, fields, initialValues, validateField} = useContext(FormContext);

  useEffect(() => {
    const value = (initialValues && initialValues[name]) || '';
    // 为本组件注册到store里：
    dispatch({type: 'addField', name, value: {label, name, value, rules, isValid: true}})
  }, []);

  const fieldState = fields[name];
  const value = fieldState && fieldState.value;
  const errors = fieldState && fieldState.errors;
  // 获取是否有errors
  const isRequired = rules?.some(rule => rule.required);
  // 判断这一个item是否是required必须的
  const hasError = errors && errors.length > 0;
  // 当errors多于一个就意味着有error
  const labelClass = classNames({
    'mirage-form-item-required': isRequired
  })

  const itemClass = classNames({
    'mirage-form-item-has-error': hasError
  })

  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent(e);
    console.log('new value', value);
    dispatch({type: 'updateField', name, value});
  }

  const onValueValidate = async () => {
    await validateField(name)
  }

  const controlProps: Record<string, any> = {}
  controlProps[valuePropName] = value;
  // valuePropName!这种写法是判断非空
  controlProps[trigger] = onValueUpdate;  
  /**
   * 使用这种写法可以做出一个props的object
   */
  if(rules) {
    controlProps[validateTrigger] = onValueValidate
  }

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
          <label title={label} className={labelClass}>
            {label}
          </label>
        </div>
      )}
      <div className='mirage-form-item'>
        <div className={itemClass}>
          {returnedChildNode}
        </div>
        {hasError && (
          <div className='mirage-form-item-explain'>
            <span>{errors[0].message}</span>
          </div>
        )}
      </div>
    </div>
  )
}

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  getValueFromEvent: (e) => e.target.value,
  validateTrigger: 'onBlur',
}

export default FormItem;
