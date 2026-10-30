import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleAlert, CircleCheck, Mail, MapPin, Phone, School, Send } from 'lucide-react';
import { contact } from '../data/portfolioData';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const emptyForm = { name: '', email: '', subject: '', message: '' };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Enter your name.';
  if (!emailPattern.test(values.email.trim())) errors.email = 'Enter an email address like name@example.com.';
  if (values.subject.trim().length < 3) errors.subject = 'Add a short subject.';
  if (values.message.trim().length < 10) errors.message = 'Write a message of at least 10 characters.';
  return errors;
}

/*
  How the form behaves:
  - contact.formEndpoint set  → the message is posted there (e.g. Formspree) and only
                                 then shown as "Message sent".
  - only contact.email set     → the visitor's email app opens with the message filled in.
  - neither set                → the form checks the message and says plainly that
                                 online messages are not connected yet.
*/
export default function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | drafted | offline | error

  const details = [
    {
      icon: Mail,
      label: 'Email',
      value: contact.email || contact.hiddenNote,
      href: contact.email ? `mailto:${contact.email}` : null,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contact.phone || contact.hiddenNote,
      href: contact.phone ? `tel:${contact.phone.replace(/\s/g, '')}` : null,
    },
    { icon: School, label: 'School', value: contact.school },
    { icon: MapPin, label: 'Location', value: contact.location },
  ];

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
    if (status !== 'idle' && status !== 'sending') setStatus('idle');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    if (contact.formEndpoint) {
      setStatus('sending');
      try {
        const response = await fetch(contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        setStatus('sent');
        setValues(emptyForm);
      } catch {
        setStatus('error');
      }
      return;
    }

    if (contact.email) {
      const body = `${values.message}\n\n${values.name}\n${values.email}`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
      setStatus('drafted');
      return;
    }

    setStatus('offline');
  };

  const statusMessages = {
    sent: {
      tone: 'success',
      title: 'Message sent',
      text: 'Thank you for writing. You will receive a reply at the email address you gave.',
    },
    drafted: {
      tone: 'success',
      title: 'Your email app has opened',
      text: 'The message is filled in there. Press send in your email app to deliver it.',
    },
    offline: {
      tone: 'info',
      title: 'Message not sent',
      text: `Online messages are not connected on this site yet, so nothing was sent. Please contact ${contact.school} directly.`,
    },
    error: {
      tone: 'error',
      title: 'Message not sent',
      text: 'The message could not be delivered. Check your connection and select Send message again.',
    },
  };
  const notice = statusMessages[status];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad relative bg-white">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            title="Contact"
            tamil="தொடர்புக்கு"
            intro="For academic enquiries, speaking invitations or school programmes, send a message using the form."
          />

          <ul className="space-y-1">
            {details.map(({ icon: Icon, label, value, href }, index) => (
              <Reveal as="li" key={label} delay={index * 0.08}>
                <div className="flex gap-4 border-t border-charcoal/10 py-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cream text-burgundy ring-1 ring-gold/40">
                    <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm text-gold-ink">{label}</p>
                    {href ? (
                      <a href={href} className="font-serif text-lg text-charcoal underline-offset-4 hover:text-burgundy hover:underline">
                        {value}
                      </a>
                    ) : (
                      <p className="font-serif text-lg leading-snug text-charcoal">{value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <form
            noValidate
            onSubmit={onSubmit}
            className="rounded-[2rem] border border-charcoal/10 bg-cream p-6 sm:p-10"
            aria-describedby={notice ? 'contact-status' : undefined}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Name" name="name" value={values.name} error={errors.name} onChange={onChange} autoComplete="name" />
              <Field
                label="Email"
                name="email"
                type="email"
                value={values.email}
                error={errors.email}
                onChange={onChange}
                autoComplete="email"
              />
              <Field
                className="sm:col-span-2"
                label="Subject"
                name="subject"
                value={values.subject}
                error={errors.subject}
                onChange={onChange}
              />
              <Field
                className="sm:col-span-2"
                label="Message"
                name="message"
                textarea
                value={values.message}
                error={errors.message}
                onChange={onChange}
              />
            </div>

            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-burgundy px-7 py-3 font-medium tracking-wide text-cream transition-colors hover:bg-burgundy-deep disabled:cursor-wait disabled:opacity-70"
              >
                <Send className="size-4" strokeWidth={1.8} aria-hidden="true" />
                {status === 'sending' ? 'Sending message…' : 'Send message'}
              </motion.button>
              <p className="text-sm text-ink-soft">All fields are required.</p>
            </div>

            <div aria-live="polite" id="contact-status">
              <AnimatePresence mode="wait">
                {notice && (
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, y: 12, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`mt-6 flex gap-3 rounded-xl p-4 ${
                        notice.tone === 'success'
                          ? 'bg-[#e8f1e6] text-[#24492b]'
                          : notice.tone === 'error'
                            ? 'bg-[#f7e4e4] text-[#7a1f1f]'
                            : 'bg-parchment text-charcoal'
                      }`}
                    >
                      {notice.tone === 'success' ? (
                        <CircleCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                      ) : (
                        <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                      )}
                      <div>
                        <p className="font-medium">{notice.title}</p>
                        <p className="text-[0.95rem] leading-relaxed opacity-90">{notice.text}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, error, textarea = false, type = 'text', className = '', ...rest }) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    onChange,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
    className: `w-full rounded-xl border bg-white px-4 py-3 text-charcoal transition-[border-color,box-shadow] duration-300 outline-none placeholder:text-ink-soft/60 focus:border-burgundy focus:ring-4 focus:ring-burgundy/10 ${
      error ? 'border-[#a33a3a]' : 'border-charcoal/15'
    }`,
    ...rest,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-charcoal">
        {label}
      </label>
      {textarea ? <textarea rows={6} {...shared} /> : <input type={type} {...shared} />}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            className="mt-2 text-sm text-[#a33a3a]"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
