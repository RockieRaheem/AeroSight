// Common airlines operating in and around Uganda/East Africa
export const commonAirlines = [
  // Ugandan Airlines
  {
    code: "UR",
    name: "Uganda Airlines",
    prefix: "UR",
    country: "Uganda",
    commonAircraft: ["Airbus A330", "Boeing 737", "Bombardier CRJ900"],
  },

  // Major African Airlines
  {
    code: "ET",
    name: "Ethiopian Airlines",
    prefix: "ET",
    country: "Ethiopia",
    commonAircraft: ["Boeing 777", "Boeing 787", "Airbus A350", "Boeing 737"],
  },
  {
    code: "KQ",
    name: "Kenya Airways",
    prefix: "KQ",
    country: "Kenya",
    commonAircraft: ["Boeing 787", "Boeing 737", "Embraer E190"],
  },
  {
    code: "WB",
    name: "RwandAir",
    prefix: "WB",
    country: "Rwanda",
    commonAircraft: ["Airbus A330", "Boeing 737", "Bombardier CRJ900"],
  },
  {
    code: "HM",
    name: "Air Seychelles",
    prefix: "HM",
    country: "Seychelles",
    commonAircraft: ["Airbus A320", "ATR 72"],
  },
  {
    code: "TC",
    name: "Air Tanzania",
    prefix: "TC",
    country: "Tanzania",
    commonAircraft: ["Boeing 787", "Airbus A220", "Boeing 737"],
  },
  {
    code: "PW",
    name: "Precision Air",
    prefix: "PW",
    country: "Tanzania",
    commonAircraft: ["ATR 42", "ATR 72"],
  },
  {
    code: "QU",
    name: "Utair Aviation",
    prefix: "QU",
    country: "South Sudan",
    commonAircraft: ["Boeing 737", "ATR 72"],
  },

  // Major International Airlines serving East Africa
  {
    code: "EK",
    name: "Emirates",
    prefix: "EK",
    country: "UAE",
    commonAircraft: ["Airbus A380", "Boeing 777", "Airbus A350"],
  },
  {
    code: "QR",
    name: "Qatar Airways",
    prefix: "QR",
    country: "Qatar",
    commonAircraft: ["Airbus A350", "Boeing 777", "Boeing 787"],
  },
  {
    code: "TK",
    name: "Turkish Airlines",
    prefix: "TK",
    country: "Turkey",
    commonAircraft: ["Boeing 777", "Airbus A330", "Boeing 737"],
  },
  {
    code: "LH",
    name: "Lufthansa",
    prefix: "LH",
    country: "Germany",
    commonAircraft: ["Airbus A350", "Boeing 747", "Airbus A320"],
  },
  {
    code: "KL",
    name: "KLM",
    prefix: "KL",
    country: "Netherlands",
    commonAircraft: ["Boeing 777", "Boeing 787", "Airbus A330"],
  },
  {
    code: "AF",
    name: "Air France",
    prefix: "AF",
    country: "France",
    commonAircraft: ["Airbus A350", "Boeing 777", "Airbus A320"],
  },
  {
    code: "BA",
    name: "British Airways",
    prefix: "BA",
    country: "United Kingdom",
    commonAircraft: ["Airbus A350", "Boeing 777", "Airbus A320"],
  },
  {
    code: "SN",
    name: "Brussels Airlines",
    prefix: "SN",
    country: "Belgium",
    commonAircraft: ["Airbus A330", "Airbus A320", "Sukhoi Superjet 100"],
  },
];

// Generate random flight numbers for airlines
export const generateFlightNumber = (airlineCode: string): string => {
  const number = Math.floor(Math.random() * 999) + 1;
  return `${airlineCode}${number.toString().padStart(3, "0")}`;
};

// Get random airline
export const getRandomAirline = () => {
  return commonAirlines[Math.floor(Math.random() * commonAirlines.length)];
};

// Get random aircraft for an airline
export const getRandomAircraft = (airline: (typeof commonAirlines)[0]) => {
  return airline.commonAircraft[
    Math.floor(Math.random() * airline.commonAircraft.length)
  ];
};
