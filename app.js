/**
 * OOP C++ EXAM MASTER - JAVASCRIPT APPLICATION CORE
 * Features:
 *  1. 50 English MCQs Engine (Focus on Ch 5+, Ch 2-4 supporting) with instant/exam mode, chapter/difficulty filters, question navigator.
 *  2. Written Exam & 4 Standard Types Engine (Full Mock Exams 1->5 & Sequential 4-Types Question Bank).
 *  3. Interactive Code Tracing with Diff Check & Step-by-step Trace.
 *  4. In-browser Code Editor with Tab key support & Self-grading Checklist.
 *  5. Design Pattern Architectural Validator with UML Diagrams & C++ Skeletons.
 *  6. 10 Classic Trap Cheatsheet & 90-minute Countdown Timer.
 */

(function () {
  'use strict';

  // =========================================================================
  // STATE MANAGEMENT
  // =========================================================================
  const state = {
    activeMainSection: "mcq", // 'mcq' | 'written'
    theme: localStorage.getItem("oop_theme") || "dark",
    timer: {
      totalSeconds: 90 * 60,
      remainingSeconds: 90 * 60,
      intervalId: null,
      isRunning: false
    },
    // MCQ State
    mcq: {
      activeChapter: "all",
      activeDifficulty: "all",
      searchQuery: "",
      mode: "practice", // 'practice' | 'exam'
      userAnswers: JSON.parse(localStorage.getItem("oop_mcq_answers") || "{}"),
      checkedQuestions: {},
      isSubmitted: false
    },
    // Written State
    written: {
      viewMode: "exam", // 'exam' | 'bank'
      currentExamId: "de1",
      activeExamFilter: "all", // 'all' | 'theory' | 'code_trace' | 'code_writing' | 'design_pattern'
      activeBankType: "theory", // 'theory' | 'code_trace' | 'code_writing' | 'design_pattern'
      mode: "practice", // 'practice' | 'exam'
      userAnswers: JSON.parse(localStorage.getItem("oop_written_answers") || "{}")
    }
  };

  // =========================================================================
  // DOM ELEMENTS
  // =========================================================================
  const el = {
    // Nav Switcher
    btnNavMCQ: document.getElementById("btnNavMCQ"),
    btnNavWritten: document.getElementById("btnNavWritten"),
    mcqSection: document.getElementById("mcqSection"),
    writtenSection: document.getElementById("writtenSection"),

    // Timer & Theme
    timerDisplay: document.getElementById("timerDisplay"),
    timerBtn: document.getElementById("timerBtn"),
    resetTimerBtn: document.getElementById("resetTimerBtn"),
    themeToggleBtn: document.getElementById("themeToggleBtn"),

    // Trap Modal
    trapModal: document.getElementById("trapModal"),
    openTrapBtn: document.getElementById("openTrapBtn"),
    closeTrapBtn: document.getElementById("closeTrapBtn"),
    trapListContainer: document.getElementById("trapListContainer"),
    trapSearchInput: document.getElementById("trapSearchInput"),

    // Summary Modal
    summaryModal: document.getElementById("summaryModal"),
    closeSummaryBtn: document.getElementById("closeSummaryBtn"),
    summaryContent: document.getElementById("summaryContent"),

    // MCQ Elements
    mcqChapterFilters: document.getElementById("mcqChapterFilters"),
    mcqModePracticeBtn: document.getElementById("mcqModePracticeBtn"),
    mcqModeExamBtn: document.getElementById("mcqModeExamBtn"),
    mcqSubmitBtn: document.getElementById("mcqSubmitBtn"),
    mcqResetBtn: document.getElementById("mcqResetBtn"),
    mcqAnsweredBadge: document.getElementById("mcqAnsweredBadge"),
    mcqScoreBadge: document.getElementById("mcqScoreBadge"),
    mcqSearchInput: document.getElementById("mcqSearchInput"),
    mcqCardsContainer: document.getElementById("mcqCardsContainer"),
    mcqGridNavigator: document.getElementById("mcqGridNavigator"),
    sidebarProgressText: document.getElementById("sidebarProgressText"),

    // Written Elements
    writtenModeExamBtn: document.getElementById("writtenModeExamBtn"),
    writtenModeBankBtn: document.getElementById("writtenModeBankBtn"),
    examTabs: document.getElementById("examTabs"),
    bankTypePills: document.getElementById("bankTypePills"),
    modePracticeBtn: document.getElementById("modePracticeBtn"),
    modeExamBtn: document.getElementById("modeExamBtn"),
    submitExamBtn: document.getElementById("submitExamBtn"),
    examTitle: document.getElementById("examTitle"),
    examSubtitle: document.getElementById("examSubtitle"),
    examTimeBadge: document.getElementById("examTimeBadge"),
    totalQuestionsBadge: document.getElementById("totalQuestionsBadge"),
    examTypeFilterBar: document.getElementById("examTypeFilterBar"),
    questionsContainer: document.getElementById("questionsContainer")
  };

  // =========================================================================
  // UTILITY HELPERS
  // =========================================================================
  function escapeHtml(text) {
    if (!text) return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatMarkdown(text) {
    if (!text) return "";
    let html = escapeHtml(text);
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code style="background:rgba(59,130,246,0.15);color:#38bdf8;padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:0.9em;">$1</code>');
    // LaTeX formulas (inline $...$)
    html = html.replace(/\$([^\$]+)\$/g, '<em style="font-family:var(--font-mono);color:#93c5fd;">$1</em>');
    // Newlines to br
    html = html.replace(/\n/g, '<br/>');
    return html;
  }

  function saveMCQAnswers() {
    localStorage.setItem("oop_mcq_answers", JSON.stringify(state.mcq.userAnswers));
  }

  function saveWrittenAnswers() {
    localStorage.setItem("oop_written_answers", JSON.stringify(state.written.userAnswers));
  }

  function getCurrentExam() {
    return ALL_EXAMS.find(e => e.id === state.written.currentExamId) || ALL_EXAMS[0];
  }

  // =========================================================================
  // INITIALIZATION
  // =========================================================================
  function init() {
    // 1. Theme
    document.documentElement.setAttribute("data-theme", state.theme);
    updateThemeIcon();

    // 2. Render MCQ Section
    renderMCQSection();

    // 3. Render Written Section
    renderWrittenTabs();
    renderWrittenSection();

    // 4. Render Cheatsheet
    renderTrapCheatsheet();

    // 5. Global Event Listeners
    setupGlobalEventListeners();

    // Expose helpers on window for inline handlers
    window.filterMCQChapter = function (ch) {
      state.mcq.activeChapter = ch;
      if (el.mcqChapterFilters) {
        el.mcqChapterFilters.querySelectorAll('.filter-chip').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-chapter') === ch);
        });
      }
      renderMCQSection();
    };

    window.scrollMCQQuestion = function (qId) {
      const targetCard = document.getElementById(`mcq_card_${qId}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.style.boxShadow = "0 0 0 2px var(--primary), 0 0 20px rgba(59,130,246,0.3)";
        setTimeout(() => {
          targetCard.style.boxShadow = "";
        }, 1500);
      }
    };
  }

  // =========================================================================
  // THEME & TIMER CONTROLLERS
  // =========================================================================
  function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem("oop_theme", state.theme);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    if (el.themeToggleBtn) {
      el.themeToggleBtn.innerHTML = state.theme === "dark"
        ? "☀️ <span>Sáng</span>"
        : "🌙 <span>Tối</span>";
    }
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function updateTimerDisplay() {
    if (!el.timerDisplay) return;
    el.timerDisplay.textContent = formatTime(state.timer.remainingSeconds);
    const box = el.timerDisplay.closest('.timer-box');
    if (box) {
      if (state.timer.remainingSeconds <= 300) {
        box.className = "timer-box danger";
      } else if (state.timer.remainingSeconds <= 900) {
        box.className = "timer-box warning";
      } else {
        box.className = "timer-box";
      }
    }
  }

  function toggleTimer() {
    if (state.timer.isRunning) {
      clearInterval(state.timer.intervalId);
      state.timer.isRunning = false;
      el.timerBtn.innerHTML = "▶ Bắt đầu";
    } else {
      state.timer.isRunning = true;
      el.timerBtn.innerHTML = "⏸ Tạm dừng";
      state.timer.intervalId = setInterval(() => {
        if (state.timer.remainingSeconds > 0) {
          state.timer.remainingSeconds--;
          updateTimerDisplay();
        } else {
          clearInterval(state.timer.intervalId);
          state.timer.isRunning = false;
          alert("⏰ Hết thời gian làm bài!");
        }
      }, 1000);
    }
  }

  function resetTimer() {
    clearInterval(state.timer.intervalId);
    state.timer.isRunning = false;
    state.timer.remainingSeconds = state.timer.totalSeconds;
    el.timerBtn.innerHTML = "▶ Bắt đầu";
    updateTimerDisplay();
  }

  // =========================================================================
  // SECTION 1: 50 ENGLISH MCQs MODULE
  // =========================================================================
  function renderMCQSection() {
    const questions = filterMCQQuestions();
    renderMCQCards(questions);
    renderMCQGridNavigator();
    updateMCQStats();
  }

  function filterMCQQuestions() {
    return MCQ_ENGLISH_50.filter(q => {
      // Chapter filter
      if (state.mcq.activeChapter !== "all" && q.chapter !== state.mcq.activeChapter) {
        return false;
      }
      // Difficulty filter
      if (state.mcq.activeDifficulty !== "all" && q.difficulty !== state.mcq.activeDifficulty) {
        return false;
      }
      // Search query
      if (state.mcq.searchQuery.trim() !== "") {
        const query = state.mcq.searchQuery.toLowerCase();
        const matchQ = q.question.toLowerCase().includes(query);
        const matchCode = q.code && q.code.toLowerCase().includes(query);
        const matchTags = q.tags && q.tags.some(t => t.toLowerCase().includes(query));
        const matchExplanation = q.explanation && q.explanation.toLowerCase().includes(query);
        if (!matchQ && !matchCode && !matchTags && !matchExplanation) return false;
      }
      return true;
    });
  }

  function renderMCQCards(questions) {
    if (!el.mcqCardsContainer) return;

    if (questions.length === 0) {
      el.mcqCardsContainer.innerHTML = `
        <div style="text-align:center; padding:50px 20px; background:var(--bg-card); border-radius:var(--radius-lg); border:1px solid var(--border-color); color:var(--text-secondary);">
          <p style="font-size:18px; font-weight:600; margin-bottom:8px;">🔍 Không tìm thấy câu hỏi nào phù hợp với bộ lọc.</p>
          <p style="font-size:13px; color:var(--text-muted); margin-bottom:16px;">Thử chọn lại tất cả chương hoặc độ khó.</p>
          <button class="btn btn-primary btn-sm" onclick="window.filterMCQChapter('all')">Xem tất cả 50 câu</button>
        </div>
      `;
      return;
    }

    el.mcqCardsContainer.innerHTML = questions.map(q => {
      const savedAnswer = state.mcq.userAnswers[q.id];
      const isChecked = state.mcq.checkedQuestions[q.id] || state.mcq.isSubmitted;
      const isCorrect = savedAnswer !== undefined && savedAnswer === q.correctIndex;
      const letters = ['A', 'B', 'C', 'D'];

      // Options HTML
      const optionsHtml = q.options.map((optText, optIdx) => {
        let itemClass = "mcq-option-item";
        const isSelected = savedAnswer === optIdx;

        if (isSelected) itemClass += " selected";

        // If in practice mode checked OR submitted in exam mode
        if (isChecked) {
          if (optIdx === q.correctIndex) {
            itemClass += " is-correct";
          } else if (isSelected && optIdx !== q.correctIndex) {
            itemClass += " is-wrong";
          }
        }

        // Clean option text by removing leading "A. ", "B. ", etc. if present
        let cleanText = optText.replace(/^[A-D]\.\s*/, '');

        return `
          <div class="${itemClass}" data-qid="${q.id}" data-opt-idx="${optIdx}">
            <div class="mcq-letter">${letters[optIdx]}</div>
            <div style="flex:1; line-height:1.5;">${formatMarkdown(cleanText)}</div>
            ${isChecked && optIdx === q.correctIndex ? '<span style="color:var(--success); font-weight:bold;">✓</span>' : ''}
            ${isChecked && isSelected && optIdx !== q.correctIndex ? '<span style="color:var(--danger); font-weight:bold;">✕</span>' : ''}
          </div>
        `;
      }).join("");

      // Code Block
      const codeHtml = q.code ? `
        <div class="code-container" style="margin-bottom:16px;">
          <div class="code-header">
            <span>C++ Snippet</span>
            <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(\`${escapeHtml(q.code).replace(/`/g, '\\`')}\`); alert('Copied code snippet!');" style="padding:2px 8px; font-size:11px;">Copy</button>
          </div>
          <pre class="code-content" style="font-size:12.5px;"><code>${escapeHtml(q.code)}</code></pre>
        </div>
      ` : "";

      // Tags
      const tagsHtml = (q.tags || []).map(t => `<span class="mcq-tag-pill">#${escapeHtml(t)}</span>`).join(" ");

      // Difficulty Badge
      let diffBadge = "";
      if (q.difficulty === "easy") diffBadge = '<span class="diff-badge diff-easy">🟢 Easy</span>';
      else if (q.difficulty === "medium") diffBadge = '<span class="diff-badge diff-medium">🟡 Medium</span>';
      else if (q.difficulty === "hard") diffBadge = '<span class="diff-badge diff-hard">🔴 Hard / Trap</span>';

      // Status indicator
      let statusIndicator = "";
      if (isChecked) {
        statusIndicator = isCorrect
          ? `<span style="color:var(--success); font-size:13px; font-weight:700;">✓ Correct (+1.0)</span>`
          : `<span style="color:var(--danger); font-size:13px; font-weight:700;">✕ Incorrect (Correct: ${letters[q.correctIndex]})</span>`;
      } else if (savedAnswer !== undefined) {
        statusIndicator = `<span style="color:var(--cyan); font-size:12.5px;">Đã chọn: ${letters[savedAnswer]}</span>`;
      }

      // Explanation panel
      const showExplanation = isChecked || state.mcq.mode === "practice";
      const explanationHtml = `
        <div class="mcq-explanation-box" id="mcq_exp_${q.id}" style="${isChecked ? 'display:block;' : 'display:none;'}">
          <div style="font-weight:700; color:#38bdf8; margin-bottom:8px;">💡 DETAILED EXPLANATION & KEY CONCEPTS:</div>
          <div style="color:#e2e8f0; line-height:1.65;">${formatMarkdown(q.explanation)}</div>
        </div>
      `;

      return `
        <div class="mcq-card fade-in" id="mcq_card_${q.id}" data-qid="${q.id}">
          <div class="mcq-card-header">
            <div class="mcq-meta-left">
              <span class="mcq-num-badge">QUESTION ${q.number}</span>
              ${diffBadge}
              <span style="font-size:12px; color:var(--text-muted);">| ${escapeHtml(q.chapterName)}</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              ${tagsHtml}
            </div>
          </div>

          <div class="mcq-question-text">
            ${formatMarkdown(q.question)}
          </div>

          ${codeHtml}

          <div class="mcq-options-container">
            ${optionsHtml}
          </div>

          <div class="mcq-actions-bar">
            <div>${statusIndicator}</div>
            <div style="display:flex; gap:8px;">
              ${state.mcq.mode === "practice" ? `
                <button class="btn btn-secondary btn-sm btn-mcq-check" data-qid="${q.id}">
                  ${isChecked ? '📖 Xem Giải Thích' : '✓ Kiểm Tra Ngay'}
                </button>
              ` : `
                <span style="font-size:12px; color:var(--text-muted);">Chế độ thi thử: Nộp bài để xem điểm</span>
              `}
            </div>
          </div>

          ${explanationHtml}
        </div>
      `;
    }).join("");

    attachMCQOptionListeners();
  }

  function attachMCQOptionListeners() {
    // 1. Option click
    document.querySelectorAll('.mcq-option-item').forEach(item => {
      item.addEventListener('click', () => {
        const qId = item.getAttribute('data-qid');
        const optIdx = parseInt(item.getAttribute('data-opt-idx'), 10);

        // Save answer
        state.mcq.userAnswers[qId] = optIdx;
        saveMCQAnswers();

        // In practice mode, if already checked or checking immediately:
        if (state.mcq.mode === "practice") {
          state.mcq.checkedQuestions[qId] = true;
        }

        renderMCQSection();
      });
    });

    // 2. Check button click (Practice mode)
    document.querySelectorAll('.btn-mcq-check').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.getAttribute('data-qid');
        const expBox = document.getElementById(`mcq_exp_${qId}`);
        state.mcq.checkedQuestions[qId] = true;
        if (expBox) {
          expBox.style.display = expBox.style.display === "none" ? "block" : "none";
        }
        renderMCQGridNavigator();
        updateMCQStats();
      });
    });
  }

  function renderMCQGridNavigator() {
    if (!el.mcqGridNavigator) return;

    el.mcqGridNavigator.innerHTML = MCQ_ENGLISH_50.map(q => {
      const savedAns = state.mcq.userAnswers[q.id];
      const isChecked = state.mcq.checkedQuestions[q.id] || state.mcq.isSubmitted;
      let btnClass = "grid-q-btn";

      if (isChecked && savedAns !== undefined) {
        btnClass += (savedAns === q.correctIndex) ? " correct" : " wrong";
      } else if (savedAns !== undefined) {
        btnClass += " answered";
      }

      return `
        <button class="${btnClass}" onclick="window.scrollMCQQuestion('${q.id}')" title="Q${q.number}: ${escapeHtml(q.tags ? q.tags.join(', ') : '')}">
          ${q.number}
        </button>
      `;
    }).join("");
  }

  function updateMCQStats() {
    const total = MCQ_ENGLISH_50.length;
    let answeredCount = 0;
    let correctCount = 0;

    MCQ_ENGLISH_50.forEach(q => {
      const ans = state.mcq.userAnswers[q.id];
      if (ans !== undefined) {
        answeredCount++;
        if (ans === q.correctIndex) correctCount++;
      }
    });

    if (el.mcqAnsweredBadge) {
      el.mcqAnsweredBadge.textContent = `${answeredCount} / ${total}`;
    }
    if (el.sidebarProgressText) {
      el.sidebarProgressText.textContent = `${answeredCount}/${total} (${Math.round((answeredCount / total) * 100)}%)`;
    }
    if (el.mcqScoreBadge) {
      const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
      el.mcqScoreBadge.textContent = `${accuracy}% (${correctCount} đúng)`;
    }
  }

  function submitMCQExam() {
    state.mcq.isSubmitted = true;
    const total = MCQ_ENGLISH_50.length;
    let answeredCount = 0;
    let correctCount = 0;

    // Breakdown per chapter
    const chapterStats = {
      ch5: { name: "Ch 5: Inheritance & Polymorphism", total: 0, correct: 0 },
      ch6: { name: "Ch 6: Relationships & File I/O", total: 0, correct: 0 },
      ch7: { name: "Ch 7: Templates & Exceptions", total: 0, correct: 0 },
      ch8: { name: "Ch 8 & Patterns: STL & Design", total: 0, correct: 0 },
      ch2_4: { name: "Ch 2-4: Core OOP, Memory & Static", total: 0, correct: 0 }
    };

    MCQ_ENGLISH_50.forEach(q => {
      const ch = q.chapter;
      if (chapterStats[ch]) chapterStats[ch].total++;

      const ans = state.mcq.userAnswers[q.id];
      if (ans !== undefined) {
        answeredCount++;
        if (ans === q.correctIndex) {
          correctCount++;
          if (chapterStats[ch]) chapterStats[ch].correct++;
        }
      }
    });

    renderMCQSection();

    // Show summary modal
    const finalScore = ((correctCount / total) * 10).toFixed(2);
    let gradeMsg = "Cần cố gắng thêm!";
    let gradeColor = "var(--warning)";
    if (finalScore >= 8.5) { gradeMsg = "Xuất Sắc! Nắm vững toàn bộ kiến thức!"; gradeColor = "var(--success)"; }
    else if (finalScore >= 7.0) { gradeMsg = "Khá Giỏi! Cần chú ý thêm một vài bẫy code!"; gradeColor = "var(--cyan)"; }

    const chBreakdownRows = Object.values(chapterStats).map(s => {
      const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:var(--bg-primary); border-radius:6px; margin-bottom:6px; font-size:13px;">
          <span>${s.name}</span>
          <strong style="color:${pct >= 70 ? 'var(--success)' : 'var(--warning)'}; font-family:var(--font-mono);">${s.correct}/${s.total} (${pct}%)</strong>
        </div>
      `;
    }).join("");

    if (el.summaryContent) {
      el.summaryContent.innerHTML = `
        <div style="text-align:center; padding:10px 0 20px;">
          <div style="font-size:48px; font-weight:800; color:${gradeColor}; font-family:var(--font-mono);">${finalScore} / 10.0</div>
          <div style="font-size:16px; font-weight:700; color:var(--text-primary); margin-top:4px;">${gradeMsg}</div>
          <div style="color:var(--text-secondary); font-size:13px; margin-top:4px;">Đúng ${correctCount} / ${total} câu hỏi trắc nghiệm tiếng Anh</div>
        </div>

        <div style="margin-top:16px;">
          <h4 style="font-size:14px; margin-bottom:8px; color:var(--cyan);">📊 Đánh Giá Chi Tiết Từng Chương:</h4>
          ${chBreakdownRows}
        </div>

        <div style="margin-top:20px; text-align:center;">
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('summaryModal').classList.remove('active');">
            🔍 Xem Lại Đáp Án & Giải Thích Chi Tiết
          </button>
        </div>
      `;
    }
    if (el.summaryModal) el.summaryModal.classList.add('active');
  }

  function resetMCQAnswers() {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ câu trả lời và làm lại từ đầu 50 câu trắc nghiệm?")) {
      state.mcq.userAnswers = {};
      state.mcq.checkedQuestions = {};
      state.mcq.isSubmitted = false;
      saveMCQAnswers();
      renderMCQSection();
    }
  }

  // =========================================================================
  // SECTION 2: WRITTEN 4 STANDARD TYPES MODULE
  // =========================================================================
  function renderWrittenTabs() {
    if (!el.examTabs) return;

    el.examTabs.innerHTML = ALL_EXAMS.map(exam => {
      const isActive = exam.id === state.written.currentExamId;
      return `
        <button class="exam-tab-btn ${isActive ? 'active' : ''}" data-exam-id="${exam.id}">
          <span>📄</span>
          <span>${exam.id === 'de5' ? '⭐ Đề 05 (Tổng Hợp)' : 'Đề ' + exam.id.replace('de', '')}</span>
        </button>
      `;
    }).join("");

    el.examTabs.querySelectorAll('.exam-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const examId = btn.getAttribute('data-exam-id');
        if (examId !== state.written.currentExamId) {
          state.written.currentExamId = examId;
          renderWrittenTabs();
          renderWrittenSection();
          resetTimer();
        }
      });
    });
  }

  function renderWrittenSection() {
    if (state.written.viewMode === "exam") {
      renderWrittenExamMode();
    } else {
      renderWrittenBankMode();
    }
  }

  function renderWrittenExamMode() {
    const exam = getCurrentExam();
    if (el.examTitle) el.examTitle.textContent = exam.title;
    if (el.examSubtitle) el.examSubtitle.textContent = exam.subtitle;
    if (el.examTimeBadge) el.examTimeBadge.textContent = `${exam.timeMinutes || 90} Phút`;
    if (el.totalQuestionsBadge) el.totalQuestionsBadge.textContent = `${exam.questions.length} Câu (Đủ 4 Dạng)`;

    const filter = state.written.activeExamFilter;
    const filteredQuestions = filter === "all"
      ? exam.questions
      : exam.questions.filter(q => q.type === filter);

    renderWrittenQuestionCards(filteredQuestions);
  }

  function renderWrittenBankMode() {
    const bankType = state.written.activeBankType;
    const questions = QUESTION_BANK_4TYPES[bankType] || [];

    const typeNames = {
      theory: "Dạng 1: Lý Thuyết & Bản Chất OOP (Câu 1)",
      code_trace: "Dạng 2: Đọc Code Đoán Output & Bẫy Code (Câu 2)",
      code_writing: "Dạng 3: Viết Code C++ & Rule of Three/Template (Câu 3)",
      design_pattern: "Dạng 4: Thiết Kế Kiến Trúc & Design Pattern (Câu 4)"
    };

    if (el.examTitle) el.examTitle.textContent = `Kho Bài Tập: ${typeNames[bankType]}`;
    if (el.examSubtitle) el.examSubtitle.textContent = `Luyện tập chuyên sâu từng dạng bài với đa dạng độ khó từ cơ bản đến nâng cao.`;
    if (el.examTimeBadge) el.examTimeBadge.textContent = "Tự Luyện";
    if (el.totalQuestionsBadge) el.totalQuestionsBadge.textContent = `${questions.length} Bài Tập`;

    renderWrittenQuestionCards(questions);
  }

  function renderWrittenQuestionCards(questions) {
    if (!el.questionsContainer) return;

    if (questions.length === 0) {
      el.questionsContainer.innerHTML = `
        <div style="text-align:center; padding:40px; color:var(--text-secondary);">
          <p style="font-size:18px; margin-bottom:8px;">Không có câu hỏi nào thuộc bộ lọc này.</p>
        </div>
      `;
      return;
    }

    el.questionsContainer.innerHTML = questions.map(q => {
      let bodyHtml = "";
      if (q.type === "theory") bodyHtml = renderTheoryQuestion(q);
      else if (q.type === "code_trace") bodyHtml = renderCodeTraceQuestion(q);
      else if (q.type === "code_writing") bodyHtml = renderCodeWritingQuestion(q);
      else if (q.type === "design_pattern") bodyHtml = renderDesignPatternQuestion(q);

      return `
        <div class="question-card fade-in" id="q_card_${q.id}" data-qid="${q.id}">
          <div class="question-header">
            <div class="question-title-area">
              ${getBadgeForType(q.type, q.number)}
              <h3 class="question-title">${escapeHtml(q.title)}</h3>
            </div>
            <div class="question-meta">
              <span>Điểm: <strong style="color:var(--cyan); font-family:var(--font-mono);">${q.maxScore.toFixed(1)}đ</strong></span>
            </div>
          </div>
          <div class="question-body">
            ${bodyHtml}
          </div>
        </div>
      `;
    }).join("");

    attachWrittenCardListeners();
  }

  function getBadgeForType(type, number) {
    switch (type) {
      case "theory":
        return `<span class="q-badge q-badge-c1">CÂU ${number} · LÝ THUYẾT (2.0đ)</span>`;
      case "code_trace":
        return `<span class="q-badge q-badge-c2">CÂU ${number} · ĐỌC CODE → OUTPUT (2.0đ)</span>`;
      case "code_writing":
        return `<span class="q-badge q-badge-c3">CÂU ${number} · VIẾT CODE (3.0đ)</span>`;
      case "design_pattern":
        return `<span class="q-badge q-badge-c4">CÂU ${number} · THIẾT KẾ KIẾN TRÚC (3.0đ)</span>`;
      default:
        return `<span class="q-badge">CÂU ${number}</span>`;
    }
  }

  // 1. Render Theory
  function renderTheoryQuestion(q) {
    const savedAns = state.written.userAnswers[q.id] || {};
    const subQuestionsHtml = (q.subQuestions || []).map((subQ, idx) => {
      const selectedIndex = savedAns[`sub_${idx}`];
      return `
        <div class="sub-q-block" data-sub-idx="${idx}">
          <div class="sub-q-title"><strong>1.${idx + 1}.</strong> ${escapeHtml(subQ.question)}</div>
          <div class="options-list">
            ${subQ.options.map((opt, optIdx) => {
        const isChecked = selectedIndex === optIdx ? "checked" : "";
        return `
                <label class="option-label" data-opt-idx="${optIdx}">
                  <input type="radio" name="theory_${q.id}_sub_${idx}" value="${optIdx}" ${isChecked}>
                  <span>${escapeHtml(opt)}</span>
                </label>
              `;
      }).join("")}
          </div>
          <div class="sub-q-feedback" id="feedback_${q.id}_${idx}" style="margin-top:10px; display:none;"></div>
        </div>
      `;
    }).join("");

    return `
      <div class="prompt-box">
        <h4>📋 YÊU CẦU ĐỀ BÀI:</h4>
        ${formatMarkdown(q.prompt)}
        <div class="slide-ref-tag">
          <span>📚 Nguồn slide:</span> <strong>${escapeHtml(q.slideRef)}</strong>
        </div>
      </div>

      <div class="theory-sub-questions">
        <h4 style="margin-bottom:12px; font-size:14px; color:var(--text-secondary);">TRẮC NGHIỆM KIỂM TRA HIỂU SÂU BẢN CHẤT:</h4>
        ${subQuestionsHtml}
      </div>

      <div style="display:flex; gap:10px; margin-top:16px; flex-wrap:wrap;">
        <button class="btn btn-primary btn-sm btn-check-theory" data-qid="${q.id}">
          ✓ Kiểm tra đáp án trắc nghiệm
        </button>
        <button class="btn btn-secondary btn-sm btn-toggle-theory-ans" data-qid="${q.id}">
          📖 Xem bài giải lý thuyết chi tiết & trích dẫn
        </button>
      </div>

      <div class="theory-solution-panel" id="solution_${q.id}" style="display:none; margin-top:16px;">
        <h4 style="color:var(--primary); margin-bottom:10px;">💡 BÀI GIẢI LÝ THUYẾT CHI TIẾT THEO BAREM FIT-HCMUS:</h4>
        <div style="line-height:1.7;">${formatMarkdown(q.detailedAnswer)}</div>
      </div>
    `;
  }

  // 2. Render Code Trace
  function renderCodeTraceQuestion(q) {
    const savedOutput = state.written.userAnswers[q.id]?.userOutput || "";
    const stepsHtml = (q.stepByStepAnalysis || []).map(step => `
      <div class="trace-step-item">
        <div class="step-num">${step.step}</div>
        <div class="step-content">
          <div><strong>${escapeHtml(step.line)}</strong></div>
          <div style="font-size:13.5px; color:var(--text-secondary); margin-top:4px;">${formatMarkdown(step.explanation)}</div>
        </div>
      </div>
    `).join("");

    return `
      <div class="prompt-box" style="margin-bottom:14px;">
        <h4>📝 ĐỀ BÀI:</h4>
        <p>Đọc đoạn mã nguồn C++ dưới đây và ghi chính xác chuỗi kết quả (output) in ra màn hình console.</p>
        <div class="slide-ref-tag">
          <span>📚 Kiến thức:</span> <strong>${escapeHtml(q.slideRef)}</strong> &nbsp;|&nbsp;
          <span>⚠️ Điểm bẫy:</span> <strong style="color:var(--warning);">${escapeHtml(q.trapRef || "")}</strong>
        </div>
      </div>

      <div class="code-container">
        <div class="code-header">
          <span>Source Code (C++)</span>
          <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(\`${escapeHtml(q.code).replace(/`/g, '\\`')}\`); alert('Đã copy code!');" style="padding:2px 8px; font-size:11px;">Copy Code</button>
        </div>
        <pre class="code-content"><code>${escapeHtml(q.code)}</code></pre>
      </div>

      <div class="trace-input-section">
        <div>
          <div class="input-box-label">
            <span>⌨️ Output của bạn:</span>
            <span style="font-size:11px; color:var(--text-muted);">Gõ chính xác khoảng trắng & xuống dòng</span>
          </div>
          <textarea class="output-textarea" id="input_${q.id}" placeholder="Nhập chuỗi output bạn đoán vào đây...">${escapeHtml(savedOutput)}</textarea>
        </div>
        <div>
          <div class="input-box-label">
            <span>📊 Kết quả so sánh (Diff Check):</span>
            <span id="match_badge_${q.id}" class="badge badge-blue">Chưa kiểm tra</span>
          </div>
          <div class="diff-box" id="diff_${q.id}">
            <span style="color:var(--text-muted); font-style:italic;">Nhập output bên trái rồi bấm nút "Kiểm tra Output" để so sánh với đáp án chuẩn.</span>
          </div>
        </div>
      </div>

      <div style="display:flex; gap:10px; margin-bottom:14px; flex-wrap:wrap;">
        <button class="btn btn-primary btn-sm btn-check-trace" data-qid="${q.id}">
          🔍 Kiểm tra Output
        </button>
        <button class="btn btn-secondary btn-sm btn-toggle-trace-steps" data-qid="${q.id}">
          🔎 Xem phân tích từng bước (Step-by-step trace)
        </button>
      </div>

      <div class="trace-steps-accordion" id="steps_acc_${q.id}" style="display:none;">
        <div class="accordion-header">
          <span>🧠 GIẢI THÍCH CHI TIẾT TỪNG BƯỚC THỰC THI & PHÂN TÍCH BẪY CODE</span>
        </div>
        <div class="accordion-body">
          ${stepsHtml}
        </div>
      </div>
    `;
  }

  // 3. Render Code Writing
  function renderCodeWritingQuestion(q) {
    const savedCode = state.written.userAnswers[q.id]?.userCode !== undefined
      ? state.written.userAnswers[q.id].userCode
      : q.starterCode;

    const checklistSaved = state.written.userAnswers[q.id]?.checklist || {};

    const checklistHtml = (q.checklist || []).map(item => {
      const isChecked = checklistSaved[item.id] ? "checked" : "";
      return `
        <label class="check-item">
          <input type="checkbox" class="checklist-box" data-qid="${q.id}" data-cid="${item.id}" data-weight="${item.weight}" ${isChecked}>
          <span>${formatMarkdown(item.label)} <strong style="color:var(--cyan); font-family:var(--font-mono);">(+${item.weight}đ)</strong></span>
        </label>
      `;
    }).join("");

    return `
      <div class="prompt-box">
        <h4>📋 ĐỀ BÀI & YÊU CẦU:</h4>
        ${formatMarkdown(q.prompt)}
        <div class="slide-ref-tag">
          <span>📚 Nguồn slide:</span> <strong>${escapeHtml(q.slideRef)}</strong>
        </div>
      </div>

      <div class="checklist-container">
        <div class="checklist-title">
          <span>🎯 BAREM TỰ ĐÁNH GIÁ TIÊU CHÍ KỸ THUẬT (SELF-CHECKLIST):</span>
          <span id="check_score_${q.id}" style="color:var(--success); font-family:var(--font-mono); font-size:13px;">0.0 / ${q.maxScore.toFixed(1)}đ</span>
        </div>
        <div class="checklist-items">
          ${checklistHtml}
        </div>
      </div>

      <div class="code-editor-wrapper">
        <div class="editor-toolbar">
          <span style="font-size:12px; color:var(--text-secondary);">Code Editor (Hỗ trợ phím Tab thụt lề 4 spaces)</span>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-outline btn-sm btn-reset-code" data-qid="${q.id}" style="padding:2px 8px; font-size:11px;">Khôi phục mẫu ban đầu</button>
            <button class="btn btn-outline btn-sm btn-copy-editor" data-qid="${q.id}" style="padding:2px 8px; font-size:11px;">Copy Code của bạn</button>
          </div>
        </div>
        <textarea class="code-editor-textarea" id="editor_${q.id}" placeholder="Viết mã nguồn C++ của bạn tại đây...">${escapeHtml(savedCode)}</textarea>
      </div>

      <div style="display:flex; gap:10px; margin-top:14px; flex-wrap:wrap;">
        <button class="btn btn-secondary btn-sm btn-toggle-code-sol" data-qid="${q.id}">
          ✨ Xem Code chuẩn của giảng viên & phân tích barem
        </button>
      </div>

      <div class="code-container" id="sol_container_${q.id}" style="display:none; margin-top:16px;">
        <div class="code-header" style="background:#064e3b; color:#a7f3d0;">
          <span>C++ Reference Solution (Code Chuẩn Tối Ưu)</span>
          <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(\`${escapeHtml(q.solutionCode).replace(/`/g, '\\`')}\`); alert('Đã copy code mẫu!');" style="padding:2px 8px; font-size:11px; color:#a7f3d0; border-color:#059669;">Copy Code Mẫu</button>
        </div>
        <pre class="code-content" style="background:#022c22; color:#d1fae5;"><code>${escapeHtml(q.solutionCode)}</code></pre>
      </div>
    `;
  }

  // 4. Render Design Pattern
  function renderDesignPatternQuestion(q) {
    const savedPattern = state.written.userAnswers[q.id]?.selectedPattern;
    const patternOptionsHtml = (q.patternOptions || []).map(opt => {
      const isChecked = savedPattern === opt.id ? "checked" : "";
      return `
        <label class="pattern-choice-card" data-pat-id="${opt.id}">
          <input type="radio" name="pattern_${q.id}" value="${opt.id}" ${isChecked}>
          <strong style="margin-left:6px;">${escapeHtml(opt.name)}</strong>
        </label>
      `;
    }).join("");

    const roleMappingRows = (q.roleMapping || []).map(r => `
      <tr>
        <td style="font-weight:600; color:var(--cyan); font-family:var(--font-mono); width:35%;">${escapeHtml(r.role)}</td>
        <td style="color:var(--text-secondary);">${formatMarkdown(r.requirement)}</td>
      </tr>
    `).join("");

    return `
      <div class="prompt-box">
        <h4>🏢 TÌNH HUỐNG THIẾT KẾ THỰC TẾ (SCENARIO):</h4>
        ${formatMarkdown(q.scenario)}
        <div class="slide-ref-tag">
          <span>📚 Lý thuyết áp dụng:</span> <strong>${escapeHtml(q.slideRef)}</strong>
        </div>
      </div>

      <div class="pattern-selection-box">
        <h4 style="font-size:14px; color:var(--warning); margin-bottom:8px;">BƯỚC 1: LỰA CHỌN MẪU THIẾT KẾ (DESIGN PATTERN) PHÙ HỢP:</h4>
        <div class="pattern-options-grid">
          ${patternOptionsHtml}
        </div>
        <div id="pat_feedback_${q.id}" style="margin-top:12px; display:none;"></div>
      </div>

      <div class="pattern-selection-box">
        <h4 style="font-size:14px; color:var(--cyan); margin-bottom:8px;">BƯỚC 2: PHÂN RÃ VAI TRÒ & THÀNH PHẦN KIẾN TRÚC (ROLE MAPPING):</h4>
        <table class="role-mapping-table">
          <thead>
            <tr>
              <th>Thành phần / Vai trò trong Pattern</th>
              <th>Mục đích & Trách nhiệm kỹ thuật</th>
            </tr>
          </thead>
          <tbody>
            ${roleMappingRows}
          </tbody>
        </table>
      </div>

      <div class="uml-visual-box">
        <div style="font-size:13px; font-weight:700; color:#38bdf8; margin-bottom:8px;">BƯỚC 3: SƠ ĐỒ LỚP UML (CLASS DIAGRAM NOTATION):</div>
        <pre style="color:#cbd5e1; font-size:12.5px; line-height:1.4; background:rgba(0,0,0,0.3); padding:12px; border-radius:6px;"><code>${escapeHtml(q.umlDiagram.trim())}</code></pre>
      </div>

      <div style="display:flex; gap:10px; margin-top:14px; flex-wrap:wrap;">
        <button class="btn btn-primary btn-sm btn-check-pattern" data-qid="${q.id}">
          ✓ Đánh giá lựa chọn Pattern
        </button>
        <button class="btn btn-secondary btn-sm btn-toggle-skeleton" data-qid="${q.id}">
          🏛️ Xem Khung Code Thiết Kế Kiến Trúc (C++ Skeleton)
        </button>
      </div>

      <div class="code-container" id="skeleton_box_${q.id}" style="display:none; margin-top:16px;">
        <div class="code-header" style="background:#312e81; color:#c7d2fe;">
          <span>C++ Architectural Skeleton & Implementation</span>
          <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(\`${escapeHtml(q.designSkeleton).replace(/`/g, '\\`')}\`); alert('Đã copy khung thiết kế!');" style="padding:2px 8px; font-size:11px; color:#c7d2fe; border-color:#6366f1;">Copy Skeleton</button>
        </div>
        <pre class="code-content" style="background:#1e1b4b; color:#e0e7ff;"><code>${escapeHtml(q.designSkeleton)}</code></pre>
      </div>
    `;
  }

  function attachWrittenCardListeners() {
    // 1. Theory listeners
    document.querySelectorAll('.btn-check-theory').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const q = findWrittenQuestionById(qid);
        if (!q || !q.subQuestions) return;

        q.subQuestions.forEach((subQ, idx) => {
          const selected = document.querySelector(`input[name="theory_${qid}_sub_${idx}"]:checked`);
          const fbEl = document.getElementById(`feedback_${qid}_${idx}`);
          const block = document.querySelector(`.sub-q-block[data-sub-idx="${idx}"]`);

          if (!selected) {
            if (fbEl) {
              fbEl.style.display = "block";
              fbEl.innerHTML = `<span style="color:var(--warning);">⚠️ Bạn chưa chọn câu trả lời.</span>`;
            }
            return;
          }

          const val = parseInt(selected.value, 10);
          if (!state.written.userAnswers[qid]) state.written.userAnswers[qid] = {};
          state.written.userAnswers[qid][`sub_${idx}`] = val;
          saveWrittenAnswers();

          const labels = block ? block.querySelectorAll('.option-label') : [];
          labels.forEach((lbl, oIdx) => {
            lbl.classList.remove('correct-choice', 'wrong-choice');
            if (oIdx === subQ.correctIndex) lbl.classList.add('correct-choice');
            else if (oIdx === val) lbl.classList.add('wrong-choice');
          });

          if (fbEl) {
            fbEl.style.display = "block";
            fbEl.innerHTML = (val === subQ.correctIndex)
              ? `<div style="color:var(--success); font-size:13px;">✓ <strong>Chính xác:</strong> ${escapeHtml(subQ.explanation)}</div>`
              : `<div style="color:var(--danger); font-size:13px;">✕ <strong>Chưa chính xác:</strong> ${escapeHtml(subQ.explanation)}</div>`;
          }
        });
      });
    });

    document.querySelectorAll('.btn-toggle-theory-ans').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const p = document.getElementById(`solution_${qid}`);
        if (p) p.style.display = p.style.display === "none" ? "block" : "none";
      });
    });

    // 2. Code trace listeners
    document.querySelectorAll('.btn-check-trace').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const q = findWrittenQuestionById(qid);
        if (!q) return;

        const inputEl = document.getElementById(`input_${qid}`);
        const diffBox = document.getElementById(`diff_${qid}`);
        const badge = document.getElementById(`match_badge_${qid}`);
        const val = inputEl ? inputEl.value : "";

        if (!state.written.userAnswers[qid]) state.written.userAnswers[qid] = {};
        state.written.userAnswers[qid].userOutput = val;
        saveWrittenAnswers();

        // Normalize string
        const cleanUser = val.trim().replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ');
        const cleanExpected = q.expectedOutput.trim().replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ');
        const altMatches = (q.alternativeOutputs || []).some(alt => alt.trim().replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ') === cleanUser);

        if (cleanUser === cleanExpected || altMatches) {
          if (badge) {
            badge.className = "badge badge-green";
            badge.textContent = "✓ Hoàn toàn chính xác (+2.0đ)";
          }
          if (diffBox) {
            diffBox.innerHTML = `
              <div style="color:var(--success); font-weight:700; margin-bottom:4px;">🎉 Tuyệt vời! Output của bạn khớp 100% với chương trình:</div>
              <pre style="background:rgba(16,185,129,0.1); border:1px solid var(--success); padding:8px; border-radius:4px; color:#6ee7b7;"><code>${escapeHtml(q.expectedOutput)}</code></pre>
            `;
          }
        } else {
          if (badge) {
            badge.className = "badge badge-red";
            badge.textContent = "✕ Chưa khớp output";
          }
          if (diffBox) {
            diffBox.innerHTML = `
              <div style="margin-bottom:6px; color:#fca5a5;">⚠️ <strong>Đáp án chưa khớp:</strong></div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:12px;">
                <div>
                  <span style="color:var(--text-muted);">Output bạn nhập:</span>
                  <pre style="background:rgba(239,68,68,0.1); border:1px solid var(--danger); padding:6px; border-radius:4px; color:#fca5a5; margin-top:2px;"><code>${escapeHtml(val || "(Trống)")}</code></pre>
                </div>
                <div>
                  <span style="color:var(--text-muted);">Output chuẩn:</span>
                  <pre style="background:rgba(16,185,129,0.1); border:1px solid var(--success); padding:6px; border-radius:4px; color:#6ee7b7; margin-top:2px;"><code>${escapeHtml(q.expectedOutput)}</code></pre>
                </div>
              </div>
            `;
          }
        }
      });
    });

    document.querySelectorAll('.btn-toggle-trace-steps').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const acc = document.getElementById(`steps_acc_${qid}`);
        if (acc) acc.style.display = acc.style.display === "none" ? "block" : "none";
      });
    });

    // 3. Code writing listeners
    document.querySelectorAll('.code-editor-textarea').forEach(textarea => {
      // Tab key support
      textarea.addEventListener('keydown', e => {
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          textarea.value = textarea.value.substring(0, start) + "    " + textarea.value.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + 4;
        }
      });

      textarea.addEventListener('input', () => {
        const qid = textarea.id.replace('editor_', '');
        if (!state.written.userAnswers[qid]) state.written.userAnswers[qid] = {};
        state.written.userAnswers[qid].userCode = textarea.value;
        saveWrittenAnswers();
      });
    });

    document.querySelectorAll('.checklist-box').forEach(box => {
      box.addEventListener('change', () => {
        const qid = box.getAttribute('data-qid');
        const cid = box.getAttribute('data-cid');
        if (!state.written.userAnswers[qid]) state.written.userAnswers[qid] = {};
        if (!state.written.userAnswers[qid].checklist) state.written.userAnswers[qid].checklist = {};
        state.written.userAnswers[qid].checklist[cid] = box.checked;
        saveWrittenAnswers();
        updateChecklistScore(qid);
      });
    });

    document.querySelectorAll('.btn-reset-code').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const q = findWrittenQuestionById(qid);
        if (q && confirm("Khôi phục code về đoạn mã khung ban đầu?")) {
          const ed = document.getElementById(`editor_${qid}`);
          if (ed) ed.value = q.starterCode;
          if (!state.written.userAnswers[qid]) state.written.userAnswers[qid] = {};
          state.written.userAnswers[qid].userCode = q.starterCode;
          saveWrittenAnswers();
        }
      });
    });

    document.querySelectorAll('.btn-copy-editor').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const ed = document.getElementById(`editor_${qid}`);
        if (ed) {
          navigator.clipboard.writeText(ed.value);
          alert("Đã copy code của bạn vào bộ nhớ tạm!");
        }
      });
    });

    document.querySelectorAll('.btn-toggle-code-sol').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const sol = document.getElementById(`sol_container_${qid}`);
        if (sol) sol.style.display = sol.style.display === "none" ? "block" : "none";
      });
    });

    // 4. Design Pattern listeners
    document.querySelectorAll('.btn-check-pattern').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const q = findWrittenQuestionById(qid);
        if (!q || !q.patternOptions) return;

        const selected = document.querySelector(`input[name="pattern_${qid}"]:checked`);
        const fbBox = document.getElementById(`pat_feedback_${qid}`);

        if (!selected) {
          if (fbBox) {
            fbBox.style.display = "block";
            fbBox.innerHTML = `<span style="color:var(--warning);">⚠️ Bạn chưa chọn mẫu thiết kế nào.</span>`;
          }
          return;
        }

        const selectedId = selected.value;
        if (!state.written.userAnswers[qid]) state.written.userAnswers[qid] = {};
        state.written.userAnswers[qid].selectedPattern = selectedId;
        saveWrittenAnswers();

        const opt = q.patternOptions.find(p => p.id === selectedId);
        if (fbBox && opt) {
          fbBox.style.display = "block";
          fbBox.innerHTML = opt.correct
            ? `<div style="background:rgba(16,185,129,0.15); border:1px solid var(--success); padding:10px 14px; border-radius:6px; color:#6ee7b7;">🎉 <strong>Chính xác!</strong> ${escapeHtml(opt.reason)}</div>`
            : `<div style="background:rgba(239,68,68,0.15); border:1px solid var(--danger); padding:10px 14px; border-radius:6px; color:#fca5a5;">✕ <strong>Chưa tối ưu:</strong> ${escapeHtml(opt.reason)}</div>`;
        }
      });
    });

    document.querySelectorAll('.btn-toggle-skeleton').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const box = document.getElementById(`skeleton_box_${qid}`);
        if (box) box.style.display = box.style.display === "none" ? "block" : "none";
      });
    });
  }

  function findWrittenQuestionById(qid) {
    // Look in current exam
    for (const exam of ALL_EXAMS) {
      const match = exam.questions.find(q => q.id === qid);
      if (match) return match;
    }
    // Look in question bank
    for (const typeKey of Object.keys(QUESTION_BANK_4TYPES)) {
      const match = QUESTION_BANK_4TYPES[typeKey].find(q => q.id === qid);
      if (match) return match;
    }
    return null;
  }

  function updateChecklistScore(qid) {
    const q = findWrittenQuestionById(qid);
    if (!q || !q.checklist) return;

    const saved = state.written.userAnswers[qid]?.checklist || {};
    let totalScore = 0;

    q.checklist.forEach(item => {
      if (saved[item.id]) totalScore += item.weight;
    });

    const scoreEl = document.getElementById(`check_score_${qid}`);
    if (scoreEl) scoreEl.textContent = `${totalScore.toFixed(2)} / ${q.maxScore.toFixed(1)}đ`;
  }

  function submitWrittenExam() {
    const exam = getCurrentExam();
    let totalScore = 0;
    const maxScore = 10.0;

    // Evaluate subquestions and checklists
    exam.questions.forEach(q => {
      const ans = state.written.userAnswers[q.id] || {};
      if (q.type === "theory" && q.subQuestions) {
        let correctSub = 0;
        q.subQuestions.forEach((subQ, idx) => {
          if (ans[`sub_${idx}`] === subQ.correctIndex) correctSub++;
        });
        totalScore += (correctSub / q.subQuestions.length) * q.maxScore;
      } else if (q.type === "code_trace") {
        const cleanUser = (ans.userOutput || "").trim().replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ');
        const cleanExp = q.expectedOutput.trim().replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ');
        if (cleanUser === cleanExp) totalScore += q.maxScore;
      } else if (q.type === "code_writing" && q.checklist) {
        const cl = ans.checklist || {};
        q.checklist.forEach(item => {
          if (cl[item.id]) totalScore += item.weight;
        });
      } else if (q.type === "design_pattern" && q.patternOptions) {
        const correctPat = q.patternOptions.find(p => p.correct);
        if (ans.selectedPattern && correctPat && ans.selectedPattern === correctPat.id) {
          totalScore += q.maxScore;
        }
      }
    });

    const finalScore = Math.min(10.0, totalScore).toFixed(1);
    let gradeMsg = "Cần ôn tập thêm!";
    let gradeColor = "var(--warning)";
    if (finalScore >= 8.5) { gradeMsg = "Xuất Sắc! Điểm A+ chuẩn mực!"; gradeColor = "var(--success)"; }
    else if (finalScore >= 7.0) { gradeMsg = "Khá Giỏi! Nắm vững 4 dạng bài!"; gradeColor = "var(--cyan)"; }

    if (el.summaryContent) {
      el.summaryContent.innerHTML = `
        <div style="text-align:center; padding:10px 0 20px;">
          <div style="font-size:48px; font-weight:800; color:${gradeColor}; font-family:var(--font-mono);">${finalScore} / ${maxScore.toFixed(1)}đ</div>
          <div style="font-size:16px; font-weight:700; color:var(--text-primary); margin-top:4px;">${gradeMsg}</div>
          <div style="color:var(--text-secondary); font-size:13px; margin-top:4px;">${escapeHtml(exam.title)}</div>
        </div>

        <div style="margin-top:16px; text-align:center;">
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('summaryModal').classList.remove('active');">
            ✕ Đóng & Xem Lại Bài Làm
          </button>
        </div>
      `;
    }
    if (el.summaryModal) el.summaryModal.classList.add('active');
  }

  // =========================================================================
  // 10 BẪY CODE CHEATSHEET MODAL
  // =========================================================================
  function renderTrapCheatsheet(filterText = "") {
    if (!el.trapListContainer) return;
    const list = TRAP_CHEATSHEET || [];
    const query = filterText.toLowerCase().trim();

    const filtered = query === "" ? list : list.filter(item => {
      return item.title.toLowerCase().includes(query) ||
        item.danger.toLowerCase().includes(query) ||
        item.badCode.toLowerCase().includes(query) ||
        item.explanation.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      el.trapListContainer.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:20px;">Không tìm thấy bẫy code nào phù hợp.</p>`;
      return;
    }

    el.trapListContainer.innerHTML = filtered.map(item => `
      <div class="trap-card">
        <div class="trap-card-header">
          <span style="background:var(--warning-light); color:var(--warning); font-size:12px; font-weight:700; padding:2px 8px; border-radius:4px; font-family:var(--font-mono);">BẪY #${item.id}</span>
          <strong style="font-size:15px;">${escapeHtml(item.title)}</strong>
        </div>
        <div style="font-size:13px; color:#fca5a5; margin-bottom:6px;">⚠️ <strong>Nguy cơ:</strong> ${escapeHtml(item.danger)}</div>
        <div class="trap-code-diff">
          <div class="diff-wrong">
            <div style="font-weight:700; margin-bottom:4px;">✕ Code Sai / Bị Bẫy:</div>
            <pre><code>${escapeHtml(item.badCode)}</code></pre>
          </div>
          <div class="diff-correct">
            <div style="font-weight:700; margin-bottom:4px;">✓ Code Đúng / Khắc Phục:</div>
            <pre><code>${escapeHtml(item.goodCode)}</code></pre>
          </div>
        </div>
        <div style="font-size:12.5px; color:var(--text-secondary); margin-top:8px; line-height:1.5;">
          💡 <strong>Bản chất:</strong> ${formatMarkdown(item.explanation)}
        </div>
      </div>
    `).join("");
  }

  // =========================================================================
  // GLOBAL EVENT LISTENERS
  // =========================================================================
  function setupGlobalEventListeners() {
    // 1. Main Navigation Switcher (MCQ vs Written)
    if (el.btnNavMCQ) {
      el.btnNavMCQ.addEventListener('click', () => {
        state.activeMainSection = "mcq";
        el.btnNavMCQ.classList.add('active');
        el.btnNavWritten.classList.remove('active');
        el.mcqSection.style.display = "block";
        el.writtenSection.style.display = "none";
        renderMCQSection();
      });
    }

    if (el.btnNavWritten) {
      el.btnNavWritten.addEventListener('click', () => {
        state.activeMainSection = "written";
        el.btnNavWritten.classList.add('active');
        el.btnNavMCQ.classList.remove('active');
        el.mcqSection.style.display = "none";
        el.writtenSection.style.display = "block";
        renderWrittenTabs();
        renderWrittenSection();
      });
    }

    // 2. Timer & Theme
    if (el.themeToggleBtn) el.themeToggleBtn.addEventListener('click', toggleTheme);
    if (el.timerBtn) el.timerBtn.addEventListener('click', toggleTimer);
    if (el.resetTimerBtn) el.resetTimerBtn.addEventListener('click', resetTimer);

    // 3. Cheatsheet Modal
    if (el.openTrapBtn) {
      el.openTrapBtn.addEventListener('click', () => {
        if (el.trapModal) el.trapModal.classList.add('active');
      });
    }
    if (el.closeTrapBtn) {
      el.closeTrapBtn.addEventListener('click', () => {
        if (el.trapModal) el.trapModal.classList.remove('active');
      });
    }
    if (el.trapSearchInput) {
      el.trapSearchInput.addEventListener('input', e => {
        renderTrapCheatsheet(e.target.value);
      });
    }

    // 4. Summary Modal Close
    if (el.closeSummaryBtn) {
      el.closeSummaryBtn.addEventListener('click', () => {
        if (el.summaryModal) el.summaryModal.classList.remove('active');
      });
    }

    // 5. MCQ Controls
    if (el.mcqChapterFilters) {
      el.mcqChapterFilters.querySelectorAll('.filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          el.mcqChapterFilters.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.mcq.activeChapter = btn.getAttribute('data-chapter');
          renderMCQSection();
        });
      });
    }

    document.querySelectorAll('.diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.mcq.activeDifficulty = btn.getAttribute('data-diff');
        renderMCQSection();
      });
    });

    if (el.mcqSearchInput) {
      el.mcqSearchInput.addEventListener('input', e => {
        state.mcq.searchQuery = e.target.value;
        renderMCQSection();
      });
    }

    if (el.mcqModePracticeBtn) {
      el.mcqModePracticeBtn.addEventListener('click', () => {
        state.mcq.mode = "practice";
        el.mcqModePracticeBtn.classList.add('active');
        el.mcqModeExamBtn.classList.remove('active');
        renderMCQSection();
      });
    }

    if (el.mcqModeExamBtn) {
      el.mcqModeExamBtn.addEventListener('click', () => {
        state.mcq.mode = "exam";
        el.mcqModeExamBtn.classList.add('active');
        el.mcqModePracticeBtn.classList.remove('active');
        renderMCQSection();
      });
    }

    if (el.mcqSubmitBtn) el.mcqSubmitBtn.addEventListener('click', submitMCQExam);
    if (el.mcqResetBtn) el.mcqResetBtn.addEventListener('click', resetMCQAnswers);

    // 6. Written Controls
    if (el.writtenModeExamBtn) {
      el.writtenModeExamBtn.addEventListener('click', () => {
        state.written.viewMode = "exam";
        el.writtenModeExamBtn.classList.add('active');
        el.writtenModeBankBtn.classList.remove('active');
        if (el.examTabs) el.examTabs.style.display = "flex";
        if (el.bankTypePills) el.bankTypePills.style.display = "none";
        if (el.examTypeFilterBar) el.examTypeFilterBar.style.display = "flex";
        renderWrittenSection();
      });
    }

    if (el.writtenModeBankBtn) {
      el.writtenModeBankBtn.addEventListener('click', () => {
        state.written.viewMode = "bank";
        el.writtenModeBankBtn.classList.add('active');
        el.writtenModeExamBtn.classList.remove('active');
        if (el.examTabs) el.examTabs.style.display = "none";
        if (el.bankTypePills) el.bankTypePills.style.display = "flex";
        if (el.examTypeFilterBar) el.examTypeFilterBar.style.display = "none";
        renderWrittenSection();
      });
    }

    if (el.bankTypePills) {
      el.bankTypePills.querySelectorAll('.bank-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          el.bankTypePills.querySelectorAll('.bank-pill-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.written.activeBankType = btn.getAttribute('data-bank-type');
          renderWrittenSection();
        });
      });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.written.activeExamFilter = btn.getAttribute('data-filter');
        renderWrittenSection();
      });
    });

    if (el.modePracticeBtn) {
      el.modePracticeBtn.addEventListener('click', () => {
        state.written.mode = "practice";
        el.modePracticeBtn.classList.add('active');
        el.modeExamBtn.classList.remove('active');
      });
    }

    if (el.modeExamBtn) {
      el.modeExamBtn.addEventListener('click', () => {
        state.written.mode = "exam";
        el.modeExamBtn.classList.add('active');
        el.modePracticeBtn.classList.remove('active');
      });
    }

    if (el.submitExamBtn) el.submitExamBtn.addEventListener('click', submitWrittenExam);
  }

  // =========================================================================
  // BOOTSTRAP APP ON DOM LOAD
  // =========================================================================
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
