test('common matcher', () => {
  expect(2+2).toBe(4);
  expect(2+2).not.toBe(5);
})
// jest的基本测试就是： test第一个参数为测试用例的名称，第二个参数是一个回调函数。
// 在函数里通过expect表达式以及toBe/not.toBe来比较结果

test('true or false', () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
})
// 也可以使用toBeTruthy和toBeFalsy来比较true/false

test('number compare', () => {
  expect(4).toBeGreaterThan(3);
  expect(3).toBeLessThan(4);
})

test('object', () => {
  expect({name: 'mirage'}).toEqual({name: 'mirage'});
})
// object的比较的时候需要用toEqual

// 指令：npx jest jest.test.js --watch