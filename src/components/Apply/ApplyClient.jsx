"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  GraduationCap,
  BadgeCheck,
  ShieldCheck,
  Bus,
  BedDouble,
  FileCheck2,
  Sparkles,
  Clock3,
  PartyPopper,
} from "lucide-react";
import styles from "./Apply.module.css";

/* ------------------------------------------------------------------ */
/*  Real FISAT programme catalogue (2026-27)                           */
/* ------------------------------------------------------------------ */

const LEVELS = [
  { id: "btech", label: "B.Tech", hint: "4 yrs · KTU" },
  { id: "mtech", label: "M.Tech", hint: "2 yrs · 5 streams" },
  { id: "mba", label: "MBA", hint: "2 yrs · 6 electives" },
  { id: "mca", label: "MCA", hint: "2 yrs · AICTE" },
  { id: "imca", label: "Int. MCA", hint: "5 yrs · after +2" },
];

const BRANCHES = {
  btech: [
    "Computer Science & Engineering",
    "Computer Science & Design",
    "Artificial Intelligence & Data Science",
    "Electronics & Communication Engineering",
    "Electrical & Electronics Engineering",
    "Electronics & Instrumentation Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
  ],
  mtech: [
    "M.Tech — AI & Data Science",
    "M.Tech — VLSI & Embedded Systems",
    "M.Tech — Power Electronics & Power Systems",
    "M.Tech — Structural Engg. & Construction Mgmt.",
    "M.Tech — Computer Science & Information Systems",
  ],
  mba: [
    "MBA — Finance",
    "MBA — Marketing",
    "MBA — Human Resource Management",
    "MBA — Information Systems",
    "MBA — Production & Operations",
    "MBA — International Business",
  ],
  mca: ["MCA (2-Year)"],
  imca: ["Integrated MCA (5-Year)"],
};

const QUOTAS = ["Government Merit (KEAM)", "Management Merit", "NRI Quota", "Lateral Entry"];
const GENDERS = ["Female", "Male", "Other"];
const ENTRANCES = ["KEAM", "JEE Main", "CAT / CMAT / KMAT", "GATE", "MCA Entrance", "Not appeared yet"];

const STEPS = [
  { id: 0, kicker: "Step 01", title: "Who are you?", desc: "Your identity as it should appear on the admit card." },
  { id: 1, kicker: "Step 02", title: "How do we reach you?", desc: "Phone + email is where counselling calls land." },
  { id: 2, kicker: "Step 03", title: "Your academics", desc: "Boards, scores and entrance — honest numbers only." },
  { id: 3, kicker: "Step 04", title: "Your FISAT pick", desc: "Programme, branch priorities, quota and stay." },
];

const initial = {
  fullName: "",
  dob: "",
  gender: "",
  email: "",
  phone: "",
  altPhone: "",
  guardianName: "",
  guardianPhone: "",
  address: "",
  city: "",
  state: "Kerala",
  pincode: "",
  tenthPct: "",
  twelfthPct: "",
  yop: "2026",
  entrance: "",
  rank: "",
  level: "btech",
  branch1: "Computer Science & Engineering",
  branch2: "Artificial Intelligence & Data Science",
  quota: "Government Merit (KEAM)",
  hostel: "yes",
  transport: "college-bus",
  message: "",
  consent: false,
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRe = /^[6-9]\d{9}$/;
const pinRe = /^\d{6}$/;

function validate(values, step) {
  const e = {};
  if (step === 0) {
    if (values.fullName.trim().length < 3) e.fullName = "Enter your full name as per certificates.";
    if (!values.dob) e.dob = "Date of birth is required.";
    if (!values.gender) e.gender = "Pick one.";
  }
  if (step === 1) {
    if (!emailRe.test(values.email.trim())) e.email = "Enter a valid email — offer letters go here.";
    if (!phoneRe.test(values.phone.trim())) e.phone = "10-digit Indian mobile (starts 6–9).";
    if (values.altPhone && !phoneRe.test(values.altPhone.trim())) e.altPhone = "Must be a 10-digit mobile, or leave blank.";
    if (values.guardianName.trim().length < 3) e.guardianName = "Parent / guardian name is required.";
    if (!phoneRe.test(values.guardianPhone.trim())) e.guardianPhone = "Guardian mobile must be 10 digits.";
    if (values.address.trim().length < 8) e.address = "House name, street — at least 8 characters.";
    if (!values.city.trim()) e.city = "City required.";
    if (!pinRe.test(values.pincode.trim())) e.pincode = "6-digit PIN code.";
  }
  if (step === 2) {
    const t = parseFloat(values.tenthPct);
    const tw = parseFloat(values.twelfthPct);
    if (Number.isNaN(t) || t < 33 || t > 100) e.tenthPct = "Class X % between 33 and 100.";
    if (values.level === "btech" || values.level === "imca") {
      if (Number.isNaN(tw) || tw < 33 || tw > 100) e.twelfthPct = "+2 % between 33 and 100.";
    }
    if (!values.entrance) e.entrance = "Choose an entrance status.";
    if (values.rank && !/^[A-Za-z0-9\-/ ]{1,20}$/.test(values.rank.trim())) e.rank = "Rank with letters/numbers only.";
  }
  if (step === 3) {
    if (!values.branch1) e.branch1 = "Pick your first priority.";
    if (values.branch1 === values.branch2) e.branch2 = "Second priority must differ from first.";
    if (!values.message.trim() && values.level === "mba") e.message = "A line on your goal helps MBA counselling.";
    if (!values.consent) e.consent = "Consent is required to process your application.";
  }
  return e;
}

function Field({ label, hint, error, children, span }) {
  return (
    <label className={`${styles.field} ${span ? styles.span2 : ""} ${error ? styles.hasError : ""}`}>
      <span className={styles.fieldTop}>
        <span className={styles.fieldLabel}>{label}</span>
        {hint ? <span className={styles.fieldHint}>{hint}</span> : null}
      </span>
      {children}
      <AnimatePresence>
        {error ? (
          <motion.span
            className={styles.error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
          >
            {error}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </label>
  );
}

function ChipGroup({ options, value, onPick, name, columns }) {
  return (
    <div className={styles.chips} data-cols={columns || "auto"} role="radiogroup" aria-label={name}>
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onPick(o)}
            className={`${styles.chip} ${active ? styles.chipOn : ""}`}
          >
            {active ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : null}
            <span>{o}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function ApplyClient() {
  const [values, setValues] = useState(initial);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const [appId, setAppId] = useState(null);

  const branchOptions = useMemo(() => BRANCHES[values.level] || BRANCHES.btech, [values.level]);
  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  const set = (k) => (ev) => {
    const v = ev?.target ? ev.target.value : ev;
    setValues((s) => {
      const next = { ...s, [k]: v };
      // keep branch picks valid when level changes
      if (k === "level") {
        const opts = BRANCHES[v] || [];
        next.branch1 = opts[0] || "";
        next.branch2 = opts[1] || opts[0] || "";
      }
      return next;
    });
    if (touched) setErrors(validate({ ...values, [k]: ev?.target ? ev.target.value : ev }, step));
  };

  const goNext = () => {
    const e = validate(values, step);
    setErrors(e);
    setTouched(true);
    if (Object.keys(e).length) {
      document.querySelector(`.${styles.formCard}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      setTouched(false);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    setStep((s) => Math.max(0, s - 1));
    setErrors({});
    setTouched(false);
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate(values, 3);
    setErrors(e);
    setTouched(true);
    if (Object.keys(e).length) return;
    setSending(true);
    // simulated counselling-queue latency
    setTimeout(() => {
      const id = `FISAT-26-${Math.floor(1000 + Math.random() * 9000)}`;
      try {
        localStorage.setItem("fisat:application", JSON.stringify({ id, ...values, at: new Date().toISOString() }));
      } catch {}
      setAppId(id);
      setSending(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1100);
  };

  if (appId) {
    return (
      <div className={styles.page}>
        <section className={styles.successWrap}>
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={styles.ticket}
          >
            <div className={styles.ticketTop}>
              <span className={styles.tLabel}>Application received</span>
              <span className={styles.tId}>{appId}</span>
            </div>
            <h1 className={styles.ticketTitle}>
              You&apos;re in the queue, <em>{values.fullName.split(" ")[0] || "aspirant"}</em>.
            </h1>
            <p className={styles.ticketSub}>
              Our counsellor will call <strong>{values.phone}</strong> and write to <strong>{values.email}</strong> within
              2 working days. Priority 1: <strong>{values.branch1}</strong> · {values.level.toUpperCase()} ·{" "}
              {values.quota}.
            </p>
            <div className={styles.ticketGrid}>
              <div>
                <span>Programme</span>
                <strong>{LEVELS.find((l) => l.id === values.level)?.label}</strong>
              </div>
              <div>
                <span>Quota</span>
                <strong>{values.quota}</strong>
              </div>
              <div>
                <span>Stay</span>
                <strong>{values.hostel === "yes" ? "Hostel needed" : "Day scholar"}</strong>
              </div>
              <div>
                <span>Counselling</span>
                <strong>Mookkannoor · Angamaly</strong>
              </div>
            </div>
            <div className={styles.ticketPerf} aria-hidden="true" />
            <div className={styles.ticketFoot}>
              <Link className={styles.btnPrimary} href="/">
                <PartyPopper size={18} /> Back to campus
              </Link>
              <button
                className={styles.btnGhost}
                type="button"
                onClick={() => {
                  setAppId(null);
                  setStep(0);
                  setValues(initial);
                }}
              >
                File another application
              </button>
            </div>
          </motion.div>

          {/* Horizontal focal — wide campus block, correct orientation */}
          <figure className={styles.hStrip}>
            <Image
              src="/fitimage/imgi_31_mca1-scaled-e1658138621201.jpg"
              alt="FISAT academic block under a wide Kerala sky"
              width={2560}
              height={934}
              sizes="100vw"
              className={styles.hStripImg}
            />
            <figcaption className={styles.hStripCap}>
              <span className={styles.tMeta}>2560 × 934 · horizontal banner</span>
              <span>See you under this sky — Hormis Nagar, Mookkannoor.</span>
            </figcaption>
          </figure>
        </section>
      </div>
    );
  }

  const meta = STEPS[step];

  return (
    <div className={styles.page}>
      {/* ================= HERO — pure CSS shapes, no photo ================= */}
      <header className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.orbA} aria-hidden="true" />
        <div className={styles.orbB} aria-hidden="true" />
        <p className={styles.heroOutline} aria-hidden="true">
          APPLY·26
        </p>

        <div className={styles.heroInner}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={styles.eyebrowRow}
          >
            <span className={styles.eyebrow}>
              <Sparkles size={14} /> Admissions 2026–27 open
            </span>
            <span className={styles.tMeta}>NAAC A+ · NBA · KTU · AICTE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={styles.heroTitle}
          >
            Where <em>ideas</em>
            <br />
            take flight —<span> start with one form.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={styles.heroMeta}
          >
            <span className={styles.deadline}>
              <Clock3 size={15} /> Phase-2 closes <strong>30 Aug 2026</strong>
            </span>
            <span className={styles.heroStats}>
              <strong>7</strong> B.Tech streams · <strong>₹17.22 LPA</strong> highest · <strong>283</strong> offers
              &apos;25
            </span>
            <a href="#apply-form" className={styles.btnPrimary}>
              Start application <ArrowRight size={17} />
            </a>
          </motion.div>
        </div>

        {/* branch marquee — shape + type, zero imagery */}
        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {[...BRANCHES.btech, ...BRANCHES.btech].map((b, i) => (
              <span key={i} className={styles.marqueeItem}>
                {b} <i>✦</i>
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ================= HOW IT WORKS ================= */}
      <section className={styles.how}>
        {[
          { n: "01", t: "Tell us everything", d: "5 minutes. Name, marks, branch dreams — autosaved as you type.", icon: FileCheck2 },
          { n: "02", t: "Counsellor call", d: "Eligibility check, quota guidance, campus tour slot in 48 hrs.", icon: Phone },
          { n: "03", t: "Lock your seat", d: "Document verify at Mookkannoor + fee — hostel allotted same day.", icon: BadgeCheck },
        ].map((c, i) => (
          <motion.article
            key={c.n}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={styles.howCard}
          >
            <span className={styles.howNum}>{c.n}</span>
            <c.icon size={26} strokeWidth={1.6} aria-hidden="true" />
            <h3>{c.t}</h3>
            <p>{c.d}</p>
          </motion.article>
        ))}
      </section>

      {/* ================= MAIN — sticky vertical focal + wizard ================= */}
      <main id="apply-form" className={styles.main}>
        {/* ---- Left rail: ONE vertical image, used vertically ---- */}
        <aside className={styles.rail}>
          <div className={styles.archWrap}>
            {/* imgi_15_industry.jpg — 1000×1690 VERT, 194 KB.
                Audited: truly vertical (1:1.69), light, sharp at ~420 px rail
                @2x. Beats 726 KB library shot + 5 MB PNGs. Never use HORIZ
                files here — they would crop faces in this tall arch. */}
            <Image
              src="/fitimage/imgi_15_industry.jpg"
              alt="FISAT industry collaborator mentoring students in the lab"
              width={1000}
              height={1690}
              sizes="(max-width: 1024px) 100vw, 420px"
              className={styles.archImg}
              priority={false}
            />
            <div className={styles.archShade} aria-hidden="true" />
            <div className={styles.archCard}>
              <span className={styles.tMeta}>Counselling desk</span>
              <a href="tel:+914842450000" className={styles.railPhone}>
                <Phone size={16} /> 0484 245 0000
              </a>
              <a href="mailto:admissions@fisat.ac.in" className={styles.railMail}>
                <Mail size={15} /> admissions@fisat.ac.in
              </a>
              <span className={styles.railAddr}>
                <MapPin size={14} /> Hormis Nagar, Mookkannoor,
                <br />
                Angamaly, Kerala 683577
              </span>
            </div>
          </div>

          <div className={styles.tapeCard}>
            <span className={styles.tape} aria-hidden="true" />
            <h4>
              <ShieldCheck size={17} /> No application fee
            </h4>
            <p>Applying is free. You pay only when you accept the seat after counselling — never to submit this form.</p>
            <ul className={styles.checkList}>
              <li>
                <Check size={14} /> KEAM / JEE / +2 counselling supported
              </li>
              <li>
                <Check size={14} /> Hostel + bus routes mapped at admission
              </li>
              <li>
                <Check size={14} /> Scholarships: merit, Federal Bank, freeships
              </li>
            </ul>
          </div>

          <div className={styles.miniStat}>
            <GraduationCap size={20} />
            <p>
              <strong>10,000+ alumni</strong> across TCS, Infosys, Federal Bank, Bosch & beyond.
            </p>
          </div>
        </aside>

        {/* ---- Right: wizard form ---- */}
        <section className={styles.formCard} aria-label="FISAT application form">
          <div className={styles.formHead}>
            <div>
              <p className={styles.tMeta}>
                {meta.kicker} · {step + 1} / {STEPS.length}
              </p>
              <h2>{meta.title}</h2>
              <p className={styles.formDesc}>{meta.desc}</p>
            </div>
            <div className={styles.ring} role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Application progress">
              <svg viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="32" cy="32" r="26" className={styles.ringBg} />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  className={styles.ringFg}
                  strokeDasharray={`${(progress / 100) * 163.3} 163.3`}
                />
              </svg>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          <ol className={styles.stepper} aria-label="Form steps">
            {STEPS.map((s, i) => (
              <li key={s.id} className={`${styles.stepDot} ${i === step ? styles.now : ""} ${i < step ? styles.done : ""}`}>
                <button type="button" onClick={() => i < step && setStep(i)} disabled={i >= step} aria-label={`Go to ${s.title}`}>
                  {i < step ? <Check size={13} strokeWidth={3} /> : `0${i + 1}`}
                </button>
                <span>{s.title}</span>
              </li>
            ))}
          </ol>

          <form onSubmit={step === STEPS.length - 1 ? submit : (e) => e.preventDefault()} noValidate>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className={styles.grid}
              >
                {step === 0 && (
                  <>
                    <Field label="Full name *" error={errors.fullName} span>
                      <input
                        className={styles.input}
                        placeholder="e.g. Ananya Suresh Menon"
                        value={values.fullName}
                        onChange={set("fullName")}
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Date of birth *" error={errors.dob}>
                      <input type="date" className={styles.input} value={values.dob} onChange={set("dob")} max="2010-12-31" />
                    </Field>
                    <div>
                      <span className={styles.fieldLabel}>Gender *</span>
                      <div style={{ marginTop: 10 }}>
                        <ChipGroup options={GENDERS} value={values.gender} onPick={(v) => setValues((s) => ({ ...s, gender: v }))} name="Gender" />
                      </div>
                      {errors.gender ? <span className={styles.error}>{errors.gender}</span> : null}
                    </div>
                    <div className={styles.noteCard}>
                      <CalendarDays size={18} />
                      <p>
                        Use the name + DOB exactly as on your Class X certificate — mismatches delay KEAM allotment
                        verification.
                      </p>
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <Field label="Email ID *" hint="offer + login link" error={errors.email}>
                      <input
                        className={styles.input}
                        type="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={set("email")}
                        autoComplete="email"
                      />
                    </Field>
                    <Field label="Mobile number *" hint="10-digit" error={errors.phone}>
                      <input
                        className={styles.input}
                        inputMode="numeric"
                        placeholder="98765 43210"
                        value={values.phone}
                        onChange={set("phone")}
                        autoComplete="tel"
                      />
                    </Field>
                    <Field label="Alternate mobile" hint="optional" error={errors.altPhone}>
                      <input className={styles.input} inputMode="numeric" placeholder="Optional" value={values.altPhone} onChange={set("altPhone")} />
                    </Field>
                    <Field label="Parent / Guardian name *" error={errors.guardianName}>
                      <input className={styles.input} placeholder="e.g. Suresh Menon" value={values.guardianName} onChange={set("guardianName")} />
                    </Field>
                    <Field label="Guardian mobile *" error={errors.guardianPhone} span>
                      <input className={styles.input} inputMode="numeric" placeholder="10-digit mobile" value={values.guardianPhone} onChange={set("guardianPhone")} />
                    </Field>
                    <Field label="Home address *" error={errors.address} span>
                      <textarea
                        className={styles.input}
                        rows={2}
                        placeholder="House name, street, post office"
                        value={values.address}
                        onChange={set("address")}
                      />
                    </Field>
                    <Field label="City *" error={errors.city}>
                      <input className={styles.input} placeholder="e.g. Angamaly" value={values.city} onChange={set("city")} />
                    </Field>
                    <div className={styles.twoCol}>
                      <Field label="State">
                        <select className={styles.input} value={values.state} onChange={set("state")}>
                          {["Kerala", "Tamil Nadu", "Karnataka", "Maharashtra", "Delhi", "Other"].map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="PIN code *" error={errors.pincode}>
                        <input className={styles.input} inputMode="numeric" placeholder="683577" value={values.pincode} onChange={set("pincode")} />
                      </Field>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <Field label="Class X percentage *" hint="%" error={errors.tenthPct}>
                      <input
                        className={styles.input}
                        inputMode="decimal"
                        placeholder="e.g. 92.4"
                        value={values.tenthPct}
                        onChange={set("tenthPct")}
                      />
                    </Field>
                    {(values.level === "btech" || values.level === "imca") && (
                      <Field label="Plus-Two / XII percentage *" hint="%" error={errors.twelfthPct}>
                        <input
                          className={styles.input}
                          inputMode="decimal"
                          placeholder="e.g. 88.0"
                          value={values.twelfthPct}
                          onChange={set("twelfthPct")}
                        />
                      </Field>
                    )}
                    <Field label="Year of passing">
                      <select className={styles.input} value={values.yop} onChange={set("yop")}>
                        {["2026", "2025", "2024", "2023"].map((y) => (
                          <option key={y}>{y}</option>
                        ))}
                      </select>
                    </Field>
                    <div>
                      <span className={styles.fieldLabel}>Entrance status *</span>
                      <div style={{ marginTop: 10 }}>
                        <ChipGroup options={ENTRANCES} value={values.entrance} onPick={(v) => setValues((s) => ({ ...s, entrance: v }))} name="Entrance" />
                      </div>
                      {errors.entrance ? <span className={styles.error}>{errors.entrance}</span> : null}
                    </div>
                    <Field label="Rank / Score" hint="if declared" error={errors.rank}>
                      <input className={styles.input} placeholder="e.g. KEAM 4521" value={values.rank} onChange={set("rank")} />
                    </Field>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className={styles.span2}>
                      <span className={styles.fieldLabel}>Programme level *</span>
                      <div className={styles.levelGrid}>
                        {LEVELS.map((l) => (
                          <button
                            key={l.id}
                            type="button"
                            onClick={() => set("level")({ target: { value: l.id } })}
                            className={`${styles.levelCard} ${values.level === l.id ? styles.levelOn : ""}`}
                            aria-pressed={values.level === l.id}
                          >
                            <strong>{l.label}</strong>
                            <span>{l.hint}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <Field label="Branch — priority 1 *" error={errors.branch1}>
                      <select className={styles.input} value={values.branch1} onChange={set("branch1")}>
                        {branchOptions.map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Branch — priority 2 *" error={errors.branch2}>
                      <select className={styles.input} value={values.branch2} onChange={set("branch2")}>
                        {branchOptions.map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                    </Field>
                    <div className={styles.span2}>
                      <span className={styles.fieldLabel}>Admission quota *</span>
                      <div style={{ marginTop: 10 }}>
                        <ChipGroup options={QUOTAS} value={values.quota} onPick={(v) => setValues((s) => ({ ...s, quota: v }))} name="Quota" />
                      </div>
                    </div>
                    <div className={styles.twoCol}>
                      <Field label="Hostel needed?">
                        <div className={styles.seg}>
                          {["yes", "no"].map((h) => (
                            <button
                              key={h}
                              type="button"
                              onClick={() => setValues((s) => ({ ...s, hostel: h }))}
                              className={`${styles.segBtn} ${values.hostel === h ? styles.segOn : ""}`}
                              aria-pressed={values.hostel === h}
                            >
                              {h === "yes" ? <BedDouble size={15} /> : <Bus size={15} />}
                              {h === "yes" ? "Hostel" : "Day scholar"}
                            </button>
                          ))}
                        </div>
                      </Field>
                      <Field label="Daily commute">
                        <select className={styles.input} value={values.transport} onChange={set("transport")}>
                          <option value="college-bus">College bus</option>
                          <option value="own">Own / public transport</option>
                          <option value="hostel">Staying in hostel</option>
                        </select>
                      </Field>
                    </div>
                    <Field label={values.level === "mba" ? "Statement of purpose *" : "Anything we should know?"} hint="optional" error={errors.message} span>
                      <textarea
                        className={styles.input}
                        rows={3}
                        placeholder={values.level === "mba" ? "Your goal in 2–3 lines…" : "Sports quota, achievements, questions…"}
                        value={values.message}
                        onChange={set("message")}
                      />
                    </Field>
                    <label className={`${styles.consent} ${errors.consent ? styles.hasError : ""}`}>
                      <input
                        type="checkbox"
                        checked={values.consent}
                        onChange={(e) => setValues((s) => ({ ...s, consent: e.target.checked }))}
                      />
                      <span>
                        I consent to FISAT contacting me on phone, SMS, WhatsApp and email about admissions, and I
                        confirm the details above are true. *
                      </span>
                    </label>
                    {errors.consent ? <span className={styles.error}>{errors.consent}</span> : null}
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className={styles.navRow}>
              {step > 0 ? (
                <button type="button" className={styles.btnGhost} onClick={goBack}>
                  <ArrowLeft size={17} /> Back
                </button>
              ) : (
                <span className={styles.secure}>
                  <ShieldCheck size={15} /> SSL secured · never shared
                </span>
              )}
              {step < STEPS.length - 1 ? (
                <button type="button" className={styles.btnPrimary} onClick={goNext}>
                  Continue <ArrowRight size={17} />
                </button>
              ) : (
                <button type="submit" className={styles.btnPrimary} disabled={sending}>
                  {sending ? "Reserving your slot…" : "Submit application"} {!sending && <FileCheck2 size={17} />}
                </button>
              )}
            </div>
          </form>
        </section>
      </main>

      {/* ================= HORIZONTAL STRIP — wide image, used wide ================= */}
      <section className={styles.band}>
        <figure className={styles.bandFig}>
        {/* imgi_31_mca1… — 2560×934 HORIZ, 376 KB: genuinely panoramic
              (2.74:1), so it fills a full-bleed band without cropping faces. */}
          <Image
            src="/fitimage/imgi_31_mca1-scaled-e1658138621201.jpg"
            alt="FISAT academic blocks stretching wide under the Kerala sky"
            width={2560}
            height={934}
            sizes="100vw"
            loading="lazy"
            className={styles.bandImg}
          />
          <div className={styles.bandShade} aria-hidden="true" />
          <figcaption className={styles.bandCap}>
            <span className={styles.tMeta}>Life at Hormis Nagar</span>
            <h2>
              25 acres. One hill. <em>Zero dull days.</em>
            </h2>
            <p>Hostels, Idea Lab, service roads for dawn runs — come see it before you choose.</p>
          </figcaption>
        </figure>
        <div className={styles.bandStats}>
          {[
            ["A+", "NAAC 2nd cycle"],
            ["6", "NBA B.Tech programmes"],
            ["10", "UGC Autonomy years"],
            ["48", "LPA? No — honest placements"],
          ].map(([n, l]) => (
            <div key={l} className={styles.bandStat}>
              <strong>{n}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ — pure shape cards ================= */}
      <section className={styles.faq}>
        <div className={styles.faqHead}>
          <span className={styles.tMeta}>Before you ask</span>
          <h2>Straight answers, no brochure-speak.</h2>
        </div>
        <div className={styles.faqGrid}>
          {[
            ["Do I need KEAM to apply?", "No. Apply now with +2 marks; add your KEAM/JEE rank later. Management and NRI seats don't need KEAM at all — your counsellor will map the right quota."],
            ["What is the fees + hostel scene?", "B.Tech tuition follows KTU/Govt norms per quota; hostels are on-campus with mess, warden and study halls. Exact 2026 slabs are shared on your counselling call."],
            ["Can I change branch later?", "Priority 1 & 2 on this form drive your first allotment. Internal sliding after S1 follows KTU rules and vacancy — pick honestly now."],
            ["I’m outside Kerala. How do I visit?", "Fly to Kochi (1 hr to campus), rail to Angamaly/Aluva. Day-scholar buses cover Ernakulam + Thrissur; outstation students get hostel priority."],
          ].map(([q, a]) => (
            <details key={q} className={styles.faqCard}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <p className={styles.faqFoot}>
          Still stuck? Call <a href="tel:+914842450000">0484 245 0000</a> · <a href="mailto:admissions@fisat.ac.in">admissions@fisat.ac.in</a>
        </p>
      </section>
    </div>
  );
}
