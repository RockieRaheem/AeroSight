// Common aircraft types used in East African and international aviation
export const commonAircraftTypes = [
  // Narrow-body aircraft
  "Boeing 737-800",
  "Boeing 737 MAX 8",
  "Airbus A320",
  "Airbus A320neo",
  "Airbus A220",
  "Embraer E190",
  "Bombardier CRJ900",
  "ATR 72",
  "ATR 42",

  // Wide-body aircraft
  "Boeing 777-200",
  "Boeing 777-300ER",
  "Boeing 787-8",
  "Boeing 787-9",
  "Boeing 787-10",
  "Airbus A330-200",
  "Airbus A330-300",
  "Airbus A350-900",
  "Airbus A350-1000",
  "Boeing 747-8F",
  "Airbus A380",

  // Cargo aircraft
  "Boeing 737-800F",
  "Boeing 777F",
  "Airbus A330-200F",
];

// Common airports in East Africa and connections
export const commonAirports = [
  // East African airports
  {
    code: "EBB",
    name: "Entebbe International Airport",
    city: "Kampala",
    country: "Uganda",
  },
  {
    code: "ADD",
    name: "Addis Ababa Bole International Airport",
    city: "Addis Ababa",
    country: "Ethiopia",
  },
  {
    code: "NBO",
    name: "Jomo Kenyatta International Airport",
    city: "Nairobi",
    country: "Kenya",
  },
  {
    code: "KGL",
    name: "Kigali International Airport",
    city: "Kigali",
    country: "Rwanda",
  },
  {
    code: "DAR",
    name: "Julius Nyerere International Airport",
    city: "Dar es Salaam",
    country: "Tanzania",
  },
  {
    code: "JRO",
    name: "Kilimanjaro International Airport",
    city: "Arusha",
    country: "Tanzania",
  },
  {
    code: "SEZ",
    name: "Seychelles International Airport",
    city: "Victoria",
    country: "Seychelles",
  },
  {
    code: "JUB",
    name: "Juba International Airport",
    city: "Juba",
    country: "South Sudan",
  },

  // Major international destinations
  {
    code: "DXB",
    name: "Dubai International Airport",
    city: "Dubai",
    country: "UAE",
  },
  {
    code: "DOH",
    name: "Hamad International Airport",
    city: "Doha",
    country: "Qatar",
  },
  {
    code: "IST",
    name: "Istanbul Airport",
    city: "Istanbul",
    country: "Turkey",
  },
  {
    code: "CDG",
    name: "Charles de Gaulle Airport",
    city: "Paris",
    country: "France",
  },
  {
    code: "AMS",
    name: "Amsterdam Airport Schiphol",
    city: "Amsterdam",
    country: "Netherlands",
  },
  {
    code: "LHR",
    name: "Heathrow Airport",
    city: "London",
    country: "United Kingdom",
  },
  {
    code: "FRA",
    name: "Frankfurt Airport",
    city: "Frankfurt",
    country: "Germany",
  },
  {
    code: "BRU",
    name: "Brussels Airport",
    city: "Brussels",
    country: "Belgium",
  },
  {
    code: "JFK",
    name: "John F. Kennedy International Airport",
    city: "New York",
    country: "USA",
  },
  {
    code: "LOS",
    name: "Murtala Muhammed International Airport",
    city: "Lagos",
    country: "Nigeria",
  },
  {
    code: "CPT",
    name: "Cape Town International Airport",
    city: "Cape Town",
    country: "South Africa",
  },
  {
    code: "JNB",
    name: "O.R. Tambo International Airport",
    city: "Johannesburg",
    country: "South Africa",
  },
];

// Common flight routes from Entebbe
export const popularRoutes = [
  { origin: "EBB", destination: "ADD", route: "Kampala → Addis Ababa" },
  { origin: "EBB", destination: "NBO", route: "Kampala → Nairobi" },
  { origin: "EBB", destination: "KGL", route: "Kampala → Kigali" },
  { origin: "EBB", destination: "DAR", route: "Kampala → Dar es Salaam" },
  { origin: "EBB", destination: "DXB", route: "Kampala → Dubai" },
  { origin: "EBB", destination: "DOH", route: "Kampala → Doha" },
  { origin: "EBB", destination: "IST", route: "Kampala → Istanbul" },
  { origin: "EBB", destination: "LHR", route: "Kampala → London" },
  { origin: "EBB", destination: "AMS", route: "Kampala → Amsterdam" },
  { origin: "EBB", destination: "BRU", route: "Kampala → Brussels" },
];
