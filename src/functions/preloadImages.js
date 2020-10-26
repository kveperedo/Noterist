const preloadImages = (...images) => {

    return images.map(image => {
        const img = new Image()
        img.src = image
        return images
    })
}

export default preloadImages