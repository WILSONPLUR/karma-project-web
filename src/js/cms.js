import CMS from "decap-cms-app";

// Import main site styles as a string to inject into the CMS preview pane
// eslint-disable-next-line import/no-unresolved
import styles from "!to-string-loader!css-loader!postcss-loader!sass-loader!../css/main.scss";

import HomePreview from "./cms-preview-templates/home";
import PostPreview from "./cms-preview-templates/post";
import ProductsPreview from "./cms-preview-templates/products";
import ProductPreview from "./cms-preview-templates/product";
import ValuesPreview from "./cms-preview-templates/values";
import KnowledgeBasePreview from "./cms-preview-templates/knowledge-base";

import FooterPreview from "./cms-preview-templates/footer";

// CMS Configuration
const config = {
  backend: {
    name: 'git-gateway',
    branch: 'main'
  },
  media_folder: 'site/static/img',
  public_folder: 'img',
  media_library: {
    name: 'filesystem',
    folder_support: true
  },
  collections: [
    {
      name: 'products',
      label: 'Товари',
      folder: 'site/content/catalog',
      create: true,
      slug: '{{slug}}',
      fields: [
        { label: 'Назва товару', name: 'title', widget: 'string' },
        { label: 'Опис', name: 'description', widget: 'text' },
        { label: 'Дата створення', name: 'date', widget: 'datetime' },
        { 
          label: 'Категорія', 
          name: 'category', 
          widget: 'select',
          options: ['politni-steky', 'videoperedavachi-vtx', 'esc']
        },
        { label: 'ID товару', name: 'product_id', widget: 'string' },
        { label: 'Зображення', name: 'image', widget: 'image' },
        { label: 'Ціна', name: 'price', widget: 'number' },
        { 
          label: 'Валюта', 
          name: 'currency', 
          widget: 'select',
          options: ['грн', 'USD', 'EUR'],
          default: 'грн'
        },
        { label: 'В наявності', name: 'in_stock', widget: 'boolean', default: true },
        { 
          label: 'Характеристики', 
          name: 'specs', 
          widget: 'list',
          fields: [
            { label: 'Назва', name: 'label', widget: 'string' },
            { label: 'Значення', name: 'value', widget: 'string' }
          ]
        },
        { label: 'Детальний опис', name: 'body', widget: 'markdown' },
        { label: 'Чернетка', name: 'draft', widget: 'boolean', default: false }
      ]
    },
    {
      name: 'post',
      label: 'Post',
      folder: 'site/content/post',
      path: '{{slug}}/index',
      create: true,
      fields: [
        { label: 'Title', name: 'title', widget: 'string' },
        { label: 'Publish Date', name: 'date', widget: 'datetime' },
        { label: 'Intro Blurb', name: 'description', widget: 'text' },
        { label: 'Image', name: 'image', widget: 'image', required: false },
        { label: 'Body', name: 'body', widget: 'markdown' }
      ]
    },
    {
      name: 'knowledge-base',
      label: 'База знань',
      folder: 'site/content/guides',
      create: true,
      slug: '{{slug}}',
      fields: [
        { label: 'Назва', name: 'title', widget: 'string' },
        { label: 'Опис', name: 'description', widget: 'text' },
        { label: 'Дата публікації', name: 'date', widget: 'datetime' },
        { 
          label: 'Категорія', 
          name: 'category', 
          widget: 'select',
          options: ['БПЛА', 'Політні стеки', 'Відеопередавачі', 'ESC']
        },
        { 
          label: 'Теги', 
          name: 'tags', 
          widget: 'list',
          required: false,
          field: { label: 'Тег', name: 'tag', widget: 'string' }
        },
        { label: 'Зображення', name: 'image', widget: 'image', required: false },
        { label: 'Чернетка', name: 'draft', widget: 'boolean', default: false },
        { label: 'Контент', name: 'body', widget: 'markdown' }
      ]
    }
  ]
};

CMS.registerPreviewStyle(styles, {raw: true});
CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("post", PostPreview);
CMS.registerPreviewTemplate("products", ProductsPreview);
CMS.registerPreviewTemplate("product", ProductPreview);
CMS.registerPreviewTemplate("values", ValuesPreview);
CMS.registerPreviewTemplate("knowledge-base", KnowledgeBasePreview);
CMS.registerPreviewTemplate("footer", FooterPreview);

// Initialize CMS with manual config since config.yml loading fails in dev mode
CMS.init({ config });
