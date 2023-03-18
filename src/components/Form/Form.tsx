import { ValidateError } from 'async-validator';
import React, {createContext, ReactNode} from 'react'
import useStore from './useStore';

export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<FormProps, 'initialValues'>
// 这里又是一个ts的高级用法：
/**
 * 1. ReturnType可以自动拿到泛型里的类型，也就是使用<typeof XXX>来拿到对应的类型
 * 2. Pick就选取众多类型中的一个，这里选取的就是dispatch
 * 3. 使用这种方法拿到的type，类型必须是type类型的，不能是interface
 */

export const FormContext = createContext<IFormContext>(
  {} as IFormContext
);
/**
 * 创建一个context，里面是初始值。但是要传递一个函数，没有初始值，所以通过类型断言来处理这里
 */

interface FormProps {
  name?: string;
  children?: ReactNode;
  initialValues?: Record<string, any>;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}

const Form: React.FC<FormProps> = (props) => {
  const {name, children, initialValues, onFinish, onFinishFailed} = props;
  const {form, fields, dispatch, validateField, validateAllField} = useStore();
  
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField,
  }
  // 这是要传递的context的值

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const {isValid, errors, values} = await validateAllField();
    if (isValid && onFinish) {
      onFinish(values);
    } else if (!isValid && onFinishFailed) {
      onFinishFailed(values, errors);
    }
  }

  return (
    <>
      <form name={name} className='mirage-form' onSubmit={submitForm}>
        <FormContext.Provider value={passedContext}>
          {children}
        </FormContext.Provider>
        {/**
         * 使用context就是当我们不清楚children里面都有什么样的元素的时候才使用context来传值
         */}
      </form>
      <div>
         <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(fields)}</pre>
         <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(form)}</pre>
      </div>
    </>
  )
}

Form.defaultProps = {
  name: 'mirage-form'
}

export default Form;
