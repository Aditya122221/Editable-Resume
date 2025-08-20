import styles from '../../style.module.css'

function Header({ profile }) {

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
          <a className={styles.contactItem} href={profile.linkedinLink} target='_blank' rel="noreferrer">{profile.linkedinP || "Linkedin"}</a>
        </span>
        <span className={styles.contactItem}>
          <i class="fa-brands fa-github"></i>
          <a className={styles.contactItem} href={profile.github} target='_blank' rel="noreferrer">{profile.github || "Github"}</a>
        </span>
      </div>
    </div>
  )
}

export default Header
