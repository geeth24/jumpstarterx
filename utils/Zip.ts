import JSZip from "jszip"
import { saveAs } from "file-saver"
import {
    getStorage,
    listAll,
    ref,
    getDownloadURL,
    getMetadata,
    uploadString,
} from "firebase/storage"
import { auth } from "./Firebase"
import { encode as base64_encode } from "base-64"
export const downloadFolderAsZipPublic = async (id: string, title: string) => {
    const storage = getStorage()

    var configFile = `
// Made with JumpStarterX      

export const config = {

   themeColor: "",
   tabs:{
        company: "",
        tab1: "",
        tab2: "",
        tab3: "jjj",
        tab4: "Tab 4",
        tab5: "Tab 5",
   },

   hero:{
        title: "",
        subtitle: "",
        description: "",
        image: ""
   },

   about:{
        topLine: "",
        heading: "",
        description: "",
        image: ""
   }    

   

}


`
    var encodedConfig = base64_encode(configFile)
    var configeBase64URL = "data:text/javascript;base64," + encodedConfig

    const configRef = ref(
        storage,
        "users/" +
            // @ts-ignore
            auth.currentUser.uid +
            "/sites/" +
            id +
            "/src/" +
            `${title}.config.js`
    )
    await uploadString(configRef, configeBase64URL, "data_url")

    const zip = new JSZip()
    const folderRef = ref(
        storage,
        "users/" +
            // @ts-ignore
            auth.currentUser.uid +
            "/sites/" +
            id +
            "/public"
    )
    const folder = await listAll(folderRef)
    var publicF = zip.folder("public")
    const promises = folder.items
        .map(async (item) => {
            const file = await getMetadata(item)
            const fileRef = ref(storage, item.fullPath)
            const fileBlob = await getDownloadURL(fileRef).then((url) => {
                return fetch(url).then((response) => response.blob())
            })

            publicF?.file(file.name, fileBlob)
        })
        .reduce((acc, curr) => acc.then(() => curr), Promise.resolve())
    await promises

    const folderRef2 = ref(
        storage,
        "users/" +
            // @ts-ignore
            auth.currentUser.uid +
            "/sites/" +
            id +
            "/src"
    )
    const folder2 = await listAll(folderRef2)
    var srcF = zip.folder("src")
    const promises2 = folder2.items
        .map(async (item) => {
            const file = await getMetadata(item)
            const fileRef = ref(storage, item.fullPath)
            const fileBlob = await getDownloadURL(fileRef).then((url) => {
                return fetch(url).then((response) => response.blob())
            })
            // @ts-ignore
            srcF.file(file.name, fileBlob)
        })
        .reduce((acc, curr) => acc.then(() => curr), Promise.resolve())
    await promises2

    const folderRef3 = ref(
        storage,
        "users/" +
            // @ts-ignore
            auth.currentUser.uid +
            "/sites/" +
            id +
            "/package.json"
    )
    const file = await getMetadata(folderRef3)
    const fileRef = ref(storage, folderRef3.fullPath)
    const fileBlob = await getDownloadURL(fileRef).then((url) => {
        return fetch(url).then((response) => response.blob())
    })
    // @ts-ignore
    zip.file(file.name, fileBlob)

    const folderRef4 = ref(
        storage,
        "users/" +
            // @ts-ignore
            auth.currentUser.uid +
            "/sites/" +
            id +
            "/.gitignore"
    )
    const file2 = await getMetadata(folderRef4)
    const fileRef2 = ref(storage, folderRef4.fullPath)
    const fileBlob2 = await getDownloadURL(fileRef2).then((url) => {
        return fetch(url).then((response) => response.blob())
    })
    zip.file(file.name, fileBlob)
    zip.file(file2.name, fileBlob2)
    const folderRef5 = ref(
        storage,
        "users/" +
            // @ts-ignore
            auth.currentUser.uid +
            "/sites/" +
            id +
            "/src" +
            "/components"
    )
    const folder5 = await listAll(folderRef5)
    const promises5 = folder5.items
        .map(async (item) => {
            const file = await getMetadata(item)
            const fileRef = ref(storage, item.fullPath)
            // @ts-ignore
            var com = srcF.folder("components")
            const fileBlob = await getDownloadURL(fileRef).then((url) => {
                return fetch(url).then((response) => response.blob())
            })
            //@ts-ignore
            com.file(file.name, fileBlob)
        })
        .reduce((acc, curr) => acc.then(() => curr), Promise.resolve())
    await promises5

    // zip.file('package.zip', blob3);
    // zip.file('git.zip', blob4);
    // zip.file('components.zip', blob5);
    const zipBlob = await zip.generateAsync({ type: "blob" })
    saveAs(zipBlob, title + ".zip")
}
