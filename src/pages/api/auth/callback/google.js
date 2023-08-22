import { getSession } from 'next-auth/react';

export default async function callback(req, res) {
  const session = await getSession({ req });
  if (session) {
    // Redirect to a logged-in page
    res.redirect('/dashboard');
  } else {
    // Handle sign-in failure
    res.status(401).json({ error: 'Unauthorized' });
  }
}
