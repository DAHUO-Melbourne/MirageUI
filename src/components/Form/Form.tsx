import { ValidateError } from 'async-validator';
import React, {createContext, ReactNode} from 'react'
import useStore, {FormState} from './useStore';
export type RenderProps = (form: FormState) => ReactNode;
/**
 * renderProps的意思就是根据传入的参数不同，render出模板大致一样，但是具体的值不一样的dom
 * 说白了就是根据不同的参数的值渲染出不同的UI结果
 * renderProps的类型必须是一个函数，参数是需要渲染的数据，返回的是一个react节点。
 * 好处是可以复用代码
 */

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
  children?: ReactNode | RenderProps;
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

  let childrenNode;
  if (typeof(children) === 'function') {
    childrenNode = children(form)
  } else {
    childrenNode = children;
  }

  return (
    <>
      <form name={name} className='mirage-form' onSubmit={submitForm}>
        <FormContext.Provider value={passedContext}>
          {childrenNode}
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
