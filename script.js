const stats = [
  {
    value: "47,131",
    label: "Users",
    desc: "Disorder-related and control users in the public dataset summary.",
  },
  {
    value: "1.8M+",
    label: "Posts",
    desc: "Combined Super-Topic and homepage posts after de-identification.",
  },
  {
    value: "7,849",
    label: "IP Users",
    desc: "Users with explicit evidence posts identified by the annotation pipeline.",
  },
  {
    value: "13,723",
    label: "Annotated Posts",
    desc: "Unique posts used to train and evaluate symptom and life-event classifiers.",
  },
];

const composition = [
  ["ADHD", "10,084", "878", "9,519", "197", "40"],
  ["ASD", "33,622", "4,591", "30,525", "753", "54"],
  ["BD", "125,653", "10,676", "117,518", "3,876", "612"],
  ["DEP", "1,232,940", "101,438", "1,167,830", "25,202", "4,085"],
  ["GAD", "170,874", "42,056", "133,411", "10,004", "2,524"],
  ["OCD", "82,006", "8,497", "75,434", "2,390", "442"],
  ["SZ", "25,816", "1,372", "24,808", "584", "92"],
  ["CONTROL", "155,136", "-", "-", "4,125", "-"],
  ["TOTAL", "1,836,131", "169,508", "1,513,513", "47,131", "7,849"],
];

const figures = [
  {
    title: "Cross-platform differences",
    image: "assets/core18_cross_platform_differences.png",
    description:
      "Representative comparison view highlighting language- and platform-level differences between MATCHA and English benchmarks.",
  },
  {
    title: "Correlation heatmaps",
    image: "assets/correlation_heatmaps_2x2.png",
    description:
      "Correlation patterns across posting hours, life events, and symptom-related signals in cross-lingual analysis.",
  },
  {
    title: "Life-event distribution shift",
    image: "assets/separated_diff_life_event_distribution.png",
    description:
      "Illustrative aggregate differences in life-event distributions across compared groups.",
  },
  {
    title: "Collection pipeline",
    image: "assets/overview-new.png",
    description:
      "Overview of data collection, user grouping, de-identification, and annotation steps for MATCHA.",
  },
];

const samples = [
  {
    tag: "Explicit evidence",
    title: "Diagnosis-oriented example",
    quote: '"Will this illness ever be cured?"',
    note:
      "Illustrative translated example used in the annotation guideline. It reflects explicit condition disclosure and is labeled positive.",
  },
  {
    tag: "Medication and care",
    title: "Treatment-oriented example",
    quote:
      '"I took my meds again today, and I hope the next hospital visit goes well."',
    note:
      "Illustrative translated example indicating medication use and treatment context in the annotation protocol.",
  },
  {
    tag: "Non-positive example",
    title: "Symptom-only example",
    quote:
      '"I have been having headaches and crying a lot recently. What should I do?"',
    note:
      "Illustrative translated example with symptoms but no explicit diagnosis or treatment confirmation, so it is not treated as an identified positive example.",
  },
];

function renderStats() {
  const container = document.getElementById("stats-grid");
  stats.forEach((item) => {
    const card = document.createElement("article");
    card.className = "stat-card";
    card.innerHTML = `
      <p class="stat-value">${item.value}</p>
      <p class="stat-label">${item.label}</p>
      <p class="stat-desc">${item.desc}</p>
    `;
    container.appendChild(card);
  });
}

function renderComposition() {
  const body = document.getElementById("composition-body");
  composition.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = row.map((cell) => `<td>${cell}</td>`).join("");
    body.appendChild(tr);
  });
}

function renderFigures() {
  const gallery = document.getElementById("figure-gallery");
  figures.forEach((item) => {
    const card = document.createElement("article");
    card.className = "figure-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="figure-card-body">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `;
    gallery.appendChild(card);
  });
}

function renderSamples() {
  const grid = document.getElementById("sample-grid");
  samples.forEach((item) => {
    const card = document.createElement("article");
    card.className = "sample-card";
    card.innerHTML = `
      <div class="sample-card-body">
        <span class="sample-tag">${item.tag}</span>
        <h3>${item.title}</h3>
        <p class="sample-quote">${item.quote}</p>
        <p>${item.note}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

renderStats();
renderComposition();
renderFigures();
renderSamples();
