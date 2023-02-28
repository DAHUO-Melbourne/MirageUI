import React, {ReactNode} from 'react'
import useStore from './useStore';

interface FormProps {
  name?: string;
  children?: ReactNode;
}

const Form: React.FC<FormProps> = (props) => {
  const {name, children} = props;
  const {form, fields} = useStore();
  return (
    <form name={name} className='mirage-form'>
      {children}
    </form>
  )
}

Form.defaultProps = {
  name: 'mirage-form'
}

export default Form;
