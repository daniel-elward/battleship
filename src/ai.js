function aiEasy(processShot){
    shotCoords = {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10)
    }

    processShot(shotCoords);
};

module.exports = aiEasy;