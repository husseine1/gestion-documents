-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 14 août 2025 à 12:22
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `wikinormes`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `civilite` varchar(10) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenoms` varchar(150) NOT NULL,
  `pays` varchar(50) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `fonction` varchar(100) NOT NULL,
  `whatsapp` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `civilite`, `nom`, `prenoms`, `pays`, `role`, `fonction`, `whatsapp`, `email`, `created_at`, `password`) VALUES
(1, 'M', '', '', '', 'Super Administrateur', '', '', 'admin@gmail.com', '2025-08-09 16:07:42', '$2b$10$gmPuo14jTTYVJprPfuKNz.A6xFt74K0LsxneZnUn3WhojSzJdaIHW'),
(43, 'Mme', 'Incidunt non exerci', 'Laboris incidunt et', 'COTE D\'IVOIRE', NULL, 'Labore sed et reicie', '+1 (626) 958-4198', 'myfazop@mailinator.com', '2025-08-09 13:53:47', '$2b$10$9yG.d.qCS1RU04VM3r.3lO9EZ9S3xbGwTwGzL2M0P/I'),
(44, 'M.', 'Est labore beatae e', 'Nemo aute velit in e', 'CAMEROUN', NULL, 'Ipsum magnam quis v', '+1 (957) 255-9503', 'koqutopyr@mailinator.com', '2025-08-09 13:56:40', '$2b$10$U3evjYXpBsh4Cki72toz8Okwyd0yg/Z.3E/wOTFQ/Wl'),
(45, 'Mme', 'Quis quia porro faci', 'Et incididunt volupt', 'CAMEROUN', 'Administrateur', 'Illum rerum occaeca', '+1 (157) 793-1905', 'rywaqezavu@mailinator.com', '2025-08-09 14:00:09', '$2b$10$luqZST/3SxRlGlALj5XO1.2Ghjf1q1ZIIQwhQdBWyO1'),
(46, 'M.', 'Porro reprehenderit', 'In nostrud aut magni', 'BENIN', 'Administrateur', 'Maxime est nisi cons', '+1 (886) 503-7638', 'qehavo@mailinator.com', '2025-08-09 14:12:02', '$2b$10$RgV7nMNWUHOZ40eqmm4LUuoHmQ8gakkWms5uzGQvfwI'),
(47, 'Mme', 'In magna ex impedit', 'Qui libero repellend', 'COTE D\'IVOIRE', 'Administrateur', 'Nesciunt dolor odit', '+1 (998) 157-6297', 'sonetasocy@mailinator.com', '2025-08-09 14:21:58', '$2b$10$3tLwWtFnWAVBFSJNCFF6i.cBSLsDRZJKG90RS9OlAj/'),
(48, 'Mme', 'Amet magni ut venia', 'Quos et qui repellen', 'BENIN', 'Administrateur', 'Ut sunt numquam qui ', '+1 (518) 868-3737', 'jozuze@mailinator.com', '2025-08-09 14:26:39', '$2b$10$WorN5s/m6/PUJCNXl2cKwObIklrHTm8/l/tTLKNwv8a'),
(49, 'Mlle', 'Eius laboriosam dol', 'Eius tempore repudi', 'GABON', 'Administrateur', 'Excepteur quia offic', '+1 (625) 259-5819', 'lefena@mailinator.com', '2025-08-09 15:33:18', ''),
(50, 'M.', 'Non suscipit et mole', 'Quasi veritatis aliq', 'CAMEROUN', NULL, 'In culpa esse at et', '+1 (589) 214-7021', 'degos@mailinator.com', '2025-08-09 15:40:07', '$2b$10$VMPJ59kSol3keK711Yjkee1TDq9MiKLM9cEDJr/fub2twa8Xo6ehW'),
(51, 'Mlle', 'Accusamus aliquid ad', 'Dolore quidem asperi', 'BENIN', 'Administrateur', 'Rerum itaque iusto q', '+1 (353) 654-7483', 'xidab@mailinator.com', '2025-08-09 15:43:17', '$2b$10$tu/NdS8z7WVgLAW6ZAB9eO4pxDrDkplYehd60ZwEGoNtYKgJHlCDq'),
(53, 'M.', 'Voluptate deleniti c', 'Ad aliqua Deserunt ', 'GABON', 'Administrateur', 'Ut magnam excepturi ', '+1 (821) 768-1571', 'jugasipav@mailinator.com', '2025-08-10 02:49:45', '$2b$10$kU9WGrLjRAkPla6E2R.cn.to7AZZKbN50w7GPnx58Tigj9Ij/paj2');

-- --------------------------------------------------------

--
-- Structure de la table `normes`
--

CREATE TABLE `normes` (
  `id` int(11) NOT NULL,
  `domaine` varchar(255) DEFAULT NULL,
  `categorie` varchar(255) DEFAULT NULL,
  `description_du_texte` text DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `reference_du_texte` varchar(255) DEFAULT NULL,
  `document_concerne` varchar(255) DEFAULT NULL,
  `domaine_activite` varchar(255) DEFAULT NULL,
  `date_pub` varchar(255) DEFAULT NULL,
  `pays_ou_region` varchar(255) DEFAULT NULL,
  `fichier` varchar(255) DEFAULT NULL,
  `compteur_validation` tinyint(1) NOT NULL DEFAULT 0,
  `telechargement` tinyint(1) DEFAULT 0,
  `admin_id` int(11) DEFAULT NULL,
  `statut` varchar(20) DEFAULT 'en_attente',
  `status` varchar(50) NOT NULL DEFAULT 'en_attente',
  `raison_rejet` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `normes`
--

INSERT INTO `normes` (`id`, `domaine`, `categorie`, `description_du_texte`, `source`, `reference_du_texte`, `document_concerne`, `domaine_activite`, `date_pub`, `pays_ou_region`, `fichier`, `compteur_validation`, `telechargement`, `admin_id`, `statut`, `status`, `raison_rejet`) VALUES
(68, 'Ut sapiente dolore f', 'code', 'Sed maiores omnis ve', 'Dolore laborum labor', 'Id ut nostrud paria', 'Cum explicabo Alias', 'Duis aperiam explica', '22-Sep-2021', 'GABON', '1754700485547-LISTE DES ELEMENTS PREPARATOIRES DU TEST - CREDIT FEF.pdf', 1, 0, 3, 'en_attente', 'en_attente', NULL),
(71, 'Duis dicta iste temp', 'lois', 'Do tempora ut ea dol', 'Natus consectetur i', 'Quaerat id fugiat ', 'Pariatur Iste ex om', 'Odio labore voluptat', '13-Nov-1972', 'GABON', '1754701812080-LISTE DES ELEMENTS PREPARATOIRES DU TEST - CREDIT FEF.pdf', 1, 0, 2, 'en_attente', 'en_attente', NULL),
(78, 'Aliquam facere elige', 'autre', 'Cum do voluptatem N', 'Dignissimos aliqua ', 'Commodi libero place', 'Voluptatibus nesciun', 'Dolor in ullamco qui', '14-Jan-1974', 'BENIN', '1754707855280-LISTE DES ELEMENTS PREPARATOIRES DU TEST - CREDIT FEF.pdf', 0, 0, 2, 'en_attente', 'en_attente', NULL),
(79, 'Quo harum amet et c', 'code', 'Dolorum cupiditate t', 'Autem dolor omnis ir', 'Impedit ea velit eo', 'Praesentium nulla su', 'Dolore consequat Qu', '28-Oct-2022', 'COTE D\'IVOIRE', '1754794150882-Syllabus Annuel de Classe PrÃ©paratoire en Finance_Cimef Business school_2025-2026[1].pdf', 1, 0, 51, 'en_attente', 'en_attente', NULL),
(80, 'Magni voluptatem vo', 'décret', 'Quia quo velit molli', 'Aliqua Hic minima m', 'Sequi nostrum iure n', 'Est consequuntur non', 'Ut ad molestiae est ', '05-Jun-2018', 'CAMEROUN', '1754861751677-Formulaire_preinscription_MASTER1_FID_v2025-08-04 (1).docx', 1, 0, 51, 'en_attente', 'en_attente', NULL),
(82, 'Sit quia obcaecati a', 'ordonnance', 'Quo et ut sed corrup', 'Provident rerum nat', 'Ad et quo repudianda', 'Quia vero quia et of', 'Qui non ducimus off', '16-Dec-1978', 'CAMEROUN', '1755164607687-recu de retrait - depot  (2).pdf', 1, 0, 53, 'en_attente', 'en_attente', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `normes`
--
ALTER TABLE `normes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT pour la table `normes`
--
ALTER TABLE `normes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
