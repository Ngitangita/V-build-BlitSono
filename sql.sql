--php artisan serve

CREATE DATABASE blit_sono;

-- Table: roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL UNIQUE
);

-- Table: users (clients + admins)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    role_id INT NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Table: categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

-- Table: materiels
CREATE TABLE materiels (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    description TEXT,
    catégorie_id INT NOT NULL,
    prix_location NUMERIC(10,2) NOT NULL,
    stock INT DEFAULT 0,
    image_url VARCHAR(255),
    FOREIGN KEY (catégorie_id) REFERENCES categories(id)
);

-- Table: packs
CREATE TABLE packs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    description TEXT,
    prix_total NUMERIC(10,2) NOT NULL
);

-- Table: pack_materiels
CREATE TABLE pack_materiels (
    id SERIAL PRIMARY KEY,
    pack_id INT NOT NULL,
    materiel_id INT NOT NULL,
    quantite INT NOT NULL DEFAULT 1,
    FOREIGN KEY (pack_id) REFERENCES packs(id) ON DELETE CASCADE,
    FOREIGN KEY (materiel_id) REFERENCES materiels(id) ON DELETE CASCADE
);

-- Enum type for reservation status
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'statut_reservation') THEN
        CREATE TYPE statut_reservation AS ENUM ('en_attente', 'validee', 'confirmee', 'annulee');
    END IF;
END
$$;

-- Enum type for etat commande (devis/commande)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'etat_commande') THEN
        CREATE TYPE etat_commande AS ENUM ('non_emis', 'devis_envoye', 'commande_validee', 'commande_annulee');
    END IF;
END
$$;

-- Table: reservations
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    date_evenement DATE NOT NULL,
    heure_evenement TIME NOT NULL,
    duree_heure INT NOT NULL,
    lieu VARCHAR(255),
    statut statut_reservation DEFAULT 'en_attente',
    prix_estime NUMERIC(10,2),
    prix_final NUMERIC(10,2),
    calendar_event_id VARCHAR(255),
    etat_commande etat_commande DEFAULT 'non_emis',
    date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table: reservation_materiels
CREATE TABLE reservation_materiels (
    id SERIAL PRIMARY KEY,
    reservation_id INT NOT NULL,
    materiel_id INT NOT NULL,
    quantite INT NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE,
    FOREIGN KEY (materiel_id) REFERENCES materiels(id) ON DELETE CASCADE
);

-- Table: reservation_packs
CREATE TABLE reservation_packs (
    id SERIAL PRIMARY KEY,
    reservation_id INT NOT NULL,
    pack_id INT NOT NULL,
    quantite INT NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE,
    FOREIGN KEY (pack_id) REFERENCES packs(id) ON DELETE CASCADE
);

-- Table: paiements
CREATE TABLE paiements (
    id SERIAL PRIMARY KEY,
    reservation_id INT NOT NULL,
    montant NUMERIC(10,2) NOT NULL,
    moyen_paiement VARCHAR(50),
    date_paiement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);

-- Table: devis
CREATE TABLE devis (
    id SERIAL PRIMARY KEY,
    reservation_id INT NOT NULL,
    total_ht NUMERIC,
    tva NUMERIC,
    total_ttc NUMERIC,
    date_emission TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);

-- Table: factures
CREATE TABLE factures (
    id SERIAL PRIMARY KEY,
    reservation_id INT NOT NULL,
    montant_total NUMERIC,
    date_facturation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);

-- Insérer les rôles de base
INSERT INTO roles (nom) VALUES ('client'), ('admin');