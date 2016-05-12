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
