import crypto from "crypto"
const apiKeyGenerator = () => {
    let val = crypto.randomUUID({disableEntropyCache : true})
    const stringVal = String(val)
    return stringVal
}



export default apiKeyGenerator

