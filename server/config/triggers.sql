-- Regarder dans la table absence si à la creation du retard l'absence est présente
-- Dans ce cas supprimer l'absence et ajouter le retard

CREATE FUNCTION before_insert_late() RETURNS trigger AS $before_insert_late$
  BEGIN
    DELETE FROM absence WHERE "id_Course"=NEW.id_Course AND "id_Student"=NEW.id_Student;
    RETURN NEW;
  END;
  $before_insert_late$ LANGUAGE plpgsql;
  CREATE TRIGGER before_insert_late BEFORE INSERT ON late
    FOR EACH ROW EXECUTE PROCEDURE before_insert_late();

-- Ajouter un utilisateur après avoir créé un étudiant ou un professeur ou un administrateur

  CREATE FUNCTION after_insert_user() RETURNS trigger AS $after_insert_user$
    BEGIN
      --Ajouter date 
      RETURN NULL;--Ignoré car trigger AFTER
    END;
    $after_insert_user$ LANGUAGE plpgsql;
    CREATE TRIGGER before_insert_user AFTER INSERT ON users
      FOR EACH ROW EXECUTE PROCEDURE after_insert_user();
