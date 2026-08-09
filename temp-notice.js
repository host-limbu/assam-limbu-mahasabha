document.documentElement.style.overflow = "hidden";

const overlay = document.createElement("div");

overlay.innerHTML = `
  <div class="maintenance-notice">
    <div class="maintenance-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3L21 20H3L12 3Z" stroke="currentColor" stroke-width="1.8"/>
        <path d="M12 9V14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="12" cy="17" r="1" fill="currentColor"/>
      </svg>
    </div>

    <h2>Website Under Maintenance</h2>
    <p>
      This website is currently undergoing maintenance.
      Please check back again shortly.
    </p>
  </div>
`;

Object.assign(overlay.style, {
  position: "fixed",
  inset: "0",
  zIndex: "2147483647",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  background: "rgba(255, 255, 255, 0.72)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)"
});

const style = document.createElement("style");

style.textContent = `
  .maintenance-notice {
    width: min(440px, 100%);
    padding: 32px 24px;
    text-align: center;
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 5px;
    box-shadow: 0 12px 40px rgba(0,0,0,.12);
    font-family: Arial, sans-serif;
  }

  .maintenance-icon {
    width: 46px;
    height: 46px;
    margin: 0 auto 18px;
  }

  .maintenance-icon svg {
    width: 100%;
    height: 100%;
  }

  .maintenance-notice h2 {
    margin: 0 0 10px;
    font-size: 22px;
    color: #222;
  }

  .maintenance-notice p {
    margin: 0;
    color: #666;
    line-height: 1.6;
  }
`;

document.head.appendChild(style);
document.body.appendChild(overlay);
