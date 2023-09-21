import firesbase_app from '../config'
import {signInWithEmailAndPassword,getAuth} from 'firebase/auth'

const auth = getAuth(firesbase_app)

export default async function(email, password){
    let result = null
    error = null 
    try {
        result = await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        error = error
    }

    return {result, error}
}