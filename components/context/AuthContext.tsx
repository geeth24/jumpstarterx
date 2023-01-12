import { createContext, useContext, useEffect, useState } from "react"
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth"
import { auth, db } from "../../utils/Firebase"
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore"

const AuthContext = createContext<any>({})

export const UserAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [user, setUser] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    console.log(user)

    const createUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        setUser(null)
        await signOut(auth)
    }
    const passwordReset = (email: string) => {
        return sendPasswordResetEmail(auth, email)
    }

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    const setUserData = async () => {
        //@ts-ignore
        const userRef = doc(db, "users", auth.currentUser.uid)
        //check if doc exists in db
        const userData = await getDoc(userRef)
        if (userData.data()?.uid === auth.currentUser?.uid) {
            // console.log(auth.currentUser?.uid);
            console.log("userData exists")
            setUser(userData.data())
        } else {
            await setDoc(userRef, {
                uid: auth.currentUser?.uid,
                email: auth.currentUser?.email,
                displayName: auth.currentUser?.displayName,
                photoURL: auth.currentUser?.photoURL,
                pro: false,
            })
            const userData = await getDoc(userRef)
            setUser(userData.data())
        }
    }

    const getUserData = async () => {
        //@ts-ignore
        const userCollectionRef = doc(db, "users", auth.currentUser.uid)
        const userData = await getDoc(userCollectionRef)
        const userSitesCollectionRef = collection(
            db,
            "users",
            //@ts-ignore
            auth.currentUser.uid,
            "sites"
        )
        const userSitesData = await getDocs(userSitesCollectionRef)
        setUser({
            ...userData.data(),
            sites: userSitesData.docs.map((doc) => doc.data()),
        })
        console.log({
            ...userData.data(),
            sites: userSitesData.docs.map((doc) => doc.data()),
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // setIsLoading(true);
            console.log(currentUser)
            if (currentUser) {
                setIsLoading(true)
                const getUserData = async () => {
                    const userCollectionRef = doc(
                        db,
                        "users",
                        //@ts-ignore
                        auth.currentUser.uid
                    )
                    const userData = await getDoc(userCollectionRef)
                    const userSitesCollectionRef = collection(
                        db,
                        "users",
                        //@ts-ignore
                        auth.currentUser.uid,
                        "sites"
                    )
                    const userSitesData = await getDocs(userSitesCollectionRef)
                    setUser({
                        ...userData.data(),
                        sites: userSitesData.docs.map((doc) => doc.data()),
                    })
                    console.log({
                        ...userData.data(),
                        sites: userSitesData.docs.map((doc) => doc.data()),
                    })
                }
                getUserData()
                setIsLoading(false)
            }
            setUser(currentUser)
            setIsLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                createUser,
                user,
                logout,
                signIn,
                passwordReset,
                googleSignIn,
                isLoading,
                setUserData,
                getUserData,
            }}
        >
            {isLoading ? null : children}
        </AuthContext.Provider>
    )
}
