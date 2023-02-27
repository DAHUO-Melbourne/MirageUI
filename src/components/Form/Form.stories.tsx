import React from "react";
import { ComponentMeta } from "@storybook/react";
import Form from "./Form";
import FormItem from "./FormItem";
import Input from "../Input/Input";
import Button from "../Button/button";

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

export const BasicForm = () => {
  return (
    <Form>
      <FormItem label="username">
        <Input />
      </FormItem>
      <FormItem label="password">
        <Input type='password' />
      </FormItem>
      <FormItem>
        <Input placeholder='no-label' />
      </FormItem>
      <div className="agreement-section" style={{display: 'flex'}}>
        <FormItem>
          <input type='checkbox' />
        </FormItem>
        <span className="agree-text">click means u agree<a href='#'>user agreement</a></span>
      </div>
      <div className="mirage-form-submit-area">
        <Button type="submit" btnType="primary">Login</Button>
      </div>
    </Form>
  )
}