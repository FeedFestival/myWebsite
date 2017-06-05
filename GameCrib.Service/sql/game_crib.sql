-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2016 at 03:13 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: game_crib
--
--CREATE DATABASE IF NOT EXISTS game_crib DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
--USE game_crib;

CREATE DATABASE IF NOT EXISTS id1570128_game_crib DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE id1570128_game_crib;

-- --------------------------------------------------------

--
-- Table structure for table app
--

CREATE TABLE app (
  `id` int(2) NOT NULL,
  `name` varchar(30) NOT NULL,
  `setting_id` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table challenge
--

CREATE TABLE challenge (
  `id` int(10) NOT NULL,
  `game_id` int(10) NOT NULL,
  `user_id` int(6) NOT NULL,
  `start_date` datetime NOT NULL,
  `type_id` int(10) NOT NULL,
  `settings_json` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table challenge_con_user
--

CREATE TABLE challenge_con_user (
  `id` int(11) NOT NULL,
  `challenge_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `response_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table friend
--

CREATE TABLE friend (
  `id` int(10) NOT NULL,
  `user_id` int(6) NOT NULL,
  `friend_id` int(6) DEFAULT NULL,
  `name` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table game
--

CREATE TABLE game (
  `id` int(10) NOT NULL,
  `app_id` int(2) NOT NULL,
  `type_id` int(10) DEFAULT NULL,
  `session_id` int(11) DEFAULT NULL,
  `guid` varchar(100) NOT NULL,
  `start_date` datetime NOT NULL,
  `active_date` datetime DEFAULT NULL,
  `web` tinyint(1) NOT NULL DEFAULT '0',
  `unity` tinyint(1) NOT NULL DEFAULT '0',
  `active` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table history
--

CREATE TABLE history (
  `id` int(10) NOT NULL,
  `challenge_con_user_id` int(10) NOT NULL,
  `json_data` text,
  `index_key` varchar(50) DEFAULT NULL,
  `value` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table menu
--

CREATE TABLE menu (
  `id` int(2) NOT NULL,
  `URL` text,
  `icon` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `type_id` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` int(6) NOT NULL,
  `guid` varchar(100) NOT NULL,
  `start_date` datetime NOT NULL,
  `active_date` datetime DEFAULT NULL,
  `user_id` int(6) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table setting
--

CREATE TABLE setting (
  `id` int(10) NOT NULL,
  `type_id` int(10) DEFAULT NULL,
  `value` text,
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `prog_id` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `table_ref` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(6) NOT NULL,
  `name` varchar(25) NOT NULL,
  `display_name` varchar(25) DEFAULT NULL,
  `password` varchar(11) DEFAULT NULL,
  `setting_id` int(6) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table user_con_app
--

CREATE TABLE user_con_app (
  `id` int(6) NOT NULL,
  `user_id` int(6) NOT NULL,
  `app_id` int(2) NOT NULL,
  `setting_id` int(6) DEFAULT NULL,
  `settings_json` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table app
--
ALTER TABLE app
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table challenge
--
ALTER TABLE challenge
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table challenge_con_user
--
ALTER TABLE challenge_con_user
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table friend
--
ALTER TABLE friend
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table game
--
ALTER TABLE game
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table history
--
ALTER TABLE history
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table menu
--
ALTER TABLE menu
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table setting
--
ALTER TABLE setting
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table user_con_app
--
ALTER TABLE user_con_app
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table app
--
ALTER TABLE app
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table challenge
--
ALTER TABLE challenge
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table challenge_con_user
--
ALTER TABLE challenge_con_user
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table friend
--
ALTER TABLE friend
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table game
--
ALTER TABLE game
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table history
--
ALTER TABLE history
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table menu
--
ALTER TABLE menu
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table setting
--
ALTER TABLE setting
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table user_con_app
--
ALTER TABLE user_con_app
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



	/* RESET AUTOINCREMENT */

	ALTER TABLE app AUTO_INCREMENT = 0;
	ALTER TABLE challenge AUTO_INCREMENT = 0;
	ALTER TABLE challenge_con_user AUTO_INCREMENT = 0;
	ALTER TABLE friend AUTO_INCREMENT = 0;
	ALTER TABLE game AUTO_INCREMENT = 0;
	ALTER TABLE history AUTO_INCREMENT = 0;
	ALTER TABLE session AUTO_INCREMENT = 0;
	ALTER TABLE setting AUTO_INCREMENT = 0;
	ALTER TABLE type AUTO_INCREMENT = 0;
	ALTER TABLE user AUTO_INCREMENT = 0;
	ALTER TABLE user_con_app AUTO_INCREMENT = 0;