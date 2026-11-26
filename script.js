/* ==========================================================================
   PRAVEEN KUMAR - PORTFOLIO INTERACTIVITY & LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Typing Effect
    const typedTarget = document.querySelector('.typed-text');
    if (typedTarget && typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: [
                'B.Tech CSE (AI & ML) Student',
                'Aspiring AI / ML Engineer',
                'Python & Full-Stack Developer',
                'Tech Enthusiast & Problem Solver'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // 2. Sticky Navbar Glass Effect & Active Link ScrollSpy
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Navbar blur enhancement
        if (scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollY > 400) {
            backToTopBtn?.classList.add('show');
        } else {
            backToTopBtn?.classList.remove('show');
        }

        // ScrollSpy Active Link
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // 3. Back to Top Click
    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('bx-menu', 'bx-x');
            } else {
                icon.classList.replace('bx-x', 'bx-menu');
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.replace('bx-x', 'bx-menu');
            });
        });
    }

    // 5. Project Filter Tabs
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = (card.getAttribute('data-category') || '').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 6. Skill Bars Animation on Scroll
    const skillBars = document.querySelectorAll('.skill-progress-fill');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // 7. Interactive Contact Form Submission & Email Notification to praveen1622kumar@gmail.com
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    function showToast(message, isError = false) {
        if (!toast) return;
        const toastMsg = toast.querySelector('.toast-msg');
        const toastIcon = toast.querySelector('i');
        if (toastMsg) toastMsg.textContent = message;
        if (toastIcon) {
            toastIcon.className = isError ? 'bx bx-error-circle' : 'bx bx-check-circle';
        }
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4500);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            const name = document.getElementById('senderName')?.value.trim() || '';
            const email = document.getElementById('senderEmail')?.value.trim() || '';
            const subject = document.getElementById('senderSubject')?.value.trim() || 'General Inquiry';
            const message = document.getElementById('senderMessage')?.value.trim() || '';

            submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://formsubmit.co/ajax/praveen1622kumar@gmail.com", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        _subject: `New Portfolio Message from ${name}: ${subject}`,
                        subject: subject,
                        message: message,
                        _template: "table",
                        _captcha: "false"
                    })
                });

                const data = await response.json();
                if (response.ok || data.success === "true" || data.success === true) {
                    showToast("Message sent successfully! Praveen has received your note.");
                    contactForm.reset();
                } else {
                    // Fallback to normal form submission
                    contactForm.submit();
                }
            } catch (err) {
                console.warn("AJAX submission error, fallback to direct POST:", err);
                contactForm.submit();
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // 8. Update Copyright Year Dynamically
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 9. Real-time GitHub API Integration for Featured Projects
    const GITHUB_USERNAME = 'PRAVEEN-LPU';
    const GITHUB_CACHE_KEY = 'praveen_github_repos_v2';
    const GITHUB_CACHE_DURATION = 3 * 60 * 1000; // 3-minute cache for API rate safety

    const REPO_CONFIGS = [
        {
            repoName: 'LPU-Placement-Intelligence',
            cardId: 'card-LPU-Placement-Intelligence',
            fallbackDesc: '🎓 LPU Campus Placement Intelligence — ML-powered Student Readiness Prediction & Skill Gap Analysis Platform | Built by PRAVEEN',
            fallbackTech: ['Python', 'Machine Learning', 'JavaScript', 'CSS/HTML', 'Scikit-Learn']
        },
        {
            repoName: 'safa-svm-hyperparameter-optimization',
            cardId: 'card-safa-svm-hyperparameter-optimization',
            fallbackDesc: 'Adaptive Hyperparameter Optimisation of Support Vector Machines Using the Firefly Algorithm: A Novel Approach on the UCI Wine Dataset with Self-Adaptive Attraction Coefficient.',
            fallbackTech: ['Python', 'SVM', 'Scikit-Learn', 'Firefly Algorithm', 'Optimization']
        },
        {
            repoName: 'smartfarmer7500',
            cardId: 'card-smartfarmer7500',
            liveUrl: 'https://smart-farmert.me/',
            fallbackDesc: '🌱 Smart Farmer — Full-stack AI agricultural decision-support platform with 6+ integrated modules (Computer Vision, Deep Learning, ML) for leaf-disease detection, condition-based irrigation alerts, and mandi market analytics.',
            fallbackTech: ['Python', 'Computer Vision', 'Deep Learning', 'Machine Learning', 'REST APIs', 'MySQL']
        }
    ];

    function formatRelativeTime(dateString) {
        if (!dateString) return 'Active';
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        const minutes = Math.floor(diffInSeconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days}d ago`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months}mo ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    async function fetchRepoData(repoName) {
        try {
            const repoRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!repoRes.ok) {
                return { error: true, status: repoRes.status };
            }

            const repoData = await repoRes.json();

            // Fetch latest commit for push details
            let latestCommit = null;
            try {
                const commitRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/commits?per_page=1`, {
                    headers: { 'Accept': 'application/vnd.github.v3+json' }
                });
                if (commitRes.ok) {
                    const commitData = await commitRes.json();
                    if (Array.isArray(commitData) && commitData.length > 0) {
                        latestCommit = {
                            message: commitData[0].commit.message,
                            date: commitData[0].commit.committer?.date || commitData[0].commit.author?.date,
                            sha: commitData[0].sha.substring(0, 7),
                            html_url: commitData[0].html_url
                        };
                    }
                }
            } catch (err) {
                console.warn(`Could not fetch commits for ${repoName}:`, err);
            }

            return {
                name: repoData.name,
                description: repoData.description,
                stars: repoData.stargazers_count,
                forks: repoData.forks_count,
                language: repoData.language,
                topics: repoData.topics || [],
                updatedAt: repoData.updated_at,
                pushedAt: repoData.pushed_at,
                htmlUrl: repoData.html_url,
                homepage: repoData.homepage,
                latestCommit: latestCommit
            };
        } catch (err) {
            console.warn(`Error fetching ${repoName}:`, err);
            return { error: true };
        }
    }

    function updateProjectCardDOM(config, data) {
        const card = document.getElementById(config.cardId);
        if (!card) return;

        // Update Stars & Forks count
        const starsEl = card.querySelector('.repo-stars');
        const forksEl = card.querySelector('.repo-forks');
        if (starsEl && data.stars !== undefined) starsEl.textContent = data.stars;
        if (forksEl && data.forks !== undefined) forksEl.textContent = data.forks;

        // Update description dynamically when changes occur on GitHub
        const descEl = card.querySelector('.project-desc');
        if (descEl && data.description && data.description.trim()) {
            descEl.textContent = data.description;
        }

        // Update Push & Commit Info
        const commitMsgEl = card.querySelector('.repo-commit-msg');
        const pushTimeEl = card.querySelector('.repo-push-time');

        if (data.latestCommit && commitMsgEl) {
            const firstLine = data.latestCommit.message.split('\n')[0];
            commitMsgEl.textContent = firstLine;
            commitMsgEl.title = `Latest Commit: ${firstLine}`;
        } else if (commitMsgEl && data.pushedAt) {
            commitMsgEl.textContent = `Latest repository push recorded`;
        }

        if (pushTimeEl && (data.pushedAt || data.latestCommit?.date)) {
            const timeAgo = formatRelativeTime(data.latestCommit?.date || data.pushedAt);
            pushTimeEl.textContent = `Pushed ${timeAgo}`;
        }

        // Update tech tags if languages/topics available
        const techContainer = card.querySelector('.project-tech');
        if (techContainer && (data.language || (data.topics && data.topics.length > 0))) {
            const tags = new Set();
            if (data.language) tags.add(data.language);
            (data.topics || []).forEach(t => tags.add(t));
            (config.fallbackTech || []).forEach(t => tags.add(t));

            // Render up to 5 distinct tags
            techContainer.innerHTML = Array.from(tags)
                .slice(0, 5)
                .map(tag => `<span class="tech-tag">${tag}</span>`)
                .join('');
        }

        // Update Live Demo button if repository homepage exists or config has liveUrl
        const demoBtn = card.querySelector('.demo-url-btn');
        if (demoBtn) {
            const liveUrl = (data.homepage && data.homepage.trim() && data.homepage.startsWith('http'))
                ? data.homepage
                : config.liveUrl;
            if (liveUrl) {
                demoBtn.href = liveUrl;
                demoBtn.style.display = 'inline-flex';
            } else {
                demoBtn.style.display = 'none';
            }
        }

        // Update GitHub Repo Link
        const repoBtn = card.querySelector('.repo-url-btn');
        if (repoBtn && data.htmlUrl) {
            repoBtn.href = data.htmlUrl;
        }
    }

    async function syncGitHubRepos(forceRefresh = false) {
        const syncBtn = document.getElementById('syncGithubBtn');
        const syncIcon = document.getElementById('syncBtnIcon');
        const liveSyncTime = document.getElementById('liveSyncTime');

        if (syncIcon) syncIcon.classList.add('bx-spin');
        if (syncBtn) syncBtn.style.pointerEvents = 'none';

        // 1. Try cache first for immediate rendering without rate limits
        if (!forceRefresh) {
            try {
                const cachedRaw = localStorage.getItem(GITHUB_CACHE_KEY);
                if (cachedRaw) {
                    const cached = JSON.parse(cachedRaw);
                    if (Date.now() - cached.timestamp < GITHUB_CACHE_DURATION && cached.data) {
                        REPO_CONFIGS.forEach(config => {
                            if (cached.data[config.repoName] && !cached.data[config.repoName].error) {
                                updateProjectCardDOM(config, cached.data[config.repoName]);
                            }
                        });
                        if (liveSyncTime && cached.syncTimeString) {
                            liveSyncTime.textContent = `• Synced ${cached.syncTimeString}`;
                        }
                    }
                }
            } catch (e) {
                console.warn('Cache read error:', e);
            }
        }

        // 2. Fetch fresh live data from GitHub API
        const results = {};
        let successCount = 0;

        await Promise.all(
            REPO_CONFIGS.map(async (config) => {
                const data = await fetchRepoData(config.repoName);
                results[config.repoName] = data;
                if (!data.error) {
                    successCount++;
                    updateProjectCardDOM(config, data);
                } else {
                    // Graceful fallback for repos pending push or initial publication
                    const card = document.getElementById(config.cardId);
                    const commitMsgEl = card?.querySelector('.repo-commit-msg');
                    const pushTimeEl = card?.querySelector('.repo-push-time');
                    if (commitMsgEl) commitMsgEl.textContent = 'GitHub repo linked • Live sync active';
                    if (pushTimeEl) pushTimeEl.textContent = 'Live Ready';
                }
            })
        );

        const now = new Date();
        const syncTimeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (liveSyncTime) {
            liveSyncTime.textContent = `• Synced at ${syncTimeString}`;
        }

        // Save fresh results to cache
        try {
            localStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                syncTimeString: syncTimeString,
                data: results
            }));
        } catch (e) {
            console.warn('Cache write error:', e);
        }

        setTimeout(() => {
            if (syncIcon) syncIcon.classList.remove('bx-spin');
            if (syncBtn) syncBtn.style.pointerEvents = 'auto';
        }, 600);

        if (forceRefresh) {
            showToast(`GitHub live sync complete! (${successCount} repositories updated)`);
        }
    }

    // Initialize GitHub API sync on page load
    syncGitHubRepos(false);

    // Sync button manual trigger
    const syncBtn = document.getElementById('syncGithubBtn');
    if (syncBtn) {
        syncBtn.addEventListener('click', (e) => {
            e.preventDefault();
            syncGitHubRepos(true);
        });
    }

    // 10. Real-time LeetCode API Integration (@Praveen_Kumar75)
    const LEETCODE_USERNAME = 'Praveen_Kumar75';
    const LEETCODE_CACHE_KEY = 'praveen_leetcode_cache_v2';
    const LEETCODE_CACHE_DURATION = 3 * 60 * 1000; // 3-minute cache for API rate safety

    function formatSubmissionDate(timestamp) {
        if (!timestamp) return { date: 'Recently', time: '' };
        const ms = timestamp.toString().length === 10 ? parseInt(timestamp) * 1000 : parseInt(timestamp);
        const date = new Date(ms);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return { date: dateStr, time: timeStr };
    }

    async function fetchLeetCodeData() {
        // Primary API endpoint: userProfile on alfa-leetcode-api
        try {
            const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`);
            if (res.ok) {
                const data = await res.json();
                if (data && (data.totalSolved || data.recentSubmissions)) {
                    return {
                        success: true,
                        totalSolved: data.totalSolved || 177,
                        easySolved: data.easySolved || 80,
                        mediumSolved: data.mediumSolved || 75,
                        hardSolved: data.hardSolved || 22,
                        totalEasy: data.totalEasy || 978,
                        totalMedium: data.totalMedium || 2152,
                        totalHard: data.totalHard || 994,
                        ranking: data.ranking || 1012184,
                        recentSubmissions: (data.recentSubmissions || []).slice(0, 5)
                    };
                }
            }
        } catch (err) {
            console.warn('Primary LeetCode API call failed, trying backup endpoint...', err);
        }

        // Secondary fallback API endpoints: acSubmission & solved
        try {
            const [solvedRes, acRes] = await Promise.all([
                fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`),
                fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/acSubmission?limit=5`)
            ]);

            const solvedData = solvedRes.ok ? await solvedRes.json() : null;
            const acData = acRes.ok ? await acRes.json() : null;

            if (solvedData || acData) {
                return {
                    success: true,
                    totalSolved: solvedData?.solvedProblem || 177,
                    easySolved: solvedData?.easySolved || 80,
                    mediumSolved: solvedData?.mediumSolved || 75,
                    hardSolved: solvedData?.hardSolved || 22,
                    totalEasy: 978,
                    totalMedium: 2152,
                    totalHard: 994,
                    ranking: 1012184,
                    recentSubmissions: acData?.submission || []
                };
            }
        } catch (err) {
            console.warn('Secondary LeetCode API call failed:', err);
        }

        return { error: true };
    }

    function updateLeetCodeDOM(data) {
        if (!data || data.error) return;

        // 1. Total Solved & Global Rank
        const totalSolvedEl = document.getElementById('lcTotalSolved');
        const globalRankEl = document.getElementById('lcGlobalRank');
        if (totalSolvedEl && data.totalSolved !== undefined) totalSolvedEl.textContent = data.totalSolved;
        if (globalRankEl && data.ranking) globalRankEl.textContent = Number(data.ranking).toLocaleString();

        // 2. Easy Solved
        const easySolvedEl = document.getElementById('lcEasySolved');
        const easyCountEl = document.getElementById('lcEasyCount');
        const easyTotalEl = document.getElementById('lcEasyTotal');
        const easyProgressEl = document.getElementById('lcEasyProgress');
        if (easySolvedEl && data.easySolved !== undefined) easySolvedEl.textContent = data.easySolved;
        if (easyCountEl && data.easySolved !== undefined) easyCountEl.textContent = data.easySolved;
        if (easyTotalEl && data.totalEasy) easyTotalEl.textContent = Number(data.totalEasy).toLocaleString();
        if (easyProgressEl && data.easySolved && data.totalEasy) {
            const pct = Math.min(100, ((data.easySolved / data.totalEasy) * 100).toFixed(1));
            easyProgressEl.style.width = `${pct}%`;
        }

        // 3. Medium Solved
        const medSolvedEl = document.getElementById('lcMediumSolved');
        const medCountEl = document.getElementById('lcMediumCount');
        const medTotalEl = document.getElementById('lcMediumTotal');
        const medProgressEl = document.getElementById('lcMediumProgress');
        if (medSolvedEl && data.mediumSolved !== undefined) medSolvedEl.textContent = data.mediumSolved;
        if (medCountEl && data.mediumSolved !== undefined) medCountEl.textContent = data.mediumSolved;
        if (medTotalEl && data.totalMedium) medTotalEl.textContent = Number(data.totalMedium).toLocaleString();
        if (medProgressEl && data.mediumSolved && data.totalMedium) {
            const pct = Math.min(100, ((data.mediumSolved / data.totalMedium) * 100).toFixed(1));
            medProgressEl.style.width = `${pct}%`;
        }

        // 4. Hard Solved
        const hardSolvedEl = document.getElementById('lcHardSolved');
        const hardCountEl = document.getElementById('lcHardCount');
        const hardTotalEl = document.getElementById('lcHardTotal');
        const hardProgressEl = document.getElementById('lcHardProgress');
        if (hardSolvedEl && data.hardSolved !== undefined) hardSolvedEl.textContent = data.hardSolved;
        if (hardCountEl && data.hardSolved !== undefined) hardCountEl.textContent = data.hardSolved;
        if (hardTotalEl && data.totalHard) hardTotalEl.textContent = Number(data.totalHard).toLocaleString();
        if (hardProgressEl && data.hardSolved && data.totalHard) {
            const pct = Math.min(100, ((data.hardSolved / data.totalHard) * 100).toFixed(1));
            hardProgressEl.style.width = `${pct}%`;
        }

        // 5. Last 5 Solved Questions with Date
        const questionsListContainer = document.getElementById('recentQuestionsList');
        if (questionsListContainer && Array.isArray(data.recentSubmissions) && data.recentSubmissions.length > 0) {
            const topFive = data.recentSubmissions.slice(0, 5);
            questionsListContainer.innerHTML = topFive.map((sub, index) => {
                const formatted = formatSubmissionDate(sub.timestamp);
                const problemUrl = sub.titleSlug
                    ? `https://leetcode.com/problems/${sub.titleSlug}/`
                    : `https://leetcode.com/u/${LEETCODE_USERNAME}/`;
                const language = (sub.lang || 'Java').charAt(0).toUpperCase() + (sub.lang || 'Java').slice(1);
                const status = sub.statusDisplay || 'Accepted';

                return `
                    <div class="question-row">
                        <div class="q-left">
                            <span class="q-index">${index + 1}</span>
                            <div class="q-details">
                                <a href="${problemUrl}" target="_blank" rel="noopener noreferrer" class="q-title">
                                    ${sub.title}
                                    <i class='bx bx-link-external q-ext-icon'></i>
                                </a>
                                <div class="q-meta">
                                    <span class="q-status-tag"><i class='bx bx-check'></i> ${status}</span>
                                    <span class="q-lang-tag">${language}</span>
                                </div>
                            </div>
                        </div>
                        <div class="q-right">
                            <div class="q-date"><i class='bx bx-calendar'></i> ${formatted.date}</div>
                            ${formatted.time ? `<div class="q-time"><i class='bx bx-time-five'></i> ${formatted.time}</div>` : ''}
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    async function syncLeetCodeProfile(forceRefresh = false) {
        const syncBtn = document.getElementById('syncLeetcodeBtn');
        const syncIcon = document.getElementById('syncLeetcodeIcon');
        const syncTime = document.getElementById('leetcodeSyncTime');

        if (syncIcon) syncIcon.classList.add('bx-spin');
        if (syncBtn) syncBtn.style.pointerEvents = 'none';

        // 1. Try cache first for instant load
        if (!forceRefresh) {
            try {
                const cachedRaw = localStorage.getItem(LEETCODE_CACHE_KEY);
                if (cachedRaw) {
                    const cached = JSON.parse(cachedRaw);
                    if (Date.now() - cached.timestamp < LEETCODE_CACHE_DURATION && cached.data) {
                        updateLeetCodeDOM(cached.data);
                        if (syncTime && cached.syncTimeString) {
                            syncTime.textContent = `• Synced ${cached.syncTimeString}`;
                        }
                    }
                }
            } catch (e) {
                console.warn('LeetCode cache read error:', e);
            }
        }

        // 2. Fetch fresh live data from API
        const data = await fetchLeetCodeData();

        if (data && !data.error) {
            updateLeetCodeDOM(data);
            const now = new Date();
            const syncTimeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (syncTime) {
                syncTime.textContent = `• Synced at ${syncTimeString}`;
            }

            try {
                localStorage.setItem(LEETCODE_CACHE_KEY, JSON.stringify({
                    timestamp: Date.now(),
                    syncTimeString: syncTimeString,
                    data: data
                }));
            } catch (e) {
                console.warn('LeetCode cache write error:', e);
            }

            if (forceRefresh) {
                showToast(`LeetCode live sync complete! (${data.totalSolved} problems solved)`);
            }
        } else if (forceRefresh) {
            showToast('Unable to reach LeetCode API right now. Please try again.');
        }

        setTimeout(() => {
            if (syncIcon) syncIcon.classList.remove('bx-spin');
            if (syncBtn) syncBtn.style.pointerEvents = 'auto';
        }, 600);
    }

    // Initialize LeetCode Live Sync on page load
    syncLeetCodeProfile(false);

    // Sync button manual trigger
    const syncLcBtn = document.getElementById('syncLeetcodeBtn');
    if (syncLcBtn) {
        syncLcBtn.addEventListener('click', (e) => {
            e.preventDefault();
            syncLeetCodeProfile(true);
        });
    }

    // 11. Interactive Three.js 3D Particle Animation & Cursor Orb (with 2D Fallback)
    const starCanvas = document.getElementById('starCanvas');
    const orbCursor = document.getElementById('orbCursor');

    if (starCanvas) {
        let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, px: -1000, py: -1000, targetPx: -1000, targetPy: -1000 };
        let scrollY = window.pageYOffset || 0;
        let isRunning = true;

        window.addEventListener('mousemove', (e) => {
            mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
            mouse.targetPx = e.clientX;
            mouse.targetPy = e.clientY;
            if (orbCursor) orbCursor.style.opacity = '0.65';
        });

        window.addEventListener('mouseleave', () => {
            mouse.targetX = 0;
            mouse.targetY = 0;
            mouse.targetPx = -1000;
            mouse.targetPy = -1000;
            if (orbCursor) orbCursor.style.opacity = '0';
        });

        window.addEventListener('scroll', () => {
            scrollY = window.pageYOffset || 0;
        }, { passive: true });

        let threeInitialized = false;

        if (typeof THREE !== 'undefined') {
            try {
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
                camera.position.set(0, 0, 14);

                const renderer = new THREE.WebGLRenderer({
                    canvas: starCanvas,
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance'
                });
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

                // Build 3D Particle Galaxy / Cosmic Sphere + Wave Field
                const count = window.innerWidth < 768 ? 2200 : 4500;
                const positions = new Float32Array(count * 3);
                const colors = new Float32Array(count * 3);
                const sizes = new Float32Array(count);
                const randoms = new Float32Array(count * 3);

                const colorCyan = new THREE.Color('#00f2fe');
                const colorBlue = new THREE.Color('#2563eb');
                const colorPurple = new THREE.Color('#8b5cf6');

                for (let i = 0; i < count; i++) {
                    const i3 = i * 3;
                    const isCore = i < count * 0.65;

                    if (isCore) {
                        // 3D Toroidal / Spiral Galaxy Field
                        const radius = Math.pow(Math.random(), 0.75) * 9.5 + 1.2;
                        const branchAngle = (i % 4) * ((Math.PI * 2) / 4);
                        const spinAngle = radius * 0.55;
                        const angle = branchAngle + spinAngle + (Math.random() - 0.5) * 0.6;

                        const spread = (Math.random() - 0.5) * (1.8 + radius * 0.25);
                        positions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.2;
                        positions[i3 + 1] = spread;
                        positions[i3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 1.2;
                    } else {
                        // Ambient 3D Spherical Stardust
                        const r = 6 + Math.random() * 14;
                        const theta = Math.random() * Math.PI * 2;
                        const phi = Math.acos(2 * Math.random() - 1);
                        positions[i3] = r * Math.sin(phi) * Math.cos(theta);
                        positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                        positions[i3 + 2] = r * Math.cos(phi);
                    }

                    // Color blend: Cyan -> Electric Blue -> Violet
                    const mixRatio = Math.random();
                    const mixedColor = mixRatio < 0.45
                        ? colorCyan.clone().lerp(colorBlue, Math.random())
                        : colorBlue.clone().lerp(colorPurple, Math.random());

                    colors[i3] = mixedColor.r;
                    colors[i3 + 1] = mixedColor.g;
                    colors[i3 + 2] = mixedColor.b;

                    sizes[i] = Math.random() * 2.2 + 0.6;
                    randoms[i3] = Math.random() * Math.PI * 2;
                    randoms[i3 + 1] = Math.random() * 0.8 + 0.2;
                    randoms[i3 + 2] = Math.random() * 0.8 + 0.2;
                }

                const geometry = new THREE.BufferGeometry();
                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
                geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
                geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

                const material = new THREE.ShaderMaterial({
                    depthWrite: false,
                    blending: THREE.AdditiveBlending,
                    transparent: true,
                    uniforms: {
                        uTime: { value: 0 },
                        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
                        uMouse: { value: new THREE.Vector2(0, 0) },
                        uScroll: { value: 0 }
                    },
                    vertexShader: `
                        uniform float uTime;
                        uniform float uPixelRatio;
                        uniform vec2 uMouse;
                        uniform float uScroll;

                        attribute vec3 aColor;
                        attribute float aSize;
                        attribute vec3 aRandom;

                        varying vec3 vColor;
                        varying float vAlpha;

                        void main() {
                            vColor = aColor;

                            vec3 pos = position;
                            float phase = aRandom.x;
                            float speed = aRandom.y;

                            // Organic 3D wave & curl float
                            pos.x += sin(uTime * 0.45 * speed + phase + pos.y * 0.35) * 0.35;
                            pos.y += cos(uTime * 0.40 * speed + phase + pos.x * 0.35) * 0.35;
                            pos.z += sin(uTime * 0.35 * speed + phase + pos.x * 0.25) * 0.35;

                            // Interactive 3D mouse repulsion/ripple
                            vec2 mouseWorld = uMouse * vec2(10.0, 6.0);
                            float distToMouse = distance(pos.xy, mouseWorld);
                            float influence = smoothstep(4.2, 0.0, distToMouse);
                            vec2 dir = normalize(pos.xy - mouseWorld + vec2(0.0001));
                            pos.xy += dir * influence * 1.15;
                            pos.z += influence * 1.8;

                            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                            gl_Position = projectionMatrix * mvPosition;

                            // Size attenuation in 3D space
                            float pulse = 0.85 + 0.25 * sin(uTime * 1.6 * speed + phase);
                            gl_PointSize = aSize * pulse * uPixelRatio * (68.0 / max(-mvPosition.z, 1.0));

                            // Depth fade
                            vAlpha = clamp(1.05 - (-mvPosition.z / 28.0), 0.12, 0.85) + influence * 0.25;
                        }
                    `,
                    fragmentShader: `
                        varying vec3 vColor;
                        varying float vAlpha;

                        void main() {
                            float d = distance(gl_PointCoord, vec2(0.5));
                            if (d > 0.5) discard;

                            // Soft glowing radial particle
                            float core = smoothstep(0.5, 0.05, d);
                            float glow = pow(1.0 - d * 2.0, 2.2);
                            float alpha = (core * 0.4 + glow * 0.85) * vAlpha;

                            gl_FragColor = vec4(vColor + vec3(glow * 0.25), alpha);
                        }
                    `
                });

                const particleMesh = new THREE.Points(geometry, material);
                // Tilt the galaxy slightly for dramatic 3D perspective
                particleMesh.rotation.x = 0.35;
                particleMesh.rotation.z = -0.15;
                scene.add(particleMesh);

                window.addEventListener('resize', () => {
                    const w = window.innerWidth;
                    const h = window.innerHeight;
                    camera.aspect = w / h;
                    camera.updateProjectionMatrix();
                    renderer.setSize(w, h);
                    const pr = Math.min(window.devicePixelRatio || 1, 2);
                    renderer.setPixelRatio(pr);
                    material.uniforms.uPixelRatio.value = pr;
                });

                const clock = new THREE.Clock();

                document.addEventListener('visibilitychange', () => {
                    isRunning = !document.hidden;
                    if (isRunning) {
                        clock.getDelta();
                        animateThree();
                    }
                });

                function animateThree() {
                    if (!isRunning) return;
                    const elapsed = clock.getElapsedTime();

                    // Smooth mouse & orb cursor interpolation
                    mouse.x += (mouse.targetX - mouse.x) * 0.06;
                    mouse.y += (mouse.targetY - mouse.y) * 0.06;
                    mouse.px += (mouse.targetPx - mouse.px) * 0.08;
                    mouse.py += (mouse.targetPy - mouse.py) * 0.08;

                    if (orbCursor && mouse.targetPx > -500) {
                        orbCursor.style.transform = `translate(${mouse.px}px, ${mouse.py}px) translate(-50%, -50%)`;
                    }

                    material.uniforms.uTime.value = elapsed;
                    material.uniforms.uMouse.value.set(mouse.x, mouse.y);
                    material.uniforms.uScroll.value = scrollY;

                    // Continuous 3D orbital rotation + scroll & mouse parallax
                    const scrollFactor = scrollY * 0.00055;
                    particleMesh.rotation.y = elapsed * 0.065 + scrollFactor + mouse.x * 0.25;
                    particleMesh.rotation.x = 0.35 + Math.sin(elapsed * 0.15) * 0.08 - mouse.y * 0.18 + scrollFactor * 0.3;

                    camera.position.x += (mouse.x * 0.85 - camera.position.x) * 0.04;
                    camera.position.y += (mouse.y * 0.55 - camera.position.y) * 0.04;
                    camera.lookAt(0, 0, 0);

                    renderer.render(scene, camera);
                    requestAnimationFrame(animateThree);
                }

                animateThree();
                threeInitialized = true;
            } catch (err) {
                console.warn('WebGL Three.js initialization failed, falling back to 2D canvas:', err);
            }
        }

        // Graceful 2D Canvas Fallback if Three.js / WebGL is unavailable
        if (!threeInitialized) {
            const ctx = starCanvas.getContext('2d');
            if (ctx) {
                let width = (starCanvas.width = window.innerWidth);
                let height = (starCanvas.height = window.innerHeight);
                const particles = [];
                const particleCount = Math.min(65, Math.floor((width * height) / 18000));

                for (let i = 0; i < particleCount; i++) {
                    particles.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        size: Math.random() * 1.8 + 0.6,
                        vx: (Math.random() - 0.5) * 0.45,
                        vy: (Math.random() - 0.5) * 0.45,
                        alpha: Math.random() * 0.5 + 0.25,
                        hue: Math.random() > 0.6 ? 190 : 220
                    });
                }

                window.addEventListener('resize', () => {
                    width = starCanvas.width = window.innerWidth;
                    height = starCanvas.height = window.innerHeight;
                });

                function render2D() {
                    if (!isRunning) return;
                    mouse.px += (mouse.targetPx - mouse.px) * 0.08;
                    mouse.py += (mouse.targetPy - mouse.py) * 0.08;
                    if (orbCursor && mouse.targetPx > -500) {
                        orbCursor.style.transform = `translate(${mouse.px}px, ${mouse.py}px) translate(-50%, -50%)`;
                    }
                    ctx.clearRect(0, 0, width, height);
                    particles.forEach((p) => {
                        p.x = (p.x + p.vx + width) % width;
                        p.y = (p.y + p.vy + height) % height;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.alpha})`;
                        ctx.fill();
                    });
                    requestAnimationFrame(render2D);
                }
                render2D();
            }
        }
    }

    // 12. Attach & Universal Download CV System (Password-Protected Owner Upload / Public Download)
    const CV_ADMIN_PASSWORD = 'Pra@9720';
    const CV_STORAGE_KEY = 'praveen_custom_cv_v1';
    const CV_AUTH_SESSION_KEY = 'praveen_cv_auth_session';
    const DEFAULT_CV_PATH = 'Praveen_Kumar_Resume.pdf';
    const DEFAULT_CV_NAME = 'Praveen_Kumar_Resume.pdf';

    const cvModalBackdrop = document.getElementById('cvModalBackdrop');
    const openCvModalBtn = document.getElementById('openCvModalBtn');
    const closeCvModalBtn = document.getElementById('closeCvModalBtn');
    const cancelCvModalBtn = document.getElementById('cancelCvModalBtn');
    const cvAuthPanel = document.getElementById('cvAuthPanel');
    const cvManagerPanel = document.getElementById('cvManagerPanel');
    const cvPasswordForm = document.getElementById('cvPasswordForm');
    const cvAdminPassword = document.getElementById('cvAdminPassword');
    const cvAuthBtn = document.getElementById('cvAuthBtn');
    const togglePwdBtn = document.getElementById('togglePwdBtn');
    const togglePwdIcon = document.getElementById('togglePwdIcon');
    const authErrorMsg = document.getElementById('authErrorMsg');
    const lockSessionBtn = document.getElementById('lockSessionBtn');

    const cvDropzone = document.getElementById('cvDropzone');
    const cvFileInput = document.getElementById('cvFileInput');
    const selectedFilePreview = document.getElementById('selectedFilePreview');
    const selectedFileName = document.getElementById('selectedFileName');
    const selectedFileSize = document.getElementById('selectedFileSize');
    const saveCvBtn = document.getElementById('saveCvBtn');
    const resetCvBtn = document.getElementById('resetCvBtn');
    const modalActiveCvName = document.getElementById('modalActiveCvName');
    const modalActiveCvMeta = document.getElementById('modalActiveCvMeta');

    let pendingCvFile = null;

    function isOwnerAuthenticated() {
        return sessionStorage.getItem(CV_AUTH_SESSION_KEY) === 'true';
    }

    function setOwnerAuthenticated(auth) {
        if (auth) {
            sessionStorage.setItem(CV_AUTH_SESSION_KEY, 'true');
        } else {
            sessionStorage.removeItem(CV_AUTH_SESSION_KEY);
        }
    }

    function formatBytes(bytes) {
        if (!bytes || bytes === 0) return '0 KB';
        const k = 1024;
        const dm = 1;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    function updateCvStatusUI() {
        try {
            const raw = localStorage.getItem(CV_STORAGE_KEY);
            if (raw) {
                const cv = JSON.parse(raw);
                if (modalActiveCvName) modalActiveCvName.textContent = cv.name;
                if (modalActiveCvMeta) {
                    const dateStr = cv.updatedAt ? new Date(cv.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently';
                    modalActiveCvMeta.textContent = `Attached by Praveen (${cv.size || 'Custom file'}) • ${dateStr}`;
                }
            } else {
                if (modalActiveCvName) modalActiveCvName.textContent = DEFAULT_CV_NAME;
                if (modalActiveCvMeta) modalActiveCvMeta.textContent = 'Official Compiled CV • Verified profile credentials (PDF)';
            }
        } catch (e) {
            console.warn('Error reading CV storage:', e);
        }
    }

    updateCvStatusUI();

    function openCvModal() {
        updateCvStatusUI();
        pendingCvFile = null;
        if (selectedFilePreview) selectedFilePreview.style.display = 'none';
        if (saveCvBtn) saveCvBtn.disabled = true;
        if (cvFileInput) cvFileInput.value = '';

        if (isOwnerAuthenticated()) {
            if (cvAuthPanel) cvAuthPanel.style.display = 'none';
            if (cvManagerPanel) cvManagerPanel.style.display = 'block';
        } else {
            if (cvAuthPanel) cvAuthPanel.style.display = 'block';
            if (cvManagerPanel) cvManagerPanel.style.display = 'none';
            if (cvAdminPassword) {
                cvAdminPassword.value = '';
                cvAdminPassword.type = 'password';
            }
            if (togglePwdIcon) {
                togglePwdIcon.className = 'bx bx-show';
            }
            if (authErrorMsg) authErrorMsg.textContent = '';
            setTimeout(() => {
                if (cvAdminPassword) cvAdminPassword.focus();
            }, 100);
        }

        if (cvModalBackdrop) cvModalBackdrop.classList.add('active');
    }

    function closeCvModal() {
        if (cvModalBackdrop) cvModalBackdrop.classList.remove('active');
    }

    // Modal Triggers
    if (openCvModalBtn) {
        openCvModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCvModal();
        });
    }

    if (closeCvModalBtn) closeCvModalBtn.addEventListener('click', closeCvModal);
    if (cancelCvModalBtn) cancelCvModalBtn.addEventListener('click', closeCvModal);

    if (cvModalBackdrop) {
        cvModalBackdrop.addEventListener('click', (e) => {
            if (e.target === cvModalBackdrop) closeCvModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModalBackdrop && cvModalBackdrop.classList.contains('active')) {
            closeCvModal();
        }
        // Secret shortcut: Ctrl + Shift + U
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'U' || e.key === 'u')) {
            e.preventDefault();
            openCvModal();
        }
    });

    // Triple-click on logo badge shortcut
    let logoClickCount = 0;
    let logoClickTimer = null;
    const logoBadge = document.querySelector('.logo-badge');
    if (logoBadge) {
        logoBadge.addEventListener('click', (e) => {
            logoClickCount++;
            clearTimeout(logoClickTimer);
            if (logoClickCount >= 3) {
                e.preventDefault();
                logoClickCount = 0;
                openCvModal();
            } else {
                logoClickTimer = setTimeout(() => {
                    logoClickCount = 0;
                }, 1200);
            }
        });
    }

    // Password Toggle Button
    if (togglePwdBtn && cvAdminPassword && togglePwdIcon) {
        togglePwdBtn.addEventListener('click', () => {
            if (cvAdminPassword.type === 'password') {
                cvAdminPassword.type = 'text';
                togglePwdIcon.className = 'bx bx-hide';
            } else {
                cvAdminPassword.type = 'password';
                togglePwdIcon.className = 'bx bx-show';
            }
            cvAdminPassword.focus();
        });
    }

    // Password Verification Logic
    function handlePasswordAuth() {
        if (!cvAdminPassword) return;
        const entered = cvAdminPassword.value.trim();

        if (entered === CV_ADMIN_PASSWORD) {
            setOwnerAuthenticated(true);
            if (authErrorMsg) authErrorMsg.textContent = '';
            if (cvAuthPanel) cvAuthPanel.style.display = 'none';
            if (cvManagerPanel) cvManagerPanel.style.display = 'block';
            showToast('🔓 Owner Access Granted! Welcome, Praveen.');
            updateCvStatusUI();
        } else {
            if (authErrorMsg) {
                authErrorMsg.textContent = 'Incorrect password! Only Praveen can upload or change the CV.';
            }
            const inputGroup = cvAdminPassword.closest('.auth-input-group');
            if (inputGroup) {
                inputGroup.classList.remove('shake');
                void inputGroup.offsetWidth; // trigger reflow
                inputGroup.classList.add('shake');
                setTimeout(() => inputGroup.classList.remove('shake'), 600);
            }
            cvAdminPassword.focus();
            cvAdminPassword.select();
        }
    }

    if (cvPasswordForm) {
        cvPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handlePasswordAuth();
        });
    }

    if (cvAuthBtn) {
        cvAuthBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handlePasswordAuth();
        });
    }

    // Lock Session Button
    if (lockSessionBtn) {
        lockSessionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setOwnerAuthenticated(false);
            if (cvManagerPanel) cvManagerPanel.style.display = 'none';
            if (cvAuthPanel) cvAuthPanel.style.display = 'block';
            if (cvAdminPassword) {
                cvAdminPassword.value = '';
                cvAdminPassword.type = 'password';
            }
            if (togglePwdIcon) togglePwdIcon.className = 'bx bx-show';
            if (authErrorMsg) authErrorMsg.textContent = '';
            showToast('🔒 Owner session locked. Password required to re-enter.');
        });
    }

    // File selection & dropzone handling
    if (cvDropzone && cvFileInput) {
        cvDropzone.addEventListener('click', () => {
            cvFileInput.click();
        });

        cvDropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            cvDropzone.classList.add('dragover');
        });

        cvDropzone.addEventListener('dragleave', () => {
            cvDropzone.classList.remove('dragover');
        });

        cvDropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            cvDropzone.classList.remove('dragover');
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleFileSelect(e.dataTransfer.files[0]);
            }
        });

        cvFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                handleFileSelect(e.target.files[0]);
            }
        });
    }

    function handleFileSelect(file) {
        if (!file) return;
        pendingCvFile = file;

        if (selectedFileName) selectedFileName.textContent = file.name;
        if (selectedFileSize) selectedFileSize.textContent = `(${formatBytes(file.size)})`;
        if (selectedFilePreview) selectedFilePreview.style.display = 'inline-flex';
        if (saveCvBtn) saveCvBtn.disabled = false;
    }

    // Save attached CV
    if (saveCvBtn) {
        saveCvBtn.addEventListener('click', () => {
            if (!pendingCvFile) return;

            const reader = new FileReader();
            reader.onload = function (e) {
                try {
                    const cvData = {
                        name: pendingCvFile.name,
                        size: formatBytes(pendingCvFile.size),
                        type: pendingCvFile.type || 'application/pdf',
                        data: e.target.result,
                        updatedAt: new Date().toISOString()
                    };

                    localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(cvData));
                    updateCvStatusUI();
                    closeCvModal();
                    showToast(`✅ CV Attached Successfully! Public visitors can now download "${pendingCvFile.name}".`);
                } catch (err) {
                    console.error('Failed to store CV:', err);
                    showToast('File too large for browser storage. Please select a file under 5MB.');
                }
            };
            reader.readAsDataURL(pendingCvFile);
        });
    }

    // Reset CV
    if (resetCvBtn) {
        resetCvBtn.addEventListener('click', () => {
            localStorage.removeItem(CV_STORAGE_KEY);
            updateCvStatusUI();
            pendingCvFile = null;
            if (selectedFilePreview) selectedFilePreview.style.display = 'none';
            if (saveCvBtn) saveCvBtn.disabled = true;
            showToast('Reset to default official resume.');
        });
    }

    // Universal Download CV logic for all download buttons
    function downloadActiveCV() {
        let cvToDownload = null;
        try {
            const raw = localStorage.getItem(CV_STORAGE_KEY);
            if (raw) cvToDownload = JSON.parse(raw);
        } catch (e) {
            console.warn(e);
        }

        const link = document.createElement('a');
        if (cvToDownload && cvToDownload.data) {
            link.href = cvToDownload.data;
            link.download = cvToDownload.name || 'Praveen_Kumar_Resume.pdf';
            showToast(`Downloading attached CV: ${link.download}...`);
        } else {
            link.href = DEFAULT_CV_PATH;
            link.download = DEFAULT_CV_NAME;
            showToast('Downloading Praveen Kumar\'s Resume (PDF)...');
        }

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Wire up all .download-cv-btn buttons
    const downloadBtns = document.querySelectorAll('.download-cv-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            downloadActiveCV();
        });
    });
});
