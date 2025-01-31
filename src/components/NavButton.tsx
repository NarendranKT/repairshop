import { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

type TProps = {
  icon: LucideIcon;
  label: string;
  href?: string;
};

const NavButton = (props: TProps) => {
  const { icon: Icon, label, href } = props;
  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      aria-label={label}
      title={label}
      className="rounded-full"
      asChild
    >
      {href ? (
        <Link href={href}>
          <Icon />
        </Link>
      ) : (
        <Icon />
      )}
    </Button>
  );
};

export default NavButton;
