const Imagekit = require('@imagekit/nodejs');

const ImagekitClient = new Imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
    
})
async function uploadFile(file){
    const result = await ImagekitClient.files.upload({
       file,
       fileName: "music_" + Date.now(),
       folder: "spotify_project/music"
    });
    return result;

}
module.exports = {uploadFile};