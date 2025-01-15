-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2024 at 11:58 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `complaint management system`
--

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `id` int(16) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `CiD` int(5) NOT NULL,
  `created_by_id` varchar(50) NOT NULL,
  `DiD` int(5) NOT NULL,
  `is_private` int(1) NOT NULL,
  `created_on` varchar(12) NOT NULL,
  `feedback` varchar(5000) NOT NULL DEFAULT 'Feedback could be provided after resolving the complaint',
  `report` varchar(5000) NOT NULL DEFAULT 'Report will be given after resolving the complaint.',
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`id`, `title`, `description`, `CiD`, `created_by_id`, `DiD`, `is_private`, `created_on`, `feedback`, `report`, `status`) VALUES
(6, 'Poor Internet Connectivity in Hostel', 'The Wi-Fi connection in the campus hostel, particularly in Block B, has been severely unreliable for the past three weeks. The connection is either extremely slow or completely drops, especially during peak study hours in the evening. As a student who relies heavily on online resources for research and completing assignments, this issue is causing significant disruptions to my academic work. I have missed deadlines for uploading assignments because the internet connection was lost multiple times while trying to submit. Despite numerous complaints from hostel residents, no action has been taken to improve the situation. We need a more stable and faster internet connection, with potential upgrades to the current network infrastructure to accommodate the high demand. This is a critical issue affecting not just our academic performance but also our ability to stay connected with family and friends.', 4, '10.christojohn@gmail.com', 10, 0, '2024-10-19', 'Feedback could be provided after resolving the complaint', 'Report will be given after resolving the complaint.', 0),
(8, 'Lack of Equipment in Biology Lab', 'In the Biology Department’s lab, there is a chronic shortage of basic equipment needed for conducting practical sessions. Specifically, we are missing essential tools such as microscopes, glass slides, and even basic chemicals for experiments. During our last practical session, only three microscopes were available for a group of 25 students, meaning we had to take turns, severely limiting the amount of hands-on experience we could gain. Additionally, several of the microscopes we do have are outdated and malfunction frequently, which further slows down our work. Without adequate lab equipment, we are unable to perform many of the experiments required for understanding core biological concepts. I request that the lab be better equipped with functioning, up-to-date equipment to ensure all students have equal access to practical learning opportunities.', 4, '10.christojohn@gmail.com', 7, 0, '2024-10-19', 'Feedback could be provided after resolving the complaint', 'Report will be given after resolving the complaint.', 0),
(11, 'Bullying in the Hostel', 'I am writing to report a serious issue of bullying that I have been experiencing in the hostel. Several students from my block have been consistently mocking my appearance and making derogatory comments. This behavior has escalated over the past month, and I no longer feel safe in my living environment. I have tried to address this issue informally with the individuals involved, but it has only made things worse. I believe that this behavior is unacceptable and could lead to further mental health issues if not addressed immediately. I request that the Student Affairs Office take appropriate action to investigate this matter and provide a safer living environment for me and other students who may be facing similar issues.', 6, '10.christojohn@gmail.com', 8, 0, '2024-10-19', 'Feedback could be provided after resolving the complaint', 'Report will be given after resolving the complaint.', 0),
(13, 'Lack of Mental Health Counseling', 'As a student facing increased stress and anxiety due to academic pressures and personal issues, I have been trying to access mental health counseling services provided by the college. Unfortunately, I have found that there is only one counselor available for the entire student body, and getting an appointment has been nearly impossible. I attempted to schedule a session two weeks ago but was told the next available appointment was in three weeks. Given the rising mental health concerns among students, I believe the college needs to allocate more resources to mental health services. This is a critical need, and I urge the administration to consider hiring additional counselors or offering more accessible mental health resources to support students effectively.', 6, '10.christojohn@gmail.com', 9, 0, '2024-10-19', 'Feedback could be provided after resolving the complaint', 'Report will be given after resolving the complaint.', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
