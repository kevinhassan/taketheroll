-- Regarder dans la table absence si à la creation du retard l'absence est présente
-- Dans ce cas supprimer l'absence et ajouter le retard

CREATE OR REPLACE FUNCTION before_insert_late() RETURNS trigger AS $before_insert_late$
  BEGIN
    DELETE FROM absence
    WHERE absence.id_Course=NEW.late.id_Course
    AND absence.id_Student=NEW.late.id_Student;
    RETURN NEW;
  END;
  $before_insert_late$ LANGUAGE plpgsql;
  CREATE TRIGGER before_insert_late BEFORE INSERT ON late
    FOR EACH ROW
    EXECUTE PROCEDURE before_insert_late();

-- Ajouter une date lors de la création d'un utilisateur

  CREATE OR REPLACE FUNCTION after_insert_user() RETURNS trigger AS $after_insert_user$
    BEGIN
      UPDATE users
      SET users.creation_date = now()
      WHERE users.id_User= users.NEW.id_User;
      RETURN NULL;--Ignoré car trigger AFTER
    END;
    $after_insert_user$ LANGUAGE plpgsql;
    CREATE TRIGGER after_insert_user AFTER INSERT ON users
      FOR EACH ROW
      EXECUTE PROCEDURE after_insert_user();
