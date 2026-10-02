"""Generate the mathematical planning figure and its data. Requires matplotlib.

Run from repository root: MPLCONFIGDIR=/tmp/cosmicbrain-mpl python3 scripts/render-evaluation-precision.py
This figure contains no measured robot performance.
"""
import csv
import math
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

out = Path(__file__).resolve().parents[1] / "public/evaluations"
z = 1.959963984540054
counts = [10, 20, 50, 100, 200, 400]
rows = []
for n in counts:
    p = 0.5
    d = 1 + z*z/n
    center = (p + z*z/(2*n))/d
    half = z*math.sqrt(p*(1-p)/n + z*z/(4*n*n))/d
    rows.append([n, n//2, p, center-half, center+half, half*100])
with (out / "precision-planning.csv").open("w", newline="") as f:
    writer = csv.writer(f, lineterminator="\n")
    writer.writerow(["independent_trials", "hypothetical_successes", "hypothetical_rate", "wilson_95_lower", "wilson_95_upper", "half_width_percentage_points"])
    writer.writerows(rows)

plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 13, "svg.fonttype": "none", "svg.hashsalt": "cosmicbrain-evaluation-v0.1", "axes.labelcolor": "#68675d", "xtick.color": "#68675d", "ytick.color": "#68675d"})
fig, ax = plt.subplots(figsize=(10, 6.5), dpi=100)
fig.patch.set_facecolor("#fffefa")
ax.set_facecolor("#fffefa")
ax.plot(counts, [r[-1] for r in rows], "o-", color="#ad4a30", linewidth=2.4, markersize=8)
ax.set_xscale("log")
ax.set_xticks(counts, [str(n) for n in counts])
ax.set_xlim(8, 530)
ax.set_ylim(0, 32)
ax.set_yticks([0, 5, 10, 15, 20, 25, 30])
ax.minorticks_off()
ax.grid(axis="y", color="#dfdbd0", linewidth=.8)
ax.set_axisbelow(True)
for spine in ["top", "right"]:
    ax.spines[spine].set_visible(False)
for spine in ["bottom", "left"]:
    ax.spines[spine].set_color("#c8c2b4")
ax.tick_params(length=0, pad=10)
ax.set_xlabel("Independent attempts (log scale)", labelpad=20)
ax.set_ylabel("95% interval half-width (percentage points)", labelpad=16)
for row in rows:
    ax.annotate(f"±{row[-1]:.1f}", (row[0], row[-1]), xytext=(0, 14), textcoords="offset points", ha="center", color="#ad4a30", fontsize=13, fontweight="bold")
fig.subplots_adjust(left=.13, right=.97, top=.94, bottom=.18)
fig.savefig(out / "precision-planning.svg", metadata={"Date": None, "Description": "Mathematical illustration, not CosmicBrain performance: 95% Wilson intervals at hypothetical 50% success for independent binary trials."})
svg = out / "precision-planning.svg"
svg.write_text("\n".join(line.rstrip() for line in svg.read_text().splitlines()) + "\n")
plt.close(fig)
print("Generated precision-planning.svg and precision-planning.csv")
