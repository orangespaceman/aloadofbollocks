-- phpMyAdmin SQL Dump
-- version 3.2.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 23, 2010 at 11:05 AM
-- Server version: 5.1.44
-- PHP Version: 5.2.13

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
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `imgurl` varchar(255) NOT NULL,
  `midilocal` varchar(255) DEFAULT NULL,
  `midiurl` varchar(255) DEFAULT NULL,
  `ip` varchar(20) NOT NULL,
  `views` int(11) NOT NULL,
  `dateadded` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=35 ;

--
-- Dumping data for table `j-bombs`
--

INSERT INTO `j-bombs` VALUES(1, 'Test title', 'test', 'http://www.netsiteweb.com/beta206.gif', NULL, NULL, '192.168.0.7', 16, '2010-07-07 14:08:00');
INSERT INTO `j-bombs` VALUES(2, 'Test title 2', 'test2', 'http://img9.imageshack.us/img9/1737/pigrider.gif', NULL, NULL, '192.168.0.7', 9, '2010-07-07 16:15:41');
INSERT INTO `j-bombs` VALUES(3, 'test bomb 3', 'test3', 'http://joshuablankenship.com/blog/images/midgetface.gif', '', '', '192.168.0.7', 3, '2010-07-07 16:18:04');
INSERT INTO `j-bombs` VALUES(4, 'cat', 'cat', 'http://i108.photobucket.com/albums/n37/CodeLyokoFreak1/7dcda2aa.gif', '', '', '192.168.0.110', 8, '2010-07-07 17:56:34');
INSERT INTO `j-bombs` VALUES(6, 'Cat box', 'cat-box', 'http://littleimg.com/thumbs/large/13495_pepkf/35funny.gif', '', '', '192.168.0.7', 4, '2010-07-08 17:37:04');
INSERT INTO `j-bombs` VALUES(7, 'Evil Cat', 'evil-cat', 'http://www.jellymuffin.com/images/funny_pictures/images/019.gif', '', '', '192.168.0.7', 1, '2010-07-08 17:44:57');
INSERT INTO `j-bombs` VALUES(11, 'Star Wars - The Empire Strikes Back', 'empire-strikes-back', 'http://www.imgzzz.com/i/image_1278059338.gif', NULL, NULL, '192.168.0.7', 1, '2010-07-13 14:28:41');
INSERT INTO `j-bombs` VALUES(12, 'Fat slide', 'fat-slide', 'http://i950.photobucket.com/albums/ad349/gerad785/clip0013.gif', '', '', '192.168.0.7', 2, '2010-07-13 16:27:47');
INSERT INTO `j-bombs` VALUES(34, 'Standing Cat', 'standing-cat', 'http://www.gifbin.com/bin/042010/1271155416_standing-cat.gif', '', '', '192.168.0.7', 1, '2010-07-22 14:43:46');
INSERT INTO `j-bombs` VALUES(14, 'Magic smoke', 'magic-smoke', 'http://youepicfail.com/fail.gif', '', '', '192.168.0.7', 1, '2010-07-13 17:08:08');
INSERT INTO `j-bombs` VALUES(15, 'Boxing fail', 'boxing-fail', 'http://www.failpost.com/wp-content/uploads/2009/03/boxing-fail.gif', '', '', '192.168.0.7', 3, '2010-07-13 17:14:31');
INSERT INTO `j-bombs` VALUES(16, 'BP clean-up', 'bp-clean-up', 'http://www.forkparty.com/wp-content/uploads/2010/06/bp-cleanup.gif', '', '', '192.168.0.7', 1, '2010-07-13 17:21:21');
INSERT INTO `j-bombs` VALUES(17, 'Skateboarder', 'skateboarder', 'http://www.failkittah.com/wp-content/uploads/2009/09/Skateboard-Fail-Gif.gif', '', '', '192.168.0.7', 3, '2010-07-13 17:24:47');
INSERT INTO `j-bombs` VALUES(33, 'hiphop', 'shoes', 'http://www.colectiva.tv/wordpress/wp-content/uploads/2010/01/hiphopfail.gif', '', '', '192.168.0.56', 14, '2010-07-22 12:22:09');
INSERT INTO `j-bombs` VALUES(32, 'The Hoff', 'the-hoff', 'http://27.media.tumblr.com/5QBUweZOqlue193et6vGLtbFo1_400.gif', '', '', '192.168.0.7', 1, '2010-07-21 16:50:41');
INSERT INTO `j-bombs` VALUES(31, 'High Jump Loo', 'high-jump-loo', 'http://26.media.tumblr.com/5QBUweZOqlue85x7j1FVOb5Ao1_400.gif', '', '', '192.168.0.7', 1, '2010-07-21 16:50:04');
INSERT INTO `j-bombs` VALUES(21, 'Pope ball', 'pope-ball', 'http://i42.photobucket.com/albums/e304/SmellsL1keAClown/funny_animated_pictures_15.gif', '', '', '192.168.0.7', 3, '2010-07-13 17:56:42');
INSERT INTO `j-bombs` VALUES(22, 'Piccard Kills Chuck!', 'chuck_death', 'http://s3.amazonaws.com/readers/2008/08/30/four_1.gif', '', '', '192.168.0.13', 5, '2010-07-13 18:03:31');
INSERT INTO `j-bombs` VALUES(24, 'Lord Clyde?', 'pint-time', 'http://downloads.aderowbotham.com/ade_swig.gif', '', '', '192.168.0.8', 23, '2010-07-13 18:16:11');
INSERT INTO `j-bombs` VALUES(30, 'Walking dog', 'walking-dog', 'http://24.media.tumblr.com/tumblr_l1muynCdd71qzze8ko1_400.gif', '', '', '192.168.0.7', 2, '2010-07-21 16:48:29');
INSERT INTO `j-bombs` VALUES(26, 'Robben', 'bomb', 'http://i31.tinypic.com/2poa5oz.jpg', '', '', '192.168.0.55', 11, '2010-07-14 09:41:45');
INSERT INTO `j-bombs` VALUES(27, 'dead dog', 'deaddog', 'http://www.photobasement.com/wp-content/uploads/2010/07/gif-bang.gif', '', '', '192.168.0.26', 2, '2010-07-15 17:39:36');
INSERT INTO `j-bombs` VALUES(28, 'tickle', 'tickle', 'http://www.photobasement.com/wp-content/uploads/2010/07/gif-frog-love.gif', '', '', '192.168.0.84', 12, '2010-07-21 12:01:33');
INSERT INTO `j-bombs` VALUES(29, 'Invisible see-saw', 'invisible-seesaw', 'http://farm5.static.flickr.com/4034/4576133070_1e9cec5e73_o.gif', '', '', '192.168.0.7', 6, '2010-07-21 14:33:54');
