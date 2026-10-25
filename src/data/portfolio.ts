export const profile = {
  name: "Caesar Ferdiana Suwandi",
  shortName: "Caesar",
  role: "Software / AI / Cloud",
  university: "Universitas Diponegoro",
  faculty: "S1 Informatika - Semester 5",
  gpa: "N/A",
  location: "Tegal, Jawa Tengah, Indonesia",
  email: "ferdianacaesar@gmail.com",
  github: "https://github.com/Ferdiana07",
  linkedin: "https://www.linkedin.com/in/caesarferdianasuwandi/",
  instagram: "https://www.instagram.com/caesarf_",
  resume: "/Caesar-Ferdiana-Suwandi-CV.pdf",
  certificateUrl: "https://bit.ly/4emv0WP",
};

export const highlights = [
  { value: "N/A", label: "IPK S1 Informatika UNDIP" },
  { value: "5", label: "Projek Unggulan (Web & AI)" },
  { value: "2", label: "Pengalaman Magang (Diskominfo & BPN)" },
  { value: "25+", label: "Sertifikasi AI, Web & Cyber" },
];

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  filterTag: "all" | "ai" | "fullstack" | "web";
  status: string;
  isDeployed: boolean;
  description: string;
  image: string;
  imageAlt: string;
  logo: string;
  stack: string[];
  source?: string;
  demo?: string;
  features: string[];
}

export const projects: ProjectItem[] = [
  {
    id: "seapedia",
    title: "SEAPEDIA",
    tagline: "Dari pesisir ke pembeli, dalam satu platform.",
    category: "Full-Stack Web",
    filterTag: "fullstack",
    status: "Belum Dideploy",
    isDeployed: false,
    description:
      "Marketplace bahari yang menghubungkan pembeli, penjual, dan pengemudi. Lengkap dengan checkout, simulasi wallet, serta pelacakan pesanan.",
    image: "/images/projects/seapedia.webp",
    imageAlt: "Pratinjau antarmuka marketplace bahari SEAPEDIA",
    logo: "/images/projects/seapedia-logo-white.png",
    stack: ["React 19", "Laravel 12", "PostgreSQL", "Tailwind CSS 4", "Zustand", "Playwright"],
    source: "https://github.com/Ferdiana07/SEAPEDIA",
    features: [
      "Autentikasi multi-role (Sanctum) dengan verifikasi ketat untuk Buyer, Seller, Driver, dan Admin",
      "Katalog bahari publik dengan filter kategori biota, alat tangkap, budidaya, dan kuliner laut",
      "Alur checkout dengan kalkulasi ongkir dinamis, PPN 12%, voucher promo, dan wallet terintegrasi",
      "Sistem penugasan Driver atomik berbasis database transaction serta riwayat order audit",
    ],
  },
  {
    id: "sinauwu",
    title: "SINAUWU",
    tagline: "Materi kuliah jadi lebih gampang dipelajari.",
    category: "AI & EdTech",
    filterTag: "ai",
    status: "Live Demo",
    isDeployed: true,
    description:
      "Unggah PDF, lalu ubah materinya menjadi rangkuman, flashcard, dan kuis latihan dengan bantuan Gemini AI.",
    image: "/images/projects/sinauwu-landing.webp",
    imageAlt: "Landing page platform belajar cerdas SINAUWU",
    logo: "/images/projects/sinauwu-logo.png",
    stack: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Prisma 7", "Gemini API", "Tailwind CSS 4"],
    source: "https://github.com/Ferdiana07/SINAUWU",
    demo: "https://sinauwu.vercel.app",
    features: [
      "Unggah dan parsing PDF otomatis dengan ekstraksi teks cerdas multi-format",
      "Rangkuman pintar instan yang memadatkan materi panjang menjadi poin-poin esensial",
      "Pembuat flashcards interaktif untuk melatih retensi memori secara mandiri",
      "Generator kuis evaluasi pilihan ganda berbasis AI dengan pelacakan skor real-time",
    ],
  },
  {
    id: "docvia",
    title: "DOCVIA",
    tagline: "Cari dokter dan atur jadwal konsultasi.",
    category: "Full-Stack Web",
    filterTag: "fullstack",
    status: "Belum Dideploy",
    isDeployed: false,
    description:
      "Aplikasi pemesanan konsultasi dengan portal pasien, dokter, dan admin. Jadwal, riwayat konsultasi, dan notifikasi terhubung dalam satu alur.",
    image: "/images/projects/docvia.webp",
    imageAlt: "Tampilan direktori dokter dan booking jadwal pada DOCVIA",
    logo: "/images/projects/docvia-logo.png",
    stack: ["MongoDB", "Express.js", "React 19", "Node.js", "Tailwind CSS", "JWT Auth", "Vite"],
    source: "https://github.com/Ferdiana07/DOCVIA",
    features: [
      "Tiga portal peran khusus: Pasien (booking, rekam medis), Dokter (jadwal, resep), Admin (verifikasi dokter)",
      "Pencarian dokter berdasarkan nama, spesialisasi, lokasi klinik, dan ketersediaan hari praktik",
      "Sistem pemesanan slot konsultasi yang otomatis mengabaikan jam yang sudah terisi",
      "Pencatatan diagnosis medis, resume kunjungan, resep obat digital, serta tanggal follow-up pasien",
    ],
  },
  {
    id: "ulasjujur",
    title: "ULASJUJUR",
    tagline: "Saat bintang lima belum tentu berarti puas.",
    category: "AI & Machine Learning",
    filterTag: "ai",
    status: "Belum Dideploy",
    isDeployed: false,
    description:
      "Analisis sentimen ulasan berbahasa Indonesia dengan IndoBERT. Membantu menemukan ulasan yang isi dan rating bintangnya tidak sejalan.",
    image: "/images/projects/ulasjujur-landing.webp",
    imageAlt: "Landing page mesin analitik sentimen UlasJujur",
    logo: "/images/projects/ulasjujur-logo.png",
    stack: ["Python (PyTorch / IndoBERT)", "Golang API", "React 19", "FastAPI", "MySQL", "Recharts", "Docker"],
    source: "https://github.com/Ferdiana07/UlasJujur",
    features: [
      "Fine-tuned model IndoBERT pada dataset publik e-commerce Indonesia (PRDECT-ID) dengan akurasi 94.2%",
      "Deteksi Anomali Mismatch: Mendeteksi ulasan berbintang 5 yang isinya memuat komplain negatif",
      "Arsitektur mikroservis Golang dengan teknik chunking untuk memproses ribuan baris CSV secara asinkron",
      "Visualisasi interaktif: Distribusi sentimen, klaster keluhan operasional (pengiriman, produk, layanan)",
    ],
  },
  {
    id: "himaose2",
    title: "HIMAOSE Web Portal",
    tagline: "Rumah digital Himpunan Mahasiswa Oseanografi UNDIP.",
    category: "Web & Organization",
    filterTag: "web",
    status: "Belum Dideploy",
    isDeployed: false,
    description:
      "Portal profil, kepengurusan, program kerja, dan dokumentasi kegiatan HIMA OSE. Informasi organisasi jadi lebih mudah ditemukan.",
    image: "/images/projects/himaose-landing.webp",
    imageAlt: "Landing page portal web Himpunan Mahasiswa Oseanografi HIMA OSE",
    logo: "/images/projects/himaose-logo.png",
    stack: ["HTML5", "CSS3 / Modern Layout", "JavaScript (ES6+)", "Responsive Design", "Feather Icons"],
    source: "https://github.com/Ferdiana07/HimaOSE2",
    features: [
      "Profil lengkap visi, misi, dan nilai-nilai organisasi HIMA OSE UNDIP",
      "Struktur kepengurusan interaktif (Organogram) Kabinet Resonansi Asa",
      "Katalog program kerja unggulan divisi, agenda mendatang, dan dokumentasi kegiatan",
      "Pusat informasi pendaftaran anggota, saluran aspirasi, serta kontak relasi eksternal",
    ],
  },
];

export const internships = [
  {
    company: "Dinas Komunikasi dan Informatika - Kota Tegal",
    role: "E-Government Intern",
    period: "Januari 2026 - Februari 2026",
    location: "Kota Tegal",
    summary:
      "Membantu pengembangan sistem informasi website untuk kebutuhan kecamatan di Kota Tegal, serta bertugas sebagai operator event Seminar Literasi Digital dan Focus Group Discussion dengan tema 'Penerapan AI di Pemerintahan: Solusi atau Gimmick?'.",
    highlights: [
      "Pengembangan sistem informasi website kecamatan se-Kota Tegal",
      "Operator teknis Seminar Literasi Digital & FGD Implementasi AI",
      "Kolaborasi lintas divisi dalam digitalisasi layanan publik",
    ],
  },
  {
    company: "Badan Pertanahan Nasional - Kabupaten Tegal",
    role: "Data Entry & Validation Intern",
    period: "Juli 2025 - Agustus 2025",
    location: "Kabupaten Tegal",
    summary:
      "Membantu proses validasi data dari dokumen dan surat fisik pertanahan, melakukan entri data ke sistem digital terpadu, serta mendukung percepatan program digitalisasi arsip administrasi pertanahan.",
    highlights: [
      "Validasi dan verifikasi dokumen legalitas fisik ke sistem database",
      "Entri data akurat dan efisien untuk kebutuhan administrasi pertanahan",
      "Mendukung transisi arsip fisik menuju sistem digitalisasi data BPN",
    ],
  },
];

export const organizations = [
  {
    name: "Young on Top - Semarang",
    division: "Divisi Marketing and Communication (Marcomm)",
    role: "Staff Marcomm & Technology",
    period: "Desember 2024 - Desember 2025",
    description:
      "Membantu pembuatan konten, penyusunan strategi promosi event/program organisasi, meningkatkan engagement media sosial, serta terlibat aktif dalam kegiatan sosial seperti kunjungan panti dan green action.",
  },
  {
    name: "Senat Mahasiswa Universitas Diponegoro",
    division: "Badan Kerja Sama Antar Parlemen (BKSAP)",
    role: "Public Relations / Humas",
    period: "Februari 2025 - Desember 2025",
    description:
      "Menjalankan fungsi kehumasan untuk komunikasi dan koordinasi eksternal, menjalin kerja sama antar lembaga internal maupun eksternal kampus, dan mempublikasikan informasi serta agenda BKSAP.",
  },
  {
    name: "UKM Bulutangkis Universitas Diponegoro",
    division: "Divisi Kepelatihan",
    role: "Staff Kepelatihan & Operasional",
    period: "Januari 2025 - Desember 2025",
    description:
      "Mendukung kegiatan pelatihan dan pembinaan atlet anggota UKM, mengoordinasikan jadwal latihan serta kebutuhan teknis lapangan, dan berkontribusi dalam penyelenggaraan turnamen tingkat nasional/universitas.",
  },
];

export const skillCategories = [
  {
    category: "Bahasa Pemrograman",
    skills: ["Python", "JavaScript", "TypeScript", "PHP", "Java", "C", "SQL", "HTML5 & CSS3"],
  },
  {
    category: "Framework & Library",
    skills: ["React 19", "Next.js 16", "Laravel 12", "Node.js", "Express.js", "Tailwind CSS 4", "Vite", "Prisma"],
  },
  {
    category: "AI, Data & Database",
    skills: ["PyTorch", "IndoBERT / HuggingFace", "Google Gemini API", "PostgreSQL", "MongoDB", "MySQL", "SQLite"],
  },
  {
    category: "Tools, DevOps & Design",
    skills: ["Git & GitHub", "Visual Studio Code", "Docker", "Playwright", "Figma", "Canva", "Google Workspace"],
  },
];

export const certificationCategories = [
  {
    title: "Artificial Intelligence",
    count: "12 Sertifikat",
    issuer: "Google, IBM, Cisco, Dicoding",
    badge: "12 Credentials",
    items: [
      "Google AI Professional Certificate (Google)",
      "AI for App Deployment (Google)",
      "AI for App Building (Google)",
      "AI for Data Analysis (Google)",
      "AI for Content Creation (Google)",
      "AI for Writing and Communicating (Google)",
      "AI for Research and Insights (Google)",
      "AI for Brainstorming and Planning (Google)",
      "AI Fundamentals (Google)",
      "Build an AI Agent (IBM)",
      "Dasar AI (Dicoding)",
      "Introduction to Modern AI (Cisco Network Academy)",
    ],
  },
  {
    title: "Full-Stack Development",
    count: "3 Sertifikat",
    issuer: "SmartBridge, Digital Talent Academy, IBM",
    badge: "3 Credentials",
    items: [
      "Fullstack Development MERN Lastmile 2026 (SmartBridge)",
      "Assistant Web Developer (Digital Talent Academy)",
      "IBM Granite Models for Software Development (IBM)",
    ],
  },
  {
    title: "Cyber Security",
    count: "4 Sertifikat",
    issuer: "Google, Cyber Academy, Cisco",
    badge: "4 Credentials",
    items: [
      "Manage Security Risk (Google)",
      "Foundations of Cybersecurity (Google)",
      "Introduction to Information Security Course (Cyber Academy)",
      "Introduction to Cybersecurity (Cisco Network Academy)",
    ],
  },
  {
    title: "Database & Data Management",
    count: "3 Sertifikat",
    issuer: "MongoDB, Oracle",
    badge: "3 Credentials",
    items: [
      "MongoDB CRUD Operations (MongoDB)",
      "MongoDB Basics for Students (MongoDB)",
      "Database Design (Oracle)",
    ],
  },
  {
    title: "Machine Learning, LLM & Python",
    count: "6 Sertifikat",
    issuer: "Dicoding, IBM",
    badge: "6 Credentials",
    items: [
      "Basic Python (Dicoding)",
      "Basic Machine Learning (Dicoding)",
      "Data Visualization (Dicoding)",
      "Introduction to LLM (IBM)",
      "Code Generation and Optimization Using IBM Granite (IBM)",
      "Financial Literacy (Dicoding)",
    ],
  },
];
