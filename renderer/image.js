export function initImage(config) {
    

    const body = document.body;
    const image = document.createElement('img');

    image.setAttribute("src", config.image.path);
    image.setAttribute("type", config.image.mimeType)

    body.appendChild(image)


    image.onload = function(event)  {
        console.log(event, this)
        let { naturalWidth: imageWidth, naturalHeight: imageHeight } = image;
        
        const ratio = imageWidth / imageHeight;
        console.log(imageWidth, imageHeight, ratio)

        electronBridge.getScreenSize().then((result) => {
            const {width: screenWidth, height: screenHeight} = result;

            imageHeight = screenHeight;
            imageWidth = screenHeight * ratio

            if (imageWidth > screenWidth) {
                imageWidth = screenWidth;
                imageHeight = imageHeight * ratio
            }

            console.log(screenWidth, screenHeight);
            console.log(imageWidth, imageHeight, ratio)

            electronBridge.resize(imageWidth, imageHeight)
            image.width = imageWidth
            image.height = imageHeight

            // Put it here so that the image actually shows at low delays
            new Promise(resolve => setTimeout(resolve, config.image.delay * 1000)).then(() => electronBridge.quit())

        });
    };

}