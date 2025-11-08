export interface City {
  name: string;
  coordinates: [number, number];
  description: string;
}

export const SPANISH_CITIES: City[] = [
  {
    name: "Madrid",
    coordinates: [-3.7038, 40.4168],
    description: "Sede central",
  },
  {
    name: "Barcelona",
    coordinates: [2.1098, 41.5432],
    description: "Derecho bancario",
  },
  {
    name: "Valencia",
    coordinates: [-0.3763, 39.4699],
    description: "Derecho civil",
  },
  {
    name: "Sevilla",
    coordinates: [-5.9845, 37.3891],
    description: "Derecho laboral",
  },
  {
    name: "Zaragoza",
    coordinates: [-0.8773, 41.6518],
    description: "Derecho fiscal",
  },
  {
    name: "Málaga",
    coordinates: [-4.4214, 36.7213],
    description: "Derecho inmobiliario",
  },
  {
    name: "Murcia",
    coordinates: [-1.1307, 37.9922],
    description: "Derecho penal",
  },
  {
    name: "Palma",
    coordinates: [2.6502, 39.5696],
    description: "Derecho marítimo",
  },
  {
    name: "Las Palmas",
    coordinates: [-15.4138, 28.1235],
    description: "Derecho internacional",
  },
  {
    name: "Bilbao",
    coordinates: [-2.9253, 43.2627],
    description: "Derecho empresarial",
  },
  {
    name: "Alicante",
    coordinates: [-0.4817, 38.3452],
    description: "Derecho turístico y comercial",
  },
  {
    name: "Córdoba",
    coordinates: [-4.7793, 37.8882],
    description: "Derecho agrario y rural",
  },
  {
    name: "Valladolid",
    coordinates: [-4.7245, 41.6523],
    description: "Derecho administrativo",
  },
  {
    name: "Vigo",
    coordinates: [-8.7226, 42.2406],
    description: "Derecho marítimo y pesquero",
  },
  {
    name: "A Coruña",
    coordinates: [-8.4115, 43.3623],
    description: "Derecho portuario",
  },
  {
    name: "Granada",
    coordinates: [-3.5986, 37.1773],
    description: "Derecho patrimonial",
  },
  {
    name: "Oviedo",
    coordinates: [-5.8302, 43.3603],
    description: "Derecho de la construcción",
  },
  {
    name: "Santa Cruz de Tenerife",
    coordinates: [-16.2518, 28.4636],
    description: "Derecho insular",
  },
  {
    name: "Pamplona",
    coordinates: [-1.644, 42.8125],
    description: "Derecho foral navarro",
  },
  {
    name: "Segovia",
    coordinates: [-4.1171, 40.9429],
    description: "Derecho histórico",
  },
  {
    name: "Girona",
    coordinates: [2.8237, 41.9794],
    description: "Derecho transfronterizo",
  },
  {
    name: "Castellón",
    coordinates: [-0.0376, 39.9864],
    description: "Derecho industrial",
  },
  {
    name: "Huesca",
    coordinates: [-0.4086, 42.1401],
    description: "Derecho agrario",
  },
  {
    name: "Marbella",
    coordinates: [-4.8852, 36.51],
    description: "Derecho turístico",
  },
  {
    name: "Cartagena",
    coordinates: [-0.9865, 37.6256],
    description: "Derecho marítimo y portuario",
  },
  {
    name: "Ibiza",
    coordinates: [1.4206, 38.9067],
    description: "Derecho turístico e inmobiliario",
  },
  {
    name: "Tenerife",
    coordinates: [-16.5129, 28.2916],
    description: "Derecho canario",
  },
  {
    name: "San Sebastián",
    coordinates: [-1.9812, 43.3183],
    description: "Derecho gastronómico y cultural",
  },
];

export const getCityOptions = () => {
  return SPANISH_CITIES.map((city) => ({
    label: city.name,
    value: city.name,
  }));
};
