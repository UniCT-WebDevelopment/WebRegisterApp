DELIMITER !
create trigger inserisciProgettistaAfterUpdate 
after update on esame 
for each row
BEGIN
	if(new.stato = "Progetto" or new.stato = "progetto") then
		insert into progettista(idAppello,matricola,voto,votoProgetto,votoFinale,dataConsegna,esito,titoloProgetto) 
		values (new.idAppello,new.matricola,new.votoComplessivo,0,'-','-','-','-'); 
	end if;
END; !
DELIMITER ;


DELIMITER !
create trigger inserisciProgettista 
after insert on esame 
for each row
BEGIN
	if(new.stato = "Progetto" or new.stato = "progetto") then
		insert into progettista(idAppello,matricola,voto,votoProgetto,votoFinale,dataConsegna,esito,titoloProgetto) 
		values (new.idAppello,new.matricola,new.votoComplessivo,0,'-','-','-','-'); 
	end if;
END; !
DELIMITER ;