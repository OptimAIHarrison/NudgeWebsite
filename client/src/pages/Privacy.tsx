import LegalPage from '@/components/LegalPage';

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 October 2026"
      intro={"This policy explains how Nudge Digital (\"I\", \"me\") collects, uses and protects personal information when you use nudgedigital.com.au. I am based in Melbourne, Australia, and handle personal information in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles."}
      sections={[
    { heading: "What I collect", body: ["Information you give me directly: your name, email address, company, phone number (where requested), the service you are interested in, and the message you send through the contact, enquiry or resource forms.", "Technical information that is collected automatically when you visit, such as your IP address, browser type, device and the pages you view, through standard server logs and any analytics tools in use."] },
    { heading: "How I use it", body: ["To reply to your enquiry, prepare quotes, deliver work you have asked for, send resources you have requested, keep the website secure, and understand how the site is used so I can improve it.", "I do not sell your personal information."] },
    { heading: "Who I share it with", body: ["Only with service providers that help me run the website and my business (for example hosting, database, email and analytics providers), and where required by law. These providers may store information outside Australia."] },
    { heading: "Cookies and analytics", body: ["The site may use cookies and similar technologies for essential functions and analytics. You can control cookies in your browser settings."] },
    { heading: "Storage and security", body: ["I take reasonable steps to protect personal information from misuse, loss and unauthorised access. I keep it only as long as it is needed for the purposes above or required by law."] },
    { heading: "Your rights", body: ["You can ask to access or correct the personal information I hold about you, or ask me to delete it, by emailing hello@nudgedigital.com.au. If you are unhappy with how I have handled your information, contact me first. You can also contact the Office of the Australian Information Commissioner (oaic.gov.au)."] },
    { heading: "Changes", body: ["I may update this policy from time to time. The date at the top shows when it was last changed."] },
      ]}
    />
  );
}
