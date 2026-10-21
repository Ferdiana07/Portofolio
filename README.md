# Caesar Ferdiana Suwandi — Portfolio

Portofolio Software / AI / Cloud dengan pengalaman fullscreen, komposisi kanvas CFS, warna mineral, dan permukaan kanvas bertekstur.

## Menjalankan

Node.js 20.9 atau lebih baru:

```bash
npm ci
npm run dev
```

Buka http://localhost:3000. Untuk versi produksi lokal:

```bash
npm run lint
npm run test:motion
npm run build
npm run start
```

## Konten dan aset

- Profil, CV, lima projek, skill, pengalaman, sertifikasi: `src/data/portfolio.ts`.
- Warna tujuh bab: `src/data/journey.ts`.
- Screenshot projek: `public/images/projects`; semua gambar memakai `object-fit: contain`.
- Komposisi pembuka: `src/components/CanvasStudy.tsx`, tiga lembar kanvas CFS berbasis CSS; tombol “Susun ulang” mengubah susunannya.
- Maskot tidak lagi dirender. Referensi asli di `public/caesar-layers` tetap disimpan sebagai arsip pengguna.
- Tekstur: `public/images/canvas-weave.svg`, tile geometri serat yang statis. Tidak memakai filter noise atau canvas runtime.
- Sistem visual: `DESIGN.md` dan `.impeccable/design.json`.
- Stylesheet: `globals.css` untuk komponen dasar, `immersive.css` untuk panggung/katalogue, `mascot-story.css` untuk hero, dan `chapter-craft.css` untuk relief, kontrol progres, serta interaksi tiap bab. `canvas-study.css` mengatur komposisi CFS, penggaris progres, dan petunjuk musik.

Aset robot dan maskot dari eksperimen sebelumnya masih disimpan, tetapi tidak dipakai atau dimuat oleh hero terkini.

## Navigasi dan motion

Homepage memiliki tujuh bab: Kenalan, About me, Profil, Projek, Jejak, Belajar, dan Ngobrol. Desktop dan HP memakai panggung fullscreen. Navigasi utama ada di header, dengan Profil sebelum Projek. Bagian bawah menampilkan penggaris 61 takik vertikal dengan isi mengikuti progres, nama bab saat ini, tombol sebelumnya/berikutnya, dan jeda gerakan latar—tanpa menu bagian yang berulang.

Scroll browser tetap native. Framer Motion `useScroll` dan `useSpring` menggerakkan tiga variasi mask: iris lingkaran, sapuan samping, dan bukaan lengkung dari bawah. Dua lapisan tetap opak; tidak ada perubahan susunan berdasarkan arah scroll. Jarak dan jeda baca diatur di `src/lib/journey-timing.ts`: 3,2 viewport per bab, 42% pertama sebagai jeda, lalu transisi bertahap. Pose di `src/lib/scene-transition.ts` hanya bergantung pada posisi sehingga scroll naik membalik pose scroll turun. Residual floating-point di batas bab di-snap; bab di luar pasangan transisi disembunyikan. `npm run test:motion` memeriksa 1.201 posisi, kesetaraan arah, batas, dan variasi. Hanya bab terdekat yang interaktif; bab lain memakai `inert` dan `aria-hidden`.

Komposisi CFS mengganti seluruh maskot. Tiga lembar bergeser perlahan dengan transform CSS pada bab pembuka; tombol interaksinya tetap diam agar mudah diklik. Pada About me, huruf merespons mouse secara terbatas dan tag minat diketik sekali saat masuk. Tidak ada loop JavaScript saat diam.

Relief dan linework latar adalah geometri SVG/CSS. Satu relief bergeser perlahan pada bab aktif; kontur projek bergerak dalam siklus 26 detik. Maksimal enam serat kecil bergerak melalui transform CSS pada bab aktif (tiga di HP). Tombol Gerak, tab tersembunyi, dan reduced motion menghentikan gerakan latar. Profil dan Jejak memakai relief neumorphism lebih tegas. Pada Belajar, pengantar serta tombol sertifikat tetap diam sementara daftar sertifikat memiliki scroll sendiri; mode linear tetap memakai alur dokumen biasa.

Intro CFS sekitar 4,1 detik, bisa dilewati, sekali per sesi. Anchor langsung, /projects, dan reduced motion melewati intro. Tanpa JavaScript/reduced motion, isi tetap tersedia sebagai halaman linear.

Preview projek memakai perspektif CSS, tombol, keyboard kiri/kanan, dan swipe horizontal. Tidak ada autoplay. “Lihat semua projek” membuka `/projects` di tab baru. Catalogue memuat filter, detail, logo TechStack, dan status deployment yang sebenarnya.

Tidak ada tambahan WebGL, video background, atau library scroll. Tekstur dan bayangan tidak dianimasikan. Kartu catalogue memakai glass blur 7px yang terbatas pada kartu; layar kecil memakai transparansi tanpa blur. Performa tetap bergantung pada perangkat; ukur kembali saat menambah aset atau efek.

## Musik

Saat mati, tombol bertuliskan “Nyalakan musik” dengan petunjuk lofi; petunjuk hilang setelah diputar. Tombol Musik memutar `public/music/3 Minute Timer with Relaxing Lofi Music.mp3` dari folder pengguna. Audio off saat awal, tanpa source/request sampai pengunjung menekan putar. Volume 18%, loop, dapat dihentikan kapan saja, dan otomatis pause ketika tab tersembunyi. File diputar melalui HTMLAudio, tanpa library audio tambahan.

## Form email

FormSubmit mengirim pesan ke **ferdianacaesar@gmail.com**. Pemilik email harus menyelesaikan aktivasi FormSubmit agar pesan produksi dapat diterima. Status sukses hanya muncul setelah layanan mengonfirmasi keberhasilan.

Tes lokal menggunakan respons simulasi untuk kondisi sukses dan gagal; tidak mengirim email sungguhan.

## Referensi dan tools desain

Observasi referensi dan adaptasinya dicatat di `.impeccable/motion-research.md`:

- https://nesilnoble.com/
- https://kelvin.8b.com/
- https://onlines.com.ar/
- https://dribbble.com/search/neumorphism-web

Referensi menjadi panduan ritme dan interaksi; kode serta aset situs-situs tersebut tidak disalin ke portofolio.

Remotion skills, Framer External Agent, TasteSkill, dan REA dipasang sebagai alat pengembangan di lingkungan Codex, bukan dependency runtime website. Animasi website tetap memakai Motion dan CSS yang sudah tersedia.

Logo Playwright dan Canva di `public/icons` berasal dari https://github.com/devicons/devicon. Lisensi ada di `public/icons/LICENSE-devicon.txt`.
