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
        `description` VARCHAR(255) not NULL,
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
        "sentier des douaniers",
        "mer",
        "sentier des douaniers",
        19,
        "bsbpc-aa7215-emmanuel-berthier-800x810.jpg",
        1
    ), (
        "GR20_Corse",
        "montagne",
        "GR20 en Corse",
        22,
        "tour-du-mont-blanc.1613537.w430.jpg",
        1
    ); 
