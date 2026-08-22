/**
 * OOP C++ EXAM MASTER - APPLICATION CORE
 * Quản lý toàn diện:
 *  0. ⭐ Đề Thi Chính Thức 2024-2025 (100 phút - 4 câu)
 *  1. 📝 Trắc Nghiệm Tiếng Anh (50 MCQs)
 *  2. 🔍 Dạng 2: Đọc Code Đoán Output & Bẫy Code (35 Bài - 2.0đ)
 *  3. 💻 Dạng 3: Viết Code C++ & Checklist Barem (16 Bài - 3.0đ)
 *  4. 🏛️ Dạng 4: Thiết Kế Kiến Trúc & Design Patterns (11 Bài - 3.0đ/4.0đ)
 *  5. ⚡ Sổ Tay 10 Bẫy Code & Đồng Hồ Bấm Giờ 100 Phút
 */

(function () {
  'use strict';

  // =========================================================================
  // STATE MANAGEMENT
  // =========================================================================
  const state = {
    activeMainSection: localStorage.getItem("oop_active_section") || "realExam", // 'realExam' | 'mcq' | 'trace' | 'writing' | 'pattern'
    theme: localStorage.getItem("oop_theme") || "dark",
    timer: {
      totalSeconds: 100 * 60,
      remainingSeconds: 100 * 60,
      intervalId: null,
      isRunning: false
    },
    // Real Exam State (2024-2025)
    realExam: {
      activeTab: "all",
      q1Answer: localStorage.getItem("oop_real_q1_ans") || "",
      q2Output: localStorage.getItem("oop_real_q2_out") || "",
      q2Checked: localStorage.getItem("oop_real_q2_chk") === "true",
      q3Code: localStorage.getItem("oop_real_q3_code") || (REAL_EXAM_2024_2025 ? REAL_EXAM_2024_2025.question3.starterCode : ""),
      q3Checklist: JSON.parse(localStorage.getItem("oop_real_q3_chk") || "{}"),
      q4Choice: parseInt(localStorage.getItem("oop_real_q4_choice") || "-1", 10),
      q4Evaluated: localStorage.getItem("oop_real_q4_eval") === "true"
    },
    // 1. MCQ State
    mcq: {
      activeChapter: "all",
      activeDifficulty: "all",
      searchQuery: "",
      mode: "practice",
      userAnswers: JSON.parse(localStorage.getItem("oop_mcq_answers") || "{}"),
      lastQuestionId: localStorage.getItem("oop_last_mcq_qid") || null,
      checkedQuestions: {},
      isSubmitted: false
    },
    // 2. Code Trace State (Dạng 2)
    trace: {
      activeChapter: "all",
      activeDifficulty: "all",
      searchQuery: "",
      mode: "practice",
      userAnswers: JSON.parse(localStorage.getItem("oop_trace_answers") || "{}"),
      lastQuestionId: localStorage.getItem("oop_last_trace_qid") || null,
      isSubmitted: false
    },
    // 3. Code Writing State (Dạng 3)
    writing: {
      activeChapter: "all",
      activeDifficulty: "all",
      searchQuery: "",
      userCode: JSON.parse(localStorage.getItem("oop_writing_codes") || "{}"),
      checklistState: JSON.parse(localStorage.getItem("oop_writing_checklists") || "{}"),
      lastQuestionId: localStorage.getItem("oop_last_writing_qid") || null
    },
    // 4. Design Pattern State (Dạng 4)
    pattern: {
      activeCategory: "all",
      activeDifficulty: "all",
      searchQuery: "",
      userChoices: JSON.parse(localStorage.getItem("oop_pattern_choices") || "{}"),
      lastQuestionId: localStorage.getItem("oop_last_pattern_qid") || null
    }
  };

  // =========================================================================
  // DOM ELEMENTS
  // =========================================================================
  const el = {
    // 5 Nav Switcher Buttons
    btnNavRealExam: document.getElementById("btnNavRealExam"),
    btnNavMCQ: document.getElementById("btnNavMCQ"),
    btnNavTrace: document.getElementById("btnNavTrace"),
    btnNavWriting: document.getElementById("btnNavWriting"),
    btnNavPattern: document.getElementById("btnNavPattern"),

    // 5 Section Containers
    realExamSection: document.getElementById("realExamSection"),
    mcqSection: document.getElementById("mcqSection"),
    codeTraceSection: document.getElementById("codeTraceSection"),
    codeWritingSection: document.getElementById("codeWritingSection"),
    designPatternSection: document.getElementById("designPatternSection"),

    // Real Exam Elements
    realExamQuestionTabs: document.getElementById("realExamQuestionTabs"),
    realExamCardsContainer: document.getElementById("realExamCardsContainer"),
    realExamSubmitBtn: document.getElementById("realExamSubmitBtn"),
    realExamScoreBadge: document.getElementById("realExamScoreBadge"),

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

    // Code Trace Elements
    traceChapterFilters: document.getElementById("traceChapterFilters"),
    traceModePracticeBtn: document.getElementById("traceModePracticeBtn"),
    traceModeExamBtn: document.getElementById("traceModeExamBtn"),
    traceSubmitBtn: document.getElementById("traceSubmitBtn"),
    traceResetBtn: document.getElementById("traceResetBtn"),
    traceAnsweredBadge: document.getElementById("traceAnsweredBadge"),
    traceScoreBadge: document.getElementById("traceScoreBadge"),
    traceSearchInput: document.getElementById("traceSearchInput"),
    traceCardsContainer: document.getElementById("traceCardsContainer"),
    traceGridNavigator: document.getElementById("traceGridNavigator"),
    traceSidebarProgressText: document.getElementById("traceSidebarProgressText"),

    // Code Writing Elements
    writingChapterFilters: document.getElementById("writingChapterFilters"),
    writingResetBtn: document.getElementById("writingResetBtn"),
    writingCompletedBadge: document.getElementById("writingCompletedBadge"),
    writingScoreBadge: document.getElementById("writingScoreBadge"),
    writingSearchInput: document.getElementById("writingSearchInput"),
    writingCardsContainer: document.getElementById("writingCardsContainer"),
    writingGridNavigator: document.getElementById("writingGridNavigator"),
    writingSidebarProgressText: document.getElementById("writingSidebarProgressText"),

    // Design Pattern Elements
    patternCategoryFilters: document.getElementById("patternCategoryFilters"),
    patternResetBtn: document.getElementById("patternResetBtn"),
    patternCompletedBadge: document.getElementById("patternCompletedBadge"),
    patternScoreBadge: document.getElementById("patternScoreBadge"),
    patternSearchInput: document.getElementById("patternSearchInput"),
    patternCardsContainer: document.getElementById("patternCardsContainer"),
    patternGridNavigator: document.getElementById("patternGridNavigator"),
    patternSidebarProgressText: document.getElementById("patternSidebarProgressText")
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
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/`([^`]+)`/g, '<code style="background:rgba(59,130,246,0.15);color:#38bdf8;padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:0.9em;">$1</code>');
    html = html.replace(/\$([^\$]+)\$/g, '<em style="font-family:var(--font-mono);color:#93c5fd;">$1</em>');
    html = html.replace(/\n/g, '<br/>');
    return html;
  }

  function saveMCQAnswers() {
    localStorage.setItem("oop_mcq_answers", JSON.stringify(state.mcq.userAnswers));
  }

  function saveTraceAnswers() {
    localStorage.setItem("oop_trace_answers", JSON.stringify(state.trace.userAnswers));
  }

  function saveWritingData() {
    localStorage.setItem("oop_writing_codes", JSON.stringify(state.writing.userCode));
    localStorage.setItem("oop_writing_checklists", JSON.stringify(state.writing.checklistState));
  }

  function savePatternData() {
    localStorage.setItem("oop_pattern_choices", JSON.stringify(state.pattern.userChoices));
  }

  function saveRealExamData() {
    localStorage.setItem("oop_real_q1_ans", state.realExam.q1Answer);
    localStorage.setItem("oop_real_q2_out", state.realExam.q2Output);
    localStorage.setItem("oop_real_q2_chk", state.realExam.q2Checked ? "true" : "false");
    localStorage.setItem("oop_real_q3_code", state.realExam.q3Code);
    localStorage.setItem("oop_real_q3_chk", JSON.stringify(state.realExam.q3Checklist));
    localStorage.setItem("oop_real_q4_choice", state.realExam.q4Choice.toString());
    localStorage.setItem("oop_real_q4_eval", state.realExam.q4Evaluated ? "true" : "false");
  }

  // =========================================================================
  // INITIALIZATION
  // =========================================================================
  function init() {
    // 1. Theme
    document.documentElement.setAttribute("data-theme", state.theme);
    updateThemeIcon();

    // 2. Restore active section
    switchMainSection(state.activeMainSection);

    // 3. Render All 5 Sections
    renderRealExamSection();
    renderMCQSection();
    renderTraceSection();
    renderWritingSection();
    renderPatternSection();

    // 4. Render Cheatsheet
    renderTrapCheatsheet();

    // 5. Global Event Listeners
    setupGlobalEventListeners();

    // Expose helpers for inline calls
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
      state.mcq.lastQuestionId = qId;
      localStorage.setItem("oop_last_mcq_qid", qId);
      renderMCQGridNavigator();
      scrollToCard(`mcq_card_${qId}`, "var(--primary)");
    };

    window.filterTraceChapter = function (ch) {
      state.trace.activeChapter = ch;
      if (el.traceChapterFilters) {
        el.traceChapterFilters.querySelectorAll('.filter-chip').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-trace-chapter') === ch);
        });
      }
      renderTraceSection();
    };

    window.scrollTraceQuestion = function (qId) {
      state.trace.lastQuestionId = qId;
      localStorage.setItem("oop_last_trace_qid", qId);
      renderTraceGridNavigator();
      scrollToCard(`trace_card_${qId}`, "var(--warning)");
    };

    window.filterWritingChapter = function (ch) {
      state.writing.activeChapter = ch;
      if (el.writingChapterFilters) {
        el.writingChapterFilters.querySelectorAll('.filter-chip').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-writing-chapter') === ch);
        });
      }
      renderWritingSection();
    };

    window.scrollWritingQuestion = function (qId) {
      state.writing.lastQuestionId = qId;
      localStorage.setItem("oop_last_writing_qid", qId);
      renderWritingGridNavigator();
      scrollToCard(`writing_card_${qId}`, "var(--cyan)");
    };

    window.filterPatternCategory = function (cat) {
      state.pattern.activeCategory = cat;
      if (el.patternCategoryFilters) {
        el.patternCategoryFilters.querySelectorAll('.filter-chip').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-pattern-cat') === cat);
        });
      }
      renderPatternSection();
    };

    window.scrollPatternQuestion = function (qId) {
      state.pattern.lastQuestionId = qId;
      localStorage.setItem("oop_last_pattern_qid", qId);
      renderPatternGridNavigator();
      scrollToCard(`pattern_card_${qId}`, "var(--success)");
    };
  }

  function scrollToCard(cardId, glowColor) {
    const target = document.getElementById(cardId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.style.boxShadow = `0 0 0 2px ${glowColor}, 0 0 20px ${glowColor}55`;
      setTimeout(() => { target.style.boxShadow = ""; }, 1500);
    }
  }

  function switchMainSection(section) {
    state.activeMainSection = section;
    localStorage.setItem("oop_active_section", section);

    // Buttons
    if (el.btnNavRealExam) el.btnNavRealExam.classList.toggle('active', section === 'realExam');
    if (el.btnNavMCQ) el.btnNavMCQ.classList.toggle('active', section === 'mcq');
    if (el.btnNavTrace) el.btnNavTrace.classList.toggle('active', section === 'trace');
    if (el.btnNavWriting) el.btnNavWriting.classList.toggle('active', section === 'writing');
    if (el.btnNavPattern) el.btnNavPattern.classList.toggle('active', section === 'pattern');

    // Sections
    if (el.realExamSection) el.realExamSection.style.display = (section === 'realExam') ? 'block' : 'none';
    if (el.mcqSection) el.mcqSection.style.display = (section === 'mcq') ? 'block' : 'none';
    if (el.codeTraceSection) el.codeTraceSection.style.display = (section === 'trace') ? 'block' : 'none';
    if (el.codeWritingSection) el.codeWritingSection.style.display = (section === 'writing') ? 'block' : 'none';
    if (el.designPatternSection) el.designPatternSection.style.display = (section === 'pattern') ? 'block' : 'none';
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
      if (state.timer.remainingSeconds <= 300) box.className = "timer-box danger";
      else if (state.timer.remainingSeconds <= 900) box.className = "timer-box warning";
      else box.className = "timer-box";
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
          alert("⏰ Hết 100 phút làm bài thi!");
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
  // PHÂN HỆ 0: ĐỀ THI CHÍNH THỨC 2024-2025 (4 CÂU)
  // =========================================================================
  function renderRealExamSection() {
    if (!el.realExamCardsContainer || typeof REAL_EXAM_2024_2025 === "undefined") return;

    const exam = REAL_EXAM_2024_2025;
    const tab = state.realExam.activeTab;

    let q1Score = 0;
    if (state.realExam.q1Answer.trim().length > 20) q1Score = 1.0;

    let q2Score = 0;
    const cleanQ2User = state.realExam.q2Output.trim().replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ');
    const cleanQ2Exp = exam.question2.expectedOutput.trim().replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ');
    if (state.realExam.q2Checked && cleanQ2User === cleanQ2Exp) q2Score = 2.0;

    let q3Score = 0;
    (exam.question3.checklist || []).forEach(c => {
      if (state.realExam.q3Checklist[c.id]) q3Score += c.points;
    });

    let q4Score = 0;
    if (state.realExam.q4Evaluated && state.realExam.q4Choice === 0) q4Score = 4.0;

    const totalRealScore = (q1Score + q2Score + q3Score + q4Score).toFixed(1);
    if (el.realExamScoreBadge) el.realExamScoreBadge.textContent = `${totalRealScore} / 10.0đ`;

    // Render HTML for each question
    const q1Visible = tab === "all" || tab === "q1";
    const q2Visible = tab === "all" || tab === "q2";
    const q3Visible = tab === "all" || tab === "q3";
    const q4Visible = tab === "all" || tab === "q4";

    let html = "";

    // CÂU 1
    if (q1Visible) {
      html += `
        <div class="question-card fade-in" id="real_q1_card">
          <div class="question-header">
            <div class="question-title-area">
              <span class="q-badge q-badge-c1">CÂU 1 · LÝ THUYẾT (1.0đ)</span>
              <h3 class="question-title">${escapeHtml(exam.question1.title)}</h3>
            </div>
            <span class="badge badge-blue">${q1Score.toFixed(1)} / 1.0đ</span>
          </div>
          <div class="question-body">
            <div style="font-size:14px; font-weight:600; color:var(--text-primary); margin-bottom:12px;">
              ${escapeHtml(exam.question1.questionText)}
            </div>
            <textarea class="output-textarea" id="real_q1_input" placeholder="Gõ câu trả lời phân biệt static và non-static của bạn vào đây (tiếng Anh hoặc tiếng Việt)..." style="min-height:100px; margin-bottom:12px;">${escapeHtml(state.realExam.q1Answer)}</textarea>
            <button class="btn btn-secondary btn-sm btn-toggle-real-q1-ans">
              📖 Xem Lời Giải & Barem Chấm Điểm Chuẩn Của Giảng Viên
            </button>
            <div id="real_q1_rubric" style="display:none; margin-top:14px; background:var(--bg-card-alt); border-left:4px solid var(--primary); padding:16px; border-radius:var(--radius-md);">
              ${formatMarkdown(exam.question1.rubricAnswer)}
            </div>
          </div>
        </div>
      `;
    }

    // CÂU 2
    if (q2Visible) {
      const isQ2Correct = cleanQ2User === cleanQ2Exp;
      let q2MatchBadge = state.realExam.q2Checked ? (isQ2Correct ? '<span class="badge badge-green">✓ Khớp 100% (+2.0đ)</span>' : '<span class="badge badge-red">✕ Chưa khớp Output</span>') : '<span class="badge badge-blue">Chưa kiểm tra</span>';
      
      const q2StepsHtml = (exam.question2.subQuestions[1].stepByStep || []).map(s => `
        <div class="trace-step-item">
          <div class="step-num">${s.step}</div>
          <div class="step-content">
            <div><strong>${escapeHtml(s.line)}</strong></div>
            <div style="font-size:13px; color:var(--text-secondary); margin-top:4px;">${formatMarkdown(s.explanation)}</div>
          </div>
        </div>
      `).join("");

      html += `
        <div class="question-card fade-in" id="real_q2_card">
          <div class="question-header">
            <div class="question-title-area">
              <span class="q-badge q-badge-c2">CÂU 2 · ĐỌC CODE ĐOÁN OUTPUT (2.0đ)</span>
              <h3 class="question-title">${escapeHtml(exam.question2.title)}</h3>
            </div>
            <span class="badge badge-blue">${q2Score.toFixed(1)} / 2.0đ</span>
          </div>
          <div class="question-body">
            <div class="code-container" style="margin-bottom:14px;">
              <div class="code-header">
                <span>C++ Source Code (Đề Thi Thật 2024-2025)</span>
                <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(\`${escapeHtml(exam.question2.code).replace(/`/g, '\\`')}\`); alert('Đã copy code!');" style="padding:2px 8px; font-size:11px;">Copy Code</button>
              </div>
              <pre class="code-content" style="font-size:12.5px;"><code>${escapeHtml(exam.question2.code)}</code></pre>
            </div>

            <div class="trace-input-section">
              <div>
                <div class="input-box-label">
                  <span>⌨️ Output dự đoán của bạn:</span>
                  <span style="font-size:11px; color:var(--text-muted);">Gõ đúng thứ tự 12 dòng</span>
                </div>
                <textarea class="output-textarea" id="real_q2_input" placeholder="Nhập 12 dòng output vào đây...">${escapeHtml(state.realExam.q2Output)}</textarea>
              </div>
              <div>
                <div class="input-box-label">
                  <span>📊 Kết quả so khớp Diff:</span>
                  <span>${q2MatchBadge}</span>
                </div>
                <div class="diff-box" id="real_q2_diff">
                  ${state.realExam.q2Checked ? `
                    <div style="font-size:12px; margin-bottom:4px; color:${isQ2Correct ? 'var(--success)' : '#fca5a5'}; font-weight:700;">
                      ${isQ2Correct ? '🎉 Chính xác 100%!' : '⚠️ Đáp án chuẩn của đề thi:'}
                    </div>
                    <pre style="background:rgba(16,185,129,0.1); border:1px solid var(--success); padding:6px; border-radius:4px; color:#6ee7b7; font-family:var(--font-mono); font-size:12px;"><code>${escapeHtml(exam.question2.expectedOutput)}</code></pre>
                  ` : '<span style="color:var(--text-muted); font-style:italic;">Nhập output và bấm "Kiểm tra Output"</span>'}
                </div>
              </div>
            </div>

            <div style="display:flex; gap:10px; margin-top:14px; flex-wrap:wrap;">
              <button class="btn btn-primary btn-sm" id="btn_check_real_q2">🔍 Kiểm Tra Output</button>
              <button class="btn btn-secondary btn-sm" id="btn_toggle_real_q2_steps">🔎 Xem Giải Thích Bẫy Từng Dòng</button>
            </div>

            <div class="trace-steps-accordion" id="real_q2_steps_box" style="display:none; margin-top:16px;">
              <div class="accordion-header"><span>🧠 GIẢI THÍCH CHI TIẾT 12 DÒNG OUTPUT & BẪY COPY CONSTRUCTOR</span></div>
              <div class="accordion-body">${q2StepsHtml}</div>
            </div>
          </div>
        </div>
      `;
    }

    // CÂU 3
    if (q3Visible) {
      const q3ChecklistHtml = (exam.question3.checklist || []).map(item => {
        const isChecked = !!state.realExam.q3Checklist[item.id];
        return `
          <label class="rubric-item" style="display:flex; align-items:center; gap:8px; padding:6px 0; cursor:pointer; font-size:13px;">
            <input type="checkbox" class="real-q3-check" data-cid="${item.id}" ${isChecked ? 'checked' : ''} style="width:16px; height:16px; cursor:pointer;" />
            <span style="flex:1; color:${isChecked ? 'var(--text-primary)' : 'var(--text-secondary)'};">${formatMarkdown(item.text)}</span>
          </label>
        `;
      }).join("");

      html += `
        <div class="question-card fade-in" id="real_q3_card">
          <div class="question-header">
            <div class="question-title-area">
              <span class="q-badge q-badge-c3">CÂU 3 · VIẾT CODE C++ (3.0đ)</span>
              <h3 class="question-title">${escapeHtml(exam.question3.title)}</h3>
            </div>
            <span class="badge badge-blue">${q3Score.toFixed(1)} / 3.0đ</span>
          </div>
          <div class="question-body">
            <div style="font-size:13.5px; line-height:1.6; margin-bottom:14px; color:var(--text-primary);">
              ${formatMarkdown(exam.question3.description)}
            </div>

            <div class="code-editor-wrapper" style="margin-bottom:16px;">
              <div class="code-editor-header" style="display:flex; justify-content:space-between; align-items:center; padding:8px 14px; background:var(--bg-primary); border-top-left-radius:var(--radius-md); border-top-right-radius:var(--radius-md); border:1px solid var(--border-color); border-bottom:none;">
                <span style="font-family:var(--font-mono); font-size:12px; color:var(--cyan); font-weight:600;">💻 Lớp Computer (Hỗ trợ Tab thụt lề)</span>
                <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(document.getElementById('real_q3_editor').value); alert('Đã copy code!');" style="padding:2px 8px; font-size:11px;">Copy Code</button>
              </div>
              <textarea class="code-editor-textarea" id="real_q3_editor" spellcheck="false" placeholder="Viết class Computer hoàn chỉnh...">${escapeHtml(state.realExam.q3Code)}</textarea>
            </div>

            <div class="rubric-container" style="background:var(--bg-card-alt); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px; margin-bottom:14px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; border-bottom:1px solid var(--border-color); padding-bottom:6px;">
                <span style="font-weight:700; font-size:13px; color:var(--cyan);">📋 Barem Tự Đánh Giá Lớp Computer:</span>
                <strong style="color:var(--success); font-family:var(--font-mono); font-size:13px;">${q3Score.toFixed(1)} / 3.0đ</strong>
              </div>
              <div class="rubric-list">${q3ChecklistHtml}</div>
            </div>

            <div>
              <button class="btn btn-secondary btn-sm" id="btn_toggle_real_q3_solution">
                ✨ Xem Mã Nguồn Chuẩn Lớp Computer Của Giảng Viên
              </button>
              <div id="real_q3_solution_box" style="display:none; margin-top:12px;">
                <div class="code-container">
                  <div class="code-header">
                    <span>Mã Nguồn Mẫu (Computer Class)</span>
                    <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(\`${escapeHtml(exam.question3.solutionCode).replace(/`/g, '\\`')}\`); alert('Đã copy code mẫu!');" style="padding:2px 8px; font-size:11px;">Copy Code Mẫu</button>
                  </div>
                  <pre class="code-content" style="font-size:12.5px;"><code>${escapeHtml(exam.question3.solutionCode)}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // CÂU 4
    if (q4Visible) {
      const q4TestRows = (exam.question4.testCases || []).map((tc, idx) => `
        <tr>
          <td style="padding:6px 12px; border-bottom:1px solid var(--border-color); font-family:var(--font-mono); color:var(--cyan);">Test ${idx + 1}: ${escapeHtml(tc.input)}</td>
          <td style="padding:6px 12px; border-bottom:1px solid var(--border-color); font-family:var(--font-mono); color:var(--success);">${escapeHtml(tc.expected)}</td>
        </tr>
      `).join("");

      const q4RoleRows = (exam.question4.roleMapping || []).map(r => `
        <tr>
          <td style="padding:6px 12px; border-bottom:1px solid var(--border-color); font-weight:700; color:var(--cyan);">${escapeHtml(r.role)}</td>
          <td style="padding:6px 12px; border-bottom:1px solid var(--border-color); font-family:var(--font-mono); color:var(--warning);">${escapeHtml(r.className)}</td>
          <td style="padding:6px 12px; border-bottom:1px solid var(--border-color); color:var(--text-secondary);">${formatMarkdown(r.description)}</td>
        </tr>
      `).join("");

      html += `
        <div class="question-card fade-in" id="real_q4_card">
          <div class="question-header">
            <div class="question-title-area">
              <span class="q-badge q-badge-c4">CÂU 4 · THIẾT KẾ KIẾN TRÚC ENTERPRISE (4.0đ)</span>
              <h3 class="question-title">${escapeHtml(exam.question4.title)}</h3>
            </div>
            <span class="badge badge-blue">${q4Score.toFixed(1)} / 4.0đ</span>
          </div>
          <div class="question-body">
            <div style="background:var(--bg-card-alt); border-left:4px solid var(--cyan); padding:14px; border-radius:var(--radius-sm); margin-bottom:16px;">
              <h4 style="font-size:13px; color:var(--cyan); margin-bottom:6px;">📌 TÌNH HUỐNG THỰC TẾ & GOOGLE STYLE EXPECTED&lt;T&gt;:</h4>
              <div style="font-size:13.5px; line-height:1.6; color:var(--text-primary);">${formatMarkdown(exam.question4.scenario)}</div>
            </div>

            <!-- Test Cases Table -->
            <div style="margin-bottom:16px;">
              <h4 style="font-size:13px; color:var(--warning); margin-bottom:6px;">🧪 5 TEST CASES BẮT BUỘC ĐỀ THI YÊU CẦU:</h4>
              <table style="width:100%; border-collapse:collapse; background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-sm); font-size:12.5px;">
                <thead>
                  <tr style="background:var(--bg-card-alt); text-align:left;">
                    <th style="padding:6px 12px; border-bottom:1px solid var(--border-color);">Dữ Liệu Nhập (Console Input)</th>
                    <th style="padding:6px 12px; border-bottom:1px solid var(--border-color);">Kết Quả Xuất Mong Đợi (Expected Output)</th>
                  </tr>
                </thead>
                <tbody>${q4TestRows}</tbody>
              </table>
            </div>

            <!-- Role Mapping -->
            <div style="margin-bottom:16px;">
              <h4 style="font-size:13px; color:var(--cyan); margin-bottom:6px;">🏛️ BẢNG PHÂN RÃ VAI TRÒ KIẾN TRÚC VALIDATOR:</h4>
              <table style="width:100%; border-collapse:collapse; background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-sm); font-size:12.5px;">
                <thead>
                  <tr style="background:var(--bg-card-alt); text-align:left;">
                    <th style="padding:6px 12px; border-bottom:1px solid var(--border-color);">Vai Trò (Role)</th>
                    <th style="padding:6px 12px; border-bottom:1px solid var(--border-color);">Tên Lớp (Class)</th>
                    <th style="padding:6px 12px; border-bottom:1px solid var(--border-color);">Mô Tả Nhiệm Vụ</th>
                  </tr>
                </thead>
                <tbody>${q4RoleRows}</tbody>
              </table>
            </div>

            <!-- UML Diagram -->
            <div style="margin-bottom:16px;">
              <h4 style="font-size:13px; color:var(--text-primary); margin-bottom:6px;">📊 SƠ ĐỒ LỚP UML (CLASS DIAGRAM):</h4>
              <pre style="background:var(--bg-primary); border:1px solid var(--border-color); padding:14px; border-radius:var(--radius-md); color:#38bdf8; font-family:var(--font-mono); font-size:12px; line-height:1.4; overflow-x:auto;"><code>${escapeHtml(exam.question4.umlDiagram)}</code></pre>
            </div>

            <!-- C++ Solution Skeleton -->
            <div>
              <button class="btn btn-secondary btn-sm" id="btn_toggle_real_q4_code">
                🏛️ Xem Toàn Bộ Mã Nguồn C++ Hoàn Chỉnh (Vượt Qua 5 Test Cases)
              </button>
              <div id="real_q4_code_box" style="display:none; margin-top:12px;">
                <div class="code-container">
                  <div class="code-header">
                    <span>Full C++ Solution (Google Style Validator Architecture)</span>
                    <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(\`${escapeHtml(exam.question4.solutionCode).replace(/`/g, '\\`')}\`); alert('Đã copy toàn bộ mã nguồn Câu 4!');" style="padding:2px 8px; font-size:11px;">Copy Code Câu 4</button>
                  </div>
                  <pre class="code-content" style="font-size:12.5px;"><code>${escapeHtml(exam.question4.solutionCode)}</code></pre>
                </div>
              </div>
            </div>

          </div>
        </div>
      `;
    }

    el.realExamCardsContainer.innerHTML = html;
    attachRealExamListeners();
  }

  function attachRealExamListeners() {
    // Q1 Input & Rubric
    const q1Input = document.getElementById("real_q1_input");
    if (q1Input) {
      q1Input.addEventListener("input", () => {
        state.realExam.q1Answer = q1Input.value;
        saveRealExamData();
        renderRealExamSection();
      });
    }
    const btnToggleQ1Rubric = document.querySelector(".btn-toggle-real-q1-ans");
    if (btnToggleQ1Rubric) {
      btnToggleQ1Rubric.addEventListener("click", () => {
        const box = document.getElementById("real_q1_rubric");
        if (box) box.style.display = box.style.display === "none" ? "block" : "none";
      });
    }

    // Q2 Check & Steps
    const q2Input = document.getElementById("real_q2_input");
    if (q2Input) {
      q2Input.addEventListener("input", () => {
        state.realExam.q2Output = q2Input.value;
        saveRealExamData();
      });
    }
    const btnCheckQ2 = document.getElementById("btn_check_real_q2");
    if (btnCheckQ2) {
      btnCheckQ2.addEventListener("click", () => {
        state.realExam.q2Checked = true;
        saveRealExamData();
        renderRealExamSection();
      });
    }
    const btnToggleQ2Steps = document.getElementById("btn_toggle_real_q2_steps");
    if (btnToggleQ2Steps) {
      btnToggleQ2Steps.addEventListener("click", () => {
        const box = document.getElementById("real_q2_steps_box");
        if (box) box.style.display = box.style.display === "none" ? "block" : "none";
      });
    }

    // Q3 Editor & Checklist & Solution
    const q3Editor = document.getElementById("real_q3_editor");
    if (q3Editor) {
      q3Editor.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          e.preventDefault();
          const start = q3Editor.selectionStart;
          const end = q3Editor.selectionEnd;
          q3Editor.value = q3Editor.value.substring(0, start) + "    " + q3Editor.value.substring(end);
          q3Editor.selectionStart = q3Editor.selectionEnd = start + 4;
        }
      });
      q3Editor.addEventListener("input", () => {
        state.realExam.q3Code = q3Editor.value;
        saveRealExamData();
      });
    }
    document.querySelectorAll(".real-q3-check").forEach(cb => {
      cb.addEventListener("change", () => {
        const cId = cb.getAttribute("data-cid");
        state.realExam.q3Checklist[cId] = cb.checked;
        saveRealExamData();
        renderRealExamSection();
      });
    });
    const btnToggleQ3Sol = document.getElementById("btn_toggle_real_q3_solution");
    if (btnToggleQ3Sol) {
      btnToggleQ3Sol.addEventListener("click", () => {
        const box = document.getElementById("real_q3_solution_box");
        if (box) box.style.display = box.style.display === "none" ? "block" : "none";
      });
    }

    // Q4 Toggle Code
    const btnToggleQ4Code = document.getElementById("btn_toggle_real_q4_code");
    if (btnToggleQ4Code) {
      btnToggleQ4Code.addEventListener("click", () => {
        const box = document.getElementById("real_q4_code_box");
        if (box) box.style.display = box.style.display === "none" ? "block" : "none";
      });
    }
  }

  function submitRealExam() {
    state.realExam.q2Checked = true;
    state.realExam.q4Evaluated = true;
    saveRealExamData();
    renderRealExamSection();

    const exam = REAL_EXAM_2024_2025;
    let q1Score = state.realExam.q1Answer.trim().length > 20 ? 1.0 : 0.0;
    
    const cleanQ2User = state.realExam.q2Output.trim().replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ');
    const cleanQ2Exp = exam.question2.expectedOutput.trim().replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ');
    let q2Score = (cleanQ2User === cleanQ2Exp) ? 2.0 : 0.0;

    let q3Score = 0;
    (exam.question3.checklist || []).forEach(c => {
      if (state.realExam.q3Checklist[c.id]) q3Score += c.points;
    });

    let q4Score = 4.0; // Assume complete if checked
    const total = (q1Score + q2Score + q3Score + q4Score).toFixed(1);

    if (el.summaryContent) {
      el.summaryContent.innerHTML = `
        <div style="text-align:center; padding:10px 0 20px;">
          <div style="font-size:48px; font-weight:800; color:var(--warning); font-family:var(--font-mono);">${total} / 10.0đ</div>
          <div style="font-size:16px; font-weight:700; color:var(--text-primary); margin-top:4px;">Kết Quả Đề Thi Chính Thức (HK3 / 2024-2025)</div>
          <div style="color:var(--text-secondary); font-size:13px; margin-top:4px;">Thời gian tiêu chuẩn: 100 phút</div>
        </div>

        <div style="margin-top:16px;">
          <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-primary); border-radius:6px; margin-bottom:6px; font-size:13px;">
            <span>Câu 1 (Lý thuyết Static vs Non-static):</span>
            <strong style="color:var(--success); font-family:var(--font-mono);">${q1Score.toFixed(1)} / 1.0đ</strong>
          </div>
          <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-primary); border-radius:6px; margin-bottom:6px; font-size:13px;">
            <span>Câu 2 (Đọc code Shape & Rectangle):</span>
            <strong style="color:${q2Score === 2.0 ? 'var(--success)' : 'var(--danger)'}; font-family:var(--font-mono);">${q2Score.toFixed(1)} / 2.0đ</strong>
          </div>
          <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-primary); border-radius:6px; margin-bottom:6px; font-size:13px;">
            <span>Câu 3 (Viết code lớp Computer):</span>
            <strong style="color:var(--success); font-family:var(--font-mono);">${q3Score.toFixed(1)} / 3.0đ</strong>
          </div>
          <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-primary); border-radius:6px; margin-bottom:6px; font-size:13px;">
            <span>Câu 4 (Validator Architecture Google Style):</span>
            <strong style="color:var(--success); font-family:var(--font-mono);">${q4Score.toFixed(1)} / 4.0đ</strong>
          </div>
        </div>

        <div style="margin-top:20px; text-align:center;">
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('summaryModal').classList.remove('active');">
            🔍 Xem Lại Bài Làm Chi Tiết
          </button>
        </div>
      `;
    }
    if (el.summaryModal) el.summaryModal.classList.add('active');
  }

  // =========================================================================
  // PHÂN HỆ 1: 50 ENGLISH MCQs ENGINE
  // =========================================================================
  function renderMCQSection() {
    const questions = filterMCQQuestions();
    renderMCQCards(questions);
    renderMCQGridNavigator();
    updateMCQStats();
  }

  function filterMCQQuestions() {
    return MCQ_ENGLISH_50.filter(q => {
      if (state.mcq.activeChapter !== "all" && q.chapter !== state.mcq.activeChapter) return false;
      if (state.mcq.activeDifficulty !== "all" && q.difficulty !== state.mcq.activeDifficulty) return false;
      if (state.mcq.searchQuery.trim() !== "") {
        const query = state.mcq.searchQuery.toLowerCase();
        const matchQ = q.question.toLowerCase().includes(query);
        const matchCode = q.code && q.code.toLowerCase().includes(query);
        const matchTags = q.tags && q.tags.some(t => t.toLowerCase().includes(query));
        const matchExp = q.explanation && q.explanation.toLowerCase().includes(query);
        if (!matchQ && !matchCode && !matchTags && !matchExp) return false;
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

      const optionsHtml = q.options.map((optText, optIdx) => {
        let itemClass = "mcq-option-item";
        const isSelected = savedAnswer === optIdx;
        if (isSelected) itemClass += " selected";

        if (isChecked) {
          if (optIdx === q.correctIndex) itemClass += " is-correct";
          else if (isSelected && optIdx !== q.correctIndex) itemClass += " is-wrong";
        }

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

      const codeHtml = q.code ? `
        <div class="code-container" style="margin-bottom:16px;">
          <div class="code-header">
            <span>C++ Snippet</span>
            <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(\`${escapeHtml(q.code).replace(/`/g, '\\`')}\`); alert('Copied code!');" style="padding:2px 8px; font-size:11px;">Copy</button>
          </div>
          <pre class="code-content" style="font-size:12.5px;"><code>${escapeHtml(q.code)}</code></pre>
        </div>
      ` : "";

      const tagsHtml = (q.tags || []).map(t => `<span class="mcq-tag-pill">#${escapeHtml(t)}</span>`).join(" ");

      let diffBadge = "";
      if (q.difficulty === "easy") diffBadge = '<span class="diff-badge diff-easy">🟢 Easy</span>';
      else if (q.difficulty === "medium") diffBadge = '<span class="diff-badge diff-medium">🟡 Medium</span>';
      else if (q.difficulty === "hard") diffBadge = '<span class="diff-badge diff-hard">🔴 Hard / Trap</span>';

      let statusIndicator = "";
      if (isChecked) {
        statusIndicator = isCorrect
          ? `<span style="color:var(--success); font-size:13px; font-weight:700;">✓ Correct (+1.0)</span>`
          : `<span style="color:var(--danger); font-size:13px; font-weight:700;">✕ Incorrect (Correct: ${letters[q.correctIndex]})</span>`;
      } else if (savedAnswer !== undefined) {
        statusIndicator = `<span style="color:var(--cyan); font-size:12.5px;">Đã chọn: ${letters[savedAnswer]}</span>`;
      }

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

          <div class="mcq-question-text">${formatMarkdown(q.question)}</div>
          ${codeHtml}
          <div class="mcq-options-container">${optionsHtml}</div>

          <div class="mcq-actions-bar">
            <div>${statusIndicator}</div>
            <div style="display:flex; gap:8px;">
              ${state.mcq.mode === "practice" ? `
                <button class="btn btn-secondary btn-sm btn-mcq-check" data-qid="${q.id}">
                  ${isChecked ? '📖 Xem Giải Thích' : '✓ Kiểm Tra Ngay'}
                </button>
              ` : `
                <span style="font-size:12px; color:var(--text-muted);">Chế độ thi thử</span>
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
    document.querySelectorAll('.mcq-option-item').forEach(item => {
      item.addEventListener('click', () => {
        const qId = item.getAttribute('data-qid');
        const optIdx = parseInt(item.getAttribute('data-opt-idx'), 10);

        state.mcq.userAnswers[qId] = optIdx;
        state.mcq.lastQuestionId = qId;
        localStorage.setItem("oop_last_mcq_qid", qId);
        saveMCQAnswers();

        if (state.mcq.mode === "practice") {
          state.mcq.checkedQuestions[qId] = true;
        }

        renderMCQSection();
      });
    });

    document.querySelectorAll('.btn-mcq-check').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.getAttribute('data-qid');
        state.mcq.lastQuestionId = qId;
        localStorage.setItem("oop_last_mcq_qid", qId);
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

      if (q.id === state.mcq.lastQuestionId) btnClass += " last-active";

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

    if (el.mcqAnsweredBadge) el.mcqAnsweredBadge.textContent = `${answeredCount} / ${total}`;
    if (el.sidebarProgressText) el.sidebarProgressText.textContent = `${answeredCount}/${total} (${Math.round((answeredCount / total) * 100)}%)`;
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

    MCQ_ENGLISH_50.forEach(q => {
      const ans = state.mcq.userAnswers[q.id];
      if (ans !== undefined) {
        answeredCount++;
        if (ans === q.correctIndex) correctCount++;
      }
    });

    renderMCQSection();

    const finalScore = ((correctCount / total) * 10).toFixed(2);
    if (el.summaryContent) {
      el.summaryContent.innerHTML = `
        <div style="text-align:center; padding:10px 0 20px;">
          <div style="font-size:48px; font-weight:800; color:var(--success); font-family:var(--font-mono);">${finalScore} / 10.0</div>
          <div style="font-size:16px; font-weight:700; color:var(--text-primary); margin-top:4px;">Kết Quả 50 Câu Trắc Nghiệm Tiếng Anh</div>
          <div style="color:var(--text-secondary); font-size:13px; margin-top:4px;">Đúng ${correctCount} / ${total} câu</div>
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
  // PHÂN HỆ 2: DẠNG 2 - ĐỌC CODE ĐOÁN OUTPUT ENGINE (35 BÀI)
  // =========================================================================
  function renderTraceSection() {
    const questions = filterTraceQuestions();
    renderTraceCards(questions);
    renderTraceGridNavigator();
    updateTraceStats();
  }

  function filterTraceQuestions() {
    return CODE_TRACE_BANK.filter(q => {
      if (state.trace.activeChapter !== "all" && q.chapter !== state.trace.activeChapter) return false;
      if (state.trace.activeDifficulty !== "all" && q.difficulty !== state.trace.activeDifficulty) return false;
      if (state.trace.searchQuery.trim() !== "") {
        const query = state.trace.searchQuery.toLowerCase();
        const matchTitle = q.title.toLowerCase().includes(query);
        const matchCode = q.code.toLowerCase().includes(query);
        const matchTrap = q.trapRef && q.trapRef.toLowerCase().includes(query);
        const matchTags = q.tags && q.tags.some(t => t.toLowerCase().includes(query));
        if (!matchTitle && !matchCode && !matchTrap && !matchTags) return false;
      }
      return true;
    });
  }

  function renderTraceCards(questions) {
    if (!el.traceCardsContainer) return;

    if (questions.length === 0) {
      el.traceCardsContainer.innerHTML = `
        <div style="text-align:center; padding:50px 20px; background:var(--bg-card); border-radius:var(--radius-lg); border:1px solid var(--border-color); color:var(--text-secondary);">
          <p style="font-size:18px; font-weight:600; margin-bottom:8px;">🔍 Không tìm thấy bài tập nào phù hợp với bộ lọc.</p>
          <button class="btn btn-primary btn-sm" onclick="window.filterTraceChapter('all')">Xem tất cả 35 bài</button>
        </div>
      `;
      return;
    }

    el.traceCardsContainer.innerHTML = questions.map(q => {
      const savedData = state.trace.userAnswers[q.id] || { userOutput: "", isChecked: false, isCorrect: false };
      const isChecked = savedData.isChecked || state.trace.isSubmitted;
      const isCorrect = savedData.isCorrect;

      let diffBadge = "";
      if (q.difficulty === "easy") diffBadge = '<span class="diff-badge diff-easy">🟢 Easy</span>';
      else if (q.difficulty === "medium") diffBadge = '<span class="diff-badge diff-medium">🟡 Medium</span>';
      else if (q.difficulty === "hard") diffBadge = '<span class="diff-badge diff-hard">🔴 Hard / Bẫy</span>';

      const tagsHtml = (q.tags || []).map(t => `<span class="mcq-tag-pill">#${escapeHtml(t)}</span>`).join(" ");

      const trapBadge = q.trapRef ? `
        <div style="margin-top:8px; font-size:12.5px; color:#fca5a5; background:rgba(239,68,68,0.1); padding:4px 10px; border-radius:4px; border-left:3px solid var(--danger);">
          ⚠️ <strong>Điểm bẫy:</strong> ${escapeHtml(q.trapRef)}
        </div>
      ` : "";

      const stepsHtml = (q.stepByStepAnalysis || []).map(step => `
        <div class="trace-step-item">
          <div class="step-num">${step.step}</div>
          <div class="step-content">
            <div><strong>${escapeHtml(step.line)}</strong></div>
            <div style="font-size:13px; color:var(--text-secondary); margin-top:4px;">${formatMarkdown(step.explanation)}</div>
          </div>
        </div>
      `).join("");

      let matchBadgeHtml = '<span class="badge badge-blue">Chưa kiểm tra</span>';
      let diffContentHtml = '<span style="color:var(--text-muted); font-style:italic;">Nhập output bên trái rồi bấm "Kiểm tra Output" để so sánh với kết quả thực thi.</span>';

      if (isChecked) {
        if (isCorrect) {
          matchBadgeHtml = '<span class="badge badge-green">✓ Khớp 100% (+2.0đ)</span>';
          diffContentHtml = `
            <div style="color:var(--success); font-weight:700; margin-bottom:4px;">🎉 Chính xác tuyệt đối! Output khớp hoàn toàn:</div>
            <pre style="background:rgba(16,185,129,0.1); border:1px solid var(--success); padding:8px; border-radius:4px; color:#6ee7b7; font-family:var(--font-mono); font-size:12.5px;"><code>${escapeHtml(q.expectedOutput)}</code></pre>
          `;
        } else {
          matchBadgeHtml = '<span class="badge badge-red">✕ Chưa khớp Output</span>';
          diffContentHtml = `
            <div style="margin-bottom:6px; color:#fca5a5; font-size:12.5px;">⚠️ <strong>Đáp án chưa khớp:</strong></div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:12px;">
              <div>
                <span style="color:var(--text-muted);">Output bạn nhập:</span>
                <pre style="background:rgba(239,68,68,0.1); border:1px solid var(--danger); padding:6px; border-radius:4px; color:#fca5a5; margin-top:2px; font-family:var(--font-mono);"><code>${escapeHtml(savedData.userOutput || "(Trống)")}</code></pre>
              </div>
              <div>
                <span style="color:var(--text-muted);">Output chuẩn:</span>
                <pre style="background:rgba(16,185,129,0.1); border:1px solid var(--success); padding:6px; border-radius:4px; color:#6ee7b7; margin-top:2px; font-family:var(--font-mono);"><code>${escapeHtml(q.expectedOutput)}</code></pre>
              </div>
            </div>
          `;
        }
      }

      return `
        <div class="question-card fade-in" id="trace_card_${q.id}" data-qid="${q.id}">
          <div class="question-header">
            <div class="question-title-area">
              <span class="q-badge q-badge-c2">BÀI ${q.number} · DẠNG 2 (2.0đ)</span>
              <h3 class="question-title">${escapeHtml(q.title)}</h3>
            </div>
            <div class="question-meta">${diffBadge}</div>
          </div>

          <div class="question-body">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap;">
              <span style="font-size:12px; color:var(--text-muted);">Chủ đề: <strong>${escapeHtml(q.chapterName)}</strong></span>
              <div style="display:flex; gap:6px;">${tagsHtml}</div>
            </div>

            ${trapBadge}

            <div class="code-container" style="margin-top:12px; margin-bottom:16px;">
              <div class="code-header">
                <span>Source Code (C++)</span>
                <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(\`${escapeHtml(q.code).replace(/`/g, '\\`')}\`); alert('Đã copy code!');" style="padding:2px 8px; font-size:11px;">Copy Code</button>
              </div>
              <pre class="code-content" style="font-size:12.5px;"><code>${escapeHtml(q.code)}</code></pre>
            </div>

            <div class="trace-input-section">
              <div>
                <div class="input-box-label">
                  <span>⌨️ Output của bạn:</span>
                  <span style="font-size:11px; color:var(--text-muted);">Gõ chính xác khoảng trắng & xuống dòng</span>
                </div>
                <textarea class="output-textarea" id="trace_input_${q.id}" placeholder="Nhập chuỗi output bạn đoán vào đây...">${escapeHtml(savedData.userOutput)}</textarea>
              </div>
              <div>
                <div class="input-box-label">
                  <span>📊 Kết quả so sánh (Diff Check):</span>
                  <span id="trace_badge_${q.id}">${matchBadgeHtml}</span>
                </div>
                <div class="diff-box" id="trace_diff_${q.id}">
                  ${diffContentHtml}
                </div>
              </div>
            </div>

            <div style="display:flex; gap:10px; margin-top:14px; flex-wrap:wrap;">
              <button class="btn btn-primary btn-sm btn-check-trace-item" data-qid="${q.id}">
                🔍 Kiểm tra Output
              </button>
              <button class="btn btn-secondary btn-sm btn-toggle-trace-accordion" data-qid="${q.id}">
                🔎 Xem phân tích từng bước (Step-by-step trace)
              </button>
            </div>

            <div class="trace-steps-accordion" id="trace_steps_${q.id}" style="display:none; margin-top:16px;">
              <div class="accordion-header">
                <span>🧠 GIẢI THÍCH CHI TIẾT TỪNG BƯỚC THỰC THI & BẢN CHẤT BẪY CODE</span>
              </div>
              <div class="accordion-body">${stepsHtml}</div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    attachTraceListeners();
  }

  function attachTraceListeners() {
    document.querySelectorAll('.output-textarea').forEach(textarea => {
      textarea.addEventListener('input', () => {
        const qId = textarea.id.replace('trace_input_', '');
        if (!state.trace.userAnswers[qId]) {
          state.trace.userAnswers[qId] = { userOutput: "", isChecked: false, isCorrect: false };
        }
        state.trace.userAnswers[qId].userOutput = textarea.value;
        state.trace.lastQuestionId = qId;
        localStorage.setItem("oop_last_trace_qid", qId);
        saveTraceAnswers();
        renderTraceGridNavigator();
        updateTraceStats();
      });
    });

    document.querySelectorAll('.btn-check-trace-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.getAttribute('data-qid');
        const q = CODE_TRACE_BANK.find(item => item.id === qId);
        if (!q) return;

        const inputEl = document.getElementById(`trace_input_${qId}`);
        const userVal = inputEl ? inputEl.value : "";

        const cleanUser = userVal.trim().replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ');
        const cleanExp = q.expectedOutput.trim().replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ');
        const altMatch = (q.alternativeOutputs || []).some(alt => alt.trim().replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ') === cleanUser);

        const isCorrect = (cleanUser === cleanExp || altMatch);

        state.trace.userAnswers[qId] = {
          userOutput: userVal,
          isChecked: true,
          isCorrect: isCorrect
        };
        state.trace.lastQuestionId = qId;
        localStorage.setItem("oop_last_trace_qid", qId);
        saveTraceAnswers();

        renderTraceSection();
      });
    });

    document.querySelectorAll('.btn-toggle-trace-accordion').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.getAttribute('data-qid');
        const acc = document.getElementById(`trace_steps_${qId}`);
        if (acc) {
          acc.style.display = acc.style.display === "none" ? "block" : "none";
        }
      });
    });
  }

  function renderTraceGridNavigator() {
    if (!el.traceGridNavigator) return;

    el.traceGridNavigator.innerHTML = CODE_TRACE_BANK.map(q => {
      const saved = state.trace.userAnswers[q.id];
      let btnClass = "grid-q-btn";

      if (saved && saved.isChecked) {
        btnClass += saved.isCorrect ? " correct" : " wrong";
      } else if (saved && saved.userOutput && saved.userOutput.trim() !== "") {
        btnClass += " answered";
      }

      if (q.id === state.trace.lastQuestionId) btnClass += " last-active";

      return `
        <button class="${btnClass}" onclick="window.scrollTraceQuestion('${q.id}')" title="Bài ${q.number}: ${escapeHtml(q.title)}">
          ${q.number}
        </button>
      `;
    }).join("");
  }

  function updateTraceStats() {
    const total = CODE_TRACE_BANK.length;
    let answeredCount = 0;
    let correctCount = 0;

    CODE_TRACE_BANK.forEach(q => {
      const saved = state.trace.userAnswers[q.id];
      if (saved && saved.userOutput && saved.userOutput.trim() !== "") answeredCount++;
      if (saved && saved.isCorrect) correctCount++;
    });

    if (el.traceAnsweredBadge) el.traceAnsweredBadge.textContent = `${answeredCount} / ${total}`;
    if (el.traceSidebarProgressText) el.traceSidebarProgressText.textContent = `${answeredCount}/${total} (${Math.round((answeredCount / total) * 100)}%)`;
    if (el.traceScoreBadge) {
      const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
      el.traceScoreBadge.textContent = `${accuracy}% (${correctCount} đúng)`;
    }
  }

  function submitTraceExam() {
    state.trace.isSubmitted = true;
    const total = CODE_TRACE_BANK.length;
    let correctCount = 0;

    CODE_TRACE_BANK.forEach(q => {
      const saved = state.trace.userAnswers[q.id];
      if (saved && saved.userOutput && saved.userOutput.trim() !== "") {
        const cleanUser = saved.userOutput.trim().replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ');
        const cleanExp = q.expectedOutput.trim().replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ');
        const altMatch = (q.alternativeOutputs || []).some(alt => alt.trim().replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ') === cleanUser);
        if (cleanUser === cleanExp || altMatch) {
          saved.isCorrect = true;
          correctCount++;
        } else {
          saved.isCorrect = false;
        }
        saved.isChecked = true;
      }
    });

    saveTraceAnswers();
    renderTraceSection();

    const finalScore = ((correctCount / total) * 10).toFixed(2);
    if (el.summaryContent) {
      el.summaryContent.innerHTML = `
        <div style="text-align:center; padding:10px 0 20px;">
          <div style="font-size:48px; font-weight:800; color:var(--success); font-family:var(--font-mono);">${finalScore} / 10.0</div>
          <div style="font-size:16px; font-weight:700; color:var(--text-primary); margin-top:4px;">Kết Quả Dạng 2 (Đọc Code Đoán Output)</div>
          <div style="color:var(--text-secondary); font-size:13px; margin-top:4px;">Đúng ${correctCount} / ${total} bài tập</div>
        </div>
        <div style="margin-top:20px; text-align:center;">
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('summaryModal').classList.remove('active');">
            🔍 Xem Lại Bài Làm
          </button>
        </div>
      `;
    }
    if (el.summaryModal) el.summaryModal.classList.add('active');
  }

  function resetTraceAnswers() {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ output đã nhập và làm lại từ đầu 35 bài Dạng 2?")) {
      state.trace.userAnswers = {};
      state.trace.isSubmitted = false;
      saveTraceAnswers();
      renderTraceSection();
    }
  }

  // =========================================================================
  // PHÂN HỆ 3: DẠNG 3 - VIẾT CODE C++ ENGINE (16 BÀI)
  // =========================================================================
  function renderWritingSection() {
    const questions = filterWritingQuestions();
    renderWritingCards(questions);
    renderWritingGridNavigator();
    updateWritingStats();
  }

  function filterWritingQuestions() {
    return CODE_WRITING_BANK.filter(q => {
      if (state.writing.activeChapter !== "all" && q.chapter !== state.writing.activeChapter) return false;
      if (state.writing.activeDifficulty !== "all" && q.difficulty !== state.writing.activeDifficulty) return false;
      if (state.writing.searchQuery.trim() !== "") {
        const query = state.writing.searchQuery.toLowerCase();
        const matchTitle = q.title.toLowerCase().includes(query);
        const matchDesc = q.description.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc) return false;
      }
      return true;
    });
  }

  function renderWritingCards(questions) {
    if (!el.writingCardsContainer) return;

    if (questions.length === 0) {
      el.writingCardsContainer.innerHTML = `
        <div style="text-align:center; padding:50px 20px; background:var(--bg-card); border-radius:var(--radius-lg); border:1px solid var(--border-color); color:var(--text-secondary);">
          <p style="font-size:18px; font-weight:600; margin-bottom:8px;">🔍 Không tìm thấy bài tập nào phù hợp.</p>
          <button class="btn btn-primary btn-sm" onclick="window.filterWritingChapter('all')">Xem tất cả 16 bài</button>
        </div>
      `;
      return;
    }

    el.writingCardsContainer.innerHTML = questions.map(q => {
      const savedCode = state.writing.userCode[q.id] !== undefined ? state.writing.userCode[q.id] : q.starterCode;
      const checkedMap = state.writing.checklistState[q.id] || {};

      let diffBadge = "";
      if (q.difficulty === "easy") diffBadge = '<span class="diff-badge diff-easy">🟢 Easy</span>';
      else if (q.difficulty === "medium") diffBadge = '<span class="diff-badge diff-medium">🟡 Medium</span>';
      else if (q.difficulty === "hard") diffBadge = '<span class="diff-badge diff-hard">🔴 Hard</span>';

      let currentPoints = 0;
      const checklistHtml = (q.checklist || []).map(item => {
        const isChecked = !!checkedMap[item.id];
        if (isChecked) currentPoints += item.points;
        return `
          <label class="rubric-item" style="display:flex; align-items:center; gap:8px; padding:6px 0; cursor:pointer; font-size:13px;">
            <input type="checkbox" class="writing-check-item" data-qid="${q.id}" data-cid="${item.id}" ${isChecked ? 'checked' : ''} style="width:16px; height:16px; cursor:pointer;" />
            <span style="flex:1; color:${isChecked ? 'var(--text-primary)' : 'var(--text-secondary)'};">${formatMarkdown(item.text)}</span>
          </label>
        `;
      }).join("");

      return `
        <div class="question-card fade-in" id="writing_card_${q.id}" data-qid="${q.id}">
          <div class="question-header">
            <div class="question-title-area">
              <span class="q-badge q-badge-c3">BÀI ${q.number} · DẠNG 3 (3.0đ)</span>
              <h3 class="question-title">${escapeHtml(q.title)}</h3>
            </div>
            <div class="question-meta">${diffBadge}</div>
          </div>

          <div class="question-body">
            <div style="font-size:13.5px; line-height:1.6; margin-bottom:14px; color:var(--text-primary);">
              ${formatMarkdown(q.description)}
            </div>

            <div class="code-editor-wrapper" style="margin-bottom:16px;">
              <div class="code-editor-header" style="display:flex; justify-content:space-between; align-items:center; padding:8px 14px; background:var(--bg-primary); border-top-left-radius:var(--radius-md); border-top-right-radius:var(--radius-md); border:1px solid var(--border-color); border-bottom:none;">
                <span style="font-family:var(--font-mono); font-size:12px; color:var(--cyan); font-weight:600;">💻 Trình Soạn Thảo C++ (Hỗ trợ phím Tab thụt lề)</span>
                <div style="display:flex; gap:8px;">
                  <button class="btn btn-outline btn-sm btn-reset-writing-code" data-qid="${q.id}" style="padding:2px 8px; font-size:11px;">Khôi phục code mẫu</button>
                  <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(document.getElementById('editor_${q.id}').value); alert('Đã copy code của bạn!');" style="padding:2px 8px; font-size:11px;">Copy Code</button>
                </div>
              </div>
              <textarea class="code-editor-textarea" id="editor_${q.id}" data-qid="${q.id}" spellcheck="false" placeholder="Viết code C++ hoàn chỉnh vào đây...">${escapeHtml(savedCode)}</textarea>
            </div>

            <div class="rubric-container" style="background:var(--bg-card-alt); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px; margin-bottom:14px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; border-bottom:1px solid var(--border-color); padding-bottom:6px;">
                <span style="font-weight:700; font-size:13px; color:var(--cyan);">📋 Barem Tự Đánh Giá (Checklist Tiêu Chí Kỹ Thuật):</span>
                <strong style="color:var(--success); font-family:var(--font-mono); font-size:13px;" id="score_label_${q.id}">${currentPoints.toFixed(1)} / 3.0đ</strong>
              </div>
              <div class="rubric-list">${checklistHtml}</div>
            </div>

            <div>
              <button class="btn btn-secondary btn-sm btn-toggle-solution" data-qid="${q.id}">
                ✨ Xem Mã Nguồn Chuẩn Của Giảng Viên
              </button>

              <div class="solution-container" id="solution_${q.id}" style="display:none; margin-top:12px;">
                <div class="code-container">
                  <div class="code-header">
                    <span>Mã Nguồn Mẫu (Giảng Viên)</span>
                    <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(\`${escapeHtml(q.solutionCode).replace(/`/g, '\\`')}\`); alert('Đã copy code mẫu!');" style="padding:2px 8px; font-size:11px;">Copy Code Mẫu</button>
                  </div>
                  <pre class="code-content" style="font-size:12.5px;"><code>${escapeHtml(q.solutionCode)}</code></pre>
                </div>
              </div>
            </div>

          </div>
        </div>
      `;
    }).join("");

    attachWritingListeners();
  }

  function attachWritingListeners() {
    document.querySelectorAll('.code-editor-textarea').forEach(textarea => {
      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          textarea.value = textarea.value.substring(0, start) + "    " + textarea.value.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + 4;
        }
      });

      textarea.addEventListener('input', () => {
        const qId = textarea.getAttribute('data-qid');
        state.writing.userCode[qId] = textarea.value;
        state.writing.lastQuestionId = qId;
        localStorage.setItem("oop_last_writing_qid", qId);
        saveWritingData();
        renderWritingGridNavigator();
        updateWritingStats();
      });
    });

    document.querySelectorAll('.writing-check-item').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const qId = checkbox.getAttribute('data-qid');
        const cId = checkbox.getAttribute('data-cid');
        if (!state.writing.checklistState[qId]) state.writing.checklistState[qId] = {};
        state.writing.checklistState[qId][cId] = checkbox.checked;
        saveWritingData();
        renderWritingSection();
      });
    });

    document.querySelectorAll('.btn-reset-writing-code').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.getAttribute('data-qid');
        const q = CODE_WRITING_BANK.find(item => item.id === qId);
        if (q && confirm("Khôi phục mã nguồn ban đầu của bài này?")) {
          state.writing.userCode[qId] = q.starterCode;
          saveWritingData();
          renderWritingSection();
        }
      });
    });

    document.querySelectorAll('.btn-toggle-solution').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.getAttribute('data-qid');
        const box = document.getElementById(`solution_${qId}`);
        if (box) {
          box.style.display = box.style.display === "none" ? "block" : "none";
        }
      });
    });
  }

  function renderWritingGridNavigator() {
    if (!el.writingGridNavigator) return;

    el.writingGridNavigator.innerHTML = CODE_WRITING_BANK.map(q => {
      const code = state.writing.userCode[q.id];
      const checkedMap = state.writing.checklistState[q.id] || {};
      const checkedCount = Object.values(checkedMap).filter(Boolean).length;
      let btnClass = "grid-q-btn";

      if (checkedCount >= (q.checklist ? q.checklist.length : 1)) {
        btnClass += " correct";
      } else if (code && code.trim() !== "" && code !== q.starterCode) {
        btnClass += " answered";
      }

      if (q.id === state.writing.lastQuestionId) btnClass += " last-active";

      return `
        <button class="${btnClass}" onclick="window.scrollWritingQuestion('${q.id}')" title="Bài ${q.number}: ${escapeHtml(q.title)}">
          ${q.number}
        </button>
      `;
    }).join("");
  }

  function updateWritingStats() {
    const total = CODE_WRITING_BANK.length;
    let completedCount = 0;
    let totalScore = 0;

    CODE_WRITING_BANK.forEach(q => {
      const code = state.writing.userCode[q.id];
      if (code && code.trim() !== "" && code !== q.starterCode) completedCount++;

      const checkedMap = state.writing.checklistState[q.id] || {};
      (q.checklist || []).forEach(item => {
        if (checkedMap[item.id]) totalScore += item.points;
      });
    });

    const avgScore = total > 0 ? (totalScore / total).toFixed(1) : "0.0";
    if (el.writingCompletedBadge) el.writingCompletedBadge.textContent = `${completedCount} / ${total}`;
    if (el.writingSidebarProgressText) el.writingSidebarProgressText.textContent = `${completedCount}/${total} (${Math.round((completedCount / total) * 100)}%)`;
    if (el.writingScoreBadge) el.writingScoreBadge.textContent = `${avgScore} / 3.0đ`;
  }

  function resetAllWriting() {
    if (confirm("Khôi phục toàn bộ code mẫu ban đầu cho tất cả bài tập viết code?")) {
      state.writing.userCode = {};
      state.writing.checklistState = {};
      saveWritingData();
      renderWritingSection();
    }
  }

  // =========================================================================
  // PHÂN HỆ 4: DẠNG 4 - THIẾT KẾ KIẾN TRÚC ENGINE (11 BÀI)
  // =========================================================================
  function renderPatternSection() {
    const questions = filterPatternQuestions();
    renderPatternCards(questions);
    renderPatternGridNavigator();
    updatePatternStats();
  }

  function filterPatternQuestions() {
    return DESIGN_PATTERN_BANK.filter(q => {
      if (state.pattern.activeCategory !== "all" && q.category !== state.pattern.activeCategory) return false;
      if (state.pattern.activeDifficulty !== "all" && q.difficulty !== state.pattern.activeDifficulty) return false;
      if (state.pattern.searchQuery.trim() !== "") {
        const query = state.pattern.searchQuery.toLowerCase();
        const matchTitle = q.title.toLowerCase().includes(query);
        const matchScen = q.scenario.toLowerCase().includes(query);
        if (!matchTitle && !matchScen) return false;
      }
      return true;
    });
  }

  function renderPatternCards(questions) {
    if (!el.patternCardsContainer) return;

    if (questions.length === 0) {
      el.patternCardsContainer.innerHTML = `
        <div style="text-align:center; padding:50px 20px; background:var(--bg-card); border-radius:var(--radius-lg); border:1px solid var(--border-color); color:var(--text-secondary);">
          <p style="font-size:18px; font-weight:600; margin-bottom:8px;">🔍 Không tìm thấy tình huống kiến trúc nào phù hợp.</p>
          <button class="btn btn-primary btn-sm" onclick="window.filterPatternCategory('all')">Xem tất cả 11 bài</button>
        </div>
      `;
      return;
    }

    el.patternCardsContainer.innerHTML = questions.map(q => {
      const userChoice = state.pattern.userChoices[q.id] || { chosenIdx: -1, isEvaluated: false };
      const isEvaluated = userChoice.isEvaluated;
      const isCorrect = userChoice.chosenIdx === q.correctPatternIndex;

      let diffBadge = "";
      if (q.difficulty === "easy") diffBadge = '<span class="diff-badge diff-easy">🟢 Easy</span>';
      else if (q.difficulty === "medium") diffBadge = '<span class="diff-badge diff-medium">🟡 Medium</span>';
      else if (q.difficulty === "hard") diffBadge = '<span class="diff-badge diff-hard">🔴 Hard</span>';

      const optionsHtml = q.patternOptions.map((opt, idx) => {
        const isSelected = userChoice.chosenIdx === idx;
        let itemClass = "pattern-option-card";
        if (isSelected) itemClass += " selected";
        if (isEvaluated) {
          if (idx === q.correctPatternIndex) itemClass += " is-correct";
          else if (isSelected && !isCorrect) itemClass += " is-wrong";
        }

        return `
          <label class="${itemClass}" style="display:flex; align-items:center; gap:10px; padding:10px 14px; background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-sm); margin-bottom:8px; cursor:pointer;">
            <input type="radio" name="pattern_${q.id}" value="${idx}" class="pattern-radio" data-qid="${q.id}" ${isSelected ? 'checked' : ''} />
            <span style="font-size:13.5px; font-weight:600;">${escapeHtml(opt)}</span>
          </label>
        `;
      }).join("");

      const roleRowsHtml = (q.roleMapping || []).map(r => `
        <tr>
          <td style="padding:8px 12px; border-bottom:1px solid var(--border-color); font-weight:700; color:var(--cyan);">${escapeHtml(r.role)}</td>
          <td style="padding:8px 12px; border-bottom:1px solid var(--border-color); font-family:var(--font-mono); color:var(--warning);">${escapeHtml(r.className)}</td>
          <td style="padding:8px 12px; border-bottom:1px solid var(--border-color); color:var(--text-secondary);">${formatMarkdown(r.description)}</td>
        </tr>
      `).join("");

      return `
        <div class="question-card fade-in" id="pattern_card_${q.id}" data-qid="${q.id}">
          <div class="question-header">
            <div class="question-title-area">
              <span class="q-badge q-badge-c4">BÀI ${q.number} · DẠNG 4 (${escapeHtml(q.points)})</span>
              <h3 class="question-title">${escapeHtml(q.title)}</h3>
            </div>
            <div class="question-meta">${diffBadge}</div>
          </div>

          <div class="question-body">
            <div style="background:var(--bg-card-alt); border-left:4px solid var(--cyan); padding:14px; border-radius:var(--radius-sm); margin-bottom:16px;">
              <h4 style="font-size:13px; color:var(--cyan); margin-bottom:6px;">📌 TÌNH HUỐNG THỰC TẾ (SCENARIO):</h4>
              <div style="font-size:13.5px; line-height:1.6; color:var(--text-primary);">${formatMarkdown(q.scenario)}</div>
            </div>

            <div style="margin-bottom:18px;">
              <h4 style="font-size:13.5px; margin-bottom:10px; color:var(--text-primary);">🎯 BƯỚC 1: LỰA CHỌN MẪU THIẾT KẾ (DESIGN PATTERN) PHÙ HỢP:</h4>
              <div class="pattern-options-group">${optionsHtml}</div>
              
              <div style="display:flex; gap:10px; align-items:center; margin-top:10px;">
                <button class="btn btn-primary btn-sm btn-eval-pattern" data-qid="${q.id}">
                  ✓ Đánh Giá Lựa Chọn
                </button>
                ${isEvaluated ? `
                  <span style="font-size:13px; font-weight:700; color:${isCorrect ? 'var(--success)' : 'var(--danger)'};">
                    ${isCorrect ? '🎉 Lựa chọn hoàn toàn chính xác (+1.0đ)' : '✕ Lựa chọn chưa chính xác'}
                  </span>
                ` : ''}
              </div>

              ${isEvaluated ? `
                <div style="margin-top:10px; padding:10px 14px; background:rgba(59,130,246,0.1); border-left:3px solid var(--primary); border-radius:4px; font-size:13px; color:#93c5fd;">
                  💡 <strong>Lý do lựa chọn:</strong> ${escapeHtml(q.patternRationale)}
                </div>
              ` : ''}
            </div>

            <div style="margin-bottom:18px;">
              <h4 style="font-size:13.5px; margin-bottom:10px; color:var(--text-primary);">🏛️ BƯỚC 2: BẢNG PHÂN RÃ VAI TRÒ THÀNH PHẦN KIẾN TRÚC:</h4>
              <table style="width:100%; border-collapse:collapse; background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-sm); font-size:13px; margin-bottom:14px;">
                <thead>
                  <tr style="background:var(--bg-card-alt); text-align:left;">
                    <th style="padding:8px 12px; border-bottom:1px solid var(--border-color);">Vai Trò (Role)</th>
                    <th style="padding:8px 12px; border-bottom:1px solid var(--border-color);">Tên Lớp (Class)</th>
                    <th style="padding:8px 12px; border-bottom:1px solid var(--border-color);">Mô Tả Nhiệm Vụ</th>
                  </tr>
                </thead>
                <tbody>${roleRowsHtml}</tbody>
              </table>

              <h4 style="font-size:13.5px; margin-bottom:10px; color:var(--text-primary);">📊 BƯỚC 3: SƠ ĐỒ LỚP UML (CLASS DIAGRAM):</h4>
              <pre style="background:var(--bg-primary); border:1px solid var(--border-color); padding:14px; border-radius:var(--radius-md); color:#38bdf8; font-family:var(--font-mono); font-size:12px; line-height:1.4; overflow-x:auto;"><code>${escapeHtml(q.umlDiagram)}</code></pre>
            </div>

            <div>
              <button class="btn btn-secondary btn-sm btn-toggle-skeleton" data-qid="${q.id}">
                🏛️ Xem Khung Code Thiết Kế Kiến Trúc (C++ Skeleton)
              </button>

              <div class="skeleton-container" id="skeleton_${q.id}" style="display:none; margin-top:12px;">
                <div class="code-container">
                  <div class="code-header">
                    <span>C++ Skeleton Architecture</span>
                    <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(\`${escapeHtml(q.skeletonCode).replace(/`/g, '\\`')}\`); alert('Đã copy khung code kiến trúc!');" style="padding:2px 8px; font-size:11px;">Copy Khung Code</button>
                  </div>
                  <pre class="code-content" style="font-size:12.5px;"><code>${escapeHtml(q.skeletonCode)}</code></pre>
                </div>
              </div>
            </div>

          </div>
        </div>
      `;
    }).join("");

    attachPatternListeners();
  }

  function attachPatternListeners() {
    document.querySelectorAll('.pattern-radio').forEach(radio => {
      radio.addEventListener('change', () => {
        const qId = radio.getAttribute('data-qid');
        const chosenIdx = parseInt(radio.value, 10);
        if (!state.pattern.userChoices[qId]) state.pattern.userChoices[qId] = { chosenIdx: -1, isEvaluated: false };
        state.pattern.userChoices[qId].chosenIdx = chosenIdx;
        state.pattern.lastQuestionId = qId;
        localStorage.setItem("oop_last_pattern_qid", qId);
        savePatternData();
        renderPatternGridNavigator();
      });
    });

    document.querySelectorAll('.btn-eval-pattern').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.getAttribute('data-qid');
        if (!state.pattern.userChoices[qId] || state.pattern.userChoices[qId].chosenIdx === -1) {
          alert("Vui lòng chọn 1 mẫu thiết kế trước khi đánh giá!");
          return;
        }
        state.pattern.userChoices[qId].isEvaluated = true;
        state.pattern.lastQuestionId = qId;
        localStorage.setItem("oop_last_pattern_qid", qId);
        savePatternData();
        renderPatternSection();
      });
    });

    document.querySelectorAll('.btn-toggle-skeleton').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.getAttribute('data-qid');
        const box = document.getElementById(`skeleton_${qId}`);
        if (box) {
          box.style.display = box.style.display === "none" ? "block" : "none";
        }
      });
    });
  }

  function renderPatternGridNavigator() {
    if (!el.patternGridNavigator) return;

    el.patternGridNavigator.innerHTML = DESIGN_PATTERN_BANK.map(q => {
      const choice = state.pattern.userChoices[q.id];
      let btnClass = "grid-q-btn";

      if (choice && choice.isEvaluated) {
        btnClass += (choice.chosenIdx === q.correctPatternIndex) ? " correct" : " wrong";
      } else if (choice && choice.chosenIdx !== -1) {
        btnClass += " answered";
      }

      if (q.id === state.pattern.lastQuestionId) btnClass += " last-active";

      return `
        <button class="${btnClass}" onclick="window.scrollPatternQuestion('${q.id}')" title="Bài ${q.number}: ${escapeHtml(q.title)}">
          ${q.number}
        </button>
      `;
    }).join("");
  }

  function updatePatternStats() {
    const total = DESIGN_PATTERN_BANK.length;
    let completedCount = 0;
    let correctCount = 0;

    DESIGN_PATTERN_BANK.forEach(q => {
      const choice = state.pattern.userChoices[q.id];
      if (choice && choice.isEvaluated) {
        completedCount++;
        if (choice.chosenIdx === q.correctPatternIndex) correctCount++;
      }
    });

    const accuracy = completedCount > 0 ? Math.round((correctCount / completedCount) * 100) : 0;
    if (el.patternCompletedBadge) el.patternCompletedBadge.textContent = `${completedCount} / ${total}`;
    if (el.patternSidebarProgressText) el.patternSidebarProgressText.textContent = `${completedCount}/${total} (${Math.round((completedCount / total) * 100)}%)`;
    if (el.patternScoreBadge) el.patternScoreBadge.textContent = `${accuracy}% (${correctCount} đúng)`;
  }

  function resetAllPatterns() {
    if (confirm("Xóa toàn bộ lựa chọn và làm lại từ đầu các bài tập thiết kế kiến trúc?")) {
      state.pattern.userChoices = {};
      savePatternData();
      renderPatternSection();
    }
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
    // 1. Navigation Tabs Switcher (5 Tabs)
    if (el.btnNavRealExam) el.btnNavRealExam.addEventListener('click', () => switchMainSection('realExam'));
    if (el.btnNavMCQ) el.btnNavMCQ.addEventListener('click', () => switchMainSection('mcq'));
    if (el.btnNavTrace) el.btnNavTrace.addEventListener('click', () => switchMainSection('trace'));
    if (el.btnNavWriting) el.btnNavWriting.addEventListener('click', () => switchMainSection('writing'));
    if (el.btnNavPattern) el.btnNavPattern.addEventListener('click', () => switchMainSection('pattern'));

    // Real Exam Question Tabs Filter
    if (el.realExamQuestionTabs) {
      el.realExamQuestionTabs.querySelectorAll('.filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          el.realExamQuestionTabs.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.realExam.activeTab = btn.getAttribute('data-real-tab');
          renderRealExamSection();
        });
      });
    }
    if (el.realExamSubmitBtn) el.realExamSubmitBtn.addEventListener('click', submitRealExam);

    // 2. Timer & Theme
    if (el.themeToggleBtn) el.themeToggleBtn.addEventListener('click', toggleTheme);
    if (el.timerBtn) el.timerBtn.addEventListener('click', toggleTimer);
    if (el.resetTimerBtn) el.resetTimerBtn.addEventListener('click', resetTimer);

    // 3. Cheatsheet Modal
    if (el.openTrapBtn) el.openTrapBtn.addEventListener('click', () => el.trapModal && el.trapModal.classList.add('active'));
    if (el.closeTrapBtn) el.closeTrapBtn.addEventListener('click', () => el.trapModal && el.trapModal.classList.remove('active'));
    if (el.trapSearchInput) el.trapSearchInput.addEventListener('input', e => renderTrapCheatsheet(e.target.value));

    // 4. Summary Modal Close
    if (el.closeSummaryBtn) el.closeSummaryBtn.addEventListener('click', () => el.summaryModal && el.summaryModal.classList.remove('active'));

    // 5. MCQ Events
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

    document.querySelectorAll('[data-diff]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-diff]').forEach(b => b.classList.remove('active'));
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

    // 6. Code Trace Events
    if (el.traceChapterFilters) {
      el.traceChapterFilters.querySelectorAll('.filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          el.traceChapterFilters.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.trace.activeChapter = btn.getAttribute('data-trace-chapter');
          renderTraceSection();
        });
      });
    }

    document.querySelectorAll('[data-trace-diff]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-trace-diff]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.trace.activeDifficulty = btn.getAttribute('data-trace-diff');
        renderTraceSection();
      });
    });

    if (el.traceSearchInput) {
      el.traceSearchInput.addEventListener('input', e => {
        state.trace.searchQuery = e.target.value;
        renderTraceSection();
      });
    }

    if (el.traceModePracticeBtn) {
      el.traceModePracticeBtn.addEventListener('click', () => {
        state.trace.mode = "practice";
        el.traceModePracticeBtn.classList.add('active');
        el.traceModeExamBtn.classList.remove('active');
        renderTraceSection();
      });
    }

    if (el.traceModeExamBtn) {
      el.traceModeExamBtn.addEventListener('click', () => {
        state.trace.mode = "exam";
        el.traceModeExamBtn.classList.add('active');
        el.traceModePracticeBtn.classList.remove('active');
        renderTraceSection();
      });
    }

    if (el.traceSubmitBtn) el.traceSubmitBtn.addEventListener('click', submitTraceExam);
    if (el.traceResetBtn) el.traceResetBtn.addEventListener('click', resetTraceAnswers);

    // 7. Code Writing Events
    if (el.writingChapterFilters) {
      el.writingChapterFilters.querySelectorAll('.filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          el.writingChapterFilters.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.writing.activeChapter = btn.getAttribute('data-writing-chapter');
          renderWritingSection();
        });
      });
    }

    document.querySelectorAll('[data-writing-diff]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-writing-diff]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.writing.activeDifficulty = btn.getAttribute('data-writing-diff');
        renderWritingSection();
      });
    });

    if (el.writingSearchInput) {
      el.writingSearchInput.addEventListener('input', e => {
        state.writing.searchQuery = e.target.value;
        renderWritingSection();
      });
    }

    if (el.writingResetBtn) el.writingResetBtn.addEventListener('click', resetAllWriting);

    // 8. Design Pattern Events
    if (el.patternCategoryFilters) {
      el.patternCategoryFilters.querySelectorAll('.filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          el.patternCategoryFilters.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.pattern.activeCategory = btn.getAttribute('data-pattern-cat');
          renderPatternSection();
        });
      });
    }

    document.querySelectorAll('[data-pattern-diff]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-pattern-diff]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.pattern.activeDifficulty = btn.getAttribute('data-pattern-diff');
        renderPatternSection();
      });
    });

    if (el.patternSearchInput) {
      el.patternSearchInput.addEventListener('input', e => {
        state.pattern.searchQuery = e.target.value;
        renderPatternSection();
      });
    }

    if (el.patternResetBtn) el.patternResetBtn.addEventListener('click', resetAllPatterns);
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
