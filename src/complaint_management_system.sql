-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2024 at 05:41 AM
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
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(1, '', ''),
(3, 'Academic-Related', '\n<ul>\n  <li>\n    <b>Course Content Issues:</b> Complaints about outdated, irrelevant, or\n    unclear course material.\n  </li>\n  <li>\n    <b>Teaching Quality:</b> Concerns about a teacher’s effectiveness, behavior,\n    or communication skills.\n  </li>\n  <li>\n    <b>Examination Issues:</b> Problems related to scheduling, conduct, or\n    fairness of exams.\n  </li>\n  <li>\n    <b>Assignment and Grading Issues:</b> Disputes over grades, feedback, or\n    assignment clarity.\n  </li>\n  <li>\n    <b>Attendance Issues:</b> Errors in attendance records or policies regarding\n    attendance.\n  </li>\n  <li>\n    <b>Class Scheduling:</b> Complaints about conflicting or inconvenient class\n    timings.\n  </li>\n  <li>\n    <b>Lack of Academic Support:</b> Insufficient guidance from faculty or staff\n    in academic matters.\n  </li>\n  <li>\n    <b>Practical/Project Work Issues:</b> Problems with guidance or resources\n    for practical projects.\n  </li>\n  <li>\n    <b>Research Supervision:</b> Concerns regarding the guidance or availability\n    of research supervisors.\n  </li>\n</ul>;\n'),
(4, 'Facilities & Infrastructure', '<br>Classroom Facilities: Issues with seating, lighting, or ventilation in classrooms.\n<br>Library Facilities: Complaints about inadequate resources, noisy environment, or poor library services.\n<br>Laboratory Facilities: Problems with equipment, safety, or availability of labs for practicals.\n<br>Sports and Recreation: Issues with gym equipment, sports facilities, or availability of recreational spaces.\n<br>Hostel Facilities: Concerns about room conditions, safety, or hostel amenities.\n<br>Cafeteria/Food Services: Complaints about the quality, pricing, or hygiene of food in the cafeteria.\n<br>IT and Network Issues: Problems with internet connectivity, access to college Wi-Fi, or malfunctioning IT systems.\n<br>Campus Cleanliness: Issues related to cleanliness and sanitation in classrooms, hostels, or restrooms.\n<br>Transportation: Complaints regarding college transport services, including buses or parking facilities.'),
(5, 'Administrative and Support Services', '\n<br>Admission Process Issues: Complaints about errors or unfairness during admissions.\n<br>Registration/Enrollment Problems: Issues faced during course registration or semester enrollment.\n<br>Examination Administration: Delays or errors in exam-related administrative procedures.\n<br>Document Requests: Delays or errors in getting transcripts, certificates, or other official documents.\n<br>Financial Services: Complaints about the handling of tuition fees, scholarships, or other financial matters.\n<br>Hostel Admission/Administration: Issues with hostel allocation, management, or rules.\n<br>HR / Faculty Issues (for Staff): Complaints related to staff recruitment, promotions, or unfair treatment.\n<br>Staff Behavior: Complaints about the behavior or unresponsiveness of non-teaching staff, including administrative and support staff.\n'),
(6, 'Student Welfare & Discipline', '\n<br/>Disciplinary Actions: Disputes over punishments or allegations regarding student behavior.\n<br/>Student Counseling: Issues with mental health services or counseling availability.\n<br/>Bullying/Harassment: Complaints about any form of bullying, discrimination, or harassment by students, faculty, or staff.\n<br/>Ragging Complaints: Reports of hazing or ragging incidents.\n<br/>Health Services: Concerns regarding the availability or quality of medical services on campus.\n<br/>Safety and Security: Issues related to campus safety, security staff, or emergency procedures.\n<br/>Student Clubs/Activities: Complaints about the management or support of student clubs, events, or extracurricular activities.'),
(7, 'IT and Digital Services', '<br/>Online Learning Platforms: Issues with access to e-learning platforms, course materials, or system performance.\n<br/>Student Portal Problems: Problems with accessing the student portal, updating details, or submitting assignments online.\n<br/>Email/Communication Services: Issues with receiving official communication or email outages.\n<br/>Software Licensing: Complaints about access to licensed software for academic use.\n<br/>Data Privacy Issues: Concerns regarding the privacy and security of personal or academic data.\n<br/>Technical Support Delays: Delays or unresponsiveness from the IT support team.'),
(8, 'Examination & Evaluation', '<br/>Grade Disputes: Disagreement with the grades assigned in courses or exams.\n<br/>Exam Timetable Issues: Complaints about overlapping or poorly timed exams.\n<br/>Unfair Evaluation: Concerns about unfairness or inconsistencies in grading or evaluation.\n<br/>Exam Infrastructure: Problems with seating arrangements, exam hall conditions, or invigilation.'),
(9, 'Financial Complaints', '<br/>Fee Payment Issues: Problems with processing fee payments or errors in billing.\n<br/>Scholarship Issues: Concerns about scholarship eligibility, delays in disbursement, or cancellations.\n<br/>Refund Requests: Complaints regarding delays or refusal of tuition or hostel fee refunds.\n<br/>Fines and Penalties: Disputes over fines imposed for late payments or disciplinary actions.'),
(10, 'Faculty and Staff Issues', '\n<br/>Workplace Harassment: Reports of harassment or inappropriate behavior from colleagues or superiors.\n<br/>Workload and Assignments: Complaints regarding excessive workload or unfair task assignments.\n<br/>Career Advancement Issues: Concerns about lack of promotions, training opportunities, or professional development.\n<br/>Salary Issues: Disputes or delays in salary disbursement.\n<br/>Workplace Facilities: Concerns about the workspace, such as office conditions or access to necessary tools and resources.'),
(11, 'Event and Activity Management', '<br/>Event Mismanagement: Complaints about the handling of college events, such as festivals, seminars, or sports meets.\n<br/>Extracurricular Activities: Concerns about the management or organization of clubs, societies, or events.'),
(12, 'Policy & Governance Issues', '\n<br/>College Policies: Complaints about unclear, outdated, or unfair academic or administrative policies.\n<br/>Disciplinary Policies: Concerns about how discipline is enforced or inconsistency in policy implementation.\n<br/>Anti-Ragging Policies: Reports of insufficient enforcement of anti-ragging measures.'),
(13, 'Discrimination and Equity', '<br/>Gender Discrimination: Complaints about unequal treatment based on gender.\n<br/>Racial/Religious Discrimination: Reports of unequal treatment based on race, religion, or cultural background.\n<br/>Disability Support Issues: Concerns regarding the lack of facilities or accommodations for students or staff with disabilities.'),
(14, 'Alumni & Career Services', '<br/>Placement Issues: Complaints about the quality or availability of campus placements.\n<br/>Career Counseling Services: Issues with career guidance or internship opportunities.\n<br/>Alumni Relations: Concerns related to alumni events, resources, or opportunities for networking.'),
(15, 'Other Complaints', '<br/>Suggestions for Improvement: General suggestions that do not fit other categories but provide constructive feedback on college operations.\n<br/>Uncategorized Complaints: For complaints that don’t fall into predefined categories but still need attention.'),
(16, 'Assignment and Grading Issues', '\nThe \"Assignment and Grading Issues\" category encompasses all complaints related to the evaluation and assessment of student assignments, projects, and examinations. This includes concerns regarding unfair grading practices, discrepancies in assignment feedback, issues with submission deadlines, and inconsistencies in assessment criteria. Students may encounter various problems in this category, such as:\n<br/><br/>\n<br/>Unfair Grading: Complaints regarding perceived bias or inconsistency in grading, where students believe their assignments were evaluated unjustly compared to their peers. This may involve issues such as discrepancies between grades and feedback, lack of transparency in grading criteria, or favoritism by instructors.\n\n<br/>Feedback Quality: Concerns about the adequacy and clarity of feedback provided on assignments. Students may feel that feedback is vague, unhelpful, or lacks specific guidance on how to improve in future submissions.\n\n<br/>Submission Issues: Complaints related to problems with assignment submissions, such as technical difficulties with online submission platforms, unclear submission guidelines, or lack of proper communication regarding due dates.\n\n<br/>Grade Discrepancies: Situations where students notice inconsistencies between the grades posted and the grades they believe they should have received based on feedback and assessment criteria.\n\n<br/>Re-evaluation Requests: Instances where students formally request a re-evaluation of their assignments due to concerns about grading fairness or accuracy, necessitating a review by faculty or a designated committee.\n\n<br/>Policy Clarity: Issues stemming from unclear or poorly communicated grading policies, including how grades are calculated, the weight of different assignments, and the criteria for passing or failing courses.');

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

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `head` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `description`, `head`) VALUES
(2, '', '', ''),
(5, 'Computer Science', 'This department oversees the curriculum, faculty, and resources for students pursuing the Bachelor of Computer Applications (BCA). Any technical issues related to software labs, coding environments, or course content (like programming assignments) would be addressed by this department. Complaints such as \"Issues with access to computer labs\" or \"Outdated software in the labs\" would be directed here.', ''),
(6, 'Commerce', 'This department is responsible for managing courses in accounting, finance, and business studies under the Bachelor of Commerce (BCom) program. Complaints related to faculty, lecture scheduling, or difficulties in accessing study materials like financial records or accounting software would go to this department.', ''),
(7, 'Biotechnology', 'The Department of Biotechnology focuses on the science and research aspects of the BSc Biotechnology program. Complaints about laboratory equipment, research projects, or guidance from faculty on experiments and internships would be directed here. Issues such as \"Non-functioning lab equipment\" or \"Delay in research approval\" would be handled by this department.', ''),
(8, 'Business Administration', 'This department manages the Bachelor of Business Administration (BBA) program, dealing with subjects like marketing, finance, and organizational behavior. Complaints about classroom resources, access to business case studies, or the availability of faculty for project guidance would go to this department.', ''),
(9, 'Human Resource Management', 'Responsible for the BHRM (Bachelor of Human Resource Management) program, this department handles subjects like employee relations, recruitment strategies, and workforce management. Complaints could be about lack of faculty support in group activities, access to HR software for training, or issues with internships in the HR field.', ''),
(10, 'Information Technology', 'This department manages IT infrastructure, software tools, and technologies for students in programs like BCA and BBA. Complaints related to network issues, difficulty in accessing online resources, or the need for technical support in completing assignments would be submitted here.', ''),
(11, 'Financial Studies', 'Overseeing courses in finance and investment, this department addresses complaints about financial tools, issues in accessing market data, or lack of guidance on financial projects. Complaints might include \"Inadequate resources for stock market simulation\" or \"Difficulty in understanding financial modeling.\"', ''),
(12, 'Life Sciences', 'For students in the BSc Biotechnology program, this department oversees general life sciences subjects like microbiology and cell biology. Complaints about non-functional lab tools, insufficient resources in the library, or difficulty in accessing study materials would be handled by this department.', ''),
(13, 'Economics', 'This department manages courses on economic theory, macroeconomics, and global trade for BCom and BBA students. Complaints might relate to lecture content, accessibility of economic data, or insufficient faculty availability for extra sessions on difficult concepts.', ''),
(14, 'Marketing', 'his department handles the marketing aspects of the BBA and BHRM programs. Complaints about access to case studies, guidance on projects, or lack of support in marketing competitions would be directed here.', '');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(3000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(1, '', ''),
(3, 'Professor', 'Senior academic staff who lead research, teach advanced courses, and guide the department in curriculum development.'),
(4, 'Associate Professor', 'An experienced faculty member, responsible for both teaching and research. They may have some administrative duties within their department.'),
(5, 'Assistant Professor', 'Faculty member primarily responsible for teaching and conducting research. They are often early in their academic career.'),
(6, 'Lecturer / Instructor', 'Primarily responsible for teaching specific courses. They may not engage in research to the same extent as professors.'),
(7, 'Adjunct Faculty / Visiting Faculty', 'Part-time or contract-based teachers who may be professionals or experts from the industry. They often handle specific courses or subjects.'),
(8, 'Head of Department (HoD)', 'Faculty member who oversees the functioning of a particular academic department, managing faculty, curriculum, and resources.'),
(9, 'Teaching Assistant (TA)', 'Graduate or senior students who assist professors with teaching duties such as grading, tutoring, or leading discussion sections.'),
(10, 'Research Associate', 'Assists in research projects led by faculty. They help in conducting experiments, collecting data, and analyzing results.'),
(11, 'Lab Instructor', 'Responsible for teaching and supervising laboratory sessions, ensuring students can apply theoretical knowledge in practical scenarios.'),
(12, 'Principal', 'The highest authority in the college, responsible for overall administration, academic leadership, and decision-making.'),
(13, 'Vice-Principal', 'Assists the principal in administrative functions, handles specific areas like discipline, academic policies, or student affairs.'),
(14, 'Registrar', 'Responsible for student admissions, maintaining academic records, overseeing registration, and managing administrative tasks related to the student body.'),
(15, 'Academic Dean', 'Oversees academic programs, faculty hiring, and academic policies. They manage multiple departments or schools within the college.'),
(16, 'Administrative Officer', 'Handles day-to-day administrative functions such as infrastructure management, scheduling, and overall coordination among departments.'),
(17, 'Admissions Officer', 'Manages the student admission process, including applications, entrance exams, interviews, and selection of candidates.'),
(18, 'Examination Controller', 'Oversees the organization and administration of exams, ensuring proper scheduling, invigilation, and result processing.'),
(19, 'Librarian', 'Manages the college library, curates resources, assists students and faculty with research materials, and oversees library staff.'),
(20, 'IT Administrator', 'Ensures that all IT infrastructure, systems, and networks function smoothly. They maintain student databases, online platforms, and network security.'),
(21, 'Finance Officer / Accountant', 'Handles the financial management of the college, including budgeting, accounts payable/receivable, tuition fees, and payroll.'),
(22, 'HR Manager', 'Responsible for managing the recruitment, performance evaluations, and welfare of all college staff and faculty.'),
(23, 'Facilities Manager', 'Oversees the maintenance and management of physical infrastructure, including classrooms, labs, hostels, and other facilities.'),
(24, 'Clerk', 'Handles administrative paperwork, maintains records, and supports the administrative and academic staff with office tasks.'),
(25, 'Lab Technician', 'Assists in preparing and maintaining lab equipment and supplies, supporting lab instructors and students during practical sessions.'),
(26, 'Library Assistant', 'Helps the librarian with cataloging, book issuing, and providing research assistance to students and faculty.'),
(27, 'Security Personnel', 'Responsible for maintaining safety and security on campus, monitoring entry/exit points, and handling emergency situations.'),
(28, 'Maintenance Staff', 'Ensures the upkeep of college facilities such as cleaning, plumbing, and electrical maintenance.'),
(29, 'Peon / Attendant', 'Provides general assistance, such as delivering files, setting up meeting rooms, and helping with basic tasks in various departments.'),
(30, 'Driver', 'Operates college vehicles for transporting staff, faculty, and students, or handling errands related to administrative work.'),
(31, 'Hostel Warden', 'Supervises students living in college hostels, ensuring discipline, safety, and proper management of facilities.'),
(32, 'Cafeteria Staff', 'Operates the college cafeteria, ensuring food preparation, cleanliness, and service to students and staff.'),
(33, 'Counselor / Student Advisor', 'Provides academic and personal counseling to students, helping them manage stress, academic workload, and personal challenges.'),
(34, 'Placement Officer', 'Manages campus recruitment activities, liaises with companies, and assists students in finding internships or job placements.'),
(35, 'Career Counselor', 'Guides students on career choices, helping them select courses, internships, and career paths that align with their interests and skills.\n'),
(36, 'Student Affairs Officer', 'Coordinates extracurricular activities, student clubs, events, and welfare programs, ensuring students’ non-academic needs are met.'),
(37, 'Alumni Coordinator', 'Manages relationships with alumni, organizes alumni events, and leverages alumni support for student mentorship and college initiatives.'),
(38, 'Parent Liaison Officer', 'Serves as a point of contact between the college and parents, keeping them informed about their child`s academic performance and any issues.'),
(39, 'External Examiner', 'External academic professional responsible for overseeing and validating exam results to ensure fairness and consistency.'),
(40, 'Legal Advisor', 'Provides legal counsel to the college on matters such as policy, contracts, student disputes, or compliance with regulations.'),
(41, 'Training & Development Officer', 'Organizes workshops, seminars, and training programs to enhance the skills of both students and staff.'),
(42, 'Research Supervisor', 'Guides students or junior faculty in their research work, ensuring adherence to academic standards and methodologies.'),
(43, 'Parents / Guardians', 'Parents or guardians are key stakeholders in a student’s academic journey. While they do not have formal roles in the institution’s administration, they often participate in parent-teacher meetings, receive academic updates, and communicate with the college regarding their child’s academic progress or behavioral issues.'),
(44, 'Parent Association Member', 'Parents form associations or committees to voice their concerns and offer support in enhancing the student experience. These associations work with the college administration on topics like student welfare, campus safety, and extracurricular activities.'),
(45, 'Alumni Association Member', 'Graduates of the college often form an alumni association to maintain a connection with the institution and provide support. They help with mentoring current students, fundraising, organizing reunions, and sometimes even sponsoring scholarships.\n'),
(46, 'Alumni Mentor', 'Alumni can act as mentors for students, offering guidance on career development, internships, job placements, and networking opportunities. This is often done through formal programs managed by the college.'),
(47, 'Alumni Donor', 'Many alumni contribute financially to their alma mater through donations or endowments, helping to fund scholarships, campus improvements, or research initiatives.'),
(48, 'ocal Community Member', 'In cases where the college is closely integrated with the local town or city, community members can have informal or formal roles in supporting the institution. This might include participating in college events, providing internship or job opportunities for students, or being part of community outreach programs.'),
(49, 'Local Business Partners', 'Local businesses who have partnerships with the college, supplying goods or services, sponsoring events, or offering internships and jobs to students. They may also participate in industry-related programs or provide real-world project opportunities for students.\n'),
(50, 'Industry Advisors / Professionals', 'Professionals from relevant industries (such as tech, commerce, or biotechnology) often collaborate with colleges to provide guest lectures, industry insights, and training. They help bridge the gap between academic theory and practical application. They may also serve as advisors on curriculum development, ensuring courses align with industry needs.'),
(51, 'Community Engagement Officer', 'Officers who foster relationships between the institution and the local community, facilitating community involvement in college activities or social responsibility programs.\n'),
(52, 'Parents of Prospective Students', 'Parents of prospective students often interact with the college during the admissions process, attending information sessions, open houses, or interviews to learn more about the institution and its offerings.'),
(53, 'Education Consultants', 'Education consultants or advisors may have a role in helping students choose the college that fits their needs. They might also work with the college to recruit students, manage academic collaborations, or support international exchange programs.'),
(54, 'Government Representatives', 'Government agencies or accreditation bodies oversee the academic and administrative standards of the college. They play a role in ensuring that the institution meets regulatory and quality standards.'),
(55, 'NGO Representatives', ' In colleges with social or environmental outreach programs, representatives from NGOs (Non-Governmental Organizations) may work closely with students and faculty on community service projects, research, or campaigns aimed at social welfare.'),
(56, 'College Ambassadors', 'Student or parent ambassadors to represent the institution at public events, admissions fairs, and outreach programs. Ambassadors share their experiences and help prospective students and their families understand the benefits of attending the institution.'),
(57, 'User', 'Anyone who uses the complaint management system.'),
(58, 'Admin', 'Admin oversees and manages the complainty management system');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(30) NOT NULL,
  `created_on` varchar(12) NOT NULL,
  `token` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `created_on`, `token`, `name`) VALUES
('10.christojohn@gmail.com', '10.christojohn@gmail.com', 'admin', '2024-10-07', '', 'Christo John');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `UiD` varchar(50) NOT NULL,
  `RiD` int(5) NOT NULL,
  `sno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`sno`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
