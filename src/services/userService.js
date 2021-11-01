import db from "../models/index"
import bcrypt from "bcryptjs"

let handleUserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserUsername(username)
            if(isExist) {
                let user = await db.User.findOne({
                    attributes: ["username", "role", "password"],
                    where: { username: username},
                    raw: true
                })
                if(user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if(check) {
                        userData.errCode = 0
                        userData.errMessage = "ok"
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = "wrong password"
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = "User not found"
                }
                
            } else {
                userData.errCode = 1
                userData.errMessage = "Username not exist, please try another username."
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserUsername = (_username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { username : _username}
            })
            if(user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin
}