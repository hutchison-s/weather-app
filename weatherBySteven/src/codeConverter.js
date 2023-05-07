const codeKeys = {
    0: {
      color: "#0175C0",
      desc: "Clear skies",
      image: "clear",
      code: 0
    },
    1: {
      color: "#0175C0",
      desc: "Mainly clear",
      image: "clear",
      code: 1
    },
    2: {
        color: "#0175C0",
        desc: "Partly cloudy",
        image: "clear",
        code: 2
      },
    3: {
        color: "#0175C0",
        desc: "Overcast",
        image: "cloudy",
        code: 3
      },
    45: {
        color: "#0175C0",
        desc: "Foggy",
        image: "cloudy",
        code: 45
      },
    51: {
        color: "#3B495D",
        desc: "Light drizzle",
        image: "rain",
        code: 51
    },
    53: {
        color: "#3B495D",
        desc: "Drizzle",
        image: "rain",
        code: 53
      },
    55: {
        color: "#3B495D",
        desc: "Heavy drizzle",
        image: "rain",
        code: 55
      },
    61: {
        color: "#3B495D",
        desc: "Light rain",
        image: "rain",
        code: 61
    },
    63: {
        color: "#3B495D",
        desc: "Rain",
        image: "rain",
        code: 63
    },
    65: {
        color: "#3B495D",
        desc: "Heavy Rain",
        image: "rain",
        code: 65
      },
    80: {
        color: "#3B495D",
        desc: "Light rain shower",
        image: "rain",
        code: 80
      },
    81: {
        color: "#3B495D",
        desc: "Rain showers",
        image: "rain",
        code: 81
      },
    82: {
        color: "#3B495D",
        desc: "Heavy rain shower",
        image: "rain",
        code: 82
      },
    95: {
        color: "#4B5D95",
        desc: "Thunderstorms",
        image: "storms",
        code: 95
      },
    96: {
        color: "#4B5D95",
        desc: "Thunderstorms",
        image: "storms",
        code: 96
      },
}

export default function codeConverter(code) {
    if (!(code in codeKeys)) {
        return {
            color: '#fff',
            desc: 'Code not found',
            image: "",
            code: 404
        }
    }
    const wmo = codeKeys[code]
    return wmo;
}