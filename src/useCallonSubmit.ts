export const login = (email: any, password: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(email)
    }, 500)
  })
}
