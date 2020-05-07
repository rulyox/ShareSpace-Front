const imageToBase64 = (image) => {

    if(image instanceof ArrayBuffer) {
        const imageBase64 = Buffer.from(image).toString('base64');
        return 'data:image/png;base64, ' + imageBase64;
    }

    return null;

}

export default {
    imageToBase64
};
