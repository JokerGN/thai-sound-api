const registerConstraints = {
  firstName: {
    presence: true,
    length: {
      minimum: 1
    }
  },
  lastName: {
    presence: true,
    length: {
      minimum: 1
    }
  },
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
  },
  citizenId: {
    presence: true,
    length: {
      is: 13
    }
  },
  address: {
    presence: true,
    length: {
      minimum: 1
    }
  }
}

export default registerConstraints
