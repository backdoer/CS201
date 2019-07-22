 CREATE OR REPLACE TRIGGER DUPE_APPT
 	BEFORE INSERT
 	ON APPOINTMENT

 	BEGIN
 		dbms_output.put_line ('just testing....');
 	END;