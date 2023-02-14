export const login = (email: any, password: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(password)
      resolve(email)
    }, 500)
  })
}
