import { useEffect, useState} from 'react'

const PREFIX='whatsapp-clone-' // all local storage conflict with each other , so put a prefix to prevent it. 

export default function useLocalStorage(key, initialValue) {
    // alert(initialValue) init val is undefined , y ?
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(() => {  //getting values from local storage and parsing takes time , so we need this to run only on time
         const jsonValue = localStorage.getItem(prefixedKey)
         if (jsonValue != null) return JSON.parse(jsonValue)
         if (typeof initialValue === 'function'){
             return initialValue()
         } else {
             return initialValue
         }
    })

    // save info in local storage

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    },[prefixedKey, value])

    return [value, setValue]
}
