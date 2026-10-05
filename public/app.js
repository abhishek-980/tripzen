const DESTINATIONS = [
  {
    name: 'Chopta Tungnath',
    title: 'Chopta Tungnath & Chandrashila',
    state: 'Uttarakhand',
    image: './assets/chopta-tungnath-card.mp4',
    mediaType: 'video',
    rating: 4.9,
    description: 'Visit the highest Shiva temple in the world at Tungnath (12,073 ft) and hike to Chandrashila peak for a panoramic 360° Himalayan sunrise over Chaukhamba & Nanda Devi.',
  },
  {
    name: 'Madmaheshwar Ji',
    title: 'Madmaheshwar Ji (Second Kedar)',
    state: 'Uttarakhand',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    rating: 4.9,
    description: 'Mystical Panch Kedar pilgrimage trail through ancient oak forests of Kedarnath Sanctuary to the sacred alpine temple and Buda Madmaheshwar ridge.',
  },
  {
    name: 'Yulla Kanda',
    title: 'Yulla Kanda (Highest Krishna Temple)',
    state: 'Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    rating: 4.8,
    description: 'Trek to the highest sacred Krishna temple in the world situated in the center of an emerald alpine lake in the Kinnaur Himalayas.',
  },
  {
    name: 'Hampta Pass & Chandratal',
    title: 'Hampta Pass & Chandratal Crossover',
    state: 'Himachal Pradesh',
    image: './assets/hampta-card.mov',
    mediaType: 'video',
    rating: 4.9,
    description: 'Dramatic crossover trek from lush green Kullu pinewoods to the barren moonscapes of Spiti and sacred turquoise blue Chandratal Lake.',
  },
  {
    name: 'Valley of Flowers',
    title: 'Valley of Flowers & Hemkund Sahib',
    state: 'Uttarakhand',
    image: './assets/valley-of-flowers-card.mp4',
    mediaType: 'video',
    rating: 4.9,
    description: 'Monsoon floral wonderland featuring 500+ species of blooming Himalayan wildflowers, UNESCO heritage national park, and high glacial Hemkund lake.',
  },
  {
    name: 'Kareri Lake',
    title: 'Kareri Lake Glacial Trek',
    state: 'Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    rating: 4.8,
    description: 'High-altitude freshwater glacial lake surrounded by the majestic Dhauladhar wall with gushing streams, pine forests, and lakeside alpine camping.',
  },
  {
    name: 'Jibhi & Tirthan Valley',
    title: 'Jibhi, Jalori Pass & Serolsar Lake',
    state: 'Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    rating: 4.8,
    description: 'Enchanting pine forests, wooden cottages, cascading waterfalls, Jalori Pass crossing (10,800 ft), and the mystical sacred Serolsar Lake.',
  },
  {
    name: 'Rudranath & Kalpeshwar',
    title: 'Rudranath & Kalpeshwar Ji Sacred Trail',
    state: 'Uttarakhand',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    rating: 4.9,
    description: 'The most scenic Panch Kedar temple nestled in alpine bugyals (meadows) with unobstructed views of Trishul, Nanda Devi, and Chaukhamba peaks.',
  },
  {
    name: 'Kedarnath Dham',
    title: 'Kedarnath Dham Himalayan Yatra',
    state: 'Uttarakhand',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    rating: 4.9,
    description: 'Divine spiritual pilgrimage along the Mandakini river to the historic 8th-century Jyotirlinga temple standing before towering snow peaks.',
  },
  {
    name: 'Kedarkantha',
    title: 'Kedarkantha Winter Snow Summit',
    state: 'Uttarakhand',
    image: './assets/kedarkantha-card.mov',
    mediaType: 'video',
    rating: 4.9,
    description: 'The classic 12,500 ft winter summit trek featuring snow pine forests, Juda Ka Talab alpine camp, and a breathtaking 360° summit sunrise.',
  },
  {
    name: 'Triund & Dharamshala',
    title: 'Triund Ridge & Snowline Cafe',
    state: 'Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    rating: 4.8,
    description: 'Panoramic ridge trek overlooking the mighty snow-capped Dhauladhar wall, glittering Kangra valley sunset, and Tibetan culture in McLeod Ganj.',
  },
  {
    name: 'Nag Tibba',
    title: 'Nag Tibba Weekend Summit',
    state: 'Uttarakhand',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    rating: 4.7,
    description: 'The highest peak in the lower Himalayas of Garhwal (9,915 ft), perfect for beginner hikers seeking lush oak forests and Bandarpoonch views.',
  },
  {
    name: 'Annapurna Base Camp (ABC)',
    title: 'Annapurna Base Camp (ABC) Sanctuary',
    state: 'Nepal',
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    rating: 4.9,
    description: 'Trek deep into the high Annapurna Sanctuary amphitheater surrounded by 7,000m & 8,000m giants including Annapurna I and Machapuchare.',
  },
  {
    name: 'Everest Base Camp (EBC)',
    title: 'Everest Base Camp (EBC) Expedition',
    state: 'Nepal',
    image: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    rating: 5.0,
    description: 'The ultimate world-class bucket list Himalayan expedition to the base of Mount Everest (17,598 ft) via Namche Bazaar and Tengboche.',
  },
  {
    name: 'Kasol & Parvati Valley',
    title: 'Kasol & Kheerganga Springs',
    state: 'Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    rating: 4.8,
    description: 'Scenic trails through deep pine woods and waterfalls to natural sulfur hot springs and cozy riverside cafes in Parvati Valley.',
  },
];

const TRIP_PACKAGES = [
  {
    "id": "pkg-chopta-tungnath",
    "destination": "Chopta Tungnath",
    "company": "TripZen Himalayan Expeditions",
    "slug": "chopta-tungnath",
    "packageName": "Chopta Tungnath & Chandrashila Sunrise Summit",
    "duration": "3 Days / 2 Nights",
    "price": "INR 6,500",
    "originalPrice": "INR 8,500",
    "discount": "24% OFF",
    "priceValue": 6500,
    "rating": 4.9,
    "difficulty": "Easy to Moderate",
    "departure": "Delhi to Delhi",
    "facilityType": "Moderate",
    "month": "August - November (All Weekends)",
    "distance": "15 km Total Trek",
    "altitude": "13,100 ft (Chandrashila Peak)",
    "image": "./assets/chopta-tungnath-card.mp4",
    "badge": "🔥 Weekend Bestseller",
    "pdf": "/itineraries/chopta-tungnath.html",
    "dates": "Every Weekend (Fri-Mon)",
    "includes": [
      "Delhi/Rishikesh to Chopta return AC/comfortable mountain transport",
      "2 Nights accommodation in sanitized alpine Swiss tents with clean bedding",
      "All wholesome vegetarian meals (Breakfast, Lunch, Evening Snacks, Hot Dinner)",
      "Certified Wilderness First Responder (WFR) Trek Leader & local guides",
      "Forest entry permits, camping fees, and green trail charges",
      "Medical first aid kit, pulse oximeter, and emergency oxygen canister"
    ],
    "days": [
      {
        "day": 1,
        "title": "Delhi / Rishikesh to Sari Village & Hike to Deoriatal Lake",
        "altitude": "7,840 ft",
        "distance": "3 km trek",
        "details": "Early morning scenic drive through Devprayag (confluence of Alaknanda & Bhagirathi) and Rudraprayag to reach Sari Village. Begin an easy 3 km hike through lush rhododendron and oak trails to the holy Deoriatal Lake. Witness the majestic reflection of Mount Chaukhamba in the crystal-clear water during sunset. Overnight camping in high-altitude Swiss tents at Sari/Chopta.",
        "meals": "Lunch, Evening Snacks & Hot Dinner",
        "stay": "Alpine Camps at Sari / Chopta"
      },
      {
        "day": 2,
        "title": "Chopta to Tungnath Temple & Chandrashila Summit Push",
        "altitude": "13,100 ft",
        "distance": "10 km round trip",
        "details": "Wake up before dawn with a hot cup of Pahadi tea. Drive to Chopta base and start the stone-paved ascent to Tungnath (12,073 ft), the third Kedar. Offer prayers at the 1000-year-old architectural marvel. Continue the steep 1 km ridge climb to Chandrashila Peak (13,100 ft) just in time for sunrise. Marvel at the golden rays hitting Chaukhamba, Nanda Devi, and Dunagiri. Descend back to Chopta for campfire and celebration.",
        "meals": "Breakfast, Packed Energy Lunch, Evening Soup & Dinner",
        "stay": "Alpine Swiss Camps at Chopta"
      },
      {
        "day": 3,
        "title": "Chopta to Rishikesh / Delhi Departure",
        "altitude": "1,120 ft",
        "distance": "Drive 200 km / 420 km",
        "details": "Enjoy morning sunrise over Chopta meadows followed by a hearty breakfast. Pack bags and begin drive down to Rishikesh. Quick stop at Devprayag for photos and spiritual vibes. Arrive in Rishikesh by evening / Delhi by night with unforgettable Himalayan memories.",
        "meals": "Breakfast & En-route stops",
        "stay": "Return Transit"
      }
    ],
    "description": "Visit the highest Shiva temple in the world (12,073 ft) and summit Chandrashila peak at 13,100 ft for breathtaking views of Chaukhamba, Trishul, and Nanda Devi."
  },
  {
    "id": "pkg-madmaheshwar",
    "destination": "Madmaheshwar Ji",
    "company": "TripZen Sacred Trails",
    "slug": "madmaheshwar",
    "packageName": "Madmaheshwar Ji (Second Kedar) Sacred Trail",
    "duration": "3 Days / 2 Nights",
    "price": "INR 7,500",
    "originalPrice": "INR 9,999",
    "discount": "25% OFF",
    "priceValue": 7500,
    "rating": 4.9,
    "difficulty": "Moderate",
    "departure": "Delhi to Delhi",
    "facilityType": "Moderate",
    "month": "August - November",
    "distance": "32 km Total Trek",
    "altitude": "11,800 ft (Buda Madmaheshwar)",
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "badge": "🕉️ Sacred Kedar Trail",
    "pdf": "/itineraries/madmaheshwar.html",
    "dates": "Every Weekend Batch",
    "includes": [
      "Delhi/Rishikesh to Ransi and return mountain vehicle transport",
      "Homestay and alpine camp accommodation at Gaundhar & Madmaheshwar",
      "All nutritious Pahadi vegetarian meals & evening hot herbal tea",
      "Experienced Garhwali trek guide and temple coordinator",
      "Kedarnath Sanctuary permits & green trail maintenance fees",
      "First aid kit, oxygen oximeters, and emergency mountain support"
    ],
    "days": [
      {
        "day": 1,
        "title": "Rishikesh / Haridwar to Ransi Village & Trek to Gaundhar",
        "altitude": "6,200 ft",
        "distance": "6 km trek",
        "details": "Scenic morning drive via Ukhimath to Ransi, the starting village. Visit the historic Rakeshwari Devi Temple for blessings. Begin a gentle downstream and riverside trail along the roaring Madhyamaheshwar Ganga to reach Gaundhar / Bantoli. Fall asleep to the soothing sound of the river.",
        "meals": "Lunch, Evening Tea & Garhwali Dinner",
        "stay": "Homestay / Camps at Gaundhar"
      },
      {
        "day": 2,
        "title": "Gaundhar to Madmaheshwar Temple & Sunset at Buda Madmaheshwar",
        "altitude": "11,800 ft",
        "distance": "10 km trek",
        "details": "A steady and scenic uphill hike through dense oak, rhododendron, and bamboo forests passing Khatara and Nanu settlements. Reach the sacred Madmaheshwar temple valley by afternoon. After evening darshan and temple aarti, hike 1.5 km further up to Buda Madmaheshwar ridge for an otherworldly sunset over the Chaukhamba massifs.",
        "meals": "Breakfast, Trail Energy Pack, Hot Pahadi Dinner",
        "stay": "Temple Guesthouse / Dome Tents at Madmaheshwar"
      },
      {
        "day": 3,
        "title": "Madmaheshwar Darshan to Ransi & Return Journey to Rishikesh",
        "altitude": "1,120 ft",
        "distance": "16 km descent + Drive",
        "details": "Attend serene morning temple puja. Begin downhill trek back through Bantoli to Ransi village. Board vehicle for return drive through Rudraprayag and Devprayag to Rishikesh / Haridwar with refreshed mind and spirit.",
        "meals": "Breakfast & Trail Meals",
        "stay": "Return Transit"
      }
    ],
    "description": "Sacred Panch Kedar pilgrimage trail cutting through lush oak and rhododendron forests of Kedarnath Wildlife Sanctuary to the pristine Buda Madmaheshwar meadows."
  },
  {
    "id": "pkg-yulla-kanda",
    "destination": "Yulla Kanda",
    "company": "TripZen Alpine Adventures",
    "slug": "yulla-kanda",
    "packageName": "Yulla Kanda Alpine Lake & Krishna Temple Trek",
    "duration": "3 Days / 2 Nights",
    "price": "INR 7,000",
    "originalPrice": "INR 9,500",
    "discount": "26% OFF",
    "priceValue": 7000,
    "rating": 4.8,
    "difficulty": "Moderate",
    "departure": "Delhi to Delhi",
    "facilityType": "Moderate",
    "month": "September - October",
    "distance": "24 km Total Trek",
    "altitude": "12,778 ft (Yulla Kanda Lake)",
    "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    "badge": "✨ Sacred Alpine Lake",
    "pdf": "/itineraries/yulla-kanda.html",
    "dates": "2-4 Sep (Janmashtami Special) & Oct Batches",
    "includes": [
      "Delhi/Chandigarh to Kinnaur return comfortable travel",
      "All tent stays, sleeping bags, insulated mats at high camp & village homestay",
      "All 3 hot freshly cooked vegetarian meals + morning/evening tea",
      "Certified local Himachali mountain guide & support staff",
      "Local permits and village council trail conservation fees",
      "Oxygen cylinder, pulse oximeter, and comprehensive medical kit"
    ],
    "days": [
      {
        "day": 1,
        "title": "Delhi / Chandigarh to Yulla Khas Village (Kinnaur)",
        "altitude": "7,100 ft",
        "distance": "Drive through Hindustan-Tibet Highway",
        "details": "Scenic drive along the Sutlej river cutting through the dramatic rock-carved cliff roads of Kinnaur. Arrive at Yulla Khas, a serene Himachali village filled with traditional wood-and-stone houses and apple orchards. Acclimatization walk, briefing session, and hot dinner.",
        "meals": "Lunch on route & Hot Himachali Dinner",
        "stay": "Homestay in Yulla Khas"
      },
      {
        "day": 2,
        "title": "Trek from Yulla Khas to Yulla Kanda Holy Lake & Camp",
        "altitude": "12,778 ft",
        "distance": "12 km uphill hike",
        "details": "Begin early morning ascent through pine and birch forests opening up to lush alpine pastures (Thach). Arrive at the holy emerald Yulla Kanda lake. Cross the wooden bridge to the sacred Krishna temple in the center of the lake. Perform traditional puja and witness breathtaking views of the Raldang and Kinnaur Kailash peaks. Camp under a canopy of billion stars.",
        "meals": "Breakfast, Packed Lunch, Hot Soup & Camp Dinner",
        "stay": "Alpine Dome Tents at Yulla Kanda Lake"
      },
      {
        "day": 3,
        "title": "Yulla Kanda Descent to Yulla Khas & Return Drive",
        "altitude": "7,100 ft",
        "distance": "12 km descent + Drive",
        "details": "Enjoy morning golden light over the lake. Descend through the forested trails back to Yulla Khas village. Relish a celebratory local Kinnauri tea and begin journey back to Chandigarh / Delhi.",
        "meals": "Breakfast & Lunch",
        "stay": "Return Transit"
      }
    ],
    "description": "Trek to the highest sacred Krishna temple in the world (12,778 ft), situated in the middle of a holy alpine lake amidst the rugged beauty of Kinnaur."
  },
  {
    "id": "pkg-hampta-pass",
    "destination": "Hampta Pass & Chandratal",
    "company": "TripZen Alpine Adventures",
    "slug": "hampta-pass",
    "packageName": "Hampta Pass Crossover & Chandratal Moon Lake",
    "duration": "5 Days / 4 Nights",
    "price": "INR 6,000",
    "originalPrice": "INR 8,500",
    "discount": "29% OFF",
    "priceValue": 6000,
    "rating": 4.9,
    "difficulty": "Moderate",
    "departure": "Manali to Manali",
    "facilityType": "Moderate",
    "month": "September - October",
    "distance": "25 km Total Trek",
    "altitude": "14,100 ft (Hampta Pass Summit)",
    "image": "./assets/hampta-card.mov",
    "badge": "⭐ Top Rated Crossover",
    "pdf": "/itineraries/hampta-pass.html",
    "dates": "Sep - Oct Batches",
    "includes": [
      "Manali to Jobra and Chatru/Chandratal to Manali transport",
      "All 4 nights alpine tent accommodation on twin/triple sharing",
      "High quality sleeping bags rated to -10°C, insulated foam mats",
      "All nutritious vegetarian meals + hot soups and trail energy snacks",
      "Experienced Mountaineering Qualified (NIM/HMI) Trek Leader & local guides",
      "Chandratal eco-permits, forest camping fees, and green taxes",
      "Oxygen cylinder, medical stretchers, and pulse oximeters"
    ],
    "days": [
      {
        "day": 1,
        "title": "Manali to Jobra Drive & Trek to Chika Campsite",
        "altitude": "10,100 ft",
        "distance": "45 min drive + 3 km trek",
        "details": "Meet the Tripzen team in Manali. Drive through 42 hairpin bends up to Jobra. Cross the bridge over Rani Nallah and trek along birch, oak, and pine forests to the stunning riverside meadow campsite at Chika.",
        "meals": "Lunch, Hot Evening Snacks & Dinner",
        "stay": "Riverside Tents at Chika"
      },
      {
        "day": 2,
        "title": "Chika to Balu Ka Ghera (Valley of Flowers of Kullu)",
        "altitude": "11,900 ft",
        "distance": "6 km trek (4-5 hours)",
        "details": "A scenic gradual climb along the riverbed with colorful rhododendrons, alpine flowers, and towering snow-capped peaks. Reach Balu Ka Ghera, a vast sandy flat meadow nestled right below Hampta Pass.",
        "meals": "Breakfast, Packed Lunch, Hot Soup & Dinner",
        "stay": "Alpine Camps at Balu Ka Ghera"
      },
      {
        "day": 3,
        "title": "Balu Ka Ghera over Hampta Pass (14,100 ft) to Shea Goru",
        "altitude": "14,100 ft Pass Summit -> 12,900 ft Camp",
        "distance": "8 km trek (7-8 hours)",
        "details": "Summit day! An early 5:30 AM start ascending the rocky ridge and moraine to reach the windy saddle of Hampta Pass at 14,100 ft. Witness the breathtaking contrast between Kullu and Spiti. Descend cautiously over scree and snowfields to the oasis camp of Shea Goru.",
        "meals": "Breakfast, Energy Trail Pack, Hot Dinner",
        "stay": "Glacial Camps at Shea Goru"
      },
      {
        "day": 4,
        "title": "Shea Goru River Crossing to Chatru & Chandratal Lake Safari",
        "altitude": "14,100 ft (Chandratal Lake)",
        "distance": "5 km trek + 45 km Jeep Safari",
        "details": "Experience an exhilarating icy glacial river crossing at Shea Goru with team ropes. Trek down to Chatru roadhead. Board 4x4 rugged vehicles for a thrilling drive across Batal to the sacred crescent-shaped Chandratal (Moon Lake). Camp at Chatru / Chandratal.",
        "meals": "Breakfast, Lunch, Hot Campfire Dinner",
        "stay": "Campsite at Chatru / Chandratal"
      },
      {
        "day": 5,
        "title": "Chatru to Manali via Atal Tunnel",
        "altitude": "6,700 ft",
        "distance": "Drive 65 km (3-4 hours)",
        "details": "Drive back along the rugged Chandra river gorge, enter the engineering marvel Atal Tunnel, and arrive in lush Manali by 2:00 PM. Depart with memories of two different worlds!",
        "meals": "Breakfast & Farewell Mountain Lunch",
        "stay": "Trip concludes in Manali"
      }
    ],
    "description": "An exhilarating crossover trek from the lush green pinewoods of Kullu to the stark, barren desert of Spiti Valley and sacred turquoise Chandratal Lake."
  },
  {
    "id": "pkg-valley-of-flowers",
    "destination": "Valley of Flowers",
    "company": "TripZen Himalayan Expeditions",
    "slug": "valley-of-flowers",
    "packageName": "Valley of Flowers & Hemkund Sahib UNESCO Trek",
    "duration": "6 Days / 5 Nights",
    "price": "INR 9,000",
    "originalPrice": "INR 12,500",
    "discount": "28% OFF",
    "priceValue": 9000,
    "rating": 4.9,
    "difficulty": "Moderate",
    "departure": "Rishikesh to Rishikesh",
    "facilityType": "Moderate",
    "month": "September - October",
    "distance": "38 km Total Trek",
    "altitude": "14,107 ft (Hemkund Sahib)",
    "image": "./assets/valley-of-flowers-card.mp4",
    "badge": "🌺 UNESCO World Heritage",
    "pdf": "/itineraries/valley-of-flowers.html",
    "dates": "Sep - Oct Batches",
    "includes": [
      "Rishikesh to Govindghat return comfortable vehicle transport",
      "5 Nights hotel/guesthouse stay on triple/quad sharing",
      "All 3 wholesome vegetarian meals from Day 1 dinner to Day 6 breakfast",
      "UNESCO National Park entry fee, permits, and conservation taxes",
      "Experienced Himalayan Trek Leaders with botanical knowledge",
      "Medical first aid, oxygen cylinder, and oximeter monitoring"
    ],
    "days": [
      {
        "day": 1,
        "title": "Rishikesh to Govindghat / Joshimath",
        "altitude": "6,300 ft",
        "distance": "Drive 270 km (9-10 hours)",
        "details": "Scenic drive alongside the holy Ganga and Alaknanda rivers, passing the sacred Panch Prayags (Devprayag, Rudraprayag, Karnaprayag, Nandaprayag, Vishnuprayag). Arrive in Govindghat for evening briefing and rest.",
        "meals": "Lunch on route & Dinner in Govindghat",
        "stay": "Hotel / Guesthouse at Govindghat"
      },
      {
        "day": 2,
        "title": "Govindghat to Poolna Drive & Trek to Ghangaria Base",
        "altitude": "9,800 ft",
        "distance": "4 km drive + 9 km trek",
        "details": "Drive to Poolna village. Start the picturesque trek along the roaring Pushpawati and Lakshman Ganga rivers through dense oak and rhododendron canopies to reach the bustling hamlet of Ghangaria.",
        "meals": "Breakfast, Lunch, Evening Snacks & Dinner",
        "stay": "Guesthouse / Hotel in Ghangaria"
      },
      {
        "day": 3,
        "title": "Ghangaria to Valley of Flowers & Return",
        "altitude": "11,500 ft",
        "distance": "8 km round trip (6-7 hours)",
        "details": "Enter the official gates of the UNESCO National Park. Walk amidst vast carpets of colorful blossoms—Blue Poppies, Anemones, Geraniums, and Himalayan Bellflowers. Visit the memorial of British botanist Joan Margaret Legge. Return to Ghangaria by evening.",
        "meals": "Breakfast, Packed Lunch in the Valley, Dinner",
        "stay": "Ghangaria Hotel"
      },
      {
        "day": 4,
        "title": "Ghangaria to Sacred Hemkund Sahib Glacial Lake",
        "altitude": "14,107 ft",
        "distance": "12 km round trip (6-7 hours)",
        "details": "Steep zig-zag stone trail climbing to the highest Gurudwara in the world. Drink the sacred amrit jal from the glacial lake, spot the rare Brahma Kamal blooming on rocky slopes, and enjoy hot khichdi and piping tea at the langar. Descend back to Ghangaria.",
        "meals": "Breakfast, Langar Prasad Lunch, Dinner",
        "stay": "Ghangaria Hotel"
      },
      {
        "day": 5,
        "title": "Ghangaria to Govindghat & Drive to Badrinath / Mana Village",
        "altitude": "6,300 ft",
        "distance": "9 km trek + 25 km drive",
        "details": "Trek down to Poolna and drive to Govindghat. Take an optional excursion to the sacred Badrinath Temple and Mana (the Last Indian Village) to see the Saraswati River origin and Bhim Pul. Return to Joshimath.",
        "meals": "Breakfast, Lunch & Dinner",
        "stay": "Hotel in Joshimath / Govindghat"
      },
      {
        "day": 6,
        "title": "Joshimath / Govindghat to Rishikesh Departure",
        "altitude": "1,120 ft",
        "distance": "Drive 260 km",
        "details": "Morning breakfast and depart for Rishikesh. Arrive in Rishikesh by 6:00 PM with heart filled with floral bliss and spiritual serenity.",
        "meals": "Breakfast & En-route stops",
        "stay": "Return Transit"
      }
    ],
    "description": "Step into a fairy-tale valley of 500+ blooming wild alpine flower species, cascading waterfalls, and the sacred glacial waters of Hemkund Sahib (14,100 ft)."
  },
  {
    "id": "pkg-kareri-lake",
    "destination": "Kareri Lake",
    "company": "TripZen Mountain Co.",
    "slug": "kareri-lake",
    "packageName": "Kareri Lake Glacial Trek & Riverside Camp",
    "duration": "3 Days / 2 Nights",
    "price": "INR 7,000",
    "originalPrice": "INR 9,500",
    "discount": "26% OFF",
    "priceValue": 7000,
    "rating": 4.8,
    "difficulty": "Easy to Moderate",
    "departure": "Delhi to Delhi",
    "facilityType": "Moderate",
    "month": "September - October",
    "distance": "20 km Total Trek",
    "altitude": "9,626 ft (Kareri Lake)",
    "image": "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80",
    "badge": "🏔️ Glacial Lake Camp",
    "pdf": "/itineraries/kareri-lake.html",
    "dates": "Every Weekend (Sep-Oct)",
    "includes": [
      "Delhi to Dharamshala and base village transfers",
      "2 Nights high altitude camping with warm sleeping bags & mats",
      "All delicious hot vegetarian meals + evening campfire tea & snacks",
      "Certified local Gaddi guides with deep knowledge of terrain",
      "Camping permits and forest entry fees",
      "Comprehensive first aid kit and oximeter"
    ],
    "days": [
      {
        "day": 1,
        "title": "Delhi to Dharamshala & Drive to Kareri Village Base",
        "altitude": "6,200 ft",
        "distance": "Drive + 2 km gentle walk",
        "details": "Arrive in Dharamshala in the morning. Transfer to Kareri Village via Ghera. Stroll through the terraced wheat and barley fields, meet the local Gaddi shepherds, and acclimatize in a cozy village camp.",
        "meals": "Lunch, Evening Snacks & Campfire Dinner",
        "stay": "Village Camp at Kareri"
      },
      {
        "day": 2,
        "title": "Kareri Village to Kareri Lake via Nyund Stream",
        "altitude": "9,626 ft",
        "distance": "10 km trek (5-6 hours)",
        "details": "Trek along the Nyund Nallah stream with soothing water sounds all along the way. Climb stone stairs through dense oak forests opening onto the lake basin. Visit the Lord Shiva shrine atop the ridge overlooking the lake. Enjoy bonfire and stargazing.",
        "meals": "Breakfast, Trail Lunch, Hot Soup & Mountain Dinner",
        "stay": "Lakeside Dome Tents at Kareri Lake"
      },
      {
        "day": 3,
        "title": "Kareri Lake to Kareri Village & Departure to Delhi",
        "altitude": "6,200 ft",
        "distance": "10 km descent + Return Drive",
        "details": "Wake up to the golden reflections of the Dhauladhar peaks on the lake surface. Descend back along the stream to Kareri Village. Board vehicle to Dharamshala / Delhi with rejuvenated energy.",
        "meals": "Breakfast & Trail Snacks",
        "stay": "Return Transit"
      }
    ],
    "description": "Hike through dense pine forests and boulders alongside gushing mountain streams to camp at the crystal clear glacial waters of Kareri Lake beneath the Dhauladhars."
  },
  {
    "id": "pkg-jibhi-tirthan",
    "destination": "Jibhi & Tirthan Valley",
    "company": "TripZen Escapes",
    "slug": "jibhi-tirthan",
    "packageName": "Jibhi, Jalori Pass & Serolsar Lake Forest Retreat",
    "duration": "3 Days / 2 Nights",
    "price": "INR 7,000",
    "originalPrice": "INR 9,200",
    "discount": "24% OFF",
    "priceValue": 7000,
    "rating": 4.8,
    "difficulty": "Easy",
    "departure": "Delhi to Delhi",
    "facilityType": "Moderate",
    "month": "September - October",
    "distance": "12 km Total Sightseeing",
    "altitude": "10,800 ft (Jalori Pass)",
    "image": "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
    "badge": "🌲 Waterfall & Cafe Trail",
    "pdf": "/itineraries/jibhi-tirthan.html",
    "dates": "1-3 Oct & Weekend Batches",
    "includes": [
      "Delhi to Jibhi and return comfortable AC Semi-Sleeper transfers",
      "2 Nights stay in premium riverside wooden cottages / Swiss camps",
      "Buffet breakfast and dinner + evening bonfire & music",
      "Excursion to Jalori Pass, Serolsar Lake, Jibhi Waterfall, and Chehni Kothi",
      "Experienced Tripzen trip leader and local storyteller",
      "All toll taxes, parking fees, and driver allowances"
    ],
    "days": [
      {
        "day": 1,
        "title": "Delhi to Jibhi & Hidden Waterfall Exploration",
        "altitude": "5,300 ft",
        "distance": "Drive + 2 km walk",
        "details": "Board overnight AC semi-sleeper bus from Delhi. Arrive in Jibhi in the morning and check in to cozy riverside wooden cottages. In the afternoon, walk to the famous Jibhi Waterfall through charming wooden bridges. Spend the evening cafe hopping with acoustic music.",
        "meals": "Breakfast, Lunch, Evening Tea & Bonfire Dinner",
        "stay": "Riverside Wooden Cottage in Jibhi"
      },
      {
        "day": 2,
        "title": "Jalori Pass (10,800 ft) & Hike to Sacred Serolsar Lake",
        "altitude": "10,800 ft",
        "distance": "10 km round trip forest walk",
        "details": "Scenic drive to Jalori Pass with 360-degree views of the Great Himalayan National Park. Begin an easy 5 km hike through dense oak forests to the holy Serolsar Lake. Visit the temple of Budhi Nagin, the mother goddess of the lake. Evening campfire with local music.",
        "meals": "Breakfast, Trail Picnic Lunch & Himachali Dinner",
        "stay": "Wooden Cottage / Swiss Camp in Jibhi"
      },
      {
        "day": 3,
        "title": "Chehni Kothi Heritage Walk & Departure to Delhi",
        "altitude": "5,300 ft",
        "distance": "3 km village walk + Return Drive",
        "details": "Visit the 1500-year-old Chehni Kothi, the tallest indigenous stone-and-timber tower in the Western Himalayas. Enjoy a farewell trout/vegetarian lunch by the Tirthan river before boarding the return coach to Delhi.",
        "meals": "Breakfast & Lunch",
        "stay": "Return Transit"
      }
    ],
    "description": "Relax in scenic wooden cottages in Jibhi, trek to the sacred Serolsar Lake through dense oak forests, and soak in panoramic Himalayan views at Jalori Pass."
  },
  {
    "id": "pkg-rudranath-kalpeshwar",
    "destination": "Rudranath & Kalpeshwar",
    "company": "TripZen Sacred Trails",
    "slug": "rudranath-kalpeshwar",
    "packageName": "Rudranath & Kalpeshwar Ji Sacred Kedar Trail",
    "duration": "5 Days / 4 Nights",
    "price": "INR 11,000",
    "originalPrice": "INR 14,999",
    "discount": "27% OFF",
    "priceValue": 11000,
    "rating": 4.9,
    "difficulty": "Moderate to Challenging",
    "departure": "Delhi to Delhi",
    "facilityType": "Moderate",
    "month": "September - October",
    "distance": "42 km Total Trek",
    "altitude": "11,800 ft (Rudranath Shrine)",
    "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    "badge": "🔱 Panch Kedar Special",
    "pdf": "/itineraries/rudranath-kalpeshwar.html",
    "dates": "1-5 Oct & Sep-Oct Batches",
    "includes": [
      "Rishikesh to Sagar village and Urgam to Rishikesh transport",
      "4 Nights accommodation in meadow alpine camps and village homestays",
      "All freshly cooked pure vegetarian meals, morning/evening tea & energy snacks",
      "Experienced Garhwali trek leader and local spiritual guide",
      "Forest entry permits, meadow camping fees, and green eco-cess",
      "First aid kit, pulse oximeter, and emergency mountain support"
    ],
    "days": [
      {
        "day": 1,
        "title": "Rishikesh to Sagar Village Base",
        "altitude": "6,600 ft",
        "distance": "Drive 215 km (8 hours)",
        "details": "Drive along the Alaknanda valley via Devprayag and Karnaprayag to Sagar Village near Gopeshwar. Orientation walk, briefing session, and hot Garhwali dinner.",
        "meals": "Lunch on route & Dinner in Sagar",
        "stay": "Homestay in Sagar Village"
      },
      {
        "day": 2,
        "title": "Sagar Village to Panar Bugyal via Lyti Bugyal",
        "altitude": "10,800 ft",
        "distance": "12 km steep trek (6-7 hours)",
        "details": "Ascend through dense oak, pine, and rhododendron forests to Pun Bugyal and Lyti Bugyal. Climb the switchbacks to reach the breathtaking high-altitude meadows of Panar Bugyal. Witness Trishul and Nanda Devi glowing in the sunset.",
        "meals": "Breakfast, Packed Lunch, Hot Soup & Camp Dinner",
        "stay": "Alpine Dome Tents at Panar Bugyal"
      },
      {
        "day": 3,
        "title": "Panar Bugyal across Pitradhar to Rudranath Temple",
        "altitude": "11,800 ft",
        "distance": "8 km trek (4-5 hours)",
        "details": "Trek through endless ridge meadows to Pitradhar (12,500 ft). Offer prayers and descend into the mystical Rudranath valley. Attend the deeply moving evening aarti of Lord Shiva’s serene face (Nilkanth Mahadev) inside the natural rock sanctum.",
        "meals": "Breakfast, Hot Lunch, Evening Tea & Prasad Dinner",
        "stay": "Temple Guesthouse / Tents at Rudranath"
      },
      {
        "day": 4,
        "title": "Rudranath to Helang / Urgam Valley & Kalpeshwar Ji Darshan",
        "altitude": "7,200 ft",
        "distance": "14 km descent + 20 km drive",
        "details": "Attend morning Rudrabhishek. Descend through the forested Dumak / Urgam trail. Reach Urgam Valley and walk to the ancient rock cave of Kalpeshwar Temple (5th Kedar) surrounded by Kalpvriksha wish-fulfilling tree.",
        "meals": "Breakfast, Trail Lunch & Dinner",
        "stay": "Homestay in Urgam Valley"
      },
      {
        "day": 5,
        "title": "Urgam Valley to Rishikesh / Delhi Departure",
        "altitude": "1,120 ft",
        "distance": "Drive 230 km",
        "details": "Drive back along the sacred Alaknanda river to Rishikesh. Arrive in Rishikesh by 5:00 PM with completed Panch Kedar blessings.",
        "meals": "Breakfast & En-route lunch",
        "stay": "Return Transit"
      }
    ],
    "description": "The most magnificent Panch Kedar trek passing through endless emerald bugyals with unmatched views of Trishul, Nanda Devi, and Chaukhamba."
  },
  {
    "id": "pkg-churdhar",
    "destination": "Churdhar Peak",
    "company": "TripZen Mountain Co.",
    "slug": "churdhar",
    "packageName": "Churdhar Peak (Highest Peak of Outer Himalayas)",
    "duration": "3 Days / 2 Nights",
    "price": "INR 6,500",
    "originalPrice": "INR 8,500",
    "discount": "24% OFF",
    "priceValue": 6500,
    "rating": 4.8,
    "difficulty": "Moderate",
    "departure": "Delhi to Delhi",
    "facilityType": "Moderate",
    "month": "September - October",
    "distance": "36 km Total Trek",
    "altitude": "11,965 ft (Churdhar Summit)",
    "image": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    "badge": "⚡ Weekend Special",
    "pdf": "/itineraries/churdhar.html",
    "dates": "1-3 Oct & All Weekends",
    "includes": [
      "Delhi/Chandigarh to Nohradhar return comfortable transport",
      "2 Nights camping accommodation with sleeping bags & foam mats",
      "All 3 hot freshly cooked vegetarian meals + tea & evening snacks",
      "Certified trek leader and local mountain guide",
      "Sanctuary entry permits and local camping fees",
      "First aid kit, oxygen cylinder, and emergency support"
    ],
    "days": [
      {
        "day": 1,
        "title": "Delhi / Chandigarh to Nohradhar Base & Acclimatization",
        "altitude": "6,800 ft",
        "distance": "Drive + 2 km walk",
        "details": "Scenic drive through Solan and Rajgarh apple orchards to Nohradhar village. Check into base camp, evening acclimatization walk, route briefing, and dinner.",
        "meals": "Lunch on route & Hot Dinner",
        "stay": "Base Camp in Nohradhar"
      },
      {
        "day": 2,
        "title": "Nohradhar to Churdhar Summit Push & Ridge Camp",
        "altitude": "11,965 ft",
        "distance": "18 km trek (7-8 hours)",
        "details": "Begin early hike through Jam Nallah and dense deodar forests to reach Teesri ridge. Push forward along the wind-swept boulders to the Shirgul Maharaj Temple and the giant Shiva statue on the summit (11,965 ft). Marvel at the 360-degree vista stretching from the Gangetic plains to Badrinath and Kedarnath peaks. Camp at the sacred ridge.",
        "meals": "Breakfast, Packed Lunch, Hot Tea & Campfire Dinner",
        "stay": "Alpine Dome Tents at Teesri / Churdhar Ridge"
      },
      {
        "day": 3,
        "title": "Churdhar Descent to Nohradhar & Return Journey",
        "altitude": "6,800 ft",
        "distance": "16 km descent + Return Drive",
        "details": "Enjoy magical sunrise above the sea of clouds. Descend through the whispering pine trails back to Nohradhar. Board vehicle for return journey to Chandigarh / Delhi.",
        "meals": "Breakfast & Farewell Lunch",
        "stay": "Return Transit"
      }
    ],
    "description": "Summit the highest peak in the Shivalik range (11,965 ft) offering expansive views of the Sutlej river valley and snow-clad Himalayan peaks."
  },
  {
    "id": "pkg-kedarnath-dham",
    "destination": "Kedarnath Dham",
    "company": "TripZen Sacred Trails",
    "slug": "kedarnath-dham",
    "packageName": "Kedarnath Dham Himalayan Pilgrimage Trek",
    "duration": "4 Days / 3 Nights",
    "price": "INR 10,000",
    "originalPrice": "INR 13,500",
    "discount": "26% OFF",
    "priceValue": 10000,
    "rating": 4.9,
    "difficulty": "Easy to Moderate",
    "departure": "Delhi to Delhi",
    "facilityType": "Moderate",
    "month": "September - October",
    "distance": "32 km Total Trek",
    "altitude": "11,755 ft (Kedarnath Temple)",
    "image": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    "badge": "🔱 Divine Himalayan Yatra",
    "pdf": "/itineraries/kedarnath-dham.html",
    "dates": "1-4 Oct & Sep-Oct Batches",
    "includes": [
      "Delhi/Haridwar to Sonprayag return comfortable transport",
      "3 Nights hotel accommodation (2 nights Guptkashi + 1 night Kedarnath top)",
      "Wholesome pure vegetarian breakfast and dinner",
      "Yatra registration assistance and trek coordination support",
      "Experienced trip leader to guide through temple rituals",
      "Emergency first aid and oxygen monitoring"
    ],
    "days": [
      {
        "day": 1,
        "title": "Haridwar / Rishikesh to Guptkashi / Sonprayag",
        "altitude": "4,300 ft",
        "distance": "Drive 210 km (7-8 hours)",
        "details": "Scenic drive along the Mandakini and Alaknanda rivers via Devprayag and Rudraprayag. Arrive in Guptkashi. Visit the ancient Kashi Vishwanath and Ardhanareshwar temple. Yatra registration check and dinner.",
        "meals": "Lunch on route & Dinner in Guptkashi",
        "stay": "Hotel in Guptkashi / Sonprayag"
      },
      {
        "day": 2,
        "title": "Sonprayag to Gaurikund & Trek to Kedarnath Dham",
        "altitude": "11,755 ft",
        "distance": "16 km trek (6-8 hours)",
        "details": "Early morning taxi to Gaurikund. Begin the sacred ascent along the paved trail passing Jungle Chatti, Bheembali, and Lincholi. Reach Kedarnath base by afternoon. Check in to top guesthouse. Attend the surreal evening Sandhya Aarti of Lord Kedarnath.",
        "meals": "Breakfast, Trail Refreshments & Hot Satvik Dinner",
        "stay": "Top Guesthouse / Hotel at Kedarnath"
      },
      {
        "day": 3,
        "title": "Kedarnath Morning Darshan, Bhairavnath & Descent to Sonprayag",
        "altitude": "11,755 ft -> 5,500 ft",
        "distance": "16 km descent + Local Hike",
        "details": "Early morning Abhishek and temple darshan. Short uphill hike to Bhairavnath Temple for panoramic view of the entire temple town and glacier. Descend back to Gaurikund and transfer to Guptkashi.",
        "meals": "Breakfast & Hot Dinner in Guptkashi",
        "stay": "Hotel in Guptkashi / Sonprayag"
      },
      {
        "day": 4,
        "title": "Guptkashi to Rishikesh / Haridwar Departure",
        "altitude": "1,120 ft",
        "distance": "Drive 210 km",
        "details": "Enjoy morning breakfast in the quiet hills. Drive back via Rishikesh and drop at Haridwar / Rishikesh Railway Station or Delhi.",
        "meals": "Breakfast & En-route lunch",
        "stay": "Return Transit"
      }
    ],
    "description": "Experience the spiritual aura of Kedarnath Temple situated in the Mandakini valley at 11,755 ft, flanked by the grand snow-covered Kedarnath peak."
  },
  {
    "id": "pkg-nag-tibba",
    "destination": "Nag Tibba",
    "company": "TripZen Alpine Adventures",
    "slug": "nag-tibba",
    "packageName": "Nag Tibba (Serpent Peak) Weekend Summit",
    "duration": "3 Days / 2 Nights",
    "price": "INR 5,000",
    "originalPrice": "INR 6,999",
    "discount": "28% OFF",
    "priceValue": 5000,
    "rating": 4.7,
    "difficulty": "Easy",
    "departure": "Delhi to Delhi",
    "facilityType": "Moderate",
    "month": "September - October (All Weekends)",
    "distance": "16 km Total Trek",
    "altitude": "9,915 ft (Nag Tibba Summit)",
    "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    "badge": "🎒 Beginner Favourite",
    "pdf": "/itineraries/nag-tibba.html",
    "dates": "Every Weekend",
    "includes": [
      "Delhi/Dehradun to Pantwari return comfortable transit",
      "2 Nights high altitude camping with sleeping bags and mats",
      "All 3 hot nutritious meals + tea and evening snacks",
      "Certified mountaineering trek leader and guide",
      "Forest permits and camping charges",
      "First aid medical kit and oximeter"
    ],
    "days": [
      {
        "day": 1,
        "title": "Delhi / Dehradun to Pantwari & Trek to Camp 1",
        "altitude": "7,600 ft",
        "distance": "Drive + 4.5 km trek",
        "details": "Scenic morning drive via Mussoorie and Kempty Falls to Pantwari village. Begin gradual trek through rocky trails and goat pastures to reach Camp 1. Unwind with tea, sunset views over the valley, and a campfire.",
        "meals": "Lunch at base, Evening Tea & Hot Dinner",
        "stay": "Alpine Dome Tents at Nag Tibba Camp"
      },
      {
        "day": 2,
        "title": "Camp 1 to Nag Devta Temple, Summit Push (9,915 ft) & Sunset",
        "altitude": "9,915 ft",
        "distance": "8 km round trip (5-6 hours)",
        "details": "Early morning hike through dense oak and rhododendron forest to the ancient Nag Devta Temple. Push onward to the Nag Tibba Summit (9,915 ft). Marvel at the dramatic snow wall of Bandarpoonch and Gangotri. Return to camp for evening festivities.",
        "meals": "Breakfast, Packed Lunch, Hot Soup & Campfire Dinner",
        "stay": "Alpine Camps at Nag Tibba"
      },
      {
        "day": 3,
        "title": "Camp 1 to Pantwari & Return Drive to Dehradun / Delhi",
        "altitude": "4,640 ft",
        "distance": "4.5 km descent + Return Drive",
        "details": "Enjoy morning sunrise over the ridges. Descend back to Pantwari village. Board vehicle for return drive through Dehradun to Delhi.",
        "meals": "Breakfast & Farewell Lunch",
        "stay": "Return Transit"
      }
    ],
    "description": "The perfect weekend getaway trek for beginners and busy professionals offering panoramic views of Bandarpoonch, Gangotri, and Kedarnath peaks."
  },
  {
    "id": "pkg-annapurna-abc",
    "destination": "Annapurna Base Camp (ABC)",
    "company": "TripZen High Altitude Expeditions",
    "slug": "annapurna-abc",
    "packageName": "Annapurna Base Camp (ABC) Sanctuary Trek",
    "duration": "10 Days / 9 Nights",
    "price": "INR 35,000",
    "originalPrice": "INR 45,000",
    "discount": "22% OFF",
    "priceValue": 35000,
    "rating": 4.9,
    "difficulty": "Challenging",
    "departure": "Kathmandu to Kathmandu",
    "facilityType": "Premium",
    "month": "October - November",
    "distance": "67 km Total Trek",
    "altitude": "13,550 ft (Annapurna Base Camp)",
    "image": "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=80",
    "badge": "🏔️ Nepal Himalayan Marvel",
    "pdf": "/itineraries/annapurna-abc.html",
    "dates": "24 Oct – 2 Nov & 21-30 Nov",
    "includes": [
      "ACAP (Annapurna Conservation Area Permit) & TIMS trekking permits",
      "All 9 nights accommodation (Hotels in Pokhara & certified Tea Houses on trek)",
      "All 3 meals daily throughout the trekking days",
      "Government licensed experienced Sherpa Trek Leader & porters (1:2 ratio)",
      "Kathmandu to Pokhara return transit",
      "Comprehensive high-altitude first aid, pulse oximeter, and oxygen backup"
    ],
    "days": [
      {
        "day": 1,
        "title": "Kathmandu to Pokhara Scenic Transit",
        "altitude": "2,700 ft",
        "distance": "Scenic tourist coach / flight",
        "details": "Arrive in Pokhara, the lakeside adventure capital of Nepal. Walk along Phewa Lake, check equipment, meet Sherpa guides, and prepare TIMS & ACAP permits.",
        "meals": "Dinner in Pokhara",
        "stay": "Hotel in Pokhara"
      },
      {
        "day": 2,
        "title": "Pokhara to Nayapul Drive & Trek to Ghandruk / Ulleri",
        "altitude": "6,360 ft",
        "distance": "Drive + 5-6 hours trek",
        "details": "Drive to Nayapul and start trek through charming Gurung villages and terraced rice paddies to Ghandruk / Ulleri with views of Machapuchare.",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Tea House Lodge"
      },
      {
        "day": 3,
        "title": "Trek to Chhomrong (Gateway to the Sanctuary)",
        "altitude": "7,120 ft",
        "distance": "5-6 hours trek",
        "details": "Hike through oak and rhododendron forests, descending to the Chhomrong Khola and ascending to the magnificent amphitheater village of Chhomrong.",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Tea House Lodge in Chhomrong"
      },
      {
        "day": 4,
        "title": "Chhomrong to Bamboo / Dovan",
        "altitude": "8,200 ft",
        "distance": "5-6 hours trek",
        "details": "Trail drops through stone steps into a bamboo and fern canyon alongside the Modi Khola river.",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Tea House Lodge in Dovan"
      },
      {
        "day": 5,
        "title": "Dovan to Deurali & Machapuchare Base Camp (MBC)",
        "altitude": "12,139 ft",
        "distance": "6 hours trek",
        "details": "Ascend past Hinku cave into the alpine valley between Machapuchare and Hiunchuli to arrive at MBC (12,139 ft).",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Tea House Lodge at MBC"
      },
      {
        "day": 6,
        "title": "MBC to Annapurna Base Camp (13,550 ft) Sunrise Push",
        "altitude": "13,550 ft",
        "distance": "3 hours trek",
        "details": "Trek into the sanctuary basin to reach ABC at 13,550 ft. Marvel at the 360-degree wall of Annapurna I, Annapurna South, Tent Peak, and Gangapurna.",
        "meals": "Breakfast, Lunch, Hot Camp Dinner",
        "stay": "Tea House Lodge at ABC"
      },
      {
        "day": 7,
        "title": "ABC Sunrise over Annapurna Massif & Trek down to Bamboo",
        "altitude": "7,500 ft",
        "distance": "6-7 hours descent",
        "details": "Witness golden sunrise over Annapurna I. Descend back through MBC and Deurali to Bamboo.",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Tea House Lodge in Bamboo"
      },
      {
        "day": 8,
        "title": "Bamboo to Jhinu Danda & Natural Hot Springs",
        "altitude": "5,800 ft",
        "distance": "5 hours trek",
        "details": "Trek to Jhinu Danda. Relax and soak tired muscles in the natural thermal hot springs beside the Modi Khola river.",
        "meals": "Breakfast, Lunch, Celebration Dinner",
        "stay": "Tea House Lodge in Jhinu Danda"
      },
      {
        "day": 9,
        "title": "Jhinu Danda to Siwai & Drive to Pokhara",
        "altitude": "2,700 ft",
        "distance": "3 hours walk + 2 hours drive",
        "details": "Walk across the iconic long suspension bridges to Siwai. Drive back to Pokhara for celebratory dinner.",
        "meals": "Breakfast, Lunch & Dinner",
        "stay": "Hotel in Pokhara"
      },
      {
        "day": 10,
        "title": "Pokhara to Kathmandu Return Transit",
        "altitude": "4,600 ft",
        "distance": "Transit to Kathmandu",
        "details": "Scenic return coach to Kathmandu. Expedition concludes with incredible memories!",
        "meals": "Breakfast",
        "stay": "Trip concludes in Kathmandu"
      }
    ],
    "description": "A world-renowned trek leading directly into the heart of the Annapurna massif at 13,550 ft, surrounded by towering 8,000m peaks."
  },
  {
    "id": "pkg-everest-ebc",
    "destination": "Everest Base Camp (EBC)",
    "company": "TripZen High Altitude Expeditions",
    "slug": "everest-ebc",
    "packageName": "Everest Base Camp (EBC) High Altitude Expedition",
    "duration": "14 Days / 13 Nights",
    "price": "INR 75,000",
    "originalPrice": "INR 95,000",
    "discount": "21% OFF",
    "priceValue": 75000,
    "rating": 5,
    "difficulty": "Challenging",
    "departure": "Kathmandu to Kathmandu",
    "facilityType": "Premium",
    "month": "November",
    "distance": "130 km Total Trek",
    "altitude": "18,519 ft (Kala Patthar Summit)",
    "image": "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=1200&q=80",
    "badge": "👑 Ultimate World Summit",
    "pdf": "/itineraries/everest-ebc.html",
    "dates": "6 November – 20 November",
    "includes": [
      "Return Kathmandu-Lukla-Kathmandu mountain flights & airport transfers",
      "Sagarmatha National Park Entry Permit & Khumbu Pasang Lhamu Rural Municipality Permit",
      "All 13 nights accommodation (Hotels in Kathmandu & certified high-altitude Tea Houses)",
      "All 3 hot meals daily throughout the trekking days + hot morning tea",
      "Highly experienced certified high-altitude Sherpa Guide & Porters (1:2 ratio)",
      "Hyperbaric chamber / Gamow bag access, emergency satellite phone, and oxygen cylinder backup"
    ],
    "days": [
      {
        "day": 1,
        "title": "Kathmandu to Lukla Flight (9,383 ft) & Trek to Phakding",
        "altitude": "8,562 ft",
        "distance": "35 min flight + 8 km trek",
        "details": "Thrilling mountain flight into Tenzing-Hillary Airport in Lukla. Trek alongside the Dudh Kosi river to Phakding.",
        "meals": "Lunch & Dinner",
        "stay": "Tea House in Phakding"
      },
      {
        "day": 2,
        "title": "Phakding across Hillary Suspension Bridge to Namche Bazaar",
        "altitude": "11,286 ft",
        "distance": "11 km trek (6 hours)",
        "details": "Enter Sagarmatha National Park at Monjo. Cross the high Hillary Suspension Bridge and climb the Namche hill for your first glimpse of Mount Everest.",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Lodge in Namche Bazaar"
      },
      {
        "day": 3,
        "title": "Namche Bazaar Acclimatization & Everest View Hotel",
        "altitude": "12,730 ft",
        "distance": "Acclimatization hike",
        "details": "Hike to the Everest View Hotel for magnificent views of Everest, Lhotse, and Ama Dablam. Explore Namche Sherpa museum and bakery.",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Lodge in Namche Bazaar"
      },
      {
        "day": 4,
        "title": "Namche Bazaar to Tengboche Monastery",
        "altitude": "12,694 ft",
        "distance": "10 km trek (5-6 hours)",
        "details": "Trek along rhododendron ridges with Ama Dablam towering above. Climb to Tengboche to witness the famous Buddhist monastery and monks’ chanting.",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Tea House in Tengboche"
      },
      {
        "day": 5,
        "title": "Tengboche to Dingboche (Above Tree Line)",
        "altitude": "14,468 ft",
        "distance": "11 km trek (5-6 hours)",
        "details": "Cross the Imja Khola and enter the high alpine tundra surrounded by stone-walled barley fields in Dingboche.",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Tea House in Dingboche"
      },
      {
        "day": 6,
        "title": "Dingboche Acclimatization & Nagarjun Hill Hike",
        "altitude": "16,732 ft",
        "distance": "Acclimatization push",
        "details": "Climb Nagarjun Hill (5,100 m) for stunning vistas of Makalu, Lhotse, and Island Peak. Rest and hydrate.",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Tea House in Dingboche"
      },
      {
        "day": 7,
        "title": "Dingboche to Lobuche via Thokla Pass Memorials",
        "altitude": "16,207 ft",
        "distance": "8 km trek (5 hours)",
        "details": "Climb the steep Thokla Pass passing the poignant stone memorials of fallen Everest climbers to reach Lobuche.",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Tea House in Lobuche"
      },
      {
        "day": 8,
        "title": "Lobuche to Gorak Shep & Everest Base Camp (17,598 ft)",
        "altitude": "17,598 ft (EBC)",
        "distance": "12 km trek (7-8 hours)",
        "details": "Trek across Khumbu Glacier moraine to Gorak Shep. Push onward to the historic Everest Base Camp! Stand beside the iconic painted rock and Khumbu icefall. Return to Gorak Shep.",
        "meals": "Breakfast, Lunch, Celebratory Dinner",
        "stay": "Tea House in Gorak Shep"
      },
      {
        "day": 9,
        "title": "Kala Patthar Summit Sunrise (18,519 ft) & Descent to Pheriche",
        "altitude": "18,519 ft -> 14,340 ft",
        "distance": "14 km trek (7 hours)",
        "details": "Early 4:00 AM push to Kala Patthar summit for the most iconic sunrise view of Mount Everest in the world. Descend to Pheriche.",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Tea House in Pheriche"
      },
      {
        "day": 10,
        "title": "Pheriche to Namche Bazaar",
        "altitude": "11,286 ft",
        "distance": "15 km descent",
        "details": "Descend through Pangboche and Tengboche back to the rich oxygen and cozy bakeries of Namche Bazaar.",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Lodge in Namche"
      },
      {
        "day": 11,
        "title": "Namche Bazaar to Lukla",
        "altitude": "9,383 ft",
        "distance": "19 km trek (7 hours)",
        "details": "Cross the suspension bridges one last time and celebrate the successful expedition with the Sherpa crew in Lukla.",
        "meals": "Breakfast, Lunch, Farewell Sherpa Party Dinner",
        "stay": "Lodge in Lukla"
      },
      {
        "day": 12,
        "title": "Lukla to Kathmandu Flight",
        "altitude": "4,600 ft",
        "distance": "Morning flight",
        "details": "Early morning flight back to Kathmandu. Transfer to hotel for a hot shower and well-deserved rest.",
        "meals": "Breakfast & Celebration Dinner",
        "stay": "Hotel in Kathmandu"
      },
      {
        "day": 13,
        "title": "Kathmandu Buffer / Sightseeing Day",
        "altitude": "4,600 ft",
        "distance": "Buffer day for mountain flight weather",
        "details": "Explore UNESCO World Heritage sites: Pashupatinath, Boudhanath Stupa, and Thamel shopping.",
        "meals": "Breakfast",
        "stay": "Hotel in Kathmandu"
      },
      {
        "day": 14,
        "title": "Final Departure from Kathmandu",
        "altitude": "4,600 ft",
        "distance": "Airport transfer",
        "details": "Airport drop for your flight back home carrying memories of standing on the roof of the world.",
        "meals": "Breakfast",
        "stay": "Expedition Concludes"
      }
    ],
    "description": "Stand at the base of the highest mountain on Earth (17,598 ft) and witness unforgettable sunrises over Everest, Lhotse, and Nuptse."
  },
  {
    "id": "pkg-kedarkantha-summit",
    "destination": "Kedarkantha",
    "company": "TripZen Alpine Adventures",
    "slug": "kedarkantha",
    "packageName": "Kedarkantha Winter Snow Summit Trek",
    "duration": "5 Days / 4 Nights",
    "price": "INR 6,500",
    "originalPrice": "INR 9,000",
    "discount": "28% OFF",
    "priceValue": 6500,
    "rating": 4.9,
    "difficulty": "Moderate",
    "departure": "Dehradun / Sankri",
    "facilityType": "Moderate",
    "month": "December - April",
    "distance": "20 km Total Trek",
    "altitude": "12,500 ft (Kedarkantha Summit)",
    "image": "./assets/kedarkantha-card.mov",
    "badge": "❄️ Winter Snow Summit",
    "pdf": "/itineraries/kedarkantha.html",
    "dates": "Winter Batches (Dec-Apr)",
    "includes": [
      "Dehradun to Sankri return comfortable transit",
      "4 Nights accommodation (1 night Sankri guesthouse + 3 nights alpine snow camps)",
      "High-altitude sleeping bags, insulated foam mattresses, and twin-sharing tents",
      "Microspikes and gaiters for safe snow walking",
      "All 3 freshly prepared hot vegetarian meals + evening soup & snacks",
      "Certified mountaineer trek leaders and local rescue guides",
      "Govind National Park permits and camping charges"
    ],
    "days": [
      {
        "day": 1,
        "title": "Dehradun to Sankri Base Village",
        "altitude": "6,400 ft",
        "distance": "Drive 200 km (7-8 hours)",
        "details": "Scenic drive along the Yamuna and Tons rivers passing Mussoorie, Nainbagh, Purola, and Mori. Reach the wooden hamlet of Sankri. Evening briefing and gear check.",
        "meals": "Lunch on route & Hot Dinner",
        "stay": "Homestay / Guesthouse in Sankri"
      },
      {
        "day": 2,
        "title": "Sankri to Juda Ka Talab (Frozen Alpine Lake)",
        "altitude": "9,100 ft",
        "distance": "4 km trek (4 hours)",
        "details": "Trek through pine and maple woods covered in snow. Reach the legendary Juda Ka Talab, a frozen lake nestled inside a pine clearing. Camp beside the lake.",
        "meals": "Breakfast, Lunch, Evening Soup & Dinner",
        "stay": "Alpine Tents at Juda Ka Talab"
      },
      {
        "day": 3,
        "title": "Juda Ka Talab to Kedarkantha Base Camp",
        "altitude": "11,250 ft",
        "distance": "3.5 km trek (3 hours)",
        "details": "Walk out of the tree line onto wide open snow slopes. Reach Kedarkantha Base Camp with clear views of the triangular summit peak. Early dinner and summit briefing.",
        "meals": "Breakfast, Lunch, Hot Snacks & Early Dinner",
        "stay": "Alpine Tents at Base Camp"
      },
      {
        "day": 4,
        "title": "Base Camp to Kedarkantha Summit (12,500 ft) & Hargaon",
        "altitude": "12,500 ft Summit -> 8,900 ft Hargaon",
        "distance": "6 km trek (6 hours)",
        "details": "Early 3:30 AM summit push using microspikes and gaiters. Reach the summit (12,500 ft) at sunrise to see Swargarohini, Black Peak (Kalanag), and Bandarpoonch bathed in golden light. Descend to Hargaon campsite.",
        "meals": "Early Morning Tea, Summit Snacks, Lunch & Dinner",
        "stay": "Alpine Tents at Hargaon"
      },
      {
        "day": 5,
        "title": "Hargaon to Sankri & Drive back to Dehradun",
        "altitude": "2,200 ft",
        "distance": "4 km descent + Drive 200 km",
        "details": "Descend through apple orchards back to Sankri. Board transport to Dehradun Railway Station / Airport arriving by 7:00 PM.",
        "meals": "Breakfast & En-route lunch",
        "stay": "Return Transit"
      }
    ],
    "description": "Classic winter snow summit trek featuring snow-covered pine forests, Juda Ka Talab alpine camp, and a breathtaking 360° Himalayan summit sunrise."
  },
  {
    "id": "pkg-triund-sunset",
    "destination": "Triund & Dharamshala",
    "company": "TripZen Mountain Co.",
    "slug": "triund-sunset",
    "packageName": "Triund & Snowline Cafe Sunset Ridge Trek",
    "duration": "2 Days / 1 Night",
    "price": "INR 2,500",
    "originalPrice": "INR 3,800",
    "discount": "34% OFF",
    "priceValue": 2500,
    "rating": 4.8,
    "difficulty": "Easy",
    "departure": "McLeod Ganj / Dharamshala",
    "facilityType": "Moderate",
    "month": "All Year Round",
    "distance": "18 km Total Trek",
    "altitude": "9,350 ft (Triund Top)",
    "image": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    "badge": "⚡ Weekend Quick Escape",
    "pdf": "/itineraries/triund-sunset.html",
    "dates": "Every Weekend",
    "includes": [
      "1 Night high ridge dome camping with sleeping bag and foam mat",
      "All freshly prepared vegetarian meals (Lunch, Evening Tea/Snacks, Dinner, Breakfast)",
      "Experienced local mountain guide and camp leader",
      "Forest entry and camping permissions",
      "First aid kit and safety support"
    ],
    "days": [
      {
        "day": 1,
        "title": "McLeod Ganj / Dharamkot to Triund Ridge & Sunset",
        "altitude": "9,350 ft",
        "distance": "9 km trek (4-5 hours)",
        "details": "Meet at Gallu Devi Temple base. Hike through oak, rhododendron, and deodar woods passing Magic View Cafe. Reach the vast grassy Triund ridge by afternoon. Watch the sun set in fiery orange behind the Kangra valley. Campfire and dinner under the stars.",
        "meals": "Lunch on trail, Hot Evening Tea & Campfire Dinner",
        "stay": "Alpine Dome Tents on Triund Ridge"
      },
      {
        "day": 2,
        "title": "Triund to Snowline Cafe Hike & Descent to Dharamkot",
        "altitude": "9,350 ft -> 6,800 ft",
        "distance": "9 km descent + 4 km optional extension",
        "details": "Early morning hike to Snowline Cafe and Laka Glacier viewpoint for close-up glacier views. Enjoy hot breakfast at camp and descend back to Dharamkot / McLeod Ganj by 2:00 PM.",
        "meals": "Breakfast & Morning Tea",
        "stay": "Trip concludes in McLeod Ganj"
      }
    ],
    "description": "The quintessential weekend mountain getaway overlooking the towering Dhauladhar snow wall on one side and the shimmering Kangra valley on the other."
  }
];

const PRESET_AVATARS = [
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Aria',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Leo',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Maya',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Zane',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Sam',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Chloe',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Rohan',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Tara',
];

const INTEREST_OPTIONS = [
  { id: 'trekking', label: '🏔️ High Altitude Trekking' },
  { id: 'photography', label: '📸 Mountain Photography' },
  { id: 'camping', label: '⛺ Campfire & Stargazing' },
  { id: 'food', label: '🍲 Local Food & Culture' },
  { id: 'sunrise', label: '🌅 Sunrise & Ridge Hikes' },
  { id: 'forest', label: '🌲 Forest Trails' },
  { id: 'yoga', label: '🧘 Yoga & Wellness' },
  { id: 'adventure', label: '🧗 Adventure Sports' },
  { id: 'history', label: '🏛️ History & Temples' },
  { id: 'rivers', label: '🌊 Rivers & Waterfalls' },
  { id: 'backpacking', label: '🎒 Budget Backpacking' },
  { id: 'homestays', label: '🏡 Remote Homestays' },
];

const BUDGET_OPTIONS = [
  { value: '3000-7000', title: '💰 Budget Friendly', desc: '₹3,000 - ₹7,000 / trip' },
  { value: '7000-15000', title: '💵 Moderate Comfort', desc: '₹7,000 - ₹15,000 / trip' },
  { value: '15000-30000', title: '💎 Premium Experience', desc: '₹15,000+ / trip' },
];

const state = {
  route: window.location.hash.replace('#', '') || '/',
  user: null,
  profile: null,
  matches: [],
  dashboard: null,
  authMode: 'signup',
  authStatus: '',
  authStatusType: '',
  profileStatus: '',
  profileStatusType: '',
  selectedInterests: [],
  preferenceStatus: '',
  preferenceStatusType: '',
  matchStatus: '',
  connectStatus: '',
  chatStatus: '',
  chatDraft: '',
  pendingProfileImage: '',
  notificationMessage: '',
  unreadConversationCount: 0,
  packageStatus: '',
  packageBookingStatus: '',
  paymentStatus: '',
  packageFacilityFilter: 'All',
  packageDifficultyFilter: 'All',
  packageDestinationFilter: '',
  packageSearchQuery: '',
  packageSelections: [],
  checkoutPackageId: '',
  itineraryPackageId: '',
  checkoutTravelers: 1,
  checkoutDate: 'Upcoming Weekend',
  checkoutPhone: '',
  bookingSuccessData: null,
  planningBudget: '',
  planningMonth: '',
  groupStatus: '',
  groupStatusType: '',
  tripGroups: [],
  groupTitle: '',
  groupAgencyName: '',
  groupDestination: 'Kedarnath',
  groupDestinationFilter: '',
  groupSearchQuery: '',
  groupBatchDates: 'Upcoming Weekend',
  groupPricePerPerson: '4999',
  groupMaxMembers: '6',
  groupInclusions: 'Stay in Swiss Tents + All Meals + Trek Guide + Forest Permits',
  groupContactPhone: '+91 89206 32874',
  groupHideFull: false,
  groupActiveTab: 'all', // 'all', 'agency', 'my'
  showCreateGroupModal: false,
  bookings: [],
  bookingsLoading: false,
  bookingSearchQuery: '',
  adminBookings: [],
  adminBookingsLoading: false,
  adminSearchQuery: '',
  adminStatusFilter: 'All',
  adminDestinationFilter: 'All',
  adminTotals: null,
  adminStatusMessage: '',
  adminStatusType: '',
  adminUnlocked: sessionStorage.getItem('tripzenAdminUnlocked') === 'true',
  selectedMatchProfileId: '',
  matchTravelStyleFilter: '',
  matchCompatibilityMin: 50,
  matchSearchQuery: '',
  chatSearchQuery: '',
  conversations: [],
  activeConversationId: '',
  messages: [],
  loading: true,
  globalStatus: '',
  globalStatusType: '',
};

let apiBase = '';
let liveSyncTimer = null;
let pollInFlight = false;
let initialConversationLoadComplete = false;
let notificationTimer = null;
const CHAT_POLL_INTERVAL = 3000;
const DEFAULT_TITLE = 'TripZen | Travel Matchmaking';
document.title = DEFAULT_TITLE;

function isAdminUser() {
  if (state.adminUnlocked || sessionStorage.getItem('tripzenAdminUnlocked') === 'true') return true;
  const email = (state.user?.email || '').toLowerCase().trim();
  if (email === 'abhisheksharma39232@gmail.com') return true;
  if (state.user?.role === 'admin' || state.user?.isAdmin) return true;
  return false;
}

function absoluteApiUrl(base, path) {
  return `${base}${path}`;
}

async function requestJson(base, url, method, payload) {
  const headers = { 'Content-Type': 'application/json' };
  if (state.user?.id) {
    headers['x-user-id'] = state.user.id;
  }
  const adminPwd = sessionStorage.getItem('tripzenAdminPassword');
  if (adminPwd) {
    headers['x-admin-password'] = adminPwd;
  }

  const response = await fetch(absoluteApiUrl(base, url), {
    method,
    headers,
    body: payload ? JSON.stringify(payload) : undefined,
  });

  const contentType = response.headers.get('content-type') || '';
  const rawBody = await response.text();

  if (contentType.includes('application/json') === false) {
    const error = new Error('Non-JSON response');
    error.code = 'NON_JSON';
    error.response = response;
    error.url = url;
    throw error;
  }

  let data;
  try {
    data = rawBody ? JSON.parse(rawBody) : {};
  } catch (error) {
    const parseError = new Error('INVALID_JSON');
    parseError.code = 'INVALID_JSON';
    throw parseError;
  }

  if (!response.ok) {
    const requestError = new Error(data.message || 'Request failed.');
    requestError.code = 'REQUEST_FAILED';
    throw requestError;
  }

  return data;
}

function getApiBaseCandidates() {
  if (window.location.protocol.startsWith('http') && /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(window.location.hostname)) {
    return [''];
  }

  const candidates = [];
  const seen = new Set();
  const preferredHost = window.location.hostname || 'localhost';

  [
    window.location.origin,
    `http://${preferredHost}:3000`,
    `http://${preferredHost}:3001`,
    'http://localhost:3000',
    'http://[::1]:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://[::1]:3001',
    'http://127.0.0.1:3001',
  ].forEach((base) => {
    if (!base || base === 'null' || seen.has(base)) return;
    seen.add(base);
    candidates.push(base);
  });

  return candidates;
}

async function detectApiBase() {
  const candidates = getApiBaseCandidates();

  for (const base of candidates) {
    try {
      const response = await fetch(absoluteApiUrl(base, '/api/health'));
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json') === false) {
        continue;
      }

      const data = await response.json();
      if (data && data.app === 'Tripzen') {
        apiBase = base === window.location.origin ? '' : base;
        return true;
      }
    } catch (error) {
      continue;
    }
  }

  return false;
}

function api(url, method = 'GET', payload) {
  const bases = apiBase ? [apiBase, ...getApiBaseCandidates()] : getApiBaseCandidates();
  const uniqueBases = [];
  const seen = new Set();

  bases.forEach((base) => {
    const normalized = base || '';
    if (seen.has(normalized)) return;
    seen.add(normalized);
    uniqueBases.push(normalized);
  });

  return (async () => {
    let lastError = null;

    for (const base of uniqueBases) {
      try {
        const data = await requestJson(base, url, method, payload);
        apiBase = base;
        state.globalStatus = '';
        state.globalStatusType = '';
        return data;
      } catch (error) {
        lastError = error;
        if (error.code === 'REQUEST_FAILED') {
          throw error;
        }
      }
    }

    if (lastError && lastError.code === 'INVALID_JSON') {
      throw new Error('TripZen received an invalid JSON response from the server.');
    }

    if (lastError && lastError.code === 'NON_JSON') {
      const chatRoute =
        url.startsWith('/api/conversations') ||
        url.startsWith('/api/messages');

      if (chatRoute) {
        throw new Error(
          'Chat needs the latest TripZen server. Stop the current server, run "npm start" again in /Users/abhisheksharma/index.js, then refresh.'
        );
      }
    }

    throw new Error(
      'TripZen could not reach its backend. Start npm in /Users/abhisheksharma/index.js, then open http://localhost:3000 or http://127.0.0.1:3000.'
    );
  })();
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function routeTo(path) {
  const target = path || '/';
  state.route = target;
  if (window.location.hash !== `#${target}`) {
    window.location.hash = target;
  }
  if (target === '/chat') {
    startFastChatPoll();
  } else {
    stopChatPoll();
  }
  renderApp();
}

function matchProfileIdFromRoute(route = normalizedRoute()) {
  return route.startsWith('/match/') ? decodeURIComponent(route.slice('/match/'.length)) : '';
}

function normalizedRoute() {
  const route = state.route || '/';
  
  if (route === '/admin') {
    window.location.href = '/admin.html';
    return '/admin';
  }

  if (state.user && (route === '/' || route === '/auth')) {
    if (state.profile && state.profile.destination) {
      return '/matches';
    }
    return (state.user.profileCompleteness || 0) >= 40 ? '/preferences' : '/profile';
  }

  if (
    !state.user &&
    (route === '/profile' || route === '/preferences' || route === '/matches' || route === '/chat' || route === '/join-book' || route === '/packages' || route.startsWith('/match/'))
  ) {
    return '/auth';
  }

  if (route === '/packages') {
    return '/join-book';
  }
  if (route === '/cost-sharing') {
    return '/groups';
  }

  return route;
}

function isDashboardRoute(route = normalizedRoute()) {
  return (
    route === '/admin' ||
    route === '/profile' ||
    route === '/preferences' ||
    route === '/matches' ||
    route === '/chat' ||
    route === '/join-book' ||
    route === '/packages' ||
    route === '/groups' ||
    route === '/cost-sharing' ||
    route === '/bookings' ||
    route === '/my-bookings' ||
    route === '/about' ||
    route.startsWith('/match/')
  );
}

function routeNeedsTripData(route = normalizedRoute()) {
  return (
    route === '/admin' ||
    route === '/profile' ||
    route === '/preferences' ||
    route === '/matches' ||
    route === '/chat' ||
    route === '/join-book' ||
    route === '/packages' ||
    route === '/groups' ||
    route === '/cost-sharing' ||
    route === '/bookings' ||
    route === '/my-bookings' ||
    route.startsWith('/match/')
  );
}

function statusMarkup(message, type) {
  if (!message) return '';
  const className = type ? `status ${type}` : 'status';
  return `<p class="${className}">${escapeHtml(message)}</p>`;
}

function normalizeConversationSnapshot(conversations) {
  return (conversations || []).map((conversation) => ({
    id: conversation.id,
    unreadCount: conversation.unreadCount || 0,
    latestMessageId: conversation.latestMessage ? conversation.latestMessage.id : '',
  }));
}

function hasConversationSnapshotChanged(previous, next) {
  return JSON.stringify(normalizeConversationSnapshot(previous)) !== JSON.stringify(normalizeConversationSnapshot(next));
}

function hasMessageListChanged(previous, next) {
  return JSON.stringify((previous || []).map((message) => message.id)) !==
    JSON.stringify((next || []).map((message) => message.id));
}

function updateUnreadCount() {
  state.unreadConversationCount = (state.conversations || []).reduce(
    (total, conversation) => total + (conversation.unreadCount || 0),
    0
  );
  document.title = state.unreadConversationCount
    ? `(${state.unreadConversationCount}) ${DEFAULT_TITLE}`
    : DEFAULT_TITLE;
}

function showIncomingNotification(text) {
  if (!text) return;

  state.notificationMessage = text;
  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }
  notificationTimer = setTimeout(() => {
    state.notificationMessage = '';
    renderApp();
  }, 4500);

  if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    try {
      new Notification('TripZen', { body: text });
    } catch (error) {
      // Ignore
    }
  }
}

function requestBrowserNotificationPermission() {
  if (typeof Notification === 'undefined') return;
  if (Notification.permission !== 'default') return;

  Notification.requestPermission().catch(() => {
    // Ignore
  });
}

function maybeNotifyAboutIncomingMessages(previousConversations, nextConversations) {
  if (!initialConversationLoadComplete || !state.profile) return;

  const previousMap = new Map((previousConversations || []).map((conversation) => [conversation.id, conversation]));
  nextConversations.forEach((conversation) => {
    const previous = previousMap.get(conversation.id);
    const previousMessageId = previous && previous.latestMessage ? previous.latestMessage.id : '';
    const nextMessageId = conversation.latestMessage ? conversation.latestMessage.id : '';
    const isIncoming =
      conversation.latestMessage &&
      conversation.latestMessage.senderProfileId !== state.profile.id &&
      nextMessageId &&
      nextMessageId !== previousMessageId;

    if (isIncoming) {
      showIncomingNotification(`New message from ${conversation.partner.fullName}`);
    }
  });
}

function formatMessageTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function getCurrentDestinationPreference() {
  return state.profile && state.profile.destination ? state.profile.destination : '';
}

function getFilteredPackages(destination, facilityType, difficulty, searchQuery) {
  return TRIP_PACKAGES.filter((tripPackage) => {
    const destinationMatches = destination ? (tripPackage.destination.toLowerCase().includes(destination.toLowerCase()) || destination.toLowerCase().includes(tripPackage.destination.toLowerCase())) : true;
    const facilityMatches = facilityType && facilityType !== 'All' ? tripPackage.facilityType === facilityType : true;
    const difficultyMatches = difficulty && difficulty !== 'All' ? tripPackage.difficulty.toLowerCase().includes(difficulty.toLowerCase()) : true;
    const searchMatches = searchQuery ? (tripPackage.packageName.toLowerCase().includes(searchQuery.toLowerCase()) || tripPackage.destination.toLowerCase().includes(searchQuery.toLowerCase())) : true;
    return destinationMatches && facilityMatches && difficultyMatches && searchMatches;
  });
}

/* ==========================================================================
   WORKFLOW STEPPER HELPER
   ========================================================================== */

function workflowStepper() {
  return '';
}

/* ==========================================================================
   VIEW RENDERERS
   ========================================================================== */

function topbar() {
  const current = normalizedRoute();
  return `
    <header class="topbar-stitch">
      <div class="topbar-inner">
        <a href="#/" class="stitch-brand">
          <img src="./assets/tripzen-logo.png" alt="TripZen Logo" class="stitch-brand-logo-img" />
          <span>TripZen</span>
        </a>

        <nav class="stitch-nav-menu">
          <a href="#/profile" class="stitch-nav-item ${current === '/profile' ? 'active' : ''}">Profile</a>
          <a href="#/preferences" class="stitch-nav-item ${current === '/preferences' ? 'active' : ''}">Plan Trip</a>
          <a href="#/matches" class="stitch-nav-item ${current === '/matches' || current.startsWith('/match/') ? 'active' : ''}">Matches</a>
          <a href="#/chat" class="stitch-nav-item ${current === '/chat' ? 'active' : ''}">Inbox</a>
          <a href="#/join-book" class="stitch-nav-item ${current === '/join-book' || current === '/packages' ? 'active' : ''}">Packages</a>
          <a href="#/groups" class="stitch-nav-item ${current === '/groups' || current === '/cost-sharing' ? 'active' : ''}">Cost Sharing</a>
          <a href="#/bookings" class="stitch-nav-item ${current === '/bookings' || current === '/my-bookings' ? 'active' : ''}">My Bookings ${state.bookings.length > 0 ? `<span class="nav-counter-pill">${state.bookings.length}</span>` : ''}</a>
          ${isAdminUser() ? `<a href="/admin.html" target="_blank" class="stitch-nav-item admin-nav-pill">🗄️ RAW Data DB</a>` : ''}
        </nav>

        <div class="stitch-topbar-actions">
          ${
            state.user
              ? `
                <a href="#/profile" class="stitch-signin-link" title="View / Edit Profile">👤 ${escapeHtml(state.user.fullName)}</a>
                <button type="button" class="ghost-btn" id="logoutBtn">Logout</button>
              `
              : `
                <button type="button" class="stitch-signin-link" id="topbarSignInBtn">Sign In</button>
                <button type="button" class="primary-btn link-btn" id="topbarGetStartedBtn">Get Started</button>
              `
          }
        </div>
      </div>
    </header>
  `;
}

function dashboardSidebar() {
  const current = normalizedRoute();
  const avatarUrl = state.user?.profileImage || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(state.user?.fullName || 'Traveler')}`;

  return `
    <aside class="dashboard-sidebar">
      <div class="sidebar-header">
        <a href="#/" class="stitch-brand">
          <img src="./assets/tripzen-logo.png" alt="TripZen Logo" class="stitch-brand-logo-img" />
          <span>TripZen</span>
        </a>
        <a href="#/profile" class="sidebar-user-pill" title="View / Edit Profile">
          <img class="sidebar-user-avatar" src="${escapeHtml(avatarUrl)}" alt="Avatar" />
          <div class="sidebar-user-info">
            <strong>${escapeHtml(state.user?.fullName || 'Traveler')}</strong>
            <span>${escapeHtml(state.profile?.destination || 'Edit Profile')}</span>
          </div>
        </a>
      </div>

      <nav class="sidebar-nav-list">
        <a href="#/profile" class="sidebar-nav-link ${current === '/profile' ? 'active' : ''}">
          <span class="sidebar-nav-icon">👤</span>
          <span>Profile Setup</span>
        </a>
        <a href="#/preferences" class="sidebar-nav-link ${current === '/preferences' ? 'active' : ''}">
          <span class="sidebar-nav-icon">🎛️</span>
          <span>Trip & Dates</span>
        </a>
        <a href="#/matches" class="sidebar-nav-link ${current === '/matches' || current.startsWith('/match/') ? 'active' : ''}">
          <span class="sidebar-nav-icon">🧭</span>
          <span>Discover Matches</span>
        </a>
        <a href="#/chat" class="sidebar-nav-link ${current === '/chat' ? 'active' : ''}">
          <span class="sidebar-nav-icon">✉️</span>
          <span>Messages & Chat</span>
          ${state.unreadConversationCount > 0 ? `<span class="sidebar-nav-badge">${state.unreadConversationCount}</span>` : ''}
        </a>
        <a href="#/join-book" class="sidebar-nav-link ${current === '/join-book' || current === '/packages' ? 'active' : ''}">
          <span class="sidebar-nav-icon">📦</span>
          <span>Curated Packages</span>
        </a>
        <a href="#/groups" class="sidebar-nav-link ${current === '/groups' || current === '/cost-sharing' ? 'active' : ''}">
          <span class="sidebar-nav-icon">👥</span>
          <span>Cost Sharing</span>
          ${state.tripGroups.length > 0 ? `<span class="sidebar-nav-badge" style="background: rgba(35,89,70,0.12); color: var(--forest);">${state.tripGroups.length}</span>` : ''}
        </a>
        <a href="#/bookings" class="sidebar-nav-link ${current === '/bookings' || current === '/my-bookings' ? 'active' : ''}">
          <span class="sidebar-nav-icon">🎟️</span>
          <span>My Bookings</span>
          ${state.bookings.length > 0 ? `<span class="sidebar-nav-badge" style="background: rgba(16,185,129,0.15); color: #047857; font-weight: 800;">${state.bookings.length}</span>` : ''}
        </a>
        <a href="#/about" class="sidebar-nav-link ${current === '/about' ? 'active' : ''}">
          <span class="sidebar-nav-icon">ℹ️</span>
          <span>About TripZen</span>
        </a>
        ${isAdminUser() ? `
          <a href="/admin.html" target="_blank" class="sidebar-nav-link admin-nav-link" style="color: var(--accent); font-weight: 700;">
            <span class="sidebar-nav-icon">🗄️</span>
            <span>RAW Data DB</span>
          </a>
        ` : ''}
      </nav>

      <div class="sidebar-footer">
        <button type="button" class="sidebar-logout-btn" id="logoutBtn">
          <span>🚪 Log Out</span>
        </button>
      </div>
    </aside>
  `;
}

function dashboardShell(contentMarkup) {
  return `
    <div class="dashboard-container">
      ${dashboardSidebar()}
      <main class="dashboard-main-content">
        ${state.notificationMessage ? `<div class="floating-notification">${escapeHtml(state.notificationMessage)}</div>` : ''}
        ${state.globalStatus ? `<div class="global-banner ${state.globalStatusType || ''}">${escapeHtml(state.globalStatus)}</div>` : ''}
        ${contentMarkup}
      </main>
    </div>
  `;
}

function destinationCards(selected) {
  return DESTINATIONS.map((destination) => {
    const isSelected = selected === destination.name;
    const selectedClass = isSelected ? 'selected' : '';
    const media =
      destination.mediaType === 'video'
        ? `
          <video class="destination-media-video" autoplay muted loop playsinline>
            <source src="${escapeHtml(destination.image)}" type="video/quicktime" />
            <source src="${escapeHtml(destination.image)}" type="video/mp4" />
          </video>
        `
        : `<img class="destination-media-img" src="${escapeHtml(destination.image)}" alt="${escapeHtml(destination.name)}" />`;

    return `
      <div
        class="destination-stitch-card ${selectedClass}"
        data-select-destination="${escapeHtml(destination.name)}"
        role="button"
        tabindex="0"
      >
        <div class="destination-media-wrap">
          ${media}
          <div class="destination-check-badge">✓</div>
        </div>
        <div class="destination-card-content">
          <h3>${escapeHtml(destination.title || destination.name)}</h3>
          <div class="destination-location-tag">
            <span>📍</span>
            <span>${escapeHtml(destination.state || 'India')}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function profilePage() {
  const user = state.user || {};
  const currentAvatar = state.pendingProfileImage || user.profileImage || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user.fullName || 'Traveler')}`;
  const currentGender = user.gender || 'Any';
  const currentTravelStyle = user.travelStyle || state.profile?.travelStyle || 'Solo';
  const currentBudget = user.budgetRange || state.profile?.budgetRange || '7000-15000';
  const userInterests = state.selectedInterests && state.selectedInterests.length
    ? state.selectedInterests
    : (user.interests || state.profile?.interests || ['trekking', 'photography', 'camping']);

  return `
    <div class="curate-wrapper animate-fade-in">
      <div class="page-header-stitch">
        <div class="page-header-row">
          <div>
            <h1>${state.user?.fullName ? 'Your Profile Details' : 'Create & Customize Your Profile'}</h1>
            <p>${state.user?.fullName ? 'Manage your photo, personal bio, and travel vibe.' : 'Add your picture, details, and travel vibe to find travelers who truly match your energy and pace.'}</p>
          </div>
          ${
            state.profile
              ? `<a href="#/preferences" class="ghost-btn">Plan Trip & Dates ➔</a>`
              : ''
          }
        </div>
      </div>

      ${statusMarkup(state.profileStatus, state.profileStatusType)}

      <form id="profileCreationForm" class="profile-setup-grid">
        <!-- Left Column: Avatar & Photo Picker -->
        <aside class="profile-setup-avatar-card">
          <div class="card-section-title" style="margin-bottom: 16px;">
            <span>📸</span>
            <span>Profile Picture</span>
          </div>

          <div class="profile-avatar-large-wrap" id="avatarLargeUploadTrigger" title="Click to upload custom photo">
            <img id="profileImageLargePreview" class="profile-avatar-large-img" src="${escapeHtml(currentAvatar)}" alt="Profile Photo" />
            <div class="profile-avatar-edit-badge" style="width: 32px; height: 32px; font-size: 0.95rem;">📷</div>
          </div>

          <button type="button" class="ghost-btn" id="uploadPhotoBtn" style="padding: 6px 14px; font-size: 0.8rem; margin-top: 4px;">
            📁 Upload Custom Photo
          </button>
          <input id="profileImageFileInput" type="file" accept="image/*" style="display: none;" />
          <input type="hidden" name="profileImage" id="profileImageHiddenInput" value="${escapeHtml(currentAvatar)}" />

          <div class="avatar-presets-title">Or Choose an Adventurer Avatar</div>
          <div class="avatar-presets-grid">
            ${PRESET_AVATARS.map((avatarUrl, idx) => `
              <button
                type="button"
                class="preset-avatar-btn ${currentAvatar === avatarUrl ? 'active' : ''}"
                data-preset-avatar="${escapeHtml(avatarUrl)}"
                title="Select Avatar ${idx + 1}"
              >
                <img src="${escapeHtml(avatarUrl)}" class="preset-avatar-img" alt="Preset Avatar" />
              </button>
            `).join('')}
          </div>

          <div style="margin-top: 24px; padding: 14px; background: var(--surface-alt); border-radius: var(--radius-md); font-size: 0.82rem; color: var(--muted); text-align: left; width: 100%;">
            💡 <strong>Pro-Tip:</strong> Verified profiles with genuine photos receive 3x more travel buddy requests!
          </div>
        </aside>

        <!-- Right Column: Personal Details, Style, Interests & Budget -->
        <div class="curate-form-card" style="margin-bottom: 0;">
          <!-- Section 1: Basic Information -->
          <div class="card-section-title">
            <span>👤</span>
            <span>Personal Information</span>
          </div>

          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px;">
            <label class="field-label">
              <span>FULL NAME</span>
              <input name="fullName" placeholder="Elena Rostova" class="stitch-input" value="${escapeHtml(user.fullName || '')}" required />
            </label>
            <label class="field-label">
              <span>AGE</span>
              <input name="age" type="number" min="18" max="99" placeholder="26" class="stitch-input" value="${escapeHtml(user.age || '26')}" />
            </label>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <label class="field-label">
              <span>CURRENT CITY / BASE</span>
              <input name="city" placeholder="Bangalore / Delhi / Mumbai" class="stitch-input" value="${escapeHtml(user.city || '')}" />
            </label>

            <div class="field-label">
              <span>GENDER</span>
              <div class="interactive-choice-grid">
                <button type="button" class="choice-pill-btn ${currentGender === 'Female' ? 'active' : ''}" data-profile-gender-val="Female">👩 Female</button>
                <button type="button" class="choice-pill-btn ${currentGender === 'Male' ? 'active' : ''}" data-profile-gender-val="Male">👨 Male</button>
                <button type="button" class="choice-pill-btn ${currentGender === 'Other' || currentGender === 'Any' ? 'active' : ''}" data-profile-gender-val="Other">✨ Other</button>
              </div>
              <input type="hidden" name="gender" id="profileGenderInput" value="${escapeHtml(currentGender)}" />
            </div>
          </div>

          <label class="field-label">
            <span>ABOUT YOU (BIO)</span>
            <textarea name="bio" rows="3" placeholder="Tell other travelers about yourself, your pace, and what kind of travel buddy you are..." class="stitch-textarea">${escapeHtml(state.profile?.bio || user.bio || '')}</textarea>
          </label>

          <label class="field-label">
            <span>PAST TREKS & TRAVEL EXPERIENCES</span>
            <input name="pastTrips" placeholder="e.g. Kedarkantha 2024, Hampta Pass, Goa Backpacker, Triund Hiker" class="stitch-input" value="${escapeHtml(user.pastTrips || state.profile?.pastTrips || '')}" />
          </label>

          <hr class="form-divider-line" />

          <!-- Section 2: Preferred Travel Style -->
          <div class="card-section-title">
            <span>🎒</span>
            <span>Preferred Travel Style</span>
          </div>

          <div class="interactive-style-grid">
            <button type="button" class="style-choice-card ${currentTravelStyle === 'Solo' ? 'active' : ''}" data-profile-style-val="Solo">
              <span class="style-card-icon">🎒</span>
              <div class="style-card-text">
                <strong>Solo Trekker</strong>
                <small>Independent & flexible</small>
              </div>
              <div class="style-check-circle">✓</div>
            </button>

            <button type="button" class="style-choice-card ${currentTravelStyle === 'Group' ? 'active' : ''}" data-profile-style-val="Group">
              <span class="style-card-icon">👥</span>
              <div class="style-card-text">
                <strong>Group Squad</strong>
                <small>Social & campfire vibes</small>
              </div>
              <div class="style-check-circle">✓</div>
            </button>

            <button type="button" class="style-choice-card ${currentTravelStyle === 'Luxury' ? 'active' : ''}" data-profile-style-val="Luxury">
              <span class="style-card-icon">✨</span>
              <div class="style-card-text">
                <strong>Comfort Trek</strong>
                <small>Curated & scenic stays</small>
              </div>
              <div class="style-check-circle">✓</div>
            </button>

            <button type="button" class="style-choice-card ${currentTravelStyle === 'Budget' ? 'active' : ''}" data-profile-style-val="Budget">
              <span class="style-card-icon">⛺</span>
              <div class="style-card-text">
                <strong>Backpacker</strong>
                <small>Budget & cost-sharing</small>
              </div>
              <div class="style-check-circle">✓</div>
            </button>
          </div>
          <input type="hidden" name="travelStyle" id="profileTravelStyleInput" value="${escapeHtml(currentTravelStyle)}" />

          <hr class="form-divider-line" />

          <!-- Section 3: Interests & Trail Vibes -->
          <div class="card-section-title">
            <span>✨</span>
            <span>Your Travel Interests & Trail Vibes (Select All That Apply)</span>
          </div>

          <div class="interests-tags-grid">
            ${INTEREST_OPTIONS.map((item) => {
              const isSelected = userInterests.some((i) => i.toLowerCase().includes(item.id) || item.label.toLowerCase().includes(i.toLowerCase()));
              return `
                <button
                  type="button"
                  class="interest-tag-pill ${isSelected ? 'active' : ''}"
                  data-interest-id="${escapeHtml(item.id)}"
                  data-interest-name="${escapeHtml(item.label)}"
                >
                  <span>${escapeHtml(item.label)}</span>
                  <span class="interest-tag-check">${isSelected ? '✓' : '+'}</span>
                </button>
              `;
            }).join('')}
          </div>

          <hr class="form-divider-line" />

          <!-- Section 4: Typical Trip Budget Preference -->
          <div class="card-section-title">
            <span>💳</span>
            <span>Budget Preference</span>
          </div>

          <div class="budget-chips-grid">
            ${BUDGET_OPTIONS.map((opt) => `
              <button
                type="button"
                class="budget-chip-card ${currentBudget === opt.value ? 'active' : ''}"
                data-profile-budget-val="${escapeHtml(opt.value)}"
              >
                <strong>${escapeHtml(opt.title)}</strong>
                <small>${escapeHtml(opt.desc)}</small>
              </button>
            `).join('')}
          </div>
          <input type="hidden" name="budgetRange" id="profileBudgetInput" value="${escapeHtml(currentBudget)}" />

          <div style="margin-top: 32px; display: flex; gap: 16px; align-items: center;">
            <button type="submit" class="primary-btn" style="padding: 14px 28px; font-size: 1rem; flex: 1;">
              <span>Save Profile & Plan Trip ➔</span>
            </button>
            <a href="#/preferences" class="ghost-btn" style="padding: 14px 20px;">Skip to Trip Dates</a>
          </div>
        </div>
      </form>
    </div>
  `;
}

function preferencesPage() {
  const currentDestination = state.profile ? state.profile.destination : (DESTINATIONS[2] ? DESTINATIONS[2].name : DESTINATIONS[0].name);
  const currentTravelStyle = state.profile?.travelStyle || state.user?.travelStyle || 'Solo';
  const travelStyles = ['Solo', 'Group', 'Luxury', 'Budget'];

  return `
    <div class="curate-wrapper animate-fade-in">
      <div class="page-header-stitch">
        <div class="page-header-row">
          <div>
            <h1>Choose Your Destination & Travel Dates</h1>
            <p>Select the trek or vacation you are planning and your date range. Then click "Find Matches" to discover compatible travel partners.</p>
          </div>
          <a href="#/profile" class="ghost-btn">👤 Edit Profile Details</a>
        </div>
      </div>

      <form id="preferencesForm" class="curate-grid">
        <!-- Left Trip Details Form Card -->
        <div class="curate-form-card">
          <!-- Section 1: When are you going? -->
          <div class="card-section-title">
            <span>📅</span>
            <span>When are you going?</span>
          </div>

          <div class="form-field-group">
            <label class="field-label">
              <span>START DATE</span>
              <input name="startDate" type="date" required value="${escapeHtml(state.profile?.startDate || '')}" class="stitch-input" />
            </label>
            <label class="field-label">
              <span>END DATE (OPTIONAL)</span>
              <input name="endDate" type="date" value="${escapeHtml(state.profile?.endDate || '')}" class="stitch-input" />
            </label>
          </div>

          <hr class="form-divider-line" />

          <!-- Section 2: Travel Style -->
          <div class="card-section-title">
            <span>🚶</span>
            <span>Trip Travel Style</span>
          </div>

          <div class="pill-grid">
            ${travelStyles
              .map(
                (style) => `
              <button
                type="button"
                class="style-pill-btn ${currentTravelStyle.toLowerCase() === style.toLowerCase() ? 'active' : ''}"
                data-select-style="${escapeHtml(style)}"
              >
                ${escapeHtml(style)}
              </button>
            `
              )
              .join('')}
          </div>

          <input type="hidden" name="travelStyle" value="${escapeHtml(currentTravelStyle)}" />
          <input type="hidden" name="destination" value="${escapeHtml(currentDestination)}" />

          <button type="submit" class="primary-btn wide-btn" style="margin-top: 24px;">
            <span>Find Matches 🚀</span>
          </button>
          ${statusMarkup(state.preferenceStatus, state.preferenceStatusType)}
        </div>

        <!-- Right Destinations Grid -->
        <div class="destinations-column">
          <div class="destinations-header-bar">
            <h2>Destinations</h2>
            <span class="select-multiple-badge">SELECT DESTINATION</span>
          </div>

          <div class="destination-cards-grid">
            ${destinationCards(currentDestination)}
          </div>
        </div>
      </form>

      <!-- Minimal Footer -->
      <footer class="curate-footer">
        <div class="curate-footer-inner">
          <a href="#/" class="stitch-brand" style="font-size: 1.1rem;">
            <img src="./assets/tripzen-logo.png" alt="TripZen Logo" class="stitch-brand-logo-img" style="width: 28px; height: 28px; border-radius: 8px;" />
            <span>TripZen</span>
          </a>
          <div class="footer-nav-links">
            <a href="#/about">About Us</a>
            <a href="#/about">Safety</a>
            <a href="#/about">Terms</a>
            <a href="#/about">Support</a>
          </div>
          <span class="footer-copyright">© 2026 TripZen. All rights reserved.</span>
        </div>
      </footer>
    </div>
  `;
}

function getFilteredMatchesList() {
  return (state.matches || []).filter((match) => {
    if (match.score < (state.matchCompatibilityMin || 50)) return false;
    if (state.matchTravelStyleFilter) {
      const allTags = [
        ...(match.sharedInterests || []),
        match.traveler?.travelStyle || '',
        match.travelStyle || '',
        match.traveler?.city || '',
      ];
      const hasTag = allTags.some((t) => t.toLowerCase().includes(state.matchTravelStyleFilter.toLowerCase()));
      if (!hasTag) return false;
    }
    if (state.matchSearchQuery && state.matchSearchQuery.trim()) {
      const q = state.matchSearchQuery.trim().toLowerCase();
      const matchName = (match.traveler?.fullName || '').toLowerCase();
      const matchDest = (match.destination || '').toLowerCase();
      const matchCity = (match.traveler?.city || '').toLowerCase();
      const matchBio = (match.bio || '').toLowerCase();
      const matchInterests = (match.sharedInterests || []).map((i) => i.toLowerCase()).join(' ');
      const matchStyle = (match.travelStyle || match.traveler?.travelStyle || '').toLowerCase();

      const matchesQuery =
        matchName.includes(q) ||
        matchDest.includes(q) ||
        matchCity.includes(q) ||
        matchBio.includes(q) ||
        matchInterests.includes(q) ||
        matchStyle.includes(q);

      if (!matchesQuery) return false;
    }
    return true;
  });
}

function generateMatchCardsMarkup(filteredMatches) {
  if (!filteredMatches || !filteredMatches.length) {
    return `
      <div style="grid-column: 1 / -1; background: var(--surface); padding: 48px 24px; border-radius: var(--radius-xl); text-align: center; border: 1px solid var(--surface-border);">
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 8px;">No matching travelers found</h3>
        <p style="color: var(--text-muted); margin-bottom: 20px;">Try typing a different destination (e.g. Chopta, Kedarkantha, Hampta, Valley) or click "Load Demo Travelers".</p>
        <button type="button" class="primary-btn" id="seedDemoBtn">Load Demo Travelers</button>
      </div>
    `;
  }

  return filteredMatches
    .map((match) => {
      const tags = (match.sharedInterests && match.sharedInterests.length
        ? match.sharedInterests
        : ['High Altitude', 'Mountain Photography', 'Camping']
      ).slice(0, 4);

      const avatarUrl =
        match.traveler?.profileImage ||
        `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(match.traveler?.fullName || 'Traveler')}`;

      return `
        <div class="stitch-match-card animate-fade-in" data-open-match="${escapeHtml(match.matchProfileId)}">
          <div class="match-photo-container">
            <img class="match-photo-img" src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(match.traveler?.fullName || 'Traveler')}" />
            <div class="match-badge-float">
              <span class="heart">🧡</span>
              <span>${escapeHtml(match.score)}% Match</span>
            </div>
          </div>
          <div class="match-card-body">
            <h3>${escapeHtml(match.traveler?.fullName || 'Traveler')}${match.traveler?.age ? `, ${escapeHtml(match.traveler.age)}` : ''}</h3>
            <div class="match-planning-route">
              <span>✈ Planning:</span>
              <strong>${escapeHtml(match.destination)}</strong>
            </div>
            <div class="match-tags-row">
              ${tags.map((t) => `<span class="tag-badge-pill">${escapeHtml(t)}</span>`).join('')}
            </div>
            <button
              type="button"
              class="primary-btn match-connect-btn"
              data-connect-profile="${escapeHtml(match.matchProfileId)}"
              onclick="event.stopPropagation();"
            >
              <span>Connect & Chat ✉️</span>
            </button>
          </div>
        </div>
      `;
    })
    .join('');
}

function matchesPage() {
  const currentDestination = state.profile ? state.profile.destination : 'your chosen destination';
  const filteredMatches = getFilteredMatchesList();
  const availableStyles = ['Solo', 'Group', 'Luxury', 'Budget', 'Trekking', 'Photography'];
  const matchCardsMarkup = generateMatchCardsMarkup(filteredMatches);

  return `
    <div class="animate-fade-in">
      <div class="page-header-stitch">
        <div class="page-header-row">
          <div>
            <h1>Your Perfect Matches</h1>
            <p id="matchHeaderSubtext">Showing ${filteredMatches.length} compatible travelers heading to ${escapeHtml(currentDestination)}. Click "Connect & Chat" to start planning together.</p>
          </div>
          <div style="display: flex; gap: 12px;">
            <a href="#/preferences" class="ghost-btn">✏️ Edit Preferences</a>
            <button type="button" class="primary-btn" id="seedDemoBtn">Load Demo Travelers</button>
          </div>
        </div>
      </div>

      ${statusMarkup(state.connectStatus, 'success')}

      <div class="matches-layout-grid">
        <!-- Left Filter Panel -->
        <aside class="filters-sidebar-card">
          <h3>Filters</h3>

          <div class="filter-group">
            <label class="filter-group-title">Destination & Search</label>
            <div class="search-input-wrap">
              <span class="search-input-icon">📍</span>
              <input
                id="matchSearchInput"
                class="stitch-input"
                placeholder="Search destination (e.g. Chopta, Kedarkantha)..."
                value="${escapeHtml(state.matchSearchQuery)}"
                autocomplete="off"
              />
            </div>
          </div>

          <div class="filter-group">
            <label class="filter-group-title">Travel Style</label>
            <div class="filter-tags-grid">
              ${availableStyles
                .map(
                  (style) => `
                <button
                  type="button"
                  class="filter-tag-pill ${state.matchTravelStyleFilter.toLowerCase() === style.toLowerCase() ? 'active' : ''}"
                  data-filter-style="${escapeHtml(style)}"
                >
                  ${escapeHtml(style)}
                </button>
              `
                )
                .join('')}
            </div>
          </div>

          <div class="filter-group">
            <label class="filter-group-title">Compatibility (<span id="compatValueLabel">${state.matchCompatibilityMin}%+</span>)</label>
            <div class="compatibility-slider-box">
              <input
                type="range"
                min="50"
                max="99"
                value="${state.matchCompatibilityMin}"
                class="compatibility-range-input"
                id="compatibilitySlider"
              />
              <div class="slider-labels-row">
                <span>50%+</span>
                <span id="sliderMidLabel">${state.matchCompatibilityMin}%+</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </aside>

        <!-- Right Matches Grid -->
        <div class="stitch-matches-grid">
          ${matchCardsMarkup}
        </div>
      </div>
    </div>
  `;
}

function matchProfilePage() {
  const matchProfileId = matchProfileIdFromRoute();
  const match = state.matches.find((item) => item.matchProfileId === matchProfileId) || null;

  if (!match) {
    return `
      <div class="animate-fade-in" style="background: var(--surface); padding: 48px; border-radius: var(--radius-xl); text-align: center; border: 1px solid var(--surface-border);">
        <h2>Match not found</h2>
        <p style="color: var(--text-muted); margin: 12px 0 24px;">This traveler profile is not available. Return to your matches list.</p>
        <a href="#/matches" class="primary-btn link-btn">Back To Matches</a>
      </div>
    `;
  }

  const avatarUrl = match.traveler.profileImage || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(match.traveler.fullName)}`;
  const tags = (match.sharedInterests && match.sharedInterests.length
    ? match.sharedInterests
    : ['similar destination', 'matching dates', 'mountain photography']
  );

  return `
    <div class="animate-fade-in">
      <div style="margin-bottom: 20px;">
        <a href="#/matches" class="ghost-btn">← Back To Matches</a>
      </div>

      <div class="match-detail-card-stitch">
        <div class="match-detail-hero">
          <img class="match-detail-avatar-big" src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(match.traveler.fullName)}" />
          <div style="flex-grow: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
              <div>
                <h1 style="font-size: 1.85rem; font-weight: 800; color: var(--text-main);">${escapeHtml(match.traveler.fullName)}${match.traveler.age ? `, ${escapeHtml(match.traveler.age)}` : ''}</h1>
                <p style="color: var(--text-muted); font-weight: 500;">📍 ${escapeHtml(match.traveler.city || 'India')} • Planning ${escapeHtml(match.destination)}</p>
              </div>
              <div class="match-badge-float" style="position: static;">
                <span class="heart">🧡</span>
                <span>${escapeHtml(match.score)}% Match</span>
              </div>
            </div>
            <div class="match-detail-overview-chips">
              <span class="overview-pill strong">${escapeHtml(match.destination)}</span>
              <span class="overview-pill">${escapeHtml(match.startDate)} to ${escapeHtml(match.endDate)}</span>
              <span class="overview-pill">${escapeHtml(match.dateCompatibility || 'Matching dates')}</span>
            </div>
          </div>
        </div>

        <div class="profile-facts-stitch">
          <div class="fact-chip-stitch">
            <span>TRAVEL STYLE</span>
            <strong>${escapeHtml(match.traveler.travelStyle || match.travelStyle || 'Adventure')}</strong>
          </div>
          <div class="fact-chip-stitch">
            <span>BUDGET</span>
            <strong>${escapeHtml(match.traveler.budgetRange || match.budgetRange || 'Flexible')}</strong>
          </div>
          <div class="fact-chip-stitch">
            <span>PROFILE</span>
            <strong>${escapeHtml(match.traveler.profileCompleteness || 90)}% complete</strong>
          </div>
          <div class="fact-chip-stitch">
            <span>GENDER</span>
            <strong>${escapeHtml(match.traveler.gender || 'Any')}</strong>
          </div>
        </div>

        <div class="match-detail-body">
          <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 8px;">About ${escapeHtml(match.traveler.fullName)}</h3>
          <p style="color: var(--text-body); font-size: 1rem; line-height: 1.6; margin-bottom: 24px;">
            ${escapeHtml(match.bio || 'Excited to embark on this trek and meet compatible travel partners through TripZen.')}
          </p>

          <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 12px;">Shared Interests & Vibe</h3>
          <div class="match-tags-row" style="margin-bottom: 32px;">
            ${tags.map((t) => `<span class="tag-badge-pill" style="font-size: 0.88rem; padding: 8px 16px;">${escapeHtml(t)}</span>`).join('')}
          </div>

          <button
            type="button"
            class="primary-btn wide-btn"
            style="font-size: 1.05rem; padding: 14px 28px;"
            data-connect-profile="${escapeHtml(match.matchProfileId)}"
          >
            <span>Connect & Chat In Real Time ✉️</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function chatPage() {
  const currentConversation = state.conversations.find((item) => item.id === state.activeConversationId) || state.conversations[0] || null;

  const filteredConversations = (state.conversations || []).filter((conv) => {
    if (!state.chatSearchQuery) return true;
    return (conv.partner?.fullName || '').toLowerCase().includes(state.chatSearchQuery.toLowerCase());
  });

  const conversationItemsMarkup = filteredConversations.length
    ? filteredConversations
        .map((conv) => {
          const isActive = currentConversation && currentConversation.id === conv.id;
          const avatarUrl = conv.partner?.profileImage || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(conv.partner?.fullName || 'User')}`;
          return `
            <div
              class="conversation-stitch-item ${isActive ? 'active' : ''}"
              data-open-conversation="${escapeHtml(conv.id)}"
              role="button"
              tabindex="0"
            >
              <div class="avatar-online-wrap">
                <img class="conversation-item-avatar" src="${escapeHtml(avatarUrl)}" alt="Avatar" />
                <div class="online-status-dot"></div>
              </div>
              <div class="conversation-item-content">
                <div class="conversation-item-top">
                  <strong>${escapeHtml(conv.partner?.fullName || 'Travel Buddy')}</strong>
                  <span class="time">${escapeHtml(formatMessageTime(conv.latestMessage?.createdAt || conv.updatedAt))}</span>
                </div>
                <div class="conversation-item-snippet">
                  ${escapeHtml(conv.latestMessage?.text || `Connected for ${conv.destination}`)}
                </div>
              </div>
              ${conv.unreadCount > 0 ? `<span class="conversation-unread-pill">${conv.unreadCount}</span>` : ''}
            </div>
          `;
        })
        .join('')
    : `
      <div style="padding: 32px 20px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
        No active chats yet. Go to <a href="#/matches" style="color: var(--accent-strong); font-weight: 700;">Discover Matches</a> and click "Connect"!
      </div>
    `;

  const messagesMarkup = state.messages.length
    ? state.messages
        .map((msg) => {
          const isMine = state.profile && msg.senderProfileId === state.profile.id;
          return `
            <div class="message-row-wrap ${isMine ? 'outgoing' : 'incoming'}">
              <div class="message-bubble-stitch">
                ${escapeHtml(msg.text)}
              </div>
              <span class="message-time-sub">${escapeHtml(formatMessageTime(msg.createdAt))}</span>
            </div>
          `;
        })
        .join('')
    : `
      <div class="chat-empty-notice" style="margin: auto; text-align: center; color: var(--text-muted); font-size: 0.95rem;">
        <p>Say hello to ${escapeHtml(currentConversation ? currentConversation.partner?.fullName : 'your travel partner')}! 🏔️</p>
      </div>
    `;

  return `
    <div class="animate-fade-in">
      <div class="inbox-stitch-container" id="chatSection">
        <!-- Middle: Messages List Column -->
        <aside class="inbox-conversations-column">
          <div class="conversations-header">
            <h2>Messages</h2>
            <a href="#/matches" class="ghost-btn" style="padding: 4px 10px; font-size: 0.8rem;">+ New</a>
          </div>
          <div class="conversations-search-wrap">
            <div class="search-input-wrap">
              <span class="search-input-icon">🔍</span>
              <input
                id="chatSearchInput"
                class="stitch-input"
                placeholder="Search messages..."
                value="${escapeHtml(state.chatSearchQuery)}"
                style="padding-top: 8px; padding-bottom: 8px; font-size: 0.88rem;"
              />
            </div>
          </div>
          <div class="conversations-scroll-list">
            ${conversationItemsMarkup}
          </div>
        </aside>

        <!-- Right: Active Chat Room -->
        <section class="inbox-active-chat-column">
          ${
            currentConversation
              ? `
                <div class="chat-room-header">
                  <div class="chat-partner-info">
                    <div class="avatar-online-wrap">
                      <img
                        class="conversation-item-avatar"
                        src="${escapeHtml(currentConversation.partner?.profileImage || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(currentConversation.partner?.fullName || 'User')}`)}"
                        alt="Avatar"
                      />
                      <div class="online-status-dot"></div>
                    </div>
                    <div>
                      <strong>${escapeHtml(currentConversation.partner?.fullName || 'Travel Partner')}</strong>
                      <span class="status-text">Online</span>
                    </div>
                  </div>
                  <div class="chat-header-actions">
                    <a href="#/join-book" class="primary-btn" style="padding: 8px 16px; font-size: 0.85rem;">
                      <span>📦 Share Packages ➔</span>
                    </a>
                  </div>
                </div>

                <div class="chat-messages-wrapper">
                  <div class="chat-messages-container" id="chatMessagesContainer">
                    <div class="date-divider-pill">Previous &amp; Recent Messages</div>
                    ${messagesMarkup}
                  </div>
                  <button type="button" id="chatScrollBottomBtn" class="chat-scroll-bottom-btn hidden" title="Jump to latest messages">
                    <span>⬇️ Latest Messages</span>
                  </button>
                </div>

                <form id="chatForm" class="chat-input-toolbar">
                  <input type="hidden" name="conversationId" value="${escapeHtml(currentConversation.id)}" />
                  <a href="#/join-book" class="chat-icon-action-btn" title="Browse and Share Packages">📦</a>
                  <div class="chat-input-bubble-wrap">
                    <input
                      name="text"
                      type="text"
                      class="chat-text-input"
                      placeholder="Type a message..."
                      value="${escapeHtml(state.chatDraft)}"
                      autocomplete="off"
                      required
                    />
                    <span class="emoji-btn-inside">😊</span>
                  </div>
                  <button type="submit" class="chat-send-fab" title="Send">➤</button>
                </form>
              `
              : `
                <div style="margin: auto; text-align: center; color: var(--text-muted);">
                  <h3>No conversation selected</h3>
                  <p style="margin-top: 8px;">Select a traveler from the left to start planning together.</p>
                </div>
              `
          }
        </section>
      </div>
    </div>
  `;
}

function joinBookPage() {
  const currentDestination = state.packageDestinationFilter || '';
  const currentConversation = state.conversations.find((item) => item.id === state.activeConversationId) || state.conversations[0] || null;

  const packages = getFilteredPackages(
    currentDestination,
    state.packageFacilityFilter,
    state.packageDifficultyFilter,
    state.packageSearchQuery
  );

  const packagesMarkup = packages.length
    ? packages
        .map((tripPackage) => {
          const isVideo = tripPackage.image && (tripPackage.image.endsWith('.mov') || tripPackage.image.endsWith('.mp4'));
          const mediaMarkup = isVideo
            ? `
              <video class="package-cover-img" autoplay muted loop playsinline>
                <source src="${escapeHtml(tripPackage.image)}" type="video/quicktime" />
                <source src="${escapeHtml(tripPackage.image)}" type="video/mp4" />
              </video>
            `
            : `
              <img class="package-cover-img" src="${escapeHtml(tripPackage.image)}" alt="${escapeHtml(tripPackage.packageName)}" loading="lazy" />
            `;

          return `
            <div class="stitch-package-card animate-fade-in">
              <div class="package-media-wrap">
                ${mediaMarkup}
                <div class="package-rating-badge">
                  <span>⭐</span>
                  <span>${tripPackage.rating || '4.9'}</span>
                </div>
                ${tripPackage.badge ? `<div class="package-top-badge">${escapeHtml(tripPackage.badge)}</div>` : ''}
              </div>
              <div class="package-card-content">
                <h3>${escapeHtml(tripPackage.packageName)}</h3>
                <span class="package-operator-sub">by <strong>${escapeHtml(tripPackage.company)}</strong> • 📍 ${escapeHtml(tripPackage.destination)}</span>
                
                <div class="package-chips-row" style="margin-bottom: 12px; flex-wrap: wrap; gap: 6px;">
                  <span class="package-chip">⏱️ ${escapeHtml(tripPackage.duration)}</span>
                  ${tripPackage.distance ? `<span class="package-chip">📏 ${escapeHtml(tripPackage.distance)}</span>` : ''}
                  <span class="package-chip">⛰️ ${escapeHtml(tripPackage.difficulty)}</span>
                  <span class="package-chip">🚐 ${escapeHtml(tripPackage.departure)}</span>
                </div>

                ${tripPackage.dates ? `
                  <div class="package-dates-tag" style="font-size: 0.78rem; color: var(--forest); font-weight: 700; background: rgba(35,89,70,0.08); padding: 5px 10px; border-radius: 6px; margin-bottom: 10px; display: inline-flex; align-items: center; gap: 5px;">
                    <span>🗓️</span> <span>Batches: ${escapeHtml(tripPackage.dates)}</span>
                  </div>
                ` : ''}

                ${
                  tripPackage.includes && tripPackage.includes.length
                    ? `
                      <div class="package-inclusions-list">
                        ${tripPackage.includes.slice(0, 4).map((inc) => `<span class="package-inclusion-tag">✓ ${escapeHtml(inc)}</span>`).join('')}
                      </div>
                    `
                    : ''
                }

                <div class="package-payment-badges-row">
                  <span class="package-payment-method-pill" style="font-weight: 700; color: var(--forest);">🔒 Razorpay Secured</span>
                  <span class="package-payment-method-pill">UPI • Cards • NetBanking</span>
                </div>

                <div class="package-card-bottom-row">
                  <div class="package-price-wrap">
                    <div class="package-price-header">
                      <strong>${escapeHtml(tripPackage.price)}</strong>
                      ${tripPackage.originalPrice ? `<span class="package-original-price">${escapeHtml(tripPackage.originalPrice)}</span>` : ''}
                      ${tripPackage.discount ? `<span class="package-discount-badge">${escapeHtml(tripPackage.discount)}</span>` : ''}
                    </div>
                    <span class="package-price-sub">per person • all taxes incl.</span>
                  </div>
                  <div class="package-bottom-actions" style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                    <button
                      type="button"
                      class="ghost-btn"
                      style="padding: 7px 11px; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;"
                      data-open-itinerary="${escapeHtml(tripPackage.id)}"
                      title="View detailed day-by-day itinerary"
                    >
                      📄 Itinerary
                    </button>
                    ${tripPackage.pdf ? `
                      <a
                        href="${escapeHtml(tripPackage.pdf)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="ghost-btn"
                        style="padding: 7px 10px; font-size: 0.82rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;"
                        title="Open Tripzen PDF / Printable document in new tab"
                      >
                        🖨️ PDF
                      </a>
                    ` : ''}
                    <button
                      type="button"
                      class="primary-btn pay-btn"
                      style="padding: 8px 16px; font-size: 0.88rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;"
                      data-open-checkout="${escapeHtml(tripPackage.id)}"
                    >
                      <span>⚡ Book Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join('')
    : `
      <div style="grid-column: 1 / -1; background: var(--surface); padding: 48px; border-radius: var(--radius-xl); text-align: center; border: 1px solid var(--surface-border);">
        <p style="color: var(--text-muted);">No packages match your search filter.</p>
      </div>
    `;

  return `
    <div class="animate-fade-in">
      <div class="page-header-stitch">
        <div class="page-header-row">
          <div>
            <h1>Curated Packages</h1>
            <p>Verified Himalayan operators • Instant Razorpay booking • Split costs with buddies.</p>
          </div>
          ${
            currentConversation
              ? `<a href="#/chat" class="ghost-btn">← Back to Chat with ${escapeHtml(currentConversation.partner?.fullName)}</a>`
              : ''
          }
        </div>
      </div>

      ${statusMarkup(state.packageStatus, 'success')}
      ${statusMarkup(state.packageBookingStatus, 'success')}
      ${statusMarkup(state.paymentStatus, state.paymentStatus.includes('failed') || state.paymentStatus.includes('closed') ? 'info' : 'success')}

      <!-- Search & Filter Bar -->
      <div class="packages-filter-bar-stitch">
        <div class="search-input-wrap filter-bar-search">
          <span class="search-input-icon">🔍</span>
          <input
            id="packageSearchInput"
            class="stitch-input"
            placeholder="Search by trek name, route, or operator..."
            value="${escapeHtml(state.packageSearchQuery)}"
          />
        </div>

        <select id="packageDestinationSelect" class="filter-bar-select">
          <option value="" ${!state.packageDestinationFilter ? 'selected' : ''}>🌍 All Destinations</option>
          ${DESTINATIONS.map(d => `<option value="${escapeHtml(d.name)}" ${state.packageDestinationFilter === d.name ? 'selected' : ''}>${escapeHtml(d.title || d.name)}</option>`).join('')}
        </select>

        <select id="packageDifficultySelect" class="filter-bar-select">
          <option value="All" ${state.packageDifficultyFilter === 'All' ? 'selected' : ''}>⛰️ Any Difficulty</option>
          <option value="Easy" ${state.packageDifficultyFilter === 'Easy' ? 'selected' : ''}>Easy</option>
          <option value="Moderate" ${state.packageDifficultyFilter === 'Moderate' ? 'selected' : ''}>Moderate</option>
          <option value="Challenging" ${state.packageDifficultyFilter === 'Challenging' ? 'selected' : ''}>Challenging</option>
        </select>

        <select id="packageFacilitySelect" class="filter-bar-select">
          <option value="All" ${state.packageFacilityFilter === 'All' ? 'selected' : ''}>🏨 Facility Type</option>
          <option value="Moderate" ${state.packageFacilityFilter === 'Moderate' ? 'selected' : ''}>Moderate</option>
          <option value="Premium" ${state.packageFacilityFilter === 'Premium' ? 'selected' : ''}>Premium</option>
        </select>
      </div>

      <!-- Packages 3-Col Grid -->
      <div class="packages-cards-grid-stitch">
        ${packagesMarkup}
      </div>

      <!-- Cost-Sharing Squads Link Banner -->
      <div class="cost-share-banner-cta" style="margin-top: 36px; background: linear-gradient(135deg, rgba(35,89,70,0.07), rgba(232,135,58,0.07)); border: 1px solid var(--surface-border); border-radius: var(--radius-xl); padding: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        <div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--ink); margin: 0 0 6px 0;">Looking to split camp & transport costs instead?</h3>
          <p style="font-size: 0.88rem; color: var(--muted); margin: 0;">Join or create a verified traveler cost-sharing squad and save up to 40% on trip logistics.</p>
        </div>
        <a href="#/groups" class="primary-btn" style="padding: 11px 24px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
          <span>👥 Explore Cost-Sharing Squads ➔</span>
        </a>
      </div>
    </div>
  `;
}

function agencyCreateGroupModalMarkup() {
  if (!state.showCreateGroupModal) return '';

  const defaultAgency = state.groupAgencyName || (state.user?.fullName ? `${state.user.fullName} Expeditions` : 'Himalayan Adventures');
  const price = Number(state.groupPricePerPerson || 4999);
  const slots = Number(state.groupMaxMembers || 6);
  const total = price * slots;

  return `
    <div class="agency-modal-backdrop animate-fade-in" id="agencyCreateModalBackdrop">
      <div class="agency-modal-card">
        <div class="agency-modal-header">
          <div>
            <h2><span>🏢</span> <span>Create Agency Group Trip / Squad</span></h2>
            <p>Publish an upcoming Himalayan group batch with fixed per-person pricing for travelers to join.</p>
          </div>
          <button type="button" class="modal-close-icon-btn" id="closeCreateGroupModalBtn" title="Close">✕</button>
        </div>

        <form id="createGroupModalForm" style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <label class="field-label">
              <span>AGENCY / TOUR COMPANY NAME</span>
              <input
                id="modalAgencyNameInput"
                name="agencyName"
                value="${escapeHtml(defaultAgency)}"
                placeholder="e.g. Himalayan Hikings / Nomad Youth Treks"
                class="stitch-input"
                required
              />
            </label>

            <label class="field-label">
              <span>TRIP / SQUAD TITLE</span>
              <input
                id="modalTitleInput"
                name="title"
                value="${escapeHtml(state.groupTitle || '')}"
                placeholder="e.g. Kedarnath Monsoon Group Trek"
                class="stitch-input"
                required
              />
            </label>
          </div>

          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 14px;">
            <label class="field-label">
              <span>TRAVEL DESTINATION</span>
              <select id="modalDestinationSelect" name="destination" class="stitch-input" style="height: 48px; font-weight: 600;" required>
                ${DESTINATIONS.map((d) => `<option value="${escapeHtml(d.name)}" ${(state.groupDestination || 'Kedarnath') === d.name ? 'selected' : ''}>📍 ${escapeHtml(d.title || d.name)}</option>`).join('')}
              </select>
            </label>

            <label class="field-label">
              <span>DEPARTURE BATCH / DATES</span>
              <input
                id="modalBatchDatesInput"
                name="batchDates"
                value="${escapeHtml(state.groupBatchDates || 'Upcoming Weekend')}"
                placeholder="e.g. 15th - 20th Oct 2026"
                class="stitch-input"
                required
              />
            </label>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <label class="field-label">
              <span>PRICE PER PERSON (INR)</span>
              <input
                id="modalPricePerPersonInput"
                name="pricePerPerson"
                type="number"
                min="500"
                step="100"
                value="${escapeHtml(String(price))}"
                placeholder="5999"
                class="stitch-input"
                required
              />
            </label>

            <label class="field-label">
              <span>TOTAL MEMBERS / SEATS NEEDED</span>
              <input
                id="modalMaxMembersInput"
                name="maxMembers"
                type="number"
                min="2"
                max="25"
                value="${escapeHtml(String(slots))}"
                class="stitch-input"
                required
              />
            </label>
          </div>

          <label class="field-label">
            <span>INCLUSIONS & PERKS (WHAT'S INCLUDED)</span>
            <input
              id="modalInclusionsInput"
              name="inclusions"
              value="${escapeHtml(state.groupInclusions || 'Stay in Swiss Tents + All Meals + Trek Guide + Forest Permits + Transport')}"
              placeholder="e.g. Alpine Tents + Meals + Trek Guide + Transport"
              class="stitch-input"
              required
            />
          </label>

          <label class="field-label">
            <span>AGENCY WHATSAPP / HELPLINE</span>
            <input
              id="modalContactPhoneInput"
              name="contactPhone"
              value="${escapeHtml(state.groupContactPhone || '+91 89206 32874')}"
              placeholder="+91 89206 32874"
              class="stitch-input"
              required
            />
          </label>

          <!-- Live Summary Preview Box -->
          <div style="background: rgba(35, 89, 70, 0.05); border: 1px dashed rgba(35, 89, 70, 0.25); border-radius: var(--radius-md); padding: 14px 18px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="color: var(--forest); font-size: 0.95rem;">Batch Summary Preview</strong>
              <div style="font-size: 0.82rem; color: var(--muted); margin-top: 2px;" id="modalBatchSummaryText">
                ${slots} Traveler Slots @ INR ${price.toLocaleString('en-IN')}/person
              </div>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 0.74rem; color: var(--muted); text-transform: uppercase;">Total Batch Pool</span>
              <strong style="display: block; font-size: 1.15rem; color: var(--forest);" id="modalTotalPoolVal">
                INR ${total.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px;">
            <button type="button" class="ghost-btn" id="cancelCreateGroupModalBtn" style="padding: 10px 20px;">Cancel</button>
            <button type="submit" class="primary-btn" style="padding: 10px 28px; font-weight: 800;">
              <span>🚀 Publish Group Trip Batch ➔</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function costSharingPage() {
  const currentDestination = state.groupDestinationFilter || '';
  const currentSearch = (state.groupSearchQuery || '').toLowerCase().trim();
  const currentTab = state.groupActiveTab || 'all';
  const viewerProfileId = state.profile?.id || '';

  const myCreatedCount = (state.tripGroups || []).filter((g) => g.organizerProfileId === viewerProfileId).length;

  const filteredGroups = (state.tripGroups || []).filter((group) => {
    // Hide full toggle
    if (state.groupHideFull && group.isFull) {
      return false;
    }

    // Tab filter
    if (currentTab === 'my') {
      if (group.organizerProfileId !== viewerProfileId) return false;
    } else if (currentTab === 'agency') {
      if (!group.agencyName && !group.agencyVerified) return false;
    }

    // Destination filter
    const destMatch = !currentDestination || currentDestination === 'All'
      ? true
      : (group.destination || '').toLowerCase().includes(currentDestination.toLowerCase()) ||
        currentDestination.toLowerCase().includes((group.destination || '').toLowerCase());

    // Search filter
    const searchMatch = !currentSearch
      ? true
      : (group.title || '').toLowerCase().includes(currentSearch) ||
        (group.destination || '').toLowerCase().includes(currentSearch) ||
        (group.agencyName || '').toLowerCase().includes(currentSearch) ||
        (group.inclusions || '').toLowerCase().includes(currentSearch) ||
        (group.organizer?.fullName || '').toLowerCase().includes(currentSearch);

    return destMatch && searchMatch;
  });

  return `
    <div class="animate-fade-in">
      <!-- HEADER -->
      <div class="page-header-stitch">
        <div class="page-header-row">
          <div>
            <h1>Agency & Traveler Group Trips</h1>
            <p>Tour agencies and trip organizers publish upcoming Himalayan group batches with fixed per-person pricing. Join an open squad or create your own agency batch.</p>
          </div>
          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <button type="button" class="primary-btn" id="openCreateGroupModalBtn" style="padding: 10px 22px; font-weight: 800;">
              <span>+ Create Group Trip / Batch ➔</span>
            </button>
            <a href="#/packages" class="ghost-btn">📦 Curated Packages</a>
          </div>
        </div>
      </div>

      ${statusMarkup(state.groupStatus, state.groupStatusType || 'success')}

      <!-- SQUAD HERO BANNER -->
      <div class="group-squad-hero animate-fade-in">
        <div class="group-squad-hero-text">
          <h2>🏔️ Fixed-Cost Himalayan Group Expeditions</h2>
          <p>Verified tour companies set the exact member quota and transparent price per person. When all seats are filled, the batch automatically locks and prepares for departure.</p>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <button type="button" class="primary-btn" id="openCreateGroupModalHeroBtn" style="padding: 9px 20px; font-size: 0.88rem; background: var(--forest); border: none;">
            <span>🏢 Publish Agency Squad</span>
          </button>
        </div>
      </div>

      <!-- FILTER & SEARCH TOOLBAR -->
      <div class="group-filter-toolbar">
        <div class="packages-filter-bar-stitch" style="margin-bottom: 0;">
          <div class="search-input-wrap filter-bar-search">
            <span class="search-input-icon">🔍</span>
            <input
              id="groupSearchInput"
              class="stitch-input"
              placeholder="Search group trips by destination, agency name, title, or inclusions..."
              value="${escapeHtml(state.groupSearchQuery || '')}"
            />
          </div>

          <select id="groupDestinationSelect" class="filter-bar-select">
            <option value="" ${!state.groupDestinationFilter ? 'selected' : ''}>🌍 All Destinations</option>
            ${DESTINATIONS.map((d) => `<option value="${escapeHtml(d.name)}" ${state.groupDestinationFilter === d.name ? 'selected' : ''}>${escapeHtml(d.title || d.name)}</option>`).join('')}
          </select>
        </div>

        <div class="group-filter-tabs-row">
          <div class="group-tabs-group">
            <button type="button" class="group-tab-btn ${currentTab === 'all' ? 'active' : ''}" data-group-tab="all">
              <span>🌍 All Batches (${state.tripGroups.length})</span>
            </button>
            <button type="button" class="group-tab-btn ${currentTab === 'agency' ? 'active' : ''}" data-group-tab="agency">
              <span>🏢 Agency Expeditions</span>
            </button>
            <button type="button" class="group-tab-btn ${currentTab === 'my' ? 'active' : ''}" data-group-tab="my">
              <span>👑 My Created Groups (${myCreatedCount})</span>
            </button>
          </div>

          <label class="group-hide-full-toggle" title="Toggle to automatically hide sold-out full batches">
            <input type="checkbox" id="hideFullGroupsToggle" ${state.groupHideFull ? 'checked' : ''} />
            <span>🔘 Hide Full / Sold Out Batches</span>
          </label>
        </div>
      </div>

      <!-- SQUADS LIST -->
      <div class="group-cards-grid">
        ${tripGroupCardsMarkup(filteredGroups)}
      </div>

      <!-- CREATE GROUP MODAL -->
      ${agencyCreateGroupModalMarkup()}
    </div>
  `;
}

function tripGroupCardsMarkup(groupsList = state.tripGroups) {
  if (!groupsList || groupsList.length === 0) {
    return `
      <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); background: var(--surface); padding: 56px 24px; border-radius: var(--radius-xl); border: 1px solid var(--surface-border);">
        <div style="font-size: 3rem; margin-bottom: 12px;">🏕️</div>
        <h3 style="font-size: 1.3rem; color: var(--ink); margin-bottom: 8px;">No Group Trips Found</h3>
        <p style="max-width: 480px; margin: 0 auto 20px auto; font-size: 0.92rem; color: var(--muted); line-height: 1.6;">
          ${state.groupSearchQuery || state.groupDestinationFilter ? 'No batches match your filter criteria. Try resetting search or destination filters.' : 'No open group trip batches right now. Click below to create and publish a new agency squad!'}
        </p>
        <button type="button" class="primary-btn" id="emptyStateCreateGroupBtn" style="padding: 10px 24px;">
          <span>+ Create First Agency Squad ➔</span>
        </button>
      </div>
    `;
  }

  return groupsList
    .map((group) => {
      const isCreator = Boolean(
        state.profile && (
          group.organizerProfileId === state.profile.id ||
          group.isOrganizer
        )
      );

      const isMember = Boolean(
        state.profile && (
          group.viewerIsMember ||
          (group.memberProfileIds && group.memberProfileIds.includes(state.profile.id))
        )
      );

      const fillPercent = Math.min(100, Math.round((group.memberCount / group.maxMembers) * 100));
      const cleanPhone = (group.contactPhone || '918920632874').replace(/\D/g, '');
      const whatsAppDirectUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(`Hi ${group.agencyName || 'Organizer'}, I would like to inquire about joining the group trip: ${group.title} (${group.destination}) for INR ${group.pricePerPerson}/person.`)}`;

      let actionButtons = '';
      if (isCreator) {
        actionButtons = `
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            ${group.conversationId ? `<button type="button" class="ghost-btn" style="padding: 8px 14px; font-weight: 700; color: var(--forest);" data-open-conversation="${escapeHtml(group.conversationId)}">💬 Group Chat</button>` : ''}
            <button type="button" class="btn-delete-group" data-delete-group="${escapeHtml(group.id)}" title="Delete this group trip batch">
              <span>🗑️ Delete Group</span>
            </button>
          </div>
        `;
      } else if (isMember) {
        actionButtons = `
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <button type="button" class="ghost-btn" style="color: var(--forest); font-weight: 800; padding: 8px 14px;" data-open-conversation="${escapeHtml(group.conversationId || '')}">
              💬 Open Group Chat
            </button>
            <button type="button" class="ghost-btn" style="color: #dc2626; padding: 8px 12px; font-size: 0.8rem;" data-leave-group="${escapeHtml(group.id)}" title="Leave this squad">
              🚪 Leave
            </button>
          </div>
        `;
      } else if (group.isFull) {
        actionButtons = `
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <button type="button" class="ghost-btn" disabled style="opacity: 0.7; font-weight: 700; color: #991b1b; background: #fef2f2; border-color: #fecaca;">
              🚫 Batch Full
            </button>
            <a href="${escapeHtml(whatsAppDirectUrl)}" target="_blank" rel="noopener noreferrer" class="ghost-btn" style="padding: 8px 14px; font-size: 0.82rem; text-decoration: none;">
              📞 Inquire Next Batch
            </a>
          </div>
        `;
      } else if (state.profile) {
        actionButtons = `
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <button type="button" class="btn-instant-join" data-join-group="${escapeHtml(group.id)}" title="Join this squad for INR ${group.pricePerPerson}">
              <span>⚡ Join Trip (₹${Number(group.pricePerPerson).toLocaleString('en-IN')}) ➔</span>
            </button>
            <a href="${escapeHtml(whatsAppDirectUrl)}" target="_blank" rel="noopener noreferrer" class="ghost-btn" style="padding: 8px 12px; font-size: 0.82rem; text-decoration: none;" title="Chat with Agency Organizer">
              💬 WhatsApp
            </a>
          </div>
        `;
      } else {
        actionButtons = `
          <a href="#/auth" class="primary-btn" style="padding: 8px 18px; font-size: 0.85rem; text-decoration: none;">
            <span>Sign In to Join ➔</span>
          </a>
        `;
      }

      return `
        <div class="stitch-group-card animate-fade-in ${group.isFull ? 'card-is-sold-out' : ''}">
          <!-- TOP HEADER WITH AGENCY & SLOTS BADGE -->
          <div class="group-card-top">
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                <span class="agency-badge-pill">
                  <span>🏢</span> <span>${escapeHtml(group.agencyName || 'Tour Agency')}</span>
                </span>
                ${isCreator ? `<span class="creator-gold-badge">👑 You Created This</span>` : ''}
              </div>
              <h3 style="margin-top: 6px;">${escapeHtml(group.title)}</h3>
              <span style="font-size: 0.82rem; color: var(--muted);">📍 ${escapeHtml(group.destination)} • 🗓️ ${escapeHtml(group.batchDates || 'Upcoming Weekend')}</span>
            </div>

            <div style="text-align: right; flex-shrink: 0;">
              <span class="slots-status-pill ${group.isFull ? 'full' : 'open'}">
                ${group.isFull ? '🔴 BATCH FULL (Sold Out)' : `🟢 ${group.remainingSeats} Seat${group.remainingSeats === 1 ? '' : 's'} Left`}
              </span>
            </div>
          </div>

          <!-- FIXED PRICE HIGHLIGHT -->
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin: 10px 0 6px 0; background: rgba(35, 89, 70, 0.04); padding: 10px 14px; border-radius: var(--radius-md);">
            <div class="group-fixed-price-box">
              <span style="font-size: 0.72rem; color: var(--muted); text-transform: uppercase; font-weight: 700;">Fixed Price per Person</span>
              <div class="group-fixed-price-val">
                INR ${Number(group.pricePerPerson).toLocaleString('en-IN')} <span>/ person</span>
              </div>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 0.72rem; color: var(--muted); text-transform: uppercase;">Total Batch Capacity</span>
              <div class="group-batch-pool-sub" style="font-weight: 700; color: var(--ink);">
                INR ${Number(group.estimatedTotalCost).toLocaleString('en-IN')} (${group.maxMembers} travelers)
              </div>
            </div>
          </div>

          <!-- PROGRESS BAR -->
          <div style="margin: 8px 0 4px 0;">
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700; color: var(--text-body); margin-bottom: 4px;">
              <span>Capacity Progress</span>
              <span style="color: ${group.isFull ? '#dc2626' : 'var(--forest)'};">${group.memberCount} / ${group.maxMembers} Joined (${fillPercent}%)</span>
            </div>
            <div class="group-member-progress-bar" style="margin: 0;">
              <div class="group-member-progress-fill" style="width: ${fillPercent}%; background: ${group.isFull ? '#ef4444' : 'linear-gradient(90deg, #10b981, #059669)'};"></div>
            </div>
          </div>

          <!-- INCLUSIONS STRIP -->
          <div class="group-inclusions-strip">
            <span style="font-weight: 700; color: var(--forest); flex-shrink: 0;">Includes:</span>
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(group.inclusions || 'Stay in Swiss Tents + All Meals + Trek Guide + Forest Permits')}</span>
          </div>

          <!-- MEMBERS & FOOTER ACTIONS -->
          <div class="group-members-strip-row">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div class="group-avatar-stack">
                ${(group.members || [])
                  .slice(0, 5)
                  .map((m) => `<img src="${escapeHtml(m.profileImage)}" class="group-avatar-stack-img" alt="${escapeHtml(m.fullName)}" title="${escapeHtml(m.fullName)}${m.isOrganizer ? ' (Organizer)' : ''}" />`)
                  .join('')}
              </div>
              <span style="font-size: 0.76rem; color: var(--muted);">
                ${group.memberCount} Confirmed
              </span>
            </div>

            ${actionButtons}
          </div>
        </div>
      `;
    })
    .join('');
}

function authPage() {
  const isSignup = state.authMode === 'signup';

  return `
    <div class="auth-hero-wrapper animate-fade-in">
      <!-- Original Hero Video Background (Crisp & Unblurred) -->
      <video class="auth-hero-bg-video" autoplay muted loop playsinline>
        <source src="./assets/hero-bg.mov" type="video/quicktime" />
        <source src="./assets/hero-bg.mov" type="video/mp4" />
      </video>
      <div class="auth-hero-video-overlay"></div>

      <div class="auth-hero-container">
        <!-- Left Side: Inspiring Traveler Copy & Corner Manifesto -->
        <div class="auth-hero-left">
          <div class="auth-hero-badge">
            <span>🌍 Trek & Vacation Matchmaking</span>
          </div>

          <h1>Find the ones who share your travel dreams.</h1>

          <p>
            Lock in your destination and dates first. Then discover vetted, like-minded travel partners heading to the same treks, trips, or vacations.
          </p>

          <div class="auth-hero-points">
            <span class="hero-pill-point">✨ 100% Real Travel Buddies</span>
            <span class="hero-pill-point">🏕️ Shared Trip Logistics</span>
            <span class="hero-pill-point">🏖️ Treks & Vacations</span>
          </div>

          <button type="button" class="primary-btn" id="heroGetStartedBtn" style="width: fit-content; padding: 12px 26px; font-size: 0.95rem; margin-top: 2px;">
            <span>Start Planning Free ➔</span>
          </button>

          <!-- Corner element that travelers love -->
          <div class="traveler-corner-love-card">
            <div class="love-card-top">
              <span class="compass-badge">🧭</span>
              <span class="love-tag">TRAIL & TRAVEL MANIFESTO</span>
            </div>
            <blockquote>"Not all those who wander are lost — some are just looking for the right travel tribe."</blockquote>
            <div class="love-card-footer">
              <span>🏔️ Mountain Treks</span>
              <span>•</span>
              <span>🏖️ Beach Vacations</span>
              <span>•</span>
              <span>🌲 Scenic Escapes</span>
            </div>
          </div>
        </div>

        <!-- Right Side: Floating Auth Card -->
        <div class="auth-card-stitch">
          <div class="auth-header-center">
            <a href="#/" class="stitch-brand" style="justify-content: center; font-size: 1.6rem;">
              <img src="./assets/tripzen-logo.png" alt="TripZen Logo" class="stitch-brand-logo-img" style="width: 44px; height: 44px; border-radius: 12px;" />
              <span>TripZen</span>
            </a>
            <h2>${isSignup ? 'Create Account' : 'Welcome Back'}</h2>
            <p>${isSignup ? 'Join compatible travelers for your next journey' : 'Sign in to access your matches and trip chats'}</p>
          </div>

          <div class="auth-toggle-pill">
            <button type="button" class="auth-toggle-btn ${isSignup ? 'active' : ''}" data-auth-mode="signup">Signup</button>
            <button type="button" class="auth-toggle-btn ${!isSignup ? 'active' : ''}" data-auth-mode="login">Login</button>
          </div>

          <form id="authForm" class="form-field-group">
            ${
              isSignup
                ? `
                  <label class="field-label">
                    <span>FULL NAME</span>
                    <input name="fullName" required placeholder="Elena Rostova" class="stitch-input" />
                  </label>
                  <label class="field-label">
                    <span>EMAIL ADDRESS</span>
                    <input name="email" type="email" required placeholder="elena@example.com" class="stitch-input" />
                  </label>
                  <label class="field-label">
                    <span>PASSWORD</span>
                    <input name="password" type="password" required placeholder="••••••••" class="stitch-input" />
                  </label>

                  <div style="display: grid; grid-template-columns: 1fr 1.4fr; gap: 12px; align-items: start;">
                    <label class="field-label">
                      <span>AGE</span>
                      <input name="age" placeholder="28" class="stitch-input" />
                    </label>
                    <div class="field-label">
                      <span>GENDER</span>
                      <div class="interactive-choice-grid" id="authGenderSelector">
                        <button type="button" class="choice-pill-btn active" data-gender-val="Female">
                          <span class="choice-icon">👩</span>
                          <span>Female</span>
                        </button>
                        <button type="button" class="choice-pill-btn" data-gender-val="Male">
                          <span class="choice-icon">👨</span>
                          <span>Male</span>
                        </button>
                        <button type="button" class="choice-pill-btn" data-gender-val="Non-binary">
                          <span class="choice-icon">✨</span>
                          <span>Other</span>
                        </button>
                      </div>
                      <input type="hidden" name="gender" id="authGenderInput" value="Female" />
                    </div>
                  </div>

                  <label class="field-label">
                    <span>CURRENT CITY</span>
                    <input name="city" placeholder="Mumbai / Delhi" class="stitch-input" />
                  </label>

                  <div class="field-label">
                    <div class="choice-header-row">
                      <span>PREFERRED TRAVEL STYLE</span>
                      <span class="choice-sub-hint">Trail Vibe</span>
                    </div>
                    <div class="interactive-style-grid" id="authTravelStyleSelector">
                      <button type="button" class="style-choice-card active" data-style-val="Solo">
                        <span class="style-card-icon">🎒</span>
                        <div class="style-card-text">
                          <strong>Solo Trekker</strong>
                          <small>Independent & flexible</small>
                        </div>
                        <div class="style-check-circle">✓</div>
                      </button>

                      <button type="button" class="style-choice-card" data-style-val="Group">
                        <span class="style-card-icon">👥</span>
                        <div class="style-card-text">
                          <strong>Group Squad</strong>
                          <small>Social & campfire chats</small>
                        </div>
                        <div class="style-check-circle">✓</div>
                      </button>

                      <button type="button" class="style-choice-card" data-style-val="Luxury">
                        <span class="style-card-icon">✨</span>
                        <div class="style-card-text">
                          <strong>Comfort Trek</strong>
                          <small>Curated & scenic stays</small>
                        </div>
                        <div class="style-check-circle">✓</div>
                      </button>

                      <button type="button" class="style-choice-card" data-style-val="Budget">
                        <span class="style-card-icon">⛺</span>
                        <div class="style-card-text">
                          <strong>Backpacker</strong>
                          <small>Budget & cost-sharing</small>
                        </div>
                        <div class="style-check-circle">✓</div>
                      </button>
                    </div>
                    <input type="hidden" name="travelStyle" id="authTravelStyleInput" value="Solo" />
                  </div>
                `
                : `
                  <label class="field-label">
                    <span>EMAIL OR USERNAME</span>
                    <input name="email" type="text" autocomplete="username" autocapitalize="none" required placeholder="name@example.com or username" class="stitch-input" value="${escapeHtml(state.authEmailDraft || '')}" />
                  </label>
                  <label class="field-label">
                    <span>PASSWORD</span>
                    <input name="password" type="password" autocomplete="current-password" required placeholder="••••••••" class="stitch-input" />
                  </label>
                `
            }

            <button type="submit" class="primary-btn wide-btn" style="margin-top: 12px;">
              ${isSignup ? 'Create Account ➔' : 'Continue ➔'}
            </button>
          </form>

          ${statusMarkup(state.authStatus, state.authStatusType)}
        </div>
      </div>
    </div>
  `;
}

function bookingsPage() {
  const currentSearch = (state.bookingSearchQuery || '').toLowerCase().trim();
  const bookingsList = (state.bookings || []).filter((b) => {
    if (!currentSearch) return true;
    return (
      (b.packageName || '').toLowerCase().includes(currentSearch) ||
      (b.destination || '').toLowerCase().includes(currentSearch) ||
      (b.bookingRef || '').toLowerCase().includes(currentSearch) ||
      (b.razorpayPaymentId || '').toLowerCase().includes(currentSearch) ||
      (b.company || '').toLowerCase().includes(currentSearch) ||
      (b.leadName || '').toLowerCase().includes(currentSearch)
    );
  });

  const totalSpent = (state.bookings || []).reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
  const totalTravelers = (state.bookings || []).reduce((sum, b) => sum + (Number(b.travelerCount) || 1), 0);

  return `
    <div class="animate-fade-in">
      <div class="page-header-stitch">
        <div class="page-header-row">
          <div>
            <h1>My Bookings & Reservations</h1>
            <p>View your confirmed Himalayan treks, official booking vouchers, itineraries, and WhatsApp receipts.</p>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <a href="#/packages" class="primary-btn" style="text-decoration: none;">
              <span>+ Book Another Trek ➔</span>
            </a>
          </div>
        </div>
      </div>

      <!-- SUMMARY METRICS STRIP -->
      <div class="bookings-metrics-grid animate-fade-in">
        <div class="booking-metric-card">
          <div class="booking-metric-icon" style="background: rgba(16, 185, 129, 0.1); color: #059669;">🎟️</div>
          <div class="booking-metric-info">
            <span class="booking-metric-label">Confirmed Bookings</span>
            <strong class="booking-metric-val">${state.bookings.length} Trek${state.bookings.length === 1 ? '' : 's'}</strong>
          </div>
        </div>

        <div class="booking-metric-card">
          <div class="booking-metric-icon" style="background: rgba(245, 158, 11, 0.1); color: #d97706;">💳</div>
          <div class="booking-metric-info">
            <span class="booking-metric-label">Total Amount Paid</span>
            <strong class="booking-metric-val">INR ${totalSpent.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        <div class="booking-metric-card">
          <div class="booking-metric-icon" style="background: rgba(59, 130, 246, 0.1); color: #2563eb;">👥</div>
          <div class="booking-metric-info">
            <span class="booking-metric-label">Travelers Confirmed</span>
            <strong class="booking-metric-val">${totalTravelers} Person${totalTravelers === 1 ? '' : 's'}</strong>
          </div>
        </div>

        <div class="booking-metric-card">
          <div class="booking-metric-icon" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">💬</div>
          <div class="booking-metric-info">
            <span class="booking-metric-label">WhatsApp Helpline</span>
            <strong class="booking-metric-val" style="font-size: 1.05rem;">+91 89206 32874</strong>
          </div>
        </div>
      </div>

      <!-- SEARCH & FILTER BAR -->
      <div class="packages-filter-bar-stitch" style="margin-bottom: 24px;">
        <div class="search-input-wrap filter-bar-search">
          <span class="search-input-icon">🔍</span>
          <input
            id="bookingSearchInput"
            class="stitch-input"
            placeholder="Search by package, booking ref (TZ-XXXXXX), payment ID, destination..."
            value="${escapeHtml(state.bookingSearchQuery || '')}"
          />
        </div>
        <button type="button" class="ghost-btn" id="refreshBookingsBtn" style="white-space: nowrap;">
          <span>🔄 Refresh List</span>
        </button>
      </div>

      <!-- BOOKINGS LIST -->
      <div class="bookings-list-container">
        ${
          bookingsList.length > 0
            ? bookingsList
                .map((b) => {
                  return `
                    <div class="booking-history-card animate-fade-in">
                      <div class="booking-card-top-header">
                        <div class="booking-card-title-group">
                          <h3>${escapeHtml(b.packageName)}</h3>
                          <span class="booking-card-subtitle">📍 ${escapeHtml(b.destination)} • Operator: <strong>${escapeHtml(b.company)}</strong></span>
                        </div>
                        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                          <span class="booking-card-badge-pill">
                            <span>🔒</span> <span>100% Payment Verified</span>
                          </span>
                        </div>
                      </div>

                      <div class="booking-card-main-body">
                        <div class="booking-meta-strip-grid">
                          <div class="booking-meta-item">
                            <span class="booking-meta-lbl">Booking Reference</span>
                            <span class="booking-meta-data" style="color: var(--forest); font-family: monospace;">${escapeHtml(b.bookingRef)}</span>
                          </div>
                          <div class="booking-meta-item">
                            <span class="booking-meta-lbl">Departure Batch</span>
                            <span class="booking-meta-data">🗓️ ${escapeHtml(b.preferredMonth || 'Upcoming Weekend')}</span>
                          </div>
                          <div class="booking-meta-item">
                            <span class="booking-meta-lbl">Lead Traveler</span>
                            <span class="booking-meta-data">👤 ${escapeHtml(b.leadName || 'Traveler')} (${escapeHtml(b.formattedPhone || b.leadPhone)})</span>
                          </div>
                          <div class="booking-meta-item">
                            <span class="booking-meta-lbl">Travelers</span>
                            <span class="booking-meta-data">👥 ${escapeHtml(String(b.travelerCount))} Person(s)</span>
                          </div>
                        </div>

                        <div class="booking-meta-strip-grid" style="background: rgba(0,0,0,0.02); border-color: rgba(0,0,0,0.06);">
                          <div class="booking-meta-item">
                            <span class="booking-meta-lbl">Razorpay Payment ID</span>
                            <span class="booking-meta-data" style="color: var(--accent); font-family: monospace; font-size: 0.84rem;">${escapeHtml(b.razorpayPaymentId || 'VERIFIED')}</span>
                          </div>
                          <div class="booking-meta-item">
                            <span class="booking-meta-lbl">Booking Date & Time</span>
                            <span class="booking-meta-data" style="font-size: 0.84rem;">${escapeHtml(b.bookingTime || 'Confirmed')}</span>
                          </div>
                          <div class="booking-meta-item">
                            <span class="booking-meta-lbl">Official Dispatch Desk</span>
                            <span class="booking-meta-data" style="font-size: 0.84rem; color: #065f46;">🏢 TripZen (+91 89206 32874)</span>
                          </div>
                          <div class="booking-meta-item">
                            <span class="booking-meta-lbl">Status</span>
                            <span class="booking-meta-data" style="color: #047857;">🟢 Confirmed & Active</span>
                          </div>
                        </div>

                        <div class="booking-card-footer-actions">
                          <div class="booking-amount-box">
                            <span class="booking-amount-lbl">Total Amount Paid</span>
                            <strong class="booking-amount-val">INR ${Number(b.amount).toLocaleString('en-IN')}</strong>
                          </div>

                          <div class="booking-btn-actions-row">
                            <a
                              href="${escapeHtml(b.directSendUrl || `https://api.whatsapp.com/send?phone=${escapeHtml(b.rawCleanPhone || '917982307329')}&text=${encodeURIComponent(b.whatsappMessage || '')}`)}"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="whatsapp-chat-official-btn"
                              style="background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); font-size: 0.85rem; padding: 9px 16px; font-weight: 800;"
                              title="Open full booking voucher on WhatsApp"
                            >
                              <span>💬 Open WhatsApp Voucher</span>
                            </a>
                            ${
                              b.itineraryUrl
                                ? `
                                  <a
                                    href="${escapeHtml(b.itineraryUrl)}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="ghost-btn"
                                    style="padding: 9px 15px; font-size: 0.85rem; font-weight: 700; text-decoration: none;"
                                  >
                                    📄 Itinerary & Guide
                                  </a>
                                `
                                : ''
                            }
                            <button
                              type="button"
                              class="whatsapp-copy-btn"
                              style="padding: 9px 14px;"
                              data-copy-booking-msg="${escapeHtml(b.whatsappMessage || '')}"
                              title="Copy receipt text to clipboard"
                            >
                              📋 Copy Text
                            </button>
                            <a
                              href="${escapeHtml(b.supportChatUrl || 'https://api.whatsapp.com/send?phone=918920632874')}"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="ghost-btn"
                              style="padding: 9px 14px; font-size: 0.85rem;"
                              title="Contact TripZen official support"
                            >
                              📞 Support
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  `;
                })
                .join('')
            : `
              <div style="background: var(--surface); padding: 56px 24px; border-radius: var(--radius-xl); text-align: center; border: 1px solid var(--surface-border);">
                <div style="font-size: 3rem; margin-bottom: 12px;">🏕️</div>
                <h2 style="font-size: 1.4rem; color: var(--ink); margin-bottom: 8px;">No Bookings Found</h2>
                <p style="color: var(--muted); max-width: 480px; margin: 0 auto 24px auto; font-size: 0.92rem; line-height: 1.6;">
                  ${currentSearch ? 'No reservations matched your search query. Try clearing the search bar.' : 'You haven’t booked any Himalayan expeditions yet. Explore our curated packages and reserve your summit today!'}
                </p>
                <a href="#/packages" class="primary-btn" style="text-decoration: none; padding: 12px 28px; font-size: 0.95rem;">
                  <span>📦 Explore Curated Packages ➔</span>
                </a>
              </div>
            `
        }
      </div>
    </div>
  `;
}

function aboutPage() {
  return `
    <div class="curate-wrapper animate-fade-in">
      <div class="page-header-stitch">
        <h1>About TripZen</h1>
        <p>Connecting compatible adventurers for shared mountain journeys and vacations.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 32px;">
        <div class="curate-form-card">
          <h3>🎯 Intentional Matching</h3>
          <p style="color: var(--text-body); font-size: 0.95rem; margin-top: 8px;">
            Matches stay hidden until destination and dates are selected. That ensures every profile you see is genuinely planning the same journey.
          </p>
        </div>
        <div class="curate-form-card">
          <h3>🤝 Split & Save</h3>
          <p style="color: var(--text-body); font-size: 0.95rem; margin-top: 8px;">
            Create shared-cost group trips to divide logistics and camp costs with other vetted travelers.
          </p>
        </div>
        <div class="curate-form-card">
          <h3>🔒 Verified & Safe</h3>
          <p style="color: var(--text-body); font-size: 0.95rem; margin-top: 8px;">
            Coordinate in real-time chat, shortlist operator packages, and secure bookings safely inside TripZen.
          </p>
        </div>
      </div>
    </div>
  `;
}

function pageContent() {
  const route = normalizedRoute();
  if (route === '/admin') return adminPanelPage();
  if (route === '/auth') return authPage();
  if (route === '/profile') return profilePage();
  if (route === '/preferences') return preferencesPage();
  if (route === '/matches') return matchesPage();
  if (route.startsWith('/match/')) return matchProfilePage();
  if (route === '/chat') return chatPage();
  if (route === '/join-book' || route === '/packages') return joinBookPage();
  if (route === '/groups' || route === '/cost-sharing') return costSharingPage();
  if (route === '/bookings' || route === '/my-bookings') return bookingsPage();
  if (route === '/about') return aboutPage();
  return authPage();
}

function renderApp() {
  const root = document.getElementById('root');
  const route = normalizedRoute();

  let mainHtml = '';
  if (isDashboardRoute(route)) {
    mainHtml = dashboardShell(pageContent());
  } else {
    mainHtml = `
      <div>
        ${state.notificationMessage ? `<div class="floating-notification">${escapeHtml(state.notificationMessage)}</div>` : ''}
        ${topbar()}
        ${state.globalStatus ? `<div class="global-banner ${state.globalStatusType || ''}">${escapeHtml(state.globalStatus)}</div>` : ''}
        <main>${pageContent()}</main>
      </div>
    `;
  }

  root.innerHTML = `
    ${mainHtml}
    ${renderCheckoutModal()}
    ${renderItineraryModal()}
  `;

  hydrateUI();
}

/* ==========================================================================
   HYDRATION & EVENT HANDLING (LOGIC FULLY PRESERVED)
   ========================================================================== */

function hydratePreferenceFormDefaults() {
  const form = document.getElementById('preferencesForm');
  if (!form) return;

  if (form.destination && state.profile?.destination) form.destination.value = state.profile.destination;
  if (form.travelStyle && (state.profile?.travelStyle || state.user?.travelStyle)) {
    form.travelStyle.value = state.profile?.travelStyle || state.user?.travelStyle;
  }
  if (form.fullName && state.user?.fullName) form.fullName.value = state.user.fullName;
  if (form.bio && state.profile?.bio) form.bio.value = state.profile.bio;

  const profileImageHidden = document.getElementById('profileImageHiddenInput');
  const profileImagePreview = document.getElementById('profileImagePreview');
  const cameraIcon = document.getElementById('cameraIconPlaceholder');

  const userImg = state.pendingProfileImage || state.user?.profileImage || '';
  if (userImg) {
    if (profileImageHidden) profileImageHidden.value = userImg;
    if (profileImagePreview) {
      profileImagePreview.src = userImg;
      profileImagePreview.style.display = 'block';
    }
    if (cameraIcon) cameraIcon.style.display = 'none';
  }
}

async function loadSession() {
  const userId = localStorage.getItem('tripzenUserId');
  if (!userId) {
    state.user = null;
    state.profile = null;
    state.loading = false;
    return;
  }

  try {
    const data = await api(`/api/session/${userId}`);
    state.user = data.user || null;
    state.profile = data.profile || null;
  } catch (error) {
    localStorage.removeItem('tripzenUserId');
    state.user = null;
    state.profile = null;
  } finally {
    state.loading = false;
  }
}

async function loadMatches() {
  if (!state.user) return;

  try {
    const data = await api(`/api/matches/${state.user.id}`);
    state.matches = data.matches || [];
    if (state.matches.some((match) => match.matchProfileId === state.selectedMatchProfileId) === false) {
      state.selectedMatchProfileId = state.matches[0] ? state.matches[0].matchProfileId : '';
    }
    state.matchStatus = state.matches.length
      ? ''
      : 'No matches yet for this trip. Click "Load Demo Travelers" to populate instant buddies.';
  } catch (error) {
    try {
      const fallback = await api('/api/matches');
      state.matches = fallback.matches || [];
      if (state.matches.some((match) => match.matchProfileId === state.selectedMatchProfileId) === false) {
        state.selectedMatchProfileId = state.matches[0] ? state.matches[0].matchProfileId : '';
      }
    } catch (e) {
      state.matches = [];
    }
    state.matchStatus = error.message;
  }
}

async function loadTripGroups(destination = state.groupDestinationFilter) {
  const userId = state.user?.id || 'all';
  try {
    const params = new URLSearchParams();
    if (destination && destination !== 'All') params.append('destination', destination);
    if (state.groupHideFull) params.append('hideFull', 'true');
    if (state.groupActiveTab) params.append('tab', state.groupActiveTab);
    if (state.groupSearchQuery) params.append('search', state.groupSearchQuery);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const data = await api(`/api/trip-groups/${userId}${queryString}`);
    state.tripGroups = data.groups || [];
  } catch (error) {
    state.groupStatusType = 'error';
    state.groupStatus = error.message;
    state.tripGroups = [];
  }
}

async function loadBookings() {
  try {
    state.bookingsLoading = true;
    const userId = state.user?.id;
    if (!userId) {
      state.bookings = [];
      return;
    }
    const data = await api(`/api/bookings/user/${userId}`);
    state.bookings = (data && data.bookings) ? data.bookings : [];
  } catch (error) {
    state.bookings = [];
  } finally {
    state.bookingsLoading = false;
  }
}

async function loadAdminBookings() {
  if (!isAdminUser()) return;
  try {
    state.adminBookingsLoading = true;
    renderApp();
    const data = await api('/api/admin/bookings');
    state.adminBookings = (data && data.bookings) ? data.bookings : [];
    state.adminTotals = (data && data.totals) ? data.totals : null;
  } catch (error) {
    state.adminStatusMessage = error.message || 'Failed to load administrator bookings.';
    state.adminStatusType = 'error';
  } finally {
    state.adminBookingsLoading = false;
    renderApp();
  }
}

function adminPanelPage() {
  if (!isAdminUser()) {
    window.location.href = '/admin.html';
    return `
      <div class="animate-fade-in" style="max-width: 520px; margin: 60px auto; padding: 32px; background: var(--surface); border: 1px solid var(--surface-border); border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 12px;">🗄️</div>
        <h2 style="font-size: 1.5rem; color: var(--ink); margin-bottom: 8px;">Opening RAW Data DB...</h2>
        <p style="color: var(--muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 24px;">
          Redirecting you to the TripZen RAW Database &amp; Admin Management Panel.
        </p>
        <a href="/admin.html" class="primary-btn" style="padding: 12px 24px; font-weight: 700; text-decoration: none; display: inline-block;">
          <span>Open RAW Data DB ➔</span>
        </a>
      </div>
    `;
  }

  const query = (state.adminSearchQuery || '').toLowerCase().trim();
  const statusFilter = state.adminStatusFilter || 'All';
  const destinationFilter = state.adminDestinationFilter || 'All';

  const filtered = (state.adminBookings || []).filter((b) => {
    if (statusFilter !== 'All') {
      const bStatus = (b.bookingStatus || b.status || '').toLowerCase();
      if (bStatus !== statusFilter.toLowerCase()) return false;
    }
    if (destinationFilter !== 'All') {
      if ((b.destination || '').toLowerCase() !== destinationFilter.toLowerCase()) return false;
    }
    if (!query) return true;
    return (
      (b.bookingRef || '').toLowerCase().includes(query) ||
      (b.leadName || '').toLowerCase().includes(query) ||
      (b.leadPhone || '').toLowerCase().includes(query) ||
      (b.leadEmail || '').toLowerCase().includes(query) ||
      (b.packageName || '').toLowerCase().includes(query) ||
      (b.destination || '').toLowerCase().includes(query) ||
      (b.company || '').toLowerCase().includes(query) ||
      (b.razorpayPaymentId || '').toLowerCase().includes(query) ||
      (b.adminNotes || '').toLowerCase().includes(query)
    );
  });

  const totals = state.adminTotals || {
    totalRevenue: filtered.reduce((sum, b) => sum + (Number(b.amount) || 0), 0),
    totalBookings: filtered.length,
    totalTravelers: filtered.reduce((sum, b) => sum + (Number(b.travelerCount) || 1), 0),
    confirmedCount: filtered.filter((b) => (b.bookingStatus || '').toLowerCase() === 'confirmed').length,
  };

  return `
    <div class="animate-fade-in admin-panel-wrapper">
      <div class="page-header-stitch">
        <div class="page-header-row">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="background: rgba(232, 135, 58, 0.15); color: var(--accent); padding: 4px 10px; border-radius: 999px; font-size: 0.78rem; font-weight: 800; letter-spacing: 0.5px;">ADMIN CONTROL DESK</span>
              <span style="font-size: 0.8rem; color: var(--muted);">• Only visible to you</span>
            </div>
            <h1>TripZen Booking & Order Operations</h1>
            <p>Monitor all customer bookings, manage reservation statuses, review Razorpay transaction IDs, and dispatch WhatsApp vouchers.</p>
          </div>
          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <button type="button" class="ghost-btn" id="refreshAdminBookingsBtn" style="white-space: nowrap;">
              <span>🔄 Refresh Orders</span>
            </button>
            <a href="/whatsapp-link.html" target="_blank" class="ghost-btn" style="white-space: nowrap; text-decoration: none;">
              <span>💬 WhatsApp Gateway</span>
            </a>
            <a href="/admin.html" target="_blank" class="ghost-btn" style="white-space: nowrap; text-decoration: none;">
              <span>⚙️ Raw Data DB</span>
            </a>
          </div>
        </div>
      </div>

      <!-- KPI METRICS STRIP -->
      <div class="bookings-metrics-grid animate-fade-in" style="margin-bottom: 24px;">
        <div class="booking-metric-card" style="border-left: 4px solid #059669;">
          <div class="booking-metric-icon" style="background: rgba(16, 185, 129, 0.1); color: #059669;">💳</div>
          <div class="booking-metric-info">
            <span class="booking-metric-label">Total Revenue Collected</span>
            <strong class="booking-metric-val">INR ${(totals.totalRevenue || 0).toLocaleString('en-IN')}</strong>
          </div>
        </div>

        <div class="booking-metric-card" style="border-left: 4px solid #2563eb;">
          <div class="booking-metric-icon" style="background: rgba(59, 130, 246, 0.1); color: #2563eb;">🎟️</div>
          <div class="booking-metric-info">
            <span class="booking-metric-label">Total Reservations</span>
            <strong class="booking-metric-val">${state.adminBookings.length} Order${state.adminBookings.length === 1 ? '' : 's'}</strong>
          </div>
        </div>

        <div class="booking-metric-card" style="border-left: 4px solid #d97706;">
          <div class="booking-metric-icon" style="background: rgba(245, 158, 11, 0.1); color: #d97706;">👥</div>
          <div class="booking-metric-info">
            <span class="booking-metric-label">Total Travelers</span>
            <strong class="booking-metric-val">${totals.totalTravelers || 0} Headcount</strong>
          </div>
        </div>

        <div class="booking-metric-card" style="border-left: 4px solid #10b981;">
          <div class="booking-metric-icon" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">🟢</div>
          <div class="booking-metric-info">
            <span class="booking-metric-label">Confirmed & Active</span>
            <strong class="booking-metric-val">${totals.confirmedCount || 0} Bookings</strong>
          </div>
        </div>
      </div>

      <!-- SEARCH & FILTER TOOLBAR -->
      <div class="packages-filter-bar-stitch" style="margin-bottom: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
        <div class="search-input-wrap filter-bar-search" style="flex: 1 1 320px;">
          <span class="search-input-icon">🔍</span>
          <input
            id="adminSearchInput"
            class="stitch-input"
            placeholder="Search traveler name, phone, email, booking ref (TZ-...), payment ID, destination..."
            value="${escapeHtml(state.adminSearchQuery || '')}"
          />
        </div>

        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <select id="adminStatusFilterSelect" class="stitch-input" style="width: auto; min-width: 150px; height: 42px; font-weight: 600;">
            <option value="All" ${statusFilter === 'All' ? 'selected' : ''}>📌 Status: All</option>
            <option value="confirmed" ${statusFilter === 'confirmed' ? 'selected' : ''}>🟢 Confirmed</option>
            <option value="in-progress" ${statusFilter === 'in-progress' ? 'selected' : ''}>🔵 In Progress</option>
            <option value="completed" ${statusFilter === 'completed' ? 'selected' : ''}>🏁 Completed</option>
            <option value="cancelled" ${statusFilter === 'cancelled' ? 'selected' : ''}>🔴 Cancelled</option>
            <option value="refunded" ${statusFilter === 'refunded' ? 'selected' : ''}>💸 Refunded</option>
          </select>

          <select id="adminDestFilterSelect" class="stitch-input" style="width: auto; min-width: 170px; height: 42px; font-weight: 600;">
            <option value="All" ${destinationFilter === 'All' ? 'selected' : ''}>📍 Destination: All</option>
            ${DESTINATIONS.map((d) => `<option value="${escapeHtml(d.name)}" ${destinationFilter === d.name ? 'selected' : ''}>${escapeHtml(d.name)}</option>`).join('')}
          </select>
        </div>
      </div>

      ${state.adminStatusMessage ? `<div class="status ${state.adminStatusType || 'info'}" style="margin-bottom: 16px;">${escapeHtml(state.adminStatusMessage)}</div>` : ''}

      <!-- ORDERS LIST CONTAINER -->
      <div class="admin-orders-container">
        ${
          state.adminBookingsLoading
            ? `<div style="text-align: center; padding: 48px; color: var(--muted);">⏳ Loading customer orders...</div>`
            : filtered.length > 0
              ? filtered
                  .map((b) => {
                    const currentStatus = (b.bookingStatus || b.status || 'confirmed').toLowerCase();
                    const cleanPhone = (b.leadPhone || '').replace(/\D/g, '');
                    const rawCleanPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
                    const waChatUrl = `https://api.whatsapp.com/send?phone=${rawCleanPhone}&text=${encodeURIComponent('Hi ' + (b.leadName || 'Traveler') + ', this is TripZen Operations regarding your booking ' + b.bookingRef + ' for ' + b.packageName + '.')}`;

                    return `
                      <div class="admin-order-card animate-fade-in" data-booking-id="${escapeHtml(b.id)}">
                        <div class="admin-order-card-header">
                          <div class="admin-order-header-left">
                            <span class="admin-ref-pill">${escapeHtml(b.bookingRef)}</span>
                            <span class="admin-time-stamp">🕒 ${escapeHtml(b.bookingTime || 'Recently')}</span>
                            ${b.whatsappDispatched ? `<span class="admin-wa-badge">✓ WhatsApp Sent</span>` : `<span class="admin-wa-pending-badge">⏳ WhatsApp Pending</span>`}
                          </div>
                          <div class="admin-order-header-right">
                            <div class="admin-status-control">
                              <span style="font-size: 0.8rem; font-weight: 700; color: var(--muted); margin-right: 6px;">Status:</span>
                              <select class="admin-status-dropdown" data-change-status-id="${escapeHtml(b.id)}">
                                <option value="confirmed" ${currentStatus === 'confirmed' ? 'selected' : ''}>🟢 Confirmed</option>
                                <option value="in-progress" ${currentStatus === 'in-progress' ? 'selected' : ''}>🔵 In Progress</option>
                                <option value="completed" ${currentStatus === 'completed' ? 'selected' : ''}>🏁 Completed</option>
                                <option value="cancelled" ${currentStatus === 'cancelled' ? 'selected' : ''}>🔴 Cancelled</option>
                                <option value="refunded" ${currentStatus === 'refunded' ? 'selected' : ''}>💸 Refunded</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="admin-order-body-grid">
                          <!-- Column 1: Customer Contact -->
                          <div class="admin-order-col">
                            <div class="admin-col-label">👤 CUSTOMER DETAILS</div>
                            <div class="admin-user-title">${escapeHtml(b.leadName || 'Traveler')}</div>
                            <div class="admin-contact-item">
                              <span>📱 Phone:</span>
                              <strong>${escapeHtml(b.formattedPhone || b.leadPhone || 'N/A')}</strong>
                            </div>
                            <div class="admin-contact-item">
                              <span>✉️ Email:</span>
                              <span>${escapeHtml(b.leadEmail || b.userEmail || 'Direct / Guest')}</span>
                            </div>
                            <div class="admin-contact-actions" style="margin-top: 10px; display: flex; gap: 8px;">
                              <a href="${escapeHtml(waChatUrl)}" target="_blank" rel="noopener noreferrer" class="admin-action-btn wa-btn">
                                💬 WhatsApp Chat
                              </a>
                              <a href="tel:${escapeHtml(b.leadPhone || '')}" class="admin-action-btn call-btn">
                                📞 Call
                              </a>
                            </div>
                          </div>

                          <!-- Column 2: Trek & Batch -->
                          <div class="admin-order-col">
                            <div class="admin-col-label">🏔️ TREK & LOGISTICS</div>
                            <div class="admin-package-title">${escapeHtml(b.packageName)}</div>
                            <div class="admin-contact-item">
                              <span>📍 Destination:</span>
                              <strong>${escapeHtml(b.destination)}</strong>
                            </div>
                            <div class="admin-contact-item">
                              <span>🏢 Operator:</span>
                              <strong>${escapeHtml(b.company || 'TripZen Official')}</strong>
                            </div>
                            <div class="admin-contact-item">
                              <span>🗓️ Batch:</span>
                              <span>${escapeHtml(b.preferredMonth || 'Upcoming Weekend')}</span>
                            </div>
                            <div class="admin-contact-item">
                              <span>👥 Travelers:</span>
                              <strong>${escapeHtml(String(b.travelerCount))} Person(s)</strong>
                            </div>
                          </div>

                          <!-- Column 3: Payment & Accounting -->
                          <div class="admin-order-col">
                            <div class="admin-col-label">💳 PAYMENT & REVENUE</div>
                            <div class="admin-price-amount">INR ${Number(b.amount).toLocaleString('en-IN')}</div>
                            <div class="admin-contact-item">
                              <span>Razorpay ID:</span>
                              <span style="font-family: monospace; font-size: 0.8rem; color: var(--accent);">${escapeHtml(b.razorpayPaymentId || 'N/A')}</span>
                            </div>
                            <div class="admin-contact-item">
                              <span>Payment Status:</span>
                              <span style="color: #059669; font-weight: 700;">${escapeHtml(b.status || 'paid')}</span>
                            </div>
                            <div class="admin-contact-item">
                              <span>User ID:</span>
                              <span style="font-family: monospace; font-size: 0.78rem; color: var(--muted);">${escapeHtml(b.userId || 'Guest')}</span>
                            </div>
                          </div>
                        </div>

                        <!-- Admin Notes & Action Bar -->
                        <div class="admin-order-footer">
                          <div class="admin-notes-wrap">
                            <span class="admin-notes-lbl">📝 Admin Note / Logistics:</span>
                            <div style="display: flex; gap: 8px; align-items: center;">
                              <input
                                class="stitch-input admin-note-input"
                                data-note-input-id="${escapeHtml(b.id)}"
                                placeholder="Add notes (e.g. Guide Ramesh assigned, pick up at Rishikesh 6 AM...)"
                                value="${escapeHtml(b.adminNotes || '')}"
                              />
                              <button type="button" class="ghost-btn admin-save-note-btn" data-save-note-id="${escapeHtml(b.id)}" style="white-space: nowrap; padding: 8px 14px; font-size: 0.82rem;">
                                💾 Save
                              </button>
                            </div>
                          </div>

                          <div class="admin-footer-btn-strip">
                            <button type="button" class="ghost-btn admin-resend-wa-btn" data-resend-wa-id="${escapeHtml(b.id)}" title="Re-dispatch official WhatsApp confirmation">
                              🔁 Resend WhatsApp
                            </button>
                            ${
                              b.itineraryUrl
                                ? `
                                  <a href="${escapeHtml(b.itineraryUrl)}" target="_blank" rel="noopener noreferrer" class="ghost-btn" style="text-decoration: none;" title="Open official itinerary guide">
                                    📄 Itinerary
                                  </a>
                                `
                                : ''
                            }
                            <button type="button" class="ghost-btn admin-delete-btn" data-delete-booking-id="${escapeHtml(b.id)}" style="color: #dc2626;" title="Delete this booking record">
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    `;
                  })
                  .join('')
              : `
                <div style="background: var(--surface); padding: 56px 24px; border-radius: var(--radius-xl); text-align: center; border: 1px solid var(--surface-border);">
                  <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
                  <h2 style="font-size: 1.4rem; color: var(--ink); margin-bottom: 8px;">No Reservations Found</h2>
                  <p style="color: var(--muted); max-width: 480px; margin: 0 auto; font-size: 0.92rem;">
                    No bookings matched your search or filters. Clear the search bar or reset the status dropdown.
                  </p>
                </div>
              `
        }
      </div>
    </div>
  `;
}

async function markConversationAsRead(conversationId) {
  if (!conversationId || !state.profile) return;

  try {
    await api(`/api/conversations/${conversationId}/read`, 'POST', {
      profileId: state.profile.id,
    });
  } catch (error) {
    // Ignore
  }
}

async function loadConversations(options = {}) {
  const { notify = true } = options;
  if (!state.user || !state.profile) {
    state.conversations = [];
    state.activeConversationId = '';
    state.messages = [];
    updateUnreadCount();
    return;
  }

  try {
    const previousConversations = state.conversations;
    const data = await api(`/api/conversations/${state.user.id}`);
    state.conversations = data.conversations || [];
    maybeNotifyAboutIncomingMessages(previousConversations, state.conversations);

    if (!state.activeConversationId && state.conversations.length) {
      state.activeConversationId = state.conversations[0].id;
    }

    if (
      state.activeConversationId &&
      state.conversations.some((conversation) => conversation.id === state.activeConversationId) === false
    ) {
      state.activeConversationId = state.conversations[0] ? state.conversations[0].id : '';
    }

    if (state.activeConversationId) {
      await loadMessages(state.activeConversationId);
      await loadPackageSelections(state.activeConversationId);
    } else {
      state.messages = [];
      state.packageSelections = [];
    }
    updateUnreadCount();
    if (!initialConversationLoadComplete) {
      initialConversationLoadComplete = true;
    } else if (!notify) {
      state.notificationMessage = '';
    }
  } catch (error) {
    state.chatStatus = error.message;
    state.conversations = [];
    state.messages = [];
    updateUnreadCount();
  }
}

async function loadMessages(conversationId) {
  if (!conversationId) {
    state.messages = [];
    return;
  }

  try {
    const previousMessages = state.messages;
    const data = await api(`/api/messages/${conversationId}`);
    state.messages = data.messages || [];
    if (
      state.profile &&
      state.messages.some((message) => message.senderProfileId !== state.profile.id) &&
      hasMessageListChanged(previousMessages, state.messages)
    ) {
      await markConversationAsRead(conversationId);
      const dataAfterRead = await api(`/api/conversations/${state.user.id}`);
      state.conversations = dataAfterRead.conversations || [];
      updateUnreadCount();
    }
  } catch (error) {
    state.chatStatus = error.message;
    state.messages = [];
  }
}

async function loadPackageSelections(conversationId) {
  if (!conversationId) {
    state.packageSelections = [];
    return;
  }

  try {
    const data = await api(`/api/package-selections/${conversationId}`);
    state.packageSelections = data.selections || [];
  } catch (error) {
    state.packageStatus = error.message;
    state.packageSelections = [];
  }
}

let chatPollTimer = null;

function stopChatPoll() {
  if (chatPollTimer) {
    clearInterval(chatPollTimer);
    chatPollTimer = null;
  }
}

function startFastChatPoll() {
  stopChatPoll();
  if (state.route !== '/chat' || !state.activeConversationId || !state.user || !state.profile) {
    return;
  }

  chatPollTimer = setInterval(async () => {
    if (state.route !== '/chat' || !state.activeConversationId) {
      stopChatPoll();
      return;
    }

    try {
      const activeConvId = state.activeConversationId;
      const res = await api(`/api/messages/${activeConvId}`);
      const latestMsgs = res.messages || [];

      // Find any incoming messages not currently rendered
      const existingIds = new Set(state.messages.map((m) => m.id));
      const newIncoming = latestMsgs.filter((m) => !existingIds.has(m.id));

      if (newIncoming.length > 0) {
        newIncoming.forEach((msg) => {
          state.messages.push(msg);
          const isMine = state.profile && msg.senderProfileId === state.profile.id;
          appendChatMessageDOM(msg, isMine);
        });

        // Mark as read in background without UI blocking
        markConversationAsRead(activeConvId).catch(() => {});
        const lastMsg = newIncoming[newIncoming.length - 1];
        updateConversationSnippetInDOM(activeConvId, lastMsg.text, lastMsg.createdAt);
      }
    } catch (e) {
      // Ignore background sync errors
    }
  }, 1000); // 1-second ultra-fast live chat updates!
}

function stopLiveSync() {
  if (liveSyncTimer) {
    clearInterval(liveSyncTimer);
    liveSyncTimer = null;
  }
  stopChatPoll();
}

function startLiveSync() {
  stopLiveSync();

  if (!routeNeedsTripData() || !state.user || !state.profile) {
    return;
  }

  if (state.route === '/chat') {
    startFastChatPoll();
  }

  liveSyncTimer = setInterval(async () => {
    if (pollInFlight) return;
    pollInFlight = true;

    try {
      // While in chat room, DO NOT rerender entire page - keeps typing input smooth and focused
      if (state.route === '/chat') {
        return;
      }

      const previousConversations = state.conversations;
      const previousMessages = state.messages;
      const previousGroups = JSON.stringify((state.tripGroups || []).map((group) => ({
        id: group.id,
        memberCount: group.memberCount,
        pending: (group.pendingRequests || []).length,
      })));
      await loadTripGroups();
      await loadConversations({ notify: true });
      const nextGroups = JSON.stringify((state.tripGroups || []).map((group) => ({
        id: group.id,
        memberCount: group.memberCount,
        pending: (group.pendingRequests || []).length,
      })));

      if (
        previousGroups !== nextGroups ||
        hasConversationSnapshotChanged(previousConversations, state.conversations) ||
        hasMessageListChanged(previousMessages, state.messages)
      ) {
        renderApp();
      }
    } finally {
      pollInFlight = false;
    }
  }, CHAT_POLL_INTERVAL);
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  if (payload.email) {
    payload.email = String(payload.email).trim().toLowerCase();
    state.authEmailDraft = payload.email;
    payload.username = payload.email;
    payload.identifier = payload.email;
  }
  if (payload.password) {
    payload.password = String(payload.password).trim();
  }

  try {
    const endpoint = state.authMode === 'signup' ? '/api/register' : '/api/login';
    let data;
    try {
      data = await api(endpoint, 'POST', payload);
    } catch (err) {
      // If user attempted signup on an existing account, auto-attempt login seamlessly with the same credentials
      if (state.authMode === 'signup' && (err.message.includes('already exists') || err.message.includes('exist'))) {
        data = await api('/api/login', 'POST', {
          email: payload.email,
          password: payload.password,
        });
      } else {
        throw err;
      }
    }

    localStorage.setItem('tripzenUserId', data.user.id);
    state.user = data.user;
    state.profile = data.profile || null;
    state.authStatusType = 'success';
    state.authStatus = 'Logged in successfully! Welcome back.';
    requestBrowserNotificationPermission();

    // Smart routing based on user state
    if (data.hasPreferences || (data.profile && data.profile.destination)) {
      state.route = '/matches';
      window.location.hash = '/matches';
    } else if (state.user && state.user.fullName && (state.user.profileCompleteness || 0) >= 40) {
      state.route = '/preferences';
      window.location.hash = '/preferences';
    } else {
      state.route = '/profile';
      window.location.hash = '/profile';
    }
    renderApp();
  } catch (error) {
    if (state.authMode === 'signup' && (error.message.includes('already exists') || error.message.includes('exist'))) {
      state.authMode = 'login';
      state.authStatusType = 'info';
      state.authStatus = 'Account found! Please enter your password to log in.';
    } else {
      state.authStatusType = 'error';
      state.authStatus = error.message;
    }
    renderApp();
  }
}

async function handleProfileSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = Object.fromEntries(new FormData(form).entries());

  const chosenProfileImage =
    state.pendingProfileImage ||
    (document.getElementById('profileImageHiddenInput') ? document.getElementById('profileImageHiddenInput').value : '') ||
    state.user?.profileImage ||
    '';

  const activeInterests = state.selectedInterests && state.selectedInterests.length
    ? state.selectedInterests
    : Array.from(document.querySelectorAll('.interest-tag-pill.active')).map((btn) => btn.getAttribute('data-interest-name') || btn.textContent.trim());

  try {
    const data = await api('/api/profile', 'POST', {
      ...payload,
      userId: state.user.id,
      profileImage: chosenProfileImage,
      interests: activeInterests,
    });

    state.user = data.user || state.user;
    if (data.profile) state.profile = data.profile;
    state.pendingProfileImage = '';
    state.profileStatusType = 'success';
    state.profileStatus = 'Profile saved successfully! Now choose your destination & dates.';
    renderApp();
    setTimeout(() => {
      routeTo('/preferences');
    }, 450);
  } catch (error) {
    state.profileStatusType = 'error';
    state.profileStatus = error.message;
    renderApp();
  }
}

async function handlePreferencesSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = Object.fromEntries(new FormData(form).entries());

  const chosenProfileImage =
    state.pendingProfileImage ||
    (document.getElementById('profileImageHiddenInput') ? document.getElementById('profileImageHiddenInput').value : '') ||
    state.user?.profileImage ||
    '';

  try {
    const data = await api('/api/preferences', 'POST', {
      ...payload,
      userId: state.user.id,
      profileImage: chosenProfileImage,
    });
    state.user = data.user || state.user;
    state.profile = data.profile;
    state.pendingProfileImage = '';
    state.preferenceStatusType = 'success';
    state.preferenceStatus = 'Profile & preferences saved! Loading your perfect matches.';
    requestBrowserNotificationPermission();
    await loadMatches();
    routeTo('/matches');
  } catch (error) {
    state.preferenceStatusType = 'error';
    state.preferenceStatus = error.message;
    renderApp();
    hydratePreferenceFormDefaults();
  }
}

async function handleConnect(profileId) {
  const match = state.matches.find((item) => item.matchProfileId === profileId);
  if (!match || !state.profile) return;

  try {
    const data = await api('/api/booking', 'POST', {
      requesterProfileId: state.profile.id,
      targetProfileId: match.matchProfileId,
      plannedDestination: state.profile.destination,
      message: `Hi ${match.traveler.fullName}, I am also planning ${state.profile.destination}. Let's chat and plan together!`,
    });
    state.connectStatus = `Connected with ${match.traveler.fullName}. Moving to chat!`;
    state.chatStatus = `You are now connected with ${match.traveler.fullName}.`;
    if (data.conversation && data.conversation.id) {
      state.activeConversationId = data.conversation.id;
    }
    state.chatDraft = '';
    await loadConversations();
    routeTo('/chat');
  } catch (error) {
    state.connectStatus = error.message;
    routeTo('/chat');
  }
}

async function handleSeedDemo() {
  try {
    await api('/api/seed-demo', 'POST');
    await loadSession();
    await loadMatches();
    await loadTripGroups();
    await loadConversations();
    renderApp();
  } catch (error) {
    state.matchStatus = error.message;
    renderApp();
  }
}

async function handleCreateGroupTrip(event) {
  if (event && event.preventDefault) event.preventDefault();
  const form = document.getElementById('createGroupModalForm') || (event ? event.currentTarget : null);
  if (!form) return;

  const payload = Object.fromEntries(new FormData(form).entries());

  if (!state.user) {
    state.authStatus = 'Please sign in to publish an agency group trip.';
    state.authStatusType = 'info';
    routeTo('/auth');
    return;
  }

  const profileId = state.profile?.id || state.user.id;

  try {
    const data = await api('/api/trip-groups', 'POST', {
      organizerProfileId: profileId,
      agencyName: payload.agencyName || state.user.fullName || 'Tour Agency',
      title: payload.title,
      destination: payload.destination || 'Kedarnath',
      batchDates: payload.batchDates || 'Upcoming Weekend',
      pricePerPerson: Number(payload.pricePerPerson || 4999),
      maxMembers: Number(payload.maxMembers || 6),
      inclusions: payload.inclusions || 'Stay + Meals + Guide + Permits',
      contactPhone: payload.contactPhone || '+91 89206 32874',
    });

    state.groupStatusType = 'success';
    state.groupStatus = `🎉 ${data.message || 'Group trip batch successfully published!'}`;
    state.showCreateGroupModal = false;
    state.groupTitle = '';

    if (data.conversation && data.conversation.id) {
      state.activeConversationId = data.conversation.id;
    }

    await loadTripGroups();
    await loadConversations();
    renderApp();
  } catch (error) {
    state.groupStatusType = 'error';
    state.groupStatus = error.message;
    renderApp();
  }
}

async function handleJoinGroup(groupId) {
  if (!state.user || !state.profile) {
    state.authStatus = 'Please sign in or complete your profile to join a group trip.';
    state.authStatusType = 'info';
    routeTo('/auth');
    return;
  }

  try {
    const data = await api(`/api/trip-groups/${groupId}/join`, 'POST', {
      requesterProfileId: state.profile.id,
    });
    state.groupStatusType = 'success';
    state.groupStatus = data.message || '🎉 You joined the group trip squad!';
    if (data.conversation && data.conversation.id) {
      state.activeConversationId = data.conversation.id;
    }
    await loadTripGroups();
    await loadConversations();
    renderApp();
  } catch (error) {
    state.groupStatusType = 'error';
    state.groupStatus = error.message;
    renderApp();
  }
}

async function handleLeaveGroup(groupId) {
  if (!state.profile) return;
  const confirmed = confirm('Are you sure you want to leave this squad? Your reserved seat will open up for other travelers.');
  if (!confirmed) return;

  try {
    const data = await api(`/api/trip-groups/${groupId}/leave`, 'POST', {
      profileId: state.profile.id,
    });
    state.groupStatusType = 'info';
    state.groupStatus = data.message || 'You left the squad.';
    await loadTripGroups();
    await loadConversations();
    renderApp();
  } catch (error) {
    state.groupStatusType = 'error';
    state.groupStatus = error.message;
    renderApp();
  }
}

async function handleDeleteGroup(groupId) {
  const confirmed = confirm('Are you sure you want to delete this group trip batch? This will remove the squad and close registrations.');
  if (!confirmed) return;

  try {
    const data = await api(`/api/trip-groups/${groupId}`, 'DELETE', {
      organizerProfileId: state.profile?.id || '',
      userId: state.user?.id || '',
    });
    state.groupStatusType = 'success';
    state.groupStatus = data.message || 'Group trip batch deleted.';
    await loadTripGroups();
    await loadConversations();
    renderApp();
  } catch (error) {
    state.groupStatusType = 'error';
    state.groupStatus = error.message;
    renderApp();
  }
}

async function handleRespondJoinRequest(requestId, action) {
  if (!state.profile) return;

  try {
    const data = await api(`/api/join-requests/${requestId}/respond`, 'POST', {
      organizerProfileId: state.profile.id,
      action,
    });
    state.groupStatusType = 'success';
    state.groupStatus = action === 'accept' ? 'Traveler accepted into the group.' : 'Join request rejected.';
    if (action === 'accept' && data.conversation && data.conversation.id) {
      state.activeConversationId = data.conversation.id;
      state.chatStatus = 'The accepted traveler has been added to the group chat.';
    }
    await loadTripGroups();
    await loadConversations();
    renderApp();
  } catch (error) {
    state.groupStatusType = 'error';
    state.groupStatus = error.message;
    renderApp();
  }
}

async function handleOpenConversation(conversationId) {
  state.activeConversationId = conversationId;
  state.notificationMessage = '';
  await loadMessages(conversationId);
  await loadPackageSelections(conversationId);
  renderApp();
}

async function handleChatSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const textInput = form.querySelector('input[name="text"]');
  const messageText = (textInput ? textInput.value : '').trim();
  const conversationIdInput = form.querySelector('input[name="conversationId"]');
  const conversationId = conversationIdInput ? conversationIdInput.value : (state.activeConversationId || '');

  if (!messageText || !conversationId || !state.profile) {
    return;
  }

  // 1. Instantly clear input and keep focus for snappy multi-message typing
  if (textInput) {
    textInput.value = '';
    textInput.focus();
  }
  state.chatDraft = '';

  // 2. Create optimistic message
  const tempId = 'temp_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
  const nowIso = new Date().toISOString();
  const optimisticMsg = {
    id: tempId,
    conversationId: conversationId,
    senderProfileId: state.profile.id,
    text: messageText,
    createdAt: nowIso,
    senderName: state.user?.fullName || 'You',
    pending: true,
  };

  // Add to local state
  state.messages.push(optimisticMsg);

  // 3. Immediately render the new message into DOM with zero flicker / zero delay
  appendChatMessageDOM(optimisticMsg, true);

  // 4. Update the conversation preview in the left column
  updateConversationSnippetInDOM(conversationId, messageText, nowIso);

  // 5. Send to server in background without blocking UI
  try {
    const data = await api('/api/messages', 'POST', {
      conversationId: conversationId,
      senderProfileId: state.profile.id,
      text: messageText,
    });

    if (data && data.message) {
      optimisticMsg.id = data.message.id;
      delete optimisticMsg.pending;
      const el = document.getElementById(`msg-${tempId}`);
      if (el) el.id = `msg-${data.message.id}`;
    }
  } catch (error) {
    console.error('Failed to send message:', error);
    state.chatStatus = 'Failed to deliver message. Tap to retry.';
    const el = document.getElementById(`msg-${tempId}`);
    if (el) {
      el.style.opacity = '0.6';
      el.setAttribute('title', 'Not delivered: ' + error.message);
    }
  }
}

function appendChatMessageDOM(msg, isMine) {
  const container = document.getElementById('chatMessagesContainer');
  if (!container) return;

  // Remove empty notice if present
  const emptyNotice = container.querySelector('.chat-empty-notice');
  if (emptyNotice) emptyNotice.remove();

  // Check if user was already scrolled near the bottom before appending
  const threshold = 140; // px
  const isNearBottom = (container.scrollHeight - container.scrollTop - container.clientHeight) <= threshold;

  const msgRow = document.createElement('div');
  msgRow.className = `message-row-wrap ${isMine ? 'outgoing' : 'incoming'} animate-fade-in`;
  msgRow.id = `msg-${msg.id}`;
  msgRow.innerHTML = `
    <div class="message-bubble-stitch">
      ${escapeHtml(msg.text)}
    </div>
    <span class="message-time-sub">${escapeHtml(formatMessageTime(msg.createdAt))}</span>
  `;
  container.appendChild(msgRow);

  // If user sent the message or was already near bottom, scroll down smoothly
  // If user scrolled up to read previous chats, preserve their reading position!
  if (isMine || isNearBottom) {
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    const jumpBtn = document.getElementById('chatScrollBottomBtn');
    if (jumpBtn) jumpBtn.classList.add('hidden');
  } else {
    const jumpBtn = document.getElementById('chatScrollBottomBtn');
    if (jumpBtn) jumpBtn.classList.remove('hidden');
  }
}

function updateConversationSnippetInDOM(conversationId, snippet, timestamp) {
  const convItem = document.querySelector(`.conversation-stitch-item[data-open-conversation="${conversationId}"]`);
  if (!convItem) return;
  const snippetEl = convItem.querySelector('.conversation-item-snippet');
  if (snippetEl) snippetEl.textContent = snippet;
  const timeEl = convItem.querySelector('.conversation-item-top .time');
  if (timeEl && timestamp) timeEl.textContent = formatMessageTime(timestamp);

  // Update in state
  const conv = (state.conversations || []).find((c) => c.id === conversationId);
  if (conv) {
    conv.latestMessage = { text: snippet, createdAt: timestamp };
    conv.updatedAt = timestamp;
  }
}

async function sharePackageInChat(packageId) {
  const tripPackage = TRIP_PACKAGES.find((item) => item.id === packageId);
  if (!tripPackage || !state.profile) return;

  if (!state.activeConversationId && state.conversations.length) {
    state.activeConversationId = state.conversations[0].id;
  }

  if (!state.activeConversationId) {
    state.packageStatus = 'Connect with a match first to share this package in chat!';
    renderApp();
    return;
  }

  try {
    await api('/api/messages', 'POST', {
      conversationId: state.activeConversationId,
      senderProfileId: state.profile.id,
      text: `Hey, let's review this package: ${tripPackage.packageName} by ${tripPackage.company} (${tripPackage.price} / person, ${tripPackage.duration}). What do you think? 🏔️`,
    });
    state.packageStatus = `${tripPackage.packageName} was shared in chat with your partner!`;
    await loadConversations();
    routeTo('/chat');
  } catch (error) {
    state.packageStatus = error.message;
    renderApp();
  }
}

async function shortlistPackage(packageId) {
  const tripPackage = TRIP_PACKAGES.find((item) => item.id === packageId);
  if (!tripPackage || !state.profile) return;

  if (!state.activeConversationId && state.conversations.length) {
    state.activeConversationId = state.conversations[0].id;
  }

  if (!state.activeConversationId) {
    state.packageStatus = 'Connect with a match first to shortlist packages!';
    renderApp();
    return;
  }

  try {
    await api('/api/package-selections', 'POST', {
      conversationId: state.activeConversationId,
      selectedByProfileId: state.profile.id,
      packageId: tripPackage.id,
      packageName: tripPackage.packageName,
      company: tripPackage.company,
      destination: tripPackage.destination,
      facilityType: tripPackage.facilityType,
      agreedBudget: state.planningBudget,
      preferredMonth: state.planningMonth,
    });
    state.packageStatus = `${tripPackage.packageName} has been shortlisted with your partner.`;
    await loadPackageSelections(state.activeConversationId);
    await loadConversations();
    renderApp();
  } catch (error) {
    state.packageStatus = error.message;
    renderApp();
  }
}

async function raisePackageBookingRequest(packageId) {
  const tripPackage = TRIP_PACKAGES.find((item) => item.id === packageId);
  if (!tripPackage || !state.activeConversationId || !state.profile) return;

  try {
    await api('/api/package-booking-requests', 'POST', {
      conversationId: state.activeConversationId,
      requestedByProfileId: state.profile.id,
      packageId: tripPackage.id,
      packageName: tripPackage.packageName,
      company: tripPackage.company,
      destination: tripPackage.destination,
      facilityType: tripPackage.facilityType,
      price: tripPackage.price,
      travelerCount: state.planningTravelerCount,
      agreedBudget: state.planningBudget,
      preferredMonth: state.planningMonth,
    });
    state.packageBookingStatus = `Booking request raised for ${tripPackage.packageName}.`;
    await loadConversations();
    renderApp();
  } catch (error) {
    state.packageBookingStatus = error.message;
    renderApp();
  }
}


function openItineraryModal(packageId) {
  state.itineraryPackageId = packageId;
  renderApp();
}

function closeItineraryModal() {
  state.itineraryPackageId = '';
  renderApp();
}

function renderItineraryModal() {
  if (!state.itineraryPackageId) return '';
  const pkg = TRIP_PACKAGES.find((item) => item.id === state.itineraryPackageId);
  if (!pkg) return '';

  const pkgCover = pkg.image && (pkg.image.endsWith('.mov') || pkg.image.endsWith('.mp4')) ? './assets/tripzen-logo.png' : pkg.image;

  return `
    <div class="checkout-modal-overlay" id="itineraryModalOverlay">
      <div class="itinerary-modal-card">
        <div class="itinerary-modal-hero" style="background-image: linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.45)), url('${escapeHtml(pkgCover)}');">
          <button type="button" class="checkout-close-btn itinerary-close-btn" id="closeItineraryModalBtn">×</button>
          <div class="itinerary-modal-badges">
            <span class="package-card-badge">Verified Tripzen Operator</span>
            <span class="package-difficulty-badge ${escapeHtml((pkg.difficulty || '').toLowerCase())}">⛰️ ${escapeHtml(pkg.difficulty)}</span>
            <span class="package-card-badge" style="background: rgba(255,255,255,0.2); color: #fff;">⏱️ ${escapeHtml(pkg.duration)}</span>
          </div>
          <h2 class="itinerary-modal-title">${escapeHtml(pkg.packageName)}</h2>
          <p class="itinerary-modal-subtitle">📍 ${escapeHtml(pkg.destination)} • Operated by <strong>${escapeHtml(pkg.company)}</strong></p>
        </div>

        <div class="itinerary-modal-body">
          <div class="itinerary-facts-strip">
            <div class="itinerary-fact-item">
              <span class="itinerary-fact-label">Altitude</span>
              <strong class="itinerary-fact-val">${escapeHtml(pkg.altitude || pkg.distance || 'Himalayan Range')}</strong>
            </div>
            <div class="itinerary-fact-item">
              <span class="itinerary-fact-label">Departure</span>
              <strong class="itinerary-fact-val">${escapeHtml(pkg.departure)}</strong>
            </div>
            <div class="itinerary-fact-item">
              <span class="itinerary-fact-label">Batch Dates</span>
              <strong class="itinerary-fact-val">${escapeHtml(pkg.dates || pkg.month)}</strong>
            </div>
            <div class="itinerary-fact-item">
              <span class="itinerary-fact-label">Meals</span>
              <strong class="itinerary-fact-val">All Veg Meals Included</strong>
            </div>
          </div>

          <div class="itinerary-overview-box">
            <p>${escapeHtml(pkg.description)}</p>
          </div>

          ${pkg.days && pkg.days.length > 0 ? `
            <div class="itinerary-timeline-section">
              <h3 class="itinerary-section-heading">📅 Day-by-Day Trek Schedule</h3>
              <div class="itinerary-timeline">
                ${pkg.days.map((d) => `
                  <div class="itinerary-day-box">
                    <div class="itinerary-day-header">
                      <span class="itinerary-day-pill">DAY ${d.day}</span>
                      <strong class="itinerary-day-title">${escapeHtml(d.title)}</strong>
                      <span class="itinerary-day-alt">🏔️ ${escapeHtml(d.altitude || '')}</span>
                    </div>
                    <div class="itinerary-day-content">
                      <p>${escapeHtml(d.details)}</p>
                      <div class="itinerary-day-meta">
                        <span>🍽️ <strong>Meals:</strong> ${escapeHtml(d.meals || 'Included')}</span>
                        <span>⛺ <strong>Stay:</strong> ${escapeHtml(d.stay || 'Alpine Camps')}</span>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div class="itinerary-two-col">
            <div class="itinerary-col-box">
              <h4 style="color: var(--forest); margin: 0 0 10px 0; font-weight: 800;">✓ Inclusions</h4>
              <ul class="itinerary-checklist-ul">
                ${(pkg.includes || []).map((inc) => `<li>${escapeHtml(inc)}</li>`).join('')}
              </ul>
            </div>
            <div class="itinerary-col-box">
              <h4 style="color: #ef4444; margin: 0 0 10px 0; font-weight: 800;">✕ Exclusions</h4>
              <ul class="itinerary-checklist-ul exclusions">
                <li>Personal trekking gear (hiking shoes, thermal layers)</li>
                <li>Luggage offloading / personal mule charges</li>
                <li>Meals during road transit on highways</li>
                <li>Emergency medical evacuation & insurance</li>
              </ul>
            </div>
          </div>

          <div class="itinerary-actions-bar">
            <div class="itinerary-price-block">
              <div class="itinerary-price-val">${escapeHtml(pkg.price)}</div>
              <div class="itinerary-price-sub">per person • taxes included</div>
            </div>
            <div class="itinerary-cta-btns">
              <a
                href="${escapeHtml(pkg.pdf || `/itineraries/${pkg.slug}.html`)}"
                target="_blank"
                rel="noopener noreferrer"
                class="ghost-btn"
                style="padding: 10px 18px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;"
              >
                🖨️ Open / Print PDF
              </a>
              <button
                type="button"
                class="primary-btn pay-btn"
                id="bookFromItineraryBtn"
                data-pkg-id="${escapeHtml(pkg.id)}"
                style="padding: 10px 22px; font-weight: 800; font-size: 0.95rem;"
              >
                ⚡ Instant Book (${escapeHtml(pkg.price)})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function openCheckoutModal(packageId) {
  if (!state.user) {
    state.authStatus = 'Please log in to book packages.';
    state.authStatusType = 'info';
    routeTo('/auth');
    return;
  }
  state.checkoutPackageId = packageId;
  state.checkoutTravelers = 1;
  state.checkoutDate = 'Upcoming Weekend';
  state.bookingSuccessData = null;
  renderApp();
}

function closeCheckoutModal() {
  state.checkoutPackageId = '';
  state.bookingSuccessData = null;
  renderApp();
}

function renderCheckoutModal() {
  if (!state.checkoutPackageId && !state.bookingSuccessData) return '';

  if (state.bookingSuccessData) {
    const data = state.bookingSuccessData;
    return `
      <div class="checkout-modal-overlay" id="checkoutModalOverlay">
        <div class="checkout-modal-card">
          <div class="checkout-modal-header">
            <h3><span>🎉</span> <span>Booking & Payment Confirmed!</span></h3>
            <button type="button" class="checkout-close-btn" id="closeCheckoutModalBtn">×</button>
          </div>
          <div class="checkout-modal-body">
            <div class="booking-voucher-card">
              <div class="voucher-check-icon">✓</div>
              <h2 style="font-size: 1.35rem; color: var(--forest); margin: 0 0 6px 0;">Payment Verified & Spot Reserved</h2>
              <p style="font-size: 0.85rem; color: var(--muted); margin: 0;">Your Himalayan trek is officially confirmed with the operator.</p>

              <div class="voucher-ticket-box">
                <div class="voucher-row">
                  <span>Package</span>
                  <strong>${escapeHtml(data.packageName)}</strong>
                </div>
                <div class="voucher-row">
                  <span>Destination</span>
                  <strong>${escapeHtml(data.destination)}</strong>
                </div>
                <div class="voucher-row">
                  <span>Operator</span>
                  <strong>${escapeHtml(data.company)}</strong>
                </div>
                <div class="voucher-row">
                  <span>Travelers</span>
                  <strong>${escapeHtml(String(data.travelerCount))} Person(s)</strong>
                </div>
                <div class="voucher-row">
                  <span>Departure Batch</span>
                  <strong>${escapeHtml(data.preferredDate || 'Upcoming Weekend')}</strong>
                </div>
                <div class="voucher-row">
                  <span>Lead Traveler</span>
                  <strong>${escapeHtml(data.leadName || 'Traveler')} (${escapeHtml(data.formattedPhone || data.leadPhone)})</strong>
                </div>
                <div class="voucher-row">
                  <span>Booking Reference</span>
                  <strong style="color: var(--forest); font-family: monospace;">${escapeHtml(data.bookingRef)}</strong>
                </div>
                <div class="voucher-row">
                  <span>Razorpay Payment ID</span>
                  <strong style="color: var(--accent); font-family: monospace;">${escapeHtml(data.paymentId)}</strong>
                </div>
                <div class="voucher-row" style="border-top: 1.5px dashed rgba(0,0,0,0.15); padding-top: 10px; margin-top: 6px;">
                  <span>Total Paid (INR)</span>
                  <strong style="font-size: 1.15rem; color: var(--ink);">INR ${Number(data.amount).toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <!-- TRIPZEN OFFICIAL WHATSAPP CONFIRMATION (CLEAN & EXECUTIVE) -->
              <div class="whatsapp-official-card">
                <div class="whatsapp-card-top-row" style="justify-content: center;">
                  <div class="whatsapp-verified-badge" style="background: rgba(255, 255, 255, 0.95); padding: 8px 18px; border: 1.5px solid #a7f3d0; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.12);">
                    <span class="whatsapp-pulse-dot"></span>
                    <span class="whatsapp-verified-icon">✓</span>
                    <span style="font-weight: 800; font-size: 0.92rem; color: #065f46;">
                      Booking Confirmation Delivered to WhatsApp (${escapeHtml(data.formattedPhone || data.leadPhone)})
                    </span>
                  </div>
                </div>

                <div class="whatsapp-actions-row" style="justify-content: center; gap: 10px; margin-top: 4px;">
                  <a
                    href="${escapeHtml(data.directSendUrl || `https://api.whatsapp.com/send?phone=${escapeHtml(data.rawCleanPhone || '917982307329')}&text=${encodeURIComponent(data.whatsappMessage || '')}`)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="whatsapp-chat-official-btn"
                    style="background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); font-size: 0.92rem; padding: 11px 22px; font-weight: 800; flex: 1 1 200px;"
                    title="Open booking confirmation receipt on WhatsApp"
                  >
                    <span>💬 Open in WhatsApp</span>
                  </a>
                  <a
                    href="${escapeHtml(data.supportChatUrl || 'https://api.whatsapp.com/send?phone=918920632874')}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="whatsapp-chat-official-btn"
                    style="background: #ffffff; color: #065f46 !important; border: 1.5px solid #a7f3d0; box-shadow: none; font-weight: 700; flex: 1 1 180px;"
                    title="Connect with 24x7 Official Support Desk on WhatsApp"
                  >
                    <span>📞 Support Desk</span>
                  </a>
                  <button
                    type="button"
                    class="whatsapp-copy-btn"
                    id="copyBookingSummaryBtn"
                    title="Copy full booking voucher receipt to clipboard"
                    style="padding: 11px 18px;"
                  >
                    📋 Copy Receipt
                  </button>
                </div>

                <div id="copySuccessFeedback" style="display: none; font-size: 0.82rem; color: #059669; font-weight: 800; text-align: center; margin-top: 6px;">
                  ✓ Copied full booking confirmation receipt to clipboard!
                </div>
              </div>

              <div style="display: flex; gap: 10px; justify-content: center; margin-top: 16px; flex-wrap: wrap;">
                ${data.itineraryUrl ? `
                  <a
                    href="${escapeHtml(data.itineraryUrl)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="ghost-btn"
                    style="padding: 10px 18px; font-size: 0.88rem; font-weight: 700; text-decoration: none;"
                  >
                    📄 View / Print Official Itinerary
                  </a>
                ` : ''}
                <button type="button" class="primary-btn" id="doneBookingModalBtn" style="padding: 10px 24px; font-size: 0.92rem; font-weight: 800;">
                  ✓ Done & View Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  const pkg = TRIP_PACKAGES.find((item) => item.id === state.checkoutPackageId);
  if (!pkg) return '';

  const travelerCount = Math.max(1, Number(state.checkoutTravelers || 1));
  const basePrice = pkg.priceValue || 5000;
  const totalPrice = basePrice * travelerCount;
  const originalTotal = (basePrice + 3500) * travelerCount;
  const savings = originalTotal - totalPrice;

  const pkgCover = pkg.image && (pkg.image.endsWith('.mov') || pkg.image.endsWith('.mp4')) ? './assets/tripzen-logo.png' : pkg.image;

  return `
    <div class="checkout-modal-overlay" id="checkoutModalOverlay">
      <div class="checkout-modal-card">
        <div class="checkout-modal-header">
          <h3><span>🔒</span> <span>Instant Trek Checkout</span></h3>
          <button type="button" class="checkout-close-btn" id="closeCheckoutModalBtn">×</button>
        </div>
        <div class="checkout-modal-body">
          <div class="checkout-package-summary">
            <img src="${escapeHtml(pkgCover)}" class="checkout-pkg-img" alt="${escapeHtml(pkg.packageName)}" />
            <div class="checkout-pkg-info">
              <h4>${escapeHtml(pkg.packageName)}</h4>
              <p>📍 ${escapeHtml(pkg.destination)} • by <strong>${escapeHtml(pkg.company)}</strong></p>
              <div style="font-size: 0.8rem; color: var(--forest); font-weight: 700; margin-top: 4px;">
                ⏱️ ${escapeHtml(pkg.duration)} • ⛰️ ${escapeHtml(pkg.difficulty)} • 🚐 ${escapeHtml(pkg.departure)}
              </div>
            </div>
          </div>

          <div>
            <div class="checkout-section-title">1. Booking Options</div>
            <div class="checkout-form-grid">
              <label class="field-label">
                <span>NUMBER OF TRAVELERS</span>
                <div class="stepper-counter-wrap">
                  <button type="button" class="stepper-btn" id="decTravelersBtn">-</button>
                  <span class="stepper-value" id="travelerCountDisplay">${travelerCount}</span>
                  <button type="button" class="stepper-btn" id="incTravelersBtn">+</button>
                </div>
              </label>

              <label class="field-label">
                <span>PREFERRED DEPARTURE BATCH</span>
                <select id="checkoutMonthSelect" class="stitch-input" style="height: 44px; font-weight: 600;">
                  <option value="Upcoming Weekend" ${state.checkoutDate === 'Upcoming Weekend' ? 'selected' : ''}>🗓️ Upcoming Weekend Batch</option>
                  <option value="Next Month Batch" ${state.checkoutDate === 'Next Month Batch' ? 'selected' : ''}>🗓️ Next Month Batch</option>
                  <option value="Peak Season Batch" ${state.checkoutDate === 'Peak Season Batch' ? 'selected' : ''}>🗓️ Peak Season (${escapeHtml(pkg.month || 'Best Season')})</option>
                </select>
              </label>
            </div>
          </div>

          <div>
            <div class="checkout-section-title">2. Lead Traveler Contact</div>
            <div class="checkout-form-grid">
              <label class="field-label">
                <span>FULL NAME</span>
                <input id="checkoutLeadName" class="stitch-input" value="${escapeHtml(state.user?.fullName || '')}" placeholder="Lead Traveler Name" required />
              </label>
              <label class="field-label">
                <span>WHATSAPP PHONE</span>
                <input id="checkoutLeadPhone" class="stitch-input" value="${escapeHtml(state.user?.phone || state.checkoutPhone || '')}" placeholder="10-digit Mobile Number" required />
              </label>
            </div>
          </div>

          <div>
            <div class="checkout-section-title">3. Fare Summary</div>
            <div class="checkout-fare-breakdown">
              <div class="fare-row">
                <span>Base Price (₹${basePrice.toLocaleString('en-IN')} × ${travelerCount} traveler${travelerCount > 1 ? 's' : ''})</span>
                <strong>INR ${(basePrice * travelerCount).toLocaleString('en-IN')}</strong>
              </div>
              <div class="fare-row" style="color: #2e7d32;">
                <span>TripZen Exclusive Direct Discount</span>
                <strong>- INR ${savings.toLocaleString('en-IN')}</strong>
              </div>
              <div class="fare-row">
                <span>Permits, Safety Gear & Taxes</span>
                <strong style="color: var(--forest);">FREE / Included</strong>
              </div>
              <div class="fare-row total-row">
                <span>Total Amount Payable</span>
                <span style="color: var(--forest); font-size: 1.2rem;">INR ${totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <button type="button" class="checkout-pay-btn" id="triggerRazorpaySubmitBtn">
            <span>🔒 Pay INR ${totalPrice.toLocaleString('en-IN')} via Razorpay</span>
          </button>

          <div class="checkout-trust-badge">
            <span>🛡️ 256-Bit Encrypted Razorpay Gateway</span>
            <span>•</span>
            <span>UPI • Cards • NetBanking • Instant Confirmation</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function startPackagePayment(packageId, options = {}) {
  const tripPackage = TRIP_PACKAGES.find((item) => item.id === packageId);
  if (!tripPackage) return;

  if (!state.user) {
    state.authStatus = 'Please log in to book and pay for packages.';
    state.authStatusType = 'info';
    routeTo('/auth');
    return;
  }

  const profileId = state.profile?.id || state.user?.id;
  const count = options.travelerCount || state.checkoutTravelers || 1;
  const month = options.preferredMonth || state.checkoutDate || tripPackage.month;
  const leadName = options.leadName || state.user?.fullName || 'Traveler';
  const leadPhone = options.leadPhone || state.user?.phone || state.checkoutPhone || '9876543210';
  const leadEmail = state.user?.email || '';

  if (!window.Razorpay) {
    state.paymentStatus = 'Razorpay checkout could not load. Check your internet connection and refresh.';
    renderApp();
    return;
  }

  try {
    state.paymentStatus = 'Creating secure Razorpay order...';
    renderApp();

    const orderData = await api('/api/payments/create-order', 'POST', {
      conversationId: state.activeConversationId || '',
      profileId: profileId,
      userId: state.user?.id || '',
      userEmail: state.user?.email || '',
      leadEmail: leadEmail,
      packageId: tripPackage.id,
      packageName: tripPackage.packageName,
      company: tripPackage.company,
      destination: tripPackage.destination,
      facilityType: tripPackage.facilityType,
      price: tripPackage.price,
      priceValue: tripPackage.priceValue,
      travelerCount: count,
      preferredMonth: month,
      leadName,
      leadPhone,
      slug: tripPackage.slug || '',
    });

    const checkout = new window.Razorpay({
      key: orderData.keyId,
      amount: orderData.payment.amount * 100,
      currency: orderData.payment.currency,
      name: 'TripZen Travel',
      description: `${tripPackage.packageName} (${count} traveler${count > 1 ? 's' : ''})`,
      image: './assets/tripzen-logo.png',
      order_id: orderData.orderId,
      prefill: {
        name: leadName,
        email: state.user?.email || '',
        contact: leadPhone,
      },
      notes: {
        tripzenPaymentId: orderData.payment.id,
        packageId: tripPackage.id,
        destination: tripPackage.destination,
        travelerCount: String(count),
        leadPhone: leadPhone,
      },
      theme: {
        color: '#e8873a',
      },
      handler: async (response) => {
        try {
          const verifyResult = await api('/api/payments/verify', 'POST', {
            paymentId: orderData.payment.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });

          const waData = (verifyResult && verifyResult.whatsapp) || {};
          const cleanPhone = (leadPhone || '9876543210').replace(/\D/g, '');
          const formattedPhone = waData.recipientNumber || (cleanPhone.length === 10 ? '+91 ' + cleanPhone : '+' + cleanPhone);
          const bookingRef = waData.bookingRef || (orderData.payment && orderData.payment.bookingRef) || `TZ-${Date.now().toString().slice(-6).toUpperCase()}`;
          const bookingTime = waData.bookingTime || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
          const itineraryUrl = waData.itineraryUrl || (window.location.origin + (tripPackage.pdf || `/itineraries/${tripPackage.slug}.html`));

          const rawCleanPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
          const botPairingCode = (waData.botStatus && waData.botStatus.pairingCode) || '';
          const directSendUrl = waData.directSendUrl || `https://api.whatsapp.com/send?phone=${rawCleanPhone}&text=${encodeURIComponent(waData.message || '')}`;

          state.bookingSuccessData = {
            bookingRef,
            paymentId: response.razorpay_payment_id,
            rawPaymentDbId: orderData.payment.id,
            packageName: tripPackage.packageName,
            destination: tripPackage.destination,
            company: tripPackage.company,
            travelerCount: count,
            amount: orderData.payment.amount,
            leadName,
            leadPhone,
            formattedPhone,
            rawCleanPhone,
            preferredDate: month,
            bookingTime,
            deliveryId: waData.deliveryId || `TZ-WA-${Date.now().toString().slice(-6).toUpperCase()}`,
            senderName: waData.senderName || 'TripZen Expeditions Official',
            senderNumber: waData.senderNumber || '+91 89206 32874',
            supportChatUrl: waData.supportChatUrl || `https://api.whatsapp.com/send?phone=918920632874&text=${encodeURIComponent('Hi Tripzen Support, I need assistance regarding my booking ' + bookingRef)}`,
            directSendUrl,
            botPairingCode,
            itineraryUrl,
            whatsappMessage: waData.message || '',
          };

          // Auto-launch WhatsApp confirmation window for seamless 1-tap delivery
          try {
            window.open(directSendUrl, '_blank');
          } catch (e) {
            console.log('[Tripzen] Popup notice:', e.message);
          }

          state.paymentStatus = `🎉 Payment verified! Booking confirmed for ${tripPackage.packageName}.`;
          await loadBookings();
          if (state.activeConversationId) {
            await loadConversations();
          }
          renderApp();
        } catch (error) {
          state.paymentStatus = error.message || 'Payment verification failed.';
          renderApp();
        }
      },
    });

    checkout.on('payment.failed', (response) => {
      state.paymentStatus = response.error?.description || 'Payment was cancelled or failed. Please try again.';
      renderApp();
    });

    checkout.open();
  } catch (error) {
    state.paymentStatus = error.message || 'Could not initiate Razorpay checkout.';
    renderApp();
  }
}

function hydrateUI() {
  hydratePreferenceFormDefaults();

  // Profile Photo Upload Click Triggers
  const avatarUploadTrigger = document.getElementById('avatarUploadTrigger');
  const avatarLargeUploadTrigger = document.getElementById('avatarLargeUploadTrigger');
  const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
  const avatarUploadCaption = document.getElementById('avatarUploadCaption');
  const profileImageFileInput = document.getElementById('profileImageFileInput');
  const profileImageHiddenInput = document.getElementById('profileImageHiddenInput');
  const profileImagePreview = document.getElementById('profileImagePreview');
  const profileImageLargePreview = document.getElementById('profileImageLargePreview');
  const cameraIconPlaceholder = document.getElementById('cameraIconPlaceholder');

  const triggerUpload = () => {
    if (profileImageFileInput) profileImageFileInput.click();
  };

  if (avatarUploadTrigger) avatarUploadTrigger.addEventListener('click', triggerUpload);
  if (avatarLargeUploadTrigger) avatarLargeUploadTrigger.addEventListener('click', triggerUpload);
  if (uploadPhotoBtn) uploadPhotoBtn.addEventListener('click', triggerUpload);
  if (avatarUploadCaption) avatarUploadCaption.addEventListener('click', triggerUpload);

  if (profileImageFileInput) {
    profileImageFileInput.addEventListener('change', () => {
      const file = profileImageFileInput.files && profileImageFileInput.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = typeof reader.result === 'string' ? reader.result : '';
        if (!dataUrl) return;

        state.pendingProfileImage = dataUrl;
        if (profileImageHiddenInput) profileImageHiddenInput.value = dataUrl;
        if (profileImagePreview) {
          profileImagePreview.src = dataUrl;
          profileImagePreview.style.display = 'block';
        }
        if (profileImageLargePreview) {
          profileImageLargePreview.src = dataUrl;
        }
        if (cameraIconPlaceholder) {
          cameraIconPlaceholder.style.display = 'none';
        }

        // Auto-persist immediately if user is active
        if (state.user && state.user.id) {
          try {
            const uploadRes = await api('/api/upload-avatar', 'POST', {
              userId: state.user.id,
              image: dataUrl,
            });
            if (uploadRes && uploadRes.profileImage) {
              state.user.profileImage = uploadRes.profileImage;
              state.pendingProfileImage = uploadRes.profileImage;
              if (profileImageHiddenInput) profileImageHiddenInput.value = uploadRes.profileImage;
              // Refresh sidebar avatar
              const sidebarAvatars = document.querySelectorAll('.sidebar-user-avatar');
              sidebarAvatars.forEach((img) => { img.src = uploadRes.profileImage; });
            }
          } catch (err) {
            console.error('Instant avatar upload failed, will save on form submit:', err);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // Preset Avatar Pickers
  document.querySelectorAll('[data-preset-avatar]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const avatarUrl = btn.getAttribute('data-preset-avatar');
      state.pendingProfileImage = avatarUrl;
      const largePreview = document.getElementById('profileImageLargePreview');
      if (largePreview) largePreview.src = avatarUrl;
      const hiddenInput = document.getElementById('profileImageHiddenInput');
      if (hiddenInput) hiddenInput.value = avatarUrl;
      document.querySelectorAll('[data-preset-avatar]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Interest Tag Pill Toggle
  document.querySelectorAll('[data-interest-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const check = btn.querySelector('.interest-tag-check');
      if (check) check.textContent = btn.classList.contains('active') ? '✓' : '+';
      const activeInterests = Array.from(document.querySelectorAll('.interest-tag-pill.active')).map((b) => b.getAttribute('data-interest-name') || b.textContent.trim());
      state.selectedInterests = activeInterests;
    });
  });

  // Profile Gender Pill Selector
  document.querySelectorAll('[data-profile-gender-val]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-profile-gender-val');
      const input = document.getElementById('profileGenderInput');
      if (input) input.value = val;
      document.querySelectorAll('[data-profile-gender-val]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Profile Travel Style Card Selector
  document.querySelectorAll('[data-profile-style-val]').forEach((card) => {
    card.addEventListener('click', () => {
      const val = card.getAttribute('data-profile-style-val');
      const input = document.getElementById('profileTravelStyleInput');
      if (input) input.value = val;
      document.querySelectorAll('[data-profile-style-val]').forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // Profile Budget Card Selector
  document.querySelectorAll('[data-profile-budget-val]').forEach((card) => {
    card.addEventListener('click', () => {
      const val = card.getAttribute('data-profile-budget-val');
      const input = document.getElementById('profileBudgetInput');
      if (input) input.value = val;
      document.querySelectorAll('[data-profile-budget-val]').forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // Auth Mode Toggles
  document.querySelectorAll('[data-auth-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      state.authMode = button.getAttribute('data-auth-mode');
      state.authStatus = '';
      state.authStatusType = '';
      renderApp();
    });
  });

  // Topbar & Hero Get Started / Sign In Button Handlers
  const topbarSignInBtn = document.getElementById('topbarSignInBtn');
  if (topbarSignInBtn) {
    topbarSignInBtn.addEventListener('click', () => {
      state.authMode = 'login';
      state.authStatus = '';
      state.authStatusType = '';
      if (normalizedRoute() !== '/auth') {
        routeTo('/auth');
      } else {
        renderApp();
      }
      setTimeout(() => {
        const input = document.querySelector('input[name="email"]');
        if (input) input.focus();
      }, 50);
    });
  }

  const handleGetStartedAction = () => {
    state.authMode = 'signup';
    state.authStatus = '';
    state.authStatusType = '';
    if (normalizedRoute() !== '/auth') {
      routeTo('/auth');
    } else {
      renderApp();
    }
    setTimeout(() => {
      const input = document.querySelector('input[name="fullName"]');
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  const topbarGetStartedBtn = document.getElementById('topbarGetStartedBtn');
  if (topbarGetStartedBtn) {
    topbarGetStartedBtn.addEventListener('click', handleGetStartedAction);
  }

  const heroGetStartedBtn = document.getElementById('heroGetStartedBtn');
  if (heroGetStartedBtn) {
    heroGetStartedBtn.addEventListener('click', handleGetStartedAction);
  }

  // Auth Custom Gender Pill Selector
  document.querySelectorAll('[data-gender-val]').forEach((button) => {
    button.addEventListener('click', () => {
      const gender = button.getAttribute('data-gender-val');
      const hiddenInput = document.getElementById('authGenderInput');
      if (hiddenInput) hiddenInput.value = gender;
      document.querySelectorAll('[data-gender-val]').forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
    });
  });

  // Auth Custom Travel Style Card Selector
  document.querySelectorAll('[data-style-val]').forEach((card) => {
    card.addEventListener('click', () => {
      const style = card.getAttribute('data-style-val');
      const hiddenInput = document.getElementById('authTravelStyleInput');
      if (hiddenInput) hiddenInput.value = style;
      document.querySelectorAll('[data-style-val]').forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // Destination Card Selector
  document.querySelectorAll('[data-select-destination]').forEach((card) => {
    card.addEventListener('click', () => {
      const value = card.getAttribute('data-select-destination');
      const form = document.getElementById('preferencesForm');
      if (form && form.destination) {
        form.destination.value = value;
      }
      document.querySelectorAll('.destination-stitch-card').forEach((c) => {
        c.classList.remove('selected');
      });
      card.classList.add('selected');
    });
  });

  // Travel Style Pill Selector in Preferences
  document.querySelectorAll('[data-select-style]').forEach((button) => {
    button.addEventListener('click', () => {
      const style = button.getAttribute('data-select-style');
      const form = document.getElementById('preferencesForm');
      if (form && form.travelStyle) {
        form.travelStyle.value = style;
      }
      document.querySelectorAll('[data-select-style]').forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
    });
  });

  function hydrateMatchEvents() {
    document.querySelectorAll('[data-connect-profile]').forEach((button) => {
      button.onclick = (e) => {
        e.stopPropagation();
        handleConnect(button.getAttribute('data-connect-profile'));
      };
    });

    document.querySelectorAll('[data-open-match]').forEach((card) => {
      card.onclick = () => {
        const matchProfileId = card.getAttribute('data-open-match') || '';
        if (!matchProfileId) return;
        state.selectedMatchProfileId = matchProfileId;
        routeTo(`/match/${encodeURIComponent(matchProfileId)}`);
      };
    });

    const seedButton = document.getElementById('seedDemoBtn');
    if (seedButton) {
      seedButton.onclick = handleSeedDemo;
    }
  }

  // Discover Travel Style Filter Pills
  document.querySelectorAll('[data-filter-style]').forEach((button) => {
    button.addEventListener('click', () => {
      const style = button.getAttribute('data-filter-style');
      if (state.matchTravelStyleFilter.toLowerCase() === style.toLowerCase()) {
        state.matchTravelStyleFilter = '';
        button.classList.remove('active');
      } else {
        document.querySelectorAll('[data-filter-style]').forEach((b) => b.classList.remove('active'));
        state.matchTravelStyleFilter = style;
        button.classList.add('active');
      }
      const grid = document.querySelector('.stitch-matches-grid');
      if (grid) {
        grid.innerHTML = generateMatchCardsMarkup(getFilteredMatchesList());
        hydrateMatchEvents();
      }
    });
  });

  // Discover Compatibility Slider
  const compatSlider = document.getElementById('compatibilitySlider');
  if (compatSlider) {
    compatSlider.addEventListener('input', (e) => {
      state.matchCompatibilityMin = Number(e.target.value);
      const label = document.getElementById('compatValueLabel');
      if (label) label.textContent = `${state.matchCompatibilityMin}%+`;
      const sliderMidLabel = document.getElementById('sliderMidLabel');
      if (sliderMidLabel) sliderMidLabel.textContent = `${state.matchCompatibilityMin}%+`;

      const grid = document.querySelector('.stitch-matches-grid');
      if (grid) {
        grid.innerHTML = generateMatchCardsMarkup(getFilteredMatchesList());
        hydrateMatchEvents();
      }
    });
  }

  // Discover Search Input (Real-time filtering with preserved focus)
  const matchSearchInput = document.getElementById('matchSearchInput');
  if (matchSearchInput) {
    matchSearchInput.addEventListener('input', (e) => {
      state.matchSearchQuery = e.target.value;
      const grid = document.querySelector('.stitch-matches-grid');
      if (grid) {
        const filtered = getFilteredMatchesList();
        grid.innerHTML = generateMatchCardsMarkup(filtered);
        hydrateMatchEvents();

        const subtext = document.getElementById('matchHeaderSubtext');
        if (subtext) {
          const currentDestination = state.profile ? state.profile.destination : 'your destination';
          subtext.textContent = `Showing ${filtered.length} compatible travelers. Click "Connect & Chat" to start planning together.`;
        }
      }
    });
  }

  hydrateMatchEvents();

  document.querySelectorAll('[data-open-conversation]').forEach((item) => {
    item.addEventListener('click', () => {
      handleOpenConversation(item.getAttribute('data-open-conversation'));
    });
  });

  document.querySelectorAll('[data-share-package]').forEach((button) => {
    button.addEventListener('click', () => {
      sharePackageInChat(button.getAttribute('data-share-package'));
    });
  });

  document.querySelectorAll('[data-shortlist-package]').forEach((button) => {
    button.addEventListener('click', () => {
      shortlistPackage(button.getAttribute('data-shortlist-package'));
    });
  });

  document.querySelectorAll('[data-book-package]').forEach((button) => {
    button.addEventListener('click', () => {
      raisePackageBookingRequest(button.getAttribute('data-book-package'));
    });
  });

  document.querySelectorAll('[data-pay-package]').forEach((button) => {
    button.addEventListener('click', () => {
      openCheckoutModal(button.getAttribute('data-pay-package'));
    });
  });

  
  document.querySelectorAll('[data-open-itinerary]').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      openItineraryModal(button.getAttribute('data-open-itinerary'));
    });
  });

  const closeItineraryBtn = document.getElementById('closeItineraryModalBtn');
  if (closeItineraryBtn) {
    closeItineraryBtn.addEventListener('click', closeItineraryModal);
  }

  const bookFromItineraryBtn = document.getElementById('bookFromItineraryBtn');
  if (bookFromItineraryBtn) {
    bookFromItineraryBtn.addEventListener('click', () => {
      const pkgId = bookFromItineraryBtn.getAttribute('data-pkg-id');
      closeItineraryModal();
      openCheckoutModal(pkgId);
    });
  }

  document.querySelectorAll('[data-open-checkout]').forEach((button) => {
    button.addEventListener('click', () => {
      openCheckoutModal(button.getAttribute('data-open-checkout'));
    });
  });

  const closeCheckoutBtn = document.getElementById('closeCheckoutModalBtn');
  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
  }

  const doneBookingBtn = document.getElementById('doneBookingModalBtn');
  if (doneBookingBtn) {
    doneBookingBtn.addEventListener('click', closeCheckoutModal);
  }

  const copySummaryBtn = document.getElementById('copyBookingSummaryBtn');
  if (copySummaryBtn && state.bookingSuccessData) {
    copySummaryBtn.addEventListener('click', () => {
      const msg = state.bookingSuccessData.whatsappMessage || '';
      if (navigator.clipboard && msg) {
        navigator.clipboard.writeText(msg).then(() => {
          const feedback = document.getElementById('copySuccessFeedback');
          if (feedback) feedback.style.display = 'block';
          copySummaryBtn.textContent = '✓ Copied!';
          setTimeout(() => {
            copySummaryBtn.textContent = '📋 Copy Text';
          }, 2500);
        });
      }
    });
  }

  const resendBtn = document.getElementById('resendWhatsAppAlertBtn');
  if (resendBtn && state.bookingSuccessData) {
    resendBtn.addEventListener('click', async () => {
      resendBtn.disabled = true;
      resendBtn.textContent = '⏳ Sending...';
      try {
        const result = await api('/api/payments/resend-whatsapp', 'POST', {
          bookingRef: state.bookingSuccessData.bookingRef,
          paymentId: state.bookingSuccessData.rawPaymentDbId,
        });
        const feedback = document.getElementById('resendFeedbackMsg');
        if (feedback) {
          feedback.textContent = result.message || '✓ Official WhatsApp confirmation re-dispatched!';
          feedback.style.display = 'block';
        }
        resendBtn.textContent = '✓ Sent!';
        setTimeout(() => {
          resendBtn.disabled = false;
          resendBtn.textContent = '🔄 Resend Official Alert';
        }, 3000);
      } catch (err) {
        alert(err.message || 'Failed to resend WhatsApp alert.');
        resendBtn.disabled = false;
        resendBtn.textContent = '🔄 Resend Official Alert';
      }
    });
  }

  const phoneInputEl = document.getElementById('checkoutLeadPhone');
  if (phoneInputEl) {
    phoneInputEl.addEventListener('input', (e) => {
      state.checkoutPhone = e.target.value.trim();
    });
  }

  const incTravelersBtn = document.getElementById('incTravelersBtn');
  if (incTravelersBtn) {
    incTravelersBtn.addEventListener('click', () => {
      state.checkoutTravelers = Math.min(10, Number(state.checkoutTravelers || 1) + 1);
      renderApp();
    });
  }

  const decTravelersBtn = document.getElementById('decTravelersBtn');
  if (decTravelersBtn) {
    decTravelersBtn.addEventListener('click', () => {
      state.checkoutTravelers = Math.max(1, Number(state.checkoutTravelers || 1) - 1);
      renderApp();
    });
  }

  const checkoutMonthSelect = document.getElementById('checkoutMonthSelect');
  if (checkoutMonthSelect) {
    checkoutMonthSelect.addEventListener('change', (e) => {
      state.checkoutDate = e.target.value;
    });
  }

  const triggerRazorpayBtn = document.getElementById('triggerRazorpaySubmitBtn');
  if (triggerRazorpayBtn) {
    triggerRazorpayBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('checkoutLeadName');
      const phoneInput = document.getElementById('checkoutLeadPhone');
      const leadName = nameInput ? nameInput.value.trim() : '';
      const leadPhone = phoneInput ? phoneInput.value.trim() : '';
      if (leadPhone) state.checkoutPhone = leadPhone;

      startPackagePayment(state.checkoutPackageId, {
        travelerCount: state.checkoutTravelers || 1,
        preferredMonth: state.checkoutDate || 'Upcoming Weekend',
        leadName: leadName || state.user?.fullName || 'Traveler',
        leadPhone: leadPhone || '9999999999',
      });
    });
  }

  // Package Filter Handlers
  const pkgSearchInput = document.getElementById('packageSearchInput');
  if (pkgSearchInput) {
    pkgSearchInput.addEventListener('input', (e) => {
      state.packageSearchQuery = e.target.value;
      const grid = document.querySelector('.packages-cards-grid-stitch');
      if (grid) {
        renderApp();
      }
    });
  }

  const pkgDestSelect = document.getElementById('packageDestinationSelect');
  if (pkgDestSelect) {
    pkgDestSelect.addEventListener('change', (e) => {
      state.packageDestinationFilter = e.target.value;
      renderApp();
    });
  }

  const pkgDiffSelect = document.getElementById('packageDifficultySelect');
  if (pkgDiffSelect) {
    pkgDiffSelect.addEventListener('change', (e) => {
      state.packageDifficultyFilter = e.target.value;
      renderApp();
    });
  }

  const pkgFacSelect = document.getElementById('packageFacilitySelect');
  if (pkgFacSelect) {
    pkgFacSelect.addEventListener('change', (e) => {
      state.packageFacilityFilter = e.target.value;
      renderApp();
    });
  }

  const seedButton = document.getElementById('seedDemoBtn');
  if (seedButton) {
    seedButton.addEventListener('click', handleSeedDemo);
  }

  // Group Trip Modal Open & Close Triggers
  const openGroupModalBtn = document.getElementById('openCreateGroupModalBtn');
  if (openGroupModalBtn) {
    openGroupModalBtn.addEventListener('click', () => {
      state.showCreateGroupModal = true;
      renderApp();
    });
  }

  const openGroupModalHeroBtn = document.getElementById('openCreateGroupModalHeroBtn');
  if (openGroupModalHeroBtn) {
    openGroupModalHeroBtn.addEventListener('click', () => {
      state.showCreateGroupModal = true;
      renderApp();
    });
  }

  const emptyStateCreateBtn = document.getElementById('emptyStateCreateGroupBtn');
  if (emptyStateCreateBtn) {
    emptyStateCreateBtn.addEventListener('click', () => {
      state.showCreateGroupModal = true;
      renderApp();
    });
  }

  const closeGroupModalBtn = document.getElementById('closeCreateGroupModalBtn');
  if (closeGroupModalBtn) {
    closeGroupModalBtn.addEventListener('click', () => {
      state.showCreateGroupModal = false;
      renderApp();
    });
  }

  const cancelGroupModalBtn = document.getElementById('cancelCreateGroupModalBtn');
  if (cancelGroupModalBtn) {
    cancelGroupModalBtn.addEventListener('click', () => {
      state.showCreateGroupModal = false;
      renderApp();
    });
  }

  const modalBackdrop = document.getElementById('agencyCreateModalBackdrop');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        state.showCreateGroupModal = false;
        renderApp();
      }
    });
  }

  // Create Group Modal Form & Dynamic Preview
  const createGroupForm = document.getElementById('createGroupModalForm');
  if (createGroupForm) {
    createGroupForm.addEventListener('submit', handleCreateGroupTrip);

    const priceInput = document.getElementById('modalPricePerPersonInput');
    const membersInput = document.getElementById('modalMaxMembersInput');
    const summaryText = document.getElementById('modalBatchSummaryText');
    const totalVal = document.getElementById('modalTotalPoolVal');

    const updateModalSummary = () => {
      const p = Number(priceInput?.value || 0);
      const m = Number(membersInput?.value || 0);
      if (summaryText) summaryText.textContent = `${m} Traveler Slots @ INR ${p.toLocaleString('en-IN')}/person`;
      if (totalVal) totalVal.textContent = `INR ${(p * m).toLocaleString('en-IN')}`;
    };

    if (priceInput) priceInput.addEventListener('input', updateModalSummary);
    if (membersInput) membersInput.addEventListener('input', updateModalSummary);
  }

  // Group Filter Tabs
  document.querySelectorAll('[data-group-tab]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      state.groupActiveTab = btn.getAttribute('data-group-tab') || 'all';
      await loadTripGroups();
      renderApp();
    });
  });

  // Hide Full Groups Toggle Checkbox
  const hideFullToggle = document.getElementById('hideFullGroupsToggle');
  if (hideFullToggle) {
    hideFullToggle.addEventListener('change', async (e) => {
      state.groupHideFull = Boolean(e.target.checked);
      await loadTripGroups();
      renderApp();
    });
  }

  // Group Action Buttons (Join, Leave, Delete, Open Chat)
  document.querySelectorAll('[data-join-group]').forEach((button) => {
    button.addEventListener('click', () => {
      handleJoinGroup(button.getAttribute('data-join-group'));
    });
  });

  document.querySelectorAll('[data-leave-group]').forEach((button) => {
    button.addEventListener('click', () => {
      handleLeaveGroup(button.getAttribute('data-leave-group'));
    });
  });

  document.querySelectorAll('[data-delete-group]').forEach((button) => {
    button.addEventListener('click', () => {
      handleDeleteGroup(button.getAttribute('data-delete-group'));
    });
  });

  document.querySelectorAll('[data-open-conversation]').forEach((button) => {
    button.addEventListener('click', () => {
      const convId = button.getAttribute('data-open-conversation');
      if (convId) {
        state.activeConversationId = convId;
        routeTo('/chat');
      }
    });
  });

  document.querySelectorAll('[data-respond-request]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-respond-request') || '';
      const [requestId, action] = value.split(':');
      handleRespondJoinRequest(requestId, action);
    });
  });

  // Forms
  const authForm = document.getElementById('authForm');
  if (authForm) {
    authForm.addEventListener('submit', handleAuthSubmit);
  }

  const profileCreationForm = document.getElementById('profileCreationForm');
  if (profileCreationForm) {
    profileCreationForm.addEventListener('submit', handleProfileSubmit);
  }

  const preferencesForm = document.getElementById('preferencesForm');
  if (preferencesForm) {
    preferencesForm.addEventListener('submit', handlePreferencesSubmit);
  }

  const groupSearchInput = document.getElementById('groupSearchInput');
  if (groupSearchInput) {
    groupSearchInput.addEventListener('input', (e) => {
      state.groupSearchQuery = e.target.value;
      const grid = document.querySelector('.group-cards-grid');
      if (grid) {
        renderApp();
      }
    });
  }

  const groupDestSelect = document.getElementById('groupDestinationSelect');
  if (groupDestSelect) {
    groupDestSelect.addEventListener('change', async (e) => {
      state.groupDestinationFilter = e.target.value;
      await loadTripGroups(state.groupDestinationFilter);
      renderApp();
    });
  }

  // Bookings List Handlers
  const bookingSearchInput = document.getElementById('bookingSearchInput');
  if (bookingSearchInput) {
    bookingSearchInput.addEventListener('input', (e) => {
      state.bookingSearchQuery = e.target.value;
      const listContainer = document.querySelector('.bookings-list-container');
      if (listContainer) {
        renderApp();
      }
    });
  }

  const refreshBookingsBtn = document.getElementById('refreshBookingsBtn');
  if (refreshBookingsBtn) {
    refreshBookingsBtn.addEventListener('click', async () => {
      refreshBookingsBtn.disabled = true;
      refreshBookingsBtn.innerHTML = '<span>⏳ Refreshing...</span>';
      await loadBookings();
      renderApp();
    });
  }

  document.querySelectorAll('[data-copy-booking-msg]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const msg = btn.getAttribute('data-copy-booking-msg') || '';
      if (navigator.clipboard && msg) {
        navigator.clipboard.writeText(msg).then(() => {
          const original = btn.innerHTML;
          btn.innerHTML = '✓ Copied!';
          setTimeout(() => {
            btn.innerHTML = original;
          }, 2500);
        });
      }
    });
  });

  const chatForm = document.getElementById('chatForm');
  if (chatForm) {
    chatForm.addEventListener('submit', handleChatSubmit);
    const chatInput = chatForm.querySelector('input[name="text"]');
    if (chatInput) {
      chatInput.addEventListener('input', () => {
        state.chatDraft = chatInput.value;
      });
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          chatForm.requestSubmit();
        }
      });
    }

    const chatContainer = document.getElementById('chatMessagesContainer');
    const scrollBottomBtn = document.getElementById('chatScrollBottomBtn');

    if (chatContainer) {
      // Scroll to bottom on initial render
      chatContainer.scrollTop = chatContainer.scrollHeight;
      setTimeout(() => {
        if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 60);

      // Listen for user scroll: if scrolled up to read previous chats, show jump button
      chatContainer.addEventListener('scroll', () => {
        const distFromBottom = chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight;
        if (scrollBottomBtn) {
          if (distFromBottom > 160) {
            scrollBottomBtn.classList.remove('hidden');
          } else {
            scrollBottomBtn.classList.add('hidden');
          }
        }
      });
    }

    if (scrollBottomBtn && chatContainer) {
      scrollBottomBtn.addEventListener('click', () => {
        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
        scrollBottomBtn.classList.add('hidden');
      });
    }
  }

  const logoutButton = document.getElementById('logoutBtn');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('tripzenUserId');
      sessionStorage.removeItem('tripzenAdminUnlocked');
      sessionStorage.removeItem('tripzenAdminPassword');
      state.adminUnlocked = false;
      state.user = null;
      state.profile = null;
      state.matches = [];
      state.connectStatus = '';
      state.chatStatus = '';
      state.chatDraft = '';
      state.notificationMessage = '';
      state.unreadConversationCount = 0;
      state.packageStatus = '';
      state.packageBookingStatus = '';
      state.paymentStatus = '';
      state.packageSelections = [];
      state.planningBudget = '';
      state.planningMonth = '';
      state.planningTravelerCount = '2';
      state.packageFacilityFilter = 'All';
      state.groupStatus = '';
      state.groupStatusType = '';
      state.tripGroups = [];
      state.bookings = [];
      state.adminBookings = [];
      state.groupTitle = '';
      state.groupEstimatedCost = '';
      state.groupMaxMembers = '4';
      state.selectedMatchProfileId = '';
      state.authStatus = '';
      state.preferenceStatus = '';
      state.matchStatus = '';
      state.conversations = [];
      state.activeConversationId = '';
      state.messages = [];
      stopLiveSync();
      routeTo('/auth');
    });
  }

  hydrateAdminUI();
}

function hydrateAdminUI() {
  const unlockForm = document.getElementById('adminUnlockForm');
  if (unlockForm) {
    unlockForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pwd = document.getElementById('adminPasswordGateInput')?.value.trim();
      const errBox = document.getElementById('adminUnlockError');
      if (!pwd) return;

      sessionStorage.setItem('tripzenAdminPassword', pwd);
      try {
        const testRes = await api('/api/admin/check');
        if (testRes && testRes.success) {
          sessionStorage.setItem('tripzenAdminUnlocked', 'true');
          state.adminUnlocked = true;
          state.adminStatusMessage = '✓ RAW Data DB unlocked successfully!';
          state.adminStatusType = 'success';
          await loadAdminBookings();
        }
      } catch (err) {
        sessionStorage.removeItem('tripzenAdminUnlocked');
        sessionStorage.removeItem('tripzenAdminPassword');
        state.adminUnlocked = false;
        if (errBox) {
          errBox.textContent = 'Invalid administrator password. Access denied.';
          errBox.style.display = 'block';
        }
      }
    });
  }

  const refreshBtn = document.getElementById('refreshAdminBookingsBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', async () => {
      await loadAdminBookings();
    });
  }

  const searchInput = document.getElementById('adminSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.adminSearchQuery = e.target.value;
      renderApp();
      const updated = document.getElementById('adminSearchInput');
      if (updated) {
        updated.focus();
        updated.setSelectionRange(updated.value.length, updated.value.length);
      }
    });
  }

  const statusSelect = document.getElementById('adminStatusFilterSelect');
  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      state.adminStatusFilter = e.target.value;
      renderApp();
    });
  }

  const destSelect = document.getElementById('adminDestFilterSelect');
  if (destSelect) {
    destSelect.addEventListener('change', (e) => {
      state.adminDestinationFilter = e.target.value;
      renderApp();
    });
  }

  // Admin status dropdown changes
  document.querySelectorAll('.admin-status-dropdown').forEach((sel) => {
    sel.addEventListener('change', async (e) => {
      const bookingId = sel.getAttribute('data-change-status-id');
      const newStatus = e.target.value;
      try {
        await api(`/api/admin/bookings/${bookingId}`, 'PATCH', { bookingStatus: newStatus });
        state.adminStatusMessage = `✓ Booking status updated to "${newStatus}".`;
        state.adminStatusType = 'success';
        await loadAdminBookings();
      } catch (err) {
        state.adminStatusMessage = err.message || 'Failed to update status.';
        state.adminStatusType = 'error';
        renderApp();
      }
    });
  });

  // Admin save note buttons
  document.querySelectorAll('.admin-save-note-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const bookingId = btn.getAttribute('data-save-note-id');
      const input = document.querySelector(`.admin-note-input[data-note-input-id="${bookingId}"]`);
      const notes = input ? input.value.trim() : '';
      try {
        await api(`/api/admin/bookings/${bookingId}`, 'PATCH', { adminNotes: notes });
        state.adminStatusMessage = `✓ Note saved for booking.`;
        state.adminStatusType = 'success';
        await loadAdminBookings();
      } catch (err) {
        state.adminStatusMessage = err.message || 'Failed to save note.';
        state.adminStatusType = 'error';
        renderApp();
      }
    });
  });

  // Admin resend WhatsApp buttons
  document.querySelectorAll('.admin-resend-wa-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const bookingId = btn.getAttribute('data-resend-wa-id');
      try {
        btn.textContent = '⏳ Sending...';
        const res = await api(`/api/admin/bookings/${bookingId}/resend-whatsapp`, 'POST');
        state.adminStatusMessage = `✓ WhatsApp confirmation dispatched!`;
        state.adminStatusType = 'success';
        if (res.directSendUrl) {
          window.open(res.directSendUrl, '_blank');
        }
        await loadAdminBookings();
      } catch (err) {
        state.adminStatusMessage = err.message || 'Failed to send WhatsApp.';
        state.adminStatusType = 'error';
        renderApp();
      }
    });
  });

  // Admin delete booking buttons
  document.querySelectorAll('.admin-delete-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const bookingId = btn.getAttribute('data-delete-booking-id');
      if (!confirm('Are you sure you want to delete this booking record? This cannot be undone.')) return;
      try {
        await api(`/api/admin/bookings/${bookingId}`, 'DELETE');
        state.adminStatusMessage = `✓ Booking removed from database.`;
        state.adminStatusType = 'success';
        await loadAdminBookings();
      } catch (err) {
        state.adminStatusMessage = err.message || 'Failed to delete booking.';
        state.adminStatusType = 'error';
        renderApp();
      }
    });
  });
}

window.addEventListener('hashchange', async () => {
  state.route = window.location.hash.replace('#', '') || '/';
  if (routeNeedsTripData()) {
    await loadMatches();
    await loadTripGroups();
    await loadBookings();
    if (state.route === '/admin' && isAdminUser()) {
      await loadAdminBookings();
    }
    await loadConversations();
    startLiveSync();
  } else {
    stopLiveSync();
  }
  renderApp();
});

async function init() {
  const backendFound = await detectApiBase();
  if (!backendFound) {
    apiBase = 'http://localhost:3000';
  }

  await loadSession();
  if (state.user && (state.route === '/' || state.route === '/auth' || !state.route)) {
    state.route = '/profile';
    window.location.hash = '/profile';
  }
  if (routeNeedsTripData()) {
    requestBrowserNotificationPermission();
    await loadMatches();
    await loadTripGroups();
    await loadBookings();
    if (state.route === '/admin' && isAdminUser()) {
      await loadAdminBookings();
    }
    await loadConversations();
    startLiveSync();
  }
  renderApp();
}

init();
