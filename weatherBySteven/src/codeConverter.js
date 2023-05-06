const codeKeys = {
    0: {
      color: "#0175C0",
      desc: "Clear skies",
      image: "./assets/clear.png"
    },
    1: {
      color: "#0175C0",
      desc: "Mainly clear",
      image: "./assets/clear.png"
    },
    2: {
        color: "#0175C0",
        desc: "Partly cloudy",
        image: "./assets/clear.png"
      },
    3: {
        color: "#0175C0",
        desc: "Overcast",
        image: "./assets/clear.png"
      },
    45: {
        color: "#0175C0",
        desc: "Foggy",
        image: "./assets/clear.png"
      },
    51: {
        color: "#3B495D",
        desc: "Light drizzle",
        image: "./assets/rain.png"
    },
    53: {
        color: "#3B495D",
        desc: "Drizzle",
        image: "./assets/rain.png"
      },
    55: {
        color: "#3B495D",
        desc: "Heavy drizzle",
        image: "./assets/rain.png"
      },
    61: {
        color: "#3B495D",
        desc: "Light rain",
        image: "./assets/rain.png"
    },
    63: {
        color: "#3B495D",
        desc: "Rain",
        image: "./assets/rain.png"
    },
    65: {
        color: "#3B495D",
        desc: "Heavy Rain",
        image: "./assets/rain.png"
      },
    80: {
        color: "#3B495D",
        desc: "Light rain shower",
        image: "./assets/rain.png"
      },
    81: {
        color: "#3B495D",
        desc: "Rain showers",
        image: "./assets/rain.png"
      },
    82: {
        color: "#3B495D",
        desc: "Heavy rain shower",
        image: "./assets/rain.png"
      },
    95: {
        color: "#4B5D95",
        desc: "Thunderstorms",
        image: "./assets/storms.png"
      },
    96: {
        color: "#4B5D95",
        desc: "Thunderstorms",
        image: "./assets/storms.png"
      },
}

export default function codeConverter(code) {
    if (!(code in codeKeys)) {
        return {
            color: '#fff',
            desc: 'Code not found',
            image: ""
        }
    }
    const wmo = codeKeys[code]
    return wmo;
}