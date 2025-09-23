import { redirect } from 'next/navigation';

// Redirect to new support help-center page
export default function HelpCenterPage() {
  redirect('/support/help-center');
}