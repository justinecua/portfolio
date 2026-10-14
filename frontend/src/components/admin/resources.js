// Describes each content type the admin can manage. ResourceManager
// renders the list and the form from these definitions.

export const RESOURCES = {
  projects: {
    label: "Projects",
    singular: "project",
    path: "manage/projects/",
    fields: [
      { name: "title", label: "Title", required: true },
      {
        name: "tag",
        label: "Tag",
        placeholder: "Mobile app, Web system…",
        required: true,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
      },
      {
        name: "stack",
        label: "Stack",
        placeholder: "Django, React, PostgreSQL",
        hint: "Comma separated",
      },
      {
        name: "site",
        label: "Live link",
        type: "url",
        placeholder: "https://…",
      },
      {
        name: "youtube",
        label: "YouTube demo",
        placeholder: "Video URL or ID",
      },
      {
        name: "thumbnail_file",
        label: "Thumbnail photo",
        type: "file",
        accept: "image/png,image/jpeg,image/webp,image/gif",
        current: (f) => f.currentThumbnail,
        preview: true,
        hint: "Upload an image (max 5 MB). Used before the URL and YouTube thumbnail.",
      },
      {
        name: "clear_thumbnail_file",
        label: "Remove uploaded photo",
        type: "checkbox",
        showIf: (f) => Boolean(f.currentThumbnail) && !f.thumbnail_file,
      },
      {
        name: "thumbnail",
        label: "Thumbnail URL",
        type: "url",
        placeholder: "https://… (optional)",
        hint: "Or link an image. Without either, the YouTube thumbnail is used.",
      },
    ],
    row: (p) => ({
      title: p.title,
      meta: [p.tag, p.stack?.map((s) => s.name).join(", ")]
        .filter(Boolean)
        .join(" · "),
    }),
    toForm: (p) => ({
      title: p.title || "",
      tag: p.tag || "",
      description: p.description || "",
      stack: (p.stack || []).map((s) => s.name).join(", "),
      site: p.site || "",
      youtube: p.youtube || "",
      thumbnail: p.thumbnail || "",
      thumbnail_file: null,
      currentThumbnail: p.thumbnail_file || "",
      clear_thumbnail_file: false,
    }),
    toPayload: (f) => {
      const data = {
        title: f.title,
        tag: f.tag,
        description: f.description,
        stack_names: f.stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        site: f.site,
        youtube: f.youtube,
        thumbnail: f.thumbnail,
        clear_thumbnail_file: f.clear_thumbnail_file,
      };
      if (!f.thumbnail_file) return data;

      // a new photo has to go up as multipart form data
      const form = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (Array.isArray(v)) v.forEach((item) => form.append(k, item));
        else form.append(k, v);
      });
      form.append("thumbnail_file", f.thumbnail_file);
      return form;
    },
  },

  posts: {
    label: "Blog",
    singular: "post",
    path: "manage/posts/",
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "tag", label: "Tag", required: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { name: "read_time", label: "Read time (minutes)", required: true },
      {
        name: "published_date",
        label: "Published",
        type: "date",
        required: true,
      },
      { name: "content", label: "Content", type: "blocks" },
    ],
    row: (p) => ({
      title: p.title,
      meta: [p.published_date, p.tag, `${p.content?.length || 0} blocks`].join(
        " · ",
      ),
    }),
    toForm: (p) => ({
      title: p.title || "",
      tag: p.tag || "",
      excerpt: p.excerpt || "",
      read_time: p.read_time || "",
      published_date: p.published_date || new Date().toISOString().slice(0, 10),
      content: (p.content || []).map(({ type, text }) => ({ type, text })),
    }),
    toPayload: (f) => f,
  },

  certificates: {
    label: "Certificates",
    singular: "certificate",
    path: "manage/certificates/",
    multipart: true,
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "issuer", label: "Issuer", required: true },
      { name: "category", label: "Category" },
      { name: "date_label", label: "Date", placeholder: "June 24-26, 2026" },
      {
        name: "url",
        label: "Certificate link",
        type: "url",
        placeholder: "https://…",
      },
      {
        name: "file",
        label: "PDF file",
        type: "file",
        accept: "application/pdf,image/*",
        current: (f) => f.currentFile,
        hint: "A link or a file is required",
      },
      {
        name: "order",
        label: "Sort order",
        type: "number",
        hint: "Lower numbers show first",
      },
    ],
    row: (c) => ({
      title: c.title,
      meta: [c.issuer, c.date_label, c.file ? "PDF" : "Link"]
        .filter(Boolean)
        .join(" · "),
    }),
    toForm: (c) => ({
      title: c.title || "",
      issuer: c.issuer || "",
      category: c.category || "",
      date_label: c.date_label || "",
      url: c.url || "",
      file: null,
      currentFile: c.file || "",
      order: c.order ?? 0,
    }),
    toPayload: (f) => {
      const data = new FormData();
      ["title", "issuer", "category", "date_label", "url", "order"].forEach(
        (k) => data.append(k, f[k] ?? ""),
      );
      // only send the file when a new one was picked
      if (f.file) data.append("file", f.file);
      return data;
    },
  },
};
