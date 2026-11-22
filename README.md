# Linear Regression Visualizer

An interactive, zero-dependency web app for exploring linear regression ($\hat{y} = wx + b$), Mean Squared Error (MSE) cost functions, and Gradient Descent in real time.

**Live Demo:** https://abdelhaleem1.github.io/linear-regression-visualizer/

## Features

- **Direct Line Manipulation**
  - Drag the **teal middle handle** up/down to adjust the **intercept ($b$)**.
  - Drag either **orange corner handle** to tilt the **slope ($w$)**.
  - Synchronized **Slope ($w$)** and **Intercept ($b$)** sliders.
- **Live MSE Cost Function Graphs**
  - Real-time **MSE vs. Weight ($w$)** and **MSE vs. Bias ($b$)** parabolas with tangent slope indicators and optimal slice reference curves.
  - Drag directly along either cost curve to scrub $w$ or $b$.
- **Optimization Controls**
  - **Best Fit**: Smoothly animates directly to the exact Ordinary Least Squares (OLS) solution.
  - **Gradient Descent**: Run continuous gradient descent (Play/Pause), single **Step**, and tune the learning rate ($\alpha$) with standardized updates that work cleanly across any scale.
- **Real-World Example Presets**
  - **Random**: Centered synthetic data ($x \in [-6, 6]$)
  - **House**: House `Size (sqft)` vs. `Price ($k)`
  - **Study**: Study `Hours` vs. Exam `Score`
  - **Salary**: Experience `Years` vs. `Salary ($k)`
- **Interactive Data & Predictions**
  - Editable **X** and **Y** axis labels reflected on the axes, point hover tooltips, and Predict panel.
  - Hover any point to inspect `<X label> = ..., <Y label> = ...`.
  - Click empty space to add points; right-click a point to remove it.
  - **Predict**: Enter any $x$ value to compute $\hat{y}$ live and plot the prediction marker on the regression line.
  - **Residuals**: Toggle between dashed residual lines, squared-error squares, or off.
  - **Undo (`Ctrl+Z`)**: Undoes added points and slider changes.

## Run Locally

No build tools or dependencies required — just open `index.html` in any modern browser, or serve the folder locally:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.
