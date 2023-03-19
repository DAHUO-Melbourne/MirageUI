import { ValidateError } from 'async-validator';
import React, {createContext, ReactNode, forwardRef, useImperativeHandle} from 'react'
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

export type IFormRef = Omit<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'form'>

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

const Form = forwardRef<IFormRef, FormProps>((props, ref) => {
  const {name, children, initialValues, onFinish, onFinishFailed} = props;
  const {form, fields, dispatch, ...restProps} = useStore(initialValues);
  const {validateField, validateAllField} = restProps;
  useImperativeHandle(ref, () => {
    return {
      ...restProps,
    }
  })
  /**
   * 第一个参数是ref，第二个参数是想从这个ref中暴露出去的属性与方法
   * 那些不在回调函数中返回的东西，就不会被拿到了
   * 所以useImperativeHandle可以选择性暴露一部分ref的内容，这样不用将整个ref暴露出，对性能和安全性更好
   * 或者是人工的添加一些dom里原生属性没有，但是我们自己写的函数到回调函数里返回出去。这样好处也是更安全，而且有了自定义，拿到的东西更多样
   * 这样更自由，更安全
   */
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
});

Form.defaultProps = {
  name: 'mirage-form'
}

export default Form;
/**
 * 如果打算把组件内部的ref，暴露给其他组件使用，使得其他组件也可以控制这一组件的dom，实现不同子组件dom的自定义
 * 就要使用到forwardRef
 * 顾名思义。意思就是将ref，forward给其他组件
 */

/**
 * forwardRef的用法就是
 * 1. 使用forwardRef来包裹一个函数：
 *    forwardRef(() => {
 *      return (
 *        <></>
 *      )
 *    })
 * 2. 参数必须是props, ref
 *    forwardRef((props, ref) => {
 *      return (
 *        <></>
 *      )
 *    })
 * 3. 类型声明必须是ref的类型在前，props类型在后：
 *    forwardRef<HTMLFormElement, FormProps>((props, ref) => {
 *      return (
 *        <></>
 *      )
 *    })
 */

/**
 * forwardRef返回的是dom节点，但是如果我们不想返回这个dom节点，而是想返回一些自定义的属性
 * 这个时候就用到useImperativeHandle
 * useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
   }, []);
   回调函数里返回的是暴露出去的方法，这里相当于只暴露出了focus方法，其他的方法不暴露。
   useImperativeHandle的回调函数里也可以暴露用户自己写的函数，不一定非得是dom inbuild的自带的方法
  */