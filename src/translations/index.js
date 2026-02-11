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
    noClothing: '🚫 Ingen klädsel',
    none: 'Inget',
    myCustomClothes: '✨ Mina egna kläder',
    addCustomClothes: '📷 Lägg till egna kläder',
    addCustom: 'Lägg till egen',
    chooseForMe: 'Välj åt mig',
    holdToDelete: 'Håll för att ta bort',
    deleteClothingItem: 'Ta bort klädesplagg',
    deleteConfirm: 'Är du säker på att du vill ta bort',
    delete: 'Ta bort',
    error: 'Fel',
    couldNotDelete: 'Kunde inte ta bort klädesplagget.',
    
    clear: 'Rensa',
    
    // CustomClothingCamera
    selectImage: 'Välj bild',
    selectFromGallery: 'Välj från galleri',
    saved: 'Sparad!',
    saving: 'Sparar...',
    addClothingItem: 'Lägg till {bodyPartName}',
    clothingItemName: 'Namn på klädesplagget:',
    clothingItemPlaceholder: 't.ex. Min favorit t-shirt',
    image: 'Bild:',
    changeImage: 'Ändra bild',
    addImage: 'Lägg till bild',
    permissionsRequired: 'Behörigheter krävs',
    permissionsMessage: 'Vi behöver tillgång till kameran och fotobiblioteket för att du ska kunna ta bilder på dina kläder.',
    howToAddImage: 'Hur vill du lägga till en bild av ditt klädesplagg?',
    takePhoto: 'Ta foto',
    errorTitle: 'Fel',
    pleaseEnterName: 'Vänligen ange ett namn för klädesplagget.',
    pleaseSelectImage: 'Vänligen välj en bild för klädesplagget.',
    itemSavedMessage: '{itemName} har sparats i din {bodyPartName}-samling.',
    couldNotSaveItem: 'Kunde inte spara klädesplagget.',
    
    // Settings
    settings: 'Inställningar',
    language: 'Språk',
    swedish: 'Svenska',
    english: 'Engelska',
    german: 'Tyska',
    finnish: 'Finska',
    sami: 'Samiska',
    korean: 'Koreanska',
    
    // Weather forecast
    nowIn: 'Nu i',
    later: 'Senare',
    and: 'och',
    
    // Temperature descriptions
    veryCold: 'väldigt kallt',
    cold: 'kallt',
    bitCold: 'lite kallt',
    mild: 'ljummet',
    warm: 'varmt',
    quiteWarm: 'ganska varmt',
    veryHot: 'väldigt varmt',
    
    // Seasonal clothing categories
    summerClothes: '☀️ Sommarkläder',
    springClothes: '🌸 Vårkläder',
    autumnClothes: '🍂 Höstkläder',
    winterClothes: '❄️ Vinterkläder',
    rainClothes: '🌧️ Regnkläder',
    
    // Weather forecast conditions
    sunnySyno: 'soligt',
    cloudySyno: 'molnigt',
    rainySyno: 'regna',
    snowySyno: 'snöa',
    stormySyno: 'storma',
    niceWeather: 'fint väder',
    
    // Map interface
    whereInSweden: 'Var är du i Sverige? 🇸🇪',
    youAreNear: '📍 Du är nära',
    findStockholm: 'De stora städerna har roliga ikoner! Kan du hitta Stockholm? 🏦',
    swedenMap: 'Sverige Karta 🇸🇪',
    tapCityIcons: 'Tryck på stadikonerna för att lära dig mer! 🏦😢🌉',
    
    // Outfit reactions - perfect
    perfectReaction1: "Perfekt val! Du kommer att vara bekväm utomhus!",
    perfectReaction2: "Bra klädsel för det här vädret!",
    perfectReaction3: "Du är helt redo för dagens väder!",
    perfectReaction4: "Det är precis vad jag skulle välja!",
    
    // Outfit reactions - good
    goodReaction1: "Det är ett bra val!",
    goodReaction2: "Bra klädval!",
    goodReaction3: "Du kommer att vara bekväm i det!",
    
    // Outfit reactions - warning
    warningReaction1: "Hmm, det kanske inte är det bästa valet...",
    warningReaction2: "Är du säker på den här klädseln?",
    warningReaction3: "Det kan bli lite obekvämt...",
    
    // Outfit reactions - poor
    poorReaction1: "Oops! Dina fötter kan bli blöta med de sandalerna i regnet!",
    poorReaction2: "Brrr! Du kan bli kall utan jacka!",
    poorReaction3: "Du kan bli för varm i den vinterjackan en solig dag!",
    poorReaction4: "De korta byxorna kanske inte håller dig tillräckligt varm!",
    
    // Specific feedback
    wetFeetFeedback: "Oj, det blir kanske blött om fötterna med de sandalerna i regnet!",
    coldSnowFeedback: "Brrr! Du kan bli kall med det valet i snön!",
    hotCoatFeedback: "Du kan bli för varm i den vinterjackan en så varm dag!",
    
    // Error messages
    locationAccessDenied: "Platsåtkomst nekad",
    weatherOutfitContextError: "useWeatherOutfit måste användas inom en WeatherOutfitProvider",
    couldNotSaveCustomItem: "Kunde inte spara det anpassade klädesplagget",
    couldNotDeleteCustomItem: "Kunde inte ta bort det anpassade klädesplagget",
    customItemNotFound: "Anpassat klädesplagg hittades inte",
    couldNotClearCustomItems: "Kunde inte rensa anpassade klädesplagg",
    
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
    shorts: "Korta byxor",
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
    noClothing: '🚫 No clothing',
    none: 'None',
    myCustomClothes: '✨ My custom clothes',
    addCustomClothes: '📷 Add custom clothes',
    addCustom: 'Add custom',
    chooseForMe: 'Choose for me',
    holdToDelete: 'Hold to delete',
    deleteClothingItem: 'Delete clothing item',
    deleteConfirm: 'Are you sure you want to delete',
    delete: 'Delete',
    error: 'Error',
    couldNotDelete: 'Could not delete the clothing item.',
    
    clear: 'Clear',
    
    // CustomClothingCamera
    selectImage: 'Select Image',
    selectFromGallery: 'Select from Gallery',
    saved: 'Saved!',
    saving: 'Saving...',
    addClothingItem: 'Add {bodyPartName}',
    clothingItemName: 'Clothing item name:',
    clothingItemPlaceholder: 'e.g. My favorite t-shirt',
    image: 'Image:',
    changeImage: 'Change image',
    addImage: 'Add image',
    permissionsRequired: 'Permissions required',
    permissionsMessage: 'We need access to camera and photo library so you can take pictures of your clothes.',
    howToAddImage: 'How would you like to add an image of your clothing item?',
    takePhoto: 'Take photo',
    errorTitle: 'Error',
    pleaseEnterName: 'Please enter a name for the clothing item.',
    pleaseSelectImage: 'Please select an image for the clothing item.',
    itemSavedMessage: '{itemName} has been saved to your {bodyPartName} collection.',
    couldNotSaveItem: 'Could not save the clothing item.',
    
    // Settings
    settings: 'Settings',
    language: 'Language',
    swedish: 'Swedish',
    english: 'English',
    german: 'German',
    finnish: 'Finnish',
    sami: 'Sami',
    korean: 'Korean',
    
    // Weather forecast
    nowIn: 'Now in',
    later: 'Later',
    and: 'and',
    
    // Temperature descriptions
    veryCold: 'very cold',
    cold: 'cold',
    bitCold: 'a bit cold',
    mild: 'mild',
    warm: 'warm',
    quiteWarm: 'quite warm',
    veryHot: 'very hot',
    
    // Seasonal clothing categories
    summerClothes: '☀️ Summer clothes',
    springClothes: '🌸 Spring clothes',
    autumnClothes: '🍂 Autumn clothes',
    winterClothes: '❄️ Winter clothes',
    rainClothes: '🌧️ Rain clothes',
    
    // Weather forecast conditions
    sunnySyno: 'sunny',
    cloudySyno: 'cloudy',
    rainySyno: 'rainy',
    snowySyno: 'snowy',
    stormySyno: 'stormy',
    niceWeather: 'nice weather',
    
    // Map interface
    whereInSweden: 'Where are you in Sweden? 🇸🇪',
    youAreNear: '📍 You are near',
    findStockholm: 'The big cities have fun icons! Can you find Stockholm? 🏦',
    swedenMap: 'Sweden Map 🇸🇪',
    tapCityIcons: 'Tap the city icons to learn more! 🏦😢🌉',
    
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
    
    // Error messages
    locationAccessDenied: "Location access denied",
    weatherOutfitContextError: "useWeatherOutfit must be used within a WeatherOutfitProvider",
    couldNotSaveCustomItem: "Could not save the custom clothing item",
    couldNotDeleteCustomItem: "Could not delete the custom clothing item",
    customItemNotFound: "Custom clothing item not found",
    couldNotClearCustomItems: "Could not clear custom clothing items",
    
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
    noClothing: '🚫 Keine Kleidung',
    none: 'Keine',
    myCustomClothes: '✨ Meine eigene Kleidung',
    addCustomClothes: '📷 Eigene Kleidung hinzufügen',
    addCustom: 'Eigene hinzufügen',
    chooseForMe: 'Für mich wählen',
    holdToDelete: 'Halten zum Löschen',
    deleteClothingItem: 'Kleidungsstück löschen',
    deleteConfirm: 'Sind Sie sicher, dass Sie löschen möchten',
    delete: 'Löschen',
    error: 'Fehler',
    couldNotDelete: 'Kleidungsstück konnte nicht gelöscht werden.',
    
    clear: 'Löschen',
    
    // CustomClothingCamera
    selectImage: 'Bild auswählen',
    selectFromGallery: 'Aus Galerie auswählen',
    saved: 'Gespeichert!',
    saving: 'Speichert...',
    addClothingItem: '{bodyPartName} hinzufügen',
    clothingItemName: 'Name des Kleidungsstücks:',
    clothingItemPlaceholder: 'z.B. Mein Lieblings-T-Shirt',
    image: 'Bild:',
    changeImage: 'Bild ändern',
    addImage: 'Bild hinzufügen',
    permissionsRequired: 'Berechtigungen erforderlich',
    permissionsMessage: 'Wir benötigen Zugriff auf Kamera und Fotobibliothek, damit Sie Bilder Ihrer Kleidung aufnehmen können.',
    howToAddImage: 'Wie möchten Sie ein Bild Ihres Kleidungsstücks hinzufügen?',
    takePhoto: 'Foto aufnehmen',
    errorTitle: 'Fehler',
    pleaseEnterName: 'Bitte geben Sie einen Namen für das Kleidungsstück ein.',
    pleaseSelectImage: 'Bitte wählen Sie ein Bild für das Kleidungsstück.',
    itemSavedMessage: '{itemName} wurde in Ihrer {bodyPartName}-Sammlung gespeichert.',
    couldNotSaveItem: 'Das Kleidungsstück konnte nicht gespeichert werden.',
    
    // Settings
    settings: 'Einstellungen',
    language: 'Sprache',
    swedish: 'Schwedisch',
    english: 'Englisch',
    german: 'Deutsch',
    finnish: 'Finnisch',
    sami: 'Samisch',
    korean: 'Koreanisch',
    
    // Weather forecast
    nowIn: 'Jetzt in',
    later: 'Später',
    and: 'und',
    
    // Temperature descriptions
    veryCold: 'sehr kalt',
    cold: 'kalt',
    bitCold: 'etwas kalt',
    mild: 'mild',
    warm: 'warm',
    quiteWarm: 'ziemlich warm',
    veryHot: 'sehr heiß',
    
    // Seasonal clothing categories
    summerClothes: '☀️ Sommerkleidung',
    springClothes: '🌸 Frühlingskleidung',
    autumnClothes: '🍂 Herbstkleidung',
    winterClothes: '❄️ Winterkleidung',
    rainClothes: '🌧️ Regenkleidung',
    
    // Weather forecast conditions
    sunnySyno: 'sonnig',
    cloudySyno: 'bewölkt',
    rainySyno: 'regnerisch',
    snowySyno: 'Schneefall',
    stormySyno: 'stürmisch',
    niceWeather: 'schönes Wetter',
    
    // Map interface
    whereInSweden: 'Wo sind Sie in Schweden? 🇸🇪',
    youAreNear: '📍 Sie sind in der Nähe von',
    findStockholm: 'Die großen Städte haben lustige Symbole! Können Sie Stockholm finden? 🏦',
    swedenMap: 'Schweden Karte 🇸🇪',
    tapCityIcons: 'Tippen Sie auf die Stadticons, um mehr zu erfahren! 🏦😢🌉',
    
    // Outfit reactions - perfect
    perfectReaction1: "Perfekte Wahl! Du wirst draußen bequem sein!",
    perfectReaction2: "Tolle Kleidung für dieses Wetter!",
    perfectReaction3: "Du bist bereit für das heutige Wetter!",
    perfectReaction4: "Das ist genau das, was ich wählen würde!",
    
    // Outfit reactions - good
    goodReaction1: "Das ist eine gute Wahl!",
    goodReaction2: "Gute Kleidungswahl!",
    goodReaction3: "Du wirst dich darin wohlfühlen!",
    
    // Outfit reactions - warning
    warningReaction1: "Hmm, das ist vielleicht nicht die beste Wahl...",
    warningReaction2: "Bist du sicher bei dieser Kleidung?",
    warningReaction3: "Es könnte etwas ungemütlich werden...",
    
    // Outfit reactions - poor
    poorReaction1: "Hoppla! Deine Füße könnten mit den Sandalen im Regen nass werden!",
    poorReaction2: "Brrr! Du könntest ohne Jacke frieren!",
    poorReaction3: "Du könntest in der Winterjacke an einem sonnigen Tag zu heiß werden!",
    poorReaction4: "Die kurze Hose hält dich vielleicht nicht warm genug!",
    
    // Specific feedback
    wetFeetFeedback: "Oh, deine Füße könnten mit den Sandalen im Regen nass werden!",
    coldSnowFeedback: "Brrr! Mit dieser Wahl könntest du im Schnee frieren!",
    hotCoatFeedback: "Du könntest in der Winterjacke an so einem warmen Tag zu heiß werden!",
    
    // Error messages
    locationAccessDenied: "Standortzugriff verweigert",
    weatherOutfitContextError: "useWeatherOutfit muss innerhalb eines WeatherOutfitProviders verwendet werden",
    couldNotSaveCustomItem: "Das benutzerdefinierte Kleidungsstück konnte nicht gespeichert werden",
    couldNotDeleteCustomItem: "Das benutzerdefinierte Kleidungsstück konnte nicht gelöscht werden",
    customItemNotFound: "Benutzerdefiniertes Kleidungsstück nicht gefunden",
    couldNotClearCustomItems: "Benutzerdefinierte Kleidungsstücke konnten nicht gelöscht werden",
    
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
    shorts: "Kurze Hose",
    pants: "Hose",
    jeans: "Jeans",
    warmPants: "Warme Hose",
    
    // Clothing items - Feet
    sandals: "Sandalen",
    sneakers: "Turnschuhe",
    shoes: "Schuhe",
    rainBoots: "Gummistiefel",
    winterBoots: "Winterstiefel",
  },
  
  // Finnish translations
  fi: {
    // App title and general UI
    appTitle: 'Sää & Vaatteet',
    appSubtitle: 'Löydä oikeat vaatteet säähän!',
    loading: 'Ladataan...',
    retry: 'Yritä uudelleen',
    save: 'Tallenna',
    cancel: 'Peruuta',
    close: 'Sulje',
    
    // Weather-related
    fetchingLocation: 'Haetaan sijaintiasi...',
    fetchingWeather: 'Ladataan säätietoja...',
    weatherError: 'Säätietoja ei voitu hakea',
    locationError: 'Sijaintia ei voitu määrittää',
    
    // Clothing question
    clothingQuestion: 'Mitä vaatteita luulet olevan hyviä tähän säähän?',
    
    // Body parts
    head: 'Pää',
    torso: 'Yläkroppa',
    legs: 'Jalat',
    feet: 'Jalkaterät',
    
    // Outfit selection
    selectOutfit: 'Valitse vaatteet',
    noItemsAvailable: 'Ei vaatteita saatavilla',
    noClothing: '🚫 Ei vaatteita',
    none: 'Ei mitään',
    myCustomClothes: '✨ Omat vaatteeni',
    addCustomClothes: '📷 Lisää omia vaatteita',
    addCustom: 'Lisää oma',
    chooseForMe: 'Valitse puolestani',
    holdToDelete: 'Pidä pohjassa poistaaksesi',
    deleteClothingItem: 'Poista vaate',
    deleteConfirm: 'Oletko varma että haluat poistaa',
    delete: 'Poista',
    error: 'Virhe',
    couldNotDelete: 'Vaatetta ei voitu poistaa.',
    
    clear: 'Tyhjennä',
    
    // CustomClothingCamera
    selectImage: 'Valitse kuva',
    selectFromGallery: 'Valitse galleriasta',
    saved: 'Tallennettu!',
    saving: 'Tallennetaan...',
    addClothingItem: 'Lisää {bodyPartName}',
    clothingItemName: 'Vaatekappale nimi:',
    clothingItemPlaceholder: 'esim. Lempi t-paitani',
    image: 'Kuva:',
    changeImage: 'Vaihda kuva',
    addImage: 'Lisää kuva',
    permissionsRequired: 'Käyttöoikeudet vaaditaan',
    permissionsMessage: 'Tarvitsemme kameran ja kuvakirjaston käyttöoikeuden, jotta voit ottaa kuvia vaatteistasi.',
    howToAddImage: 'Miten haluat lisätä kuvan vaatekappaleestasi?',
    takePhoto: 'Ota kuva',
    errorTitle: 'Virhe',
    pleaseEnterName: 'Anna vaatekappaleelle nimi.',
    pleaseSelectImage: 'Valitse vaatekappaleelle kuva.',
    itemSavedMessage: '{itemName} on tallennettu {bodyPartName}-kokoelmaasi.',
    couldNotSaveItem: 'Vaatekappaletta ei voitu tallentaa.',
    
    // Settings
    settings: 'Asetukset',
    language: 'Kieli',
    swedish: 'Ruotsi',
    english: 'Englanti',
    german: 'Saksa',
    finnish: 'Suomi',
    sami: 'Saame',
    korean: 'Korea',
    
    // Weather forecast
    nowIn: 'Nyt paikassa',
    later: 'Myöhemmin',
    and: 'ja',
    
    // Temperature descriptions
    veryCold: 'hyvin kylmä',
    cold: 'kylmä',
    bitCold: 'hieman kylmä',
    mild: 'leuho',
    warm: 'lämmin',
    quiteWarm: 'melko lämmin',
    veryHot: 'hyvin kuuma',
    
    // Seasonal clothing categories
    summerClothes: '☀️ Kesävaatteet',
    springClothes: '🌸 Kevätvaatteet',
    autumnClothes: '🍂 Syysvaatteet',
    winterClothes: '❄️ Talvivaatteet',
    rainClothes: '🌧️ Sadevaatteet',
    
    // Weather forecast conditions
    sunnySyno: 'aurinkoinen',
    cloudySyno: 'pilvinen',
    rainySyno: 'sateinen',
    snowySyno: 'lumisade',
    stormySyno: 'myrskyinen',
    niceWeather: 'mukava sää',
    
    // Map interface
    whereInSweden: 'Missä olet Ruotsissa? 🇸🇪',
    youAreNear: '📍 Olet lähellä',
    findStockholm: 'Suurilla kaupungeilla on hauskoja kuvakkeita! Löydätkö Tukholman? 🏦',
    swedenMap: 'Ruotsin kartta 🇸🇪',
    tapCityIcons: 'Napauta kaupunkien kuvakkeita saadaksesi lisätietoja! 🏦🚢🌉',
    
    // Outfit reactions - perfect
    perfectReaction1: "Täydellinen valinta! Olet mukava ulkona!",
    perfectReaction2: "Loistava asu tälle säällä!",
    perfectReaction3: "Olet valmis tämän päivän säähän!",
    perfectReaction4: "Se on juuri sitä mitä valitsisin!",
    
    // Outfit reactions - good
    goodReaction1: "Se on hyvä valinta!",
    goodReaction2: "Hyvä asuvalinta!",
    goodReaction3: "Olet mukava siinä!",
    
    // Outfit reactions - warning
    warningReaction1: "Hmm, se ei ehkä ole paras valinta...",
    warningReaction2: "Oletko varma tästä asusta?",
    warningReaction3: "Se saattaa olla hieman epämukava...",
    
    // Outfit reactions - poor
    poorReaction1: "Hups! Jalkasi saattavat kastua sandaaleissa sateessa!",
    poorReaction2: "Brrr! Saatat paleltua ilman takkia!",
    poorReaction3: "Saatat käydä liian kuumaksi talvitakissa aurinkoisena päivänä!",
    poorReaction4: "Nuo lyhyet housut eivät ehkä pidä sinua tarpeeksi lämpimänä!",
    
    // Specific feedback
    wetFeetFeedback: "Voi, jalkasi saattavat kastua sandaaleissa sateessa!",
    coldSnowFeedback: "Brrr! Saatat paleltua tuolla valinnalla lumessa!",
    hotCoatFeedback: "Saatat käydä liian kuumaksi talvitakissa noin lämpimänä päivänä!",
    
    // Error messages
    locationAccessDenied: "Sijainnin käyttö estetty",
    weatherOutfitContextError: "useWeatherOutfit täytyy käyttää WeatherOutfitProviderin sisällä",
    couldNotSaveCustomItem: "Mukautettua vaatetta ei voitu tallentaa",
    couldNotDeleteCustomItem: "Mukautettua vaatetta ei voitu poistaa",
    customItemNotFound: "Mukautettua vaatetta ei löytynyt",
    couldNotClearCustomItems: "Mukautettuja vaatteita ei voitu tyhjentää",
    
    // Weather conditions
    sunny: "Aurinkoinen",
    cloudy: "Pilvinen",
    rainy: "Sateinen",
    snowy: "Lumisade",
    stormy: "Myrskyinen",
    
    // Temperature
    temperature: "Lämpötila",
    feelsLike: "Tuntuu kuin",
    
    // Clothing items - Head
    cap: "Lippis",
    beanie: "Pipo",
    hood: "Huppu",
    
    // Clothing items - Torso
    tShirt: "T-paita",
    longSleeve: "Pitkähihainen",
    sweater: "Pusero",
    jacket: "Takki",
    rainCoat: "Sadetakki",
    winterCoat: "Talvitakki",
    
    // Clothing items - Legs
    shorts: "Lyhyet housut",
    pants: "Housut",
    jeans: "Farkut",
    warmPants: "Lämpimät housut",
    
    // Clothing items - Feet
    sandals: "Sandaalit",
    sneakers: "Lenkkarit",
    shoes: "Kengät",
    rainBoots: "Kumisaappaat",
    winterBoots: "Talvisaappaat",
  },
  
  // Northern Sami (Davvisámegiella) translations
  se: {
    // App title and general UI
    appTitle: 'Dálki & Gákti',
    appSubtitle: 'Gávdno rivttes gáktit dálkái!',
    loading: 'Viežžá...',
    retry: 'Geahčal ođđasit',
    save: 'Vurke',
    cancel: 'Gaskkaldahte',
    close: 'Gidde',
    
    // Weather-related
    fetchingLocation: 'Ohcá du báikki...',
    fetchingWeather: 'Viežžá dálkki...',
    weatherError: 'Ii nagdan oažžut dálkkidieđuid',
    locationError: 'Ii nagdan gávdnat du báikki',
    
    // Clothing question
    clothingQuestion: 'Makkár gáktit don oaivvildat leat buorit dán dálkái?',
    
    // Body parts
    head: 'Oaivi',
    torso: 'Duššá',
    legs: 'Juolggit',
    feet: 'Juolggit',
    
    // Outfit selection
    selectOutfit: 'Vállje gáktit',
    noItemsAvailable: 'Eai gáktit gávdno',
    noClothing: '🚫 Eai gáktit',
    none: 'Makkár',
    myCustomClothes: '✨ Mu gáktit',
    addCustomClothes: '📷 Lasit iežas gáktit',
    addCustom: 'Lasit iežas',
    chooseForMe: 'Vállje mu ovddas',
    holdToDelete: 'Čuožžu dustet',
    deleteClothingItem: 'Dustet gákti',
    deleteConfirm: 'Leatgo vissis ahte háliidat dustet',
    delete: 'Dustet',
    error: 'Meattáhus',
    couldNotDelete: 'Ii nagdan dustet gákti.',
    
    clear: 'Suhte',
    
    // CustomClothingCamera
    selectImage: 'Vállje govva',
    selectFromGallery: 'Vállje govvatšollás',
    saved: 'Vurken!',
    saving: 'Vurkejuvo...',
    addClothingItem: 'Lasit {bodyPartName}',
    clothingItemName: 'Gákti namma:',
    clothingItemPlaceholder: 'ovdamearka. Mu ráhkisoabbi páisa',
    image: 'Govva:',
    changeImage: 'Rievdat govva',
    addImage: 'Lasit govva',
    permissionsRequired: 'Vuoigatvuođat dárbbašuvvojit',
    permissionsMessage: 'Mii dárbbašit govvakamára ja govvabiblioteahka beassanvuoigatvuođa jus háliidat váldit govaid iežat gáktis.',
    howToAddImage: 'Mo háliidat lasihit govva iežat gáktis?',
    takePhoto: 'Váldit govva',
    errorTitle: 'Meattáhus',
    pleaseEnterName: 'Buvtta buvttad gáktái nama.',
    pleaseSelectImage: 'Buvtta válljet gáktái govva.',
    itemSavedMessage: '{itemName} lea vurken du {bodyPartName}-čoakkádussii.',
    couldNotSaveItem: 'Gákti ii sáhttán vurkejuvvot.',
    
    // Settings
    settings: 'Heivehus',
    language: 'Giella',
    swedish: 'Ruoŧagiella',
    english: 'Eŋgelasgiella',
    german: 'Duiskkagiella',
    finnish: 'Suomagiella',
    sami: 'Sámegiella',
    korean: 'Goreagiella',
    
    // Weather forecast
    nowIn: 'Dál báikkis',
    later: 'Maŋŋel',
    and: 'ja',
    
    // Temperature descriptions
    veryCold: 'hui jápmis',
    cold: 'jápmis',
    bitCold: 'veahá jápmis',
    mild: 'lieggis',
    warm: 'liekkas',
    quiteWarm: 'ollu liekkas',
    veryHot: 'hui beaggis',
    
    // Seasonal clothing categories
    summerClothes: '☀️ Geasegáktit',
    springClothes: '🌸 Giđđagáktit',
    autumnClothes: '🍂 Čakčagáktit',
    winterClothes: '❄️ Dálvegáktit',
    rainClothes: '🌧️ Arvedgáktit',
    
    // Weather forecast conditions
    sunnySyno: 'beaivválaš',
    cloudySyno: 'balvasat',
    rainySyno: 'arvedmeattáhat',
    snowySyno: 'muohttameattáhat',
    stormySyno: 'unna',
    niceWeather: 'liekkas dálki',
    
    // Map interface
    whereInSweden: 'Gos leat Ruoŧas? 🇸🇪',
    youAreNear: '📍 Leat lahka',
    findStockholm: 'Stuora gávpogiin leat miellagis skovvi! Gávnnatgo Stockholmma? 🏦',
    swedenMap: 'Ruoŧa kárta 🇸🇪',
    tapCityIcons: 'Coahkkal gávpotmearkki oažžut eanet dieđuid! 🏦🚢🌉',
    
    // Outfit reactions - perfect
    perfectReaction1: "Perfekta válljen! Leat mukta olggos!",
    perfectReaction2: "Buorre gákti dán dálkái!",
    perfectReaction3: "Leat gerges odne dálkái!",
    perfectReaction4: "Dat lea juste dat maid válljenin!",
    
    // Outfit reactions - good
    goodReaction1: "Dat lea buorre válljen!",
    goodReaction2: "Buorre gáktiválljen!",
    goodReaction3: "Leat mukta das!",
    
    // Outfit reactions - warning
    warningReaction1: "Hmm, dat ii veaigge leat buoremus válljen...",
    warningReaction2: "Leatgo vissis dán gákti birra?",
    warningReaction3: "Dat sáhttá leat veahá váttis...",
    
    // Outfit reactions - poor
    poorReaction1: "Ai! Du juolggit sáhttet costot sandálain arvvas!",
    poorReaction2: "Brrr! Sáhtat jápmit almmá duollji!",
    poorReaction3: "Sáhtat šaddat liiga liekkasin dálveduolljis beaivválaš beaivvis!",
    poorReaction4: "Dát šortat eai veaigge doalvo du doarvái liekkasin!",
    
    // Specific feedback
    wetFeetFeedback: "Voi, du juolggit sáhttet costot sandálain arvvas!",
    coldSnowFeedback: "Brrr! Sáhtat jápmit dáinna válljeniin muohtas!",
    hotCoatFeedback: "Sáhtat šaddat liiga liekkasin dálveduolljis nu liekkas beaivvis!",
    
    // Error messages
    locationAccessDenied: "Báikki geatni lea giddejuvvon",
    weatherOutfitContextError: "useWeatherOutfit ferte leat WeatherOutfitProvider siskkobealde",
    couldNotSaveCustomItem: "Ii nagdan vurket dán áššá",
    couldNotDeleteCustomItem: "Ii nagdan sihkkut dán áššá",
    customItemNotFound: "Ášši ii gávdnon",
    couldNotClearCustomItems: "Ii nagdan čájehit áššiid",
    
    // Weather conditions
    sunny: "Beaivválaš",
    cloudy: "Balvasat",
    rainy: "Arvedmeattáhat",
    snowy: "Muohttameattáhat",
    stormy: "Unna",
    
    // Temperature
    temperature: "Dálki",
    feelsLike: "Dovddo nugo",
    
    // Clothing items - Head
    cap: "Luhkka",
    beanie: "Čalmmehahtti",
    hood: "Háktu",
    
    // Clothing items - Torso
    tShirt: "T-báidi",
    longSleeve: "Guhkesáibá",
    sweater: "Villapaita",
    jacket: "Duolji",
    rainCoat: "Arvedduolji",
    winterCoat: "Dálveduolji",
    
    // Clothing items - Legs
    shorts: "Oanehisgávnnahat",
    pants: "Gávnnahat",
    jeans: "Farkkut",
    warmPants: "Liekkas gávnnahat",
    
    // Clothing items - Feet
    sandals: "Sandálat",
    sneakers: "Juoksucipo",
    shoes: "Skuovvat",
    rainBoots: "Arvedskuovvat",
    winterBoots: "Dálveskuovvat",
  },
  
  // Korean translations
  ko: {
    // App title and general UI
    appTitle: '날씨 & 옷차림',
    appSubtitle: '날씨에 맞는 옷을 찾아보세요!',
    loading: '로딩 중...',
    retry: '다시 시도',
    save: '저장',
    cancel: '취소',
    close: '닫기',
    
    // Weather-related
    fetchingLocation: '위치를 가져오는 중...',
    fetchingWeather: '날씨를 로딩하는 중...',
    weatherError: '날씨 정보를 가져올 수 없습니다',
    locationError: '위치를 가져올 수 없습니다',
    
    // Clothing question
    clothingQuestion: '이 날씨에 어떤 옷이 좋을 것 같나요?',
    
    // Body parts
    head: '머리',
    torso: '상체',
    legs: '다리',
    feet: '발',
    
    // Outfit selection
    selectOutfit: '옷을 선택하세요',
    noItemsAvailable: '사용 가능한 옷이 없습니다',
    noClothing: '🚫 옷 없음',
    none: '없음',
    myCustomClothes: '✨ 내가 만든 옷',
    addCustomClothes: '📷 옷 추가하기',
    addCustom: '추가하기',
    chooseForMe: '나를 위해 선택해주세요',
    holdToDelete: '삭제하려면 길게 누르세요',
    deleteClothingItem: '옷 삭제',
    deleteConfirm: '정말로 삭제하시겠습니까',
    delete: '삭제',
    error: '오류',
    couldNotDelete: '옷을 삭제할 수 없습니다.',
    
    clear: '지우기',
    
    // CustomClothingCamera
    selectImage: '이미지 선택',
    selectFromGallery: '갤러리에서 선택',
    saved: '저장됨!',
    saving: '저장 중...',
    addClothingItem: '{bodyPartName} 추가',
    clothingItemName: '옷 이름:',
    clothingItemPlaceholder: '예: 내가 좋아하는 티셔츠',
    image: '이미지:',
    changeImage: '이미지 변경',
    addImage: '이미지 추가',
    permissionsRequired: '권한이 필요합니다',
    permissionsMessage: '옷 사진을 찍을 수 있도록 카메라와 사진 라이브러리 접근 권한이 필요합니다.',
    howToAddImage: '옷 이미지를 어떻게 추가하시겠습니까?',
    takePhoto: '사진 찍기',
    errorTitle: '오류',
    pleaseEnterName: '옷 이름을 입력해주세요.',
    pleaseSelectImage: '옷 이미지를 선택해주세요.',
    itemSavedMessage: '{itemName}이(가) {bodyPartName} 컬렉션에 저장되었습니다.',
    couldNotSaveItem: '옷을 저장할 수 없습니다.',
    
    // Settings
    settings: '설정',
    language: '언어',
    swedish: '스웨덴어',
    english: '영어',
    german: '독일어',
    finnish: '핀란드어',
    sami: '사미어',
    korean: '한국어',
    
    // Weather forecast
    nowIn: '지금',
    later: '나중에',
    and: '그리고',
    
    // Temperature descriptions
    veryCold: '매우 추움',
    cold: '추움',
    bitCold: '조금 추움',
    mild: '따뜻함',
    warm: '따뜻함',
    quiteWarm: '꽤 따뜻함',
    veryHot: '매우 더움',
    
    // Seasonal clothing categories
    summerClothes: '☀️ 여름 옷',
    springClothes: '🌸 봄 옷',
    autumnClothes: '🍂 가을 옷',
    winterClothes: '❄️ 겨울 옷',
    rainClothes: '🌧️ 비 옷',
    
    // Map interface
    whereInSweden: '스웨덴 어디에 계신가요? 🇸🇪',
    youAreNear: '📍 가까운 곳',
    findStockholm: '큰 도시들은 재미있는 아이콘을 가지고 있습니다! 스톡홀름을 찾을 수 있나요? 🏦',
    swedenMap: '스웨덴 지도 🇸🇪',
    tapCityIcons: '도시 아이콘을 탭하여 더 자세히 알아보세요! 🏦🚢🌉',
    
    // Outfit reactions - perfect
    perfectReaction1: "완벽한 선택! 밖에서 편안할 거예요!",
    perfectReaction2: "이 날씨에 딱 맞는 옷차림이에요!",
    perfectReaction3: "오늘 날씨에 완벽하게 준비되었어요!",
    perfectReaction4: "정말 제가 선택했을 것 같아요!",
    
    // Outfit reactions - good
    goodReaction1: "좋은 선택이에요!",
    goodReaction2: "좋은 옷차림이에요!",
    goodReaction3: "그 옷을 입으면 편안할 거예요!",
    
    // Outfit reactions - warning
    warningReaction1: "흠, 그게 최고의 선택은 아닐 수도 있어요...",
    warningReaction2: "이 옷차림에 확신하시나요?",
    warningReaction3: "조금 불편할 수도 있어요...",
    
    // Outfit reactions - poor
    poorReaction1: "앗! 그 샌들로 비 오는 날이면 발이 젖을 수도 있어요!",
    poorReaction2: "으으! 재킷 없으면 추울 수도 있어요!",
    poorReaction3: "맑은 날에 그 겨울 코트를 입으면 너무 더울 수도 있어요!",
    poorReaction4: "그 반바지로는 충분히 따뜻하지 않을 수도 있어요!",
    
    // Specific feedback
    wetFeetFeedback: "아, 그 샌들로 비 오는 날이면 발이 젖을 수도 있어요!",
    coldSnowFeedback: "으으! 그 선택으로 눈 속에서 추울 수도 있어요!",
    hotCoatFeedback: "그렇게 더운 날에 그 겨울 코트를 입으면 너무 더울 수도 있어요!",
    
    // Error messages
    locationAccessDenied: "위치 접근이 거부되었습니다",
    weatherOutfitContextError: "useWeatherOutfit은 WeatherOutfitProvider 내에서 사용되어야 합니다",
    couldNotSaveCustomItem: "맞춤 옷을 저장할 수 없습니다",
    couldNotDeleteCustomItem: "맞춤 옷을 삭제할 수 없습니다",
    customItemNotFound: "맞춤 옷을 찾을 수 없습니다",
    couldNotClearCustomItems: "맞춤 옷을 지울 수 없습니다",
    
    // Weather conditions
    sunny: "맑음",
    cloudy: "흐림",
    rainy: "비",
    snowy: "눈",
    stormy: "폭풍",
    sunnySyno: "맑음",
    cloudySyno: "흐림",
    rainySyno: "비",
    snowySyno: "눈",
    stormySyno: "폭풍",
    niceWeather: "좋은 날씨",
    
    // Temperature
    temperature: "온도",
    feelsLike: "체감 온도",
    
    // Clothing items - Head
    cap: "모자",
    beanie: "비니",
    hood: "후드",
    
    // Clothing items - Torso
    tShirt: "티셔츠",
    longSleeve: "긴팔",
    sweater: "스웨터",
    jacket: "재킷",
    rainCoat: "우비",
    winterCoat: "겨울 코트",
    
    // Clothing items - Legs
    shorts: "반바지",
    pants: "바지",
    jeans: "청바지",
    warmPants: "따뜻한 바지",
    
    // Clothing items - Feet
    sandals: "샌들",
    sneakers: "운동화",
    shoes: "구두",
    rainBoots: "장화",
    winterBoots: "겨울 부츠",
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