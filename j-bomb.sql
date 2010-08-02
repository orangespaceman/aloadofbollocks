-- phpMyAdmin SQL Dump
-- version 3.2.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 02, 2010 at 09:34 AM
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
  `midiurl` varchar(255) DEFAULT NULL,
  `ip` varchar(20) NOT NULL,
  `views` int(11) NOT NULL,
  `dateadded` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=94 ;

--
-- Dumping data for table `j-bombs`
--

INSERT INTO `j-bombs` VALUES(1, 'Test title', 'test', 'http://www.netsiteweb.com/beta206.gif', NULL, '192.168.0.7', 17, '2010-07-07 14:08:00');
INSERT INTO `j-bombs` VALUES(2, 'Test title 2', 'test2', 'http://img9.imageshack.us/img9/1737/pigrider.gif', NULL, '192.168.0.7', 10, '2010-07-07 16:15:41');
INSERT INTO `j-bombs` VALUES(3, 'test bomb 3', 'test3', 'http://joshuablankenship.com/blog/images/midgetface.gif', '', '192.168.0.7', 3, '2010-07-07 16:18:04');
INSERT INTO `j-bombs` VALUES(4, 'cat', 'cat', 'http://i108.photobucket.com/albums/n37/CodeLyokoFreak1/7dcda2aa.gif', '', '192.168.0.110', 8, '2010-07-07 17:56:34');
INSERT INTO `j-bombs` VALUES(36, 'When rabbits attack', 'when-rabbits-attack', 'http://farm1.static.flickr.com/52/189554187_fa7f06d14c_o.gif', '', '192.168.0.7', 16, '2010-07-26 15:27:34');
INSERT INTO `j-bombs` VALUES(6, 'Cat box', 'cat-box', 'http://littleimg.com/thumbs/large/13495_pepkf/35funny.gif', '', '192.168.0.7', 4, '2010-07-08 17:37:04');
INSERT INTO `j-bombs` VALUES(7, 'Evil Cat', 'evil-cat', 'http://www.jellymuffin.com/images/funny_pictures/images/019.gif', '', '192.168.0.7', 1, '2010-07-08 17:44:57');
INSERT INTO `j-bombs` VALUES(35, 'Pirata Boy Band', 'pirata-boy-band', 'http://farm5.static.flickr.com/4119/4821584600_7b79bbe55a_o.gif', '', '192.168.0.7', 21, '2010-07-23 17:47:50');
INSERT INTO `j-bombs` VALUES(11, 'Star Wars - The Empire Strikes Back', 'empire-strikes-back', 'http://www.imgzzz.com/i/image_1278059338.gif', NULL, '192.168.0.7', 1, '2010-07-13 14:28:41');
INSERT INTO `j-bombs` VALUES(12, 'Fat slide', 'fat-slide', 'http://i950.photobucket.com/albums/ad349/gerad785/clip0013.gif', '', '192.168.0.7', 3, '2010-07-13 16:27:47');
INSERT INTO `j-bombs` VALUES(34, 'Standing Cat', 'standing-cat', 'http://www.gifbin.com/bin/042010/1271155416_standing-cat.gif', '', '192.168.0.7', 1, '2010-07-22 14:43:46');
INSERT INTO `j-bombs` VALUES(14, 'Magic smoke', 'magic-smoke', 'http://youepicfail.com/fail.gif', '', '192.168.0.7', 1, '2010-07-13 17:08:08');
INSERT INTO `j-bombs` VALUES(15, 'Boxing fail', 'boxing-fail', 'http://www.failpost.com/wp-content/uploads/2009/03/boxing-fail.gif', '', '192.168.0.7', 8, '2010-07-13 17:14:31');
INSERT INTO `j-bombs` VALUES(16, 'BP clean-up', 'bp-clean-up', 'http://www.forkparty.com/wp-content/uploads/2010/06/bp-cleanup.gif', '', '192.168.0.7', 3, '2010-07-13 17:21:21');
INSERT INTO `j-bombs` VALUES(17, 'Skateboarder', 'skateboarder', 'http://www.failkittah.com/wp-content/uploads/2009/09/Skateboard-Fail-Gif.gif', '', '192.168.0.7', 3, '2010-07-13 17:24:47');
INSERT INTO `j-bombs` VALUES(33, 'hiphop', 'shoes', 'http://www.colectiva.tv/wordpress/wp-content/uploads/2010/01/hiphopfail.gif', '', '192.168.0.56', 14, '2010-07-22 12:22:09');
INSERT INTO `j-bombs` VALUES(32, 'The Hoff', 'the-hoff', 'http://27.media.tumblr.com/5QBUweZOqlue193et6vGLtbFo1_400.gif', '', '192.168.0.7', 1, '2010-07-21 16:50:41');
INSERT INTO `j-bombs` VALUES(31, 'High Jump Loo', 'high-jump-loo', 'http://26.media.tumblr.com/5QBUweZOqlue85x7j1FVOb5Ao1_400.gif', '', '192.168.0.7', 2, '2010-07-21 16:50:04');
INSERT INTO `j-bombs` VALUES(21, 'Pope ball', 'pope-ball', 'http://i42.photobucket.com/albums/e304/SmellsL1keAClown/funny_animated_pictures_15.gif', '', '192.168.0.7', 3, '2010-07-13 17:56:42');
INSERT INTO `j-bombs` VALUES(22, 'Piccard Kills Chuck!', 'chuck_death', 'http://s3.amazonaws.com/readers/2008/08/30/four_1.gif', '', '192.168.0.13', 5, '2010-07-13 18:03:31');
INSERT INTO `j-bombs` VALUES(24, 'Lord Clyde?', 'pint-time', 'http://downloads.aderowbotham.com/ade_swig.gif', '', '192.168.0.8', 24, '2010-07-13 18:16:11');
INSERT INTO `j-bombs` VALUES(30, 'Walking dog', 'walking-dog', 'http://24.media.tumblr.com/tumblr_l1muynCdd71qzze8ko1_400.gif', '', '192.168.0.7', 11, '2010-07-21 16:48:29');
INSERT INTO `j-bombs` VALUES(26, 'Robben', 'bomb', 'http://i31.tinypic.com/2poa5oz.jpg', '', '192.168.0.55', 12, '2010-07-14 09:41:45');
INSERT INTO `j-bombs` VALUES(27, 'dead dog', 'deaddog', 'http://www.photobasement.com/wp-content/uploads/2010/07/gif-bang.gif', '', '192.168.0.26', 3, '2010-07-15 17:39:36');
INSERT INTO `j-bombs` VALUES(28, 'tickle', 'tickle', 'http://www.photobasement.com/wp-content/uploads/2010/07/gif-frog-love.gif', '', '192.168.0.84', 13, '2010-07-21 12:01:33');
INSERT INTO `j-bombs` VALUES(29, 'Invisible see-saw', 'invisible-seesaw', 'http://farm5.static.flickr.com/4034/4576133070_1e9cec5e73_o.gif', '', '192.168.0.7', 8, '2010-07-21 14:33:54');
INSERT INTO `j-bombs` VALUES(37, 'Dancing conkers', 'dancing-conkers', 'http://24.media.tumblr.com/5QBUweZOqlpymtsmKC9g3tZNo1_100.gif', '', '192.168.0.7', 11, '2010-07-26 17:36:32');
INSERT INTO `j-bombs` VALUES(38, 'Bird is the word', 'bird-is-the-word', 'http://29.media.tumblr.com/5QBUweZOqlov015kFwbCgfTJo1_100.gif', '', '192.168.0.7', 12, '2010-07-26 17:37:10');
INSERT INTO `j-bombs` VALUES(39, 'Dynamite Yes', 'dynamite-yes', 'http://27.media.tumblr.com/5QBUweZOqlq0vb5wBUw3n1b6o1_250.gif', '', '192.168.0.7', 9, '2010-07-26 17:38:39');
INSERT INTO `j-bombs` VALUES(40, 'Borat', 'borat', 'http://30.media.tumblr.com/5QBUweZOqm2pyjb5n7jw1JKZo1_250.gif', '', '192.168.0.7', 2, '2010-07-26 17:41:33');
INSERT INTO `j-bombs` VALUES(43, 'Booth Cat', 'booth-cat', 'http://ct.iscute.com/i81/7/1/16/f_a0980559abda.gif', '', '192.168.0.7', 12, '2010-07-27 09:38:12');
INSERT INTO `j-bombs` VALUES(42, 'Cat Seizure', 'cat-seizure', 'http://i220.photobucket.com/albums/dd28/olieja/catseizure.gif', '', '192.168.0.7', 9, '2010-07-27 09:37:20');
INSERT INTO `j-bombs` VALUES(44, 'mirror', 'mirror', 'http://4gifs.com/gallery/d/164286-1/Girl_mirror.gif', '', '192.168.0.17', 7, '2010-07-27 09:57:43');
INSERT INTO `j-bombs` VALUES(45, 'laser-nuts', 'laser-nuts', 'http://img683.imageshack.us/img683/1549/1279758883824.gif', '', '192.168.0.17', 10, '2010-07-27 09:59:13');
INSERT INTO `j-bombs` VALUES(46, 'Tyson punch', 'tyson-punch', 'http://cdn2.maxim.com/maxim/files/2010/07/23/maxims-5-favorite-gifs-for-friday-kate-beckinsale-edition/Tyson.gif', '', '192.168.0.7', 3, '2010-07-27 14:04:04');
INSERT INTO `j-bombs` VALUES(47, 'Fat diver', 'fat-diver', 'http://cdn2.maxim.com/maxim/files/2010/07/23/maxims-5-favorite-gifs-for-friday-kate-beckinsale-edition/Diver.gif', '', '192.168.0.7', 2, '2010-07-27 14:04:32');
INSERT INTO `j-bombs` VALUES(48, 'Cookie monster', 'cookie-monster', 'http://cdn2.maxim.com/maxim/files/2010/07/23/maxims-5-favorite-gifs-for-friday-kate-beckinsale-edition/Cookie.gif', '', '192.168.0.7', 12, '2010-07-27 14:05:05');
INSERT INTO `j-bombs` VALUES(49, 'Buff out', 'buff', 'http://24.media.tumblr.com/tumblr_l5y4fgElvb1qz7lxdo1_500.gif', '', '192.168.0.13', 4, '2010-07-27 15:01:04');
INSERT INTO `j-bombs` VALUES(50, 'roller-blades', 'roller-blades', 'http://i.imgur.com/dbrP6.gif', '', '192.168.0.17', 5, '2010-07-28 16:50:08');
INSERT INTO `j-bombs` VALUES(51, 'fat-kid', 'fat-kid', 'http://25.media.tumblr.com/tumblr_l523w8H4z61qz7lxdo1_400.gif', '', '192.168.0.17', 6, '2010-07-28 16:53:21');
INSERT INTO `j-bombs` VALUES(52, 'Chuckle Brothers', 'chuckle', 'http://25.media.tumblr.com/5QBUweZOqmvm80hhGCprqA1Eo1_400.gif', '', '192.168.0.7', 13, '2010-07-29 09:52:38');
INSERT INTO `j-bombs` VALUES(53, 'Dancing man', 'dancing-man', 'http://j-bomb.pete.piratalondon.com/_includes/img/bombs/dance_3.gif', '', '192.168.0.7', 12, '2010-07-30 10:28:35');
INSERT INTO `j-bombs` VALUES(54, 'Laptop man', 'laptop-man', 'http://j-bomb.pete.piratalondon.com/_includes/img/bombs/laptop_4.gif', '', '192.168.0.7', 16, '2010-07-30 10:33:33');
INSERT INTO `j-bombs` VALUES(55, 'Goat milk', 'goat-milk', 'http://izismile.com/img/img3/20100730/1000/friday_collection_of_18.gif', '', '192.168.0.5', 9, '2010-07-30 13:48:37');
INSERT INTO `j-bombs` VALUES(56, 'Running mascot', 'running-mascot', 'http://izismile.com/img/img3/20100730/1000/friday_collection_of_33.gif', '', '192.168.0.5', 10, '2010-07-30 13:49:36');
INSERT INTO `j-bombs` VALUES(57, 'Parrot hold up', 'parrot-hold-up', 'http://izismile.com/img/img3/20100730/1000/friday_collection_of_08.gif', '', '192.168.0.5', 10, '2010-07-30 13:51:50');
INSERT INTO `j-bombs` VALUES(58, 'Axe kitten', 'axe-kitten', 'http://izismile.com/img/img3/20100730/1000/friday_collection_of_06.gif', '', '192.168.0.5', 0, '2010-07-30 13:52:40');
INSERT INTO `j-bombs` VALUES(59, 'Table jump', 'table-jump', 'http://izismile.com/img/img3/20100730/1000/friday_collection_of_03.gif', '', '192.168.0.5', 0, '2010-07-30 13:53:27');
INSERT INTO `j-bombs` VALUES(60, 'Kitten paws', 'kitten-paws', 'http://thedailykitten.com/media/images/kneedingkitty.gif', '', '192.168.0.5', 1, '2010-07-30 13:58:59');
INSERT INTO `j-bombs` VALUES(61, 'Rainbow Man', 'rainbow-man', 'http://i44.tinypic.com/mcdpjm.jpg', '', '192.168.0.7', 1, '2010-07-30 14:01:07');
INSERT INTO `j-bombs` VALUES(62, '8-bit Dancer', '8-bit-dancer', 'http://loopable.files.wordpress.com/2007/09/bitdance.gif?w=380', '', '192.168.0.7', 1, '2010-07-30 14:04:02');
INSERT INTO `j-bombs` VALUES(63, 'Yo', 'yo', 'http://loopable.files.wordpress.com/2007/08/gangtakid1kb.gif?w=380', '', '192.168.0.7', 8, '2010-07-30 14:04:44');
INSERT INTO `j-bombs` VALUES(64, 'Champagne', 'champagne', 'http://loopable.files.wordpress.com/2007/03/champagne.gif?w=380', '', '192.168.0.7', 1, '2010-07-30 14:06:31');
INSERT INTO `j-bombs` VALUES(65, 'Queen mum', 'queen-mum', 'http://vash.pwp.blueyonder.co.uk/b3ta_profile/breakaq.gif', '', '192.168.0.7', 2, '2010-07-30 14:11:05');
INSERT INTO `j-bombs` VALUES(66, 'Snort', 'snort', 'http://i.imgur.com/FtSgj.gif', '', '192.168.0.5', 6, '2010-07-30 14:18:45');
INSERT INTO `j-bombs` VALUES(67, 'KISS FACE', 'kiss-face', 'http://izismile.com/img/img3/20100730/1000/friday_collection_of_09.gif', '', '192.168.0.7', 7, '2010-07-30 16:58:45');
INSERT INTO `j-bombs` VALUES(68, 'Skate FAIL', 'SkateFAIL', 'http://www.threadbombing.com/data/media/2/skate.gif', '', '192.168.0.93', 8, '2010-07-30 16:58:48');
INSERT INTO `j-bombs` VALUES(69, 'Dog vs. Turtle', 'dog-vs-turtle', 'http://izismile.com/img/img3/20100730/1000/friday_collection_of_05.gif', '', '192.168.0.7', 13, '2010-07-30 16:59:35');
INSERT INTO `j-bombs` VALUES(70, 'Keanu Loop', 'KeanuLoop', 'http://www.threadbombing.com/data/media/67/recursive_keanu.gif', '', '192.168.0.93', 7, '2010-07-30 17:04:17');
INSERT INTO `j-bombs` VALUES(71, 'Hoff loop', 'hoff-loop', 'http://content.ytmnd.com/content/0/f/b/0fb3f04023c0d115423b3bcccb65ef83.gif', '', '192.168.0.7', 1, '2010-07-30 17:06:03');
INSERT INTO `j-bombs` VALUES(72, 'Swing', 'Swing', 'http://www.gifbin.com/bin/022010/1266414619_swing-fail.gif', '', '192.168.0.93', 2, '2010-07-30 17:08:51');
INSERT INTO `j-bombs` VALUES(73, 'Apache', 'Apache', 'http://www.threadbombing.com/data/media/2/apache3.gif', '', '192.168.0.93', 1, '2010-07-30 17:15:00');
INSERT INTO `j-bombs` VALUES(74, 'Laugh', 'Laugh', 'http://www.threadbombing.com/data/media/2/jack_lol.gif', '', '192.168.0.93', 2, '2010-07-30 17:23:27');
INSERT INTO `j-bombs` VALUES(75, 'Fish Mouth', 'FishMouth', 'http://www.threadbombing.com/data/media/2/fish_mouth.gif', '', '192.168.0.93', 2, '2010-07-30 17:25:54');
INSERT INTO `j-bombs` VALUES(76, 'Girl Dog', 'GirlDog', 'http://www.threadbombing.com/data/media/2/1277268770151.gif', '', '192.168.0.93', 3, '2010-07-30 17:26:54');
INSERT INTO `j-bombs` VALUES(77, 'Pug Eyes', 'Pugeyes', 'http://www.threadbombing.com/data/media/2/pug_face.gif', '', '192.168.0.93', 8, '2010-07-30 17:36:58');
INSERT INTO `j-bombs` VALUES(78, 'Boat Race', 'boat-race', './_includes/img/bombs/boatrace.gif', './_includes/midi/macarena.mid', '192.168.0.7', 1, '2010-08-02 08:53:38');
INSERT INTO `j-bombs` VALUES(79, 'Booth Slow Dance', 'booth-slow-dance', './_includes/img/bombs/booth-slow-dance.gif', './_includes/midi/macarena.mid', '192.168.0.7', 0, '2010-08-02 08:59:01');
INSERT INTO `j-bombs` VALUES(80, 'Cat Gun', 'cat-gun', './_includes/img/bombs/cat-gun.gif', './_includes/midi/lovecats_cure.mid', '192.168.0.7', 0, '2010-08-02 09:04:34');
INSERT INTO `j-bombs` VALUES(81, 'Cat Juggle', 'cat-juggle', './_includes/img/bombs/cat-juggle.gif', './_includes/midi/lovecats_cure.mid', '192.168.0.7', 0, '2010-08-02 09:04:34');
INSERT INTO `j-bombs` VALUES(82, 'Cat Brained', 'cat-brained', './_includes/img/bombs/cat-brained.gif', './_includes/midi/lovecats_cure.mid', '192.168.0.7', 0, '2010-08-02 09:08:53');
INSERT INTO `j-bombs` VALUES(83, 'Dog Record', 'dog-record', './_includes/img/bombs/dog-record.gif', './_includes/midi/crazy_frog_axel_f.mid', '192.168.0.7', 0, '2010-08-02 09:08:53');
INSERT INTO `j-bombs` VALUES(84, 'Fuck You', 'fuck-you', './_includes/img/bombs/fuck-you.gif', '', '192.168.0.7', 1, '2010-08-02 09:08:53');
INSERT INTO `j-bombs` VALUES(85, 'Cat Juggle', 'cat-juggle', './_includes/img/bombs/cat-juggle.gif', './_includes/midi/lovecats_cure.mid', '192.168.0.7', 0, '2010-08-02 09:08:53');
INSERT INTO `j-bombs` VALUES(86, 'Henry', 'henry', './_includes/img/bombs/henry.gif', '', '192.168.0.7', 0, '2010-08-02 09:20:20');
INSERT INTO `j-bombs` VALUES(87, 'JonNick', 'jonnick', './_includes/img/bombs/jonnick.gif', './_includes/midi/benny_hill.mid', '192.168.0.7', 2, '2010-08-02 09:20:20');
INSERT INTO `j-bombs` VALUES(88, 'Man Dance', 'man-dance', './_includes/img/bombs/man-dance.gif', './_includes/midi/benny_hill.mid', '192.168.0.7', 0, '2010-08-02 09:20:20');
INSERT INTO `j-bombs` VALUES(89, 'Pirates', 'pirates', './_includes/img/bombs/pirates.gif', '', '192.168.0.7', 0, '2010-08-02 09:20:20');
INSERT INTO `j-bombs` VALUES(90, 'PxG Hulk', 'pxg-hulk', './_includes/img/bombs/pxg-hulk.gif', './_includes/midi/hulk_hogan.midi', '192.168.0.7', 2, '2010-08-02 09:20:20');
INSERT INTO `j-bombs` VALUES(91, 'WWF', 'wwf', './_includes/img/bombs/wwf.gif', './_includes/midi/hulk_hogan.midi', '192.168.0.7', 0, '2010-08-02 09:20:20');
INSERT INTO `j-bombs` VALUES(92, 'Huh', 'huh', './_includes/img/bombs/huh.gif', './_includes/midi/gonna_fly_now.mid', '192.168.0.7', 1, '2010-08-02 09:20:20');
INSERT INTO `j-bombs` VALUES(93, 'coffee', 'coffee', 'http://25.media.tumblr.com/tumblr_l65q65nqmz1qzze8ko1_400.gif', '', '192.168.0.13', 0, '2010-08-02 09:26:25');
