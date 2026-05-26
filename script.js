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
    title: "Dataset summary figure",
    image: "assets/dataset-figure.png",
    description:
      "High-resolution summary figure of user distribution, user and post statistics, stratification, and overall dataset scope.",
  },
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

function getIntroItems(labelIntro, fieldName) {
  const items = labelIntro?.[fieldName] || [];
  return items.slice(0, 3).map((item) => item.zh || item.en || item).filter(Boolean);
}

function normalizeKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function buildIntroMap(allLabels) {
  return Object.fromEntries(
    allLabels.map((item) => [normalizeKey(item.en), item.label_intro || {}]),
  );
}

function renderShowcaseGroup({
  containerId,
  labels,
  categories,
  introMap,
  introField,
  badge,
}) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  labels.forEach((key) => {
    const category = categories[key];
    if (!category) {
      return;
    }

    const example = category.examples?.[0];
    const introItems = getIntroItems(introMap[normalizeKey(category.label_en || key)], introField);
    const labelEn = category.label_en || key;
    const labelCn = category.label_cn || "";

    const card = document.createElement("article");
    card.className = "showcase-card";
    card.innerHTML = `
      <span class="sample-tag">${badge}</span>
      <h4>${labelEn}</h4>
      <p class="showcase-label-cn">${labelCn}</p>
      ${
        introItems.length
          ? `<p class="showcase-hint">${introItems.slice(0, 2).join(" / ")}</p>`
          : ""
      }
      ${
        example
          ? `
            <div class="showcase-example">
              <div class="showcase-quote-card">
                <p class="showcase-card-title">Original</p>
                <p class="showcase-quote">${example.content}</p>
              </div>
              <div class="showcase-translation-card">
                <p class="showcase-card-title">Translation</p>
                <p class="showcase-translation">${example.content_en || ""}</p>
              </div>
            </div>
          `
          : `<p class="showcase-hint">No example available.</p>`
      }
    `;
    container.appendChild(card);
  });
}

async function renderClassifierShowcase() {
  const lifeEventContainer = document.getElementById("life-event-showcase");
  const symptomContainer = document.getElementById("symptom-showcase");

  try {
    const response = await fetch("materials/data/samples.json");
    if (!response.ok) {
      throw new Error("Failed to load samples.json");
    }

    const data = await response.json();
    const lifeEventIntroMap = buildIntroMap(data.life_events.all_labels);
    const symptomIntroMap = buildIntroMap(data.symptoms.all_labels);
    const lifeEventLabels = Object.keys(data.life_events.categories);
    const symptomLabels = Object.keys(data.symptoms.categories);

    renderShowcaseGroup({
      containerId: "life-event-showcase",
      labels: lifeEventLabels,
      categories: data.life_events.categories,
      introMap: lifeEventIntroMap,
      introField: "subtypes",
      badge: "Life Event",
    });

    renderShowcaseGroup({
      containerId: "symptom-showcase",
      labels: symptomLabels,
      categories: data.symptoms.categories,
      introMap: symptomIntroMap,
      introField: "manifestations",
      badge: "Symptom",
    });
  } catch (error) {
    const fallback = `
      <article class="showcase-card">
        <span class="sample-tag">Unavailable</span>
        <h4>Could not load classifier showcase</h4>
        <p class="showcase-meta">Please make sure materials/data/samples.json is included in the repository.</p>
      </article>
    `;
    lifeEventContainer.innerHTML = fallback;
    symptomContainer.innerHTML = fallback;
    console.error(error);
  }
}

renderStats();
renderComposition();
renderFigures();
renderClassifierShowcase();
