// Small build-time helpers.
/** Cert code tile, derived from the issuer (spec 5.2). */
export const issuerCode = (issuer: string) =>
  ({ 'Amazon Web Services': 'AWS', Cisco: 'Cisco' } as Record<string, string>)[issuer] ?? issuer.slice(0, 4);
/** The <noscript> address, e.g. "ajowijaja [at] gmail [dot] com". The plain address never appears in HTML. */
export const noJsEmail = (user: string, domain: string) => `${user} [at] ${domain.split('.').join(' [dot] ')}`;
/** Absolute URL from siteUrl and a root-relative path. */
export const absUrl = (siteUrl: string, p: string) => `${siteUrl.replace(/\/+$/, '')}${p}`;
