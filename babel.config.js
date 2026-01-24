module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};

// module.exports = {
//   presets: [
//     [
//       '@babel/preset-env',
//       {
//         corejs: 2,
//         useBuiltIns: 'usage'
//       }
//     ],
//     '@vue/babel-preset-jsx'
//   ],
//   plugins: []

// }