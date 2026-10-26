// Mobile navigation
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Oracle demo: scripted preview answers (no live model is connected here)
const answers = [
  {
    match: /who (was|is) athena|athena\b/i,
    text: "Athena was the Greek goddess of wisdom, strategy and craft, said to have sprung fully armed from the head of Zeus. She was the patron of Athens, which she won by gifting its people the olive tree."
  },
  {
    match: /study|schedule|plan/i,
    text: "Gladly. Start by listing your subjects and exam dates. Then block 45-minute focus sessions with short breaks, put your hardest subject when you're most alert, and leave the final days for review. Tell me your dates and I'll draft it."
  },
  {
    match: /owl/i,
    text: "The little owl was Athena's sacred companion. Its ability to see in darkness made it a symbol of insight, and it appeared on Athenian coins for centuries."
  },
  {
    match: /always right|never wrong|mistake|accurate|know everything/i,
    text: "No, and true wisdom means admitting it. I'll show my reasoning, point you to sources and tell you when I'm unsure. For important decisions, please double-check with an expert."
  },
  {
    match: /^(hi|hello|hey|greetings)\b/i,
    text: "Hello, seeker! Ask me about history, science, writing, planning or anything else on your mind."
  }
];
const fallback = "That's a fine question. This preview only knows a few answers, but the full AthIna will reason through it with you step by step. Join early access below to be among the first to try her.";

const log = document.getElementById("chat-log");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const suggestions = document.getElementById("chat-suggestions");
let busy = false;

function addMessage(text, who) {
  const wrap = document.createElement("div");
  wrap.className = `msg msg-${who}`;
  if (who === "ai") {
    const img = document.createElement("img");
    img.src = "assets/owl.svg";
    img.alt = "";
    img.className = "msg-avatar";
    wrap.appendChild(img);
  }
  const p = document.createElement("p");
  p.textContent = text;
  wrap.appendChild(p);
  log.appendChild(wrap);
  log.scrollTop = log.scrollHeight;
  return wrap;
}

function addTyping() {
  const el = addMessage("", "ai");
  el.classList.add("typing");
  el.querySelector("p").innerHTML = "<span></span><span></span><span></span>";
  return el;
}

function ask(question) {
  question = question.trim();
  if (!question || busy) return;
  busy = true;
  addMessage(question, "user");
  const typing = addTyping();
  const reply = (answers.find((a) => a.match.test(question)) || { text: fallback }).text;
  setTimeout(() => {
    typing.remove();
    addMessage(reply, "ai");
    busy = false;
  }, 900 + Math.random() * 600);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  ask(input.value);
  input.value = "";
});
suggestions.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-q]");
  if (btn) ask(btn.dataset.q);
});

// Early access form (front-end only until a backend is connected)
const joinForm = document.getElementById("join-form");
const joinEmail = document.getElementById("join-email");
const joinNote = document.getElementById("join-note");

joinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!joinEmail.checkValidity() || !joinEmail.value) {
    joinNote.textContent = "Please enter a valid email address.";
    return;
  }
  joinNote.textContent = "Thank you! The owl will bring word when your invitation is ready.";
  joinForm.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
