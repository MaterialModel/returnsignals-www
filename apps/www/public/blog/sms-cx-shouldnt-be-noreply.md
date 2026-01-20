# SMS CX Shouldn't Be NoReply

> E-commerce made returns frictionless by eliminating the moment to help. Proactive SMS gives that moment back, and customers don't experience it as friction. They experience it as care.

{ type: "incoming", text: "Hey, just checking in. Did everything arrive okay?" },
{ type: "outgoing", text: "Yep, got it. Haven't tried it on yet." },
{ type: "incoming", text: "Totally. Want me to follow up tomorrow?" },
{ type: "outgoing", text: "Yes please." },
{ type: "incoming", timestamp: "Next day", text: "Quick check, did you get a chance to try it?" },
{ type: "outgoing", text: "I did. The waist feels tight. Is that normal?" },
{ type: "incoming", text: "If you send a photo, I can help. Also, what size did you get?" },
{ type: "outgoing", content: "image", imageSrc: "/images/narrative/purple-leggings.jpg", imageAlt: "Customer photo of clothing fit" },
{ type: "incoming", text: "Got it! These run a bit snug. Want me to send the next size up, or would you prefer store credit?" },
{ type: "outgoing", text: "Next size please." },
{ type: "incoming", text: "Done. You'll get a shipping confirmation shortly." },
];

Here is a strange thing about modern commerce.

You buy something online. A text arrives: "Order confirmed." Another: "Shipped." Another: "Out for delivery." And then, at last: "Delivered."

Four texts. A thread on your phone. A relationship, of sorts.

And then? Silence. The thread goes dead. The number might as well be called NoReply, because that's what it is. Nobody is on the other side.

Why do we build a thread, and then abandon it?

Because here's what I've come to believe: proactive SMS, done right, doesn't just add another channel. It collapses all the channels into one. It solves problems we've been working around for decades. And the moment you see it clearly, you can't unsee it.

Let me tell you what I mean.

## The problem isn't friction. It's that there's no moment to help.

Think about what e-commerce has optimized for over the past decade.

Returns. Easy returns. Frictionless returns. Free returns. Because everyone is terrified that return friction will hurt conversion. And they're probably right.

So companies built the infrastructure. Prepaid labels. QR codes. Drop-off locations. Return portals that ask minimal questions. The goal: make it so easy to return that the customer never hesitates to buy.

And it worked. Returns are frictionless now. Customers know where to go. They can find the return flow. That's not the problem.

The problem is that by optimizing for frictionless returns, you've eliminated any moment to intervene.

Think about what happens after delivery. A customer opens the box. Tries the thing on. Something feels off. Not broken, just uncertain. A fit question. A "is this normal?" question.

In a store, this is the moment an associate walks over. "How's it fitting? Can I grab you another size?" That moment is everything. It's where uncertainty becomes confidence. Where a maybe-return becomes a kept item. Where a one-time buyer becomes a repeat customer.

Online? That moment doesn't exist. The customer is alone with their uncertainty. And the path of least resistance is the return portal you've made so beautifully frictionless.

Returns flow smoothly. But you don't learn why. You don't get a chance to help. You don't build loyalty. You just process the return and hope they come back.

Salesforce's research shows nearly 60% of consumers prefer using fewer touchpoints and 69% expect consistent interactions ([source](https://www.salesforce.com/news/stories/ai-customer-research/)). But the deeper issue isn't touchpoint count. It's that across all those fragmented channels, there's no natural intervention point. No place where help finds you.

## Two things make proactive SMS different

The first is the channel itself.

SMS has properties no other channel combines. It's synchronous when you need it fast, asynchronous when you need time. It handles photos and video natively. It has the best push notification that doesn't require an install. And the support channel announces itself: the thread appears when the item arrives.

But the second thing is more important: proactive outreach at this moment isn't perceived as friction. It's perceived as care.

This is the part people miss. They think "intervention = friction" because they're imagining a popup that blocks the return flow. That would be friction. That would annoy customers.

But texting someone after delivery to ask how things fit? That's not friction. That's a store associate walking over to help.

Here's what that looks like in a good store. A customer comes in with a return. The associate doesn't stay behind the desk. She comes around to the customer's side and says: _"Let's find something you're going to love."_

That's not friction. That's care. And the customer feels it. Even if they still return the item, they walk out thinking: _They're nice there. I was expecting a fight, and they were nice._

That's how you make a customer, not just a sale. And that's the experience that disappeared online. Not because brands don't want it, but because they couldn't scale it.

One retailer told us about the early days when they were smaller: _"When we saw an order come through for a size 6, 8, and 10, someone would reach out and say, 'Let me tell you how this runs.' But that doesn't happen anymore. There are too many emails. We're too big."_

Proactive SMS makes "small" possible again. Not by shrinking, but by making every customer feel like they have someone paying attention.

The timing is everything. We wrote about this in [The End of Reactive Support](/blog/return-starts-before-return): the customer bought the item for a reason. Before she concludes it was a mistake, she's hoping it will work out. She still _wants_ things to go well. She hasn't locked in on returning. She's uncertain, open, persuadable.

That's the moment to show up. Not with a popup. Not with a "are you sure you want to return?" Not with friction. With help.

_"Let us know how it fits. We're here if you need anything."_

That's an invitation, not an obstacle. And when the customer replies, "the waist feels tight, is that normal?", they're not fighting the system. They're using a thread that works.

This is what frictionless returns can't do. They remove barriers, but they don't create connection. They make leaving easy, but they don't make staying feel supported.

Proactive SMS does both. It creates an intervention point that doesn't feel like intervention. It lets you help without being in the way.

And yet most brands throw this away. The delivery text arrives from a short code that never responds. The customer learns: this is not a place. This is a billboard.

If you're going to build a thread, the thread has to work.

## The channel that's both synchronous and asynchronous

Here's a riddle. What channel can feel like live chat when you need it fast, but also feel like email when you need time to think?

Not email. Email is asynchronous, sure, but it's not reliably _present_. Your message competes with newsletters, receipts, spam, and whatever the inbox algorithm decided to bury today.

Not web chat. Web chat is present, but only when the customer is on your site. Close the tab? Conversation's gone. Even when transcripts exist, customers don't experience them as continuing threads. They experience them as sessions that ended.

SMS is the rare thing that works both ways.

Reply right now? Feels like chat. Reply six hours later? Still feels normal. No guilt. No "sorry for the delay." No ticket to reopen. Just a thread. The same thread.

This sounds small. It's not. It's the whole point.

Email can be async but not sync. Web chat can be sync but not async. SMS is both. And because it's both, it collapses the others into one. You don't need three channels serving three different timing preferences. You need one channel that adapts to the moment.

Unlike web chat, there's no "stay on the line" pressure. Unlike email, there's no "did they even see this?" anxiety. The customer engages on their timeline. The brand responds when it matters. The thread holds everything together.

**Channel comparison**

|                 |  Email |  Web Chat |        App |         **SMS** |
| --------------: | -----: | --------: | ---------: | --------------: |
|            Sync |     No |       Yes |        Yes |         **Yes** |
|           Async |    Yes |        No |    Partial |         **Yes** |
|          Photos | Clunky |    Varies |        Yes |         **Yes** |
|      No install |    Yes |       Yes |         No |         **Yes** |
|            Push | Buried | Tab-based | 33% opt-in | **Lock screen** |
| Self-announcing |     No |        No |         No |         **Yes** |

## The best push notification is the one that doesn't require an app

Push notifications. Everyone wants them. But think about what it takes to get there.

For app push: the customer has to install your app, create an account, grant notification permission. OneSignal's benchmarks for Shopping apps: 33% opt-in on iOS, 36% on Android ([source](https://onesignal.com/mobile-app-benchmarks-2024)). That means if your post-purchase engagement strategy lives in your app, two-thirds of customers will never see it.

For email: you can reach more people, but can you reach them? Apple's Mail Privacy Protection has made open tracking unreliable ([Twilio](https://www.twilio.com/en-us/blog/insights/apple-mail-privacy-protection)). Validity has documented how Apple's prefetch behavior shifted pixel firing patterns entirely ([source](https://www.validity.com/blog/case-closed-the-mystery-of-declining-email-open-rates/)). Even good emails get buried.

But the lock screen? The lock screen is the most-viewed interface in modern life. Asurion research found Americans reach for their phones 352 times per day ([source](https://www.asurion.com/connect/news/tech-usage/)). Argue about the exact number. It doesn't matter. The point is: the phone is where attention lives.

SMS is the only way to land there without requiring an install.

No app download. No permission dialog. No competing with every other app that wants the same slot. Just a message, in the inbox, where people already look.

## "Show me" beats "describe it"

Support is visual. Especially in commerce.

_Is this a defect or normal variation?_
_Does this fit right?_
_Is this color off, or is it my lighting?_
_Did I install this correctly?_
_Is this stain something I can fix?_

Force customers to describe these things in words, and you get worse information. Slower resolution. More back-and-forth. Let them show you? One photo. Done.

The messaging inbox handles this naturally. Tap the camera. Take the shot. Send. No upload portal. No "please attach files in PNG or JPEG format under 5MB." Just the way humans already communicate.

And the standards keep improving. Apple now supports RCS on iPhone, enabling high-resolution photos, videos, read receipts, and typing indicators ([source](https://support.apple.com/en-us/122195)). Google reports over a billion RCS messages per day in the U.S. alone ([source](https://blog.google/products-and-platforms/platforms/android/billion-rcs-messages/)).

You don't need to bet on RCS specifically. The signal is simpler: the default inbox is becoming richer. The text thread is turning into a lightweight support app, without requiring an app.

## What surprised us in the first pilot

I went in skeptical.

I assumed only people with problems would reply. I assumed most customers would ignore us. I assumed we'd get a trickle of complaints.

I was wrong.

40% of buyers replied within an hour. 85% replied within 24 hours.

That is not a typo. Most customers replied. Quickly. And not just the angry ones.

The replies were often small, human, low-stakes messages, the kind you never see in traditional support because the friction is too high. People don't open tickets for small feelings. But they'll reply to a text.

Here's the kind of thing we see. It matters precisely because it isn't dramatic:

<div class="not-prose flex justify-center my-10 blog-sms-mockup">
  <SMSMockup messages={conversationMessages} autoplay={true} />
</div>

<style>
{`
  .blog-sms-mockup .sms-bubble,
  .blog-sms-mockup .sms-time,
  .blog-sms-mockup .sms-receipt {
    display: flex !important;
  }
`}
</style>

That's not a ticket. That's a conversation.

The kind of conversation that used to happen in stores. Between a customer and an associate who actually cared. Except now it happens in the default inbox, after delivery, at the exact moment the customer is forming an opinion.

The key is the first message. We don't just text "delivered." We text with _intent_: "Let us know how it fits. We're here if you need anything." That's not a notification. That's an invitation.

## Support as a sensor network

Here's the thing about frictionless returns: they don't teach you anything.

A customer returns something. You get a dropdown: "Didn't fit." Maybe "Changed my mind." That's it. No nuance. No signal you can act on. No way to improve the experience upstream.

Traditional support data is the same. It only shows you the extremes. You hear from the angriest customers, the ones motivated enough to fight through to a human. You hear from the happiest, the ones who leave reviews. But the middle? The middle stays silent. And the middle is where most of your product truth lives.

Two-way SMS pulls the middle into the conversation.

The cost of saying something drops to almost nothing. A customer doesn't have to decide "Is this worth opening a ticket?" They just reply. And when they reply, you learn:

Which SKUs create confusion, not just which ones break.
Which product photos are misleading.
Which size guidance is missing.
Which packaging detail creates a bad first impression.
Which delivery windows cause anxiety.

This is what frictionless returns can't give you. Signal. Real signal. The kind that lets you fix upstream causes instead of just processing downstream returns more efficiently.

## Timing, not volume

Let me be clear about what this is _not_.

This is not "blast more texts." This is not "be in their pocket all the time." People hate that. They opt out, and they should.

This is about one thread. One durable, trusted thread that customers can use when they need it. A thread that starts at delivery, because that's when uncertainty begins, and stays alive because replying actually works.

Zendesk's data backs this up: 72% of customers want immediate service. Customers are 2.4x more likely to stick with a brand when problems are solved quickly ([source](https://www.zendesk.com/blog/customer-experience-statistics/)). And 64% will spend more if you resolve issues _where they already are_ ([source](https://www.zendesk.com/blog/customer-experience-statistics/)).

"Where they already are." That phrase is doing a lot of work. The messaging inbox is the clearest example of "already there" that exists.

That's why NoReply is such a trap. If your first SMS interaction teaches customers the thread is dead, you don't get a second chance. You've trained them to go back to the maze.

## Why this wouldn't work with only humans

Here's the part people don't say out loud: you can't do this with humans alone.

Reaching out to every customer after delivery. Following up the next day. Answering questions at scale. Handling photos. Remembering context. The math doesn't work. The labor cost would be prohibitive. So historically, brands just... didn't do it.

AI changes the economics. But here's the thing: AI alone isn't enough either.

The problem isn't AI. The problem is AI _as gatekeeper_. The bot that loops. The automation that deflects. The system designed to avoid talking to you. Customers don't hate AI. They hate being trapped in automation when they need real help.

SMS changes the equation because it allows something most channels can't: seamless transitions between AI and humans.

Web chat has a speed-of-response SLA. If a human takes over, they need to respond _now_. The customer is sitting there, waiting. That makes handoffs expensive and stressful.

SMS doesn't have that pressure. Someone can reply in two minutes or two hours and it still feels normal. Which means the AI can handle the routine (the check-ins, the context gathering, the photo interpretation) and hand off to humans when things get complex. The customer never feels the seam.

That's the unlock. Not "AI instead of humans." Not "humans instead of AI." AI and humans together, in one channel, transitioning seamlessly because the channel's timing norms allow it.

The AI becomes the associate in the background. Not the bouncer at the door.

## Trust is infrastructure

I won't pretend the compliance stuff is exciting. But it matters.

The FCC's TCPA rules apply to texts ([source](https://docs.fcc.gov/public/attachments/DOC-408396A1.pdf)). CTIA's Messaging Principles emphasize consent and opt-out expectations ([source](https://api.ctia.org/wp-content/uploads/2023/05/230523-CTIA-Messaging-Principles-and-Best-Practices-FINAL.pdf)). A2P 10DLC registration is now required for business texting in the U.S. ([Twilio docs](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc)).

I'm not a lawyer. This isn't legal advice. But the practical point is simple: you cannot build a trusted support inbox on top of spam tactics. The carriers will punish you. Customers will punish you faster.

Clean consent. Respectful frequency. Clear opt-out. These aren't constraints. They're the foundation. If you do this right, the channel becomes a real surface you can rely on. If you don't, you've just built another NoReply number with extra steps.

## What I believe now

I used to think of SMS as "one more channel." I was wrong.

Two things make proactive SMS different from everything else.

First: the channel. It's synchronous when you need it fast. Asynchronous when you need time. It handles photos and video natively. It has the best push notification that doesn't require an install. The support channel announces itself: the thread appears when the item arrives. And AI and humans can transition seamlessly because there's no "stay on the line" pressure.

Second, and this is the part that took me longer to understand: proactive outreach at this moment isn't perceived as friction. It's perceived as care.

The e-commerce industry has spent a decade making returns frictionless. They removed barriers. But they also removed the moment to help. No intervention point. No way to turn uncertainty into confidence. No way to learn what's actually going wrong.

Proactive SMS creates that moment, without feeling like an obstacle. Because the customer still wants the item to work. Because checking in feels like a store associate, not a popup. Because help that arrives before you've given up doesn't feel like friction. It feels like attention.

And when customers feel that attention, they reply. Most customers. Quickly. Even when nothing is wrong. They talk. And when they talk, you learn. Which products confuse. Which photos mislead. Which sizing guidance is missing. You fix upstream causes instead of processing downstream returns.

That's the shift. Not "support optimization." Customer intelligence. A feedback loop that starts the moment the package arrives.

So here's the question: if you're texting customers today, you already have this surface. The thread already exists. The only question is whether you'll treat it like a billboard, or make it a place.

SMS CX shouldn't be NoReply. It should be a door that opens.
