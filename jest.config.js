module.exports = {
  // Other Jest configurations...
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "\\.pnp\\.[^\\\/]+$",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy" // Mock CSS files
  }
};
