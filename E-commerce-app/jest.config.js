
// export default {
//     preset: 'ts-jest',
//     testEnvironment: 'jsdom',
//     transform: {
//     '^.+\\.(ts|tsx)$': 'ts-jest',
//     '^.+\\.(js|jsx)$': 'babel-jest',
//     },
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
//     testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
//     moduleNameMapper: {
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//     },
// };




export default  {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
};