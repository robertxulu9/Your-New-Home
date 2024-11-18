-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 18, 2024 at 02:11 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `realestate_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
CREATE TABLE IF NOT EXISTS `properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `agent_id` int NOT NULL,
  `location` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `compound` varchar(100) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL,
  `address_details` varchar(255) DEFAULT NULL,
  `floors` int DEFAULT NULL,
  `bedrooms` int DEFAULT NULL,
  `bathrooms` int DEFAULT NULL,
  `lot_area` decimal(10,2) DEFAULT NULL,
  `garage` int DEFAULT NULL,
  `year_built` year DEFAULT NULL,
  `images` json DEFAULT NULL,
  `price` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `agent_id` (`agent_id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `agent_id`, `location`, `city`, `compound`, `street`, `address_details`, `floors`, `bedrooms`, `bathrooms`, `lot_area`, `garage`, `year_built`, `images`, `price`, `created_at`) VALUES
(6, 6, 'suburb', 'Lusaka', 'compound1', 'Mulenga rd', 'Mulenga close', 1, 3, 1, 23434.00, 1, '2022', '[\"images-1730927629297.jpg\", \"images-1730927629300.jpg\", \"images-1730927629300.jpg\", \"images-1730927629301.jpg\", \"images-1730927629313.jpg\"]', 8000, '2024-11-06 21:13:49'),
(7, 6, 'suburb', 'Lusaka', 'Munali', 'Street 2', 'plot 123', 1, 3, 1, 2343.00, 1, '2024', '[\"images-1730930859913.jpg\", \"images-1730930859914.jpg\", \"images-1730930859915.jpg\", \"images-1730930859917.jpg\"]', 2500, '2024-11-06 22:07:39'),
(8, 6, 'downtown', 'Lusaka', 'Bwijinfumu', 'Plot 123 Fleet St', 'house number 4', 1, 3, 2, 2343.00, 2, '2024', '[\"images-1730931117315.jpg\", \"images-1730931117316.jpg\", \"images-1730931117319.jpg\", \"images-1730931117319.jpg\", \"images-1730931117327.jpg\"]', 3000, '2024-11-06 22:11:57'),
(9, 6, 'suburb', 'Lusaka', 'Matero', 'Plot 123 Street 3', 'cross roads', 1, 3, 2, 2343.00, 1, '2023', '[\"images-1730931840309.jpg\", \"images-1730931840310.jpg\", \"images-1730931840310.jpg\", \"images-1730931840311.jpg\", \"images-1730931840318.jpg\"]', 2000, '2024-11-06 22:24:00'),
(10, 6, 'suburb', 'Lusaka', 'Munali', 'Street 2', 'house no6', 2, 9, 4, 5655.00, 4, '2024', '[\"images-1730932356542.jpg\", \"images-1730932356548.jpg\", \"images-1730932356548.jpg\", \"images-1730932356548.jpg\"]', 8000, '2024-11-06 22:32:36'),
(11, 6, 'suburb', 'Lusaka', 'Munali', 'Central St ', 'kjhf', 1, 4, 2, 2343.00, 1, '2020', '[\"images-1730932505370.jpg\"]', 7000, '2024-11-06 22:35:05'),
(12, 8, 'suburb', 'Lusaka', 'Chelstone', 'Street 4 ', 'plot no6', 1, 5, 3, 23434.00, 2, '2020', '[\"images-1730932930850.jpg\", \"images-1730932930850.jpg\", \"images-1730932930852.jpg\", \"images-1730932930852.jpg\", \"images-1730932930852.jpg\"]', 7000, '2024-11-06 22:42:10'),
(13, 8, 'suburb', 'Lusaka', 'Chelstone', '46th Lane', 'plot 90', 1, 5, 3, 23434.00, 1, '2020', '[\"images-1730933117466.jpg\", \"images-1730933117466.jpg\", \"images-1730933117469.jpg\", \"images-1730933117470.jpg\", \"images-1730933117470.jpg\"]', 5000, '2024-11-06 22:45:17'),
(14, 8, 'suburb', 'Lusaka', 'Chelstone', '45th Lane', 'plot 87', 1, 3, 2, 2343.00, 1, '2023', '[\"images-1730933237306.jpg\", \"images-1730933237306.jpg\", \"images-1730933237307.jpg\", \"images-1730933237307.jpg\"]', 3000, '2024-11-06 22:47:17'),
(22, 6, 'suburb', 'Lusaka', 'Chelstone', 'Bond St', 'plot 10-2', 1, 6, 3, 2343434.00, 2, '2020', '[\"images-1730957152602.jpg\", \"images-1730957152603.jpg\", \"images-1730957152603.jpg\", \"images-1730957152605.jpg\", \"images-1730957152605.jpg\"]', 9000, '2024-11-07 05:25:52'),
(23, 8, 'suburb', 'Lusaka', 'Munali', 'Cybill St ', 'Plot 3454 ', 1, 7, 3, 223434.00, 2, '2043', '[\"images-1731227563907.jpg\", \"images-1731227563909.jpg\", \"images-1731227563914.jpg\", \"images-1731227563915.jpg\", \"images-1731227563915.jpg\", \"images-1731227563915.jpg\"]', 12000, '2024-11-10 08:32:43'),
(17, 4, 'downtown', 'Lusaka', 'Matero', 'Lone St', 'plot 3s', 1, 7, 3, 5655.00, 2, '2024', '[\"images-1730934562857.jpg\", \"images-1730934562858.jpg\", \"images-1730934562862.jpg\", \"images-1730934562862.jpg\"]', 8000, '2024-11-06 23:09:22'),
(18, 4, 'downtown', 'Lusaka', 'Matero', 'Float St', 'plot 3454', 1, 6, 3, 123434.00, 2, '2020', '[\"images-1730934775127.jpg\", \"images-1730934775128.jpg\", \"images-1730934775128.jpg\", \"images-1730934775128.jpg\", \"images-1730934775135.jpg\"]', 6000, '2024-11-06 23:12:55'),
(19, 4, 'suburb', 'Lusaka', 'Matero', 'Fleet St', 'plot 3454', 1, 4, 2, 2343.00, 1, '2020', '[\"images-1730934996579.jpg\", \"images-1730934996579.jpg\", \"images-1730934996582.jpg\", \"images-1730934996582.jpg\", \"images-1730934996582.jpg\"]', 5000, '2024-11-06 23:16:36'),
(21, 5, 'suburb', 'Lusaka', 'Northwood', 'First St', 'plot 23443', 1, 4, 2, 5655.00, 1, '2020', '[\"images-1730936333336.jpg\", \"images-1730936333338.jpg\", \"images-1730936333340.jpg\"]', 5500, '2024-11-06 23:38:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('pending','agent','admin') DEFAULT 'pending',
  `contactNumber` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `email`, `password`, `role`, `contactNumber`, `address`, `profilePicture`, `created_at`) VALUES
(8, 'Gwen', 'Stacy', 'Gwen Stacy', 'gwenstacy@email.com', '$2a$10$lyzRnPmo1qkiNjmwu1yjVej1utER3KSihB/PfHtnARw6YC0XDvQze', 'agent', '0975436674', 'Mulali Lusaka Zambia', '/uploads/profilePicture-1730932756670.jpg', '2024-11-06 21:00:17'),
(4, 'Ben', 'Tembo', 'Ben Tembo', 'bentembo@email.com', '$2a$10$gSYfX1omqHEg0Fu1u/qpn.zYzU4eNX4RJHjN77tibObn/6jzpkuOy', 'agent', '0964564556', 'Matero Lusaka Zambia', '/uploads/profilePicture-1730933412568.jpg', '2024-11-06 20:29:51'),
(5, 'John', 'Zimba', 'John Zimba', 'johnzimba@email.com', '$2a$10$9FlB26XhorudMMd4JXBCU.xEt0.HWhSyef0JrCSbNOqGMXb3RciN.', 'agent', '0956465445', 'Northmead', '/uploads/profilePicture-1730935262110.jpg', '2024-11-06 20:30:53'),
(6, 'Peter', 'Mbewe', 'Peter Mbewe', 'peterMbewe@email.com', '$2a$10$lMzVCop8to7lfG5RFr1yUeD3KkcV5xc92rys26UBnEu7WXXL5VRqi', 'agent', '0971234567', 'Chelstone, Lusaka, Zambia', '/uploads/profilePicture-1730936843298.jpg', '2024-11-06 20:31:58'),
(7, 'admin', 'admin', 'admin', 'admin@email.com', '$2a$10$URVRPoho9Hik3E2X.oP2y.P23RmcX0aZJ8U.ehR/YYJOlgTvFqZ8e', 'admin', NULL, NULL, NULL, '2024-11-06 20:33:33');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
