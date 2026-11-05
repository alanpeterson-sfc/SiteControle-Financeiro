// Calculator & Interactions Script
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const amountSlider = document.getElementById('amountRange');
  const sliderValDisplay = document.getElementById('sliderVal');
  const calcYieldDisplay = document.getElementById('calcYield');
  const totalAuraDisplay = document.getElementById('totalAura');
  const totalOldDisplay = document.getElementById('totalOld');
  const periodButtons = document.querySelectorAll('.period-btn');

  let currentMonths = 12;

  // Format currency helper
  function formatBRL(value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2
    });
  }

  // Calculate returns
  // CDI benchmark ~ 11.25% p.a., Aura pays 112% CDI => ~ 12.6% p.a.
  // Traditional savings (poupança) ~ 6.17% p.a. + TR
  function updateCalculator() {
    const principal = parseFloat(amountSlider.value);
    sliderValDisplay.textContent = formatBRL(principal).replace(',00', '');

    const years = currentMonths / 12;
    const auraAnnualRate = 0.126; // 12.6%
    const savingsAnnualRate = 0.065; // 6.5%

    // Compound interest
    const auraTotal = principal * Math.pow((1 + auraAnnualRate), years);
    const savingsTotal = principal * Math.pow((1 + savingsAnnualRate), years);
    const difference = auraTotal - savingsTotal;

    calcYieldDisplay.textContent = `+ ${formatBRL(difference)}`;
    totalAuraDisplay.textContent = formatBRL(auraTotal);
    totalOldDisplay.textContent = formatBRL(savingsTotal);
  }

  if (amountSlider) {
    amountSlider.addEventListener('input', updateCalculator);
  }

  periodButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      periodButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentMonths = parseInt(e.target.getAttribute('data-months'), 10);
      updateCalculator();
    });
  });

  // Initial calculation
  updateCalculator();

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Smooth appearance for mockup bar animation
  const bars = document.querySelectorAll('.bar-col');
  bars.forEach((bar, index) => {
    bar.style.opacity = '0';
    bar.style.transform = 'translateY(10px)';
    setTimeout(() => {
      bar.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      bar.style.opacity = '1';
      bar.style.transform = 'translateY(0)';
    }, 200 + (index * 70));
  });

  // Logo smooth click & scroll to top animation
  const brandLinks = document.querySelectorAll('.brand');
  brandLinks.forEach(brand => {
    brand.addEventListener('click', (e) => {
      // Se já estiver na página index/home, faz rolagem suave com animação sem recarregar seco
      const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';
      
      brand.classList.remove('brand-clicked');
      void brand.offsetWidth; // Força reflow para reiniciar animação
      brand.classList.add('brand-clicked');

      if (isHomePage) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  });
});

