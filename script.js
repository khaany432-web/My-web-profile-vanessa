/**
 * ==========================================================================
 * MODUL INTERAKTIF WEB PROFILE - VANESSA KHAIRUNNISA STEFANY
 * Frontend Developer & Desain Grafis (Web Aplikasi & Sistem Informasi)
 * Fitur:
 *  - Indikator Scroll Progress Bar
 *  - Pemilih Aksen Warna Tema (Indigo, Cyan, Emerald, Violet, Rose, Amber)
 *  - Mode Gelap / Terang (Dark/Light Mode) dengan memory localStorage & tombol 'D'
 *  - Animasi Penghitung Angka Metrik (IntersectionObserver)
 *  - Pencarian Kata Kunci & Filter Keahlian Lintas Konten
 *  - Filter Kategori Proyek & Modal Detail Studi Kasus Sistem Informasi
 *  - Pengubah Tampilan Timeline Pengalaman (Rinci / Ringkas)
 *  - Efek Sentuhan 3D Tilt pada Kartu Metrik & Proyek
 *  - Modal Kontak "Hubungi Saya" dengan Perayaan Efek Confetti
 *  - Modal Bagikan dengan Generator QR Code Canvas
 *  - Tombol Melayang Kembali ke Atas (Back to Top)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. ELEMEN DOM
  // ------------------------------------------------------------------------
  const body = document.body;
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const printBtn = document.getElementById('printBtn');
  const copyEmailChip = document.getElementById('copyEmail');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  // Pencarian & Filter
  const globalSearchInput = document.getElementById('globalSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const filterResultCount = document.getElementById('filterResultCount');
  const skillSearchInput = document.getElementById('skillSearchInput');
  const skillsCountBadge = document.getElementById('skillsCountBadge');

  // Modal
  const contactModal = document.getElementById('contactModal');
  const hireMeBtn = document.getElementById('hireMeBtn');
  const hireStatusBadge = document.getElementById('hireStatusBadge');
  const availabilityBadge = document.getElementById('availabilityBadge');
  const closeContactModal = document.getElementById('closeContactModal');
  const cancelContactModal = document.getElementById('cancelContactModal');
  const contactForm = document.getElementById('contactForm');

  const shareModal = document.getElementById('shareModal');
  const shareCvBtn = document.getElementById('shareCvBtn');
  const closeShareModal = document.getElementById('closeShareModal');
  const copyShareUrlBtn = document.getElementById('copyShareUrlBtn');
  const shareUrlInput = document.getElementById('shareUrlInput');
  const qrCanvas = document.getElementById('qrCanvas');

  const projectModal = document.getElementById('projectModal');
  const closeProjectModal = document.getElementById('closeProjectModal');
  const closeProjectModalFooter = document.getElementById('closeProjectModalFooter');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const projectModalCategory = document.getElementById('projectModalCategory');
  const projectModalBody = document.getElementById('projectModalBody');

  // Kontrol Timeline & Proyek
  const viewDetailedBtn = document.getElementById('viewDetailedBtn');
  const viewCompactBtn = document.getElementById('viewCompactBtn');
  const experienceTimeline = document.getElementById('experienceTimeline');
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  const VANESSA_LINKEDIN = "https://www.linkedin.com/in/vanessa-stefany-884a8641a?utm_source=share_via&utm_content=profile&utm_medium=member_android";
  const VANESSA_EMAIL = "khaany432@gmail.com";

  // ------------------------------------------------------------------------
  // 2. SCROLL PROGRESS & BACK TO TOP
  // ------------------------------------------------------------------------
  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 320) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------------------
  // 3. AKSEN WARNA TEMA
  // ------------------------------------------------------------------------
  const colorSwatches = document.querySelectorAll('.color-swatch');
  const savedAccent = localStorage.getItem('cv_accent') || 'indigo';
  applyAccent(savedAccent);

  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const color = swatch.getAttribute('data-color');
      applyAccent(color);
    });
  });

  function applyAccent(color) {
    body.setAttribute('data-accent', color);
    localStorage.setItem('cv_accent', color);

    colorSwatches.forEach(s => {
      if (s.getAttribute('data-color') === color) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 4. MODE GELAP / TERANG (Dark & Light Mode)
  // ------------------------------------------------------------------------
  const sunIconSVG = `
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  `;

  const moonIconSVG = `
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
  `;

  const savedTheme = localStorage.getItem('cv_theme') || 'dark';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('cv_theme', theme);

    if (theme === 'dark') {
      themeIcon.innerHTML = sunIconSVG;
      if (themeText) themeText.textContent = 'Terang';
      themeToggleBtn.setAttribute('title', 'Ganti ke Mode Terang (Tekan D)');
    } else {
      themeIcon.innerHTML = moonIconSVG;
      if (themeText) themeText.textContent = 'Gelap';
      themeToggleBtn.setAttribute('title', 'Ganti ke Mode Gelap (Tekan D)');
    }
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    showToast(`Mode ${newTheme === 'dark' ? 'Gelap' : 'Terang'} diaktifkan`);
  });

  // Aksi Cetak PDF
  printBtn.addEventListener('click', () => {
    triggerConfetti();
    window.print();
  });

  // ------------------------------------------------------------------------
  // 5. ANIMASI PENGHITUNG ANGKA METRIK
  // ------------------------------------------------------------------------
  const counters = document.querySelectorAll('.animated-counter');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateAllCounters();
      }
    });
  }, { threshold: 0.2 });

  const metricsContainer = document.getElementById('metricsContainer');
  if (metricsContainer) {
    counterObserver.observe(metricsContainer);
  }

  function animateAllCounters() {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
      const duration = 1800; // ms
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const currentVal = target * easeOut;

        counter.textContent = currentVal.toFixed(decimals) + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toFixed(decimals) + suffix;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // ------------------------------------------------------------------------
  // 6. TIMELINE: TAMPILAN RINCI VS RINGKAS
  // ------------------------------------------------------------------------
  if (viewDetailedBtn && viewCompactBtn && experienceTimeline) {
    viewDetailedBtn.addEventListener('click', () => {
      experienceTimeline.classList.remove('compact');
      viewDetailedBtn.classList.add('active');
      viewCompactBtn.classList.remove('active');
      showToast('Tampilan rincian riwayat kerja aktif');
    });

    viewCompactBtn.addEventListener('click', () => {
      experienceTimeline.classList.add('compact');
      viewCompactBtn.classList.add('active');
      viewDetailedBtn.classList.remove('active');
      showToast('Tampilan ringkas aktif');
    });
  }

  // ------------------------------------------------------------------------
  // 7. FILTER TAB KATEGORI PROYEK
  // ------------------------------------------------------------------------
  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 8. PENCARIAN KATA KUNCI & FILTER KORELASI KEAHLIAN
  // ------------------------------------------------------------------------
  const searchableItems = document.querySelectorAll('.searchable-item');
  const allSkillPills = document.querySelectorAll('.skill-pill');
  const filterTags = document.querySelectorAll('.filter-tag');

  function applySearch(query) {
    const q = query.trim().toLowerCase();

    if (!q) {
      clearFilterState();
      return;
    }

    if (clearSearchBtn) clearSearchBtn.style.display = 'block';

    let matchCount = 0;

    searchableItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      const keywords = (item.getAttribute('data-keywords') || '').toLowerCase();
      const isMatch = text.includes(q) || keywords.includes(q);

      if (isMatch) {
        item.classList.remove('is-dimmed');
        item.classList.add('is-matched');
        matchCount++;
      } else {
        item.classList.add('is-dimmed');
        item.classList.remove('is-matched');
      }
    });

    allSkillPills.forEach(pill => {
      const pillText = pill.textContent.toLowerCase();
      const pillFilter = (pill.getAttribute('data-filter') || '').toLowerCase();
      const isMatch = pillText.includes(q) || pillFilter.includes(q);

      if (isMatch) {
        pill.classList.remove('is-dimmed');
        pill.classList.add('is-matched');
      } else {
        pill.classList.add('is-dimmed');
        pill.classList.remove('is-matched');
      }
    });

    if (filterResultCount) {
      filterResultCount.style.display = 'block';
      filterResultCount.textContent = `${matchCount} hasil cocok`;
    }
  }

  function clearFilterState() {
    if (globalSearchInput) globalSearchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';
    if (filterResultCount) filterResultCount.style.display = 'none';

    searchableItems.forEach(item => {
      item.classList.remove('is-dimmed', 'is-matched');
    });

    allSkillPills.forEach(pill => {
      pill.classList.remove('is-dimmed', 'is-matched');
    });
  }

  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', (e) => {
      applySearch(e.target.value);
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      clearFilterState();
      showToast('Pencarian dibersihkan');
    });
  }

  // Klik tag keahlian untuk langsung memfilter
  filterTags.forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.stopPropagation();
      const filterValue = tag.getAttribute('data-filter') || tag.textContent.trim();
      if (globalSearchInput) {
        globalSearchInput.value = filterValue;
        applySearch(filterValue);
        showToast(`Memfilter berdasarkan: "${filterValue}"`);
        globalSearchInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // ------------------------------------------------------------------------
  // 9. PENCARIAN KEAHLIAN DI SIDEBAR
  // ------------------------------------------------------------------------
  if (skillSearchInput) {
    skillSearchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      let visibleCount = 0;

      allSkillPills.forEach(pill => {
        const text = pill.textContent.toLowerCase();
        const filterAttr = (pill.getAttribute('data-filter') || '').toLowerCase();
        if (!val || text.includes(val) || filterAttr.includes(val)) {
          pill.style.display = 'inline-block';
          visibleCount++;
        } else {
          pill.style.display = 'none';
        }
      });

      document.querySelectorAll('.skill-group').forEach(group => {
        const hasVisible = Array.from(group.querySelectorAll('.skill-pill')).some(p => p.style.display !== 'none');
        group.style.display = hasVisible ? 'block' : 'none';
      });

      if (skillsCountBadge) {
        skillsCountBadge.textContent = `${visibleCount} Keahlian`;
      }
    });
  }

  // ------------------------------------------------------------------------
  // 10. EFEK 3D TILT PADA KARTU (Mouse Hover Interaction)
  // ------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // ------------------------------------------------------------------------
  // 11. DATA STUDI KASUS PROYEK (VANESSA KHAIRUNNISA STEFANY)
  // ------------------------------------------------------------------------
  const projectDetails = {
    'sim-data': {
      title: 'Sistem Informasi Manajemen Terpadu (SIM-Data Web App)',
      category: 'Web Aplikasi & Sistem Informasi',
      metrics: [
        { val: '100%', desc: 'Responsivitas Antarmuka' },
        { val: '40%+', desc: 'Efisiensi Input Data' },
        { val: 'Figma to Code', desc: 'Akurasi Desain Pixel-Perfect' }
      ],
      description: 'Pengembangan web aplikasi sistem informasi manajemen dengan arsitektur front-end berbasis React.js dan Tailwind CSS. Menggabungkan prinsip desain grafis yang bersih dengan tata letak dashboard yang intuitif untuk kemudahan pengolahan data dan laporan.',
      architecture: [
        'Menerjemahkan wireframe dan prototype interaktif resolusi tinggi dari Figma menjadi komponen front-end modular yang reusable.',
        'Mengintegrasikan grafik analitik interaktif menggunakan Chart.js dengan RESTful API data real-time.',
        'Penerapan skema palet warna dengan rasio kontras tinggi dan tipografi ergonomis untuk kenyamanan membaca dalam waktu lama.'
      ]
    },
    'portal-layanan': {
      title: 'Portal Layanan & Informasi Publik Interaktif',
      category: 'Frontend & UI/UX Web Design',
      metrics: [
        { val: '100%', desc: 'Standar Aksesibilitas Web' },
        { val: '<1.2s', desc: 'Kecepatan Muat Antarmuka' },
        { val: 'Mobile-First', desc: 'Optimal di Smartphone' }
      ],
      description: 'Situs portal web informasi dengan pendekatan mobile-first yang mengutamakan kemudahan navigasi publik, hierarki visual terarah, dan estetika grafis modern.',
      architecture: [
        'Dibangun dengan arsitektur HTML5 semantik dan CSS3 modern (CSS Grid & Flexbox) tanpa dependensi library yang berat.',
        'Fitur pencarian instan sisi klien (client-side filtering) untuk mempercepat penemuan artikel dan dokumen informasi.',
        'Optimasi kompresi aset gambar grafis WebP & ikon SVG untuk menjamin performa rendering yang sangat cepat.'
      ]
    },
    'design-system': {
      title: 'Koleksi Design System & Panduan Identitas Visual',
      category: 'Desain Grafis & UI/UX Kit',
      metrics: [
        { val: '50+ Komponen', desc: 'Aset UI & Vektor Desain' },
        { val: 'Figma', desc: 'Master Prototype Interaktif' },
        { val: 'Konsisten', desc: 'Standarisasi Lintas Halaman' }
      ],
      description: 'Penyusunan sistem desain visual komprehensif mencakup panduan tipografi, skala jarak (spacing), palet warna fungsional, set ikon grafis vektor kustom, dan komponen UI siap pakai untuk sistem informasi.',
      architecture: [
        'Rancangan token desain di Figma yang selaras dengan utility classes di Tailwind CSS.',
        'Penyusunan panduan branding visual dan logo guidelines untuk mempertahankan konsistensi identitas produk digital.',
        'Pembuatan alur kerja interaktif prototyping untuk pengujian kemudahan penggunaan (usability testing).'
      ]
    },
    'monitoring-app': {
      title: 'Aplikasi Monitoring Data Kegiatan Internal',
      category: 'Web Aplikasi & Manajemen Alur Kerja',
      metrics: [
        { val: 'Real-time', desc: 'Validasi Formulir Cerdas' },
        { val: 'Multi-Role', desc: 'Antarmuka Hak Akses' },
        { val: 'Ekspor Data', desc: 'Laporan PDF & Spreadsheet' }
      ],
      description: 'Web aplikasi pencatatan, pelaporan, dan monitoring alur kerja operasional tim internal yang ramah pengguna dengan formulir dinamis dan filter status.',
      architecture: [
        'Antarmuka front-end interaktif menggunakan Vue.js dengan manajemen state lokal yang cepat.',
        'Penerapan indikator visual status kegiatan (badge warna, progress bar dinamis, dan feedback interaktif).',
        'Validasi formulir real-time dengan pesan error visual yang jelas dan ramah pengguna.'
      ]
    }
  };

  // Buka Modal Proyek
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-modal');
      const data = projectDetails[projId];

      if (!data) return;

      projectModalTitle.textContent = data.title;
      projectModalCategory.textContent = data.category;

      let metricsHTML = '<div class="modal-project-metric-grid">';
      data.metrics.forEach(m => {
        metricsHTML += `
          <div class="modal-metric-card">
            <div class="modal-metric-val">${m.val}</div>
            <div class="modal-metric-desc">${m.desc}</div>
          </div>
        `;
      });
      metricsHTML += '</div>';

      let archHTML = `
        <p>${data.description}</p>
        ${metricsHTML}
        <div class="modal-arch-section">
          <div class="modal-arch-title">Sorotan Implementasi Teknis & Desain:</div>
          <ul class="achievement-list">
            ${data.architecture.map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>
      `;

      projectModalBody.innerHTML = archHTML;
      openModal(projectModal);
    });
  });

  if (closeProjectModal) closeProjectModal.addEventListener('click', () => closeModal(projectModal));
  if (closeProjectModalFooter) closeProjectModalFooter.addEventListener('click', () => closeModal(projectModal));

  // ------------------------------------------------------------------------
  // 12. MODAL HUBUNGI SAYA / KONTAK
  // ------------------------------------------------------------------------
  function openContactModal() {
    openModal(contactModal);
  }

  if (hireMeBtn) hireMeBtn.addEventListener('click', openContactModal);
  if (hireStatusBadge) hireStatusBadge.addEventListener('click', openContactModal);
  if (availabilityBadge) availabilityBadge.addEventListener('click', openContactModal);

  if (closeContactModal) closeContactModal.addEventListener('click', () => closeModal(contactModal));
  if (cancelContactModal) cancelContactModal.addEventListener('click', () => closeModal(contactModal));

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;

      triggerConfetti();
      showToast(`Terima kasih, ${name}! Pesan Anda telah terkirim.`);
      contactForm.reset();

      setTimeout(() => {
        closeModal(contactModal);
      }, 1400);
    });
  }

  // ------------------------------------------------------------------------
  // 13. MODAL BAGIKAN PROFILE & QR CODE
  // ------------------------------------------------------------------------
  if (shareCvBtn) {
    shareCvBtn.addEventListener('click', () => {
      renderQRCode(qrCanvas, VANESSA_LINKEDIN);
      if (shareUrlInput) shareUrlInput.value = VANESSA_LINKEDIN;
      openModal(shareModal);
    });
  }

  if (closeShareModal) closeShareModal.addEventListener('click', () => closeModal(shareModal));

  if (copyShareUrlBtn) {
    copyShareUrlBtn.addEventListener('click', () => {
      const url = shareUrlInput ? shareUrlInput.value : VANESSA_LINKEDIN;
      navigator.clipboard.writeText(url).then(() => {
        showToast('Link profil LinkedIn berhasil disalin!');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 14. UTILITAS MODAL
  // ------------------------------------------------------------------------
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.active').forEach(modal => {
        closeModal(modal);
      });
    }

    if ((e.key === 'd' || e.key === 'D') && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      const currentTheme = body.getAttribute('data-theme');
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }
  });

  // ------------------------------------------------------------------------
  // 15. SALIN EMAIL
  // ------------------------------------------------------------------------
  if (copyEmailChip) {
    copyEmailChip.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(VANESSA_EMAIL).then(() => {
        showToast('Email khaany432@gmail.com berhasil disalin!');
      });
    });
  }

  // Toast Functionality
  let toastTimeout;
  function showToast(message) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // ------------------------------------------------------------------------
  // 16. CANVAS CELEBRATION CONFETTI
  // ------------------------------------------------------------------------
  const confettiCanvas = document.getElementById('confettiCanvas');
  function triggerConfetti() {
    if (!confettiCanvas) return;
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#6366f1', '#06b6d4', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6', '#ffffff'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        r: Math.random() * 6 + 3,
        dx: (Math.random() - 0.5) * 16,
        dy: (Math.random() - 0.7) * 18,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10,
        tiltAngle: 0,
        tiltAngleInc: (Math.random() * 0.07) + 0.05,
        opacity: 1
      });
    }

    let animationFrame;
    function render() {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      let aliveCount = 0;

      particles.forEach(p => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += (Math.cos(p.tiltAngle) + 1 + p.r / 2) / 2 + p.dy * 0.4;
        p.x += p.dx;
        p.dy += 0.35;
        p.dx *= 0.98;
        p.opacity -= 0.012;

        if (p.opacity > 0 && p.y < confettiCanvas.height + 50) {
          aliveCount++;
          ctx.beginPath();
          ctx.lineWidth = p.r;
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = Math.max(p.opacity, 0);
          ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });

      if (aliveCount > 0) {
        animationFrame = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrame);
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    }

    render();
  }

  // ------------------------------------------------------------------------
  // 17. CANVAS QR CODE GENERATOR
  // ------------------------------------------------------------------------
  function renderQRCode(canvas, text) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    const matrixSize = 25;
    const cellSize = (size - 24) / matrixSize;
    const offset = 12;

    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }

    ctx.fillStyle = '#0f172a';

    function drawLocator(row, col) {
      const x = offset + col * cellSize;
      const y = offset + row * cellSize;
      ctx.fillRect(x, y, 7 * cellSize, 7 * cellSize);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize);
    }

    drawLocator(0, 0);
    drawLocator(0, matrixSize - 7);
    drawLocator(matrixSize - 7, 0);

    for (let i = 8; i < matrixSize - 8; i++) {
      if (i % 2 === 0) {
        ctx.fillRect(offset + i * cellSize, offset + 6 * cellSize, cellSize, cellSize);
        ctx.fillRect(offset + 6 * cellSize, offset + i * cellSize, cellSize, cellSize);
      }
    }

    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        if ((r < 8 && c < 8) || (r < 8 && c >= matrixSize - 8) || (r >= matrixSize - 8 && c < 8)) {
          continue;
        }
        const seed = Math.sin((r * matrixSize + c) * 31.415 + hash) * 10000;
        const isBlack = (seed - Math.floor(seed)) > 0.45;
        if (isBlack) {
          ctx.fillRect(offset + c * cellSize, offset + r * cellSize, cellSize, cellSize);
        }
      }
    }
  }
});
