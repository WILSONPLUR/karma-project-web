import CMS from "decap-cms-app";

// Import main site styles as a string to inject into the CMS preview pane
// eslint-disable-next-line import/no-unresolved
import styles from "!to-string-loader!css-loader!postcss-loader!sass-loader!../css/main.scss";

import HomePreview from "./cms-preview-templates/home";
import PostPreview from "./cms-preview-templates/post";
import ProductsPreview from "./cms-preview-templates/products";
import ValuesPreview from "./cms-preview-templates/values";

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
    }
  ]
};

CMS.registerPreviewStyle(styles, {raw: true});
CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("post", PostPreview);
CMS.registerPreviewTemplate("products", ProductsPreview);
CMS.registerPreviewTemplate("values", ValuesPreview);
CMS.registerPreviewTemplate("footer", FooterPreview);

// Initialize CMS with manual config since config.yml loading fails in dev mode
CMS.init({ config });
