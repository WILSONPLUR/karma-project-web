import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Preview component for knowledge base posts
const KnowledgeBasePreview = ({ entry, widgetFor, widgetsFor }) => {
  const data = entry.getIn(["data"]).toJS();
  console.log(data);
  return html`
    <div className="min-h-screen bg-white">
      <div className="px-4 py-8 mx-auto max-w-4xl">
        <!-- Breadcrumbs -->
        <div className="flex gap-2 justify-start items-center mb-5 text-red-600 font-montserrat">
          <a className="text-lg font-normal text-red-600" href="/">Головна</a>
          <span className="text-red-600">→</span>
          <a className="text-lg font-normal text-red-600" href="/knowledge-base">База знань</a>
          <span className="text-red-600">→</span>
          <span className="text-lg font-normal text-red-600">${data.category}</span>
        </div>

        <!-- Category Badge -->
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-full">
            ${data.category}
          </span>
        </div>

        <!-- Title -->
        <h1 className="mb-4 text-3xl font-bold text-gray-900 font-montserrat">
          ${data.title}
        </h1>

        <!-- Meta Info -->
        <div className="flex gap-4 items-center mb-6 text-gray-600">
          <span>📅 ${new Date(data.date).toLocaleDateString("uk-UA")}</span>
          ${data.tags && data.tags.length > 0 ? html`
            <div className="flex gap-2">
              ${data.tags.map((tag) => html`
                <span className="px-2 py-1 text-xs bg-gray-200 rounded">#${tag}</span>
              `)}
            </div>
          ` : ""}
        </div>

        <!-- Description -->
        ${data.description ? html`
          <div className="p-4 mb-8 text-lg text-gray-700 bg-gray-50 rounded-lg">
            ${data.description}
          </div>
          ` : ""}

        <!-- Image -->
        ${data.image ? html`
          <div className="mb-8">
            <img src="${data.image}" alt="${data.title}" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        ` : ""}

        <!-- Content -->
        <div className="max-w-none prose prose-lg">
          ${widgetFor("body")}
        </div>
      </div>
    </div>
  `;
};

export default KnowledgeBasePreview;
