// Google Analytics 4 script generator
export function ga4Script(measurementId: string | undefined): string {
  if (!measurementId) return ''

  return `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    </script>
  `
}
