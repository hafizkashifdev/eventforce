import { redirect } from 'next/navigation';

// Redirect to new support FAQ page
export default function FAQPage() {
  redirect('/support/faq');
}