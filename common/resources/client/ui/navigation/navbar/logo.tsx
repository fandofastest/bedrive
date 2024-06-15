import {useTrans} from '@common/i18n/use-trans';
import {useSettings} from '@common/core/settings/use-settings';
import {Link} from 'react-router-dom';
import {NavbarProps} from '@common/ui/navigation/navbar/navbar';

interface LogoProps {
  color?: NavbarProps['color'];
  logoColor?: NavbarProps['logoColor'];
  isDarkMode?: boolean;
}
export function Logo({color, logoColor, isDarkMode}: LogoProps) {
  const {trans} = useTrans();
  const {branding} = useSettings();

  let desktopLogo: string;
  let mobileLogo: string;
  if (
    isDarkMode ||
    !branding.logo_dark ||
    (logoColor !== 'dark' && color !== 'bg' && color !== 'bg-alt')
  ) {
    desktopLogo = branding.logo_light;
    mobileLogo = branding.logo_light_mobile;
  } else {
    desktopLogo = branding.logo_dark;
    mobileLogo = branding.logo_dark_mobile;
  }

  if (!mobileLogo && !desktopLogo) {
    return null;
  }

  return (
    <Link
      to="/"
      className="mr-4 block h-full max-h-26 flex-shrink-0 md:mr-24 md:max-h-36"
      aria-label={trans({message: 'Go to homepage'})}
    >
      <picture>
        <source srcSet={mobileLogo || desktopLogo} media="(max-width: 768px)" />
        <source srcSet={desktopLogo} media="(min-width: 768px)" />
        <img
          className="block h-full max-h-26 w-auto md:max-h-36"
          alt={trans({message: 'Site logo'})}
        />
      </picture>
    </Link>
  );
}
