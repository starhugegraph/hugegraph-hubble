import encryption from '../utils/aes'
const setStorage = (keys, values) => {
    keys.forEach((item, index) => {
        localStorage.setItem(item, encryption.jiami(values[index]))
    });
}
const getStorage = (keys) => {
    let user_name = localStorage.getItem(keys[0])
    let user_password = localStorage.getItem(keys[1])
    if (user_name && user_password) return {
        user_name: encryption.jiemi(user_name),
        user_password: encryption.jiemi(user_password)
    }
    return { remember: false }
}
const removeStorage = (keys) => {
    keys.forEach(item => {
        localStorage.removeItem(item)
    })
}

export default {
    setStorage,
    getStorage,
    removeStorage
}