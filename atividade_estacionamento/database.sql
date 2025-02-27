create database sistema_carros;
use sistema_carros;

drop database sistema_carros;

create table carros(
	id int auto_increment primary key,
    placa VARCHAR(10),
    modelo VARCHAR(50) NOT NULL,
    cor VARCHAR(30) NOT NULL
);

Insert into carros (placa, modelo, cor) values ('829293', 'ford', 'preto');

select * from carros;
