const loginConstraints = {
  email: {
    presence: true,
    length: {
      minimum: 1
    },
    email: true
  },
  password: {
    presence: true,
    length: {
      minimum: 1
    }
  }
}

export default loginConstraints
