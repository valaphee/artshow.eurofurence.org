CREATE TABLE bid
(
    id        UUID NOT NULL DEFAULT gen_random_uuid()
        PRIMARY KEY,

    bidder_id UUID NOT NULL
        REFERENCES "user",
    amount    INT
        CHECK (amount > 0)
);


CREATE TABLE exhibition_space_type
(
    id    INT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,

    name  TEXT NOT NULL
        UNIQUE
);

CREATE TABLE exhibition_space_request
(
    id                       INT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,

    exhibitor_id             UUID        NOT NULL
        REFERENCES "user",
    exhibition_space_type_id INT         NOT NULL
        REFERENCES exhibition_space_type,

    created_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE exhibition_space
(
    id                       INT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,

    exhibitor_id             UUID
        REFERENCES "user",
    exhibition_space_type_id INT NOT NULL
        REFERENCES exhibition_space_type
);

CREATE TABLE exhibit
(
    id                  INT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,

    exhibition_space_id INT  NOT NULL
        REFERENCES exhibition_space,

    name                TEXT NOT NULL,
    artist              TEXT,
    medium              TEXT,

    charity             INT  NOT NULL
        CHECK (charity BETWEEN 0 AND 100),
    minimum_bid         INT  NOT NULL
        CHECK (minimum_bid > 0),
    winning_bid         UUID
        UNIQUE
        REFERENCES bid
);
