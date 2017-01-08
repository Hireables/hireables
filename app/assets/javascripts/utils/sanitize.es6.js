import createDOMPurify from 'dompurify';

export function sanitizeRichText(text) {
  return createDOMPurify.sanitize(text, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'ins', 'code', 'p', 'li', 'ul', 'ol', 'strong', 'a',
    ],
  });
}

export function sanitizeText(text) {
  return createDOMPurify.sanitize(text, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'code', 'pre'],
  });
}
