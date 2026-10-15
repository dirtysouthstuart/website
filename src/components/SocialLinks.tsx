import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { site, socialLinks } from "@/lib/site";

const NETWORKS = {
  instagram: { icon: FaInstagram, label: "Instagram" },
  facebook: { icon: FaFacebookF, label: "Facebook" },
  tiktok: { icon: FaTiktok, label: "TikTok" },
};

/** Icon links to the bar's social profiles (from site.social). */
export function SocialLinks({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
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
                "grid place-items-center border-2 border-ink bg-cream text-ink hover:bg-ink hover:text-cream transition-colors",
                size === "sm" ? "w-8 h-8" : "w-10 h-10"
              )}
            >
              <Icon className={size === "sm" ? "w-3.5 h-3.5" : "w-4.5 h-4.5"} aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
