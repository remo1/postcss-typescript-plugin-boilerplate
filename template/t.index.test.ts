// eslint-disable-next-line @typescript-eslint/no-var-requires
const postcss = require('postcss');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('./t.index');

const options = {
  unitFrom: 'px',
  unitTo: 'rem',
  include: ['font-size', 'padding', 'margin'],
  exclude: ['width'],
};

async function run({ input, output, opts = {} }: { input: any; output: any; opts?: {} }) {
  const result = await postcss([plugin(opts)]).process(input, { from: undefined });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

describe('converts px to rem', () => {
  it('converts margin from px to rem', async () => {
    await run({ input: 'a{ margin: 16px }', output: 'a{ margin: 1rem }', opts: {} });
  });

  // it('converts padding from px to rem', async () => {
  //   await run({ input: 'a{ padding: 16px }', output: 'a{ padding: 1rem }', opts: {} });
  // });
  //
  // it('converts font-size from px to rem', async () => {
  //   await run({ input: 'a{ font-size: 16px }', output: 'a{ font-size: 1rem }', opts: {} });
  // });
  //
  // it('converts border width from px to rem', async () => {
  //   await run({ input: 'a{ border: 2px solid #fff; }', output: 'a{ border: 0.125rem solid #fff; }', opts: {} });
  // });
});
