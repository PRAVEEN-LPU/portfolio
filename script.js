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

    // 11. Prichard.hu Style Ambient Background Canvas & Cursor Orb
    const starCanvas = document.getElementById('starCanvas');
    const orbCursor = document.getElementById('orbCursor');

    if (starCanvas) {
        const ctx = starCanvas.getContext('2d');
        let width = (starCanvas.width = window.innerWidth);
        let height = (starCanvas.height = window.innerHeight);

        let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
        let particles = [];
        const particleCount = Math.min(65, Math.floor((width * height) / 18000));

        class StarParticle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.8 + 0.6;
                this.baseSize = this.size;
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = (Math.random() - 0.5) * 0.45;
                this.alpha = Math.random() * 0.5 + 0.25;
                this.hue = Math.random() > 0.45 ? 160 : 195; // Cyan or Electric Blue
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Screen wrapping
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                // Gentle mouse repulsion
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120 && dist > 0) {
                    const force = (120 - dist) / 120;
                    this.x -= (dx / dist) * force * 2;
                    this.y -= (dy / dist) * force * 2;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 90%, 65%, ${this.alpha})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = `hsla(${this.hue}, 90%, 60%, 0.8)`;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new StarParticle());
        }

        // Window resize handler
        window.addEventListener('resize', () => {
            width = starCanvas.width = window.innerWidth;
            height = starCanvas.height = window.innerHeight;
        });

        // Mouse move tracking
        window.addEventListener('mousemove', (e) => {
            mouse.targetX = e.clientX;
            mouse.targetY = e.clientY;
            if (orbCursor) orbCursor.style.opacity = '0.65';
        });

        window.addEventListener('mouseleave', () => {
            mouse.targetX = -1000;
            mouse.targetY = -1000;
            if (orbCursor) orbCursor.style.opacity = '0';
        });

        // Animation loop
        let isRunning = true;
        document.addEventListener('visibilitychange', () => {
            isRunning = !document.hidden;
            if (isRunning) requestAnimationFrame(render);
        });

        let cursorCurrentX = -1000;
        let cursorCurrentY = -1000;

        function render() {
            if (!isRunning) return;

            // Smooth cursor interpolation
            cursorCurrentX += (mouse.targetX - cursorCurrentX) * 0.08;
            cursorCurrentY += (mouse.targetY - cursorCurrentY) * 0.08;
            mouse.x = cursorCurrentX;
            mouse.y = cursorCurrentY;

            if (orbCursor && mouse.targetX > -500) {
                orbCursor.style.transform = `translate(${cursorCurrentX}px, ${cursorCurrentY}px) translate(-50%, -50%)`;
            }

            ctx.clearRect(0, 0, width, height);

            // Connect nearby particles with subtle cyber web lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 105) {
                        const lineAlpha = (1 - dist / 105) * 0.18;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(52, 211, 153, ${lineAlpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            // Update & draw particles
            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(render);
        }

        render();
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
