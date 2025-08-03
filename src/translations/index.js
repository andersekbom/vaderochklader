/**
 * Translations for the Weather & Clothes app
 * Contains all text strings in both Swedish and English
 */

export const translations = {
  // General UI
  sv: {
    // App title and general UI
    appTitle: 'Väder & Kläder',
    appSubtitle: 'Hitta kläder för rätt väder!',
    loading: 'Laddar...',
    retry: 'Försök igen',
    save: 'Spara',
    cancel: 'Avbryt',
    close: 'Stäng',
    
    // Weather-related
    fetchingLocation: 'Hämtar din plats...',
    fetchingWeather: 'Laddar väder...',
    weatherError: 'Kunde inte hämta väderinformation',
    locationError: 'Kunde inte hämta din plats',
    
    // Clothing question
    clothingQuestion: 'Vilka kläder tror du är bra för det här vädret?',
    
    // Body parts
    head: 'Huvud',
    torso: 'Överkropp',
    legs: 'Ben',
    feet: 'Fötter',
    
    // Outfit selection
    selectOutfit: 'Välj kläder för',
    noItemsAvailable: 'Inga kläder tillgängliga',
    
    // Settings
    settings: 'Inställningar',
    language: 'Språk',
    swedish: 'Svenska',
    english: 'Engelska',
    german: 'Tyska',
    
    // Outfit reactions - perfect
    perfectReaction1: "Perfekt val! Du kommer att vara bekväm utomhus!",
    perfectReaction2: "Bra outfit för det här vädret!",
    perfectReaction3: "Du är helt redo för dagens väder!",
    perfectReaction4: "Det är precis vad jag skulle välja!",
    
    // Outfit reactions - good
    goodReaction1: "Det är ett bra val!",
    goodReaction2: "Bra outfitval!",
    goodReaction3: "Du kommer att vara bekväm i det!",
    
    // Outfit reactions - warning
    warningReaction1: "Hmm, det kanske inte är det bästa valet...",
    warningReaction2: "Är du säker på den här outfiten?",
    warningReaction3: "Det kan bli lite obekvämt...",
    
    // Outfit reactions - poor
    poorReaction1: "Oops! Dina fötter kan bli blöta med de sandalerna i regnet!",
    poorReaction2: "Brrr! Du kan bli kall utan jacka!",
    poorReaction3: "Du kan bli för varm i den vinterjackan en solig dag!",
    poorReaction4: "De shortsen kanske inte håller dig tillräckligt varm!",
    
    // Specific feedback
    wetFeetFeedback: "Oj, det blir kanske blött om fötterna med de sandalerna i regnet!",
    coldSnowFeedback: "Brrr! Du kan bli kall med det valet i snön!",
    hotCoatFeedback: "Du kan bli för varm i den vinterjackan en så varm dag!",
    
    // Weather conditions
    sunny: "Soligt",
    cloudy: "Molnigt",
    rainy: "Regnigt",
    snowy: "Snöigt",
    stormy: "Stormigt",
    
    // Temperature
    temperature: "Temperatur",
    feelsLike: "Känns som",
    
    // Clothing items - Head
    cap: "Keps",
    beanie: "Mössa",
    hood: "Luva",
    
    // Clothing items - Torso
    tShirt: "T-shirt",
    longSleeve: "Långärmad",
    sweater: "Tjöja",
    jacket: "Jacka",
    rainCoat: "Regnjacka",
    winterCoat: "Vinterjacka",
    
    // Clothing items - Legs
    shorts: "Shorts",
    pants: "Byxor",
    jeans: "Jeans",
    warmPants: "Varma byxor",
    
    // Clothing items - Feet
    sandals: "Sandaler",
    sneakers: "Skor",
    shoes: "Finskor",
    rainBoots: "Regnstövlar",
    winterBoots: "Vinterstövlar",
  },
  
  // English translations
  en: {
    // App title and general UI
    appTitle: 'Weather & Clothes',
    appSubtitle: 'Find the right clothes for the weather!',
    loading: 'Loading...',
    retry: 'Try again',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    
    // Weather-related
    fetchingLocation: 'Getting your location...',
    fetchingWeather: 'Loading weather...',
    weatherError: 'Could not fetch weather information',
    locationError: 'Could not get your location',
    
    // Clothing question
    clothingQuestion: 'What clothes do you think are good for this weather?',
    
    // Body parts
    head: 'Head',
    torso: 'Upper body',
    legs: 'Legs',
    feet: 'Feet',
    
    // Outfit selection
    selectOutfit: 'Select clothes for',
    noItemsAvailable: 'No clothes available',
    
    // Settings
    settings: 'Settings',
    language: 'Language',
    swedish: 'Swedish',
    english: 'English',
    german: 'German',
    
    // Outfit reactions - perfect
    perfectReaction1: "Perfect choice! You'll be comfortable outside!",
    perfectReaction2: "Great outfit for this weather!",
    perfectReaction3: "You're all ready for today's weather!",
    perfectReaction4: "That's exactly what I would choose!",
    
    // Outfit reactions - good
    goodReaction1: "That's a good choice!",
    goodReaction2: "Good outfit choice!",
    goodReaction3: "You'll be comfortable in that!",
    
    // Outfit reactions - warning
    warningReaction1: "Hmm, that might not be the best choice...",
    warningReaction2: "Are you sure about this outfit?",
    warningReaction3: "It might be a bit uncomfortable...",
    
    // Outfit reactions - poor
    poorReaction1: "Oops! Your feet might get wet with those sandals in the rain!",
    poorReaction2: "Brrr! You might get cold without a jacket!",
    poorReaction3: "You might get too hot in that winter coat on a sunny day!",
    poorReaction4: "Those shorts might not keep you warm enough!",
    
    // Specific feedback
    wetFeetFeedback: "Oh, your feet might get wet with those sandals in the rain!",
    coldSnowFeedback: "Brrr! You might get cold with that choice in the snow!",
    hotCoatFeedback: "You might get too hot in that winter coat on such a warm day!",
    
    // Weather conditions
    sunny: "Sunny",
    cloudy: "Cloudy",
    rainy: "Rainy",
    snowy: "Snowy",
    stormy: "Stormy",
    
    // Temperature
    temperature: "Temperature",
    feelsLike: "Feels like",
    
    // Clothing items - Head
    cap: "Cap",
    beanie: "Beanie",
    hood: "Hood",
    
    // Clothing items - Torso
    tShirt: "T-shirt",
    longSleeve: "Long sleeve",
    sweater: "Sweater",
    jacket: "Jacket",
    rainCoat: "Rain coat",
    winterCoat: "Winter coat",
    
    // Clothing items - Legs
    shorts: "Shorts",
    pants: "Pants",
    jeans: "Jeans",
    warmPants: "Warm pants",
    
    // Clothing items - Feet
    sandals: "Sandals",
    sneakers: "Sneakers",
    shoes: "Shoes",
    rainBoots: "Rain boots",
    winterBoots: "Winter boots",
  },
  
  // German translations
  de: {
    // App title and general UI
    appTitle: 'Wetter & Kleidung',
    appSubtitle: 'Finde die richtige Kleidung für das Wetter!',
    loading: 'Laden...',
    retry: 'Erneut versuchen',
    save: 'Speichern',
    cancel: 'Abbrechen',
    close: 'Schließen',
    
    // Weather-related
    fetchingLocation: 'Standort wird ermittelt...',
    fetchingWeather: 'Wetter wird geladen...',
    weatherError: 'Wetterinformationen konnten nicht abgerufen werden',
    locationError: 'Standort konnte nicht ermittelt werden',
    
    // Clothing question
    clothingQuestion: 'Welche Kleidung denkst du ist gut für dieses Wetter?',
    
    // Body parts
    head: 'Kopf',
    torso: 'Oberkörper',
    legs: 'Beine',
    feet: 'Füße',
    
    // Outfit selection
    selectOutfit: 'Kleidung auswählen für',
    noItemsAvailable: 'Keine Kleidung verfügbar',
    
    // Settings
    settings: 'Einstellungen',
    language: 'Sprache',
    swedish: 'Schwedisch',
    english: 'Englisch',
    german: 'Deutsch',
    
    // Outfit reactions - perfect
    perfectReaction1: "Perfekte Wahl! Du wirst draußen bequem sein!",
    perfectReaction2: "Tolles Outfit für dieses Wetter!",
    perfectReaction3: "Du bist bereit für das heutige Wetter!",
    perfectReaction4: "Das ist genau das, was ich wählen würde!",
    
    // Outfit reactions - good
    goodReaction1: "Das ist eine gute Wahl!",
    goodReaction2: "Gute Outfit-Wahl!",
    goodReaction3: "Du wirst dich darin wohlfühlen!",
    
    // Outfit reactions - warning
    warningReaction1: "Hmm, das ist vielleicht nicht die beste Wahl...",
    warningReaction2: "Bist du sicher bei diesem Outfit?",
    warningReaction3: "Es könnte etwas ungemütlich werden...",
    
    // Outfit reactions - poor
    poorReaction1: "Hoppla! Deine Füße könnten mit den Sandalen im Regen nass werden!",
    poorReaction2: "Brrr! Du könntest ohne Jacke frieren!",
    poorReaction3: "Du könntest in der Winterjacke an einem sonnigen Tag zu heiß werden!",
    poorReaction4: "Die Shorts halten dich vielleicht nicht warm genug!",
    
    // Specific feedback
    wetFeetFeedback: "Oh, deine Füße könnten mit den Sandalen im Regen nass werden!",
    coldSnowFeedback: "Brrr! Mit dieser Wahl könntest du im Schnee frieren!",
    hotCoatFeedback: "Du könntest in der Winterjacke an so einem warmen Tag zu heiß werden!",
    
    // Weather conditions
    sunny: "Sonnig",
    cloudy: "Bewölkt",
    rainy: "Regnerisch",
    snowy: "Schneefall",
    stormy: "Stürmisch",
    
    // Temperature
    temperature: "Temperatur",
    feelsLike: "Gefühlt wie",
    
    // Clothing items - Head
    cap: "Kappe",
    beanie: "Mütze",
    hood: "Kapuze",
    
    // Clothing items - Torso
    tShirt: "T-Shirt",
    longSleeve: "Langarm",
    sweater: "Pullover",
    jacket: "Jacke",
    rainCoat: "Regenjacke",
    winterCoat: "Winterjacke",
    
    // Clothing items - Legs
    shorts: "Shorts",
    pants: "Hose",
    jeans: "Jeans",
    warmPants: "Warme Hose",
    
    // Clothing items - Feet
    sandals: "Sandalen",
    sneakers: "Turnschuhe",
    shoes: "Schuhe",
    rainBoots: "Gummistiefel",
    winterBoots: "Winterstiefel",
  }
};

// Map of reaction types to translation keys
export const reactionTranslationKeys = {
  perfect: [
    'perfectReaction1',
    'perfectReaction2',
    'perfectReaction3',
    'perfectReaction4',
  ],
  good: [
    'goodReaction1',
    'goodReaction2',
    'goodReaction3',
  ],
  warning: [
    'warningReaction1',
    'warningReaction2',
    'warningReaction3',
  ],
  poor: [
    'poorReaction1',
    'poorReaction2',
    'poorReaction3',
    'poorReaction4',
  ],
};

// Weather condition translation mapping
export const weatherConditionKeys = {
  sunny: 'sunny',
  cloudy: 'cloudy',
  rainy: 'rainy',
  snowy: 'snowy',
  stormy: 'stormy',
};

// Specific feedback translation keys
export const specificFeedbackKeys = {
  wetFeet: 'wetFeetFeedback',
  coldSnow: 'coldSnowFeedback',
  hotCoat: 'hotCoatFeedback',
};

export default translations;