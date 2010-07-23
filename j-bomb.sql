-- phpMyAdmin SQL Dump
-- version 2.11.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 09, 2010 at 05:41 PM
-- Server version: 5.0.41
-- PHP Version: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `j-bomb`
--

-- --------------------------------------------------------

--
-- Table structure for table `j-bombs`
--

CREATE TABLE `j-bombs` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `imgurl` varchar(255) NOT NULL,
  `midilocal` varchar(255) default NULL,
  `midiurl` varchar(255) default NULL,
  `ip` varchar(20) NOT NULL,
  `views` int(11) NOT NULL,
  `dateadded` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `j-bombs`
--

INSERT INTO `j-bombs` VALUES(1, 'Test title', 'test', 'http://www.netsiteweb.com/beta206.gif', NULL, NULL, '192.168.0.7', 8, '2010-07-07 14:08:00');
INSERT INTO `j-bombs` VALUES(2, 'Test title 2', 'test2', 'http://img9.imageshack.us/img9/1737/pigrider.gif', NULL, NULL, '192.168.0.7', 7, '2010-07-07 16:15:41');
INSERT INTO `j-bombs` VALUES(3, 'test bomb 3', 'test3', 'http://joshuablankenship.com/blog/images/midgetface.gif', '', '', '192.168.0.7', 2, '2010-07-07 16:18:04');
INSERT INTO `j-bombs` VALUES(4, 'cat', 'cat', 'http://i108.photobucket.com/albums/n37/CodeLyokoFreak1/7dcda2aa.gif', '', '', '192.168.0.110', 5, '2010-07-07 17:56:34');
INSERT INTO `j-bombs` VALUES(5, 'Amazing Tache', 'tache', 'http://24.media.tumblr.com/tumblr_l58erpApNN1qccscho1_400.gif', '', '', '192.168.0.13', 2, '2010-07-08 10:10:33');
INSERT INTO `j-bombs` VALUES(6, 'Cat box', 'cat-box', 'http://littleimg.com/thumbs/large/13495_pepkf/35funny.gif', '', '', '192.168.0.7', 2, '2010-07-08 17:37:04');
INSERT INTO `j-bombs` VALUES(7, 'Evil Cat', 'evil-cat', 'http://www.jellymuffin.com/images/funny_pictures/images/019.gif', '', '', '192.168.0.7', 0, '2010-07-08 17:44:57');
INSERT INTO `j-bombs` VALUES(8, 'Shit stickman', 'shit-stickman', 'http://img.photobucket.com/albums/v495/frefy2/funny.gif', '', '', '192.168.0.7', 2, '2010-07-08 18:35:23');
