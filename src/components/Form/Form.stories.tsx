import React, { useRef } from "react";
import { ComponentMeta } from "@storybook/react";
import Form, {IFormRef} from "./Form";
import FormItem from "./FormItem";
import Input from "../Input/Input";
import Button from "../Button/button";
import { CustomRule } from "./useStore";

const meta: ComponentMeta<typeof Form> = {
  title: 'Form component',
  id: 'Form',
  component: Form,
  subcomponents: {'FormItem': FormItem},
  decorators: [
    (Story) => (
      <div style={{width: '550px'}}>
        <Story />
      </div>
    )
  ]
}

export default meta;

const confirmRules: CustomRule[] = [
  {type: 'string', required: true, min: 3, max: 8},
  ({ getFieldValue }) => ({
    asyncValidator(rule, value) {
      if(value !== getFieldValue('password')) {
        return Promise.reject('two passwords do not match each other');
      }
      return Promise.resolve();
    },
  })
]

export const BasicForm = (args: any) => {
  const ref = useRef<IFormRef>()
  const resetAll = () => {
    console.log('get value', ref.current?.getFieldValue('username'))
    ref.current?.resetFields();
    // 这个resetFields和getFieldValue就是我们人为添加进useImperativeHandle的回调函数中暴露出来的
  }
  return (
    <Form initialValues={{username: 'Mirage', agreement: false}} {...args} ref={ref}>
      {({isValid, isSubmitting}) => (
        <>
          <FormItem label="username" name="username" rules={[{type: 'email', required: true}]}>
            <Input />
          </FormItem>
          <FormItem label="password"  name="password" rules={[{type: 'string', required: true, min: 3, max: 8}]}>
            <Input type='password' />
          </FormItem>
          <FormItem label="password"  name="confirmpwd" rules={confirmRules}>
            <Input type='password' />
          </FormItem>
          <div
            className="agreement-section"
            style={{display: 'flex'}}
          >
            <FormItem 
              name="agreement"
              valuePropName="checked"
              getValueFromEvent={(e) => e.target.checked}
              rules={[{type: 'enum', enum: [true], message: 'please agree the agreement'}]}
            >
              <input type='checkbox' />
            </FormItem>
            <span className="agree-text">click means u agree<a href='#'>user agreement</a></span>
          </div>
          <div className="mirage-form-submit-area">
            <Button type="submit" btnType="primary">Login {isSubmitting ? 'verifying' : 'verification passed'} {isValid ? 'pass' : 'not passed'}</Button>
            <Button
              type="button"
              btnType="primary"
              onClick={resetAll}
            >
              打印ref
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
/**
 * rules={
 * 就是使用validate这个包里面提供的规则。这是固定写法
 */