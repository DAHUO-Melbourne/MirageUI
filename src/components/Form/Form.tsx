import React, {ReactNode} from 'react'

interface FormProps {
  name?: string;
  children?: ReactNode;
}

const Form: React.FC<FormProps> = (props) => {
  const {name, children} = props;
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
