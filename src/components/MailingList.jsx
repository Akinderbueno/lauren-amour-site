import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MAILING_LIST_ENDPOINT } from "../data/links";

export default function MailingList({ eyebrow, title, tagline, id }) {
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    if (!MAILING_LIST_ENDPOINT) {
      // TODO: wire up a real provider (Mailchimp/ConvertKit/etc.) via MAILING_LIST_ENDPOINT
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
      return;
    }

    try {
      await fetch(MAILING_LIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus("success");
    } catch {
      setStatus("idle");
    }
  }

  return (
    <section id={id} className="section mailing-list">
      <div className="section-inner mailing-list__inner">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mailing-list__copy"
        >
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="chrome-text">{title}</h2>
          <p>{tagline}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mailing-list__form-wrap"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mailing-list__success"
              >
                <p>You're in! Check your inbox and junk!</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="mailing-list__form"
              >
                <div className="mailing-list__row">
                  <input
                    name="firstName"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="lastName"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="glossy-btn" disabled={status === "submitting"}>
                  {status === "submitting" ? "Joining…" : "Sign Up"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
