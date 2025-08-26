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

// Note: CMS configuration is now handled by config.yml
// This file only handles preview templates and styling

CMS.registerPreviewStyle(styles, {raw: true});
CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("post", PostPreview);
CMS.registerPreviewTemplate("products", ProductsPreview);
CMS.registerPreviewTemplate("product", ProductPreview);
CMS.registerPreviewTemplate("values", ValuesPreview);
CMS.registerPreviewTemplate("knowledge-base", KnowledgeBasePreview);
CMS.registerPreviewTemplate("footer", FooterPreview);

// CMS will automatically load config.yml from /admin/config.yml
// No manual initialization needed
