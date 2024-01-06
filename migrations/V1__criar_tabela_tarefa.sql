CREATE TABLE livros (
  id int(11) NOT NULL,
  titulo varchar(50) NOT NULL,
  autor varchar(50) NOT NULL,
  publicado year(4) NOT NULL
) 
CREATE TABLE autores (
  id int(11) NOT NULL,
  autor varchar(50) NOT NULL,
  nascimento year(4) NOT NULL,
  nacionalidade varchar(50) NOT NULL
) 

