export const generateHtmlFileContent = (metaTags: String) => {
  // Define the content of the HTML file
  const htmlContent = `<!DOCTYPE html>
     <html lang="en">
     <head>
     <!-- Injected using meta editor 🚀 -->
     ${metaTags}
     <!--- ---------------------------- -->
     </head>
     <body>
     <!-- body content goes here -->
     </body>
     </html>`;
  return htmlContent;
};

export function injectMetaTagsIntoHTML(metaTags: string, html: string): string {
  // Check if the provided HTML contains a <head> tag
  if (!html.includes("<head>")) {
    throw new Error("The provided HTML doesn't contain a <head> tag.");
  }

  // Split the HTML content into two parts: before and after the <head> tag
  const headIndex = html.indexOf("<head>");
  const htmlBeforeHead = html.slice(0, headIndex + "<head>".length);
  const htmlAfterHead = html.slice(headIndex + "<head>".length);

  // Construct the modified HTML with injected meta tags
  const modifiedHTML = `${htmlBeforeHead}
  <!-- Injected using meta editor 🚀 -->
  ${metaTags}
  <!--- ---------------------------- -->
  ${htmlAfterHead}`;

  return modifiedHTML;
}
