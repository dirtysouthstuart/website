import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { site, socialLinks } from "@/lib/site";

const NETWORKS = {
  instagram: { icon: FaInstagram, label: "Instagram" },
  facebook: { icon: FaFacebookF, label: "Facebook" },
  tiktok: { icon: FaTiktok, label: "TikTok" },
};

/**
 * Icon links to the bar's social profiles (from site.social).
 * - "boxed": outlined squares, for the footer and contact page
 * - "plain": bare icons styled like the nav links, for the header
 */
export function SocialLinks({ className, variant = "boxed" }: { className?: string; variant?: "boxed" | "plain" }) {
  const plain = variant === "plain";
  return (
    <ul className={cn("flex items-center", plain ? "gap-1" : "gap-2.5", className)}>
      {socialLinks.map(({ network, url }) => {
        const { icon: Icon, label } = NETWORKS[network];
        return (
          <li key={network}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} on ${label}`}
              title={label}
              className={cn(
                "grid place-items-center transition-colors",
                plain
                  ? "w-10 h-10 text-ink hover:text-rose"
                  : "w-10 h-10 border-2 border-ink bg-cream text-ink hover:bg-ink hover:text-cream"
              )}
            >
              <Icon className={plain ? "w-[23px] h-[23px]" : "w-4 h-4"} aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
