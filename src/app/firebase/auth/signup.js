import firebase_app from '../config'
import {createUserWithEmailAndPassword,getAuth} from 'firebase/auth'

const auth = getAuth(firebase_app)

export default async function signUp(email, password){
    let result = null
    error = null 
    try {
        result = await createUserWithEmailAndPassword(auth,email,password)
    } catch (error) {
        error = error
    }

    return {result, error}
}