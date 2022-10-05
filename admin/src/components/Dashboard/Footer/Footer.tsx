import footerStyle from "./footer-style";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const Footer: FC = () => {
  const { classes } = footerStyle({});
  const { t } = useTranslation('footer');
  return (
    <footer className={classes.footer}>
      <div>
        <div className={classes.left}>
          <p className={classes.right}>
            <a
              href={process.env.NEXT_PUBLIC_HOME_VERCEL}
              className={classes.anchorRight}
              target='_blank'>
              {t('list')}
            </a>
          </p>
        </div>
        <p className={classes.right}>
          &copy; {new Date().getFullYear()}{' '}
          <a
            href='https://nastaransamui.github.io/'
            className={classes.anchorLeft}
            target='_blank'>
            {t('creator')}
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer;