
import { useNavigate } from "react-router-dom";
import {
  Flame,
  Headphones,
  Shirt,
  CookingPot,
  BookOpen,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface CategoryCardProps {
  id?: number;
  iconUrl?: string;
  name: string;
}

const categoryIcons: Record<string, LucideIcon> = {
  "Top Deals": Flame,
  Electronics: Headphones,
  Fashion: Shirt,
  "Home & Kitchen": CookingPot,
  "Books & Media": BookOpen,
  "Beauty & Care": Sparkles,
};

const categoryColors: Record<string, string> = {
  "Top Deals": "text-orange-500",
  Electronics: "text-blue-600",
  Fashion: "text-purple-600",
  "Home & Kitchen": "text-emerald-600",
  "Books & Media": "text-amber-600",
  "Beauty & Care": "text-pink-500",
};

export default function CategoryCard({
  id,
  iconUrl,
  name,
}: CategoryCardProps) {
  const navigate = useNavigate();
  const Icon = categoryIcons[name] ?? Sparkles;
  const color = categoryColors[name] ?? "text-gray-600";

  return (
    <div
      onClick={() => {
        if (id) navigate(`/products?cat=${id}`);
        else navigate("/products?bestSeller=true&discounted=true");
      }}
      className="category-card cursor-pointer"
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (id) navigate(`/products?cat=${id}`);
          else navigate("/products");
        }
      }}
    >
      <div className="category-card-icon">
        {iconUrl ? (
          <img src={iconUrl} alt={name} />
        ) : (
          <Icon
            className={`h-10 w-10 ${color}`}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        )}
      </div>

      <h3 className="text-[1rem] font-semibold">{name}</h3>
    </div>
  );
}
