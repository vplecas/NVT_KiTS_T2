--truncating tables
--comment out if needed
TRUNCATE TABLE cultural_heritage RESTART IDENTITY CASCADE;
TRUNCATE TABLE chtype RESTART IDENTITY CASCADE;
TRUNCATE TABLE chsubtype RESTART IDENTITY CASCADE;
TRUNCATE TABLE admin RESTART IDENTITY CASCADE;
TRUNCATE TABLE authenticated_user RESTART IDENTITY CASCADE;
TRUNCATE TABLE comment RESTART IDENTITY CASCADE;
TRUNCATE TABLE images RESTART IDENTITY CASCADE;
TRUNCATE TABLE location RESTART IDENTITY CASCADE;
TRUNCATE TABLE news RESTART IDENTITY CASCADE;
TRUNCATE TABLE rating RESTART IDENTITY CASCADE;
TRUNCATE TABLE subscription RESTART IDENTITY CASCADE;



--TYPES
INSERT INTO chtype (id, name) VALUES  (1, 'manifestation');
INSERT INTO chtype (id, name) VALUES (2, 'institution');
INSERT INTO chtype (id, name) VALUES (3, 'cultural heritage');


-- SUBTYPES
INSERT INTO chsubtype (id, name, chtype_id) VALUES (1, 'festival', 1);
INSERT INTO chsubtype (id, name, chtype_id) VALUES (2, 'fair', 1);
INSERT INTO chsubtype (id, name, chtype_id) VALUES(3, 'museum', 2);
INSERT INTO chsubtype (id, name, chtype_id) VALUES (4, 'monument', 3);
INSERT INTO chsubtype (id, name, chtype_id) VALUES (5, 'landmark', 3);
INSERT INTO chsubtype (id, name, chtype_id) VALUES (6, 'library', 2);
INSERT INTO chsubtype (id, name, chtype_id) VALUES (7, 'national park', 3);
INSERT INTO chsubtype (id, name, chtype_id) VALUES (8, 'monastery', 3);


--ADMIN
INSERT INTO admin (id, first_name, last_name, email, password, approved) VALUES (1, 'John', 'Smith', 'admin@gmail.com', 'admin', 'true');


--USERS
INSERT INTO authenticated_user (id, first_name, last_name, email, password, approved) VALUES (1,'Helen', 'York', 'helen@hotmail.com', '123', 'true');
INSERT INTO authenticated_user (id, first_name, last_name, email, password, approved) VALUES (2,'Sima', 'Matas', 'sima12@hotmail.com', '123', 'true');
INSERT INTO authenticated_user (id, first_name, last_name, email, password, approved) VALUES (3,'Margene', 'Weatherwax', 'Weatherwax12@gmail.com', '123', 'true');
INSERT INTO authenticated_user (id, first_name, last_name, email, password, approved) VALUES (4,'Everette', 'Desch', 'heldesch123en@hotmail.com', '123', 'true');
INSERT INTO authenticated_user (id, first_name, last_name, email, password, approved) VALUES (5,'Doyle', 'Mormon', 'doyle@hotmail.com', '123', 'true');
INSERT INTO authenticated_user (id, first_name, last_name, email, password, approved) VALUES (6,'Krysta', 'Brooking', 'krystbrooking@hotmail.com', '123', 'true');
INSERT INTO authenticated_user (id, first_name, last_name, email, password) VALUES (7,'Ossie', 'Dudas', 'ossie12@hotmail.com', '123');
INSERT INTO authenticated_user (id, first_name, last_name, email, password) VALUES (8,'Hilario', 'Elliot', 'elliorhilario@hotmail.com', '123');
INSERT INTO authenticated_user (id, first_name, last_name, email, password, approved) VALUES (9,'Inell', 'Becton', 'Inell@hotmail.com', '123', 'false');


--LOCATIONS 
    --FESTIVALS
INSERT INTO location (id, city, country, latitude, longitude) VALUES (1, 'Venice', 'Italy', '45.438759', '12.327145');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (2, 'Valencia', 'Spain', '39.466667', '-0.375000');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (3, 'New Orleans', ' Louisiana', '29.951065', '-90.071533');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (4, 'Park City', 'Utah', '40.646061', '-111.497971');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (5, 'Toronto', 'Canada', '43.653225', '-79.383186');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (6, 'Amsterdam', 'Netherlands', '52.370216', '4.895168');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (7, 'Oxford', 'England', '51.752022', '-1.257726');
INSERT INTO location (id, city, country, latitude, longitude) VALUES  (8, 'Bordeaux', 'France', '44.836151', '-0.580816');
    --MUSEUMS
INSERT INTO location (id, city, country, latitude, longitude) VALUES (9, 'Paris', 'France', '48.864716', '2.349014');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (10, 'Beijing', 'China', '39.916668', '116.383331');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (11, 'Washington', 'US', '47.751076', ' -120.740135');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (12, 'Washington', 'US', '47.751076', ' -120.740135');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (13, 'London', 'England', '51.509865', '-0.118092');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (14, 'London', 'England', '51.509865', '-0.118092');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (15, 'New York', 'US', '40.730610', '-73.935242');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (16, 'Taipei', 'Taiwan', '25.105497', '121.597366');




    -- FAIRS
INSERT INTO location (id, city, country, latitude, longitude) VALUES (17, 'Louisville', 'Kentucky, USA', '38.256111', '-85.751389');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (18, 'Dalls', 'Texas, USA', '32.779167', '-96.808889');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (19, 'Hong Kong', 'China', '22.302711', '114.177216');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (20, 'Hannover', 'Germany', '52.31910835381842', '9.800854478047036');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (21, 'Belgrade', 'Serbia', '44.796111', '20.435556');

    -- LIBRARIES
INSERT INTO location (id, city, country, latitude, longitude) VALUES (22, 'New York City', 'New York, USA', '40.71274', '-74.005974');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (23, 'Beijing', 'China', '39.906667', '116.3975');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (24, 'Melbourne', 'Australia', '-37.813611', '144.963056');


    -- NATIONAL PARKS
INSERT INTO location (id, city, country, latitude, longitude) VALUES (25, 'Maasai Mara', 'Kenya', '-1.49', '35.143889');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (26, 'Mariposa', 'California, USA', '37.7425', '119.5375');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (27, 'Puerto Natales', 'Chile', '-51', '-73');

    -- MONASTERIES
INSERT INTO location (id, city, country, latitude, longitude) VALUES (28, 'Alcobaça ', 'Portugal', '39.548333', ' -8.98');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (29, 'Niksic', 'Montenegro', '42.675', '19.029167');
INSERT INTO location (id, city, country, latitude, longitude) VALUES (30, 'Thessaly', 'Greece', '39.714167', '21.631111');

--CULTURAL HERITAGES 
    --FESTIVALS CHSUBTYPE_ID = 1
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (1, 'Venice Carnival', 1, 1,'The Carnival of Venice (Italian: Carnevale di Venezia) is an annual festival, held in Venice, Italy. The Carnival starts forty days before Easter and ends on Shrove Tuesday (Fat Tuesday or Martedì Grasso), the day before Ash Wednesday. Dove il gabinetto! In other words, At a carnival, every joke is disgraced!');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (2, 'La Tomatina Festival',2, 1, 'La Tomatina is a festival that is held in the Valencian town of Buñol, a town located 30 km inland from the Mediterranean Sea in which participants throw tomatoes and get involved in this tomato fight purely for fun. It is held on the last Wednesday of August, during the week of festivities of Buñol.');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (3, 'New Orleans Jazz Festival', 3, 1, 'The New Orleans Jazz & Heritage Festival, often known as Jazz Fest, is an annual celebration of the music and culture of New Orleans and Louisiana. Use of the term "Jazz Fest" can also include the days surrounding the Festival and the many shows at unaffiliated New Orleans nightclubs scheduled during the Festival event weekends.');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (4, 'Sundance Film Festival', 4, 1, 'The Sundance Film Festival is an American film festival that takes place annually in Utah. It is the largest independent cinema festival in the United States. Held in January in Park City, Salt Lake City, and Ogden, as well as at the Sundance Resort, the festival is a showcase for new work from American and international independent filmmakers.');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (5, 'Toronto International Film Festival', 5, 1, 'The Toronto International Film Festival (TIFF) is a publicly attended film festival held each September in Toronto, Ontario, Canada.');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (6, 'Amsterdam Gay Pride', 6, 1, 'The Amsterdam Pride is an annual gay festival in the centre of Amsterdam, organized in the first weekend of August. With several hundreds of thousands visitors this event is one of the largest public events of the Netherlands. The pride is organized since 1996. The peak of the festival is during the canal parade, a parade of boats of large variety on the first Saturday of August, which usually goes from Westerdok over the Prinsengracht, Amstel river, Zwanenburgwal and Oudeschans to Oosterdok.');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (7, 'Oxford Literary Festival', 7, 1, 'The Sunday Times Oxford Literary Festival is an annual literary festival where visitors can meet and listen to authors and experts from a wide range of fields discussing a variety of topics from literature, politics, history, philosophy, economics, science, culinary, travel, environment and religion, to mention only a few.');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (8, 'Bordeaux Wine Festival', 8, 1, 'This festival, organised by the town of Bordeaux, is an opportunity for fans of fine wine, good food and culture to enjoy a great festive moment. It will be a celebration of the senses on the largest square in Europe, right on the banks of the Garonne. The riverbanks and the Esplanade des Quinconces will welcome more than 300 000 gastronomers and culture-vultures throughout this four-day event.');

    --FAIRS CHSUBTYPE_ID = 2

INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (17, 'Kentucky State Fair', 17, 2, 'From the incredible horse shows, Gourmet Garden chef demonstrations and live music from popular artists like Meghan Trainor, Eric Paslay, Aretha Franklin and the Oak Ridge Boys, what’s not to love? The Kentucky State Fair first started more than 100 years ago with trick bears, award-winning horses and the Parade of Champions and it’s still going strong with more than 500,000 people in attendance in 2014' );
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (18, 'State Fair of Texas', 18, 2, 'The Texas State Fair is well known for debuting some of the most delicious deep fried foods. Year after year, the craziest fried foods are introduced to the public, like deep fried milk and cookies on a stick, fried pumpkin spice oreo, fried chocolate maple bacon amazeballz and deep fried sweet tea. Not to mention the larger-than-life carnival rides that the kids will love. If you can''t get enough of fairs, be sure to head to the Crosby Fairgrounds to attend another local fair!' );
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (19, 'HKTDC Hong Kong Electronics Fair (Spring Edition', 19, 2, 'Asia''s Largest Spring Electronics Fair organised by the HKTDC and held at the HKCEC, the Hong Kong Electronics Fair (Spring Edition) presents all kinds of electronics products and services such as wearables, 3D printing, IoT, unmanned tech, audio-visual products, branded electronics, eco-friendly products, i-World, packaging & design, navigation systems, new inventions, telecommunications products and testing, inspection & certification services.' );
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (20, 'Hannover Messe', 20, 2, 'In the future, HANNOVER MESSE will feature display areas that reflect the core segments of industry and its transformation. The three pillars are industry, energy and logistics. Key data and trade fair statistics for the entire event from 2020 can be found under the entry for HANNOVER MESSE. The world''s leading trade show for industrial technology is the driver of 21st century''s industrial transformation. The exhibitors will showcase new products along the entire industry value chain that contribute to the guiding theme Industrial Transformation.' );
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (21, 'Belgrade Fair', 21, 2, 'Every year Belgrade Fair hosts over 30 regular international fair manifestations. Over 5,000 companies exhibit on the Belgrade Fair annually, with more than 1.500,000 visitors Many of these manifestations are members of respectable international organizations: the International Fair of Technique and Technical Advancements, International Fair of Clothing - World Fashion, International Fair of Furniture, Equipment and Internal Decorations, and SEEBBE (Southeast Europe Building Belgrade Expo) are members of UFI, Paris.' );


    --LIBRARIES CHSUBTYPE_ID = 6
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (22, 'New York Public Library', 22, 6, 'The New York Public Library (NYPL) is a public library system in New York City. With nearly 53 million items and 92 locations, the New York Public Library is the second largest public library in the United States (behind the Library of Congress) and the third largest in the world (behind the British Library).');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (23, 'National Library of China', 23, 6, 'National Library of China in Beijing is the national library of the People'' Republic of China. With a collection of over 37 million items, it is one of the largest libraries in Asia and one of the largest in the world. It holds the largest collections of Chinese literature and historical documents in the world');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (24, 'State Library of Victoria', 24, 6, 'Located in Melbourne, it was established in 1854 as the Melbourne Public Library, making it Australia''s oldest public library and one of the first free libraries in the world. It is also Australia''s busiest library and, as of 2018, the fourth most-visited library in the world.');


    --NATIONAL PARKS CHSUBTYPE_ID = 7
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (25, 'Maasai Mara', 25, 7, 'Maasai Mara, also sometimes spelled Masai Mara and locally known simply as The Mara, is a large national game reserve in Narok, Kenya, contiguous with the Serengeti National Park in Tanzania. It is named in honor of the Maasai people, the ancestral inhabitants of the area, who migrated to the area from the Nile Basin. Their description of the area when looked at from afar: "Mara" means "spotted" in the local Maasai language, due to the many short bushy trees which dot the landscape.');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (26, 'Yosemite', 26, 7, 'One of California''s most formidable natural landscapes, Yosemite National Park features nearly 1,200 square miles of sheer awe: towering waterfalls, millennia-old Sequoia trees, striking, daunting cliff faces and some of the most unique rock formations in the United States. But despite its enormous size, most of the tourist activity takes place within the 8-square-mile area of Yosemite Valley. Here you''l find the park''s most famous landmarks – Half Dome and El Capitan – as well as excellent hiking trails through the natural monuments.');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (27, 'Torres del Paine', 27, 7, 'Torres del Paine is a national park encompassing mountains, glaciers, lakes, and rivers in southern Chilean Patagonia. The Cordillera del Paine is the centerpiece of the park. It lies in a transition area between the Magellanic subpolar forests and the Patagonian Steppes. The park is located 112 km (70 mi) north of Puerto Natales and 312 km (194 mi) north of Punta Arenas.');



    -- MONASTERIES CHSUBTYPE_ID = 8
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (28, 'Alcobaca Monastery', 28, 8, 'The Alcobaça Monastery is a Roman Catholic Monastery located in the town of Alcobaça, in central Portugal. It was founded by the first Portuguese King, Afonso Henriques, in 1153, and maintained a close association with the Kings of Portugal throughout its history. The church and monastery were the first Gothic buildings in Portugal, and, together with the Monastery of Santa Cruz in Coimbra, it was one of the most important of the medieval Christian monasteries in Portugal.');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (29, 'Ostrog Monastery', 29, 8, 'The Monastery of Ostrog is a Serb Orthodox monastery placed against an almost vertical background, high up in the large rock of Ostroška Greda. It is dedicated to Saint Basil of Ostrog and is the most popular pilgrimage place in Montenegro. Founded in the 17th century, the present-day look was given in 1923-1926, after a fire which had destroyed the major part of the complex. Fortunately, the two little cave-churches were spared and they are the key areas of the monument.');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (30, 'Meteora', 30, 8, 'Metéora (''suspended in the air'') is one of the largest and most important complexes of Eastern Orthodox monasteries in Greece, second only to Mount Athos. The six Christian monasteries are built on natural sandstone rock pillars in central Greece. In the 14th century, Athanasios Koinovitis from Mount Athos founded the great Meteoron monastery on Broad Rock. The location was perfect for the monks; they were safe from political upheaval and had complete control of the entry to the moasteries.');

    --MUSEUMS CHSUBTYPE_ID = 3
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (9, 'The Louvre', 9, 3, 'The Louvre holds strong at number one with around 9.3 million visitors annually. Of those guests, 30% are domestic residents, typically visiting temporary exhibitions, and 70% are international attendees visiting the Paris landmark and the permanent exhibits. The Louvre houses masterpiece artworks like Leonardo Da Vinci’s ‘Mona Lisa’, the ‘Venus de Milo’ sculpture of Aphrodite, and what is considered to be the finest diamond in the world, the ‘Regent’. As one of the world’s largest museums, the Louvre houses around 70,000 pieces of art in its 650,000 square feet of gallery space.');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (10, 'National Museum of China', 10, 3, 'The National Museum of China in Beijing comes in at number two, with 7.6 million visitors in 2014. The free museum was founded in 2003 when two museums (the National Museum of Chinese History and the National Museum of Chinese Revolution) were merged, and it is conveniently located in Tiananmen Square. The museum is now one of the largest in the world, covering 192,000 square meters. ');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (11, 'National Museum of Natural History', 11, 3, 'Part of the Smithsonian Institution in Washington DC, the National Museum of Natural History is the most visited museum in the United States and the most visited natural history museum in the world with 7.3 million visitors in 2014. The free museum opened in 1910 and was one of the first Smithsonian buildings. It houses more than 126 million natural science specimens and cultural artefacts, including 30 million pinned insects, 4.5 million pressed plants');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (12, 'National Air and Space Museum ', 12, 3, 'The National Air and Space Museum is the largest collection of artefacts of human flight, and also the largest of all 19 museums included in the Smithsonian Institution. In 2014 the DC museum saw 6.7 million visitors, but combined with its second location in Virginia, there were around 8 million visitors. The wonder and awe of human flight will capture anyone’s heart after wandering through this free museum. Included in the museum is the oldest known photo of an aircraft, the 1903 Wright Flyer, the space shuttle Discovery, and much more.');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (13, 'British Museum', 13, 3, 'Founded in 1753, the British Museum was the first national public museum in the world, and today it is Britain’s most-visited with 6.7 million visitors in 2014. Entry has always been free at the British Museum. Some of the museum’s most important and sought-after acquisitions include the Rosetta Stone, Parthenon sculptures, and ancient Egyptian structures. ');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (14, 'The National Gallery', 14, 3, 'The National Gallery is the largest art gallery in the UK, and in 2014 6.4 million visitors came to see the collection of works from the 13th to the 19th centuries of Western European art. The gallery, which is free to the public, opened in 1838 in the center of ');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (15, 'The Metropolitan Museum of Art', 15, 3, 'The largest and most popular art gallery in the United States is The Metropolitan Museum of Art in New York City, commonly known as The Met, which had 6.3 million visitors in 2014. The Met’s permanent collection holds more than 2 million works spanning 5,000 years from ancient Egypt to Europe’s classics to American and modern work. The main building was founded in 1870 and is located on Central Park along Manhattan’s Museum Mile.');
INSERT INTO cultural_heritage (id, name, location_id, chsubtype_id, description) VALUES (16, 'National Palace Museum', 16, 3, 'The National Palace Museum in Taiwan boasted 5.4 million visitors in 2014 who came to view the collection of ancient Chinese art and artefacts. The museum’s permanent collection includes around 700,000 works of art. This museum shares a history with the Palace Museum in Beijing, the old Palace Museum split in two after the Chinese Civil War when the Republic of China of Taiwan was formed. The collection includes paintings, jades, ceramics, bronzes, rare books, calligraphy, and more.');