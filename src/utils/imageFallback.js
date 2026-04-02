const toDataUri = (svg) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

export const getFallbackImage = (title, category) => {
  const safeTitle = title ?? "Product";
  const safeCategory = category ?? "catalog";

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e0f2fe" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
      </defs>
      <rect width="900" height="900" rx="60" fill="url(#bg)" />
      <circle cx="180" cy="180" r="120" fill="#22d3ee" opacity="0.18" />
      <circle cx="730" cy="730" r="140" fill="#0f172a" opacity="0.08" />
      <rect x="145" y="150" width="610" height="370" rx="44" fill="#0f172a" opacity="0.08" />
      <path d="M225 460l120-132 102 98 94-74 134 108" fill="none" stroke="#0f172a" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" opacity="0.35" />
      <circle cx="585" cy="260" r="42" fill="#22d3ee" opacity="0.7" />
      <text x="120" y="640" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700" fill="#0891b2" letter-spacing="6">${safeCategory.toUpperCase()}</text>
      <text x="120" y="720" font-family="Segoe UI, Arial, sans-serif" font-size="60" font-weight="900" fill="#0f172a">${safeTitle}</text>
      <text x="120" y="790" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="600" fill="#475569">Image preview unavailable</text>
    </svg>
  `;

  return toDataUri(svg);
};
