CREATE TABLE play_station
(
    id SERIAL PRIMARY KEY NOT NULL,
    game VARCHAR(100) NOT NULL,
    release date
);

CREATE TABLE nintendo_64
(
    id SERIAL PRIMARY KEY NOT NULL,
    game VARCHAR(100) NOT NULL,
    release date
);

CREATE TABLE xbox
(
    id SERIAL PRIMARY KEY NOT NULL,
    game VARCHAR(100) NOT NULL,
    release date
);

CREATE TABLE play_station_2
(
    id SERIAL PRIMARY KEY NOT NULL,
    game VARCHAR(100) NOT NULL,
    release date
);

CREATE TABLE xbox_360
(
    id SERIAL PRIMARY KEY NOT NULL,
    game VARCHAR(100) NOT NULL,
    release date
);

CREATE TABLE xbox_one
(
    id SERIAL PRIMARY KEY NOT NULL,
    game VARCHAR(100) NOT NULL,
    release date
);

CREATE TABLE game_cube
(
    id SERIAL PRIMARY KEY NOT NULL,
    game VARCHAR(100) NOT NULL,
    release date
);

CREATE TABLE pc
(
    id SERIAL PRIMARY KEY NOT NULL,
    game VARCHAR(100) NOT NULL,
    release date
);

INSERT INTO play_station(game, release) VALUES ('The Legend of Dragoon', '1999-12-02');
INSERT INTO play_station(game, release) VALUES ('Final Fantasy IX', '2000-07-07');

INSERT INTO play_station_2(game, release) VALUES ('Kingdom Hearts', '2002-03-28');
INSERT INTO play_station_2(game, release) VALUES ('Kindom Hearts II', '2005-12-22');

INSERT INTO nintendo_64(game, release) VALUES ('The Legend of Zelda: Ocarina of Time', '1998-11-21');
INSERT INTO nintendo_64(game, release) VALUES ('The Legend of Zelda: Majoras Mask', '2000-04-27');

INSERT INTO xbox(game, release) VALUES ('Halo: Combat Evolved', '2001-11-15');
INSERT INTO xbox(game, release) VALUES ('Halo 2', '2004-11-09');

INSERT INTO xbox_360(game, release) VALUES ('Halo 3', '2007-09-25');
INSERT INTO xbox_360(game, release) VALUES ('Halo 4', '2012-11-06');

INSERT INTO xbox_one(game, release) VALUES ('Halo 5', '2015-10-27');
INSERT INTO xbox_one(game, release) VALUES ('Destiny 2', '2017-09-06');

INSERT INTO game_cube(game, release) VALUES ('Metroid Prime', '2002-11-17');
INSERT INTO game_cube(game, release) VALUES ('Metroid Prime 2', '2004-11-15');

INSERT INTO pc(game, release) VALUES ('Star Craft', '1998-03-31');
INSERT INTO pc(game, release) VALUES ('Star Craft II', '2010-07-27');



DELETE FROM example WHERE game = 'stuff';
