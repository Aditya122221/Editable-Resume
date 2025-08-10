import styles from '../../style.module.css'

function Header({ profile }) {
  const linkedin = profile.linkedin
    ? profile.linkedin.replace("https://www.linkedin.com/in/", "").replace(/\/$/, "")
    : "Linkedin";

  const github = profile.github
    ? profile.github.replace("https://github.com/", "").replace(/\/$/, "")
    : "Github";

  return (
    <div className={styles.header}>
      <h1 className={styles.name}>{profile.fullName || "Full Name"}</h1>
      <p className={styles.location}>{profile.address || "Address"}</p>
      <div className={styles.contact}>
        <span className={styles.contactItem}>
          <i class="fa-solid fa-phone"></i> {profile.phone || "+91 XXXXXXXXXX"}
        </span>
        <span className={styles.contactItem}>
          <i class="fa-solid fa-envelope"></i> {profile.email || "Email ID"}
        </span>
        <span className={styles.contactItem}>
          <i class="fa-brands fa-linkedin"></i>
          <a className={styles.contactItem} href={profile.linkedin} target='_blank' rel="noreferrer">{linkedin}</a>
        </span>
        <span className={styles.contactItem}>
          <i class="fa-brands fa-github"></i>
          <a className={styles.contactItem} href={profile.github} target='_blank' rel="noreferrer">{github}</a>
        </span>
      </div>
    </div>
  )
}

export default Header
