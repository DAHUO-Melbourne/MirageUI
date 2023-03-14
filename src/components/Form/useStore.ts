import { useState, useReducer } from "react";
// 单个item的信息
import Schema, {RuleItem, ValidateError} from "async-validator";

export type CustomRuleFunc = ({getFieldValue}: any) => RuleItem;

export type CustomRule = RuleItem | CustomRuleFunc;

export interface FieldDetailsProps {
  name: string;
  value: string;
  rules: CustomRule[];
  isValid: boolean;
  errors: ValidateError[];
}

// 整个store的信息是由一堆FieldDetailsProps组成的，而FieldsState就相当于是存储store信息的地方
export interface FieldsState {
  [key: string]: FieldDetailsProps;
}

export interface FormState {
  isValid: boolean;
}

export interface FieldsActionProps {
  type: 'addField' | 'updateField' | 'updateValidateResult';
  name: string;
  value: any;
}
// action三个field，第一个是用于标注该action的类型，是添加新的field，还是更新还是验证等。
// 第二个是该action作用的对象，也就是相当于是store里标注对应item的key的值。
// 第三个是value，也就是这个item对象在store里的值。

function fieldsReducer(state: FieldsState, action: FieldsActionProps): FieldsState {
  switch(action.type) {
    case 'addField':
      return {
        ...state,
        [action.name]: {...action.value}
        // 以name作为key，以value作为value
      }
    case 'updateField':
      return {
        ...state,
        [action.name]: {...state[action.name], value: action.value}
        // 以name作为key，以value作为value
      }
    case 'updateValidateResult':
      const {isValid, errors} = action.value;
      return {
        ...state,
        [action.name]: {...state[action.name], isValid, errors}
      }
    default:
      return state;
  }
}

const useStore = () => {
  const [form, setForm] = useState<FormState>({isValid: true});
  const [fields, dispatch] = useReducer(fieldsReducer, {});
  /**
   * useReducer的用法：
   * const [state, dispatch] = useReducer(reducer, initState);
   * 先说后面两个参数：reducer就是switch对不同类型的action的处理函数
   * iniState就是store里的初始状态
   * 前面两个参数：state是暴露出来给外面的组件使用的，当前更新完毕之后的store内实施的最新状态
   * 组件可以通过使用state.xxx来拿到不同的state值
   * dispatch是暴露出来的更新函数
   */

  const getFieldValue = (key: string) => {
    return fields[key] && fields[key].value;
  }

  const transformRules = (rules: CustomRule[]) => {
    return rules.map(rule => {
      if(typeof rule === 'function') {
        const calledRule = rule({getFieldValue})
        return calledRule
      } else {
        return rule
      }
    })
  }

  const validateField = async (name: string) => {
    const {value, rules} = fields[name];
    const afterRules = transformRules(rules);
    const descriptor = {
      [name]: afterRules
    }
    const valueMap = {
      [name]: value
    }
    const validator = new Schema(descriptor);
    let isValid = true;
    let errors: ValidateError[] = [];
    try {
      await validator.validate(valueMap);
    } catch(e) {
      isValid = false;
      const err = e as any;
      console.log('e', err.errors);
      console.log('fields', err.fields);
      errors = err.errors;
    } finally {
      console.log('errors', isValid);
      dispatch({type: 'updateValidateResult', name, value: {isValid, errors}});
    }
  }

  return {
    fields,
    dispatch,
    form,
    validateField,
    getFieldValue,
  }
}

export default useStore;
