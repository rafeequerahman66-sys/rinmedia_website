// Legal content for Rin Media — written specifically for a creative media
// production agency working with startups, founders, VCs, AI/tech companies,
// events, conferences and communities. Plain-English, publication-ready.
//
// Doc shape:
// { path, breadcrumb, title, readingTime, effective, updated, intro,
//   sections: [{ h, body: [ string | { list: [...] } ] }] }

const EMAIL = 'hello@rinmedia.xyz'
const WEBSITE = 'www.rinmedia.xyz'
const LOCATION = 'Bangalore, Karnataka, India'
const EFFECTIVE = 'Effective date: 4 August 2026'
const UPDATED = 'Last updated: 4 August 2026'

/* ---------------------------------------------------------------- Privacy */
const privacy = {
  path: '/privacy-policy',
  breadcrumb: 'Privacy Policy',
  title: 'Privacy Policy',
  readingTime: '6 min read',
  effective: EFFECTIVE,
  updated: UPDATED,
  intro:
    `Rin Media ("Company", "we", "our", or "us") is a creative media production agency based in ` +
    `${LOCATION}. We produce brand films, founder stories, and event photography and videography for ` +
    `startups, founders, VC firms, AI and technology companies, accelerators, and the communities ` +
    `around them. This policy explains, in plain language, what information we handle, why, and the ` +
    `choices you have.`,
  sections: [
    { h: 'Introduction', body: [
      `We keep this simple: we only collect what we need to talk to you, plan a project, and deliver great work — nothing more. This policy covers our website and the information we handle when you enquire, book a call, or work with us on a production.`,
      `By using our website or engaging our services, you agree to the practices described here.`,
    ]},
    { h: 'Information We Collect', body: [
      `We collect two kinds of information: what you give us directly, and what's gathered automatically when you browse the site. The next two sections break these down.`,
    ]},
    { h: 'Information You Provide', body: [
      `When you reach out or work with us, you may share:`,
      { list: [
        'Your name, email, company, role, and phone number.',
        'Project details — briefs, goals, budgets, timelines, event dates, and references.',
        'Brand assets and materials you send us so we can do the work (logos, guidelines, scripts, footage, photos).',
        'Anything you write to us in emails, forms, or a booking call.',
      ]},
    ]},
    { h: 'Automatically Collected Information', body: [
      `When you visit ${WEBSITE}, some technical information is collected automatically to keep the site working and help us improve it:`,
      { list: [
        'Device and browser type, screen size, and operating system.',
        'IP address and approximate location (city/country level).',
        'Pages viewed, referring links, and general on-site activity.',
      ]},
      `This data is used in aggregate. We don't use it to build detailed profiles of individual visitors.`,
    ]},
    { h: 'How We Use Your Information', body: [
      `We use the information we hold to:`,
      { list: [
        'Reply to your enquiry and schedule calls.',
        'Prepare quotes, proposals, and plan production.',
        'Deliver, manage, and improve the work you engage us for.',
        'Send project updates, files, and invoices.',
        'Keep the website secure and running well.',
        'Meet our legal, tax, and accounting obligations in India.',
      ]},
      `We do not sell your personal information, and we don't share it for unrelated advertising.`,
    ]},
    { h: 'Cookies', body: [
      `Our website uses a small number of cookies — essential ones that keep the site functioning, and, where enabled, analytics cookies that help us understand what's useful. You can manage or block cookies in your browser settings; some features may work less smoothly if you do.`,
    ]},
    { h: 'Analytics', body: [
      `If analytics are enabled, we may use a tool such as Google Analytics to understand aggregate traffic — which pages get read, roughly where visitors come from, and how the site performs. Analytics providers process this data under their own privacy terms, and we only look at it in aggregate.`,
    ]},
    { h: 'Third-party Services', body: [
      `We rely on a few trusted tools to run the studio. Each processes only what it needs, under its own privacy terms:`,
      { list: [
        'Calendly — to let you book discovery and project calls.',
        'Google Workspace (Gmail, Google Drive) — for email and secure file storage and sharing.',
        'Cloud storage and delivery platforms — to send you finished films, photos, and assets.',
        'Payment and invoicing providers — to raise and settle invoices.',
        'Website hosting and analytics — to serve and measure the site.',
      ]},
    ]},
    { h: 'File Sharing & Media Assets', body: [
      `Production means moving a lot of files. We typically share and store footage, photos, edits, and deliverables through Google Drive or similar cloud storage, using private links shared only with the people who need them.`,
      `Final photography and videography assets from your shoots and events are stored securely and delivered to you through these platforms. We treat them as confidential to your project.`,
    ]},
    { h: 'Client Materials', body: [
      `Anything you upload or send us — brand assets, scripts, raw media, and event footage — is used solely to deliver your project. We store it securely, share it only with the crew and collaborators working on your job, and remove or archive it in line with the retention practices below or your written instructions.`,
    ]},
    { h: 'Payments', body: [
      `Invoicing and payments run through banking channels and third-party payment or invoicing providers. We don't store full card details on our website. We keep transaction records for as long as Indian tax and accounting rules require.`,
    ]},
    { h: 'Email Communication', body: [
      `We use email to answer questions, run projects, and send files and invoices. We only send communication that's relevant to your enquiry or engagement — no unrelated marketing without your consent, and you can ask us to stop non-essential emails at any time.`,
    ]},
    { h: 'Data Security', body: [
      `We take reasonable technical and organisational steps to protect your information — access controls, private sharing links, and trusted providers. No system is ever completely secure, but we work to keep your data safe and to respond quickly if something goes wrong.`,
    ]},
    { h: 'Data Retention', body: [
      `We keep personal information and project materials only as long as we need them — for the length of our work together and any period required for legal, tax, or accounting reasons. After that we delete or anonymise the data, or archive project files where you've asked us to keep them available.`,
    ]},
    { h: 'International Users', body: [
      `We're based in India, and our providers may process data in other countries. If you contact us from outside India, you understand that your information may be transferred to and processed in India and by our service providers, with appropriate care taken to protect it.`,
    ]},
    { h: 'Your Rights', body: [
      `Depending on where you live, you may have the right to:`,
      { list: [
        'Access the personal information we hold about you.',
        'Ask us to correct or update it.',
        'Ask us to delete it, where we\'re not required to keep it.',
        'Object to or limit certain uses of it.',
      ]},
      `To exercise any of these, just email us at ${EMAIL} and we'll help.`,
    ]},
    { h: "Children's Privacy", body: [
      `Our website and services are meant for businesses and adults. We don't knowingly collect information from children. If you believe a child has shared information with us, contact us and we'll delete it.`,
    ]},
    { h: 'Policy Updates', body: [
      `We may update this policy as our tools or the law change. When we do, we'll revise the "last updated" date at the top. Significant changes will be clearly reflected here, and continuing to use our site or services means you accept the current version.`,
    ]},
    { h: 'Contact Us', body: [
      `Questions about your privacy or this policy? We're happy to help.`,
      { list: [
        `Email: ${EMAIL}`,
        `Website: ${WEBSITE}`,
        `Location: ${LOCATION}`,
      ]},
    ]},
  ],
}

/* ------------------------------------------------------ Terms & Conditions */
const terms = {
  path: '/terms-and-conditions',
  breadcrumb: 'Terms & Conditions',
  title: 'Terms & Conditions',
  readingTime: '8 min read',
  effective: EFFECTIVE,
  updated: UPDATED,
  intro:
    `These Terms & Conditions set out how we work together when Rin Media ("Company", "we", "our", ` +
    `or "us") produces content for you. They're written to be clear and fair — for both sides — and ` +
    `they apply to every engagement unless your proposal or statement of work says otherwise.`,
  sections: [
    { h: 'Introduction', body: [
      `Great work runs on clear expectations. These terms cover the practical side of a production — what we deliver, how payment works, timelines, ownership, and the rest — so we can focus on the creative. The specifics of each project live in your proposal; these terms cover everything around it.`,
    ]},
    { h: 'Scope of Services', body: [
      `Rin Media provides creative media production and related services. Depending on your project, that can include:`,
      { list: [
        'Brand films, founder stories, and social content.',
        'Event photography and videography — conferences, launches, and community events.',
        'Editing, motion, and post-production.',
        'Content strategy, repurposing, and distribution support.',
      ]},
      `The exact deliverables, formats, and scope for your engagement are defined in your proposal or statement of work.`,
    ]},
    { h: 'Quotes & Proposals', body: [
      `We'll send you a written quote or proposal based on the brief and information available at the time. Unless it states otherwise, a proposal is valid for 30 days. Pricing and timelines assume the scope stays roughly as described — significant changes may need a revised quote.`,
    ]},
    { h: 'Booking Confirmation', body: [
      `A project is confirmed once you accept the proposal in writing and pay the deposit (where one applies). Confirmation is what lets us reserve dates, book crew, and commit resources to your job.`,
    ]},
    { h: 'Payment Terms', body: [
      `Unless agreed otherwise in writing, invoices are payable within the period stated on them. Applicable taxes, including GST, are added as required under Indian law. For larger engagements we may invoice in stages tied to milestones set out in your proposal.`,
    ]},
    { h: 'Deposits', body: [
      `Most engagements require an advance deposit to confirm the booking. The deposit reserves your dates and covers early planning and third-party commitments, and it's credited against your total project fee.`,
    ]},
    { h: 'Cancellation', body: [
      `If you cancel a confirmed project, deposits and any advance payments may be non-refundable, since they cover time, planning, and crew or resources already reserved for you. Cancellations close to a shoot or event date may attract additional charges for commitments we can no longer recover.`,
    ]},
    { h: 'Rescheduling', body: [
      `We understand plans shift. We'll always try to accommodate a new date, subject to availability. Rescheduling close to a confirmed shoot may involve additional costs where crew, equipment, or locations were already booked.`,
    ]},
    { h: 'Delays', body: [
      `Some things are outside our control. Where a delay is caused by you — for example late briefs, feedback, approvals, access, or materials — delivery dates may move accordingly. We'll keep you posted and do our best to stay on schedule.`,
    ]},
    { h: 'Client Responsibilities', body: [
      `To keep your project on track, we'll rely on you to:`,
      { list: [
        'Provide accurate briefs and the assets we need on time.',
        'Give timely feedback and approvals at each stage.',
        'Arrange access, permissions, and releases for locations, people, and any materials you supply.',
        'Nominate a point of contact who can make decisions for the project.',
      ]},
    ]},
    { h: 'Production Days', body: [
      `Shoot and event days are scheduled in advance and run to an agreed call time and duration. Overtime, additional days, or scope added on the day may be billed at our applicable rates. We'll always flag this with you before it's incurred where we can.`,
    ]},
    { h: 'Revisions', body: [
      `Each engagement includes the number of revision rounds set out in your proposal — plenty to get things right. Additional revisions, or changes that go beyond the agreed scope, are billable at our applicable rates.`,
    ]},
    { h: 'Delivery Timeline', body: [
      `We'll agree a delivery timeline in your proposal and work hard to meet it. Timelines assume timely input from you; delays on approvals or materials can shift final delivery. We'll communicate any material changes as early as possible.`,
    ]},
    { h: 'File Delivery', body: [
      `Final deliverables are provided digitally — typically through Google Drive or a similar cloud platform — in the formats agreed in your proposal. We'll share private links with the people you nominate.`,
    ]},
    { h: 'Raw Footage Policy', body: [
      `Raw footage and unedited files are not included in your deliverables unless we've specifically agreed to provide them. If you'd like raw media, let us know upfront and we'll include it in your proposal, along with any additional cost and the format of delivery.`,
    ]},
    { h: 'Intellectual Property', body: [
      `Ownership of the final delivered content transfers to you once your invoice is paid in full. Until then, all rights remain with Rin Media.`,
      `Our pre-existing tools, project files, working methods, and any unused concepts remain ours. Third-party assets — such as licensed music or stock — are governed by their own licences and any usage limits that come with them.`,
    ]},
    { h: 'Portfolio Rights', body: [
      `Unless you ask us not to in writing, we may feature delivered work in our portfolio, showreel, website, and social channels as an example of what we do, with reasonable credit. If a project is sensitive or under embargo, just tell us and we'll keep it private.`,
    ]},
    { h: 'Confidentiality', body: [
      `We'll keep your non-public information confidential and use it only to deliver your project — and we ask the same of you regarding ours. This doesn't apply to information that's already public, independently developed, or that we're required by law to disclose.`,
    ]},
    { h: 'Third-party Assets', body: [
      `Where a project uses third-party assets — music, stock footage, fonts, or talent — these come with their own licences. We'll use properly licensed assets for the agreed use; extending that use later (for example a new campaign or platform) may require additional licences at additional cost.`,
    ]},
    { h: 'Refund Policy', body: [
      `Because our work involves reserved time, crew, and creative effort from the outset, fees are generally non-refundable once work has begun. If something isn't right, talk to us — we'd always rather make it right than leave you unhappy, within the scope of the engagement.`,
    ]},
    { h: 'Limitation of Liability', body: [
      `To the fullest extent permitted by law, our total liability for any engagement is limited to the fees paid for that engagement. We're not liable for indirect or consequential losses, or for loss of profit, data, or goodwill.`,
    ]},
    { h: 'Force Majeure', body: [
      `Neither of us is responsible for delays or failures caused by events beyond reasonable control — including natural events, illness, strikes, outages, or government action. Where this happens, affected timelines will be extended by a reasonable period.`,
    ]},
    { h: 'Governing Law', body: [
      `These terms are governed by the laws of India, and the courts of ${LOCATION} have exclusive jurisdiction over any dispute, subject to any dispute-resolution process we agree in writing.`,
    ]},
    { h: 'Contact', body: [
      `Questions about these terms? Reach us any time.`,
      { list: [
        `Email: ${EMAIL}`,
        `Website: ${WEBSITE}`,
        `Location: ${LOCATION}`,
      ]},
    ]},
  ],
}

/* ---------------------------------------------------------- Terms of Service */
const tos = {
  path: '/terms-of-service',
  breadcrumb: 'Terms of Service',
  title: 'Terms of Service',
  readingTime: '5 min read',
  effective: EFFECTIVE,
  updated: UPDATED,
  intro:
    `These Terms of Service cover your use of the Rin Media ("Company", "we", "our", or "us") website ` +
    `at ${WEBSITE} — browsing it, reading our work, and using the enquiry and booking tools on it. ` +
    `They're separate from the terms that govern an actual project, which we agree in writing before ` +
    `work begins.`,
  sections: [
    { h: 'Acceptance', body: [
      `By visiting or using our website, you agree to these Terms of Service and our Privacy Policy. If you don't agree with them, please don't use the site.`,
    ]},
    { h: 'Website Usage', body: [
      `You're welcome to browse our site, view our work, get in touch, and book a call. You agree to use it lawfully and not to disrupt it, attempt to gain unauthorised access, or use it to distribute harmful or unlawful content.`,
    ]},
    { h: 'User Conduct', body: [
      `When using the site or contacting us, you agree not to:`,
      { list: [
        'Interfere with the site\'s operation or security.',
        'Attempt to access areas or data you\'re not authorised to.',
        'Submit false information or impersonate someone else.',
        'Use the site for anything unlawful or abusive.',
      ]},
    ]},
    { h: 'Intellectual Property', body: [
      `The website and its content — design, text, graphics, logos, films, and showreels — belong to Rin Media or our licensors and are protected by law. Please don't copy, reproduce, or reuse them without our written permission.`,
    ]},
    { h: 'Third-party Links', body: [
      `Our site may link to third-party tools and platforms, such as Calendly for scheduling or our social profiles. We don't control those services and aren't responsible for their content or practices — your use of them is subject to their own terms.`,
    ]},
    { h: 'Booking Services', body: [
      `You can request a call or enquire about a project through the site. Submitting an enquiry or booking a call is the start of a conversation — it does not, by itself, create a binding engagement or guarantee availability.`,
      `Projects begin only after a signed agreement or a confirmed proposal. Using the website does not automatically create a client relationship.`,
    ]},
    { h: 'Communication', body: [
      `When you contact us through the site or by email, you're happy for us to reply by email and to use the details you provide to respond and, if it goes further, to progress a potential engagement.`,
    ]},
    { h: 'Limitation of Liability', body: [
      `To the fullest extent permitted by law, Rin Media isn't liable for any indirect or consequential loss arising from your use of the website.`,
    ]},
    { h: 'Disclaimer', body: [
      `The website is provided "as is" and "as available". While we work to keep it accurate and running well, we don't guarantee it will always be uninterrupted, error-free, or free of harmful components.`,
    ]},
    { h: 'Changes', body: [
      `We may update these Terms of Service from time to time as the site evolves. Changes take effect when posted here with a revised "last updated" date.`,
    ]},
    { h: 'Termination', body: [
      `We may suspend or restrict access to the website at any time if we reasonably believe these terms have been breached, or to protect the site and the people who use it.`,
    ]},
    { h: 'Governing Law', body: [
      `These Terms of Service are governed by the laws of India, and the courts of ${LOCATION} have exclusive jurisdiction over any dispute relating to the website.`,
    ]},
    { h: 'Contact', body: [
      `Questions about the website or these terms?`,
      { list: [
        `Email: ${EMAIL}`,
        `Website: ${WEBSITE}`,
        `Location: ${LOCATION}`,
      ]},
    ]},
  ],
}

export const LEGAL_DOCS = {
  [privacy.path]: privacy,
  [terms.path]: terms,
  [tos.path]: tos,
}
