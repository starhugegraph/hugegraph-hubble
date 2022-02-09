import cryptoJs from "crypto-js";
let keyOne = 'wasdjkluiop12zxc'
const iv = cryptoJs.enc.Utf8.parse('ABCDEF1234123412'); //十六位十六进制数作为密钥偏移量
export default {
    // 加密函數
    jiami(word) {
        let key = cryptoJs.enc.Utf8.parse(keyOne)
        let enc = ''
        if (typeof word === 'string') {
            enc = cryptoJs.AES.encrypt(word, key, {
                iv: '',
                mode: cryptoJs.mode.ECB,
                padding: cryptoJs.pad.Pkcs7
            })
        } else if (typeof word === 'object') {
            let data = JSON.stringify(word)
            enc = cryptoJs.AES.encrypt(data, key, {
                iv: iv,
                mode: cryptoJs.mode.CBC,
                padding: cryptoJs.pad.Pkcs7
            })
        }
        let encResult = enc.ciphertext.toString(cryptoJs.enc.Base64);
        return encResult
    },
    // 解密函數
    jiemi(word) {
        let key = cryptoJs.enc.Utf8.parse(keyOne)
            //先将Base64还原一下，因为加密的时候做了一些字符的替换
        const restoreBase64 = word.replace(/\-g/, '+').replace(/_/, '/');
        //返回的是解密后的对象
        let decrypt = cryptoJs.AES.decrypt(restoreBase64, key, {
            iv: iv,
            mode: cryptoJs.mode.ECB,
            padding: cryptoJs.pad.Pkcs7
        });
        //将解密对象转换成UTF8的字符串
        let decryptedStr = decrypt.toString(cryptoJs.enc.Utf8);
        //返回解密结果
        return decryptedStr.toString();
    }
}