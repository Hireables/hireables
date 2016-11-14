import createDOMPurify from 'dompurify';

export default function sanitize(text) {
  return createDOMPurify.sanitize(text, { ALLOWED_TAGS: ['b', 'i', 'code'] });
}
