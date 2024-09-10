// Import your image files
import blue_2x2 from './img/blue_2x2.png';
import red_2x2 from './img/red_2x2.png';
import logo from './img/PNG.png';

// Import other images as needed
import black_2x2 from './img/black_2x2.png';
import green_2x2 from './img/green_2x2.png';
import grey_2x2 from './img/grey_2x2.png';
import folder_img from './img/folder.png';
import folder_img_two from './img/folder_copy_two.png';

// Import project icon image
const API_KEY = '31b9f8407f4148fb969d92283f45ecc7';

export const PRIMARY_COLORS = [
  'Black',
  'Blue', 
  'Green',
  'Red',
  'White',
  'Yellow',
  'Purple',
  'Pink',
  'Brown',
  'Orange',
  'Gray'
];
export const COLORS = {
  "0": "Black",
  "1": "Blue",
  "2": "Green",
  "3": "Dark Turquoise",
  "4": "Red",
  "5": "Dark Pink",
  "6": "Brown",
  "7": "Light Gray",
  "8": "Dark Gray",
  "9": "Light Blue",
  "10": "Bright Green",
  "11": "Light Turquoise",
  "12": "Salmon",
  "13": "Pink",
  "14": "Yellow",
  "15": "White",
  "17": "Light Green",
  "18": "Light Yellow",
  "19": "Tan",
  "20": "Light Violet",
  "21": "Glow In Dark Opaque",
  "22": "Purple",
  "23": "Dark Blue-Violet",
  "25": "Orange",
  "26": "Magenta",
  "27": "Lime",
  "28": "Dark Tan",
  "29": "Bright Pink",
  "30": "Medium Lavender",
  "31": "Lavender",
  "32": "Trans-Black IR Lens",
  "33": "Trans-Dark Blue",
  "34": "Trans-Green",
  "35": "Trans-Bright Green",
  "36": "Trans-Red",
  "40": "Trans-Brown",
  "41": "Trans-Light Blue",
  "42": "Trans-Neon Green",
  "43": "Trans-Very Lt Blue",
  "45": "Trans-Dark Pink",
  "46": "Trans-Yellow",
  "47": "Trans-Clear",
  "52": "Trans-Purple",
  "54": "Trans-Neon Yellow",
  "57": "Trans-Neon Orange",
  "60": "Chrome Antique Brass",
  "61": "Chrome Blue",
  "62": "Chrome Green",
  "63": "Chrome Pink",
  "64": "Chrome Black",
  "68": "Very Light Orange",
  "69": "Light Purple",
  "70": "Reddish Brown",
  "71": "Light Bluish Gray",
  "72": "Dark Bluish Gray",
  "73": "Medium Blue",
  "74": "Medium Green",
  "75": "Speckle Black-Copper",
  "76": "Speckle DBGray-Silver",
  "77": "Light Pink",
  "78": "Light Nougat",
  "79": "Milky White",
  "80": "Metallic Silver",
  "81": "Metallic Green",
  "82": "Metallic Gold",
  "84": "Medium Nougat",
  "85": "Dark Purple",
  "86": "Light Brown",
  "89": "Royal Blue",
  "92": "Nougat",
  "100": "Light Salmon",
  "110": "Violet",
  "112": "Medium Bluish Violet",
  "114": "Glitter Trans-Dark Pink",
  "115": "Medium Lime",
  "117": "Glitter Trans-Clear",
  "118": "Aqua",
  "120": "Light Lime",
  "125": "Light Orange",
  "129": "Glitter Trans-Purple",
  "132": "Speckle Black-Silver",
  "133": "Speckle Black-Gold",
  "134": "Copper",
  "135": "Pearl Light Gray",
  "137": "Pearl Sand Blue",
  "142": "Pearl Light Gold",
  "143": "Trans-Medium Blue",
  "148": "Pearl Dark Gray",
  "150": "Pearl Very Light Gray",
  "151": "Very Light Bluish Gray",
  "158": "Yellowish Green",
  "178": "Flat Dark Gold",
  "179": "Flat Silver",
  "182": "Trans-Orange",
  "183": "Pearl White",
  "191": "Bright Light Orange",
  "212": "Bright Light Blue",
  "216": "Rust",
  "226": "Bright Light Yellow"
};

export const CATEGORIES = {
  'Bars, Ladders and Fences': 1,
  'Baseplates': 2,
  'Belville, Scala and Fabuland': 3,
  'Bricks': 4,
  'Bricks Curved': 5,
  'Bricks Round and Cones': 6,
  'Bricks Sloped': 7,
  'Bricks Special': 8,
  'Bricks Wedged': 9,
  'Clikits': 10,
  'Containers': 11,
  'Duplo, Quatro and Primo': 12,
  'Electronics': 13,
  'Energy Effects': 14,
  'Flags, Signs, Plastics and Cloth': 15,
  'Hinges, Arms and Turntables': 16,
  'HO Scale': 17,
  'Large Buildable Figures': 18,
  'Magnets and Holders': 19,
  'Mechanical': 20,
  'Minidoll Heads': 21,
  'Minidoll Lower Body': 22,
  'Minidoll Upper Body': 23,
  'Minifig Accessories': 24,
  'Minifig Heads': 25,
  'Minifig Headwear': 26,
  'Minifig Lower Body': 27,
  'Minifigs': 28,
  'Minifig Upper Body': 29,
  'Modulex': 30,
  'Non-Buildable Figures (Duplo, Fabuland, etc)': 31,
  'Non-LEGO': 32,
  'Other': 33,
  'Panels': 34,
  'Plants and Animals': 35,
  'Plates': 36,
  'Plates Angled': 37,
  'Plates Round Curved and Dishes': 38,
  'Plates Special': 39,
  'Pneumatics': 40,
  'Projectiles / Launchers': 41,
  'Rock': 42,
  'Stickers': 43,
  'String, Bands and Reels': 44,
  'Supports, Girders and Cranes': 45,
  'Technic Axles': 46,
  'Technic Beams': 47,
  'Technic Beams Special': 48,
  'Technic Bricks': 49,
  'Technic Bushes': 50,
  'Technic Connectors': 51,
  'Technic Gears': 52,
  'Technic Panels': 53,
  'Technic Pins': 54,
  'Technic Special': 55,
  'Technic Steering, Suspension and Engine': 56,
  'Tiles': 57,
  'Tiles Round and Curved': 58,
  'Tiles Special': 59,
  'Tools': 60,
  'Transportation - Land': 61,
  'Transportation - Sea and Air': 62,
  'Tubes and Hoses': 63,
  'Wheels and Tyres': 64,
  'Windows and Doors': 65,
  'Windscreens and Fuselage': 66,
  'Znap': 67
};


export default imageMap = {
  blue_2x2,
  red_2x2,
  black_2x2,
  green_2x2,
  grey_2x2,
  logo,
  API_KEY,
  folder_img,
  folder_img_two,
  // Add other images to this map
};

// export const imageFilenames = [
//   'red_2x2.png',
//   'blue_2x2.png',
//   'black_2x2.png',
//   'green_2x2.png',
//   'grey_2x2.png',
// ];
