import * as createUserResolver from './User/createUser'
import * as getUserbyIdResolver from './User/getUserById'
import * as signInResolver from './User/login'
import * as updateUserResolver from './User/updateUser'
import * as deleteUserResolver from './User/deleteUser'

export default {
    Query : {
        getUser: getUserbyIdResolver.getUserById,
    },
    Mutation : {
        createUser: createUserResolver.createUser,
        signIn: signInResolver.signIn,
        updateUser: updateUserResolver.updateUser,
        deleteUser: deleteUserResolver.deleteUser
    }
}