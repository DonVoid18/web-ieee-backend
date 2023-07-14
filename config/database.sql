CREATE TABLE users (
    id INT(11) NOT NULL AUTO_INCREMENT name VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    dateRegister VARCHAR(30) NOT NULL,
    phoneNumber VARCHAR(30) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)
INSERT INTO
    `users` (
        `id`,
        `name`,
        `lastName`,
        `dateRegister`,
        `phoneNumber`,
        `email`,
    )
VALUES
    (
        NULL,
        'Patrick',
        'Rios Nolasco',
        '12/12/12',
        '923929304',
        'angelopatrickriosnolasco@gmail.com'
    )