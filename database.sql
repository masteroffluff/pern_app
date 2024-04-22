CREATE TABLE "Users" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "display_name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "birthday" date,
  "password_hash" varchar,
  "third_party_data" varchar,
  "third_party_provider" varchar,
  "phone_no" varchar,
  "colour" varchar
);

CREATE TABLE "User_PFP" (
  "id" int PRIMARY KEY,
  "type" char(12) NOT NULL,
  "data" bytea
);

CREATE TABLE "Items" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "type" int NOT NULL,
  "date" timestampz,
  "owner_id" int NOT NULL,
  "shared_to" int NOT NULL,
  "title" varchar,
  "notes" text,
  "reminder" bool
);

CREATE TABLE "Shared_To" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "shared_to_text" varchar
);

CREATE TABLE "Item_type" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "type" varchar NOT NULL
);

CREATE TABLE "Calendar_Details" (
  "item_id" int PRIMARY KEY,
  "date_from" timestamp NOT NULL,
  "date_to" timestamp NOT NULL,
  "place" varchar
);

CREATE TABLE "Attending" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "item_id" int NOT NULL,
  "person" int NOT NULL
);

CREATE TABLE "Todo_Items" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "item_id" int NOT NULL,
  "item_text" varchar,
  "item_done" bool
  
);

CREATE TABLE "Friends" (
  "user_id" int,
  "friend_id" int,
  "status" int,
  PRIMARY KEY(user_id,friend_id)
);

CREATE TABLE "Friends_status" (
  "id" int PRIMARY KEY,
  "status" varchar
);


ALTER TABLE "Items" ADD FOREIGN KEY ("type") REFERENCES "Item_type" ("id");

ALTER TABLE "User_PFP" ADD FOREIGN KEY ("id") REFERENCES "Users" ("id");

ALTER TABLE "Items" ADD FOREIGN KEY ("owner_id") REFERENCES "Users" ("id");

ALTER TABLE "Attending"
    ADD CONSTRAINT "Attending_calendar_id_fkey"
    FOREIGN KEY (item_id)
    REFERENCES "Calendar_Details"(item_id)
    ON DELETE CASCADE;

ALTER TABLE "Attending"
ADD CONSTRAINT attending_unique_item_id_person UNIQUE (item_id, person);

ALTER TABLE "Calendar_Details" ADD FOREIGN KEY ("item_id") REFERENCES "Items" ("id");

ALTER TABLE "Todo_Items" ADD FOREIGN KEY ("item_id") REFERENCES "Items" ("id");

ALTER TABLE "Friends" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");
ALTER TABLE "Friends" ADD FOREIGN KEY ("friend_id") REFERENCES "Users" ("id");
ALTER TABLE "Friends" ADD FOREIGN KEY ("status") REFERENCES "Friends_status" ("id");



-- populate state tables

INSERT INTO "Item_type" (id, type)
VALUES
(1, 'note'),
(2, 'todo'),
(3, 'reminder'),
(4, 'appointment'),
(5, 'event');

INSERT INTO "Friends_status" (id, status)
VALUES
(0, 'pending'),
(1, 'confirmed'),
(2, 'blocked'),
(3, 'unfollowed');

-- add trigger to make sure friends are always paired
CREATE OR REPLACE FUNCTION check_reverse_friendship() RETURNS TRIGGER AS $$
BEGIN
    -- Check if the reverse friendship exists
    IF EXISTS (
        SELECT 1 FROM "Friends"
        WHERE "user_id" = NEW.friend_id
        AND "friend_id" = NEW.user_id
    ) THEN
        RETURN NEW;
    ELSE
        RAISE EXCEPTION 'Reverse friendship does not exist.';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_reverse_friendship
AFTER INSERT ON "Friends"
FOR EACH ROW
EXECUTE FUNCTION check_reverse_friendship();

CREATE TRIGGER enforce_reverse_friendship_delete
AFTER DELETE ON "Friends"
FOR EACH ROW
EXECUTE FUNCTION check_reverse_friendship();

CREATE UNIQUE INDEX enforce_unique_friendship
ON "Friends" (LEAST("user_id", "friend_id"), GREATEST("user_id", "friend_id"));

-- set up role for users
CREATE ROLE user1 WITH LOGIN PASSWORD 'myPassword';
GRANT USAGE ON SCHEMA public TO user1;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO user1;
GRANT INSERT,DELETE,UPDATE ON "Users", "User_PFP", "Items", "Shared_To", "Calendar_Details", "Attending", "Todo_Items", "Friends" TO user1;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO user1;