import LegalPage from '@/components/LegalPage';

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="1 October 2026"
      intro={"These terms apply to your use of nudgedigital.com.au and to marketing services provided by Nudge Digital (\"I\", \"me\"). Each engagement is also covered by the written quote or agreement for that work, which takes priority if there is a conflict."}
      sections={[
    { heading: "Services and quotes", body: ["I provide marketing strategy, implementation, automation and related services for technology companies and others. Project work is scoped and quoted in writing before it starts. The quote sets out what is included, the price and the timeline, and work begins once you approve it.", "Changes to scope are agreed with you and, if they affect price or timing, confirmed in writing before I proceed."] },
    { heading: "Fees and third-party costs", body: ["Fees are as set out in the quote or, for hourly and retainer work, the rates and terms agreed with you. Prices are in Australian dollars and GST is additional unless stated. Third-party costs such as software subscriptions and advertising spend are separate and are flagged during scoping."] },
    { heading: "Your responsibilities", body: ["You agree to provide timely access, information and approvals, and to confirm that you have the right to give me access to the accounts, platforms and materials needed for the work."] },
    { heading: "Intellectual property", body: ["Deliverables created specifically for you become yours once they are paid for in full. I keep ownership of my pre-existing tools, templates, frameworks and know-how, and you receive the right to use them as part of the deliverables. Third-party tools remain subject to their own licences."] },
    { heading: "No guarantee of results", body: ["Marketing outcomes depend on many factors outside my control, including platform changes, market conditions and your product. I work to professional standards, but I cannot guarantee specific results such as rankings, traffic, leads, revenue or visibility in AI-generated answers."] },
    { heading: "Confidentiality", body: ["I will treat your non-public business information as confidential and use it only for the work. If you want a formal confidentiality agreement, I am happy to sign one."] },
    { heading: "Liability", body: ["To the extent permitted by law, my total liability for any claim relating to services is limited to the fees you paid for the services in question, and I am not liable for indirect or consequential loss. Nothing in these terms excludes rights you have under the Australian Consumer Law that cannot be excluded."] },
    { heading: "Website use", body: ["Content on this site is provided for general information and is not professional advice for your specific situation. Please do not misuse the site or attempt to disrupt it."] },
    { heading: "Governing law", body: ["These terms are governed by the laws of Victoria, Australia, and the courts of Victoria have jurisdiction."] },
    { heading: "Contact", body: ["Questions about these terms: hello@nudgedigital.com.au."] },
      ]}
    />
  );
}
