import '../styles/footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer-mark">Thanks for your time</p>
      <div className="footer-row">
        <span>© 2026 Made by Tommy</span>
        <span className="footer-dot" />
        <button type="button" className="footer-link footer-tip" data-tip="atonmo0020">
          WeChat
        </button>
        <span className="footer-dot" />
        <a
          href="mailto:fengzhao@vip.qq.com"
          className="footer-link footer-tip"
          data-tip="fengzhao@vip.qq.com"
        >
          Email
        </a>
      </div>
    </footer>
  )
}
