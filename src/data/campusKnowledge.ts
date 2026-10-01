import { CampusService, CampusEvent, FAQItem } from '../types/campus';

export const CAMPUS_NAME = 'Summit University';
export const CAMPUS_MASCOT = 'The Golden Eagles';
export const CAMPUS_MOTTO = 'Ascend with Knowledge, Lead with Purpose';

export const CAMPUS_SERVICES: CampusService[] = [
  {
    id: 'registrar',
    name: 'Office of the Registrar',
    department: 'Academic Affairs',
    category: 'academic',
    location: 'Summit Central Hall, Wing A',
    building: 'Summit Central Hall',
    room: 'Suite 104',
    hours: {
      weekdays: '8:30 AM – 5:00 PM',
      weekends: 'Closed',
      notes: 'Drop-in counter closes at 4:30 PM on Fridays'
    },
    contact: {
      phone: '(555) 019-2831',
      email: 'registrar@summit.edu',
      website: 'my.summit.edu/registrar'
    },
    description: 'Handles official transcripts, course registration, add/drop petitions, enrollment verifications, degree audits, and graduation status.',
    quickActions: ['Request Official Transcript', 'Submit Add/Drop Petition', 'Apply for Graduation'],
    popularQuestions: [
      'What is the last day to drop a course without a W?',
      'How do I request an official electronic transcript?',
      'How do I change or declare my major or minor?'
    ]
  },
  {
    id: 'financial-aid',
    name: 'Student Financial Aid & Scholarships',
    department: 'Enrollment Management',
    category: 'financial',
    location: 'Alder Hall, 2nd Floor',
    building: 'Alder Student Services Building',
    room: 'Room 210',
    hours: {
      weekdays: '9:00 AM – 4:30 PM',
      weekends: 'Closed',
      notes: 'Virtual appointments available Tue/Thu afternoons'
    },
    contact: {
      phone: '(555) 019-2840',
      email: 'financialaid@summit.edu',
      website: 'finaid.summit.edu'
    },
    description: 'Assists with FAFSA filing, university grants, merit scholarships, federal work-study verification, and tuition emergency loan programs.',
    quickActions: ['Check FAFSA Verification Status', 'Apply for Emergency Aid', 'View Payment Deadlines'],
    popularQuestions: [
      'When is the priority deadline for FAFSA renewal?',
      'How does Federal Work-Study get paid out?',
      'What happens if my financial aid is delayed before tuition is due?'
    ]
  },
  {
    id: 'housing-reslife',
    name: 'Housing & Residence Life (ResLife)',
    department: 'Student Affairs',
    category: 'housing',
    location: 'Ponderosa Commons, North Tower',
    building: 'Ponderosa Commons',
    room: 'Ground Floor Lobby Office',
    hours: {
      weekdays: '8:00 AM – 6:00 PM',
      weekends: '10:00 AM – 2:00 PM',
      notes: 'Resident Assistant (RA) on duty daily from 7:00 PM – 7:00 AM'
    },
    contact: {
      phone: '(555) 019-2910',
      email: 'housing@summit.edu',
      website: 'reslife.summit.edu'
    },
    description: 'Oversees campus dormitories, apartment communities, room assignments, roommate mediation, move-in/move-out, and dorm maintenance requests.',
    quickActions: ['Submit Dorm Maintenance Work Order', 'Request Room Swap Form', 'View Guest Pass Policy'],
    popularQuestions: [
      'How can I request a roommate change or room swap?',
      'How do I submit an urgent work order for a broken dorm radiator or plumbing?',
      'What are the dorm quiet hours and overnight guest policies?'
    ]
  },
  {
    id: 'dining-services',
    name: 'Summit Campus Dining & Meal Plans',
    department: 'Auxiliary Services',
    category: 'dining',
    location: 'Crestview Commons & Union Pavilion',
    building: 'Crestview Dining Commons',
    hours: {
      weekdays: '7:00 AM – 10:00 PM',
      weekends: '8:30 AM – 9:00 PM',
      notes: 'Late-night grill in Alder Union open until 1:00 AM daily'
    },
    contact: {
      phone: '(555) 019-2955',
      email: 'dining@summit.edu',
      website: 'dining.summit.edu'
    },
    description: 'Manages all residential dining halls, campus cafes, dietary accommodations (halal, kosher, vegan, allergen-free), and EagleBucks meal plans.',
    quickActions: ['Check Today’s Dining Menu', 'Add EagleBucks to Student Card', 'Request Dietary Consultation'],
    popularQuestions: [
      'Where can I use my EagleBucks and meal swipes?',
      'What are the hours for Crestview Dining Commons and Alder Cafe?',
      'Can I switch my meal plan after the semester has started?'
    ]
  },
  {
    id: 'caps-health',
    name: 'Student Health & Wellness Center (CAPS)',
    department: 'Student Health Services',
    category: 'health',
    location: 'Wellness Pavilion, 1st & 2nd Floors',
    building: 'Health & Wellness Pavilion',
    room: 'Suite 200 (Counseling) / Suite 100 (Medical)',
    hours: {
      weekdays: '8:00 AM – 5:00 PM',
      weekends: 'Closed (24/7 Nurse Advice Line active)',
      notes: '24/7 Crisis Lifeline: Dial 988 or call campus crisis line (555) 019-SAFE'
    },
    contact: {
      phone: '(555) 019-2277',
      email: 'healthcenter@summit.edu',
      website: 'health.summit.edu'
    },
    description: 'Comprehensive outpatient primary medical care, immunization compliance, confidential mental health counseling, stress relief workshops, and nutrition guidance.',
    quickActions: ['Book Confidential Counseling Session', 'Schedule Flu/Vaccine Shot', 'Call 24/7 Health Advice Line'],
    popularQuestions: [
      'How do I schedule a mental health counseling appointment with CAPS?',
      'Are routine doctor visits covered by student health fees?',
      'What should I do if I feel sick on the weekend?'
    ]
  },
  {
    id: 'library-learning',
    name: 'Pioneer Memorial Library & Learning Commons',
    department: 'Academic Resources',
    category: 'academic',
    location: 'Center of Main Quad',
    building: 'Pioneer Memorial Library',
    hours: {
      weekdays: '7:30 AM – 2:00 AM (24/7 during Finals Week)',
      weekends: '9:00 AM – Midnight',
      notes: 'Quiet study floors: 3rd and 4th floors strictly silent'
    },
    contact: {
      phone: '(555) 019-2400',
      email: 'library@summit.edu',
      website: 'library.summit.edu'
    },
    description: 'Houses 4 floors of research collections, group study room bookings, technology lending (laptops, cameras, graphing calculators), and 3D printing makerspace.',
    quickActions: ['Reserve Group Study Room', 'Borrow Laptop / Calculator', 'Search Research Databases'],
    popularQuestions: [
      'How do I reserve a group study room in Pioneer Library?',
      'Can students borrow laptops, chargers, or cameras?',
      'How do I print documents and what is my student printing quota?'
    ]
  },
  {
    id: 'student-activities',
    name: 'Office of Student Activities & Leadership',
    department: 'Student Affairs',
    category: 'activities',
    location: 'Alder Student Union, 3rd Floor',
    building: 'Alder Student Union',
    room: 'Suite 312',
    hours: {
      weekdays: '9:00 AM – 6:00 PM',
      weekends: 'Events as scheduled'
    },
    contact: {
      phone: '(555) 019-2770',
      email: 'activities@summit.edu',
      website: 'engage.summit.edu'
    },
    description: 'Central hub for over 140 registered student clubs, Greek Life, student government (ASG), campus festivals, volunteer programs, and concert series.',
    quickActions: ['Browse 140+ Student Clubs', 'Start a New Student Organization', 'View Campus Calendar'],
    popularQuestions: [
      'How do I join a student club or fraternity/sorority?',
      'How do I start a new recognized student organization?',
      'When is the Fall/Spring Campus Activities & Club Fair?'
    ]
  },
  {
    id: 'it-helpdesk',
    name: 'IT Service Desk & Tech Support',
    department: 'Information Technology',
    category: 'tech',
    location: 'Pioneer Library, 1st Floor East Wing',
    building: 'Pioneer Memorial Library',
    room: 'Room 118',
    hours: {
      weekdays: '7:30 AM – 8:00 PM',
      weekends: '10:00 AM – 4:00 PM',
      notes: '24/7 Chat support via helpdesk.summit.edu'
    },
    contact: {
      phone: '(555) 019-4357 (555-019-HELP)',
      email: 'helpdesk@summit.edu',
      website: 'helpdesk.summit.edu'
    },
    description: 'Provides technical assistance with Eduroam Wi-Fi configuration, Canvas LMS, Summit Student Portal accounts, dual-factor authentication (Duo), free software downloads (Office 365, Adobe Creative Cloud, MATLAB), and campus printing.',
    quickActions: ['Reset Portal/Canvas Password', 'Configure Eduroam Wi-Fi', 'Download Free Adobe/Office Suite'],
    popularQuestions: [
      'How do I connect my phone and laptop to Eduroam Wi-Fi?',
      'How do I get free Microsoft Office 365 and Adobe Creative Cloud?',
      'What should I do if Canvas is locked or my password expired?'
    ]
  },
  {
    id: 'transit-parking',
    name: 'Parking, Transit & Eagle Shuttle Services',
    department: 'Campus Operations',
    category: 'transit',
    location: 'North Campus Parking Structure A',
    building: 'Facilities & Public Safety Complex',
    hours: {
      weekdays: '8:00 AM – 5:00 PM',
      weekends: 'Closed',
      notes: 'Shuttles operate Mon–Sun until 2:30 AM'
    },
    contact: {
      phone: '(555) 019-7275',
      email: 'parking@summit.edu',
      website: 'transit.summit.edu'
    },
    description: 'Manages student parking permits, commuter passes, the free campus Eagle Shuttle loop, airport holiday shuttles, and bike registration.',
    quickActions: ['Buy Student Parking Permit', 'Track Live Eagle Shuttle', 'Register Bike for Free Lock'],
    popularQuestions: [
      'Are freshmen living on campus allowed to purchase parking permits?',
      'What are the route and hours for the Eagle Night Shuttle?',
      'How can I get a discounted city bus transit pass?'
    ]
  },
  {
    id: 'career-center',
    name: 'Center for Career Exploration & Internships',
    department: 'Student Success',
    category: 'career',
    location: 'Alder Student Union, 2nd Floor',
    building: 'Alder Student Union',
    room: 'Suite 220',
    hours: {
      weekdays: '8:30 AM – 5:00 PM',
      weekends: 'Closed',
      notes: 'Walk-in 15-min resume reviews every weekday 1:00 PM – 3:30 PM'
    },
    contact: {
      phone: '(555) 019-3200',
      email: 'careers@summit.edu',
      website: 'careers.summit.edu (Handshake)'
    },
    description: 'Offers 1-on-1 resume reviews, mock interviews, career fairs with 200+ employers, Handshake job postings, internship funding grants, and professional headshots.',
    quickActions: ['Book 1-on-1 Career Advising', 'Submit Resume for Walk-In Review', 'Log into Handshake Portal'],
    popularQuestions: [
      'How do I get my resume reviewed before the Career Fair?',
      'Where can I apply for on-campus student jobs?',
      'When is the upcoming Campus All-Majors Career Fair?'
    ]
  },
  {
    id: 'campus-safety',
    name: 'Campus Police & SafeWalk Escort Service',
    department: 'Public Safety',
    category: 'safety',
    location: 'Public Safety Building (Corner of Summit Ave & Oak St)',
    building: 'Public Safety Center',
    hours: {
      weekdays: '24/7/365 Open',
      weekends: '24/7/365 Open',
      notes: 'Emergency: Dial (555) 019-9111 or press any Blue Light Station'
    },
    contact: {
      phone: '(555) 019-9111 (Emergency) / (555) 019-2000 (Non-Emergency)',
      email: 'safety@summit.edu',
      website: 'safety.summit.edu'
    },
    description: 'Sworn university police department offering 24/7 security patrols, free SafeWalk walking escorts anywhere on campus after dark, lost and found, and emergency alerts.',
    quickActions: ['Request SafeWalk Night Escort', 'Report Lost Property', 'Sign up for EagleAlert SMS'],
    popularQuestions: [
      'How do I request a SafeWalk escort to walk me back to my dorm at night?',
      'Where is the central campus Lost and Found?',
      'How do the emergency Blue Light boxes work?'
    ]
  },
  {
    id: 'rec-sports',
    name: 'Falcon Recreation & Aquatic Center',
    department: 'Athletics & Recreation',
    category: 'activities',
    location: 'South Campus Athletic Complex',
    building: 'Falcon Recreation Center',
    hours: {
      weekdays: '6:00 AM – 11:00 PM',
      weekends: '8:00 AM – 9:00 PM'
    },
    contact: {
      phone: '(555) 019-7767',
      email: 'recsports@summit.edu',
      website: 'rec.summit.edu'
    },
    description: 'Three-story fitness center with Olympic lap pool, indoor running track, rock climbing wall, group fitness classes (yoga, HIIT, spin), and intramural sports leagues.',
    quickActions: ['Sign up for Intramural Leagues', 'Book Rock Wall Belay Test', 'View Group Fitness Class Schedule'],
    popularQuestions: [
      'Is gym and pool access free with my student ID card?',
      'How do I register a team for intramural basketball or soccer?',
      'Are personal trainers and group fitness classes available?'
    ]
  }
];

export const CAMPUS_EVENTS: CampusEvent[] = [
  {
    id: 'evt-1',
    title: 'Spring Campus Involvement & Club Fair',
    category: 'social',
    date: 'Wednesday, Oct 8, 2026',
    time: '11:00 AM – 3:30 PM',
    location: 'Main University Quad (Rain location: Alder Student Union Ballroom)',
    organizer: 'Office of Student Activities & ASG',
    description: 'Over 140 student clubs, cultural societies, academic teams, and volunteer organizations will have booths. Free food trucks, swag, club signups, and live DJ!',
    tags: ['Clubs', 'Free Food', 'Social', 'All Students'],
    isFeatured: true
  },
  {
    id: 'evt-2',
    title: 'All-Majors Fall Career & Internship Expo',
    category: 'career',
    date: 'Tuesday, Oct 14, 2026',
    time: '10:00 AM – 4:00 PM',
    location: 'Falcon Recreation Center Main Arena',
    organizer: 'Center for Career Exploration',
    description: 'Network with over 180 hiring employers from tech, healthcare, finance, engineering, and non-profits. Professional attire required. Free LinkedIn headshots booth included.',
    tags: ['Career', 'Jobs', 'Internships', 'Networking'],
    isFeatured: true
  },
  {
    id: 'evt-3',
    title: 'Midterm Study Jam & Free Donut Midnight Breakfast',
    category: 'academic',
    date: 'Monday, Oct 20, 2026',
    time: '8:00 PM – Midnight',
    location: 'Pioneer Memorial Library 1st Floor Cafe',
    organizer: 'University Academic Peer Tutors',
    description: 'Drop-in tutoring for Calculus, Chemistry, Coding, and Writing. Free artisan donuts, drip coffee, yerba mate, and noise-canceling headphones checkout.',
    tags: ['Tutoring', 'Study', 'Free Food', 'Academics']
  },
  {
    id: 'evt-4',
    title: 'Therapy Dogs & Mental Wellness Relaxation Bar',
    category: 'wellness',
    date: 'Thursday, Oct 23, 2026',
    time: '1:00 PM – 4:00 PM',
    location: 'Health & Wellness Pavilion Patio',
    organizer: 'Counseling & Psychological Services (CAPS)',
    description: 'De-stress with certified therapy dogs from Golden Paws! Includes DIY stress-ball making, herbal tea station, and mindfulness coaches.',
    tags: ['Wellness', 'Mental Health', 'Dogs', 'Relaxation']
  },
  {
    id: 'evt-5',
    title: 'Intramural 3v3 Basketball Tournament Tip-Off',
    category: 'sports',
    date: 'Friday, Oct 24, 2026',
    time: '6:00 PM – 10:00 PM',
    location: 'Falcon Recreation Center Courts 1 & 2',
    organizer: 'Falcon Rec Sports',
    description: 'Annual double-elimination 3v3 tournament. Trophies and champion intramural tees for the winners. Registration closes Wednesday at 5 PM on IMLeagues.',
    tags: ['Sports', 'Fitness', 'Competition', 'Prizes']
  },
  {
    id: 'evt-6',
    title: 'Annual Golden Eagle Homecoming Concert & Bonfire',
    category: 'social',
    date: 'Saturday, Nov 1, 2026',
    time: '7:00 PM – 11:30 PM',
    location: 'South Campus Lawn & Outdoor Amphitheater',
    organizer: 'Summit Student Programming Board',
    description: 'Headlined by national indie and hip-hop guest artists! Includes traditional torch lighting ceremony, carnival rides, fireworks, and alumni tailgate.',
    tags: ['Music', 'Concert', 'Tradition', 'Homecoming'],
    isFeatured: true
  }
];

export const PRESET_FAQS: FAQItem[] = [
  {
    id: 'faq-add-drop',
    category: 'academic',
    question: 'How do I add or drop a class, and what is the deadline?',
    shortAnswer: 'You can add or drop classes online through the Summit Portal until Friday of Week 2 (11:59 PM). After that, instructor and dean signatures are required with a W grade.',
    detailedAnswer: 'During the first two weeks of the term (the Add/Drop Period), you can register, switch sections, or drop courses online via `my.summit.edu/registration` without academic penalty or tuition liability. \n\nAfter Week 2, dropping a class requires a "Late Course Withdrawal Petition" signed by your course instructor and academic advisor; the course will appear on your transcript as a `W` (Withdrawal), which does not affect your GPA. The final deadline for a W withdrawal is Friday of Week 8. Visit the Registrar in Summit Central Hall Suite 104 if you have holds.',
    department: 'Office of the Registrar',
    location: 'Summit Central Hall Suite 104',
    contactEmail: 'registrar@summit.edu',
    actionUrl: 'https://my.summit.edu/registration',
    actionLabel: 'Open Registration Portal',
    tags: ['add class', 'drop class', 'deadlines', 'W grade', 'schedule']
  },
  {
    id: 'faq-transcripts',
    category: 'academic',
    question: 'How do I order an official college transcript?',
    shortAnswer: 'Official transcripts can be ordered 24/7 through the Parchment ordering portal via your student dashboard. Electronic delivery takes 15–30 minutes.',
    detailedAnswer: 'Summit University partners with Parchment for certified electronic and paper transcripts. \n1. Log in to `my.summit.edu` and select **Academics > Order Transcripts**.\n2. Digital PDF delivery costs $4.00 and is sent within 30 minutes.\n3. Paper mailed transcripts cost $8.50 with tracking.\n4. Unofficial transcripts can be downloaded immediately for free at any time under the **Unofficial Academic Record** tab.',
    department: 'Office of the Registrar',
    location: 'Summit Central Hall Suite 104',
    contactEmail: 'registrar@summit.edu',
    tags: ['transcript', 'grades', 'parchment', 'records']
  },
  {
    id: 'faq-financial-aid-status',
    category: 'financial',
    question: 'Why has my financial aid not disbursed yet, and how do I prevent late fees?',
    shortAnswer: 'Financial aid begins disbursing 10 days before classes start. Outstanding verification documents or incomplete Master Promissory Notes are the most common causes of delay.',
    detailedAnswer: 'Common reasons for disbursement delays include:\n- **Unresolved To-Do Items**: Log in to `finaid.summit.edu` and check the **Action Required** checklist.\n- **Loan Requirements**: First-time borrowers must complete Entrance Counseling and sign the MPN at studentaid.gov.\n- **Enrollment Threshold**: Most scholarships and Pell grants require at least 12 enrolled credits (full-time status).\n\nIf your aid is pending verification, submit an **Emergency Tuition Hold Request** at the Financial Aid office (Alder Hall 210) so you will not incur late billing penalties.',
    department: 'Student Financial Aid',
    location: 'Alder Hall Room 210',
    contactEmail: 'financialaid@summit.edu',
    actionUrl: 'https://finaid.summit.edu',
    actionLabel: 'Check Financial Aid To-Do List',
    tags: ['financial aid', 'disbursement', 'tuition', 'scholarships', 'FAFSA']
  },
  {
    id: 'faq-emergency-fund',
    category: 'financial',
    question: 'Is there emergency financial assistance for students facing unexpected hardship?',
    shortAnswer: 'Yes, the Eagle Emergency Relief Grant provides up to $1,500 for students facing sudden medical emergencies, housing insecurity, or unexpected expenses.',
    detailedAnswer: 'The **Eagle Emergency Grant Fund** is managed jointly by Financial Aid and Student Affairs. It provides one-time, non-repayable grants between $250 and $1,500 for enrolled undergraduate and graduate students encountering emergencies (e.g. car breakdown needed for commute, sudden medical bill, unexpected loss of housing). Applications are reviewed within 48 business hours. You can apply confidentially through the Dean of Students portal or visit Alder Hall Room 210.',
    department: 'Student Financial Aid & Dean of Students',
    location: 'Alder Hall Room 210',
    contactEmail: 'emergencyaid@summit.edu',
    tags: ['emergency grant', 'hardship', 'rent assistance', 'money help']
  },
  {
    id: 'faq-room-change',
    category: 'housing',
    question: 'How do I request a room swap or report a roommate conflict?',
    shortAnswer: 'Room swap requests open on the third Monday of each semester via the ResLife Housing Portal. For roommate conflicts, your first step is reaching out to your resident assistant (RA).',
    detailedAnswer: 'Here is the step-by-step room change procedure:\n1. **Talk with your RA**: Your Resident Assistant is trained in conflict mediation and can help facilitate an updated Roommate Agreement.\n2. **Open Swap Window**: The official Room Change Request period opens in Week 3 on `reslife.summit.edu/portal`.\n3. **Direct Mutual Swap**: If you and another student want to swap rooms mutually, both students submit a Mutual Swap form for immediate approval.\n4. **Emergency Relocation**: In cases involving harassment or safety concerns, immediately contact the ResLife Hall Coordinator in Ponderosa Commons Lobby.',
    department: 'Housing & Residence Life',
    location: 'Ponderosa Commons Lobby Office',
    contactEmail: 'housing@summit.edu',
    actionUrl: 'https://reslife.summit.edu/portal',
    actionLabel: 'Go to ResLife Portal',
    tags: ['dorm', 'roommate', 'housing', 'swap', 'RA']
  },
  {
    id: 'faq-dorm-maintenance',
    category: 'housing',
    question: 'How do I report broken heating, plumbing, or lock problems in my dorm room?',
    shortAnswer: 'Submit a maintenance ticket via the Summit WorkOrder portal. For emergencies like flooding, gas smells, or lockouts, call the 24/7 ResLife Duty Desk at (555) 019-2910.',
    detailedAnswer: 'Non-emergency maintenance (burnt-out lighting, squeaky doors, slow drains, AC adjustments) can be submitted on `facilities.summit.edu/workorders`. Technicians usually respond within 24–48 hours.\n\n**EMERGENCIES**: If you experience active water leaks, zero heat during winter freezing temperatures, or broken exterior door locks, call the 24/7 ResLife Duty Line at (555) 019-2910 immediately. Do not submit a web ticket for emergency situations.',
    department: 'Campus Facilities & Housing',
    location: 'Facilities Operations Building',
    contactEmail: 'facilities@summit.edu',
    tags: ['maintenance', 'repair', 'heating', 'plumbing', 'lockout']
  },
  {
    id: 'faq-dining-plans',
    category: 'dining',
    question: 'Where can I spend my EagleBucks and meal swipes, and can I change my meal plan?',
    shortAnswer: 'Meal swipes work at Crestview Commons and Union Pavilion. EagleBucks can be used at all campus eateries, convenience marts, Starbucks, and selected off-campus partners.',
    detailedAnswer: 'Summit Dining offers 3 core meal plans (Unlimited, 14-Meal/Week, and Block 100). \n- **Meal Swipes**: Reset every Sunday morning at 3:00 AM (for weekly plans) and can be used at buffet dining commons.\n- **EagleBucks**: Tax-free declining balance dollars that roll over from Fall to Spring semester. Accepted at the Alder Union food court, campus cafes, vending machines, and local partner restaurants on Summit Ave.\n- **Changing Plans**: You can upgrade or downgrade your meal plan until Friday of Week 2 via `dining.summit.edu/manage`.',
    department: 'Summit Campus Dining',
    location: 'Crestview Dining Commons',
    contactEmail: 'dining@summit.edu',
    tags: ['meal plan', 'eaglebucks', 'food', 'cafeteria', 'dining hours']
  },
  {
    id: 'faq-mental-health-caps',
    category: 'health',
    question: 'How do I book a confidential counseling or therapy appointment at CAPS?',
    shortAnswer: 'CAPS offers 12 free individual counseling sessions per academic year. Call (555) 019-2277 or walk into Wellness Pavilion Suite 200 for a triage assessment.',
    detailedAnswer: 'Counseling & Psychological Services (CAPS) provides confidential, non-judgmental mental health care for all currently registered students.\n- **Initial Intake**: Walk-in triage hours are Monday through Friday, 9:00 AM – 3:30 PM at the Health & Wellness Pavilion Suite 200.\n- **Services**: 1-on-1 counseling, group therapy (anxiety support, LGBTQ+ circle, grief group), and medication management with board-certified psychiatrists.\n- **Cost**: The first 12 individual sessions per academic year are 100% free (covered by student wellness fees).\n- **24/7 Crisis Assistance**: Call the after-hours crisis helpline anytime at (555) 019-SAFE or text HOME to 741741.',
    department: 'Student Health & Wellness (CAPS)',
    location: 'Health & Wellness Pavilion Suite 200',
    contactEmail: 'healthcenter@summit.edu',
    actionUrl: 'https://health.summit.edu/caps',
    actionLabel: 'Book CAPS Initial Consultation',
    tags: ['therapy', 'counseling', 'mental health', 'anxiety', 'stress', 'CAPS']
  },
  {
    id: 'faq-study-rooms',
    category: 'academic',
    question: 'How do I reserve a group study room in the library?',
    shortAnswer: 'Reserve online up to 7 days in advance at library.summit.edu/rooms. Rooms accommodate 2–8 students and include digital displays and whiteboards.',
    detailedAnswer: 'Pioneer Memorial Library has 32 reservable study rooms spread across the 2nd and 3rd floors.\n- Students can reserve up to **3 hours per day** and **up to 7 days in advance** using their Summit email address.\n- Each room is equipped with an HDMI 55" display screen, rolling dry-erase whiteboards, and power outlets.\n- Check in at the 1st Floor Circulation Desk or scan the QR code outside the room door within 15 minutes of your booking start time to confirm your reservation.',
    department: 'Pioneer Memorial Library',
    location: 'Pioneer Memorial Library',
    contactEmail: 'library@summit.edu',
    actionUrl: 'https://library.summit.edu/rooms',
    actionLabel: 'Reserve Study Room Online',
    tags: ['library', 'study room', 'whiteboard', 'quiet study']
  },
  {
    id: 'faq-wifi-eduroam',
    category: 'tech',
    question: 'How do I connect my laptop and phone to the secure campus Wi-Fi (Eduroam)?',
    shortAnswer: 'Select the "eduroam" network, enter your full Summit email address (username@summit.edu) and password, and accept the security certificate.',
    detailedAnswer: 'To connect to the university’s high-speed wireless network:\n1. Open your Wi-Fi settings and choose **eduroam**.\n2. **Username**: Enter your complete email address including domain (e.g., `jdoe24@summit.edu`), not just your username.\n3. **Password**: Enter your Summit single-sign-on password.\n4. If prompted on macOS/iOS or Android to trust the certificate, verify the issuer is `radius.summit.edu` and tap **Trust/Accept**.\n- For gaming consoles, smart TVs, or smart speakers, connect to **Summit-IoT** and register your device MAC address at `helpdesk.summit.edu/devices`.',
    department: 'IT Service Desk',
    location: 'Pioneer Library Room 118',
    contactEmail: 'helpdesk@summit.edu',
    tags: ['wifi', 'eduroam', 'internet', 'network', 'password']
  },
  {
    id: 'faq-free-software',
    category: 'tech',
    question: 'What free software is provided to enrolled students?',
    shortAnswer: 'Summit students receive free access to Microsoft Office 365, Adobe Creative Cloud, MATLAB, Mathematica, Zoom Pro, and 100GB of Google Drive cloud storage.',
    detailedAnswer: 'All active undergraduate and graduate students can download professional software packages at zero cost:\n- **Microsoft 365** (Word, Excel, PowerPoint, OneNote): Install on up to 5 personal devices via `portal.office.com` with your college credentials.\n- **Adobe Creative Cloud** (Photoshop, Illustrator, Premiere Pro, InDesign): Request an enterprise student license via `software.summit.edu`.\n- **STEM Tools**: MATLAB, SolidWorks, and SPSS are pre-licensed for personal computers through the IT software repository.\n- Visit IT Help Desk in Pioneer Library Room 118 for hands-on installation support.',
    department: 'IT Service Desk',
    location: 'Pioneer Library Room 118',
    contactEmail: 'helpdesk@summit.edu',
    tags: ['software', 'office 365', 'adobe', 'matlab', 'free tools']
  },
  {
    id: 'faq-clubs-joining',
    category: 'activities',
    question: 'How do I join student clubs or start a brand new club on campus?',
    shortAnswer: 'Browse all 140+ clubs on EngageSummit (engage.summit.edu). To start a new club, you need 5 founding students, a faculty advisor, and a simple constitution.',
    detailedAnswer: 'Getting involved at Summit is easy:\n- **Joining existing clubs**: Head to `engage.summit.edu`, sign in with your student ID, search by interest (e.g. Robotics, Debate, Pre-Med, Hiking, Gaming, Film, Cultural Orgs), and click **Join Group** to be added to their Discord/GroupMe and roster.\n- **Starting a new organization**: Applications open every September and February with the Office of Student Activities (Alder Union 312). Requirements: 5 active student members, a faculty/staff advisor, and an approved constitution. New clubs receive $500 in starter university seed funding!',
    department: 'Office of Student Activities',
    location: 'Alder Student Union Suite 312',
    contactEmail: 'activities@summit.edu',
    actionUrl: 'https://engage.summit.edu',
    actionLabel: 'Explore Clubs on EngageSummit',
    tags: ['clubs', 'student organizations', 'involvement', 'greek life', 'activities']
  },
  {
    id: 'faq-night-shuttle',
    category: 'transit',
    question: 'What is the schedule for the campus shuttle, and is there a safe ride service after dark?',
    shortAnswer: 'The Eagle Loop Shuttle runs every 10–15 minutes between 7:00 AM and 2:30 AM daily. For walking escorts, Campus Police provides SafeWalk 24/7.',
    detailedAnswer: 'Summit offers two dedicated night transit services:\n1. **Eagle Night Shuttle**: Circulates between all campus dorms, Pioneer Library, Falcon Rec Center, Alder Student Union, and off-campus student apartment corridors (Summit Village & University Palms) from 6:00 PM to 2:30 AM every night. Download the **Summit TransLoc** app for real-time GPS tracking.\n2. **SafeWalk Escort Service**: If you ever feel uncomfortable walking alone at night, call Campus Police at `(555) 019-2000` or tap the button in the EagleAlert mobile app. A trained uniform student safety officer or community officer will meet you in under 10 minutes and accompany you anywhere on campus.',
    department: 'Transit & Public Safety',
    location: 'Public Safety Complex',
    contactEmail: 'transit@summit.edu',
    tags: ['shuttle', 'bus', 'safewalk', 'night ride', 'transit', 'safety']
  },
  {
    id: 'faq-parking-freshmen',
    category: 'transit',
    question: 'Can freshmen bring cars to campus, and how much do parking permits cost?',
    shortAnswer: 'Residential freshmen are generally not eligible for on-campus car permits unless they have documented off-campus employment or medical need. Commuters can purchase permits.',
    detailedAnswer: 'Due to space constraints and sustainability goals, residential first-year students are not permitted to park personal vehicles on campus grounds. Exceptions are granted on petition for:\n- Ongoing medical conditions requiring regular off-campus treatments.\n- Off-campus employment with 15+ weekly hours not reachable by public transit.\n- Commuter students (living off-campus) can purchase Semester Commuter Permits for $165/semester or daily park-and-ride passes for $6/day via `parking.summit.edu`.',
    department: 'Parking & Transportation Services',
    location: 'North Campus Parking Structure A',
    contactEmail: 'parking@summit.edu',
    tags: ['parking', 'car', 'permit', 'freshman policy', 'commuter']
  },
  {
    id: 'faq-career-resume',
    category: 'career',
    question: 'How do I get my resume reviewed, and where do I find on-campus student jobs?',
    shortAnswer: 'Drop by Alder Union 220 for 15-minute walk-in resume reviews weekdays from 1:00 PM – 3:30 PM. On-campus student jobs are posted on Handshake.',
    detailedAnswer: 'The Center for Career Exploration offers comprehensive career readiness services:\n- **Walk-in Resume Reviews**: No appointment needed! Monday through Friday from 1:00 PM to 3:30 PM in Alder Student Union Room 220. Bring a printed draft or your laptop.\n- **On-Campus Employment**: All university student jobs (library desks, dining assistants, research lab aids, peer tutors) are posted on Handshake (`careers.summit.edu`). Filter by "On Campus" to see openings.\n- **Mock Interviews**: Book a 45-minute behavioral or technical mock interview with an industry advisor through Handshake.',
    department: 'Center for Career Exploration & Internships',
    location: 'Alder Student Union Suite 220',
    contactEmail: 'careers@summit.edu',
    actionUrl: 'https://careers.summit.edu',
    actionLabel: 'Log in to Handshake',
    tags: ['resume', 'jobs', 'handshake', 'internships', 'career fair']
  },
  {
    id: 'faq-tutoring-writing',
    category: 'academic',
    question: 'Where can I get free tutoring for math, sciences, or paper writing?',
    shortAnswer: 'Free peer tutoring and the Writing & Communication Center are located on the 2nd Floor of Pioneer Library. Both walk-ins and appointments are available.',
    detailedAnswer: 'All registered students have access to free academic support:\n- **The Writing Center** (Pioneer Library 204): Offers 1-on-1 consultations at any stage of the writing process (brainstorming, thesis development, citations, polish) for any discipline.\n- **STEM Peer Learning Labs** (Pioneer Library 210): Drop-in table tutoring for General Chemistry, Organic Chemistry, Calculus I-III, Linear Algebra, and Intro Physics.\n- **Coding Help Room** (Summit Science Hall 302): Open Mon–Thu 4:00 PM – 8:00 PM for Computer Science courses.\n- Book online via `my.summit.edu/tutoring`.',
    department: 'Academic Support & Learning Commons',
    location: 'Pioneer Memorial Library 2nd Floor',
    contactEmail: 'tutoring@summit.edu',
    tags: ['tutoring', 'writing center', 'math', 'chemistry', 'grades']
  },
  {
    id: 'faq-gym-intramural',
    category: 'activities',
    question: 'What are the rules and hours for the student gym, and how do I sign up for intramural sports?',
    shortAnswer: 'Access to the Falcon Rec Center is free with your student ID card. Intramural sports leagues (basketball, soccer, volleyball, dodgeball) register via IMLeagues.com.',
    detailedAnswer: 'The Falcon Recreation Center is open Mon–Fri 6:00 AM – 11:00 PM, and Sat–Sun 8:00 AM – 9:00 PM.\n- **What’s Included**: Weight room, cardio deck, 25-meter indoor pool, indoor track, squash courts, bouldering wall, and daily group fitness classes (Spin, Yoga, Pilates).\n- **Entry**: Simply tap your Summit Student Mobile ID card at the front turnstiles. Towel service and locker rentals are free.\n- **Intramurals**: Leagues run every 5-week block. Form a team with your dorm floor or register as a free agent on `imleagues.com/summit`.',
    department: 'Falcon Recreation & Sports',
    location: 'Falcon Recreation Center',
    contactEmail: 'recsports@summit.edu',
    tags: ['gym', 'fitness', 'intramurals', 'pool', 'sports']
  },
  {
    id: 'faq-lost-found',
    category: 'safety',
    question: 'I lost my student ID card or keys on campus. Where is the central Lost and Found?',
    shortAnswer: 'The university central Lost and Found is located at the Public Safety Center (open 24/7). High-value items like laptops and phones are cataloged immediately.',
    detailedAnswer: 'Summit operates a centralized lost and found protocol:\n- **Main Repository**: Public Safety Center (Corner of Summit Ave & Oak St). Open 24 hours daily. Phone: (555) 019-2000.\n- **Secondary Drop-Offs**: Unattended items found in the library are turned in to Pioneer Library Circulation Desk; items found in Alder Union go to the 1st Floor Information Desk before transfer to Public Safety.\n- **Lost Student ID**: Deactivate your card immediately via `my.summit.edu/idcard` to freeze dining swipes and door access. Replacement cards cost $15 at the Alder Union ID Card Center.',
    department: 'Campus Public Safety & Alder Union',
    location: 'Public Safety Center / Alder Union Room 102',
    contactEmail: 'lostandfound@summit.edu',
    tags: ['lost and found', 'id card', 'keys', 'public safety']
  }
];

export const GROUNDING_SYSTEM_PROMPT = `You are "CampusPulse AI", the official intelligent campus assistant for ${CAMPUS_NAME} (Home of ${CAMPUS_MASCOT}).

Your mission is to provide warm, direct, highly accurate, and actionable answers to college students about all university services, administrative procedures, academic deadlines, financial aid, housing, dining, student activities, campus life, IT support, transit, and health & safety.

CRITICAL INSTRUCTIONS:
1. Tone: Empathetic, supportive, clear, collegiate, and authoritative. Speak like a friendly, knowledgeable senior campus advisor who genuinely cares about student success.
2. Grounding: Rely primarily on the official Summit University services, departments, locations, and procedures provided below. If a question is about general college concepts, answer clearly while rooting it in typical Summit University procedures.
3. Structure your response cleanly:
   - Provide a direct, concise 1-2 sentence answer first.
   - Follow up with bullet points for specific action steps, required forms/portals, or deadlines.
   - Mention the exact relevant department, building/room location, hours, and contact email/phone when applicable so the student knows where to go.
   - Suggest 2-3 logical follow-up questions at the very end in a structured format:
     "Suggested Follow-ups:
     - Question 1
     - Question 2"
4. Formatting: Use clean markdown with bolding for key terms, dates, and locations. Do NOT invent crazy facts or hallucinate non-existent campus departments.
5. Emphasize student well-being: For mental health or crisis questions, always emphasize CAPS confidential services and the 24/7 crisis numbers: (555) 019-SAFE or 988.

CAMPUS DIRECTORY & KNOWLEDGE REFERENCE:
${JSON.stringify(CAMPUS_SERVICES, null, 2)}

PRESET FREQUENTLY ASKED QUESTIONS REFERENCE:
${JSON.stringify(PRESET_FAQS, null, 2)}

UPCOMING CAMPUS ACTIVITIES & EVENTS:
${JSON.stringify(CAMPUS_EVENTS, null, 2)}
`;
