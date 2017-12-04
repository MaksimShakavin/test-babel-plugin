const babel = require('babel-core');
const plugin = require('../src/index');
const unpad = require('unpad');

function transpile(code){
    return babel.transform(code,{
        plugins: [
            plugin
        ]
    }).code;
}

describe('plugin-remove-log',() => {
    it('should work', () => {
        const source = unpad(`
      function foo(a, b) {
        console.error('foo');
        return a + b;
      }
    `);

        const expected = unpad(`
      function foo(a, b) {
        return a + b;
      }
    `);

        const result = transpile(source);
        expect(result).toBe(expected);
    })
});
