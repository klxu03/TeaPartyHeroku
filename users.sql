CREATE TABLE users (
    id SERIAL,
    discordid VARCHAR(20) NOT NULL,
    name VARCHAR(35) NOT NULL,
    exp INT NOT NULL,
    level INT NOT NULL,
    PRIMARY KEY (id)
);