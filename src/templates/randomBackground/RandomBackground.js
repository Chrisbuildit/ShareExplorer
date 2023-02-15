import React from "react";
import { ImageBackground } from "react-native";

const noOfPic = 4;
const imgMap = {
    0: "carpithians.jpg",
    1: "Glacier.jpg",
    2: "mountain-top.jpg",
    3: "Mountains.jpg",
};

const RandomPic = (props) => {
    function getRandomPic() {
        const random = Math.floor(Math.random() * Math.floor(noOfPic));
        return require(`./assets/${imgMap[random]}`);
    }
    return (
        <ImageBackground
            source={getRandomPic()}
            style={{ height: 500, width: 500 }}
        />
    );
};

export default RandomPic;