interface Logger {
  error(message :string): void,
  info(message :string): void,
  warning(message :string): void,
  debug(message :string): void,
}

export default Logger;