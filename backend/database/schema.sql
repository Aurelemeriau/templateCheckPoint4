DROP TABLE IF EXISTS `User`;

create table
    `user` (
        `id` int UNSIGNED primary key auto_increment not null,
        `pseudo` varchar(255) not null unique,
        `email` varchar(255) not null unique,
        `hashed_password` varchar(255) not null
    );
DROP TABLE IF EXISTS `rando`;

CREATE TABLE
    `rando` (
        `id` int primary key auto_increment not null,
        `title` varchar(50) not null,
        `categorie` VARCHAR(50) NOT NULL,
        `description` VARCHAR(900) not NULL,
        `distance` INT not NULL,
        `imageUrl` VARCHAR(100),
        `userId` int UNSIGNED not null,
        FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
    );

DROP TABLE IF EXISTS `commentaires`;

CREATE TABLE
    `commentaires` (
        `id` int primary key auto_increment not null,
        `description` VARCHAR(255) not NULL,
        `randoId` int NOT NULL,
        FOREIGN KEY (`randoId`) REFERENCES `rando`(`id`) ON DELETE CASCADE
    );

-- Insérer un utilisateur manuellement
INSERT INTO `user` (`pseudo`, `email`, `hashed_password`) 
VALUES ('admin', 'admin@example.com', 'hashed_password_here');

INSERT INTO
    `rando` (
        `title`,
        `categorie`,
        `description`,
        `distance`,
        `imageUrl`,
        `userId`
    )
VALUES (
        "Sentier des douaniers",
        "Mer",
        "Au départ du Mont-Saint-Michel, le GR 34 est un sentier de grande randonnée qui longe l’intégralité (ou presque) du littoral breton sur près de 1 700 kilomètres pour s’achever à Saint-Nazaire, en Loire-Atlantique.",
        11,
        "mer1.jpg",
        1
    ), (
        "GR20_Corse",
        "Montagne",
        "Le GR20 est le mythique sentier de randonnée qui traverse la Corse, de Calenzana (au Nord) à Conca (au sud). 200 km à travers les montagnes !
Il est annoncé comme étant l'un des sentiers de grande randonnée les plus durs d'Europe (mais aussi l'un des plus beaux). Il faut compter 16 jours pour un randonneur classique, à raison d'une étape par jour.",
        22,
        "montagne1.jpg",
        1
    ),
    (
        "Mont Etna",
        "Volcan",
        "Dominant la Sicile du haut de 3327 m, le (très) actif mont Etna est le plus haut volcan d’Europe. Inscrit au patrimoine de l’UNESCO, il est protégé par le Parco de’ll Etna, dans lequel on trouve une foule de sentiers de randonnées. Quatre cratères actifs sont accessibles aux randonneurs dans la zone du sommet. Mais pour voir le cratère principal, il faut un guide (et des conditions favorables). Une des randonnées populaires pour s’y rendre est la boucle d’environ 17 km, classée difficile, au départ du refuge de la Sapienza.",
        19,
        "volcan.jpg",
        1
    ),(
        "Le lac de la Maix",
        "Montagne",
        "le côté mystique du lieu, qui résonne aussi bien auprès des randonneurs que des pèlerins et des artistes !",
        12,
        "montagne2.jpg",
        1
    ),(
        "Crève Tête",
        "Montagne",
        "Tout autour de la montagne de Crève Tête, vous cheminerez à travers une grande variété de paysages et avec une vue sur la Chaîne des lauzières, le Col de la Madeleine et de la Vallée des Belleville.",
        9,
        "montagne3.gif",
        1
    ),(
        "Dunes du cap Gris-Nez",
        "Mer",
        "Le cap Gris-Nez, site de falaises classées avec le cap Blanc-Nez, est un incontournable de la côte d’Opale. Il sépare la Manche de la mer du Nord.",
        13,
        "mer2.webp",
        1
    ),(
        "Trouville",
        "Mer",
        "Si les artistes parisiens débarquèrent de la nouvelle gare Trouville-Deauville en 1863, c’est le peintre de marine Charles Mozin qui fut le premier, en 1825, à « découvrir » ce petit port de pêche autour d’un parc à huîtres…",
        15,
        "mer3.jpg",
        1
    ),(
        "Le sentier du littoral au Pays basque",
        "Mer",
        "Ongi ettori! Bienvenue en terre basque, terre d'accueil à l'esprit sauvage, encastrée entre ciel et mer...Ici, les éléments s'imbriquent parfaitement pour offrir aux randonneurs une succession de paysages à couper le souffle le long de la corniche basque. Un site naturel unique où les hautes falaises de Flysch côtoient des panoramas magnifiques ouverts sur l'océan.",
        19,
        "mer4.jpg",
        1
    );
