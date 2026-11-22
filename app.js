(() => {
  'use strict';

  // =========================================================================
  // Presets & Dynamic Configuration
  // =========================================================================
  const PRESETS = {
    random: {
      id: 'random',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -6,
      xMax: 6,
      xTickStep: 2,
      xGridStep: 1,
      yMin: -10,
      yMax: 10,
      yTickStep: 2,
      yGridStep: 2,
      wMin: -4,
      wMax: 4,
      wStep: 0.01,
      wDecimals: 2,
      bMin: -8,
      bMax: 8,
      bStep: 0.01,
      bDecimals: 2,
      xDecimals: 2,
      yDecimals: 2,
      predictPlaceholder: '2.5',
      count: 24,
      generatePoints(count) {
        const sign = Math.random() < 0.5 ? 1 : -1;
        const trueW = sign * randRange(0.45, 1.55);
        const trueB = randRange(-2.2, 2.2);
        const noiseStd = randRange(1.0, 1.75);
        const pts = [];
        const span = 9.6;
        const step = span / count;
        for (let i = 0; i < count; i++) {
          const baseX = -4.8 + (i + 0.5) * step;
          const x = clamp(baseX + randRange(-step * 0.45, step * 0.45), -5.2, 5.2);
          const y = clamp(trueW * x + trueB + randNormal() * noiseStd, -8.8, 8.8);
          pts.push({ x, y });
        }
        return pts;
      },
      randomLine(opt) {
        let w = 0;
        let b = 0;
        for (let i = 0; i < 25; i++) {
          w = randRange(-2.6, 2.6);
          b = randRange(-5.0, 5.0);
          if (Math.abs(w - opt.w) > 0.75 || Math.abs(b - opt.b) > 2.2) break;
        }
        return { w, b };
      },
    },

    house: {
      id: 'house',
      xLabel: 'Size (sqft)',
      yLabel: 'Price ($k)',
      xMin: 0,
      xMax: 3500,
      xTickStep: 500,
      xGridStep: 500,
      yMin: 0,
      yMax: 800,
      yTickStep: 200,
      yGridStep: 100,
      wMin: -0.1,
      wMax: 0.4,
      wStep: 0.002,
      wDecimals: 3,
      bMin: -200,
      bMax: 500,
      bStep: 1,
      bDecimals: 1,
      xDecimals: 0,
      yDecimals: 1,
      predictPlaceholder: '2000',
      count: 24,
      generatePoints(count) {
        const trueW = randRange(0.15, 0.21); // $150 - $210 per sqft
        const trueB = randRange(45, 115);    // $45k - $115k base
        const noiseStd = randRange(26, 44);  // $26k - $44k variance
        const pts = [];
        const xStart = 600;
        const xEnd = 3250;
        const step = (xEnd - xStart) / count;
        for (let i = 0; i < count; i++) {
          const baseX = xStart + (i + 0.5) * step;
          const x = Math.round(clamp(baseX + randRange(-step * 0.45, step * 0.45), 500, 3350));
          const y = clamp(trueW * x + trueB + randNormal() * noiseStd, 85, 765);
          pts.push({ x, y });
        }
        return pts;
      },
      randomLine(opt) {
        let w = 0.08;
        let b = 220;
        for (let i = 0; i < 25; i++) {
          w = randRange(0.01, 0.32);
          b = randRange(10, 380);
          // Keep line comfortably visible around mid x = 1750
          const midY = w * 1750 + b;
          if (midY > 140 && midY < 660 && (Math.abs(w - opt.w) > 0.06 || Math.abs(b - opt.b) > 120)) {
            break;
          }
        }
        return { w, b };
      },
    },

    study: {
      id: 'study',
      xLabel: 'Hours',
      yLabel: 'Score',
      xMin: 0,
      xMax: 10,
      xTickStep: 2,
      xGridStep: 1,
      yMin: 0,
      yMax: 100,
      yTickStep: 20,
      yGridStep: 10,
      wMin: -4,
      wMax: 16,
      wStep: 0.1,
      wDecimals: 2,
      bMin: -20,
      bMax: 90,
      bStep: 0.5,
      bDecimals: 1,
      xDecimals: 1,
      yDecimals: 1,
      predictPlaceholder: '6',
      count: 24,
      generatePoints(count) {
        const trueW = randRange(5.8, 8.2);
        const trueB = randRange(18, 30);
        const noiseStd = randRange(4.5, 7.2);
        const pts = [];
        const xStart = 0.6;
        const xEnd = 9.4;
        const step = (xEnd - xStart) / count;
        for (let i = 0; i < count; i++) {
          const baseX = xStart + (i + 0.5) * step;
          const x = clamp(baseX + randRange(-step * 0.45, step * 0.45), 0.3, 9.7);
          const y = clamp(trueW * x + trueB + randNormal() * noiseStd, 12, 98);
          pts.push({ x, y });
        }
        return pts;
      },
      randomLine(opt) {
        let w = 2;
        let b = 55;
        for (let i = 0; i < 25; i++) {
          w = randRange(-1.5, 13);
          b = randRange(5, 75);
          const midY = w * 5 + b;
          if (midY > 18 && midY < 85 && (Math.abs(w - opt.w) > 2.5 || Math.abs(b - opt.b) > 18)) {
            break;
          }
        }
        return { w, b };
      },
    },

    salary: {
      id: 'salary',
      xLabel: 'Years',
      yLabel: 'Salary ($k)',
      xMin: 0,
      xMax: 16,
      xTickStep: 2,
      xGridStep: 2,
      yMin: 0,
      yMax: 200,
      yTickStep: 40,
      yGridStep: 20,
      wMin: -4,
      wMax: 18,
      wStep: 0.1,
      wDecimals: 2,
      bMin: -30,
      bMax: 150,
      bStep: 1,
      bDecimals: 1,
      xDecimals: 1,
      yDecimals: 1,
      predictPlaceholder: '8',
      count: 24,
      generatePoints(count) {
        const trueW = randRange(6.8, 9.4);
        const trueB = randRange(42, 60);
        const noiseStd = randRange(7.5, 12.0);
        const pts = [];
        const xStart = 0.6;
        const xEnd = 15.2;
        const step = (xEnd - xStart) / count;
        for (let i = 0; i < count; i++) {
          const baseX = xStart + (i + 0.5) * step;
          const x = clamp(baseX + randRange(-step * 0.45, step * 0.45), 0.3, 15.6);
          const y = clamp(trueW * x + trueB + randNormal() * noiseStd, 35, 194);
          pts.push({ x, y });
        }
        return pts;
      },
      randomLine(opt) {
        let w = 2;
        let b = 110;
        for (let i = 0; i < 25; i++) {
          w = randRange(-1.5, 14.5);
          b = randRange(10, 130);
          const midY = w * 8 + b;
          if (midY > 35 && midY < 170 && (Math.abs(w - opt.w) > 2.8 || Math.abs(b - opt.b) > 25)) {
            break;
          }
        }
        return { w, b };
      },
    },
  };

  const INTERACTION = {
    handleHitRadius: 22,
    lineHitDistance: 12,
    pointHitRadius: 13,
  };

  const COLORS = {
    grid: '#eef2f7',
    axis: '#94a3b8',
    axisText: '#64748b',
    pointFill: '#4f46e5',
    pointStroke: '#ffffff',
    pointHoverGlow: 'rgba(79, 70, 229, 0.24)',
    line: '#0f172a',
    lineOptimal: '#059669',
    residual: 'rgba(244, 63, 94, 0.65)',
    residualSquareFill: 'rgba(244, 63, 94, 0.13)',
    residualSquareStroke: 'rgba(244, 63, 94, 0.45)',
    w: '#ea580c',
    wGlow: 'rgba(234, 88, 12, 0.28)',
    b: '#0d9488',
    bGlow: 'rgba(13, 148, 136, 0.28)',
    opt: '#10b981',
    optGhost: 'rgba(16, 185, 129, 0.38)',
    tangent: '#334155',
    predict: '#db2777',
    predictGlow: 'rgba(219, 39, 119, 0.22)',
  };

  // =========================================================================
  // State
  // =========================================================================
  const state = {
    presetId: 'random',
    points: [],
    w: 0,
    b: 0,
    opt: { w: 0, b: 0, mse: 0 },
    stats: { meanX: 0, stdX: 1, stdY: 1 },
    xLabel: 'x',
    yLabel: 'y',
    predictX: null,
    predictPeekActive: false,
    predictPeekTimer: null,
    hoveredPredict: false,
    residualMode: 'lines',
    hoverTarget: null,
    hoveredPointIdx: -1,
    drag: null,
    costDrag: null,
    animFrame: null,
    gd: {
      running: false,
      lr: 0.09,
      iter: 0,
      timer: null,
      trail: [],
    },
    undoStack: [],
    sliderGesture: {
      param: null,
      startValue: 0,
      recorded: false,
    },
    costScale: { yMaxW: 80, yMaxB: 80 },
  };

  function P() {
    return PRESETS[state.presetId];
  }

  // =========================================================================
  // DOM References
  // =========================================================================
  const dom = {
    mainCanvas: document.getElementById('main-canvas'),
    costWCanvas: document.getElementById('cost-w-canvas'),
    costBCanvas: document.getElementById('cost-b-canvas'),
    sliderW: document.getElementById('slider-w'),
    sliderB: document.getElementById('slider-b'),
    valW: document.getElementById('val-w'),
    valB: document.getElementById('val-b'),
    eqW: document.getElementById('eq-w'),
    eqB: document.getElementById('eq-b'),
    mseReadout: document.getElementById('mse-readout'),
    msePill: document.querySelector('.mse-pill'),
    btnBestFit: document.getElementById('btn-best-fit'),
    btnRandomLine: document.getElementById('btn-random-line'),
    btnNewPoints: document.getElementById('btn-new-points'),
    segButtons: Array.from(document.querySelectorAll('.seg-btn')),
    presetButtons: Array.from(document.querySelectorAll('.preset-btn')),
    inputXLabel: document.getElementById('input-x-label'),
    inputYLabel: document.getElementById('input-y-label'),
    inputPredictX: document.getElementById('input-predict-x'),
    predictXName: document.getElementById('predict-x-name'),
    predictYName: document.getElementById('predict-y-name'),
    predictYOutput: document.getElementById('predict-y-output'),
    btnGdToggle: document.getElementById('btn-gd-toggle'),
    gdPlayIcon: document.getElementById('gd-play-icon'),
    gdBtnLabel: document.getElementById('gd-btn-label'),
    btnGdStep: document.getElementById('btn-gd-step'),
    sliderLr: document.getElementById('slider-lr'),
    valLr: document.getElementById('val-lr'),
    gdIter: document.getElementById('gd-iter'),
  };

  // =========================================================================
  // Math, Formatting & Regression Helpers
  // =========================================================================
  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function getXLabel() {
    const trimmed = state.xLabel.trim();
    return trimmed.length > 0 ? trimmed : 'x';
  }

  function getYLabel() {
    const trimmed = state.yLabel.trim();
    return trimmed.length > 0 ? trimmed : 'y';
  }

  function formatW(v) {
    return v.toFixed(P().wDecimals);
  }

  function formatB(v) {
    return v.toFixed(P().bDecimals);
  }

  function formatX(v) {
    return v.toFixed(P().xDecimals);
  }

  function formatY(v) {
    return v.toFixed(P().yDecimals);
  }

  function formatMSE(v) {
    if (v >= 100000) return `${(v / 1000).toFixed(0)}k`;
    if (v >= 10000) return `${(v / 1000).toFixed(1)}k`;
    if (v >= 1000) return v.toFixed(0);
    if (v >= 100) return v.toFixed(1);
    return v.toFixed(2);
  }

  function formatAxisTick(v, range) {
    const abs = Math.abs(v);
    if (abs >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
    if (abs >= 10000) return `${(v / 1000).toFixed(0)}k`;
    if (abs >= 1000) {
      const k = v / 1000;
      return Number.isInteger(k) ? `${k}k` : `${k.toFixed(1)}k`;
    }
    if (range <= 1) return v.toFixed(2);
    if (range <= 15) return Number.isInteger(v) ? String(v) : v.toFixed(1);
    return String(Math.round(v));
  }

  function buildLinearTicks(min, max, count) {
    const ticks = [];
    for (let i = 0; i <= count; i++) {
      const v = min + ((max - min) * i) / count;
      ticks.push(Math.abs(v) < 1e-9 ? 0 : v);
    }
    return ticks;
  }

  function randRange(min, max) {
    return min + Math.random() * (max - min);
  }

  function randNormal() {
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  function computeMSE(w, b, points = state.points) {
    const n = points.length;
    if (n === 0) return 0;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const err = w * points[i].x + b - points[i].y;
      sum += err * err;
    }
    return sum / n;
  }

  function computeGradients(w, b, points = state.points) {
    const n = points.length;
    if (n === 0) return { dw: 0, db: 0 };
    let sumW = 0;
    let sumB = 0;
    for (let i = 0; i < n; i++) {
      const err = w * points[i].x + b - points[i].y;
      sumW += err * points[i].x;
      sumB += err;
    }
    return {
      dw: (2 / n) * sumW,
      db: (2 / n) * sumB,
    };
  }

  function computeOLS(points = state.points) {
    const preset = P();
    const n = points.length;
    if (n < 2) {
      return { w: 0, b: n === 1 ? points[0].y : 0, mse: 0 };
    }
    let sumX = 0;
    let sumY = 0;
    for (let i = 0; i < n; i++) {
      sumX += points[i].x;
      sumY += points[i].y;
    }
    const meanX = sumX / n;
    const meanY = sumY / n;

    let num = 0;
    let den = 0;
    for (let i = 0; i < n; i++) {
      const dx = points[i].x - meanX;
      num += dx * (points[i].y - meanY);
      den += dx * dx;
    }

    const rawW = den > 1e-9 ? num / den : 0;
    const w = clamp(rawW, preset.wMin, preset.wMax);
    const b = clamp(meanY - w * meanX, preset.bMin, preset.bMax);
    const mse = computeMSE(w, b, points);
    return { w, b, mse };
  }

  function niceCeiling(value) {
    if (value <= 10) return 10;
    const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
    const normalized = value / magnitude;
    let nice;
    if (normalized <= 1.2) nice = 1.2;
    else if (normalized <= 1.5) nice = 1.5;
    else if (normalized <= 2) nice = 2;
    else if (normalized <= 2.5) nice = 2.5;
    else if (normalized <= 3) nice = 3;
    else if (normalized <= 4) nice = 4;
    else if (normalized <= 5) nice = 5;
    else if (normalized <= 6) nice = 6;
    else if (normalized <= 8) nice = 8;
    else nice = 10;
    return nice * magnitude;
  }

  function refreshDatasetStats() {
    const preset = P();
    state.opt = computeOLS(state.points);

    // Compute mean & std for scale-invariant Gradient Descent
    const n = state.points.length;
    if (n > 0) {
      let sumX = 0;
      let sumY = 0;
      for (let i = 0; i < n; i++) {
        sumX += state.points[i].x;
        sumY += state.points[i].y;
      }
      const meanX = sumX / n;
      const meanY = sumY / n;
      let varX = 0;
      let varY = 0;
      for (let i = 0; i < n; i++) {
        varX += (state.points[i].x - meanX) ** 2;
        varY += (state.points[i].y - meanY) ** 2;
      }
      state.stats = {
        meanX,
        stdX: Math.max(Math.sqrt(varX / n), 1e-6),
        stdY: Math.max(Math.sqrt(varY / n), 1e-6),
      };
    }

    // Stable baseline Y-axis scales for the two MSE cost plots
    const wSpan = (preset.wMax - preset.wMin) * 0.32;
    const bSpan = (preset.bMax - preset.bMin) * 0.38;
    const wProbe = Math.max(
      computeMSE(clamp(state.opt.w - wSpan, preset.wMin, preset.wMax), state.opt.b),
      computeMSE(clamp(state.opt.w + wSpan, preset.wMin, preset.wMax), state.opt.b)
    );
    const bProbe = Math.max(
      computeMSE(state.opt.w, clamp(state.opt.b - bSpan, preset.bMin, preset.bMax)),
      computeMSE(state.opt.w, clamp(state.opt.b + bSpan, preset.bMin, preset.bMax))
    );
    const floorY = Math.max(10, state.opt.mse * 4);
    state.costScale.yMaxW = niceCeiling(Math.max(floorY, wProbe * 1.25));
    state.costScale.yMaxB = niceCeiling(Math.max(floorY, bProbe * 1.25));
  }

  // =========================================================================
  // Preset Switching, Data & Random Line Generators
  // =========================================================================
  function syncSliderRanges() {
    const preset = P();
    dom.sliderW.min = String(preset.wMin);
    dom.sliderW.max = String(preset.wMax);
    dom.sliderW.step = String(preset.wStep);

    dom.sliderB.min = String(preset.bMin);
    dom.sliderB.max = String(preset.bMax);
    dom.sliderB.step = String(preset.bStep);

    dom.inputPredictX.placeholder = preset.predictPlaceholder;
  }

  function clearPredictPeek() {
    if (state.predictPeekTimer !== null) {
      clearTimeout(state.predictPeekTimer);
      state.predictPeekTimer = null;
    }
    state.predictPeekActive = false;
  }

  function triggerPredictPeek() {
    clearPredictPeek();
    state.predictPeekActive = true;
    state.predictPeekTimer = setTimeout(() => {
      state.predictPeekTimer = null;
      state.predictPeekActive = false;
      renderMainPlot();
    }, 2000);
  }

  function applyPreset(presetId) {
    stopAllMotion();
    clearPredictPeek();
    state.presetId = presetId;
    const preset = P();

    state.xLabel = preset.xLabel;
    state.yLabel = preset.yLabel;
    dom.inputXLabel.value = preset.xLabel;
    dom.inputYLabel.value = preset.yLabel;

    // Reset predict input so an old out-of-scale number isn't carried across presets
    state.predictX = null;
    state.hoveredPredict = false;
    dom.inputPredictX.value = '';

    dom.presetButtons.forEach((btn) =>
      btn.classList.toggle('active', btn.dataset.preset === presetId)
    );

    syncSliderRanges();
    generateRandomPoints();
    generateRandomLine();
  }

  function pushUndo(entry) {
    state.undoStack.push(entry);
    if (state.undoStack.length > 100) {
      state.undoStack.shift();
    }
  }

  function performUndo() {
    while (state.undoStack.length > 0) {
      const entry = state.undoStack.pop();
      if (entry.type === 'add-point') {
        const idx = state.points.indexOf(entry.point);
        if (idx !== -1 && state.points.length > 2) {
          stopAllMotion();
          state.points.splice(idx, 1);
          state.hoveredPointIdx = -1;
          refreshDatasetStats();
          renderAll();
          return;
        }
        // If that point was already deleted via right-click, keep popping to next valid entry
        continue;
      }
      if (entry.type === 'slider') {
        const preset = P();
        stopAllMotion();
        const min = entry.param === 'w' ? preset.wMin : preset.bMin;
        const max = entry.param === 'w' ? preset.wMax : preset.bMax;
        state[entry.param] = clamp(entry.prevValue, min, max);
        renderAll();
        return;
      }
    }
  }

  function generateRandomPoints() {
    const preset = P();
    state.points = preset.generatePoints(preset.count);
    state.hoveredPointIdx = -1;
    state.undoStack = [];
    refreshDatasetStats();
  }

  function generateRandomLine() {
    stopAllMotion();
    const preset = P();
    state.gd.iter = 0;
    state.gd.trail = [];
    const { w, b } = preset.randomLine(state.opt);
    state.w = clamp(w, preset.wMin, preset.wMax);
    state.b = clamp(b, preset.bMin, preset.bMax);
    renderAll();
  }

  // =========================================================================
  // Learning Rate Mapping (0..100 slider -> low=slow, middle=good, high=oscillate)
  // =========================================================================
  const LR_KNOTS = [
    [0, 0.005],   // very slow crawl
    [25, 0.02],   // slow
    [50, 0.09],   // middle: smooth, good convergence
    [72, 0.30],   // fast, still smooth
    [82, 0.68],   // starts bouncing / oscillating across minimum
    [92, 0.92],   // strong back-and-forth oscillation
    [100, 1.08],  // diverging oscillation
  ];

  function sliderPosToLr(pos) {
    const p = clamp(pos, 0, 100);
    for (let i = 0; i < LR_KNOTS.length - 1; i++) {
      const [p0, lr0] = LR_KNOTS[i];
      const [p1, lr1] = LR_KNOTS[i + 1];
      if (p <= p1) {
        const t = (p - p0) / (p1 - p0);
        return lr0 * Math.pow(lr1 / lr0, t);
      }
    }
    return LR_KNOTS[LR_KNOTS.length - 1][1];
  }

  function formatLr(lr) {
    if (lr < 0.1) return lr.toFixed(3);
    return lr.toFixed(2);
  }

  // =========================================================================
  // Motion Control: Best-Fit Animation & Scale-Invariant Gradient Descent
  // =========================================================================
  function cancelAnimation() {
    if (state.animFrame !== null) {
      cancelAnimationFrame(state.animFrame);
      state.animFrame = null;
    }
  }

  function stopGradientDescent() {
    if (state.gd.timer !== null) {
      clearTimeout(state.gd.timer);
      state.gd.timer = null;
    }
    if (state.gd.running) {
      state.gd.running = false;
      syncGDButton();
    }
  }

  function stopAllMotion() {
    cancelAnimation();
    stopGradientDescent();
  }

  function syncGDButton() {
    dom.btnGdToggle.classList.toggle('running', state.gd.running);
    dom.gdBtnLabel.textContent = state.gd.running ? 'Pause' : 'Gradient Descent';
    dom.gdPlayIcon.innerHTML = state.gd.running
      ? '<rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect>'
      : '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
  }

  function scheduleNextGdStep() {
    if (!state.gd.running) return;
    // Slightly slower step cadence when oscillating (α > 0.5) so each bounce is clearly visible
    const delay = state.gd.lr > 0.5 ? 190 : 55;
    state.gd.timer = setTimeout(() => {
      state.gd.timer = null;
      if (!state.gd.running) return;
      gradientDescentStep();
      scheduleNextGdStep();
    }, delay);
  }

  /**
   * Executes one exact Gradient Descent step in standardized x coordinates
   * z = (x - meanX) / stdX, then maps cleanly back to original (w, b).
   * In standardized coordinates the Hessian is exactly 2*I, so:
   *  - α < 0.03: very slow crawl
   *  - α ≈ 0.08–0.30: smooth, fast convergence
   *  - 0.50 < α < 1.00: damped oscillation bouncing across the parabola
   *  - α >= 1.00: sustained / diverging oscillation
   */
  function gradientDescentStep() {
    const preset = P();
    const n = state.points.length;
    if (n === 0) return;

    if (state.gd.trail.length === 0) {
      state.gd.trail.push({ w: state.w, b: state.b });
    }

    const { meanX, stdX, stdY } = state.stats;
    let wNorm = state.w * stdX;
    let bNorm = state.w * meanX + state.b;

    let gradWNorm = 0;
    let gradBNorm = 0;
    for (let i = 0; i < n; i++) {
      const z = (state.points[i].x - meanX) / stdX;
      const err = wNorm * z + bNorm - state.points[i].y;
      gradWNorm += err * z;
      gradBNorm += err;
    }
    gradWNorm = (2 / n) * gradWNorm;
    gradBNorm = (2 / n) * gradBNorm;

    wNorm -= state.gd.lr * gradWNorm;
    bNorm -= state.gd.lr * gradBNorm;

    const nextW = clamp(wNorm / stdX, preset.wMin, preset.wMax);
    const nextB = clamp(bNorm - nextW * meanX, preset.bMin, preset.bMax);

    state.w = nextW;
    state.b = nextB;
    state.gd.iter += 1;
    state.gd.trail.push({ w: state.w, b: state.b });
    if (state.gd.trail.length > 16) {
      state.gd.trail.shift();
    }
    renderAll();

    // Scale-invariant convergence check
    let checkW = 0;
    let checkB = 0;
    const nw = state.w * stdX;
    const nb = state.w * meanX + state.b;
    for (let i = 0; i < n; i++) {
      const z = (state.points[i].x - meanX) / stdX;
      const err = nw * z + nb - state.points[i].y;
      checkW += err * z;
      checkB += err;
    }
    const tol = 0.002 * stdY;
    if (Math.abs((2 / n) * checkW) < tol && Math.abs((2 / n) * checkB) < tol) {
      stopGradientDescent();
    }
  }

  function toggleGradientDescent() {
    if (state.gd.running) {
      stopGradientDescent();
      return;
    }
    cancelAnimation();
    state.gd.running = true;
    syncGDButton();
    gradientDescentStep();
    scheduleNextGdStep();
  }

  function animateToBestFit() {
    stopAllMotion();
    state.gd.trail = [];
    const startW = state.w;
    const startB = state.b;
    const targetW = state.opt.w;
    const targetB = state.opt.b;

    if (
      Math.abs(targetW - startW) < 1e-6 &&
      Math.abs(targetB - startB) < 1e-6
    ) {
      state.w = targetW;
      state.b = targetB;
      renderAll();
      return;
    }

    const duration = 420;
    const startTime = performance.now();

    function step(now) {
      const t = clamp((now - startTime) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      state.w = startW + (targetW - startW) * eased;
      state.b = startB + (targetB - startB) * eased;
      renderAll();

      if (t < 1) {
        state.animFrame = requestAnimationFrame(step);
      } else {
        state.w = targetW;
        state.b = targetB;
        state.animFrame = null;
        renderAll();
      }
    }

    state.animFrame = requestAnimationFrame(step);
  }

  // =========================================================================
  // Canvas Geometry & Clipping Helpers
  // =========================================================================
  function prepCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, width, height };
  }

  function getMainPlotBox(width, height) {
    const preset = P();
    const pad = { top: 20, right: 24, bottom: 38, left: 52 };
    const plotW = Math.max(10, width - pad.left - pad.right);
    const plotH = Math.max(10, height - pad.top - pad.bottom);

    const toX = (x) => pad.left + ((x - preset.xMin) / (preset.xMax - preset.xMin)) * plotW;
    const toY = (y) => pad.top + ((preset.yMax - y) / (preset.yMax - preset.yMin)) * plotH;
    const fromX = (px) => preset.xMin + ((px - pad.left) / plotW) * (preset.xMax - preset.xMin);
    const fromY = (py) => preset.yMax - ((py - pad.top) / plotH) * (preset.yMax - preset.yMin);

    return { pad, plotW, plotH, toX, toY, fromX, fromY };
  }

  function getCostPlotBox(width, height, xMin, xMax, yMax) {
    const pad = { top: 20, right: 22, bottom: 34, left: 54 };
    const plotW = Math.max(10, width - pad.left - pad.right);
    const plotH = Math.max(10, height - pad.top - pad.bottom);

    const toX = (x) => pad.left + ((x - xMin) / (xMax - xMin)) * plotW;
    const toY = (y) => pad.top + ((yMax - y) / yMax) * plotH;
    const fromX = (px) => xMin + ((px - pad.left) / plotW) * (xMax - xMin);

    return { pad, plotW, plotH, toX, toY, fromX, xMin, xMax, yMax };
  }

  function clipLineToBox(w, b, xMin, xMax, yMin, yMax) {
    const candidates = [];
    const epsX = (xMax - xMin) * 1e-6;
    const epsY = (yMax - yMin) * 1e-6;

    const yAtMin = w * xMin + b;
    if (yAtMin >= yMin - epsY && yAtMin <= yMax + epsY) {
      candidates.push({ x: xMin, y: clamp(yAtMin, yMin, yMax) });
    }
    const yAtMax = w * xMax + b;
    if (yAtMax >= yMin - epsY && yAtMax <= yMax + epsY) {
      candidates.push({ x: xMax, y: clamp(yAtMax, yMin, yMax) });
    }

    if (Math.abs(w) > 1e-9) {
      const xAtYMin = (yMin - b) / w;
      if (xAtYMin > xMin + epsX && xAtYMin < xMax - epsX) {
        candidates.push({ x: xAtYMin, y: yMin });
      }
      const xAtYMax = (yMax - b) / w;
      if (xAtYMax > xMin + epsX && xAtYMax < xMax - epsX) {
        candidates.push({ x: xAtYMax, y: yMax });
      }
    }

    const unique = [];
    const tol = Math.hypot(xMax - xMin, yMax - yMin) * 1e-4;
    for (const pt of candidates) {
      if (!unique.some((u) => Math.hypot(u.x - pt.x, u.y - pt.y) < tol)) {
        unique.push(pt);
      }
    }

    if (unique.length < 2) return null;
    unique.sort((a, c) => a.x - c.x);
    return [unique[0], unique[unique.length - 1]];
  }

  function isCenteredPlot() {
    const preset = P();
    return preset.xMin < 0 && preset.xMax > 0;
  }

  function getHandles(box) {
    const preset = P();
    const xRange = preset.xMax - preset.xMin;
    const yRange = preset.yMax - preset.yMin;

    const seg = clipLineToBox(
      state.w,
      state.b,
      preset.xMin + xRange * 0.06,
      preset.xMax - xRange * 0.06,
      preset.yMin + yRange * 0.06,
      preset.yMax - yRange * 0.06
    );

    let midData;
    if (isCenteredPlot() && state.b >= preset.yMin && state.b <= preset.yMax) {
      midData = { x: 0, y: state.b };
    } else if (seg) {
      midData = {
        x: (seg[0].x + seg[1].x) / 2,
        y: (seg[0].y + seg[1].y) / 2,
      };
    } else {
      const cx = (preset.xMin + preset.xMax) / 2;
      midData = { x: cx, y: clamp(state.w * cx + state.b, preset.yMin, preset.yMax) };
    }

    const midPx = { x: box.toX(midData.x), y: box.toY(midData.y) };

    let left = null;
    let right = null;

    if (seg) {
      const pLeftPx = { x: box.toX(seg[0].x), y: box.toY(seg[0].y) };
      const pRightPx = { x: box.toX(seg[1].x), y: box.toY(seg[1].y) };

      if (Math.hypot(pLeftPx.x - midPx.x, pLeftPx.y - midPx.y) >= 36) {
        left = { data: seg[0], px: pLeftPx };
      }
      if (Math.hypot(pRightPx.x - midPx.x, pRightPx.y - midPx.y) >= 36) {
        right = { data: seg[1], px: pRightPx };
      }
    }

    return {
      mid: { data: midData, px: midPx },
      left,
      right,
    };
  }

  function isNearOptimal() {
    const preset = P();
    const wTol = (preset.wMax - preset.wMin) * 0.008;
    const bTol = (preset.bMax - preset.bMin) * 0.008;
    return (
      Math.abs(state.w - state.opt.w) <= wTol &&
      Math.abs(state.b - state.opt.b) <= bTol
    );
  }

  function drawRoundedRect(ctx, x, y, w, h, r) {
    const radius = Math.max(0, Math.min(r, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // =========================================================================
  // Render: Main Scatter & Regression Plot
  // =========================================================================
  function renderMainPlot() {
    const preset = P();
    const { ctx, width, height } = prepCanvas(dom.mainCanvas);
    const box = getMainPlotBox(width, height);
    const { pad, plotW, plotH, toX, toY } = box;
    const xLabel = getXLabel();
    const yLabel = getYLabel();

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(pad.left, pad.top, plotW, plotH);

    // Grid lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = COLORS.grid;
    ctx.beginPath();
    for (let x = preset.xMin; x <= preset.xMax + 1e-6; x += preset.xGridStep) {
      const px = Math.round(toX(x)) + 0.5;
      ctx.moveTo(px, pad.top);
      ctx.lineTo(px, pad.top + plotH);
    }
    for (let y = preset.yMin; y <= preset.yMax + 1e-6; y += preset.yGridStep) {
      const py = Math.round(toY(y)) + 0.5;
      ctx.moveTo(pad.left, py);
      ctx.lineTo(pad.left + plotW, py);
    }
    ctx.stroke();

    // Principal X=0 and Y=0 axes (when inside bounds)
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    if (preset.xMin <= 0 && preset.xMax >= 0) {
      const zeroX = Math.round(toX(0)) + 0.5;
      ctx.moveTo(zeroX, pad.top);
      ctx.lineTo(zeroX, pad.top + plotH);
    }
    if (preset.yMin <= 0 && preset.yMax >= 0) {
      const zeroY = Math.round(toY(0)) + 0.5;
      ctx.moveTo(pad.left, zeroY);
      ctx.lineTo(pad.left + plotW, zeroY);
    }
    ctx.stroke();

    // Plot border
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.strokeRect(pad.left + 0.5, pad.top + 0.5, plotW - 1, plotH - 1);

    // Axis ticks
    ctx.fillStyle = COLORS.axisText;
    ctx.font = '500 11px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let x = preset.xMin; x <= preset.xMax + 1e-6; x += preset.xTickStep) {
      const label = Math.abs(x) < 1e-9 ? '0' : String(Math.round(x * 100) / 100);
      ctx.fillText(label, toX(x), pad.top + plotH + 7);
    }
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let y = preset.yMin; y <= preset.yMax + 1e-6; y += preset.yTickStep) {
      const label = Math.abs(y) < 1e-9 ? '0' : String(Math.round(y * 100) / 100);
      ctx.fillText(label, pad.left - 8, toY(y));
    }

    // Custom X and Y Axis Labels
    ctx.fillStyle = '#334155';
    ctx.font = '600 11.5px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(xLabel, pad.left + plotW - 6, pad.top + plotH - 5);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(yLabel, pad.left + 8, pad.top + 6);

    // Clip dynamic content to plot box
    ctx.save();
    ctx.beginPath();
    ctx.rect(pad.left, pad.top, plotW, plotH);
    ctx.clip();

    const midXThreshold = (preset.xMin + preset.xMax) / 2;

    // 1. Residuals
    if (state.residualMode !== 'off') {
      for (let i = 0; i < state.points.length; i++) {
        const pt = state.points[i];
        const yHat = state.w * pt.x + state.b;
        const px = toX(pt.x);
        const pyActual = toY(pt.y);
        const pyPred = toY(yHat);

        if (state.residualMode === 'squares') {
          const side = Math.abs(pyActual - pyPred);
          const topY = Math.min(pyActual, pyPred);
          const leftX = pt.x >= midXThreshold ? px - side : px;
          ctx.fillStyle = COLORS.residualSquareFill;
          ctx.strokeStyle = COLORS.residualSquareStroke;
          ctx.lineWidth = 1;
          ctx.fillRect(leftX, topY, side, side);
          ctx.strokeRect(leftX, topY, side, side);
        } else {
          ctx.strokeStyle = COLORS.residual;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(px, pyActual);
          ctx.lineTo(px, pyPred);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    }

    // 2. Regression Line
    const fullSeg = clipLineToBox(
      state.w,
      state.b,
      preset.xMin,
      preset.xMax,
      preset.yMin,
      preset.yMax
    );

    const optimalHit = isNearOptimal();
    const lineColor = optimalHit ? COLORS.lineOptimal : COLORS.line;

    if (fullSeg) {
      const p1 = { x: toX(fullSeg[0].x), y: toY(fullSeg[0].y) };
      const p2 = { x: toX(fullSeg[1].x), y: toY(fullSeg[1].y) };

      if (state.drag || optimalHit) {
        ctx.save();
        ctx.strokeStyle = optimalHit
          ? 'rgba(16, 185, 129, 0.22)'
          : 'rgba(15, 23, 42, 0.12)';
        ctx.lineWidth = 9;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();
      }

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2.8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    // 3. Prediction Marker on the line
    const predScreenPt = getPredictScreenPoint(box);
    if (predScreenPt) {
      const { x: px, y: py } = predScreenPt;
      const predHot = state.hoveredPredict && !state.drag;

      ctx.strokeStyle = COLORS.predict;
      ctx.globalAlpha = predHot ? 0.85 : 0.6;
      ctx.lineWidth = 1.4;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, pad.top + plotH);
      ctx.moveTo(px, py);
      ctx.lineTo(pad.left, py);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(px, py, predHot ? 15 : 12, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.predictGlow;
      ctx.fill();

      const sz = predHot ? 6.5 : 5.5;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = COLORS.predict;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.fillRect(-sz, -sz, sz * 2, sz * 2);
      ctx.strokeRect(-sz, -sz, sz * 2, sz * 2);
      ctx.restore();
    }

    // 4. Data Points
    for (let i = 0; i < state.points.length; i++) {
      const pt = state.points[i];
      const px = toX(pt.x);
      const py = toY(pt.y);
      const isHovered = i === state.hoveredPointIdx && !state.drag;

      if (isHovered) {
        ctx.beginPath();
        ctx.arc(px, py, 11, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.pointHoverGlow;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(px, py, isHovered ? 6.8 : 5.4, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.pointFill;
      ctx.fill();
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = COLORS.pointStroke;
      ctx.stroke();
    }

    ctx.restore();

    // 5. Interactive Handles
    const handles = getHandles(box);
    const activeMode = state.drag ? state.drag.type : state.hoverTarget;

    if (handles.left) {
      const isHot = activeMode === 'slope-left' || activeMode === 'line-left';
      drawSlopeHandle(ctx, handles.left.px.x, handles.left.px.y, isHot);
      if (isHot) {
        drawHandleTooltip(
          ctx,
          handles.left.px.x,
          handles.left.px.y,
          `w = ${formatW(state.w)}`,
          COLORS.w,
          width
        );
      }
    }
    if (handles.right) {
      const isHot = activeMode === 'slope-right' || activeMode === 'line-right';
      drawSlopeHandle(ctx, handles.right.px.x, handles.right.px.y, isHot);
      if (isHot) {
        drawHandleTooltip(
          ctx,
          handles.right.px.x,
          handles.right.px.y,
          `w = ${formatW(state.w)}`,
          COLORS.w,
          width
        );
      }
    }

    const isMidHot = activeMode === 'intercept' || activeMode === 'line-mid';
    drawInterceptHandle(ctx, handles.mid.px.x, handles.mid.px.y, isMidHot);
    if (isMidHot) {
      drawHandleTooltip(
        ctx,
        handles.mid.px.x,
        handles.mid.px.y,
        `b = ${formatB(state.b)}`,
        COLORS.b,
        width
      );
    }

    // 6. Prediction point callout (shown briefly when entered, then only on hover)
    if (
      predScreenPt &&
      !state.drag &&
      !activeMode &&
      state.hoveredPointIdx === -1 &&
      (state.predictPeekActive || state.hoveredPredict)
    ) {
      drawHandleTooltip(
        ctx,
        predScreenPt.x,
        predScreenPt.y,
        `${xLabel} = ${formatX(state.predictX)}, ${yLabel} = ${formatY(predScreenPt.predY)}`,
        COLORS.predict,
        width
      );
    }

    // 7. Hovered Data Point Tooltip with custom X & Y labels
    if (state.hoveredPointIdx !== -1 && !state.drag && !activeMode) {
      const pt = state.points[state.hoveredPointIdx];
      if (pt) {
        const px = toX(pt.x);
        const py = toY(pt.y);
        drawHandleTooltip(
          ctx,
          px,
          py,
          `${xLabel} = ${formatX(pt.x)}, ${yLabel} = ${formatY(pt.y)}`,
          COLORS.pointFill,
          width
        );
      }
    }
  }

  function drawInterceptHandle(ctx, x, y, active) {
    const r = active ? 13 : 11;
    ctx.save();

    ctx.beginPath();
    ctx.arc(x, y, r + (active ? 6 : 4), 0, Math.PI * 2);
    ctx.fillStyle = active ? 'rgba(13, 148, 136, 0.24)' : 'rgba(13, 148, 136, 0.12)';
    ctx.fill();

    ctx.shadowColor = 'rgba(15, 23, 42, 0.22)';
    ctx.shadowBlur = active ? 10 : 6;
    ctx.shadowOffsetY = 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.b;
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y - 5.2);
    ctx.lineTo(x, y + 5.2);
    ctx.moveTo(x - 3, y - 2.6);
    ctx.lineTo(x, y - 5.4);
    ctx.lineTo(x + 3, y - 2.6);
    ctx.moveTo(x - 3, y + 2.6);
    ctx.lineTo(x, y + 5.4);
    ctx.lineTo(x + 3, y + 2.6);
    ctx.stroke();

    ctx.restore();
  }

  function drawSlopeHandle(ctx, x, y, active) {
    const r = active ? 12 : 10;
    ctx.save();

    ctx.beginPath();
    ctx.arc(x, y, r + (active ? 6 : 4), 0, Math.PI * 2);
    ctx.fillStyle = active ? 'rgba(234, 88, 12, 0.25)' : 'rgba(234, 88, 12, 0.13)';
    ctx.fill();

    ctx.shadowColor = 'rgba(15, 23, 42, 0.22)';
    ctx.shadowBlur = active ? 10 : 6;
    ctx.shadowOffsetY = 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.w;
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.75;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.arc(x, y, 4.3, -Math.PI * 0.72, -Math.PI * 0.12);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 4.3, Math.PI * 0.28, Math.PI * 0.88);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawHandleTooltip(ctx, x, y, text, color, canvasWidth) {
    ctx.save();
    ctx.font = '600 11px "JetBrains Mono", monospace';
    const tw = ctx.measureText(text).width;
    const bw = tw + 18;
    const bh = 24;
    let bx = x - bw / 2;
    let by = y - 36;
    if (by < 8) by = y + 18;
    bx = clamp(bx, 8, canvasWidth - bw - 8);

    ctx.shadowColor = 'rgba(15, 23, 42, 0.18)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
    drawRoundedRect(ctx, bx, by, bw, bh, 6);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.fillStyle = color;
    drawRoundedRect(ctx, bx, by, 4, bh, 3);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, bx + bw / 2 + 2, by + bh / 2 + 0.5);
    ctx.restore();
  }

  // =========================================================================
  // Render: Cost Function Plots (MSE vs Weight & MSE vs Bias)
  // =========================================================================
  function renderCostPlot(options) {
    const {
      canvas,
      xMin,
      xMax,
      xTicks,
      currentParam,
      optParam,
      axisLabel,
      color,
      glowColor,
      baseYMax,
      evalCurrentSlice,
      evalOptSlice,
      gradient,
      formatParam,
    } = options;

    const { ctx, width, height } = prepCanvas(canvas);
    const currentMse = evalCurrentSlice(currentParam);

    const yMax =
      currentMse > baseYMax * 0.9
        ? niceCeiling(currentMse * 1.18)
        : baseYMax;

    const box = getCostPlotBox(width, height, xMin, xMax, yMax);
    const { pad, plotW, plotH, toX, toY } = box;
    const xRange = xMax - xMin;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(pad.left, pad.top, plotW, plotH);

    // Horizontal grid & Y ticks
    const ySteps = 4;
    ctx.lineWidth = 1;
    ctx.strokeStyle = COLORS.grid;
    ctx.fillStyle = COLORS.axisText;
    ctx.font = '500 10.5px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    ctx.beginPath();
    for (let i = 0; i <= ySteps; i++) {
      const yVal = (yMax / ySteps) * i;
      const py = Math.round(toY(yVal)) + 0.5;
      ctx.moveTo(pad.left, py);
      ctx.lineTo(pad.left + plotW, py);
      ctx.fillText(formatAxisTick(yVal, yMax), pad.left - 7, py);
    }
    ctx.stroke();

    // Vertical grid & X ticks
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.beginPath();
    for (const xVal of xTicks) {
      const px = Math.round(toX(xVal)) + 0.5;
      ctx.moveTo(px, pad.top);
      ctx.lineTo(px, pad.top + plotH);
      ctx.fillText(formatAxisTick(xVal, xRange), px, pad.top + plotH + 7);
    }
    ctx.stroke();

    if (xMin < 0 && xMax > 0) {
      const zeroX = Math.round(toX(0)) + 0.5;
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(zeroX, pad.top);
      ctx.lineTo(zeroX, pad.top + plotH);
      ctx.stroke();
    }

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.strokeRect(pad.left + 0.5, pad.top + 0.5, plotW - 1, plotH - 1);

    ctx.fillStyle = '#475569';
    ctx.font = '600 10.5px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(axisLabel, pad.left + plotW - 4, pad.top + plotH - 4);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('MSE', pad.left + 6, pad.top + 4);

    ctx.save();
    ctx.beginPath();
    ctx.rect(pad.left, pad.top, plotW, plotH);
    ctx.clip();

    const samples = 140;

    // 1. Optimal slice ghost parabola
    ctx.beginPath();
    for (let i = 0; i <= samples; i++) {
      const xv = xMin + (i / samples) * xRange;
      const yv = evalOptSlice(xv);
      const px = toX(xv);
      const py = toY(yv);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = COLORS.optGhost;
    ctx.lineWidth = 1.6;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Current MSE parabola
    const gradFill = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
    gradFill.addColorStop(0, glowColor);
    gradFill.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    ctx.beginPath();
    for (let i = 0; i <= samples; i++) {
      const xv = xMin + (i / samples) * xRange;
      const yv = evalCurrentSlice(xv);
      const px = toX(xv);
      const py = toY(yv);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.6;
    ctx.stroke();

    ctx.lineTo(toX(xMax), pad.top + plotH);
    ctx.lineTo(toX(xMin), pad.top + plotH);
    ctx.closePath();
    ctx.fillStyle = gradFill;
    ctx.fill();

    // 3. Global optimum dot
    const optPx = toX(optParam);
    const optPy = toY(state.opt.mse);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    ctx.moveTo(optPx, optPy);
    ctx.lineTo(optPx, pad.top + plotH);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.arc(optPx, optPy, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = COLORS.opt;
    ctx.stroke();

    // 4. Tangent line at current point
    const curPx = toX(currentParam);
    const curPy = toY(currentMse);
    const tanSpan = xRange * 0.13;
    const t1x = currentParam - tanSpan;
    const t2x = currentParam + tanSpan;
    const t1y = currentMse + gradient * (t1x - currentParam);
    const t2y = currentMse + gradient * (t2x - currentParam);

    ctx.strokeStyle = COLORS.tangent;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(toX(t1x), toY(t1y));
    ctx.lineTo(toX(t2x), toY(t2y));
    ctx.stroke();

    // 4b. Gradient Descent step trail (makes low-lr crawl vs high-lr oscillation unmistakable)
    if (options.trailPoints && options.trailPoints.length > 1) {
      ctx.save();
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.55)';
      ctx.lineWidth = 1.6;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      for (let i = 0; i < options.trailPoints.length; i++) {
        const tp = options.trailPoints[i];
        const tx = toX(tp.param);
        const ty = toY(tp.mse);
        if (i === 0) ctx.moveTo(tx, ty);
        else ctx.lineTo(tx, ty);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < options.trailPoints.length - 1; i++) {
        const tp = options.trailPoints[i];
        const alpha = 0.2 + (0.65 * i) / options.trailPoints.length;
        ctx.beginPath();
        ctx.arc(toX(tp.param), toY(tp.mse), 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 58, 237, ${alpha.toFixed(2)})`;
        ctx.fill();
      }
      ctx.restore();
    }

    // 5. Drop lines
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(curPx, curPy);
    ctx.lineTo(curPx, pad.top + plotH);
    ctx.moveTo(curPx, curPy);
    ctx.lineTo(pad.left, curPy);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // 6. Current point marker
    ctx.beginPath();
    ctx.arc(curPx, curPy, 11, 0, Math.PI * 2);
    ctx.fillStyle = glowColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(curPx, curPy, 6, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.restore();

    // 7. Compact callout tag near current dot
    const labelText = `(${formatParam(currentParam)}, ${formatMSE(currentMse)})`;
    ctx.font = '600 10.5px "JetBrains Mono", monospace';
    const tw = ctx.measureText(labelText).width;
    const bw = tw + 12;
    const bh = 20;
    let bx = curPx - bw / 2;
    let by = curPy - 28;
    if (by < pad.top + 4) by = curPy + 14;
    bx = clamp(bx, pad.left + 4, pad.left + plotW - bw - 4);

    ctx.save();
    drawRoundedRect(ctx, bx, by, bw, bh, 5);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(labelText, bx + bw / 2, by + bh / 2 + 0.5);
    ctx.restore();
  }

  function renderCostPlots() {
    const preset = P();
    const grads = computeGradients(state.w, state.b);
    const wTrail = state.gd.trail.map((pt) => ({ param: pt.w, mse: computeMSE(pt.w, pt.b) }));
    const bTrail = state.gd.trail.map((pt) => ({ param: pt.b, mse: computeMSE(pt.w, pt.b) }));

    renderCostPlot({
      canvas: dom.costWCanvas,
      xMin: preset.wMin,
      xMax: preset.wMax,
      xTicks: buildLinearTicks(preset.wMin, preset.wMax, 5),
      currentParam: state.w,
      optParam: state.opt.w,
      axisLabel: 'w',
      color: COLORS.w,
      glowColor: COLORS.wGlow,
      baseYMax: state.costScale.yMaxW,
      evalCurrentSlice: (wVal) => computeMSE(wVal, state.b),
      evalOptSlice: (wVal) => computeMSE(wVal, state.opt.b),
      gradient: grads.dw,
      formatParam: formatW,
      trailPoints: wTrail,
    });

    renderCostPlot({
      canvas: dom.costBCanvas,
      xMin: preset.bMin,
      xMax: preset.bMax,
      xTicks: buildLinearTicks(preset.bMin, preset.bMax, 5),
      currentParam: state.b,
      optParam: state.opt.b,
      axisLabel: 'b',
      color: COLORS.b,
      glowColor: COLORS.bGlow,
      baseYMax: state.costScale.yMaxB,
      evalCurrentSlice: (bVal) => computeMSE(state.w, bVal),
      evalOptSlice: (bVal) => computeMSE(state.opt.w, bVal),
      gradient: grads.db,
      formatParam: formatB,
      trailPoints: bTrail,
    });
  }

  // =========================================================================
  // Sync DOM Readouts, Sliders, Predict & GD
  // =========================================================================
  function syncUI() {
    const mse = computeMSE(state.w, state.b);

    dom.sliderW.value = String(state.w);
    dom.sliderB.value = String(state.b);

    dom.valW.textContent = formatW(state.w);
    dom.valB.textContent = formatB(state.b);

    dom.eqW.textContent = formatW(state.w);
    dom.eqB.textContent =
      state.b >= 0 ? `+ ${formatB(state.b)}` : `− ${formatB(Math.abs(state.b))}`;

    dom.mseReadout.textContent = formatMSE(mse);
    dom.msePill.classList.toggle('optimal', isNearOptimal());

    dom.gdIter.textContent = `#${state.gd.iter}`;
    dom.valLr.textContent = formatLr(state.gd.lr);

    dom.predictXName.textContent = getXLabel();
    dom.predictYName.textContent = getYLabel();
    if (state.predictX !== null && Number.isFinite(state.predictX)) {
      const predY = state.w * state.predictX + state.b;
      dom.predictYOutput.textContent = formatY(predY);
    } else {
      dom.predictYOutput.textContent = '—';
    }
  }

  function renderAll() {
    syncUI();
    renderMainPlot();
    renderCostPlots();
  }

  // =========================================================================
  // Pointer Interaction: Main Scatter Canvas
  // =========================================================================
  function getPointerPos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
      width: rect.width,
      height: rect.height,
    };
  }

  function distancePointToSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;
    if (lenSq < 1e-6) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
    t = clamp(t, 0, 1);
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  }

  function findHoveredPoint(px, py, box) {
    let closestIdx = -1;
    let closestDist = INTERACTION.pointHitRadius;
    for (let i = 0; i < state.points.length; i++) {
      const sx = box.toX(state.points[i].x);
      const sy = box.toY(state.points[i].y);
      const d = Math.hypot(px - sx, py - sy);
      if (d <= closestDist) {
        closestDist = d;
        closestIdx = i;
      }
    }
    return closestIdx;
  }

  function getPredictScreenPoint(box) {
    if (state.predictX === null || !Number.isFinite(state.predictX)) return null;
    const preset = P();
    const predY = state.w * state.predictX + state.b;
    if (
      state.predictX < preset.xMin ||
      state.predictX > preset.xMax ||
      predY < preset.yMin ||
      predY > preset.yMax
    ) {
      return null;
    }
    return { x: box.toX(state.predictX), y: box.toY(predY), predY };
  }

  function hitTestMainCanvas(px, py, width, height) {
    const preset = P();
    const box = getMainPlotBox(width, height);
    const handles = getHandles(box);

    // 1. Middle intercept handle
    if (Math.hypot(px - handles.mid.px.x, py - handles.mid.px.y) <= INTERACTION.handleHitRadius) {
      return { type: 'intercept', handle: handles.mid, midHandle: handles.mid, pointIdx: -1, hoveredPredict: false, box };
    }

    // 2. Corner slope handles
    if (
      handles.left &&
      Math.hypot(px - handles.left.px.x, py - handles.left.px.y) <= INTERACTION.handleHitRadius
    ) {
      return { type: 'slope-left', handle: handles.left, midHandle: handles.mid, pointIdx: -1, hoveredPredict: false, box };
    }
    if (
      handles.right &&
      Math.hypot(px - handles.right.px.x, py - handles.right.px.y) <= INTERACTION.handleHitRadius
    ) {
      return { type: 'slope-right', handle: handles.right, midHandle: handles.mid, pointIdx: -1, hoveredPredict: false, box };
    }

    // 3. Prediction marker (checked before line body so hovering the pink diamond always reveals its tooltip)
    const predPt = getPredictScreenPoint(box);
    if (predPt && Math.hypot(px - predPt.x, py - predPt.y) <= 16) {
      return { type: null, pointIdx: -1, hoveredPredict: true, box };
    }

    // 4. Data points
    const pointIdx = findHoveredPoint(px, py, box);
    if (pointIdx !== -1) {
      return { type: null, pointIdx, hoveredPredict: false, box };
    }

    // 5. Regression line body
    const fullSeg = clipLineToBox(
      state.w,
      state.b,
      preset.xMin,
      preset.xMax,
      preset.yMin,
      preset.yMax
    );
    if (fullSeg) {
      const p1 = { x: box.toX(fullSeg[0].x), y: box.toY(fullSeg[0].y) };
      const p2 = { x: box.toX(fullSeg[1].x), y: box.toY(fullSeg[1].y) };
      const dist = distancePointToSegment(px, py, p1.x, p1.y, p2.x, p2.y);
      if (dist <= INTERACTION.lineHitDistance) {
        const dataX = box.fromX(px);
        const xRange = preset.xMax - preset.xMin;
        if (Math.abs(dataX - handles.mid.data.x) <= xRange * 0.14) {
          return { type: 'line-mid', midHandle: handles.mid, pointIdx: -1, hoveredPredict: false, box };
        }
        return {
          type: dataX < handles.mid.data.x ? 'line-left' : 'line-right',
          midHandle: handles.mid,
          pointIdx: -1,
          hoveredPredict: false,
          box,
        };
      }
    }

    return { type: null, pointIdx: -1, hoveredPredict: false, box };
  }

  function updateMainCursor() {
    const mode = state.drag ? state.drag.type : state.hoverTarget;
    if (mode === 'intercept' || mode === 'line-mid') {
      dom.mainCanvas.style.cursor = 'ns-resize';
    } else if (
      mode === 'slope-left' ||
      mode === 'slope-right' ||
      mode === 'line-left' ||
      mode === 'line-right'
    ) {
      dom.mainCanvas.style.cursor = state.drag ? 'grabbing' : 'grab';
    } else if (state.hoveredPointIdx !== -1 || state.hoveredPredict) {
      dom.mainCanvas.style.cursor = 'pointer';
    } else {
      dom.mainCanvas.style.cursor = 'crosshair';
    }
  }

  dom.mainCanvas.addEventListener('pointerdown', (evt) => {
    if (evt.button === 2) return;
    const preset = P();
    const pos = getPointerPos(dom.mainCanvas, evt);
    const hit = hitTestMainCanvas(pos.x, pos.y, pos.width, pos.height);

    if (hit.type) {
      stopAllMotion();
      state.gd.trail = [];
      dom.mainCanvas.setPointerCapture(evt.pointerId);
      const dataX = hit.box.fromX(pos.x);
      const dataY = hit.box.fromY(pos.y);

      if (hit.type === 'intercept' || hit.type === 'line-mid') {
        state.drag = {
          type: hit.type,
          pointerId: evt.pointerId,
          startB: state.b,
          startDataY: dataY,
        };
      } else {
        const side = hit.type === 'slope-left' || hit.type === 'line-left' ? -1 : 1;
        const anchorX = hit.handle ? hit.handle.data.x : dataX;
        const anchorY = hit.handle ? hit.handle.data.y : state.w * dataX + state.b;
        // On positive-only plots, the left corner sits near x = 0, so pivot around the
        // line midpoint for smooth tilt; on the right corner (and both ends of centered plots),
        // pivot around (0, b) so ONLY slope w changes while intercept b stays strictly fixed!
        const pivotMode = !isCenteredPlot() && side === -1 ? 'midpoint' : 'origin';
        state.drag = {
          type: hit.type,
          pointerId: evt.pointerId,
          side,
          pivotMode,
          pivotX: hit.midHandle ? hit.midHandle.data.x : 0,
          pivotY: hit.midHandle ? hit.midHandle.data.y : state.b,
          offsetX: dataX - anchorX,
          offsetY: dataY - anchorY,
        };
      }

      updateMainCursor();
      renderMainPlot();
      return;
    }

    if (hit.pointIdx !== -1 || hit.hoveredPredict) return;

    // Clicked empty space inside plot bounds -> add a new point
    const { pad, plotW, plotH, fromX, fromY } = hit.box;
    if (
      pos.x >= pad.left &&
      pos.x <= pad.left + plotW &&
      pos.y >= pad.top &&
      pos.y <= pad.top + plotH
    ) {
      stopAllMotion();
      const xMargin = (preset.xMax - preset.xMin) * 0.015;
      const yMargin = (preset.yMax - preset.yMin) * 0.015;
      const nx = clamp(fromX(pos.x), preset.xMin + xMargin, preset.xMax - xMargin);
      const ny = clamp(fromY(pos.y), preset.yMin + yMargin, preset.yMax - yMargin);
      const newPoint = { x: nx, y: ny };
      state.points.push(newPoint);
      pushUndo({ type: 'add-point', point: newPoint });
      refreshDatasetStats();
      renderAll();
    }
  });

  dom.mainCanvas.addEventListener('pointermove', (evt) => {
    const preset = P();
    const pos = getPointerPos(dom.mainCanvas, evt);

    if (state.drag) {
      const box = getMainPlotBox(pos.width, pos.height);
      const dataX = box.fromX(pos.x);
      const dataY = box.fromY(pos.y);

      if (state.drag.type === 'intercept' || state.drag.type === 'line-mid') {
        const deltaY = dataY - state.drag.startDataY;
        state.b = clamp(state.drag.startB + deltaY, preset.bMin, preset.bMax);
      } else {
        const xRange = preset.xMax - preset.xMin;
        const minLever = xRange * 0.06;
        const vx = dataX - state.drag.offsetX;
        const vy = dataY - state.drag.offsetY;

        if (state.drag.pivotMode === 'midpoint') {
          const dx = Math.min(vx - state.drag.pivotX, -minLever);
          const newW = clamp((vy - state.drag.pivotY) / dx, preset.wMin, preset.wMax);
          state.w = newW;
          state.b = clamp(state.drag.pivotY - newW * state.drag.pivotX, preset.bMin, preset.bMax);
        } else {
          const safeDx =
            state.drag.side === 1 ? Math.max(vx, minLever) : Math.min(vx, -minLever);
          state.w = clamp((vy - state.b) / safeDx, preset.wMin, preset.wMax);
        }
      }

      renderAll();
      return;
    }

    const hit = hitTestMainCanvas(pos.x, pos.y, pos.width, pos.height);
    if (
      hit.type !== state.hoverTarget ||
      hit.pointIdx !== state.hoveredPointIdx ||
      hit.hoveredPredict !== state.hoveredPredict
    ) {
      state.hoverTarget = hit.type;
      state.hoveredPointIdx = hit.pointIdx;
      state.hoveredPredict = hit.hoveredPredict;
      updateMainCursor();
      renderMainPlot();
    }
  });

  function endMainDrag(evt) {
    if (!state.drag) return;
    if (dom.mainCanvas.hasPointerCapture(evt.pointerId)) {
      dom.mainCanvas.releasePointerCapture(evt.pointerId);
    }
    state.drag = null;
    updateMainCursor();
    renderMainPlot();
  }

  dom.mainCanvas.addEventListener('pointerup', endMainDrag);
  dom.mainCanvas.addEventListener('pointercancel', endMainDrag);
  dom.mainCanvas.addEventListener('pointerleave', () => {
    if (
      !state.drag &&
      (state.hoverTarget !== null || state.hoveredPointIdx !== -1 || state.hoveredPredict)
    ) {
      state.hoverTarget = null;
      state.hoveredPointIdx = -1;
      state.hoveredPredict = false;
      updateMainCursor();
      renderMainPlot();
    }
  });

  // Right-click a point to remove it
  dom.mainCanvas.addEventListener('contextmenu', (evt) => {
    evt.preventDefault();
    if (state.points.length <= 2) return;
    const pos = getPointerPos(dom.mainCanvas, evt);
    const box = getMainPlotBox(pos.width, pos.height);
    const closestIdx = findHoveredPoint(pos.x, pos.y, box);

    if (closestIdx !== -1) {
      stopAllMotion();
      state.points.splice(closestIdx, 1);
      state.hoveredPointIdx = -1;
      refreshDatasetStats();
      renderAll();
    }
  });

  // =========================================================================
  // Pointer Interaction: Scrubbing directly on Cost Function Graphs
  // =========================================================================
  function bindCostScrubber(canvas, paramKey) {
    function scrubFromEvent(evt) {
      const preset = P();
      const xMin = paramKey === 'w' ? preset.wMin : preset.bMin;
      const xMax = paramKey === 'w' ? preset.wMax : preset.bMax;
      const pos = getPointerPos(canvas, evt);
      const box = getCostPlotBox(pos.width, pos.height, xMin, xMax, 100);
      state[paramKey] = clamp(box.fromX(pos.x), xMin, xMax);
      renderAll();
    }

    canvas.style.cursor = 'ew-resize';

    canvas.addEventListener('pointerdown', (evt) => {
      stopAllMotion();
      state.gd.trail = [];
      state.costDrag = paramKey;
      canvas.setPointerCapture(evt.pointerId);
      scrubFromEvent(evt);
    });

    canvas.addEventListener('pointermove', (evt) => {
      if (state.costDrag !== paramKey) return;
      scrubFromEvent(evt);
    });

    const endScrub = (evt) => {
      if (state.costDrag !== paramKey) return;
      if (canvas.hasPointerCapture(evt.pointerId)) {
        canvas.releasePointerCapture(evt.pointerId);
      }
      state.costDrag = null;
    };

    canvas.addEventListener('pointerup', endScrub);
    canvas.addEventListener('pointercancel', endScrub);
  }

  bindCostScrubber(dom.costWCanvas, 'w');
  bindCostScrubber(dom.costBCanvas, 'b');

  // =========================================================================
  // Controls, Sliders, Presets, Labels, Predict & Gradient Descent Listeners
  // =========================================================================
  function bindUndoableSlider(inputEl, paramKey) {
    inputEl.addEventListener('pointerdown', () => {
      state.sliderGesture.param = paramKey;
      state.sliderGesture.startValue = state[paramKey];
      state.sliderGesture.recorded = false;
    });

    inputEl.addEventListener('input', () => {
      stopAllMotion();
      state.gd.trail = [];
      const nextVal = parseFloat(inputEl.value);
      if (state.sliderGesture.param === paramKey) {
        if (!state.sliderGesture.recorded && Math.abs(nextVal - state.sliderGesture.startValue) > 1e-9) {
          pushUndo({ type: 'slider', param: paramKey, prevValue: state.sliderGesture.startValue });
          state.sliderGesture.recorded = true;
        }
      } else if (Math.abs(nextVal - state[paramKey]) > 1e-9) {
        pushUndo({ type: 'slider', param: paramKey, prevValue: state[paramKey] });
      }
      state[paramKey] = nextVal;
      renderAll();
    });

    const endGesture = () => {
      if (state.sliderGesture.param === paramKey) {
        state.sliderGesture.param = null;
        state.sliderGesture.recorded = false;
      }
    };

    inputEl.addEventListener('change', endGesture);
    inputEl.addEventListener('pointerup', endGesture);
    inputEl.addEventListener('pointercancel', endGesture);
    inputEl.addEventListener('blur', endGesture);
  }

  bindUndoableSlider(dom.sliderW, 'w');
  bindUndoableSlider(dom.sliderB, 'b');

  // Ctrl+Z / Cmd+Z Undo (ONLY added points & slider changes)
  window.addEventListener('keydown', (evt) => {
    const isUndo =
      (evt.ctrlKey || evt.metaKey) &&
      !evt.shiftKey &&
      !evt.altKey &&
      evt.key.toLowerCase() === 'z';
    if (!isUndo) return;

    const active = document.activeElement;
    if (
      active &&
      (active.tagName === 'TEXTAREA' ||
        (active.tagName === 'INPUT' && active.type !== 'range'))
    ) {
      return;
    }

    evt.preventDefault();
    performUndo();
  });

  dom.btnBestFit.addEventListener('click', () => {
    animateToBestFit();
  });

  dom.btnRandomLine.addEventListener('click', () => {
    generateRandomLine();
  });

  dom.btnNewPoints.addEventListener('click', () => {
    generateRandomPoints();
    generateRandomLine();
  });

  dom.presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      applyPreset(btn.dataset.preset);
    });
  });

  dom.segButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.residualMode = btn.dataset.residuals;
      dom.segButtons.forEach((b) => b.classList.toggle('active', b === btn));
      renderMainPlot();
    });
  });

  dom.inputXLabel.addEventListener('input', () => {
    state.xLabel = dom.inputXLabel.value;
    syncUI();
    renderMainPlot();
  });

  dom.inputYLabel.addEventListener('input', () => {
    state.yLabel = dom.inputYLabel.value;
    syncUI();
    renderMainPlot();
  });

  dom.inputPredictX.addEventListener('input', () => {
    const raw = dom.inputPredictX.value.trim();
    if (raw === '') {
      state.predictX = null;
      state.hoveredPredict = false;
      clearPredictPeek();
    } else {
      const parsed = parseFloat(raw);
      if (Number.isFinite(parsed)) {
        state.predictX = parsed;
        triggerPredictPeek();
      } else {
        state.predictX = null;
        state.hoveredPredict = false;
        clearPredictPeek();
      }
    }
    syncUI();
    renderMainPlot();
  });

  dom.btnGdToggle.addEventListener('click', () => {
    toggleGradientDescent();
  });

  dom.btnGdStep.addEventListener('click', () => {
    stopAllMotion();
    gradientDescentStep();
  });

  dom.sliderLr.addEventListener('input', () => {
    state.gd.lr = sliderPosToLr(parseFloat(dom.sliderLr.value));
    syncUI();
  });

  // =========================================================================
  // Responsive Resize Observer
  // =========================================================================
  let resizeRaf = null;
  const resizeObserver = new ResizeObserver(() => {
    if (resizeRaf !== null) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = null;
      renderMainPlot();
      renderCostPlots();
    });
  });
  resizeObserver.observe(dom.mainCanvas.parentElement);
  resizeObserver.observe(dom.costWCanvas.parentElement);
  resizeObserver.observe(dom.costBCanvas.parentElement);

  // =========================================================================
  // Boot
  // =========================================================================
  state.gd.lr = sliderPosToLr(parseFloat(dom.sliderLr.value));
  applyPreset('random');
})();
