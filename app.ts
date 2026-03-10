type TabId = "visitors" | "acreage" | "wildlife" | "airports" | "uniqueness";
type FeatureTabId = "trees" | "water" | "vistas";

type Park = {
  name: string;
  state: string;
  visitors2024: number;
  acreage: number;
  note: string;
};

type MetricConfig = {
  title: string;
  kicker: string;
  meta: string;
  summaryTitle: string;
  summaryText: string;
  value: (park: Park) => number;
  format: (value: number) => string;
  note: (park: Park) => string;
  subvalue?: (park: Park) => string;
};

type FeatureEntry = {
  park: string;
  title: string;
  detail: string;
};

type DetailItem = {
  park: string;
  label: string;
  short: string;
  detail: string;
  chip: string;
};

type DetailConfig = {
  title: string;
  kicker: string;
  meta: string;
  summaryTitle: string;
  summaryText: string;
  items: DetailItem[];
};

const parks: Park[] = [
  {
    name: "Yosemite",
    state: "California",
    visitors2024: 4121807,
    acreage: 759620,
    note: "Granite walls, waterfalls, and giant sequoias anchor Yosemite’s appeal."
  },
  {
    name: "Olympic",
    state: "Washington",
    visitors2024: 3717267,
    acreage: 922651,
    note: "Olympic combines glacier peaks, rain forest, and wild Pacific coast."
  },
  {
    name: "Joshua Tree",
    state: "California",
    visitors2024: 2991874,
    acreage: 795156,
    note: "Joshua Tree stands out for stark desert terrain and night-sky viewing."
  },
  {
    name: "Mount Rainier",
    state: "Washington",
    visitors2024: 1620006,
    acreage: 235625,
    note: "An active volcano with glaciers, meadows, and dense forest."
  },
  {
    name: "Redwood",
    state: "California",
    visitors2024: 622883,
    acreage: 138999,
    note: "Home to the tallest trees on Earth and a dramatic coastal setting."
  },
  {
    name: "Crater Lake",
    state: "Oregon",
    visitors2024: 504942,
    acreage: 183224,
    note: "Defined by a deep blue volcanic lake and high-elevation rim views."
  }
];

const metrics: Record<"visitors" | "acreage", MetricConfig> = {
  visitors: {
    title: "Where visitors go first",
    kicker: "Best for crowd energy",
    meta: "Source: NPS IRMA annual 2024 visitation report",
    summaryTitle: "Yosemite leads this set on 2024 demand.",
    summaryText: "It logged 4,121,807 recreation visits in 2024, with Olympic and Joshua Tree close behind.",
    value: (park) => park.visitors2024,
    format: (value) => value.toLocaleString("en-US"),
    note: (park) => `${park.state} · ${park.note}`,
    subvalue: (park) => `${Math.round(park.visitors2024 / 1000)}K visits`
  },
  acreage: {
    title: "Where you get the most room to roam",
    kicker: "Best for scale",
    meta: "Source: NPS park statistics and inventory pages",
    summaryTitle: "Olympic has the largest footprint in this lineup.",
    summaryText: "It covers 922,651 acres, followed by Joshua Tree and Yosemite.",
    value: (park) => park.acreage,
    format: (value) => `${value.toLocaleString("en-US")} acres`,
    note: (park) => `${park.state} · ${park.note}`,
    subvalue: (park) =>
      `${(park.acreage / 640).toLocaleString("en-US", { maximumFractionDigits: 0 })} sq mi`
  }
};

const details: Record<"wildlife" | "airports" | "uniqueness", DetailConfig> = {
  wildlife: {
    title: "What to watch for in each park",
    kicker: "Best for wildlife moments",
    meta: "Source: NPS wildlife pages",
    summaryTitle: "Wildlife changes completely with the landscape.",
    summaryText: "Think black bears and mule deer in Yosemite, Roosevelt elk in Olympic and Redwood, and desert tortoises in Joshua Tree.",
    items: [
      {
        park: "Olympic",
        label: "Roosevelt elk",
        short: "Largest fully wild Roosevelt elk herd in the Pacific Northwest.",
        detail: "Olympic also highlights marmots on alpine trails and salmon runs in its rivers.",
        chip: "Rain forest and coast"
      },
      {
        park: "Redwood",
        label: "Roosevelt elk and banana slugs",
        short: "One of the easiest parks here for iconic coastal wildlife sightings.",
        detail: "NPS says visitors often spot sea lions, bald eagles, salamanders, Roosevelt elk, and banana slugs.",
        chip: "Forest and shoreline"
      },
      {
        park: "Yosemite",
        label: "Black bears and mule deer",
        short: "Yosemite’s black bears are a visitor favorite, while mule deer are common in the valley.",
        detail: "NPS notes hundreds of black bears live in Yosemite and deer are often seen in Yosemite Valley.",
        chip: "Classic Sierra wildlife"
      },
      {
        park: "Joshua Tree",
        label: "Bighorn sheep and desert tortoise",
        short: "Joshua Tree wildlife feels sparse until you know what to look for.",
        detail: "NPS asks visitors to report bighorn sheep sightings and notes tortoises, foxes, and golden eagles among notable species.",
        chip: "Desert specialists"
      },
      {
        park: "Mount Rainier",
        label: "Black bears and mountain lions",
        short: "Subalpine meadows and forests make sightings feel dramatic here.",
        detail: "Mount Rainier’s wildlife safety guidance emphasizes black bears and mountain lions, especially in backcountry settings.",
        chip: "Volcano and meadows"
      },
      {
        park: "Crater Lake",
        label: "Clark's nutcracker and black bear",
        short: "Rim drives and high-elevation forest bring distinctive Cascades wildlife.",
        detail: "NPS calls Clark's nutcracker a familiar bird around whitebark pine and notes black bear sightings are more common in autumn and late spring.",
        chip: "High-elevation sightings"
      }
    ]
  },
  airports: {
    title: "How most visitors fly in",
    kicker: "Best for arrival planning",
    meta: "Source: NPS directions pages; Olympic entry is an inference from official routing guidance.",
    summaryTitle: "These parks still reward a road-trip mindset.",
    summaryText: "Use the airport as a gateway, then expect a meaningful drive to the entrance or nearest park town.",
    items: [
      {
        park: "Yosemite",
        label: "Merced Airport (MCE)",
        short: "Listed by NPS as the closest commercial airport to Yosemite Valley.",
        detail: "NPS lists Merced at about 2 hours to Yosemite Valley, with YARTS connections available.",
        chip: "Closest commercial airport"
      },
      {
        park: "Joshua Tree",
        label: "Palm Springs",
        short: "NPS says the closest airport is in Palm Springs.",
        detail: "Joshua Tree is still a drive-first park, with entrances spread across a large desert landscape.",
        chip: "Closest airport"
      },
      {
        park: "Mount Rainier",
        label: "Seattle-Tacoma International",
        short: "The closest major airport in the park’s official directions.",
        detail: "NPS lists Seattle-Tacoma at 85 miles from Ashford, closer than Portland or Yakima.",
        chip: "Closest major airport"
      },
      {
        park: "Redwood",
        label: "Del Norte County Airport / Jack McNamara Field",
        short: "Closest airport listed on Redwood’s NPS directions page.",
        detail: "NPS places it about 4 miles from Crescent City Information Center, making it the tightest airport-to-park gateway in this set.",
        chip: "Closest listed airport"
      },
      {
        park: "Crater Lake",
        label: "Rogue Valley-Medford Airport",
        short: "NPS names Medford as the closest airport with commercial flights.",
        detail: "It is listed at 75 miles from park headquarters.",
        chip: "Closest commercial airport"
      },
      {
        park: "Olympic",
        label: "Seattle-Tacoma area gateway",
        short: "Olympic’s official directions focus on reaching the peninsula by road and ferry.",
        detail: "This page treats Seattle-Tacoma as the practical fly-in gateway because official directions route most visitors through Tacoma, Bremerton, or ferry connections onto the peninsula.",
        chip: "Practical air gateway"
      }
    ]
  },
  uniqueness: {
    title: "What makes each park worth the trip",
    kicker: "Best for standout identity",
    meta: "Source: NPS homepages and feature pages",
    summaryTitle: "Each park wins on a different kind of spectacle.",
    summaryText: "Some are about raw scale, some about signature species, and some are simply unlike anywhere else in the lower 48.",
    items: [
      {
        park: "Yosemite",
        label: "The park idea’s iconic landscape",
        short: "Granite walls, waterfalls, and a grove with 500+ mature giant sequoias.",
        detail: "NPS ties Mariposa Grove directly to the origins of the national park idea.",
        chip: "Granite and giant sequoias"
      },
      {
        park: "Olympic",
        label: "Three ecosystems in one trip",
        short: "Glacier peaks, old-growth rain forest, and wild Pacific coast in one park.",
        detail: "Olympic’s homepage frames ecological diversity as the signature experience.",
        chip: "Mountain, forest, coast"
      },
      {
        park: "Joshua Tree",
        label: "Desert crossover with dark-sky appeal",
        short: "This is where the Mojave and Colorado deserts meet.",
        detail: "Joshua Tree is also widely used for stargazing and surreal rock-and-tree landscapes.",
        chip: "Two deserts, one park"
      },
      {
        park: "Mount Rainier",
        label: "The most glaciated peak in the contiguous U.S.",
        short: "Rainier feels bigger than its acreage because the volcano dominates nearly every view.",
        detail: "Its mix of glaciers, meadows, and old-growth forest gives it a high-drama alpine feel.",
        chip: "Volcano centerpiece"
      },
      {
        park: "Redwood",
        label: "Tallest trees on Earth",
        short: "Redwood is the place for vertical scale and lush coastal atmosphere.",
        detail: "NPS also emphasizes the park’s global ecological diversity and World Heritage status.",
        chip: "Tallest living trees"
      },
      {
        park: "Crater Lake",
        label: "Deep blue water in a volcanic caldera",
        short: "The deepest lake in the United States and one of the most pristine on Earth.",
        detail: "Its color, clarity, and caldera setting make it the most visually singular park in this set.",
        chip: "Deepest lake in the U.S."
      }
    ]
  }
};

const featureData: Record<FeatureTabId, FeatureEntry[]> = {
  trees: [
    {
      park: "Yosemite",
      title: "Giant sequoias",
      detail: "NPS highlights three giant sequoia groves in Yosemite, including Mariposa Grove with more than 500 mature giant sequoias."
    },
    {
      park: "Olympic",
      title: "Sitka spruce and western hemlock",
      detail: "Olympic’s coastal and temperate rain forests feature Sitka spruce, western hemlock, and western redcedar."
    },
    {
      park: "Joshua Tree",
      title: "Joshua tree, pinyon pine, and juniper",
      detail: "NPS describes Joshua tree-dominated Mojave habitat and higher-elevation stands of pinyon pine and juniper."
    },
    {
      park: "Mount Rainier",
      title: "Douglas-fir, western hemlock, western redcedar",
      detail: "The Twin Firs area points visitors to Mount Rainier’s 'big three' old-growth conifers."
    },
    {
      park: "Redwood",
      title: "Coast redwoods",
      detail: "Redwood National and State Parks protect coast redwoods, the tallest living trees on Earth."
    },
    {
      park: "Crater Lake",
      title: "Whitebark pine",
      detail: "NPS identifies whitebark pine as a keystone high-elevation tree at Crater Lake."
    }
  ],
  water: [
    {
      park: "Yosemite",
      title: "Tenaya Lake",
      detail: "Tenaya Lake is Yosemite’s largest frontcountry lake and one of the park’s most popular summer water destinations."
    },
    {
      park: "Olympic",
      title: "Lake Crescent",
      detail: "Olympic features large freshwater lakes including Lake Crescent, one of the park’s best-known water landscapes."
    },
    {
      park: "Joshua Tree",
      title: "Desert oases",
      detail: "Joshua Tree is defined less by lakes and more by scarce water sources such as oases and seasonal washes."
    },
    {
      park: "Mount Rainier",
      title: "Reflection Lakes",
      detail: "Reflection Lakes is one of the park’s most popular stops for mirrored views of Mount Rainier."
    },
    {
      park: "Redwood",
      title: "Redwood Creek",
      detail: "Redwood Creek is a core river corridor in the park and a major restoration landscape."
    },
    {
      park: "Crater Lake",
      title: "Crater Lake",
      detail: "Crater Lake itself is the signature water feature and the deepest lake in the United States."
    }
  ],
  vistas: [
    {
      park: "Yosemite",
      title: "Tunnel View",
      detail: "Tunnel View frames Yosemite Valley with El Capitan, Half Dome, Sentinel Rock, Cathedral Rocks, and Bridalveil Fall."
    },
    {
      park: "Olympic",
      title: "Hurricane Ridge",
      detail: "Hurricane Ridge is one of Olympic’s most popular mountain viewpoints, with broad views across the Olympic Mountains."
    },
    {
      park: "Joshua Tree",
      title: "Keys View",
      detail: "Keys View offers panoramic views over the Coachella Valley, the Salton Sea, and the San Andreas Fault."
    },
    {
      park: "Mount Rainier",
      title: "Inspiration Point",
      detail: "Inspiration Point was deliberately designed as a scenic overlook to showcase Mount Rainier."
    },
    {
      park: "Redwood",
      title: "Redwood Creek Overlook",
      detail: "Redwood Creek Overlook looks out over old-growth forest, the valley, and the Pacific on clear days."
    },
    {
      park: "Crater Lake",
      title: "Watchman and Phantom Ship overlooks",
      detail: "Crater Lake’s Rim Drive includes major overlooks such as Watchman Overlook and Phantom Ship Overlook."
    }
  ]
};

function init(): void {
  const bars = document.querySelector<HTMLElement>("#bars");
  const leaderboard = document.querySelector<HTMLElement>("#leaderboard");
  const chartTitle = document.querySelector<HTMLElement>("#chart-title");
  const chartKicker = document.querySelector<HTMLElement>("#chart-kicker");
  const chartMeta = document.querySelector<HTMLElement>("#chart-meta");
  const comparisonSummary = document.querySelector<HTMLElement>("#comparison-summary");
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-tab]"));
  const featureTabs = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-feature-tab]"));
  const featureGrid = document.querySelector<HTMLElement>("#feature-grid");

  function renderFeatures(tabId: FeatureTabId): void {
    if (!featureGrid) {
      return;
    }

    featureGrid.innerHTML = featureData[tabId]
      .map(
        (entry) => `
          <article class="feature-card">
            <strong>${entry.park}</strong>
            <h3>${entry.title}</h3>
            <p>${entry.detail}</p>
          </article>
        `
      )
      .join("");

    featureTabs.forEach((tab) => {
      const active = tab.dataset.featureTab === tabId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
  }

  function renderMetric(tabId: "visitors" | "acreage"): void {
    if (!bars || !leaderboard || !chartTitle || !chartKicker || !chartMeta || !comparisonSummary) {
      return;
    }

    const metric = metrics[tabId];
    const sorted = [...parks].sort((left, right) => metric.value(right) - metric.value(left));
    const values = sorted.map((park) => metric.value(park));
    const maxValue = Math.max(...values);

    chartTitle.textContent = metric.title;
    chartKicker.textContent = metric.kicker;
    chartMeta.textContent = metric.meta;
    comparisonSummary.innerHTML = `<strong>${metric.summaryTitle}</strong><p>${metric.summaryText}</p>`;

    bars.innerHTML = sorted
      .map((park) => {
        const value = metric.value(park);
        const width = (value / maxValue) * 100;

        return `
          <div class="bar-row">
            <div class="bar-label">${park.name}</div>
            <div class="bar-track">
              <div class="bar-fill" style="--size: ${width.toFixed(2)}%"></div>
            </div>
            <div class="bar-value">
              ${metric.format(value)}
              ${metric.subvalue ? `<span class="bar-subvalue">${metric.subvalue(park)}</span>` : ""}
            </div>
          </div>
        `;
      })
      .join("");

    leaderboard.innerHTML = sorted
      .map(
        (park, index) => `
          <article class="leader-card">
            <span class="leader-rank">${index + 1}</span>
            <h3>${park.name}</h3>
            <div class="value-line">
              <strong>${metric.format(metric.value(park))}</strong>
              <span class="value-note">${park.state}</span>
            </div>
            <p class="value-note">${metric.note(park)}</p>
          </article>
        `
      )
      .join("");
  }

  function renderDetail(tabId: "wildlife" | "airports" | "uniqueness"): void {
    if (!bars || !leaderboard || !chartTitle || !chartKicker || !chartMeta || !comparisonSummary) {
      return;
    }

    const detail = details[tabId];

    chartTitle.textContent = detail.title;
    chartKicker.textContent = detail.kicker;
    chartMeta.textContent = detail.meta;
    comparisonSummary.innerHTML = `<strong>${detail.summaryTitle}</strong><p>${detail.summaryText}</p>`;

    bars.innerHTML = detail.items
      .map(
        (item) => `
          <div class="bar-row">
            <div class="bar-label">${item.park}</div>
            <div>
              <strong>${item.label}</strong>
              <span class="bar-subvalue">${item.short}</span>
            </div>
            <div class="bar-value">${item.chip}</div>
          </div>
        `
      )
      .join("");

    leaderboard.innerHTML = detail.items
      .map(
        (item, index) => `
          <article class="leader-card">
            <span class="leader-rank">${index + 1}</span>
            <h3>${item.park}</h3>
            <div class="value-line">
              <strong>${item.label}</strong>
            </div>
            <p class="value-note">${item.detail}</p>
            <span class="detail-chip">${item.chip}</span>
          </article>
        `
      )
      .join("");
  }

  function render(tabId: TabId): void {
    if (tabId === "visitors" || tabId === "acreage") {
      renderMetric(tabId);
    } else {
      renderDetail(tabId);
    }

    tabs.forEach((tab) => {
      const active = tab.dataset.tab === tabId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.dataset.tab as TabId | undefined;
      if (tabId) {
        render(tabId);
      }
    });
  });

  featureTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.dataset.featureTab as FeatureTabId | undefined;
      if (tabId) {
        renderFeatures(tabId);
      }
    });
  });

  renderFeatures("trees");
  render("visitors");
}

document.addEventListener("DOMContentLoaded", init);
