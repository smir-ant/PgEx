/* 
данные для заполнения таблицы | при подключении создаётся переменная createDB
*/

/* [
    'название таблицы',
    'создание таблицы',
    'наполнение таблицы'
]
*/

// INSERT INTO ${tablename} и CREATE TABLE ${tablename} пропущено, чтобы не оборачивать это в функцию с аргументом и всё такое..
export const createDB = [
    `playlist`,

    ` (
    id SERIAL PRIMARY KEY, 
    Title VARCHAR(255) NOT NULL, 
    Artist VARCHAR(255) NOT NULL, 
    Release INT NOT NULL, 
    Genre VARCHAR(255) NOT NULL);`
    
,` (Title, Artist, Release, Genre) VALUES
    ('Snowfall', 'Øneheart', 2022, 'ambient'),
    ('Bring Me to Life', 'Evanescence', 2003, 'rock'),
    ('Girlfriend', 'Avril Lavigne', 2007, 'rock'),
    ('Take On Me', 'a-ha', 1985, 'pop'),
    ('N.Y. State of Mind', 'Nas', 1994, 'rap'),
    ('Bring Me to Life', 'Evanescence', 2003, 'rock'),
    ('Untitled #1', 'Alaskan Tapes', 2017, 'ambient'),
    ('Переплетено', 'Oxxxymiron', 2015, 'rap'),
    ('Sk8er Boi', 'Avril Lavigne', 2002, 'rock'),
    ('Bad Guy', 'Billie Eilish', 2019, 'pop'),
    ('What a Wonderful World', 'Louis Armstrong', 1967, 'jazz'),
    ('On the Nature of Daylight', 'Max Richter', 2004, 'ambient'),
    ('Smells Like Teen Spirit', 'Nirvana', 1991, 'rock'),
    ('All Star', 'Smash Mouth', 1999, 'rock'),
    ('301210', 'Antonymes', 2011, 'ambient'),
    ('Song 2', 'Blur', 1997, 'rock'),
    ('Thunder', 'Imagine Dragons', 2017, 'pop'),
    ('My Happy Ending', 'Avril Lavigne', 2004, 'rock'),
    ('Take Five', 'Dave Brubeck', 1959, 'jazz'),
    ('Знаешь ли ты', 'МакSим', 2006, 'pop'),
    ('Seven Nation Army', 'The White Stripes', 2003, 'rock'),
    ('Tramlines', 'Neil Cowley', 2021, 'ambient'),
    ('Всё для тебя', 'Стас Михайлов', 2009, 'pop'),
    ('My Favorite Things', 'John Coltrane', 1961, 'jazz'),
    ('Captain', 'Miyagi', 2018, 'rap'),
    ('Complicated', 'Avril Lavigne', 2002, 'rock'),
    ('Paradise City', 'Guns N'' Roses', 1987, 'rock'),
    ('Blue in Green', 'Miles Davis', 1959, 'jazz'),
    ('Lose Yourself', 'Eminem', 2002, 'rap')
;`]