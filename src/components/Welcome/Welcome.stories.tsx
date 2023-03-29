import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>welcome to mirage react component library</h1>
        <p>installation:</p>
        <code>npm install mirage-react --save</code>
      </>
    )
  }, {info: {disable: true}})