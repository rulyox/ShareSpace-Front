const imageToBase64 = (image) => {

    if(image instanceof ArrayBuffer && image.byteLength > 0) {
        const imageBase64 = Buffer.from(image).toString('base64');
        return 'data:image/png;base64, ' + imageBase64;
    }

    return null;

}

const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => { resolve(reader.result); };
        reader.onerror = (error) => { reject(error); };

    });
}

export default {
    imageToBase64,
    fileToBase64
};
