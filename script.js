/* ── script.js ─ Nexora Labs ──────────────────────────────── */

/* ── 1. Loader Progress Bar ── */
window.addEventListener('load', () => {
  const loader    = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  if (!loader || !loaderBar) return;

  let width = 0;
  const interval = setInterval(() => {
    width += 10;
    loaderBar.style.width = width + '%';
    if (width >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.style.opacity      = '0';
        loader.style.pointerEvents = 'none';
      }, 400);
    }
  }, 120);
});

/* ── 2. Mobile Menu Toggle ── */
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  /* ── 3. Counter Animation ── */
  startCounters();

  /* ── 4. ScrollReveal ── */
  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.reveal', {
      distance: '40px',
      duration: 1200,
      easing:   'ease',
      origin:   'bottom',
      interval: 120,
      reset:    false
    });
  }
});

/* ── 5. Cursor Glow ── */
document.addEventListener('mousemove', (e) => {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

/* ── 6. Toast Helper ── */
function showToast(msg) {
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.innerText = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 4000);
}

/* ── 7. Waitlist Form ── */
async function handleWaitlist(event) {
  event.preventDefault();
  const emailInput = document.getElementById('emailInput');
  const email      = emailInput.value.trim();
  if (!email) return;

  try {
    await addDoc(collection(db, 'waitlist'), {
      email:     email,
      createdAt: new Date()
    });
    showToast(`Success! ${email} joined the waitlist.`);
    emailInput.value = '';
  } catch (error) {
    showToast('Failed to join waitlist.');
    console.error(error);
  }
}

/* ── 8. Scroll to Waitlist ── */
function scrollToWaitlist() {
  const form = document.getElementById('waitlistForm');
  if (!form) return;
  form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => document.getElementById('emailInput').focus(), 600);
}

/* ── 9. Connect Wallet ── */
async function connectWallet() {
  if (!window.ethereum) {
    showToast('MetaMask not detected.');
    return;
  }
  try {
    const provider    = new ethers.BrowserProvider(window.ethereum);
    const accounts    = await provider.send('eth_requestAccounts', []);
    const wallet      = accounts[0];
    const shortWallet = wallet.slice(0, 6) + '...' + wallet.slice(-4);

    showToast(`Connected: ${shortWallet}`);

    document.querySelectorAll('[onclick="connectWallet()"]').forEach(btn => {
      btn.innerText = shortWallet;
    });
  } catch (error) {
    showToast('Wallet connection failed.');
    console.error(error);
  }
}

/* ── 10. Payment Modal ── */
function openPayment(plan) {
  showToast(`${plan} payment gateway coming soon.`);
}

/* ── 11. Counter Animation ── */
function startCounters() {
  document.querySelectorAll('.counter').forEach(counter => {
    counter.innerText = '0';
    const target   = +counter.getAttribute('data-target');
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / target));
    let current    = 0;

    const timer = setInterval(() => {
      current += 1;
      counter.innerText = current;
      if (current >= target) {
        counter.innerText = target;
        clearInterval(timer);
      }
    }, stepTime);
  });
}

