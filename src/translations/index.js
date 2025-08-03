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