import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Preview component for knowledge base posts
const KnowledgeBasePreview = ({ entry, widgetFor, widgetsFor }) => {
  const data = entry.getIn(["data"]).toJS();
  
  return html`
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <!-- Breadcrumbs -->
        <div className="mb-5 flex items-center justify-start gap-2 text-red-600 font-montserrat">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4 font-montserrat">
          ${data.title}
        </h1>

        <!-- Meta Info -->
        <div className="flex items-center gap-4 mb-6 text-gray-600">
          <span>📅 ${new Date(data.date).toLocaleDateString('uk-UA')}</span>
          ${data.tags && data.tags.length > 0 ? html`
            <div className="flex gap-2">
              ${data.tags.map(tag => html`
                <span className="px-2 py-1 text-xs bg-gray-200 rounded">#${tag}</span>
              `)}
            </div>
          ` : ''}
        </div>

        <!-- Description -->
        ${data.description ? html`
          <div className="text-lg text-gray-700 mb-8 p-4 bg-gray-50 rounded-lg">
            ${data.description}
          </div>
        ` : ''}

        <!-- Image -->
        ${data.image ? html`
          <div className="mb-8">
            <img src="${data.image}" alt="${data.title}" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        ` : ''}

        <!-- Content -->
        <div className="prose prose-lg max-w-none">
          ${widgetFor('body')}
        </div>
      </div>
    </div>
  `;
};

export default KnowledgeBasePreview;
