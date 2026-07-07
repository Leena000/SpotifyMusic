// Imports ImageKit SDK for uploading files to ImageKit cloud storage.
const Imagekit = require('@imagekit/nodejs');

// Creates the ImageKit client using keys from the .env file.
const ImagekitClient = new Imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
    
})

// Uploads a music file to ImageKit and returns the upload result.
async function uploadMusicFileToStorage(file){
    // Sends the file to ImageKit with a generated file name and folder path.
    const result = await ImagekitClient.files.upload({
       file,
       fileName: "music_" + Date.now(),
       folder: "spotify_project/music"
    });

    // Returns ImageKit response, including the uploaded file URL.
    return result;
}

// Exports the upload helper for the music controller.
module.exports = {uploadMusicFileToStorage};
